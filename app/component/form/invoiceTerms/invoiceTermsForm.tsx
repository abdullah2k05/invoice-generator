"use client";
import CustomTextInput from "@/app/component/ui/customTextInput";
import DateInput from "@/app/component/ui/dateInput";
import { getInitialValue } from "@/lib/getInitialValue";
import { Controller, useFormContext } from "react-hook-form";
import { CalendarIcon, Hash } from "lucide-react";
import { useEffect, useRef } from "react";
import { getInvoiceCounter, incrementInvoiceCounter, resetInvoiceCounter } from "@/lib/localData";

const MobileDateField = ({ label, variableName }: { label: string; variableName: string }) => (
  <Controller
    render={({ field: { onChange, value } }) => (
      <div className="relative w-full bg-white border-b-2 border-[#E2E8F0] transition-all duration-200 focus-within:border-[#0F172A] pt-5 pb-1.5">
        <label className="block text-[11px] font-medium text-[#94A3B8] uppercase tracking-wider leading-none mb-0.5">{label}</label>
        <input
          type="date"
          value={value ? new Date(value).toISOString().split("T")[0] : ""}
          onChange={(e) => {
            if (e.target.value) {
              const d = new Date(e.target.value + "T00:00:00");
              onChange(d.toString());
              localStorage.setItem(variableName, d.toString());
            }
          }}
          className="w-full bg-transparent text-sm font-medium text-[#0F172A] border-0 p-0 focus:outline-none [color-scheme:light]"
        />
      </div>
    )}
    name={variableName}
    defaultValue={getInitialValue(variableName)}
  />
);

export const InvoiceTermsForm = ({ compact }: { compact?: boolean }) => {
  const { setValue } = useFormContext();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const existing = localStorage.getItem("invoiceNo");
    if (!existing) {
      const next = incrementInvoiceCounter();
      const padded = String(next).padStart(3, "0");
      const val = `INV-${padded}`;
      setValue("invoiceNo", val);
      localStorage.setItem("invoiceNo", val);
    }
  }, [setValue]);

  return (
  <div>
    {!compact && <p className="text-xl md:text-2xl font-semibold pb-3">Invoice terms</p>}

    {/* Mobile: native date inputs */}
    <div className="md:hidden">
      <CustomTextInput
        label="Invoice number"
        placeholder="INVOICE-01"
        variableName="invoiceNo"
      />
      <button
        type="button"
        onClick={() => {
          const next = getInvoiceCounter() + 1;
          const padded = String(next).padStart(3, "0");
          const val = `INV-${padded}`;
          setValue("invoiceNo", val);
          localStorage.setItem("invoiceNo", val);
          localStorage.setItem("invoice_counter", String(next));
        }}
        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#4F46E5] mt-1 mb-2 transition-colors"
      >
        <Hash className="w-3 h-3" />
        Next: INV-{String(getInvoiceCounter() + 1).padStart(3, "0")}
      </button>
      <MobileDateField label="Issue date" variableName="issueDate" />
      <MobileDateField label="Due date" variableName="dueDate" />
    </div>

    {/* Desktop: popover date pickers */}
    <div className="max-md:hidden">
      <CustomTextInput
        label="Invoice number"
        placeholder="INVOICE-01"
        variableName="invoiceNo"
      />
      <button
        type="button"
        onClick={() => {
          const next = getInvoiceCounter() + 1;
          const padded = String(next).padStart(3, "0");
          const val = `INV-${padded}`;
          setValue("invoiceNo", val);
          localStorage.setItem("invoiceNo", val);
          localStorage.setItem("invoice_counter", String(next));
        }}
        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#4F46E5] mt-1 mb-2 transition-colors"
      >
        <Hash className="w-3 h-3" />
        Next: INV-{String(getInvoiceCounter() + 1).padStart(3, "0")}
      </button>
      <DateInput label="Issue date" variableName="issueDate" />
      <DateInput label="Due date" variableName="dueDate" />
    </div>
  </div>
  );
};
