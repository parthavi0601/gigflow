import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, id, ...props }, ref) => {
    return (
      <div className="input-wrapper">
        {label && (
          <label htmlFor={id} className="input-label">
            {label}
          </label>
        )}
        <div className={cn(icon ? "input-with-icon" : "")}>
          {icon && <span className="input-icon">{icon}</span>}
          <input
            ref={ref}
            id={id}
            className={cn("input-field", error && "input-error", className)}
            {...props}
          />
        </div>
        {error && <span className="input-error-text">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
