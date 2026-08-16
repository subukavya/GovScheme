import { type ReactNode, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileBottomNav from "./MobileBottomNav";
import AIAssistantWidget from "../common/AIAssistantWidget";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans antialiased text-[#0F172A]">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-12">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav onOpenAI={() => setAiOpen(true)} />

      {/* Global AI Assistant Modal */}
      <AIAssistantWidget
        isOpen={aiOpen}
        onClose={() => setAiOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
