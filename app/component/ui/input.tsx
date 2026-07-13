import { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => (
    <div
      className={`relative w-full border transition-all duration-200
        border-gray-200 hover:border-gray-400
        focus-within:border-orange-500 focus-within:shadow-[0_0_0_3px_rgba(249,115,22,0.1)]
        rounded-xl bg-white px-4 pt-5 pb-2 ${
          label ? "h-[60px]" : "h-[52px]"
        } ${className || ""}`}
    >
      {label && (
        <label
          htmlFor={label}
          className="block text-xs font-medium text-gray-400 leading-tight"
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
        className="peer block w-full border-0 bg-transparent caret-orange-500 focus:ring-0 p-0 mt-0.5 text-sm font-semibold text-gray-900 placeholder:text-neutral-400"
      />
    </div>
  )
);

Input.displayName = "Input";

export { Input };
