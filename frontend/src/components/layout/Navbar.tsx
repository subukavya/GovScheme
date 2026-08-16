import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { User, LogOut, Home, FileText, Bot, Menu, X } from "lucide-react";
import Logo from "../ui/Logo";
import LanguageSelector from "../common/LanguageSelector";
import AIAssistantWidget from "../common/AIAssistantWidget";
import { useAuth } from "../../context/AuthContext";
import { useUserProfile } from "../../context/UserProfileContext";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { profile } = useUserProfile();
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate("/");
  };

  const navLinks = [
    { label: "Home", path: "/", icon: Home },
    { label: "Schemes", path: "/schemes", icon: FileText },
    { label: "AI Assistant", path: "#ai", icon: Bot, isAction: true },
    { label: "Profile", path: "/profile", icon: User },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-soft">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5" aria-label="Desktop Navigation">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = !link.isAction && location.pathname === link.path;

              if (link.isAction) {
                return (
                  <button
                    key={link.label}
                    onClick={() => setAiAssistantOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#2563EB] hover:bg-[#DBEAFE]/50 rounded-[14px] transition-all cursor-pointer min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                  >
                    <Icon size={18} className="text-[#2563EB]" />
                    {link.label}
                  </button>
                );
              }

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-[14px] transition-all min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                    isActive
                      ? "bg-slate-100 text-[#2563EB]"
                      : "text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50"
                  }`}
                >
                  <Icon size={18} className={isActive ? "text-[#2563EB]" : "text-[#64748B]"} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Controls: Language Selector & Auth */}
          <div className="flex items-center gap-3">
            <LanguageSelector />

            {isAuthenticated ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-[14px] border border-[#E2E8F0] bg-slate-50 hover:bg-slate-100 transition-all min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                >
                  <div className="h-8 w-8 rounded-[10px] bg-[#2563EB] text-white font-bold flex items-center justify-center text-xs shadow-xs">
                    {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="hidden lg:inline text-xs font-bold text-[#0F172A]">
                    {profile.name.split(" ")[0]}
                  </span>
                </Link>

                <button
                  onClick={handleLogout}
                  title="Logout"
                  aria-label="Logout"
                  className="flex items-center justify-center h-11 w-11 rounded-[14px] text-[#64748B] hover:text-[#EF4444] hover:bg-red-50 border border-[#E2E8F0] transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-5 py-2.5 text-sm font-bold text-white bg-[#2563EB] hover:bg-blue-700 rounded-[14px] shadow-md shadow-blue-600/20 transition-all focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                >
                  Login / Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#64748B] hover:bg-slate-100 rounded-[14px] min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#2563EB]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#E2E8F0] bg-white px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = !link.isAction && location.pathname === link.path;

              if (link.isAction) {
                return (
                  <button
                    key={link.label}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setAiAssistantOpen(true);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-[#2563EB] hover:bg-[#DBEAFE]/50 rounded-[14px] text-left min-h-[48px]"
                  >
                    <Icon size={18} />
                    {link.label}
                  </button>
                );
              }

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-[14px] min-h-[48px] ${
                    isActive
                      ? "bg-slate-100 text-[#2563EB]"
                      : "text-[#64748B] hover:bg-slate-50"
                  }`}
                >
                  <Icon size={18} />
                  {link.label}
                </Link>
              );
            })}

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-[#EF4444] hover:bg-red-50 rounded-[14px] text-left min-h-[48px]"
              >
                <LogOut size={18} />
                Logout
              </button>
            )}
          </div>
        )}
      </header>

      {/* Global AI Assistant Modal */}
      <AIAssistantWidget
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
      />
    </>
  );
}
