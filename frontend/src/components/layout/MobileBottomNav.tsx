import { Link, useLocation } from "react-router-dom";
import { Home, FileText, Bot, User } from "lucide-react";

interface MobileBottomNavProps {
  onOpenAI?: () => void;
}

export default function MobileBottomNav({ onOpenAI }: MobileBottomNavProps) {
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "Schemes", path: "/schemes", icon: FileText },
    { label: "AI", path: "#ai", icon: Bot, isAction: true },
    { label: "Profile", path: "/profile", icon: User },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] shadow-lg px-2 py-2"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = !item.isAction && location.pathname === item.path;

          if (item.isAction) {
            return (
              <button
                key={item.label}
                onClick={onOpenAI}
                className="flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer min-w-[56px] min-h-[48px] text-[#64748B] hover:text-[#2563EB] focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                <div className="w-9 h-9 rounded-full bg-[#2563EB] text-white flex items-center justify-center shadow-md shadow-blue-600/30 mb-0.5">
                  <Icon size={20} />
                </div>
                <span className="text-[11px] font-bold text-[#2563EB]">{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all min-w-[56px] min-h-[48px] focus-visible:ring-2 focus-visible:ring-blue-600 ${
                isActive
                  ? "text-[#2563EB] font-bold"
                  : "text-[#64748B] font-medium hover:text-[#0F172A]"
              }`}
            >
              <Icon size={20} className={isActive ? "text-[#2563EB]" : "text-[#64748B]"} />
              <span className="text-[11px] mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
