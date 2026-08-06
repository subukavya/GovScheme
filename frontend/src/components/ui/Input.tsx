import { type InputHTMLAttributes, type ReactNode, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, helperText, className = "", ...props }, ref) => {
    return (
      <div className="w-full text-left">
        {label && (
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full rounded-xl border bg-white/70 px-4 py-3 text-slate-900 text-sm font-medium transition-all duration-200
              placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-4
              ${leftIcon ? "pl-11" : ""}
              ${rightIcon ? "pr-11" : ""}
              ${
                error
                  ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100"
                  : "border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-blue-100"
              }
              ${className}
            `}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 text-slate-400 flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="mt-1.5 text-xs text-rose-500 font-medium">{error}</p>
        ) : helperText ? (
          <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;