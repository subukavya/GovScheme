import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glass?: boolean;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  onClick?: () => void;
}

export default function Card({
  children,
  className = "",
  hoverEffect = false,
  glass = true,
  padding = "lg",
  onClick,
}: CardProps) {
  const paddings = {
    none: "p-0",
    sm: "p-4 sm:p-5",
    md: "p-6 sm:p-7",
    lg: "p-8 sm:p-10",
    xl: "p-10 sm:p-12",
  };

  const glassStyle = glass
    ? "bg-white/90 backdrop-blur-xl border border-slate-200/70 shadow-sm shadow-slate-200/50"
    : "bg-white border border-slate-200/80 shadow-xs";

  const hoverStyle = hoverEffect
    ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-300/80 cursor-pointer"
    : "";

  return (
    <div
      onClick={onClick}
      className={`rounded-3xl ${glassStyle} ${paddings[padding]} ${hoverStyle} ${className}`}
    >
      {children}
    </div>
  );
}