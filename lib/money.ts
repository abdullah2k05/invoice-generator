import { currencyList } from "@/lib/currency";

/**
 * Money module — single source of truth for invoice arithmetic and formatting.
 *
 * Policy (see DEVELOPMENT_PLAN.md AD-6 / decision D1):
 *  - All amounts are computed as integer minor units using BigInt, so binary
 *    floating point can never leak into an invoice total.
 *  - Each currency declares its ISO 4217 minor-unit digits (2 for USD/EUR/...,
 *    0 for JPY/KRW/VND/IDR).
 *  - Rounding is half-away-from-zero, applied at the moment a value must be
 *    expressed in minor units (line totals, tax) and at nothing else.
 *  - A total is never negative: discounts larger than the subtotal are flagged
 *    as invalid and clamped for display (decision D2).
 */

const DEFAULT_DIGITS = 2;
/** Decimal places kept for quantities and tax percentages. */
const SCALE = 6;
const SCALE_FACTOR = 10n ** BigInt(SCALE);
const TAX_DIVISOR = 100n * SCALE_FACTOR;

const POW10_CACHE: bigint[] = [];
function pow10(n: number): bigint {
  if (!POW10_CACHE[n]) POW10_CACHE[n] = 10n ** BigInt(n);
  return POW10_CACHE[n];
}

/** Round `n / d` to the nearest integer, half away from zero. */
function divRound(n: bigint, d: bigint): bigint {
  const q = n / d;
  const r = n % d;
  const absR = r < 0n ? -r : r;
  if (absR * 2n >= d) return n < 0n ? q - 1n : q + 1n;
  return q;
}

/** Exact decimal text for a finite number (never exponential). */
function numberToText(n: number): string | null {
  if (!Number.isFinite(n)) return null;
  if (Number.isInteger(n)) return n.toFixed(0);
  let s = String(n);
  if (!/[.]/.test(s) || /e/i.test(s)) s = n.toFixed(12).replace(/0+$/, "").replace(/\.$/, "");
  return s;
}

/**
 * Parse a decimal value into integer minor units at `digits` precision.
 * Returns `null` when the value cannot be interpreted as a finite number.
 * An empty value is an exact zero (so "unset" behaves like 0).
 */
export function toMinorUnits(
  value: string | number | null | undefined,
  digits: number
): bigint | null {
  const text =
    typeof value === "number" ? numberToText(value) : (value ?? "").trim();
  if (text === null) return null;
  if (text === "") return 0n;

  const m = /^-?(\d+)(?:\.(\d*))?$/.exec(text);
  if (!m) return null;

  const negative = text.startsWith("-");
  const whole = BigInt(m[1]);
  const frac = m[2] ?? "";
  const base = whole * pow10(digits);

  if (frac.length <= digits) {
    const padded = frac === "" ? 0n : BigInt(frac.padEnd(digits, "0"));
    return negative ? -(base + padded) : base + padded;
  }

  const kept = frac.slice(0, digits);
  const rest = frac.slice(digits);
  const padded = kept === "" ? 0n : BigInt(kept.padEnd(digits, "0"));
  let scaled = base + padded;
  if (rest.charCodeAt(0) >= 53) scaled += 1n; // '5' or above -> away from zero
  return negative ? -scaled : scaled;
}

/** Minor units back to a plain number (for storage / JSON compatibility). */
export function minorToNumber(minor: bigint, digits: number): number {
  const factor = Number(pow10(digits));
  return Number(minor) / factor;
}

export function minorDigitsFor(currency?: string | null): number {
  const code = (currency || "USD").toUpperCase();
  return (
    currencyList.find((c) => c.value === code)?.details.minorUnitDigits ??
    DEFAULT_DIGITS
  );
}

export function currencySymbolFor(currency?: string | null): string {
  const code = (currency || "USD").toUpperCase();
  return (
    currencyList.find((c) => c.value === code)?.details.currencySymbol ?? "$"
  );
}

/** Group an integer-minor-unit amount with the currency's decimals. */
export function formatMinorUnits(minor: bigint, digits: number): string {
  const negative = minor < 0n;
  const abs = negative ? -minor : minor;
  const raw = abs.toString().padStart(digits + 1, "0");
  const whole = raw.slice(0, raw.length - digits) || "0";
  const frac = digits > 0 ? raw.slice(raw.length - digits) : "";
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${negative ? "-" : ""}${grouped}${frac ? `.${frac}` : ""}`;
}

/** `formatMinorUnits` with the currency's symbol and decimals. */
export function formatMinorWithSymbol(
  minor: bigint,
  currency?: string | null
): string {
  return `${currencySymbolFor(currency)}${formatMinorUnits(
    minor,
    minorDigitsFor(currency)
  )}`;
}

/**
 * Format any decimal-ish value for display in `currency`.
 * Used by invoice history, where totals are already stored as numbers.
 */
export function formatMoney(
  value: string | number | bigint | null | undefined,
  currency?: string | null
): string {
  const digits = minorDigitsFor(currency);
  let minor: bigint;
  if (typeof value === "bigint") minor = value;
  else {
    const parsed = toMinorUnits(value, digits);
    minor = parsed ?? 0n;
  }
  return formatMinorWithSymbol(minor, currency);
}

export type InvalidReason =
  | "invalid_amount"
  | "invalid_discount"
  | "invalid_tax"
  | "discount_exceeds_subtotal";

export interface InvoiceLineInput {
  qty?: number | string | null;
  amount?: number | string | null;
}

export interface InvoiceTotalsInput {
  items?: InvoiceLineInput[] | null;
  discount?: string | number | null;
  taxRate?: string | number | null;
  currency?: string | null;
}

export interface InvoiceTotals {
  /** True when nothing needs the user's attention before saving. */
  valid: boolean;
  reason: InvalidReason | null;
  currency: string;
  digits: number;
  subtotalMinor: bigint;
  /** Discount actually applied (clamped to the subtotal). */
  discountMinor: bigint;
  /** Discount exactly as entered, for validation messaging. */
  discountEnteredMinor: bigint;
  taxableMinor: bigint;
  taxMinor: bigint;
  /** Always >= 0. */
  totalMinor: bigint;
  lines: bigint[];
}

const isEmpty = (v: string | number | null | undefined): boolean =>
  v === null || v === undefined || v === "";

export function computeInvoiceTotals(
  input: InvoiceTotalsInput
): InvoiceTotals {
  const currency = (input.currency || "USD").toUpperCase();
  const digits = minorDigitsFor(currency);
  let reason: InvalidReason | null = null;
  const flag = (r: InvalidReason) => {
    if (!reason) reason = r;
  };

  let subtotalMinor = 0n;
  const lines: bigint[] = [];

  for (const item of input.items ?? []) {
    const amountMinor = toMinorUnits(item?.amount, digits);
    const qtyScaled = toMinorUnits(item?.qty, SCALE);
    if (amountMinor === null || qtyScaled === null) flag("invalid_amount");
    if (amountMinor !== null && amountMinor < 0n) flag("invalid_amount");
    if (qtyScaled !== null && qtyScaled < 0n) flag("invalid_amount");

    // An absent quantity means one unit; an explicit 0 stays 0 (CALC-006).
    const qtyRaw = isEmpty(item?.qty) ? SCALE_FACTOR : qtyScaled;
    const qty = qtyRaw === null || qtyRaw < 0n ? SCALE_FACTOR : qtyRaw;
    const amount = amountMinor === null || amountMinor < 0n ? 0n : amountMinor;
    const line = divRound(qty * amount, SCALE_FACTOR);
    lines.push(line);
    subtotalMinor += line;
  }

  const discountEntered = toMinorUnits(input.discount, digits);
  if (discountEntered === null) flag("invalid_discount");
  const discountRaw = discountEntered ?? 0n;
  if (discountRaw < 0n) flag("invalid_discount");
  if (discountRaw > subtotalMinor) flag("discount_exceeds_subtotal");
  const discountMinor =
    discountRaw < 0n ? 0n : discountRaw > subtotalMinor ? subtotalMinor : discountRaw;

  const taxableMinor = subtotalMinor - discountMinor;

  const rateScaled = toMinorUnits(input.taxRate, SCALE);
  if (rateScaled === null || rateScaled < 0n) flag("invalid_tax");
  const rate = rateScaled !== null && rateScaled > 0n ? rateScaled : 0n;
  const taxMinor = divRound(taxableMinor * rate, TAX_DIVISOR);

  const totalMinor = taxableMinor + taxMinor;

  return {
    valid: reason === null,
    reason,
    currency,
    digits,
    subtotalMinor,
    discountMinor,
    discountEnteredMinor: discountRaw,
    taxableMinor,
    taxMinor,
    totalMinor,
    lines,
  };
}

/**
 * Guard for text inputs bound to money/percentage fields (VAL-001).
 * Allows an empty value and, in decimal mode, an intermediate "12." while typing.
 */
export function isAcceptableNumericInput(
  raw: string,
  mode: "decimal" | "integer" = "decimal"
): boolean {
  if (raw === "") return true;
  if (mode === "integer") return /^\d+$/.test(raw);
  if (!/^\d*\.?\d*$/.test(raw)) return false;
  // Reject a bare "." — it is not a number.
  return !/^\.$/.test(raw);
}

/** Human message for an invalid invoice, or null when it is valid. */
export function describeTotalsError(totals: InvoiceTotals): string | null {
  if (totals.valid) return null;
  switch (totals.reason) {
    case "discount_exceeds_subtotal":
      return "Discount is larger than the subtotal.";
    case "invalid_discount":
      return "Discount must be a valid non-negative number.";
    case "invalid_tax":
      return "Tax rate must be a valid non-negative number.";
    default:
      return "Line item amounts and quantities must be valid numbers.";
  }
}
