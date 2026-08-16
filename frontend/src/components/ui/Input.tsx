import { type InputHTMLAttributes, type ReactNode, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  helperText?: string;
  floatingLabel?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, helperText, className = "", id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full text-left">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-4 text-[#64748B] pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`
              w-full min-h-[50px] rounded-[16px] border bg-[#FFFFFF] px-4 py-3.5 text-[#0F172A] text-sm font-medium transition-all duration-200
              placeholder:text-[#64748B] placeholder:font-normal focus:outline-none focus:bg-white focus:ring-4
              ${leftIcon ? "pl-11" : ""}
              ${rightIcon ? "pr-11" : ""}
              ${
                error
                  ? "border-[#EF4444] focus:border-[#EF4444] focus:ring-red-100 bg-red-50/20"
                  : "border-[#E2E8F0] hover:border-slate-300 focus:border-[#2563EB] focus:ring-blue-100"
              }
              ${className}
            `}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-4 text-[#64748B] flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="mt-2 text-xs text-[#EF4444] font-semibold flex items-center gap-1">
            <span>⚠️</span> {error}
          </p>
        ) : helperText ? (
          <p className="mt-2 text-xs text-[#64748B]">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;