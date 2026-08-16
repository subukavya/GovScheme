import { useState } from "react";
import { UploadCloud, CheckCircle2, Shield, Scan, RefreshCw } from "lucide-react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { useUserProfile } from "../../context/UserProfileContext";

export interface OCRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentType?: "aadhaar" | "income" | "caste";
}

export default function OCRScannerModal({
  isOpen,
  onClose,
  documentType = "aadhaar",
}: OCRScannerModalProps) {
  const { fillFromOCR } = useUserProfile();
  const [selectedDocType, setSelectedDocType] = useState<"aadhaar" | "income" | "caste">(documentType);
  const [status, setStatus] = useState<"idle" | "scanning" | "success">("idle");
  const [extractedData, setExtractedData] = useState<Record<string, string> | null>(null);

  const handleSimulateUpload = () => {
    setStatus("scanning");
    setTimeout(() => {
      let mockData: Record<string, string> = {};
      if (selectedDocType === "aadhaar") {
        mockData = {
          name: "Ramesh Kumar Sharma",
          idNumber: "XXXX-XXXX-8921",
          dob: "14/08/1982",
          address: "Vill. Rajapur, Dist. Varanasi, Uttar Pradesh - 221001",
          category: "OBC",
        };
      } else if (selectedDocType === "income") {
        mockData = {
          name: "Ramesh Kumar Sharma",
          idNumber: "INC/UP/2025/99120",
          income: "₹ 1,45,000",
          issueDate: "10/01/2025",
          issuingAuthority: "Tehsildar Office, Varanasi",
        };
      } else {
        mockData = {
          name: "Ramesh Kumar Sharma",
          idNumber: "CST/UP/2024/4412",
          category: "OBC",
          casteName: "Yadav / Ahir",
          issuingAuthority: "Sub-Divisional Magistrate",
        };
      }
      setExtractedData(mockData);
      setStatus("success");
    }, 2000);
  };

  const handleAutoFill = () => {
    if (extractedData) {
      fillFromOCR(extractedData);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Document Upload & Scanner"
      subtitle="Upload your document to automatically extract and fill profile fields"
      maxWidth="lg"
    >
      <div className="space-y-6">
        {/* Document Switcher */}
        <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-[16px]">
          {[
            { id: "aadhaar", label: "Aadhaar Card" },
            { id: "income", label: "Income Cert." },
            { id: "caste", label: "Caste Cert." },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedDocType(item.id as "aadhaar" | "income" | "caste");
                setStatus("idle");
                setExtractedData(null);
              }}
              className={`py-2.5 px-3 text-xs font-bold rounded-[12px] transition-all cursor-pointer min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                selectedDocType === item.id
                  ? "bg-white text-[#2563EB] shadow-xs"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Large Upload Area */}
        {status === "idle" && (
          <div
            tabIndex={0}
            role="button"
            aria-label={`Upload ${selectedDocType.toUpperCase()} document`}
            onClick={handleSimulateUpload}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleSimulateUpload()}
            className="border-2 border-dashed border-[#2563EB]/40 hover:border-[#2563EB] bg-[#DBEAFE]/20 hover:bg-[#DBEAFE]/40 p-10 rounded-[20px] text-center cursor-pointer transition-all group focus-visible:ring-2 focus-visible:ring-[#2563EB]"
          >
            <div className="w-16 h-16 rounded-[20px] bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
              <UploadCloud size={32} />
            </div>
            <h4 className="font-bold text-[#0F172A] text-lg">
              Upload {selectedDocType.toUpperCase()} Document
            </h4>
            <p className="text-[#64748B] text-xs mt-2 max-w-sm mx-auto leading-relaxed font-normal">
              Tap or drag your document photo to scan details automatically.
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-xs font-semibold text-[#64748B] border border-[#E2E8F0]">
              <Shield size={14} className="text-[#10B981]" />
              <span>Supports JPG, PNG, PDF (Max 10MB)</span>
            </div>
          </div>
        )}

        {/* Scanning Indicator */}
        {status === "scanning" && (
          <div className="bg-[#0F172A] text-white p-10 rounded-[20px] text-center space-y-6">
            <div className="w-14 h-14 rounded-[16px] bg-[#2563EB]/30 border border-[#2563EB] text-[#2563EB] flex items-center justify-center mx-auto animate-spin">
              <RefreshCw size={28} />
            </div>
            <div>
              <h4 className="font-bold text-lg text-white">Reading Document...</h4>
              <p className="text-[#64748B] text-xs mt-1 font-normal">Extracting text fields</p>
            </div>
          </div>
        )}

        {/* Extracted Fields & Single Auto-Fill Button */}
        {status === "success" && extractedData && (
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 p-3.5 bg-emerald-50 text-emerald-800 rounded-[16px] border border-emerald-200 text-xs font-bold">
              <CheckCircle2 size={18} className="text-[#10B981] shrink-0" />
              <span>Document read successfully! Extracted fields shown below.</span>
            </div>

            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[16px] p-5 space-y-3 text-xs">
              <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-2">
                Extracted Information
              </div>
              {Object.entries(extractedData).map(([key, val]) => (
                <div key={key} className="flex justify-between items-center py-2 border-b border-[#E2E8F0] last:border-0">
                  <span className="text-[#64748B] capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                  <span className="font-bold text-[#0F172A]">{val}</span>
                </div>
              ))}
            </div>

            {/* One Auto Fill Button */}
            <div className="pt-2">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleAutoFill}
                leftIcon={<Scan size={18} />}
              >
                Auto Fill
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
