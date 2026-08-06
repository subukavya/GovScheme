import { Sparkles, CheckCircle2, ShieldAlert } from "lucide-react";

interface BadgeProps {
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
    sm: "px-2.5 py-0.5 text-xs font-semibold rounded-md gap-1",
    md: "px-3 py-1 text-xs font-bold rounded-lg gap-1.5",
  };

  if (matchPercentage !== undefined) {
    const isHigh = matchPercentage >= 85;
    const isMedium = matchPercentage >= 70 && matchPercentage < 85;

    return (
      <span
        className={`inline-flex items-center ${sizeClasses[size]} ${
          isHigh
            ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-sm shadow-emerald-500/20"
            : isMedium
            ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-sm shadow-blue-500/20"
            : "bg-amber-100 text-amber-800 border border-amber-300"
        }`}
      >
        <Sparkles size={12} className={isHigh || isMedium ? "fill-white/80" : "text-amber-700"} />
        <span>{matchPercentage}% Match</span>
      </span>
    );
  }

  const variants: Record<string, string> = {
    category: "bg-blue-50 text-blue-700 border border-blue-200/60 font-semibold",
    status: "bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-semibold",
    gold: "bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-extrabold shadow-xs",
    outline: "bg-slate-50 text-slate-600 border border-slate-200 font-medium",
    match: "bg-blue-50 text-blue-700 border border-blue-200/60 font-semibold",
  };

  return (
    <span className={`inline-flex items-center ${sizeClasses[size]} ${variants[variant] || variants.category}`}>
      {variant === "status" && <CheckCircle2 size={12} className="text-emerald-600" />}
      {variant === "gold" && <ShieldAlert size={12} className="text-slate-900" />}
      <span>{label}</span>
    </span>
  );
}
