import { useState } from "react";
import { Search, Sparkles, SlidersHorizontal } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import SchemeCard from "../components/common/SchemeCard";
import SchemeDetailModal from "../components/common/SchemeDetailModal";
import AIAssistantWidget from "../components/common/AIAssistantWidget";
import { useUserProfile } from "../context/UserProfileContext";
import type { Scheme } from "../types";

const SCHEMES_DATABASE: Scheme[] = [
  {
    id: "pm-kisan",
    name: "PM Kisan Samman Nidhi Yojana",
    department: "Dept of Agriculture & Farmers Welfare",
    ministry: "Ministry of Agriculture",
    category: "Agriculture",
    matchPercentage: 98,
    benefits: [
      "₹6,000 / year direct benefit transfer in 3 equal installments",
      "Direct bank credit via Aadhaar Payment Bridge System (APBS)",
      "Zero registration fees or processing charges"
    ],
    summary: "Financial support to all landholding farmer families across India to meet agricultural inputs and household emergency requirements.",
    eligibilityCriteria: [
      "Small and Marginal farmer family",
      "Valid landholding khatauni records",
      "Aadhaar card linked to active bank account"
    ],
    documentsRequired: ["Aadhaar Card", "Land Khatauni", "Bank Passbook"],
    tags: ["Direct Cash", "Agriculture"]
  },
  {
    id: "pmay-g",
    name: "Pradhan Mantri Awas Yojana (Gramin)",
    department: "Dept of Rural Development",
    ministry: "Ministry of Rural Development",
    category: "Housing",
    matchPercentage: 94,
    benefits: [
      "₹1,20,000 financial grant for rural house construction",
      "₹12,000 extra assistance for Swachh Bharat toilet construction",
      "90 days MGNREGA unskilled labor wage support"
    ],
    summary: "Provides financial aid for constructing pucca houses with basic amenities for rural families living in kutcha or broken houses.",
    eligibilityCriteria: [
      "Household living in Kutcha / temporary house",
      "Annual income below ₹3 Lakh",
      "No family member owns a motorized vehicle"
    ],
    documentsRequired: ["Aadhaar Card", "Income Certificate", "SECC 2011 Data"],
    tags: ["Housing", "Panchayat"]
  },
  {
    id: "pm-vishwakarma",
    name: "PM Vishwakarma Artisan Support Yojana",
    department: "Ministry of MSME",
    ministry: "Ministry of MSME",
    category: "Financial Aid",
    matchPercentage: 89,
    benefits: [
      "Collateral-free enterprise credit up to ₹3 Lakh at 5% interest",
      "₹15,000 digital e-voucher for modern toolkit purchase",
      "₹500 per day stipend during skill training"
    ],
    summary: "Comprehensive support for traditional rural artisans including blacksmiths, carpenters, weavers, potters, and cobblers.",
    eligibilityCriteria: [
      "Practicing one of 18 registered traditional trades",
      "Minimum age 18 years",
      "Only one member per household eligible"
    ],
    documentsRequired: ["Aadhaar Card", "Artisan Verification Card"],
    tags: ["Artisan", "Zero Collateral"]
  },
  {
    id: "ayushman-bharat",
    name: "Ayushman Bharat - PM-JAY Health Coverage",
    department: "National Health Authority",
    ministry: "Ministry of Health & Family Welfare",
    category: "Health",
    matchPercentage: 96,
    benefits: [
      "₹5,00,000 free health coverage per family per year for hospitalisation",
      "Cashless treatment in 28,000+ empanelled government & private hospitals",
      "Pre and post-hospitalisation expenses covered"
    ],
    summary: "World's largest government-funded health insurance scheme offering cashless treatment for serious illnesses.",
    eligibilityCriteria: [
      "Deprived rural household as per SECC 2011 data",
      "BPL card holder or SC/ST household"
    ],
    documentsRequired: ["Aadhaar Card", "Ration Card / BPL Card"],
    tags: ["Health Insurance", "Cashless"]
  },
  {
    id: "pm-surya-ghar",
    name: "PM Surya Ghar: Muft Bijli Yojana",
    department: "Ministry of New and Renewable Energy",
    ministry: "Ministry of MNRE",
    category: "Agriculture",
    matchPercentage: 85,
    benefits: [
      "Up to ₹78,000 direct subsidy for rooftop solar installation",
      "300 units of free electricity per month for household",
      "Income by selling excess solar power back to grid"
    ],
    summary: "Promotes rooftop solar systems for rural and semi-urban households to reduce electricity bills and power agricultural pumps.",
    eligibilityCriteria: [
      "Indian citizen with suitable roof space",
      "Valid electricity connection number"
    ],
    documentsRequired: ["Aadhaar Card", "Electricity Bill"],
    tags: ["Solar Power", "Free Electricity"]
  },
  {
    id: "national-social-pension",
    name: "Indira Gandhi National Pension Scheme",
    department: "Dept of Rural Development",
    ministry: "Ministry of Rural Development",
    category: "Pension",
    matchPercentage: 78,
    benefits: [
      "₹1,000 to ₹3,000 monthly pension transferred directly to bank account",
      "Life-long pension guarantee backed by government"
    ],
    summary: "Monthly social security pension for senior citizens belonging to Below Poverty Line (BPL) rural households.",
    eligibilityCriteria: [
      "Applicant age 60 years or above",
      "Belongs to BPL household certified by Panchayat"
    ],
    documentsRequired: ["Aadhaar Card", "Age Proof Certificate", "BPL Card"],
    tags: ["Senior Citizen", "Pension"]
  }
];

const CATEGORIES = ["All", "Agriculture", "Housing", "Health", "Financial Aid", "Pension"];

export default function Schemes() {
  const { profile } = useUserProfile();
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [minMatchScore, setMinMatchScore] = useState(70);
  
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [aiWidgetOpen, setAiWidgetOpen] = useState(false);

  const filteredSchemes = SCHEMES_DATABASE.filter((s) => {
    const matchesCategory = selectedCategory === "All" || s.category === selectedCategory;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesScore = s.matchPercentage >= minMatchScore;

    return matchesCategory && matchesSearch && matchesScore;
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-[24px] border border-[#E2E8F0] shadow-soft">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DBEAFE] text-[#2563EB] text-xs font-bold mb-2">
              <Sparkles size={14} /> Welfare Scheme Explorer
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">Government Schemes</h1>
            <p className="text-xs text-[#64748B] mt-1 font-normal">
              Matched for <strong className="text-[#0F172A]">{profile.name}</strong> ({profile.occupation}, {profile.state})
            </p>
          </div>

          <button
            onClick={() => setAiWidgetOpen(true)}
            className="px-5 py-2.5 rounded-[14px] bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold shadow-md transition flex items-center gap-2 cursor-pointer shrink-0 min-h-[44px]"
          >
            <Sparkles size={16} /> Ask AI Assistant
          </button>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-[20px] p-5 sm:p-6 border border-[#E2E8F0] shadow-soft space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" size={18} />
              <input
                type="text"
                aria-label="Search schemes"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search schemes by name or department..."
                className="w-full h-12 pl-11 pr-4 rounded-[14px] border border-[#E2E8F0] bg-white text-[#0F172A] text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 min-h-[48px]"
              />
            </div>

            <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-[14px] border border-[#E2E8F0] shrink-0 min-h-[48px]">
              <SlidersHorizontal size={16} className="text-[#2563EB]" />
              <span className="text-xs font-bold text-[#0F172A]">Min Match:</span>
              <div className="flex gap-1">
                {[70, 85, 90].map((score) => (
                  <button
                    key={score}
                    onClick={() => setMinMatchScore(score)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-[10px] transition cursor-pointer min-h-[36px] ${
                      minMatchScore === score
                        ? "bg-[#2563EB] text-white"
                        : "bg-white text-[#64748B] border border-[#E2E8F0]"
                    }`}
                  >
                    {score}%+
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pt-2 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 text-xs font-bold rounded-[12px] whitespace-nowrap transition cursor-pointer min-h-[40px] ${
                  selectedCategory === cat
                    ? "bg-[#2563EB] text-white shadow-xs"
                    : "bg-slate-100 text-[#64748B] hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Schemes Grid: MAX 2 CARDS PER ROW on Desktop as per Layout Rules */}
        {filteredSchemes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSchemes.map((scheme) => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                onApply={(s) => {
                  setSelectedScheme(s);
                  setIsApplying(true);
                }}
                onViewDetails={(s) => {
                  setSelectedScheme(s);
                  setIsApplying(false);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[20px] p-12 text-center border border-[#E2E8F0] space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-[#64748B] flex items-center justify-center mx-auto">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#0F172A]">No matching schemes found</h3>
            <p className="text-xs text-[#64748B] max-w-sm mx-auto font-normal">
              Try adjusting your search query or minimum match score filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setMinMatchScore(70);
              }}
              className="px-4 py-2 bg-[#DBEAFE] text-[#2563EB] font-bold rounded-[12px] text-xs hover:bg-blue-200 cursor-pointer min-h-[40px]"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Modals */}
      <SchemeDetailModal
        scheme={selectedScheme}
        isOpen={!!selectedScheme}
        onClose={() => setSelectedScheme(null)}
        isApplyingMode={isApplying}
      />

      <AIAssistantWidget
        isOpen={aiWidgetOpen}
        onClose={() => setAiWidgetOpen(false)}
      />
    </DashboardLayout>
  );
}
