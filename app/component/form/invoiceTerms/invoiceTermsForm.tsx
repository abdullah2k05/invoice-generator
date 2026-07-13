"use client";
import CustomTextInput from "@/app/component/ui/customTextInput";
import DateInput from "@/app/component/ui/dateInput";
import { getInitialValue } from "@/lib/getInitialValue";
import { Controller } from "react-hook-form";
import { CalendarIcon } from "lucide-react";

const MobileDateField = ({ label, variableName }: { label: string; variableName: string }) => (
  <Controller
    render={({ field: { onChange, value } }) => (
      <div className="relative w-full border border-gray-200 rounded-xl bg-white px-4 pt-5 pb-2 h-[60px] focus-within:border-orange-500 focus-within:shadow-[0_0_0_3px_rgba(249,115,22,0.1)] transition-all duration-200">
        <label className="text-xs font-medium text-gray-400 block leading-tight">{label}</label>
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
          className="w-full bg-transparent text-sm font-semibold text-gray-900 border-0 p-0 mt-0.5 focus:outline-none [color-scheme:light]"
        />
      </div>
    )}
    name={variableName}
    defaultValue={getInitialValue(variableName)}
  />
);

export const InvoiceTermsForm = () => (
  <div className="pt-2">
    <p className="text-xl md:text-2xl font-semibold pb-3">Invoice terms</p>

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
