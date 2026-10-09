import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm, FormProvider } from "react-hook-form";
import { readFileSync } from "node:fs";
import path from "node:path";
import CustomNumberInput from "@/app/component/ui/customNumberInput";
import { useGetValue } from "@/app/hooks/useGetValue";
import {
  resetInvoiceForm,
  resetInvoiceStorage,
  INVOICE_FORM_DEFAULTS,
} from "@/lib/resetInvoiceForm";

/** Mimics the real app: form context + a preview that watches the field. */
const Preview = () => {
  const preview = useGetValue("discount");
  return <output data-testid="preview">{preview}</output>;
};

const Harness = () => {
  const methods = useForm({ defaultValues: { invoiceTemplate: "stripe" } });
  return (
    <FormProvider {...methods}>
      <CustomNumberInput label="Discount" placeholder="$0" variableName="discount" numeric />
      <Preview />
      <button type="button" onClick={() => resetInvoiceForm(methods)}>
        Reset
      </button>
    </FormProvider>
  );
};

beforeEach(() => {
  localStorage.clear();
});

describe("WF-001: Reset clears storage, form state, and preview", () => {
  it("clears a filled invoice in one action", async () => {
    localStorage.setItem("discount", "50");
    localStorage.setItem("tax", "10");
    localStorage.setItem("companyName", "Acme");
    localStorage.setItem("invoiceNo", "INV-042");
    localStorage.setItem("step", "3");

    const user = userEvent.setup();
    render(<Harness />);

    // pre-state: input and preview both show the stored value
    expect(screen.getByLabelText("Discount")).toHaveValue("50");
    expect(screen.getByTestId("preview")).toHaveTextContent("50");

    await user.click(screen.getByRole("button", { name: "Reset" }));

    // form state cleared
    expect(screen.getByLabelText("Discount")).toHaveValue("");
    expect(screen.getByTestId("preview")).toHaveTextContent("");
    // storage cleared, step back at 1
    expect(localStorage.getItem("discount")).toBeNull();
    expect(localStorage.getItem("tax")).toBeNull();
    expect(localStorage.getItem("companyName")).toBeNull();
    expect(localStorage.getItem("invoiceNo")).toBeNull();
    expect(localStorage.getItem("step")).toBe("1");
    // invoice history untouched
    expect(localStorage.getItem("invoices")).toBeNull();
  });

  it("leaves the form usable after reset (re-typing works)", async () => {
    localStorage.setItem("discount", "50");
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole("button", { name: "Reset" }));
    await user.type(screen.getByLabelText("Discount"), "25");
    expect(screen.getByTestId("preview")).toHaveTextContent("25");
    expect(localStorage.getItem("discount")).toBe("25");
  });

  it("resetInvoiceStorage removes every invoice key and sets step to 1", () => {
    localStorage.setItem("yourLogo", "data:...");
    localStorage.setItem("swiftCode", "ABC");
    localStorage.setItem("step", "5");
    resetInvoiceStorage();
    expect(localStorage.getItem("yourLogo")).toBeNull();
    expect(localStorage.getItem("swiftCode")).toBeNull();
    expect(localStorage.getItem("step")).toBe("1");
  });

  it("INVOICE_FORM_DEFAULTS restores fresh-mount values for every field", () => {
    expect(INVOICE_FORM_DEFAULTS.invoiceTemplate).toBe("stripe");
    expect(INVOICE_FORM_DEFAULTS.step).toBe("1");
    expect(INVOICE_FORM_DEFAULTS.items).toEqual([{ itemDescription: "" }]);
    expect(INVOICE_FORM_DEFAULTS.discount).toBe("");
    expect(INVOICE_FORM_DEFAULTS.currency).toBe("");
    expect(INVOICE_FORM_DEFAULTS.companyZip).toBe("");
  });

  it("NewInvoiceForm no longer ships the dead clearAllData duplicate", () => {
    const src = readFileSync(
      path.resolve(__dirname, "../app/new/component/NewInvoiceForm.tsx"),
      "utf8"
    );
    expect(src).not.toContain("clearAllData");
    expect(src).not.toContain("window.location.reload");
    expect(src).toContain("resetInvoiceForm");
  });
});
