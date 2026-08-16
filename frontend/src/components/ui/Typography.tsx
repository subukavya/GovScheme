import { type ReactNode, type HTMLAttributes, type ElementType } from "react";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4;
  children: ReactNode;
  className?: string;
}

export function Heading({ level = 1, children, className = "", ...props }: HeadingProps) {
  const styles = {
    1: "text-3xl sm:text-5xl font-bold tracking-tight text-[#0F172A]",
    2: "text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]",
    3: "text-xl sm:text-2xl font-bold text-[#0F172A]",
    4: "text-lg font-bold text-[#0F172A]",
  };

  const Component: ElementType = `h${level}`;

  return (
    <Component className={`${styles[level]} ${className}`} {...props}>
      {children}
    </Component>
  );
}

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: "xs" | "sm" | "base" | "lg";
  variant?: "primary" | "secondary" | "muted" | "danger" | "success";
  children: ReactNode;
  className?: string;
}

export function Text({
  size = "sm",
  variant = "primary",
  children,
  className = "",
  ...props
}: TextProps) {
  const sizes = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
  };

  const variants = {
    primary: "text-[#0F172A]",
    secondary: "text-[#64748B]",
    muted: "text-slate-400",
    danger: "text-[#EF4444]",
    success: "text-[#10B981]",
  };

  return (
    <p className={`font-normal leading-relaxed ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </p>
  );
}
