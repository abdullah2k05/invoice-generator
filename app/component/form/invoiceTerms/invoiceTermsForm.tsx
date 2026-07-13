"use client";
import CustomTextInput from "@/app/component/ui/customTextInput";
import DateInput from "@/app/component/ui/dateInput";
import { getInitialValue } from "@/lib/getInitialValue";
import { Controller } from "react-hook-form";
import { CalendarIcon } from "lucide-react";

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

export const InvoiceTermsForm = ({ compact }: { compact?: boolean }) => (
  <div>
    {!compact && <p className="text-xl md:text-2xl font-semibold pb-3">Invoice terms</p>}

    {/* Mobile: native date inputs */}
    <div className="md:hidden">
      <CustomTextInput
        label="Invoice number"
        placeholder="INVOICE-01"
        variableName="invoiceNo"
      />
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
      <DateInput label="Issue date" variableName="issueDate" />
      <DateInput label="Due date" variableName="dueDate" />
    </div>
  </div>
);
