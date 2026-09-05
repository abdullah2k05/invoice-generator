import { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => (
    <div className={`input-wrapper ${label ? "pt-4 pb-1.5" : "py-2"} ${className || ""}`}>
      {label && (
        <label
          htmlFor={props.name || label}
          className="input-label"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        {...props}
        name={props.name || label}
        id={props.name || label}
        className="input-field"
      />
    </div>
  )
);

Input.displayName = "Input";

export { Input };
