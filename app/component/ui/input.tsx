import { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => (
    <div
      className={`relative w-full transition-all duration-200
        bg-white border-b-2 border-[#E2E8F0]
        focus-within:border-[#0F172A]
        ${label ? "pt-5 pb-1.5" : "py-2"}
        ${className || ""}`}
    >
      {label && (
        <label
          htmlFor={label}
          className="block text-[11px] font-medium text-[#94A3B8] uppercase tracking-wider leading-none mb-0.5"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        {...props}
        name={label}
        id={label}
        className="peer block w-full border-0 bg-transparent caret-[#0F172A] focus:ring-0 p-0 text-sm font-medium text-[#0F172A] placeholder:text-[#CBD5E1]"
      />
    </div>
  )
);

Input.displayName = "Input";

export { Input };
