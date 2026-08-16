import { type ReactNode } from "react";
import { motion } from "framer-motion";

export interface CardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glass?: boolean;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  onClick?: () => void;
  tabIndex?: number;
  role?: string;
  ariaLabel?: string;
}

export default function Card({
  children,
  className = "",
  hoverEffect = false,
  glass = false,
  padding = "lg",
  onClick,
  tabIndex,
  role,
  ariaLabel,
}: CardProps) {
  const paddings = {
    none: "p-0",
    sm: "p-4 sm:p-5",
    md: "p-5 sm:p-6",
    lg: "p-6 sm:p-8",
    xl: "p-8 sm:p-12",
  };

  const baseStyle = glass
    ? "bg-white/95 backdrop-blur-md border border-[#E2E8F0] shadow-soft"
    : "bg-[#FFFFFF] border border-[#E2E8F0] shadow-soft";

  return (
    <motion.div
      onClick={onClick}
      tabIndex={tabIndex}
      role={role}
      aria-label={ariaLabel}
      whileHover={
        hoverEffect
          ? { y: -4, boxShadow: "0 16px 32px -4px rgba(15, 23, 42, 0.08)" }
          : undefined
      }
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`rounded-[20px] ${baseStyle} ${paddings[padding]} ${
        hoverEffect ? "cursor-pointer transition-colors hover:border-blue-300" : ""
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}