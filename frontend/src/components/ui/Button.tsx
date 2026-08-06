import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  text?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "glass";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

export default function Button({
  children,
  text,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none cursor-pointer tracking-tight";

  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/15 focus:ring-blue-500 border border-transparent",
    secondary:
      "bg-slate-100 text-slate-800 hover:bg-slate-200/80 border border-slate-200/60 focus:ring-slate-400",
    outline:
      "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-xs focus:ring-slate-400",
    ghost:
      "bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 focus:ring-slate-300",
    danger:
      "bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/15 focus:ring-rose-500",
    glass:
      "bg-white/70 backdrop-blur-md hover:bg-white text-slate-800 border border-slate-200/80 shadow-xs focus:ring-blue-400",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs gap-1.5 rounded-xl",
    md: "px-5 py-2.5 text-sm gap-2 rounded-2xl",
    lg: "px-7 py-3.5 text-base gap-2.5 rounded-2xl font-bold",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" size={size === "sm" ? 14 : size === "md" ? 18 : 20} />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span>{children || text}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
}