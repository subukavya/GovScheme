import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { User, LogOut, LayoutDashboard, FileText, Menu, X } from "lucide-react";
import Logo from "../ui/Logo";
import LanguageSelector from "../common/LanguageSelector";
import { useAuth } from "../../context/AuthContext";
import { useUserProfile } from "../../context/UserProfileContext";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { profile } = useUserProfile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Schemes", path: "/schemes", icon: FileText },
    { label: "Profile", path: "/profile", icon: User },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-xs">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo */}
        <Logo />

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-2xl transition-all duration-200 ${
                  isActive
                    ? "bg-slate-100 text-blue-600 font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Icon size={18} className={isActive ? "text-blue-600" : "text-slate-400"} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          <LanguageSelector />

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              {/* Profile Link */}
              <Link
                to="/profile"
                className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-all"
              >
                <div className="h-8 w-8 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                  {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="hidden lg:inline text-xs font-bold text-slate-800">
                  {profile.name.split(" ")[0]}
                </span>
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                title="Logout"
                className="flex items-center justify-center h-10 w-10 rounded-2xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition-all cursor-pointer"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-all"
              >
                Login
              </Link>
              <Link
                to="/login"
                className="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-md shadow-blue-600/15 transition-all"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-2xl"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-2xl ${
                  isActive
                    ? "bg-slate-100 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}
          {isAuthenticated && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-2xl text-left"
            >
              <LogOut size={18} />
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}
