import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import type { SelectOption } from "../../types/common";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className, id, ...props }, ref) => {
    return (
      <div className="input-wrapper">
        {label && (
          <label htmlFor={id} className="input-label">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          className={cn("select-field", error && "input-error", className)}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <span className="input-error-text">{error}</span>}
      </div>
    );
  }
);

Select.displayName = "Select";
