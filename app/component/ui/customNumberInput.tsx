"use client";

import { Input } from "@/app/component/ui/input";
import { getInitialValue } from "@/lib/getInitialValue";
import { isAcceptableNumericInput } from "@/lib/money";
import { Controller } from "react-hook-form";

type CustomNumberProps = {
  label?: string;
  placeholder: string;
  variableName: string;
  inputMode?: 'text' | 'email' | 'tel' | 'url' | 'numeric' | 'decimal' | 'search';
  /** Reject anything that is not a well-formed non-negative decimal (VAL-001). */
  numeric?: boolean;
};

export const CustomNumberInput = ({
  label,
  placeholder,
  variableName,
  inputMode,
  numeric,
}: CustomNumberProps) => (
  <Controller
    render={({ field: { onChange, value } }) => (
      <Input
        label={label}
        placeholder={placeholder}
        value={value}
        type="text"
        pattern="[0-9]*"
        inputMode={inputMode || "numeric"}
        onChange={(e) => {
          const updatedValue = e.target.value;
          if (numeric && !isAcceptableNumericInput(updatedValue, "decimal")) {
            // Invalid keystroke/paste: keep the previous valid value.
            return;
          }
          localStorage.setItem(variableName, updatedValue);
          onChange(updatedValue);
        }}
      />
    )}
    defaultValue={getInitialValue(variableName)}
    name={variableName}
  />
);

export default CustomNumberInput;
