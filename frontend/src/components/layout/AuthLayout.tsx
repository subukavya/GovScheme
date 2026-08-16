import type { ReactNode } from "react";
import Logo from "../ui/Logo";
import LanguageSelector from "../common/LanguageSelector";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen bg-[#F8FAFC] flex flex-col justify-between selection:bg-[#2563EB] selection:text-white font-sans antialiased text-[#0F172A]">
      {/* Top Header Bar */}
      <header className="relative z-20 mx-auto w-full max-w-7xl flex items-center justify-between px-6 py-6">
        <Logo />
        <LanguageSelector />
      </header>

      {/* Centered Main Authentication Box */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md mx-auto">
          {children}
        </div>
      </main>

      {/* Footer Disclaimer */}
      <footer className="relative z-10 py-6 text-center text-xs text-[#64748B] font-medium">
        Official Government Identity Verification Gateway • Digital India Portal
      </footer>
    </div>
  );
}