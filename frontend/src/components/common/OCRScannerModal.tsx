import { useState } from "react";
import { UploadCloud, CheckCircle2, Shield, Scan, RefreshCw } from "lucide-react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { useUserProfile } from "../../context/UserProfileContext";

interface OCRScannerModalProps {
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
    }, 2500);
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
      title="AI OCR Document Verification Scanner"
      subtitle="Upload or capture your government identity documents to automatically fill eligibility parameters"
      maxWidth="lg"
    >
      <div className="space-y-6">
        {/* Document Type Switcher */}
        <div className="grid grid-cols-3 gap-3 p-1.5 bg-slate-100 rounded-2xl">
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
              className={`py-2 px-3 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                selectedDocType === item.id
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Upload Dropzone / Scanning View */}
        {status === "idle" && (
          <div
            onClick={handleSimulateUpload}
            className="border-2 border-dashed border-blue-200 hover:border-blue-500 bg-blue-50/40 hover:bg-blue-50 p-8 rounded-3xl text-center cursor-pointer transition-all group"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <UploadCloud size={32} />
            </div>
            <h4 className="font-bold text-slate-800 text-base">
              Upload your {selectedDocType.toUpperCase()} document
            </h4>
            <p className="text-slate-500 text-xs mt-1 max-w-sm mx-auto">
              Drag & drop image/PDF file or click to simulate real-time AI optical character recognition (OCR).
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full text-[11px] font-semibold text-slate-600 border border-slate-200">
              <Shield size={12} className="text-emerald-500" />
              <span>Supports JPG, PNG, PDF (Max 10MB)</span>
            </div>
          </div>
        )}

        {status === "scanning" && (
          <div className="bg-slate-900 text-white p-8 rounded-3xl text-center space-y-6 relative overflow-hidden">
            {/* Animated Laser Line */}
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse top-1/2 shadow-lg shadow-cyan-400/50"></div>

            <div className="w-16 h-16 rounded-2xl bg-blue-600/30 border border-blue-500 text-blue-400 flex items-center justify-center mx-auto animate-spin">
              <RefreshCw size={28} />
            </div>
            <div>
              <h4 className="font-bold text-lg text-white">AI OCR Extraction in Progress...</h4>
              <p className="text-slate-400 text-xs mt-1">Reading text fields, QR codes, and government official seals</p>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full w-3/4 animate-pulse"></div>
            </div>
          </div>
        )}

        {status === "success" && extractedData && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-200 text-xs font-semibold">
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
              <span>OCR Verification Successful! 5 Key parameters extracted with 99.4% confidence score.</span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-xs">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Extracted OCR Data Preview
              </div>
              {Object.entries(extractedData).map(([key, val]) => (
                <div key={key} className="flex justify-between items-center py-1 border-b border-slate-200/60 last:border-0">
                  <span className="text-slate-500 capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                  <span className="font-bold text-slate-900">{val}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setStatus("idle")}
                className="flex-1"
              >
                Scan Another
              </Button>
              <Button
                variant="primary"
                onClick={handleAutoFill}
                leftIcon={<Scan size={16} />}
                className="flex-1"
              >
                Auto-Fill to Profile
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
