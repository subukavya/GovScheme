import { useState, type FormEvent } from "react";
import { User, Phone, MapPin, Briefcase, Users, CheckCircle2, Scan, ArrowRight, ArrowLeft, Save } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import OCRScannerModal from "../components/common/OCRScannerModal";
import { useUserProfile } from "../context/UserProfileContext";
import type { UserProfile } from "../types";

const INDIAN_STATES = [
  "Uttar Pradesh", "Bihar", "Madhya Pradesh", "Rajasthan", "Maharashtra",
  "West Bengal", "Tamil Nadu", "Gujarat", "Karnataka", "Andhra Pradesh",
  "Odisha", "Telangana", "Kerala", "Jharkhand", "Assam", "Punjab", "Haryana", "Chhattisgarh"
];

const OCCUPATIONS = [
  "Small Farmer (< 2 Hectares)",
  "Marginal Farmer (< 1 Hectare)",
  "Agricultural Daily Wage Worker",
  "Rural Artisan / Craftsperson",
  "Small Shop Owner / Business",
  "Animal Husbandry / Dairy Worker",
  "Homemaker",
  "Unemployed / Student"
];

const INCOME_CATEGORIES = [
  "Below ₹1,00,000",
  "₹1,00,000 - ₹2,50,000",
  "₹2,50,000 - ₹5,00,000",
  "Above ₹5,00,000"
];

export default function Profile() {
  const { profile, updateProfile, calculateProfileCompletion } = useUserProfile();
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [ocrModalOpen, setOcrModalOpen] = useState(false);

  const completionScore = calculateProfileCompletion();

  const steps = [
    { number: 1, title: "Personal Details", icon: User },
    { number: 2, title: "Household Details", icon: Users },
    { number: 3, title: "Income", icon: Briefcase },
    { number: 4, title: "Documents", icon: Scan },
  ];

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (savedSuccess) setSavedSuccess(false);
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Profile Header Card */}
        <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#E2E8F0] shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-[16px] bg-[#2563EB] text-white font-bold text-xl flex items-center justify-center shadow-sm shrink-0">
              {formData.name ? formData.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-[#0F172A]">{formData.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#10B981] text-[10px] font-bold border border-emerald-200">
                  Verified Mobile
                </span>
              </div>
              <p className="text-xs text-[#64748B] font-normal">
                {formData.occupation} • {formData.district}, {formData.state}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="text-right hidden sm:block">
              <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Accuracy</div>
              <div className="text-xl font-extrabold text-[#0F172A]">{completionScore}%</div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOcrModalOpen(true)}
              leftIcon={<Scan size={16} />}
              className="w-full sm:w-auto text-xs"
            >
              Auto-Fill via OCR
            </Button>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-4 bg-emerald-50 text-emerald-800 rounded-[16px] border border-emerald-200 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 size={18} className="text-[#10B981] shrink-0" />
            <span>Profile details saved successfully! Scheme match scores updated.</span>
          </div>
        )}

        {/* STEP PROGRESS INDICATOR */}
        <div className="bg-white p-6 rounded-[20px] border border-[#E2E8F0] shadow-soft space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-[#64748B]">
            <span>Step {currentStep} of 4: <strong className="text-[#0F172A]">{steps[currentStep - 1].title}</strong></span>
            <span>{Math.round((currentStep / 4) * 100)}% Completed</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-[#2563EB] h-full transition-all duration-300 rounded-full"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>

          {/* Step Badges Stepper */}
          <div className="grid grid-cols-4 gap-2 pt-2">
            {steps.map((s) => {
              const Icon = s.icon;
              const isCurrent = s.number === currentStep;
              const isPassed = s.number < currentStep;

              return (
                <button
                  key={s.number}
                  onClick={() => setCurrentStep(s.number)}
                  className={`flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 p-2.5 sm:px-3.5 sm:py-2.5 rounded-[12px] text-xs font-bold transition cursor-pointer min-h-[44px] ${
                    isCurrent
                      ? "bg-[#DBEAFE] text-[#2563EB] border border-blue-200"
                      : isPassed
                      ? "bg-slate-50 text-[#10B981]"
                      : "bg-slate-50 text-[#64748B] hover:bg-slate-100"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    isCurrent ? "bg-[#2563EB] text-white" : isPassed ? "bg-[#10B981] text-white" : "bg-slate-200 text-[#64748B]"
                  }`}>
                    {isPassed ? "✓" : <Icon size={12} />}
                  </div>
                  <span className="hidden sm:inline truncate">{s.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4-STEP FORM CONTAINER */}
        <Card padding="xl" className="shadow-soft border border-[#E2E8F0] bg-white">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* STEP 1: PERSONAL DETAILS */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="border-b border-[#E2E8F0] pb-4">
                  <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
                    <User size={20} className="text-[#2563EB]" />
                    <span>Step 1: Personal Details</span>
                  </h3>
                  <p className="text-xs text-[#64748B] mt-1 font-normal">Enter your primary identity as on Aadhaar card</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    label="Full Name (as on Aadhaar)"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    leftIcon={<User size={18} />}
                    required
                  />

                  <Input
                    label="Mobile Phone Number"
                    value={formData.mobile}
                    leftIcon={<Phone size={18} />}
                    disabled
                    helperText="Verified via OTP Login"
                  />

                  <div>
                    <label htmlFor="age-input" className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                      Age (Years)
                    </label>
                    <input
                      id="age-input"
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      className="w-full min-h-[50px] rounded-[16px] border border-[#E2E8F0] bg-white px-4 py-3.5 text-[#0F172A] text-sm font-medium focus:border-[#2563EB] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="gender-select" className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                      Gender
                    </label>
                    <select
                      id="gender-select"
                      value={formData.gender}
                      onChange={(e) => handleInputChange("gender", e.target.value as any)}
                      className="w-full min-h-[50px] rounded-[16px] border border-[#E2E8F0] bg-white px-4 py-3.5 text-[#0F172A] text-sm font-medium focus:border-[#2563EB] focus:outline-none cursor-pointer"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: HOUSEHOLD DETAILS */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="border-b border-[#E2E8F0] pb-4">
                  <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
                    <Users size={20} className="text-[#2563EB]" />
                    <span>Step 2: Household Details</span>
                  </h3>
                  <p className="text-xs text-[#64748B] mt-1 font-normal">Location and family structure details</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="state-select" className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                      State
                    </label>
                    <select
                      id="state-select"
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      className="w-full min-h-[50px] rounded-[16px] border border-[#E2E8F0] bg-white px-4 py-3.5 text-[#0F172A] text-sm font-medium focus:border-[#2563EB] focus:outline-none cursor-pointer"
                    >
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  <Input
                    label="District"
                    value={formData.district}
                    onChange={(e) => handleInputChange("district", e.target.value)}
                    leftIcon={<MapPin size={18} />}
                    required
                  />

                  <div>
                    <label htmlFor="family-size" className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                      Family Household Size
                    </label>
                    <input
                      id="family-size"
                      type="number"
                      value={formData.householdSize}
                      onChange={(e) => handleInputChange("householdSize", parseInt(e.target.value, 10) || 1)}
                      className="w-full min-h-[50px] rounded-[16px] border border-[#E2E8F0] bg-white px-4 py-3.5 text-[#0F172A] text-sm font-medium focus:border-[#2563EB] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-3 pt-4">
                    <label className="flex items-center gap-3 text-xs font-bold text-[#0F172A] cursor-pointer min-h-[40px]">
                      <input
                        type="checkbox"
                        checked={formData.bplStatus}
                        onChange={(e) => handleInputChange("bplStatus", e.target.checked)}
                        className="w-5 h-5 rounded text-[#2563EB] border-[#E2E8F0] focus:ring-blue-500"
                      />
                      <span>Holds BPL Ration Card / SECC List</span>
                    </label>

                    <label className="flex items-center gap-3 text-xs font-bold text-[#0F172A] cursor-pointer min-h-[40px]">
                      <input
                        type="checkbox"
                        checked={formData.kisanCreditCard}
                        onChange={(e) => handleInputChange("kisanCreditCard", e.target.checked)}
                        className="w-5 h-5 rounded text-[#2563EB] border-[#E2E8F0] focus:ring-blue-500"
                      />
                      <span>Possesses Kisan Credit Card (KCC)</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: INCOME */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="border-b border-[#E2E8F0] pb-4">
                  <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
                    <Briefcase size={20} className="text-[#2563EB]" />
                    <span>Step 3: Income</span>
                  </h3>
                  <p className="text-xs text-[#64748B] mt-1 font-normal">Income slab, occupation, and land holding parameters</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="occ-select" className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                      Occupation
                    </label>
                    <select
                      id="occ-select"
                      value={formData.occupation}
                      onChange={(e) => handleInputChange("occupation", e.target.value)}
                      className="w-full min-h-[50px] rounded-[16px] border border-[#E2E8F0] bg-white px-4 py-3.5 text-[#0F172A] text-sm font-medium focus:border-[#2563EB] focus:outline-none cursor-pointer"
                    >
                      {OCCUPATIONS.map((occ) => (
                        <option key={occ} value={occ}>{occ}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="inc-select" className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                      Income Category
                    </label>
                    <select
                      id="inc-select"
                      value={formData.incomeCategory}
                      onChange={(e) => handleInputChange("incomeCategory", e.target.value)}
                      className="w-full min-h-[50px] rounded-[16px] border border-[#E2E8F0] bg-white px-4 py-3.5 text-[#0F172A] text-sm font-medium focus:border-[#2563EB] focus:outline-none cursor-pointer"
                    >
                      {INCOME_CATEGORIES.map((inc) => (
                        <option key={inc} value={inc}>{inc}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="cat-select" className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                      Social Category
                    </label>
                    <select
                      id="cat-select"
                      value={formData.category}
                      onChange={(e) => handleInputChange("category", e.target.value as any)}
                      className="w-full min-h-[50px] rounded-[16px] border border-[#E2E8F0] bg-white px-4 py-3.5 text-[#0F172A] text-sm font-medium focus:border-[#2563EB] focus:outline-none cursor-pointer"
                    >
                      <option value="General">General</option>
                      <option value="OBC">OBC</option>
                      <option value="SC">SC</option>
                      <option value="ST">ST</option>
                      <option value="EWS">EWS</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="land-holding" className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
                      Land Holding (Acres)
                    </label>
                    <input
                      id="land-holding"
                      type="number"
                      step="0.1"
                      value={formData.landHolding}
                      onChange={(e) => handleInputChange("landHolding", parseFloat(e.target.value) || 0)}
                      className="w-full min-h-[50px] rounded-[16px] border border-[#E2E8F0] bg-white px-4 py-3.5 text-[#0F172A] text-sm font-medium focus:border-[#2563EB] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: DOCUMENTS */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="border-b border-[#E2E8F0] pb-4">
                  <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
                    <Scan size={20} className="text-[#2563EB]" />
                    <span>Step 4: Documents</span>
                  </h3>
                  <p className="text-xs text-[#64748B] mt-1 font-normal">Scan or verify your government identity & income certificates</p>
                </div>

                <div className="bg-[#DBEAFE]/30 p-6 rounded-[20px] border border-blue-200 text-center space-y-4">
                  <div className="w-12 h-12 rounded-[16px] bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center mx-auto">
                    <Scan size={24} />
                  </div>
                  <h4 className="font-bold text-[#0F172A]">AI Document Verification</h4>
                  <p className="text-xs text-[#64748B] max-w-sm mx-auto font-normal">
                    Scan your Aadhaar, Income certificate, or Caste certificate to automatically populate profile details.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    onClick={() => setOcrModalOpen(true)}
                    leftIcon={<Scan size={16} />}
                  >
                    Open Document Scanner
                  </Button>
                </div>
              </div>
            )}

            {/* STEPPER CONTROLS */}
            <div className="pt-6 border-t border-[#E2E8F0] flex items-center justify-between gap-4">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={handlePrevStep}
                  leftIcon={<ArrowLeft size={16} />}
                >
                  Previous Step
                </Button>
              ) : <div />}

              {currentStep < 4 ? (
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  onClick={handleNextStep}
                  rightIcon={<ArrowRight size={16} />}
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  leftIcon={<Save size={18} />}
                >
                  Save Profile
                </Button>
              )}
            </div>

          </form>
        </Card>

      </div>

      {/* OCR Scanner Modal */}
      <OCRScannerModal
        isOpen={ocrModalOpen}
        onClose={() => setOcrModalOpen(false)}
      />
    </DashboardLayout>
  );
}
