"use client";
import CustomTextInput from "@/app/component/ui/customTextInput";
import CustomNumberInput from "@/app/component/ui/customNumberInput";
import { Controller, useFormContext } from "react-hook-form";
import { getInitialValue } from "@/lib/getInitialValue";

export const PaymentDetailsForm = () => {
  const { control } = useFormContext();

  return (
    <div className="pt-24">
      <p className="text-2xl font-semibold pb-1">Payment Details</p>
      <p className="text-sm text-neutral-400 pb-5">Optional — skip if not needed</p>
      <CustomTextInput
        label="Bank name"
        placeholder="HBL"
        variableName="bankName"
      />
      <CustomTextInput
        label="Account number"
        placeholder="1234567890"
        variableName="accountNumber"
      />
      <CustomTextInput
        label="Account Name"
        placeholder="Muhammad Abdullah"
        variableName="accountName"
      />
      <CustomTextInput
        label="IFSC code"
        placeholder="HBL1234567"
        variableName="ifscCode"
      />
      <CustomTextInput
        label="Routing number"
        placeholder="123456789"
        variableName="routingCode"
      />
      <CustomNumberInput
        label="Swift code"
        placeholder="HBLPPKKA"
        variableName="swiftCode"
      />
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
