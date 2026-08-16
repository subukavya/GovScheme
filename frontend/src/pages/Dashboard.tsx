import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  UploadCloud,
  Mic,
  ArrowRight,
  Sparkles,
  ChevronRight
} from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import OCRScannerModal from "../components/common/OCRScannerModal";
import AIAssistantWidget from "../components/common/AIAssistantWidget";
import SchemeDetailModal from "../components/common/SchemeDetailModal";
import SchemeCard from "../components/common/SchemeCard";
import { useUserProfile } from "../context/UserProfileContext";
import type { Scheme } from "../types";

export default function Dashboard() {
  const navigate = useNavigate();
  const { profile } = useUserProfile();
  
  const [ocrModalOpen, setOcrModalOpen] = useState(false);
  const [activeDocType, setActiveDocType] = useState<"aadhaar" | "income" | "caste">("aadhaar");
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);

  const recommendedSchemes: Scheme[] = [
    {
      id: "pm-kisan",
      name: "PM Kisan Samman Nidhi Yojana",
      department: "Dept of Agriculture & Farmers Welfare",
      ministry: "Ministry of Agriculture",
      category: "Agriculture",
      matchPercentage: 98,
      benefits: ["₹6,000 / year direct benefit transfer in 3 equal installments"],
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
      benefits: ["₹1,20,000 financial assistance for pucca house construction"],
      summary: "Provides housing financial aid for rural families living in kutcha or broken houses.",
      eligibilityCriteria: ["Living in Kutcha house", "BPL household / SECC 2011 list", "No member owns a motor vehicle"],
      documentsRequired: ["Aadhaar Card", "Income Certificate", "Job Card"],
      tags: ["Housing", "Panchayat"],
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        
        {/* 1. WELCOME CARD & ONE PRIMARY ACTION */}
        <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#E2E8F0] shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DBEAFE] text-[#2563EB] text-xs font-bold">
              <Sparkles size={14} />
              <span>Rural Welfare Portal</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
              Welcome back, {profile.name.split(" ")[0]} 👋
            </h1>
            
            <p className="text-[#64748B] text-sm leading-relaxed font-normal">
              {profile.occupation} • {profile.district}, {profile.state}
            </p>
          </div>

          {/* STAT BADGES: Eligible Schemes & Applied Schemes Count */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex-1 md:flex-initial bg-[#DBEAFE]/40 border border-blue-200 p-4 rounded-[16px] text-center min-w-[120px]">
              <div className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider">Eligible</div>
              <div className="text-3xl font-extrabold text-[#2563EB]">4</div>
              <div className="text-[10px] text-[#64748B] font-medium">Matched Schemes</div>
            </div>

            <div className="flex-1 md:flex-initial bg-emerald-50 border border-emerald-200 p-4 rounded-[16px] text-center min-w-[120px]">
              <div className="text-[11px] font-bold text-[#10B981] uppercase tracking-wider">Applied</div>
              <div className="text-3xl font-extrabold text-[#10B981]">2</div>
              <div className="text-[10px] text-[#64748B] font-medium">Submitted Grants</div>
            </div>
          </div>
        </div>

        {/* ONE PRIMARY ACTION BUTTON: Start Eligibility Check */}
        <div className="bg-[#DBEAFE]/30 border border-blue-200/60 p-6 rounded-[24px] text-center space-y-4">
          <div className="max-w-md mx-auto space-y-1">
            <h2 className="text-lg font-bold text-[#0F172A]">Instant Government Scheme Recommender</h2>
            <p className="text-xs text-[#64748B] font-normal">
              Check all eligible government subsidies and grants matched for your profile.
            </p>
          </div>
          
          <div className="max-w-sm mx-auto">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => navigate("/schemes")}
              rightIcon={<ArrowRight size={20} />}
            >
              Start Eligibility Check
            </Button>
          </div>
        </div>

        {/* INPUT METHOD CARDS */}
        <div className="space-y-4 pt-2">
          <h2 className="text-lg font-bold text-[#0F172A]">Ways to Input Profile</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Fill Manually */}
            <Card hoverEffect padding="lg" className="flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-[16px] bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center">
                  <FileText size={24} />
                </div>
                <h3 className="text-base font-bold text-[#0F172A]">Fill Manually</h3>
                <p className="text-xs text-[#64748B] font-normal leading-relaxed">
                  Enter personal, landholding, and family details step-by-step.
                </p>
              </div>

              <Button
                variant="outline"
                size="md"
                fullWidth
                onClick={() => navigate("/profile")}
              >
                Fill Form
              </Button>
            </Card>

            {/* Voice Assistant */}
            <Card hoverEffect padding="lg" className="flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-[16px] bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center">
                  <Mic size={24} />
                </div>
                <h3 className="text-base font-bold text-[#0F172A]">Voice Assistant</h3>
                <p className="text-xs text-[#64748B] font-normal leading-relaxed">
                  Speak in your regional language to ask eligibility questions.
                </p>
              </div>

              <Button
                variant="secondary"
                size="md"
                fullWidth
                onClick={() => setAiAssistantOpen(true)}
                leftIcon={<Mic size={16} />}
              >
                Talk to AI
              </Button>
            </Card>

            {/* Upload Documents */}
            <Card hoverEffect padding="lg" className="flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-[16px] bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center">
                  <UploadCloud size={24} />
                </div>
                <h3 className="text-base font-bold text-[#0F172A]">Upload Documents</h3>
                <p className="text-xs text-[#64748B] font-normal leading-relaxed">
                  Scan Aadhaar or Income certificate to auto-fill details.
                </p>
              </div>

              <Button
                variant="outline"
                size="md"
                fullWidth
                onClick={() => {
                  setActiveDocType("aadhaar");
                  setOcrModalOpen(true);
                }}
                leftIcon={<UploadCloud size={16} />}
              >
                Upload File
              </Button>
            </Card>

          </div>
        </div>

        {/* RECOMMENDED SCHEMES (Max 2 cards per row as per layout rules) */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#0F172A]">Recommended Schemes</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/schemes")}
              rightIcon={<ChevronRight size={16} />}
            >
              View All Schemes
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedSchemes.map((scheme) => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                onApply={(s) => setSelectedScheme(s)}
                onViewDetails={(s) => setSelectedScheme(s)}
              />
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