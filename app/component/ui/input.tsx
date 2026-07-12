import { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => (
    <div
      className={`relative w-full border border-gray-200 transition-all
        hover:border-gray-400
        focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500
        max-md:rounded-xl max-md:bg-white max-md:px-4 max-md:pt-5 max-md:pb-2 max-md:h-[60px]
        md:flex md:items-center md:rounded-lg md:px-3 ${
          label ? "md:h-[52px]" : "md:h-[42px]"
        }`}
    >
      {label && (
        <label
          htmlFor={label}
          className={`
            max-md:text-xs max-md:font-medium max-md:text-gray-400 max-md:block max-md:leading-tight
            md:block md:text-sm md:font-medium md:leading-6 md:text-gray-700 md:whitespace-nowrap md:mr-2
          `}
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
        className={`peer block w-full border-0 bg-transparent caret-orange-500 focus:ring-0
          max-md:text-sm max-md:font-semibold max-md:text-gray-900 max-md:p-0 max-md:text-left max-md:mt-0.5
          md:py-1.5 md:text-gray-900 md:sm:text-sm md:sm:leading-6 ${
            label ? "md:text-right" : "md:p-0"
          } placeholder:text-neutral-400`}
      />
    </div>
  )
);

Input.displayName = "Input";

export { Input };
