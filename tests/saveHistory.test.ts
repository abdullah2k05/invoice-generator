import { describe, it, expect, vi, beforeEach } from "vitest";

const saveInvoice = vi.fn(async (..._args: unknown[]) => {});
const incrementInvoiceCounter = vi.fn(async (..._args: unknown[]) => {});

vi.mock("@/lib/localData", () => ({
  saveInvoice: (...args: unknown[]) => saveInvoice(...args),
  incrementInvoiceCounter: (...args: unknown[]) =>
    incrementInvoiceCounter(...args),
}));

vi.mock("@capacitor/core", () => ({
  Capacitor: { isNativePlatform: () => false },
}));

import { saveHistory } from "@/app/component/form/downloadInvoice/downloadUtils";

const baseParams = (overrides: {
  discount?: string;
  taxRate?: string;
  amount?: string | number;
}) => ({
  companyDetails: { companyName: "Acme" } as unknown as CompanyDetails,
  invoiceDetails: {
    items: [{ itemDescription: "Work", amount: overrides.amount ?? 100, qty: 1 }],
    discount: overrides.discount,
    taxRate: overrides.taxRate,
    currency: "USD",
  } as InvoiceItemDetails,
  invoiceTerms: {
    invoiceNumber: "INV-1",
    issueDate: "2026-01-01",
  } as unknown as InvoiceTerms,
  paymentDetails: {} as PaymentDetails,
  yourDetails: {} as YourDetails,
  showPayableIn: false,
  templateId: "default",
});

beforeEach(() => {
  saveInvoice.mockClear();
  incrementInvoiceCounter.mockClear();
});

describe("saveHistory storage-write assertion (VAL-002)", () => {
  it("persists a finite, non-negative total for a valid invoice", async () => {
    await saveHistory(baseParams({ amount: 100, taxRate: "10" }));
    expect(saveInvoice).toHaveBeenCalledTimes(1);
    const stored = saveInvoice.mock.calls[0][0] as { total: number };
    expect(Number.isFinite(stored.total)).toBe(true);
    expect(stored.total).toBe(110);
  });

  it("never writes when the discount is malformed (legacy wrote NaN)", async () => {
    await saveHistory(baseParams({ discount: "abc" }));
    expect(saveInvoice).not.toHaveBeenCalled();
    expect(incrementInvoiceCounter).not.toHaveBeenCalled();
  });

  it("never writes when the discount exceeds the subtotal (legacy wrote -440)", async () => {
    await saveHistory(baseParams({ amount: 100, discount: "500", taxRate: "10" }));
    expect(saveInvoice).not.toHaveBeenCalled();
  });

  it("never writes a negative total from negative inputs", async () => {
    await saveHistory(baseParams({ amount: "-50", taxRate: "10" }));
    expect(saveInvoice).not.toHaveBeenCalled();
  });
});
