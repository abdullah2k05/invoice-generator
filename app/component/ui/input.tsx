import { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => (
    <div
      className={`flex items-center relative border border-gray-200 rounded-lg px-3 hover:border-gray-400 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 transition-all ${
        label ? "h-[52px]" : "h-[42px]"
      }`}
    >
      {label && (
        <label
          htmlFor={label}
          className="block text-sm font-medium leading-6 text-gray-700 whitespace-nowrap mr-2"
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
        className={`peer block w-full border-0 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6 ${
          label ? "text-right" : ""
        } placeholder:text-neutral-400 placeholder:font-normal caret-orange-500 bg-transparent`}
      />
    </div>
  )
);

Input.displayName = "Input";

export { Input };
