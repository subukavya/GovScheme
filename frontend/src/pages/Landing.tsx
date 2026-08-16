import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Bot, CheckCircle2, ShieldCheck } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Button from "../components/ui/Button";
import AIAssistantWidget from "../components/common/AIAssistantWidget";
import { Heading, Text } from "../components/ui/Typography";

export default function Landing() {
  const navigate = useNavigate();
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] font-sans antialiased text-[#0F172A]">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-20 sm:py-32 max-w-5xl mx-auto w-full text-center">
        <div className="space-y-8 max-w-3xl">
          
          {/* Government Portal Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#DBEAFE] border border-blue-200 text-[#2563EB] text-xs font-bold shadow-xs">
            <span>🇮🇳</span>
            <span>Digital India Government Scheme Portal</span>
          </div>

          {/* Large Clear Heading */}
          <Heading level={1} className="text-4xl sm:text-6xl font-bold leading-[1.15]">
            AI-Powered Government Schemes for{" "}
            <span className="text-[#2563EB]">Rural Households</span>
          </Heading>

          {/* Simple Subtitle */}
          <Text size="lg" variant="secondary" className="max-w-2xl mx-auto font-normal text-base sm:text-xl leading-relaxed">
            Discover eligible welfare schemes, agriculture subsidies, housing grants, and pensions tailored specifically for your family.
          </Text>

          {/* TWO BUTTONS ONLY: Get Started & Talk to AI */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => navigate("/login")}
              rightIcon={<ArrowRight size={20} />}
            >
              Get Started
            </Button>

            <Button
              variant="outline"
              size="lg"
              fullWidth
              onClick={() => setAiAssistantOpen(true)}
              leftIcon={<Bot size={20} className="text-[#2563EB]" />}
            >
              Talk to AI
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs text-[#64748B] font-semibold">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#10B981]" /> 100% Free Government Portal
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#10B981]" /> No Password Required (OTP Login)
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#2563EB]" /> Aadhaar Encrypted & Secure
            </span>
          </div>

        </div>
      </main>

      {/* AI Assistant Modal Triggered by "Talk to AI" */}
      <AIAssistantWidget
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
