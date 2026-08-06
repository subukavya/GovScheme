import type { ReactNode } from "react";
import Background from "./Background";
import Logo from "../ui/Logo";
import LanguageSelector from "../common/LanguageSelector";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      <Background />

      {/* Top Header Bar */}
      <header className="relative z-20 mx-auto w-full max-w-7xl flex items-center justify-between px-6 py-8">
        <Logo />
        <LanguageSelector />
      </header>

      {/* Centered Main Authentication Box */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md mx-auto">
          {children}
        </div>
      </main>

      {/* Footer Disclaimer */}
      <footer className="relative z-10 py-6 text-center text-xs text-slate-400 font-medium">
        Secured with National Identity Portal Encryption • Digital India Partner
      </footer>
    </div>
  );
}