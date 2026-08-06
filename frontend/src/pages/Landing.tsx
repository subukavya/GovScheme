import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Scan,
  Mic,
  Globe,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Search
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Background from "../components/layout/Background";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function Landing() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const features = [
    {
      id: "ai-recommendation",
      title: "AI Scheme Recommendation",
      icon: Sparkles,
      iconBg: "bg-blue-50 text-blue-600 border border-blue-100",
      description: "Machine learning model matches land holding, household income, and occupation against 500+ government welfare schemes.",
    },
    {
      id: "ocr-verification",
      title: "OCR Document Verification",
      icon: Scan,
      iconBg: "bg-cyan-50 text-cyan-600 border border-cyan-100",
      description: "Scan Aadhaar cards or Income certificates to automatically extract data fields without manual entry.",
    },
    {
      id: "voice-assistance",
      title: "Voice Based Assistance",
      icon: Mic,
      iconBg: "bg-indigo-50 text-indigo-600 border border-indigo-100",
      description: "Speak naturally in Hindi, Marathi, Telugu, Tamil, and 8+ Indian regional dialects to search schemes hands-free.",
    },
    {
      id: "multilingual-support",
      title: "Multi-Language Support",
      icon: Globe,
      iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-100",
      description: "Complete localized portal experience across 12 major Indian languages for rural accessibility.",
    },
    {
      id: "eligibility-prediction",
      title: "Eligibility Prediction",
      icon: TrendingUp,
      iconBg: "bg-amber-50 text-amber-600 border border-amber-100",
      description: "Instant percentage match score and clear checklist of missing documents required to achieve 100% approval.",
    },
  ];

  const stats = [
    { label: "Government Schemes Indexed", value: "500+" },
    { label: "Rural Households Benefited", value: "1.4M+" },
    { label: "Direct Benefit Transfer (DBT)", value: "₹12,500 Cr+" },
    { label: "Supported Languages", value: "12 Languages" },
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-50 font-sans antialiased selection:bg-blue-600 selection:text-white">
      <Background />

      {/* Navbar */}
      <Navbar />

      {/* LARGE HERO SECTION */}
      <section className="relative z-10 pt-16 pb-24 lg:pt-28 lg:pb-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/80 shadow-xs text-blue-700 text-xs sm:text-sm font-bold">
            <span>🇮🇳</span>
            <span>Digital India Welfare Infrastructure</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1]">
            Discover Government Schemes for{" "}
            <span className="text-blue-600">Rural Households</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            AI-powered scheme recommendation engine. Scan documents via OCR, speak in local languages, and get matched with 500+ government subsidies.
          </p>

          {/* Clean Search Input */}
          <div className="pt-2 max-w-xl mx-auto">
            <div className="flex items-center bg-white rounded-2xl p-2 shadow-xl border border-slate-200">
              <Search className="ml-3 text-slate-400 shrink-0" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search schemes (PM Kisan, Solar Pump, Housing...)"
                className="w-full px-3 py-3 text-slate-900 placeholder:text-slate-400 text-sm bg-transparent focus:outline-none"
              />
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate("/login")}
                rightIcon={<ArrowRight size={16} />}
                className="shrink-0"
              >
                Search
              </Button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/login")}
              rightIcon={<ArrowRight size={20} />}
              className="w-full sm:w-auto shadow-lg shadow-blue-600/20"
            >
              Get Started with Phone Number
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/login")}
              className="w-full sm:w-auto"
            >
              Login to Portal
            </Button>
          </div>

          {/* Simple Trust Pills */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-8 text-xs text-slate-500 font-semibold">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-500" /> 100% Free Government Portal
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-500" /> No Password Required
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-blue-500" /> Aadhaar Encryption
            </span>
          </div>

        </div>
      </section>

      {/* STATS BAR */}
      <section className="relative z-10 py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-slate-900">{stat.value}</div>
                <div className="text-xs font-semibold text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE CARDS GRID */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Key Platform Features
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Modern SaaS architecture designed specifically for Indian rural households
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.id}
                hoverEffect
                glass
                padding="lg"
                className="flex flex-col justify-between space-y-6"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${feature.iconBg} flex items-center justify-center mb-6 shadow-xs`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div
                  onClick={() => navigate("/login")}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer pt-2"
                >
                  <span>Explore Feature</span>
                  <ChevronRight size={16} />
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CLEAN CTA */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full text-center">
        <div className="bg-slate-900 text-white rounded-3xl p-10 sm:p-16 shadow-2xl space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ready to Discover Your Eligible Schemes?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            No long registration forms. Enter your phone number, receive instant OTP, and view matched schemes.
          </p>
          <div className="pt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/login")}
              rightIcon={<ArrowRight size={20} />}
              className="px-8 shadow-xl"
            >
              Get Started with Phone Number
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
