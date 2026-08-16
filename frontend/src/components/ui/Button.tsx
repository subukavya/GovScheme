import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
  onClick,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer tracking-tight rounded-[16px]";

  const variants = {
    primary:
      "bg-[#2563EB] hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 active:bg-blue-800 border border-transparent",
    secondary:
      "bg-[#DBEAFE] text-[#2563EB] hover:bg-blue-200 border border-blue-200/80 active:bg-blue-300",
    outline:
      "bg-white hover:bg-slate-50 text-[#0F172A] border border-[#E2E8F0] shadow-xs active:bg-slate-100",
    ghost:
      "bg-transparent hover:bg-slate-100 text-[#64748B] hover:text-[#0F172A] active:bg-slate-200/60",
    danger:
      "bg-[#EF4444] hover:bg-red-600 text-white shadow-md shadow-red-500/20 active:bg-red-700 border border-transparent",
    glass:
      "bg-white/80 backdrop-blur-md hover:bg-white text-[#0F172A] border border-[#E2E8F0] shadow-xs active:bg-slate-100",
  };

  const sizes = {
    sm: "min-h-[40px] px-4 py-2 text-xs gap-2 rounded-[14px]",
    md: "min-h-[48px] px-6 py-3 text-sm gap-2.5 rounded-[16px]",
    lg: "min-h-[54px] px-8 py-4 text-base gap-3 rounded-[20px]",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <motion.button
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...(props as any)}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" size={size === "sm" ? 16 : size === "md" ? 18 : 20} />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span>{children || text}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </motion.button>
  );
}