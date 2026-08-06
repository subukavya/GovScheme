import { useState, type FormEvent } from "react";
import { User, Phone, MapPin, Briefcase, Users, Save, CheckCircle2, Scan } from "lucide-react";
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
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [ocrModalOpen, setOcrModalOpen] = useState(false);

  const completionScore = calculateProfileCompletion();

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (savedSuccess) setSavedSuccess(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-300">
        
        {/* Profile Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-black text-2xl flex items-center justify-center shadow-md shrink-0">
              {formData.name ? formData.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900">{formData.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                  Verified Mobile
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {formData.occupation} • {formData.district}, {formData.state}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Accuracy</div>
              <div className="text-2xl font-black text-slate-900">{completionScore}%</div>
            </div>
            <Button
              variant="outline"
              size="md"
              onClick={() => setOcrModalOpen(true)}
              leftIcon={<Scan size={16} />}
              className="w-full sm:w-auto text-xs"
            >
              Auto-Fill via OCR Scan
            </Button>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-200 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
            <span>Profile details saved successfully! Scheme match scores updated.</span>
          </div>
        )}

        {/* Profile Form Container */}
        <Card glass padding="xl" className="shadow-md border border-slate-200/80">
          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* Section 1 */}
            <div className="space-y-6">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <User size={18} className="text-blue-600" />
                <span>1. Personal & Contact Information</span>
              </h3>

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
                  helperText="Phone number verified via OTP"
                />

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Age (Years)
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 text-sm font-medium focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleInputChange("gender", e.target.value as any)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 text-sm font-medium focus:border-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="space-y-6">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <MapPin size={18} className="text-blue-600" />
                <span>2. Location</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    State
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 text-sm font-medium focus:border-blue-500 focus:outline-none cursor-pointer"
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
              </div>
            </div>

            {/* Section 3 */}
            <div className="space-y-6">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <Briefcase size={18} className="text-blue-600" />
                <span>3. Occupation & Income</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Occupation
                  </label>
                  <select
                    value={formData.occupation}
                    onChange={(e) => handleInputChange("occupation", e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 text-sm font-medium focus:border-blue-500 focus:outline-none cursor-pointer"
                  >
                    {OCCUPATIONS.map((occ) => (
                      <option key={occ} value={occ}>{occ}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Income Category
                  </label>
                  <select
                    value={formData.incomeCategory}
                    onChange={(e) => handleInputChange("incomeCategory", e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 text-sm font-medium focus:border-blue-500 focus:outline-none cursor-pointer"
                  >
                    {INCOME_CATEGORIES.map((inc) => (
                      <option key={inc} value={inc}>{inc}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Social Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange("category", e.target.value as any)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 text-sm font-medium focus:border-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="EWS">EWS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Land Holding (Acres)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.landHolding}
                    onChange={(e) => handleInputChange("landHolding", parseFloat(e.target.value) || 0)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 text-sm font-medium focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="space-y-6">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <Users size={18} className="text-blue-600" />
                <span>4. Household Details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Family Household Size
                  </label>
                  <input
                    type="number"
                    value={formData.householdSize}
                    onChange={(e) => handleInputChange("householdSize", parseInt(e.target.value, 10) || 1)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 text-sm font-medium focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-3 pt-4">
                  <label className="flex items-center gap-3 text-xs font-bold text-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.bplStatus}
                      onChange={(e) => handleInputChange("bplStatus", e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                    />
                    <span>Holds BPL Ration Card / SECC 2011 List</span>
                  </label>

                  <label className="flex items-center gap-3 text-xs font-bold text-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.kisanCreditCard}
                      onChange={(e) => handleInputChange("kisanCreditCard", e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                    />
                    <span>Possesses Kisan Credit Card (KCC)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex justify-end">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                leftIcon={<Save size={18} />}
                className="px-8"
              >
                Save Profile
              </Button>
            </div>

          </form>
        </Card>

      </div>

      <OCRScannerModal
        isOpen={ocrModalOpen}
        onClose={() => setOcrModalOpen(false)}
      />
    </DashboardLayout>
  );
}
