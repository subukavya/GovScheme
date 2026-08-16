import { useState } from "react";
import { CheckCircle2, ShieldCheck, FileCheck, ExternalLink, ArrowRight, Building2, Check } from "lucide-react";
import Modal from "../ui/Modal";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { useUserProfile } from "../../context/UserProfileContext";
import type { Scheme } from "../../types";

export interface SchemeDetailModalProps {
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
    }, 1500);
  };

  const handleCloseModal = () => {
    setStep("details");
    onClose();
  };

  const officialLink = scheme.applicationUrl || `https://${scheme.id}.gov.in`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
      maxWidth="xl"
    >
      <div className="space-y-6">
        {/* Modal Header */}
        <div className="space-y-3 pb-4 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <Badge matchPercentage={scheme.matchPercentage} />
            <Badge label={scheme.category} variant="category" />
          </div>
          <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">{scheme.name}</h2>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B]">
            <Building2 size={14} className="text-[#2563EB]" />
            <span>{scheme.ministry} • {scheme.department}</span>
          </div>
        </div>

        {step === "details" && (
          <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-1">
            {/* Overview / Summary */}
            <p className="text-sm text-[#0F172A] leading-relaxed bg-[#DBEAFE]/40 p-4 rounded-[16px] border border-blue-200/60 font-normal">
              {scheme.summary}
            </p>

            {/* All Benefits */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                <span>🎁 Scheme Benefits</span>
              </h4>
              <div className="space-y-2">
                {scheme.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 bg-[#F8FAFC] p-3.5 rounded-[14px] text-xs font-semibold text-[#0F172A] border border-[#E2E8F0]">
                    <CheckCircle2 size={16} className="text-[#10B981] shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Eligibility Criteria */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                <span>📋 Eligibility Criteria</span>
              </h4>
              <div className="space-y-2">
                {scheme.eligibilityCriteria.map((criterion, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs text-[#0F172A] font-medium bg-white p-3 rounded-[14px] border border-[#E2E8F0]">
                    <div className="w-6 h-6 rounded-full bg-[#DBEAFE] text-[#2563EB] font-bold flex items-center justify-center text-xs shrink-0">
                      {idx + 1}
                    </div>
                    <span>{criterion}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Documents */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                <span>📄 Mandatory Required Documents</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {scheme.documentsRequired.map((doc, idx) => (
                  <div key={idx} className="px-3.5 py-2 rounded-[14px] bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] flex items-center gap-2">
                    <FileCheck size={15} className="text-[#2563EB]" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How to Apply */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                <span>⚡ How to Apply</span>
              </h4>
              <div className="p-4 rounded-[16px] bg-slate-50 border border-[#E2E8F0] space-y-2 text-xs text-[#64748B]">
                <p>1. Review mandatory document requirements listed above.</p>
                <p>2. Click <strong className="text-[#0F172A]">Apply Now</strong> to submit your verified profile directly to the government portal.</p>
                <p>3. Alternatively visit the official government website linked below for offline forms.</p>
              </div>
            </div>

            {/* Official Link */}
            <div className="pt-2">
              <a
                href={officialLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#2563EB] hover:underline"
              >
                <span>Visit Official Government Portal</span>
                <ExternalLink size={14} />
              </a>
            </div>

            {/* ONE Apply Button */}
            <div className="pt-4 border-t border-[#E2E8F0]">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => setStep("confirm")}
                rightIcon={<ArrowRight size={18} />}
              >
                Apply Now
              </Button>
            </div>
          </div>
        )}

        {step === "confirm" && (
          <div className="space-y-6">
            <div className="bg-[#DBEAFE]/40 border border-blue-200/80 p-4 rounded-[16px] text-xs text-[#0F172A] space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-[#2563EB]">
                <ShieldCheck size={16} /> Instant Pre-filled Application Preview
              </span>
              <p>Your verified household profile data will be submitted directly to the scheme administration desk.</p>
            </div>

            <div className="bg-[#F8FAFC] rounded-[16px] p-5 border border-[#E2E8F0] space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#E2E8F0]">
                <span className="text-[#64748B]">Applicant Name</span>
                <span className="font-bold text-[#0F172A]">{profile.name}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E2E8F0]">
                <span className="text-[#64748B]">Mobile Number</span>
                <span className="font-bold text-[#0F172A]">{profile.countryCode} {profile.mobile}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E2E8F0]">
                <span className="text-[#64748B]">State / District</span>
                <span className="font-bold text-[#0F172A]">{profile.state}, {profile.district}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#64748B]">Aadhaar Verification</span>
                <span className="font-bold text-[#10B981] flex items-center gap-1">
                  <Check size={14} /> Verified
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
                Confirm Application
              </Button>
            </div>
          </div>
        )}

        {step === "submitted" && (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center justify-center mx-auto">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-2xl font-bold text-[#0F172A]">Application Submitted!</h3>
            <p className="text-[#64748B] text-xs max-w-md mx-auto leading-relaxed font-normal">
              Your application tracking reference is <strong className="text-[#0F172A]">GOV-2026-88912</strong>. Confirmation SMS sent to {profile.countryCode} {profile.mobile}.
            </p>
            <div className="pt-4">
              <Button variant="primary" onClick={handleCloseModal} className="px-8">
                Done & Return
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
