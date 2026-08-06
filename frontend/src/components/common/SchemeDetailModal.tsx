import { useState } from "react";
import { CheckCircle2, ShieldCheck, FileCheck, ArrowRight, Building2, Check } from "lucide-react";
import Modal from "../ui/Modal";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { useUserProfile } from "../../context/UserProfileContext";
import type { Scheme } from "../../types";

interface SchemeDetailModalProps {
  scheme: Scheme | null;
  isOpen: boolean;
  onClose: () => void;
  isApplyingMode?: boolean;
}

export default function SchemeDetailModal({
  scheme,
  isOpen,
  onClose,
  isApplyingMode = false,
}: SchemeDetailModalProps) {
  const { profile } = useUserProfile();
  const [step, setStep] = useState<"details" | "confirm" | "submitted">(
    isApplyingMode ? "confirm" : "details"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!scheme) return null;

  const handleConfirmApply = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep("submitted");
    }, 1800);
  };

  const handleCloseModal = () => {
    setStep("details");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
      maxWidth="xl"
    >
      <div className="space-y-6">
        {/* Header Title */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge matchPercentage={scheme.matchPercentage} />
            <Badge label={scheme.category} variant="category" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">{scheme.name}</h2>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Building2 size={14} className="text-blue-600" />
            <span>{scheme.ministry} • {scheme.department}</span>
          </div>
        </div>

        {step === "details" && (
          <div className="space-y-6">
            <p className="text-sm text-slate-600 leading-relaxed bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
              {scheme.summary}
            </p>

            {/* Financial Benefits */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span>🎁 Scheme Benefits</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {scheme.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl text-xs font-semibold text-slate-800 border border-slate-200/60">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Eligibility Criteria */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span>📋 Eligibility Criteria Breakdown</span>
              </h4>
              <div className="space-y-2">
                {scheme.eligibilityCriteria.map((criterion, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </div>
                    <span>{criterion}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents Required */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span>📄 Mandatory Documents Checklist</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {scheme.documentsRequired.map((doc, idx) => (
                  <div key={idx} className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <FileCheck size={14} className="text-blue-600" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex gap-3">
              <Button variant="outline" onClick={handleCloseModal} className="flex-1">
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => setStep("confirm")}
                rightIcon={<ArrowRight size={16} />}
                className="flex-1"
              >
                Proceed to One-Click Application
              </Button>
            </div>
          </div>
        )}

        {step === "confirm" && (
          <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200/80 p-4 rounded-2xl text-xs text-amber-900 space-y-1">
              <span className="font-bold flex items-center gap-1">
                <ShieldCheck size={16} className="text-amber-600" /> Pre-filled Application Preview
              </span>
              <p>Your profile data & verified document links will be submitted directly to the Ministry portal.</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Applicant Name</span>
                <span className="font-bold text-slate-900">{profile.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Mobile Number</span>
                <span className="font-bold text-slate-900">{profile.countryCode} {profile.mobile}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">State / District</span>
                <span className="font-bold text-slate-900">{profile.state}, {profile.district}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Occupation</span>
                <span className="font-bold text-slate-900">{profile.occupation} ({profile.landHolding} Acres)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Aadhaar Status</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <Check size={14} /> Verified via AI OCR
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep("details")} className="flex-1">
                Back
              </Button>
              <Button
                variant="primary"
                onClick={handleConfirmApply}
                isLoading={isSubmitting}
                className="flex-1"
              >
                Submit Application Now
              </Button>
            </div>
          </div>
        )}

        {step === "submitted" && (
          <div className="py-6 text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 animate-bounce">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Application Submitted!</h3>
            <p className="text-slate-600 text-xs max-w-md mx-auto">
              Your application reference ID is <span className="font-bold text-slate-900">GOV-2025-99812</span>.
              Tracking details have been sent to +91 {profile.mobile}.
            </p>
            <div className="pt-4">
              <Button variant="primary" onClick={handleCloseModal} className="px-8">
                Done & Return to Dashboard
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
