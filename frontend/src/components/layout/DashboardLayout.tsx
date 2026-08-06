import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Background from "./Background";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col bg-slate-50 font-sans antialiased selection:bg-blue-500 selection:text-white">
      <Background />
      
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
