import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  FileSearch,
  UploadCloud,
  Mic,
  ArrowRight,
  ShieldCheck,
  FileText,
  UserCheck,
  ChevronRight
} from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import OCRScannerModal from "../components/common/OCRScannerModal";
import AIAssistantWidget from "../components/common/AIAssistantWidget";
import SchemeDetailModal from "../components/common/SchemeDetailModal";
import { useUserProfile } from "../context/UserProfileContext";
import type { Scheme } from "../types";

export default function Dashboard() {
  const navigate = useNavigate();
  const { profile, calculateProfileCompletion } = useUserProfile();
  
  const [ocrModalOpen, setOcrModalOpen] = useState(false);
  const [activeDocType, setActiveDocType] = useState<"aadhaar" | "income" | "caste">("aadhaar");
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);

  const completionScore = calculateProfileCompletion();

  const topSchemes: Scheme[] = [
    {
      id: "pm-kisan",
      name: "PM Kisan Samman Nidhi Yojana",
      department: "Dept of Agriculture & Farmers Welfare",
      ministry: "Ministry of Agriculture",
      category: "Agriculture",
      matchPercentage: 98,
      benefits: ["₹6,000 / year direct benefit transfer in 3 equal installments", "Direct bank credit via Aadhaar Payment Bridge"],
      summary: "Financial support to landholding farmer families across the country to meet agricultural expenses.",
      eligibilityCriteria: ["Small and Marginal farmer family", "Landholding size up to 2 Hectares", "Valid Aadhaar linked bank account"],
      documentsRequired: ["Aadhaar Card", "Land Khatauni", "Bank Passbook"],
      tags: ["Direct Cash", "Agriculture"],
    },
    {
      id: "pmay-g",
      name: "Pradhan Mantri Awas Yojana (Gramin)",
      department: "Dept of Rural Development",
      ministry: "Ministry of Rural Development",
      category: "Housing",
      matchPercentage: 92,
      benefits: ["₹1,20,000 financial assistance for pucca house construction", "90 days MGNREGA unskilled labor wage support"],
      summary: "Provides housing financial aid for rural families living in kutcha or broken houses.",
      eligibilityCriteria: ["Living in Kutcha house", "BPL household / SECC 2011 list", "No member owns a motor vehicle"],
      documentsRequired: ["Aadhaar Card", "Income Certificate", "Job Card"],
      tags: ["Housing", "Panchayat"],
    },
    {
      id: "pm-vishwakarma",
      name: "PM Vishwakarma Artisan Support",
      department: "Ministry of MSME",
      ministry: "Ministry of MSME",
      category: "Financial Aid",
      matchPercentage: 88,
      benefits: ["Collateral-free credit up to ₹3 Lakh at 5% interest", "₹15,000 toolkit voucher incentive"],
      summary: "Support for traditional rural artisans including blacksmiths, carpenters, weavers, and potters.",
      eligibilityCriteria: ["Practicing traditional craft", "Minimum age 18 years", "One member per family eligible"],
      documentsRequired: ["Aadhaar Card", "Artisan Verification Card"],
      tags: ["Artisan", "Zero Collateral"],
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-12 animate-in fade-in duration-300">
        
        {/* WELCOME BANNER & PROFILE SCORE */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
              <Sparkles size={14} />
              <span>AI Engine Active</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Welcome back, {profile.name.split(" ")[0]} 👋
            </h1>
            
            <p className="text-slate-600 text-sm leading-relaxed">
              Matched <strong className="text-slate-900 font-bold">4 government schemes</strong> for your household ({profile.occupation}, {profile.state}).
            </p>
          </div>

          {/* Clean Analytics Score Widget */}
          <div className="w-full md:w-auto shrink-0 bg-slate-50 p-6 rounded-2xl border border-slate-200/60 space-y-3 text-center sm:min-w-[240px]">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Profile Accuracy Score
            </div>
            <div className="text-4xl font-black text-slate-900">{completionScore}%</div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-500"
                style={{ width: `${completionScore}%` }}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => navigate("/profile")}
              className="text-xs"
            >
              Update Profile Details
            </Button>
          </div>
        </div>

        {/* 3 MAIN DASHBOARD CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* CARD 1: Find Government Schemes */}
          <Card hoverEffect glass padding="lg" className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shadow-xs">
                <FileSearch size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Find Schemes</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Discover subsidies, agriculture loans, pensions, and housing grants matching your profile.
              </p>
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => navigate("/schemes")}
              rightIcon={<ArrowRight size={18} />}
            >
              Check Eligibility
            </Button>
          </Card>

          {/* CARD 2: Upload Documents (OCR Scanner) */}
          <Card hoverEffect glass padding="lg" className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-100 text-cyan-600 flex items-center justify-center shadow-xs">
                <UploadCloud size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Upload Documents</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Scan Aadhaar, Income, or Caste certificates to auto-fill details via AI OCR text reader.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => {
                    setActiveDocType("aadhaar");
                    setOcrModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck size={14} /> Aadhaar
                </button>
                <button
                  onClick={() => {
                    setActiveDocType("income");
                    setOcrModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText size={14} /> Income
                </button>
                <button
                  onClick={() => {
                    setActiveDocType("caste");
                    setOcrModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <UserCheck size={14} /> Caste
                </button>
              </div>
            </div>

            <Button
              variant="secondary"
              size="lg"
              fullWidth
              onClick={() => {
                setActiveDocType("aadhaar");
                setOcrModalOpen(true);
              }}
              leftIcon={<UploadCloud size={18} />}
            >
              Scan Document
            </Button>
          </Card>

          {/* CARD 3: AI Voice Assistant */}
          <Card hoverEffect glass padding="lg" className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs">
                <Mic size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">AI Assistant</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Speak or type in your native language to ask questions about eligibility rules & documents.
              </p>
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => setAiAssistantOpen(true)}
              leftIcon={<Mic size={18} />}
              className="!bg-indigo-600 hover:!bg-indigo-700"
            >
              Launch Voice Assistant
            </Button>
          </Card>

        </div>

        {/* TOP MATCHED SCHEMES */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Top Recommended Schemes
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/schemes")}
              rightIcon={<ChevronRight size={16} />}
            >
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {topSchemes.map((scheme) => (
              <Card key={scheme.id} hoverEffect glass padding="lg" className="flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge matchPercentage={scheme.matchPercentage} />
                    <Badge label={scheme.category} variant="category" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">{scheme.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{scheme.summary}</p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={() => setSelectedScheme(scheme)}
                  >
                    Details
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    onClick={() => setSelectedScheme(scheme)}
                  >
                    Apply Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

      </div>

      {/* OCR Scanner Modal */}
      <OCRScannerModal
        isOpen={ocrModalOpen}
        onClose={() => setOcrModalOpen(false)}
        documentType={activeDocType}
      />

      {/* AI Assistant Modal */}
      <AIAssistantWidget
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
      />

      {/* Scheme Details Modal */}
      <SchemeDetailModal
        scheme={selectedScheme}
        isOpen={!!selectedScheme}
        onClose={() => setSelectedScheme(null)}
      />
    </DashboardLayout>
  );
}