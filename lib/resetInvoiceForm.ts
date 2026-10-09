/**
 * Invoice form reset (WF-001): one action clears storage, RHF state, and
 * therefore the preview (which reads via `watch`).
 */

export const INVOICE_STORAGE_KEYS = [
  "yourEmail", "yourName", "yourAddress", "yourCity", "yourState",
  "yourCountry", "yourLogo", "yourTaxId", "yourZip",
  "email", "companyName", "companyAddress", "companyCity", "companyState",
  "companyCountry", "companyLogo", "companyTaxId", "companyZip",
  "note", "discount", "tax",
  "bankName", "accountNumber", "accountName", "routingCode", "swiftCode", "ifscCode",
  "invoiceNo", "issueDate", "dueDate", "currency", "step", "items", "showPayableIn", "invoiceTemplate",
] as const;

/** Every registered field back to its fresh-mount value (empty storage). */
export const INVOICE_FORM_DEFAULTS: Record<string, unknown> = {
  invoiceTemplate: "stripe",
  items: [{ itemDescription: "" }],
  step: "1",
  ...Object.fromEntries(
    INVOICE_STORAGE_KEYS.filter(
      (key) => key !== "invoiceTemplate" && key !== "items" && key !== "step"
    ).map((key) => [key, ""])
  ),
};

/** Remove every persisted invoice field; leave history/logs untouched. */
export function resetInvoiceStorage(): void {
  INVOICE_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
  localStorage.setItem("step", "1");
}

type ResettableForm = { reset: (values: Record<string, unknown>) => void };

/**
 * The full Reset action: storage + form state (preview follows because it
 * watches the form context).
 */
export function resetInvoiceForm(
  methods: ResettableForm,
  after?: () => void
): void {
  resetInvoiceStorage();
  methods.reset(INVOICE_FORM_DEFAULTS);
  after?.();
}
