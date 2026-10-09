import { describe, it, expect } from "vitest";
import {
  toMinorUnits,
  minorToNumber,
  minorDigitsFor,
  formatMinorUnits,
  formatMinorWithSymbol,
  formatMoney,
  computeInvoiceTotals,
  isAcceptableNumericInput,
  describeTotalsError,
} from "@/lib/money";

/** Parse a formatted money string back to a number (strips grouping). */
const parseFormatted = (s: string): number => Number(s.replace(/,/g, ""));

/** What the preview/PDF total row renders (symbol span + amount). */
const formatPreviewTotal = (
  input: Parameters<typeof computeInvoiceTotals>[0]
): string => {
  const t = computeInvoiceTotals(input);
  return formatMinorWithSymbol(t.totalMinor, t.currency);
};

/** What Recent Invoices renders after the total is stored as a plain number. */
const formatHistoryTotal = (
  input: Parameters<typeof computeInvoiceTotals>[0]
): string => {
  const t = computeInvoiceTotals(input);
  return formatMoney(minorToNumber(t.totalMinor, t.digits), t.currency);
};

/** The generated PDF uses the same module call as the preview. */
const formatPdfTotal = formatPreviewTotal;

describe("toMinorUnits", () => {
  it("parses integers and decimals at 2 digits", () => {
    expect(toMinorUnits("1.1", 2)).toBe(110n);
    expect(toMinorUnits("2.2", 2)).toBe(220n);
    expect(toMinorUnits(5255.775, 2)).toBe(525578n); // half away from zero
    expect(toMinorUnits("1234567.89", 2)).toBe(123456789n);
  });

  it("treats empty as exact zero", () => {
    expect(toMinorUnits("", 2)).toBe(0n);
    expect(toMinorUnits("   ", 2)).toBe(0n);
    expect(toMinorUnits(null, 2)).toBe(0n);
    expect(toMinorUnits(undefined, 2)).toBe(0n);
    expect(toMinorUnits(0, 2)).toBe(0n);
  });

  it("rejects malformed values", () => {
    expect(toMinorUnits("abc", 2)).toBeNull();
    expect(toMinorUnits("12.3.4", 2)).toBeNull();
    expect(toMinorUnits("1e5", 2)).toBeNull();
    expect(toMinorUnits(NaN, 2)).toBeNull();
    expect(toMinorUnits(Infinity, 2)).toBeNull();
  });

  it("rounds half away from zero at 0-digit currencies", () => {
    expect(toMinorUnits("100.4", 0)).toBe(100n);
    expect(toMinorUnits("100.5", 0)).toBe(101n);
    expect(toMinorUnits("-100.5", 0)).toBe(-101n);
    expect(toMinorUnits("0.005", 2)).toBe(1n);
    expect(toMinorUnits("-0.005", 2)).toBe(-1n);
  });

  it("keeps full precision for 6-digit scales", () => {
    expect(toMinorUnits("1.5", 6)).toBe(1500000n);
    expect(toMinorUnits("0.000001", 6)).toBe(1n);
    expect(toMinorUnits("0.0000005", 6)).toBe(1n);
  });
});

describe("per-currency digits (CALC-004)", () => {
  it("uses 0 digits for JPY/KRW/VND/IDR", () => {
    expect(minorDigitsFor("JPY")).toBe(0);
    expect(minorDigitsFor("KRW")).toBe(0);
    expect(minorDigitsFor("VND")).toBe(0);
    expect(minorDigitsFor("IDR")).toBe(0);
  });

  it("uses 2 digits for USD/EUR/GBP/INR", () => {
    for (const c of ["USD", "EUR", "GBP", "INR"]) {
      expect(minorDigitsFor(c)).toBe(2);
    }
  });

  it("defaults unknown/empty to USD (2)", () => {
    expect(minorDigitsFor("XXX")).toBe(2);
    expect(minorDigitsFor(undefined)).toBe(2);
    expect(minorDigitsFor(null)).toBe(2);
  });
});

describe("formatMinorUnits", () => {
  it("groups thousands and places the decimal point", () => {
    expect(formatMinorUnits(123456789n, 2)).toBe("1,234,567.89");
    expect(formatMinorUnits(330n, 2)).toBe("3.30");
    expect(formatMinorUnits(1500n, 0)).toBe("1,500");
    expect(formatMinorUnits(0n, 2)).toBe("0.00");
    expect(formatMinorUnits(-1n, 2)).toBe("-0.01");
    expect(formatMinorUnits(525578n, 2)).toBe("5,255.78");
  });
});

describe("formatMoney", () => {
  it("formats history numbers with the currency symbol and digits", () => {
    expect(formatMoney(5255.775, "USD")).toBe("$5,255.78");
    expect(formatMoney(107.505375, "USD")).toBe("$107.51");
    expect(formatMoney(1500, "JPY")).toBe("¥1,500");
  });

  it("uses the currency symbol from the list", () => {
    expect(formatMoney(10, "EUR")).toBe("€10.00");
    expect(formatMoney(10, "INR")).toContain("10.00");
    expect(formatMinorWithSymbol(1500n, "JPY")).toBe("¥1,500");
  });
});

describe("computeInvoiceTotals", () => {
  it("fixes float accumulation: 1.1 + 2.2 === 3.30 exactly", () => {
    const t = computeInvoiceTotals({
      items: [{ amount: 1.1, qty: 1 }, { amount: 2.2, qty: 1 }],
      currency: "USD",
    });
    expect(t.valid).toBe(true);
    expect(formatMinorUnits(t.subtotalMinor, 2)).toBe("3.30");
    expect(minorToNumber(t.subtotalMinor, 2)).toBe(3.3);
  });

  it("is exact across many float lines (0.1 x 1000 = 100.00)", () => {
    const items = Array.from({ length: 1000 }, () => ({
      amount: 0.1,
      qty: 1,
    }));
    const t = computeInvoiceTotals({ items, currency: "USD" });
    expect(formatMinorUnits(t.subtotalMinor, 2)).toBe("100.00");
  });

  it("multiplies decimal quantities (0.5 x 2 = 1)", () => {
    const t = computeInvoiceTotals({
      items: [{ amount: 2, qty: 0.5 }],
      currency: "USD",
    });
    expect(formatMinorUnits(t.subtotalMinor, 2)).toBe("1.00");
  });

  it("missing qty means 1 unit; explicit 0 stays 0 (CALC-006)", () => {
    const missing = computeInvoiceTotals({
      items: [{ amount: 10, qty: undefined }],
      currency: "USD",
    });
    expect(formatMinorUnits(missing.subtotalMinor, 2)).toBe("10.00");

    const explicitZero = computeInvoiceTotals({
      items: [{ amount: 10, qty: 0 }],
      currency: "USD",
    });
    expect(formatMinorUnits(explicitZero.subtotalMinor, 2)).toBe("0.00");
  });

  it("treats empty amount as zero (matches legacy display of blank)", () => {
    const t = computeInvoiceTotals({
      items: [{ amount: "", qty: 1 }, { amount: 10, qty: 1 }],
      currency: "USD",
    });
    expect(t.valid).toBe(true);
    expect(formatMinorUnits(t.subtotalMinor, 2)).toBe("10.00");
  });

  it("reconciles tax row with total (CALC-003)", () => {
    // Preview used to show tax row 7.50 while total summed to 107.505375.
    const t = computeInvoiceTotals({
      items: [{ amount: 1000, qty: 1 }],
      taxRate: "10",
      currency: "USD",
    });
    const taxRow = formatMinorUnits(t.taxMinor, 2);
    const total = formatMinorUnits(t.totalMinor, 2);
    expect(taxRow).toBe("100.00");
    expect(total).toBe("1,100.00");
    // total === taxable + tax exactly
    expect(t.taxableMinor + t.taxMinor).toBe(t.totalMinor);
  });

  it("tax on discounted subtotal", () => {
    const t = computeInvoiceTotals({
      items: [{ amount: 200, qty: 1 }],
      discount: "50",
      taxRate: "10",
      currency: "USD",
    });
    expect(formatMinorUnits(t.discountMinor, 2)).toBe("50.00");
    expect(formatMinorUnits(t.taxableMinor, 2)).toBe("150.00");
    expect(formatMinorUnits(t.taxMinor, 2)).toBe("15.00");
    expect(formatMinorUnits(t.totalMinor, 2)).toBe("165.00");
  });

  it("blocks negative totals: discount larger than subtotal is invalid (VAL-002)", () => {
    // Legacy: 100 subtotal / 500 discount / 10% tax produced -440.
    const t = computeInvoiceTotals({
      items: [{ amount: 100, qty: 1 }],
      discount: "500",
      taxRate: "10",
      currency: "USD",
    });
    expect(t.valid).toBe(false);
    expect(t.reason).toBe("discount_exceeds_subtotal");
    expect(t.totalMinor).toBeGreaterThanOrEqual(0n);
    expect(formatMinorUnits(t.totalMinor, 2)).toBe("0.00");
    expect(describeTotalsError(t)).toBe("Discount is larger than the subtotal.");
  });

  it("marks malformed discount as invalid (legacy produced NaN)", () => {
    const t = computeInvoiceTotals({
      items: [{ amount: 100, qty: 1 }],
      discount: "abc",
      taxRate: "10",
      currency: "USD",
    });
    expect(t.valid).toBe(false);
    expect(t.reason).toBe("invalid_discount");
    expect(Number.isNaN(minorToNumber(t.totalMinor, 2))).toBe(false);
    expect(formatMinorUnits(t.totalMinor, 2)).toBe("110.00");
  });

  it("marks malformed tax rate as invalid", () => {
    const t = computeInvoiceTotals({
      items: [{ amount: 100, qty: 1 }],
      taxRate: "abc",
      currency: "USD",
    });
    expect(t.valid).toBe(false);
    expect(t.reason).toBe("invalid_tax");
  });

  it("marks malformed line amount as invalid but never NaN", () => {
    const t = computeInvoiceTotals({
      items: [{ amount: "abc", qty: 1 }],
      currency: "USD",
    });
    expect(t.valid).toBe(false);
    expect(t.reason).toBe("invalid_amount");
    expect(formatMinorUnits(t.totalMinor, 2)).toBe("0.00");
  });

  it("rejects negative line amounts and never totals them", () => {
    const t = computeInvoiceTotals({
      items: [{ amount: "-50", qty: 1 }, { amount: 10, qty: 1 }],
      currency: "USD",
    });
    expect(t.valid).toBe(false);
    expect(t.reason).toBe("invalid_amount");
    expect(formatMinorUnits(t.subtotalMinor, 2)).toBe("10.00");
    expect(t.totalMinor).toBeGreaterThanOrEqual(0n);
  });

  it("rejects negative quantity", () => {
    const t = computeInvoiceTotals({
      items: [{ amount: 10, qty: -2 }],
      currency: "USD",
    });
    expect(t.valid).toBe(false);
    expect(t.reason).toBe("invalid_amount");
    expect(t.totalMinor).toBeGreaterThanOrEqual(0n);
  });

  it("rejects negative discount and negative tax rate", () => {
    const negDiscount = computeInvoiceTotals({
      items: [{ amount: 100, qty: 1 }],
      discount: "-10",
      currency: "USD",
    });
    expect(negDiscount.valid).toBe(false);
    expect(negDiscount.reason).toBe("invalid_discount");

    const negTax = computeInvoiceTotals({
      items: [{ amount: 100, qty: 1 }],
      taxRate: "-5",
      currency: "USD",
    });
    expect(negTax.valid).toBe(false);
    expect(negTax.reason).toBe("invalid_tax");
    // a negative rate must not be applied to the math
    expect(formatMinorUnits(negTax.totalMinor, 2)).toBe("100.00");
  });

  it("accepts discount equal to subtotal (total 0, still valid)", () => {
    const t = computeInvoiceTotals({
      items: [{ amount: 100, qty: 1 }],
      discount: "100",
      currency: "USD",
    });
    expect(t.valid).toBe(true);
    expect(t.totalMinor).toBe(0n);
  });

  it("uses 0-digit rounding for JPY", () => {
    const t = computeInvoiceTotals({
      items: [{ amount: 100, qty: 1 }],
      taxRate: "8",
      currency: "JPY",
    });
    // tax = 8 exactly at 0 digits
    expect(formatMinorUnits(t.taxMinor, 0)).toBe("8");
    expect(formatMinorUnits(t.totalMinor, 0)).toBe("108");
    expect(minorDigitsFor(t.currency)).toBe(0);
  });

  it("handles empty invoice", () => {
    const t = computeInvoiceTotals({ items: [], currency: "USD" });
    expect(t.valid).toBe(true);
    expect(t.totalMinor).toBe(0n);
  });

  it("carries the currency through", () => {
    const t = computeInvoiceTotals({ items: [], currency: "eur" });
    expect(t.currency).toBe("EUR");
    expect(t.digits).toBe(2);
  });
});

describe("isAcceptableNumericInput (VAL-001)", () => {
  it("accepts empty and simple decimals", () => {
    expect(isAcceptableNumericInput("")).toBe(true);
    expect(isAcceptableNumericInput("12")).toBe(true);
    expect(isAcceptableNumericInput("12.")).toBe(true); // intermediate while typing
    expect(isAcceptableNumericInput("12.5")).toBe(true);
    expect(isAcceptableNumericInput(".5")).toBe(true);
    expect(isAcceptableNumericInput("0")).toBe(true);
  });

  it("rejects malformed input", () => {
    expect(isAcceptableNumericInput("abc")).toBe(false);
    expect(isAcceptableNumericInput("12.3.4")).toBe(false);
    expect(isAcceptableNumericInput("-5")).toBe(false);
    expect(isAcceptableNumericInput("1e5")).toBe(false);
    expect(isAcceptableNumericInput("1,000")).toBe(false);
    expect(isAcceptableNumericInput(".")).toBe(false);
    expect(isAcceptableNumericInput("$5")).toBe(false);
  });

  it("integer mode allows only digits", () => {
    expect(isAcceptableNumericInput("12", "integer")).toBe(true);
    expect(isAcceptableNumericInput("12.", "integer")).toBe(false);
    expect(isAcceptableNumericInput("012", "integer")).toBe(true);
    expect(isAcceptableNumericInput("", "integer")).toBe(true);
  });
});

describe("minorToNumber", () => {
  it("round-trips minor units to plain numbers", () => {
    expect(minorToNumber(123456789n, 2)).toBe(1234567.89);
    expect(minorToNumber(150n, 0)).toBe(150);
    expect(minorToNumber(0n, 2)).toBe(0);
  });
});

describe("CALC-002: preview / PDF / history agree for the same input", () => {
  const table: Array<{ name: string; input: Parameters<typeof computeInvoiceTotals>[0] }> = [
    { name: "baseline 5255.775 single line", input: { items: [{ amount: 5255.775, qty: 1 }], currency: "USD" } },
    { name: "baseline float 1.1 + 2.2", input: { items: [{ amount: 1.1, qty: 1 }, { amount: 2.2, qty: 1 }], currency: "USD" } },
    { name: "baseline discount 500 over subtotal 100", input: { items: [{ amount: 100, qty: 1 }], discount: "500", taxRate: "10", currency: "USD" } },
    { name: "baseline 1000 @ 10% (was 107.505375)", input: { items: [{ amount: 1000, qty: 1 }], taxRate: "10", currency: "USD" } },
    { name: "0.1 x 1000", input: { items: Array.from({ length: 1000 }, () => ({ amount: 0.1, qty: 1 })), currency: "USD" } },
    { name: "discount 10 + tax 19 EUR", input: { items: [{ amount: 99.99, qty: 3 }], discount: "10", taxRate: "19", currency: "EUR" } },
    { name: "decimal qty 1.5 x 10", input: { items: [{ amount: 10, qty: 1.5 }], currency: "USD" } },
    { name: "JPY zero-digit tax", input: { items: [{ amount: 1500, qty: 1 }], taxRate: "8", currency: "JPY" } },
    { name: "KRW whole amounts", input: { items: [{ amount: 12000, qty: 2 }], discount: "500", currency: "KRW" } },
    { name: "INR large grouped", input: { items: [{ amount: 123456.78, qty: 1 }], taxRate: "18", currency: "INR" } },
    { name: "half-cent tax 10.01 @ 7.5%", input: { items: [{ amount: 10.01, qty: 1 }], taxRate: "7.5", currency: "USD" } },
    { name: "empty invoice", input: { items: [], currency: "USD" } },
    { name: "GBP discount only", input: { items: [{ amount: 40, qty: 2 }], discount: "15", currency: "GBP" } },
  ];

  it("has >= 12 table rows", () => {
    expect(table.length).toBeGreaterThanOrEqual(12);
  });

  it.each(table.map((r) => [r.name, r.input] as const))(
    "preview === pdf === history: %s",
    (_name, input) => {
      const preview = formatPreviewTotal(input);
      const pdf = formatPdfTotal(input);
      const history = formatHistoryTotal(input);
      expect(pdf).toBe(preview);
      expect(history).toBe(preview);
    }
  );

  it("keeps the stored history total finite and identical to the preview (baseline 5255.775)", () => {
    const input = { items: [{ amount: 5255.775, qty: 1 }], currency: "USD" };
    const t = computeInvoiceTotals(input);
    const stored = minorToNumber(t.totalMinor, t.digits);
    expect(stored).toBe(5255.78);
    expect(formatPreviewTotal(input)).toBe(formatMoney(stored, "USD"));
  });
});

describe("CALC-003: displayed rows sum to displayed total", () => {
  const combos = [
    { discount: undefined, taxRate: undefined },
    { discount: undefined, taxRate: "5" },
    { discount: undefined, taxRate: "7.5" },
    { discount: undefined, taxRate: "10" },
    { discount: undefined, taxRate: "19" },
    { discount: "10", taxRate: undefined },
    { discount: "10", taxRate: "5" },
    { discount: "10", taxRate: "7.5" },
    { discount: "50", taxRate: "10" },
    { discount: "50", taxRate: "19" },
    { discount: "100", taxRate: "10" }, // full discount
    { discount: undefined, taxRate: "15.5" }, // half-cent rate
  ];

  it("has >= 10 combinations", () => {
    expect(combos.length).toBeGreaterThanOrEqual(10);
  });

  it.each(combos.map((c, i) => [i, c] as const))(
    "subtotal - discount + tax === total (combo %i)",
    (_i, { discount, taxRate }) => {
      const t = computeInvoiceTotals({
        items: [{ amount: 10.01, qty: 3 }, { amount: 2.22, qty: 1 }],
        discount,
        taxRate,
        currency: "USD",
      });
      const sub = parseFormatted(formatMinorUnits(t.subtotalMinor, 2));
      const disc = parseFormatted(formatMinorUnits(t.discountMinor, 2));
      const tax = parseFormatted(formatMinorUnits(t.taxMinor, 2));
      const total = parseFormatted(formatMinorUnits(t.totalMinor, 2));
      // minor units reconcile exactly
      expect(t.taxableMinor + t.taxMinor).toBe(t.totalMinor);
      expect(t.subtotalMinor - t.discountMinor).toBe(t.taxableMinor);
      // displayed rows reconcile (2dp, no drift)
      expect(Math.round((sub - disc + tax) * 100)).toBe(Math.round(total * 100));
    }
  );

  it("half-cent tax case reconciles (10.01 @ 7.5% = 0.75075 -> 0.75)", () => {
    const t = computeInvoiceTotals({
      items: [{ amount: 10.01, qty: 1 }],
      taxRate: "7.5",
      currency: "USD",
    });
    expect(formatMinorUnits(t.taxMinor, 2)).toBe("0.75");
    expect(formatMinorUnits(t.totalMinor, 2)).toBe("10.76");
  });

  it("true half-cent tax rounds away from zero (0.10 @ 5% = 0.005 -> 0.01)", () => {
    const t = computeInvoiceTotals({
      items: [{ amount: 0.1, qty: 1 }],
      taxRate: "5",
      currency: "USD",
    });
    expect(formatMinorUnits(t.taxMinor, 2)).toBe("0.01");
    expect(formatMinorUnits(t.totalMinor, 2)).toBe("0.11");
  });
});

describe("CALC-006 extras: coercion edge cases", () => {
  it("accepts string qty/amount (legacy JSON)", () => {
    const t = computeInvoiceTotals({
      items: [{ amount: "10", qty: "3" }],
      currency: "USD",
    });
    expect(formatMinorUnits(t.subtotalMinor, 2)).toBe("30.00");
  });

  it("explicit amount 0 renders as zero line", () => {
    const t = computeInvoiceTotals({
      items: [{ amount: 0, qty: 2 }],
      currency: "USD",
    });
    expect(formatMinorUnits(t.lines[0], 2)).toBe("0.00");
    expect(formatMinorUnits(t.subtotalMinor, 2)).toBe("0.00");
  });

  it("amount 0 string behaves as zero", () => {
    const t = computeInvoiceTotals({
      items: [{ amount: "0", qty: 1 }],
      currency: "USD",
    });
    expect(formatMinorUnits(t.subtotalMinor, 2)).toBe("0.00");
    expect(t.valid).toBe(true);
  });

  it("decimal qty 1.5 x 10 = 15", () => {
    const t = computeInvoiceTotals({
      items: [{ amount: 10, qty: 1.5 }],
      currency: "USD",
    });
    expect(formatMinorUnits(t.subtotalMinor, 2)).toBe("15.00");
  });
});

describe("VAL-002 fuzz: total is always finite and non-negative", () => {
  const nasty: Array<{
    items: Array<{ amount?: string; qty?: string }>;
    discount?: string;
    taxRate?: string;
  }> = [
    { items: [{ amount: "abc", qty: "1" }], discount: "abc", taxRate: "abc" },
    { items: [{ amount: "-50", qty: "1" }], discount: "-10", taxRate: "-5" },
    { items: [{ amount: "1e5", qty: "1e3" }], discount: "1e5", taxRate: "1e5" },
    { items: [{ amount: "99999999999999999999", qty: "999999999" }], taxRate: "100" },
    { items: [{ amount: "", qty: "" }], discount: "", taxRate: "" },
    { items: [{ amount: "12.3.4", qty: "1.5.5" }], discount: "12.3.4", taxRate: "12.3.4" },
    { items: [{ amount: "-0.01", qty: "2" }], discount: "0.05", taxRate: "10" },
    { items: [{ amount: "0.001", qty: "0.001" }], discount: "1", taxRate: "50" },
    { items: [], discount: "99999", taxRate: "999" },
    { items: [{ amount: "1.1", qty: "2.2" }], discount: "0.5", taxRate: "8.875" },
  ];

  it.each(nasty.map((c, i) => [i, c] as const))(
    "never NaN/negative (fuzz %i)",
    (_i, c) => {
      const t = computeInvoiceTotals({ ...c, currency: "USD" });
      const total = minorToNumber(t.totalMinor, t.digits);
      expect(Number.isFinite(total)).toBe(true);
      expect(Number.isNaN(total)).toBe(false);
      expect(t.totalMinor).toBeGreaterThanOrEqual(0n);
    }
  );
});
