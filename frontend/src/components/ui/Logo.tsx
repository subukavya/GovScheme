import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

export interface LogoProps {
  size?: "sm" | "md" | "lg";
  clickable?: boolean;
}

export default function Logo({ size = "md", clickable = true }: LogoProps) {
  const iconSizes = {
    sm: 18,
    md: 22,
    lg: 28,
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl sm:text-2xl",
    lg: "text-2xl sm:text-3xl",
  };

  const content = (
    <div className="flex items-center gap-3 group cursor-pointer">
      <div className="w-10 h-10 rounded-[14px] bg-[#2563EB] flex items-center justify-center text-white shadow-sm shadow-blue-600/30 group-hover:scale-105 transition-transform duration-200 shrink-0">
        <Shield size={iconSizes[size]} className="text-white" />
      </div>
      <div className="flex flex-col">
        <div className={`font-extrabold tracking-tight ${textSizes[size]} text-[#0F172A] flex items-center gap-1`}>
          GovScheme
          <span className="text-[#2563EB]">
            AI
          </span>
        </div>
        <span className="text-[10px] font-bold tracking-wider text-[#64748B] uppercase -mt-0.5">
          Government Welfare Portal
        </span>
      </div>
    </div>
  );

  if (clickable) {
    return <Link to="/" className="inline-block focus-visible:ring-2 focus-visible:ring-blue-600 rounded-[14px]">{content}</Link>;
  }

  return content;
}