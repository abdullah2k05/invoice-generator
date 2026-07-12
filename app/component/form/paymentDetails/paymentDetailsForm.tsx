"use client";
import CustomTextInput from "@/app/component/ui/customTextInput";
import CustomNumberInput from "@/app/component/ui/customNumberInput";
import { Controller, useFormContext } from "react-hook-form";
import { getInitialValue } from "@/lib/getInitialValue";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export const PaymentDetailsForm = () => {
  const { control } = useFormContext();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="pt-6 md:pt-24">
      <p className="text-xl md:text-2xl font-semibold pb-1">Payment Details</p>
      <p className="text-sm text-neutral-400 pb-5">Optional — skip if not needed</p>

      {/* Mobile: accordion toggle */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full flex items-center justify-between py-3 px-4 bg-white border border-gray-200 rounded-xl active:bg-gray-50 transition-colors"
        >
          <span className="text-sm font-medium text-gray-700">Bank Account Details</span>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform ${mobileOpen ? "rotate-180" : ""}`}
          />
        </button>
        {mobileOpen && (
          <div className="mt-3 space-y-0 animate-in slide-in-from-top-2 duration-200">
            <CustomTextInput label="Bank name" placeholder="HBL" variableName="bankName" />
            <CustomTextInput label="Account number" placeholder="1234567890" variableName="accountNumber" />
            <CustomTextInput label="Account Name" placeholder="Muhammad Abdullah" variableName="accountName" />
            <CustomTextInput label="IFSC code" placeholder="HBL1234567" variableName="ifscCode" />
            <CustomTextInput label="Routing number" placeholder="123456789" variableName="routingCode" />
            <CustomNumberInput label="Swift code" placeholder="HBLPPKKA" variableName="swiftCode" />
          </div>
        )}
      </div>

      {/* Desktop: always visible */}
      <div className="max-md:hidden">
        <CustomTextInput label="Bank name" placeholder="HBL" variableName="bankName" />
        <CustomTextInput label="Account number" placeholder="1234567890" variableName="accountNumber" />
        <CustomTextInput label="Account Name" placeholder="Muhammad Abdullah" variableName="accountName" />
        <CustomTextInput label="IFSC code" placeholder="HBL1234567" variableName="ifscCode" />
        <CustomTextInput label="Routing number" placeholder="123456789" variableName="routingCode" />
        <CustomNumberInput label="Swift code" placeholder="HBLPPKKA" variableName="swiftCode" />
      </div>

      <div className="pt-6">
        <Controller
          render={({ field: { onChange, value } }) => (
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={value === "true"}
                onChange={(e) => {
                  const val = e.target.checked ? "true" : "false";
                  localStorage.setItem("showPayableIn", val);
                  onChange(val);
                }}
                className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              />
              <span className="text-sm text-neutral-600">Show currency on invoice</span>
            </label>
          )}
          name="showPayableIn"
          defaultValue={getInitialValue("showPayableIn", "true")}
        />
      </div>
    </div>
  );
};
