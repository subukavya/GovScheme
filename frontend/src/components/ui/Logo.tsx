import { Shield, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  clickable?: boolean;
}

export default function Logo({ size = "md", clickable = true }: LogoProps) {
  const iconSizes = {
    sm: 18,
    md: 24,
    lg: 32,
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const content = (
    <div className="flex items-center gap-2.5 group cursor-pointer">
      <div className="relative flex items-center justify-center">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
          <Shield size={iconSizes[size]} className="text-white" />
        </div>
        <div className="absolute -top-1 -right-1 bg-amber-400 text-slate-900 rounded-full p-0.5 shadow">
          <Sparkles size={10} className="fill-amber-400" />
        </div>
      </div>
      <div className="flex flex-col">
        <div className={`font-black tracking-tight ${textSizes[size]} text-slate-900 flex items-center gap-1`}>
          GovScheme
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            AI
          </span>
        </div>
        <span className="text-[10px] font-semibold tracking-wider text-blue-700 uppercase -mt-1">
          Government Welfare Portal
        </span>
      </div>
    </div>
  );

  if (clickable) {
    return <Link to="/">{content}</Link>;
  }

  return content;
}