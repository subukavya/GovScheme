import { Sparkles, CheckCircle2, ShieldAlert } from "lucide-react";

export interface BadgeProps {
  matchPercentage?: number;
  label?: string;
  variant?: "match" | "category" | "status" | "gold" | "outline";
  size?: "sm" | "md";
}

export default function Badge({
  matchPercentage,
  label,
  variant = "category",
  size = "md",
}: BadgeProps) {
  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs font-semibold rounded-lg gap-1",
    md: "px-3 py-1.5 text-xs font-bold rounded-xl gap-1.5",
  };

  if (matchPercentage !== undefined) {
    const isHigh = matchPercentage >= 85;
    const isMedium = matchPercentage >= 70 && matchPercentage < 85;

    return (
      <span
        className={`inline-flex items-center ${sizeClasses[size]} ${
          isHigh
            ? "bg-emerald-50 text-[#10B981] border border-emerald-200"
            : isMedium
            ? "bg-[#DBEAFE] text-[#2563EB] border border-blue-200"
            : "bg-amber-50 text-[#F59E0B] border border-amber-200"
        }`}
      >
        <Sparkles size={13} className={isHigh ? "text-[#10B981]" : isMedium ? "text-[#2563EB]" : "text-[#F59E0B]"} />
        <span>{matchPercentage}% Match</span>
      </span>
    );
  }

  const variants: Record<string, string> = {
    category: "bg-[#DBEAFE] text-[#2563EB] border border-blue-200/80 font-bold",
    status: "bg-emerald-50 text-[#10B981] border border-emerald-200/80 font-bold",
    gold: "bg-amber-50 text-[#F59E0B] border border-amber-200 font-bold",
    outline: "bg-white text-[#64748B] border border-[#E2E8F0] font-medium",
    match: "bg-[#DBEAFE] text-[#2563EB] border border-blue-200/80 font-bold",
  };

  return (
    <span className={`inline-flex items-center ${sizeClasses[size]} ${variants[variant] || variants.category}`}>
      {variant === "status" && <CheckCircle2 size={13} className="text-[#10B981]" />}
      {variant === "gold" && <ShieldAlert size={13} className="text-[#F59E0B]" />}
      <span>{label}</span>
    </span>
  );
}
