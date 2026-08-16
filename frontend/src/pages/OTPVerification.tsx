import { useState, useRef, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, RefreshCw, Sparkles } from "lucide-react";
import AuthLayout from "../components/layout/AuthLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Logo from "../components/ui/Logo";
import { useAuth } from "../context/AuthContext";

export default function OTPVerification() {
  const navigate = useNavigate();
  const { tempPhone, tempCountryCode, otpCountdown, resendOtp, verifyOtp } = useAuth();
  
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!tempPhone) {
      navigate("/login");
    }
  }, [tempPhone, navigate]);

  const handleChange = (index: number, value: string) => {
    const cleanVal = value.replace(/\D/g, "");
    if (!cleanVal && value !== "") return;

    const newOtp = [...otp];
    newOtp[index] = cleanVal.slice(-1);
    setOtp(newOtp);

    if (error) setError("");

    if (cleanVal && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pastedData) {
      const newOtp = [...otp];
      for (let i = 0; i < 6; i++) {
        newOtp[i] = pastedData[i] || "";
      }
      setOtp(newOtp);
      if (pastedData.length === 6) {
        inputRefs.current[5]?.focus();
      }
    }
  };

  const handleSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault();
    const fullOtp = otp.join("");
    if (fullOtp.length < 6) {
      setError("Please enter all 6 digits of the OTP code");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const success = verifyOtp(fullOtp);
      setIsLoading(false);
      if (success) {
        navigate("/dashboard");
      } else {
        setError("Invalid OTP code. Try entering 123456.");
      }
    }, 800);
  };

  return (
    <AuthLayout>
      <Card padding="xl" className="w-full shadow-soft-lg border border-[#E2E8F0] space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center mb-2">
            <Logo size="md" clickable={false} />
          </div>
          <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">
            Verify OTP
          </h2>
          <div className="text-xs text-[#64748B]">
            <span>Sent to </span>
            <strong className="text-[#0F172A]">{tempCountryCode} {tempPhone || "9876543210"}</strong>
            <button
              onClick={() => navigate("/login")}
              className="ml-2 text-[#2563EB] font-bold underline hover:text-blue-700 inline-block"
            >
              Change
            </button>
          </div>
        </div>

        {/* OTP Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between items-center gap-2 sm:gap-3" onPaste={handlePaste}>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => { inputRefs.current[idx] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                aria-label={`OTP Digit ${idx + 1}`}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className={`w-11 sm:w-13 h-14 sm:h-15 rounded-[16px] border text-center text-xl font-bold transition-all focus:outline-none focus:ring-4 ${
                  digit
                    ? "border-[#2563EB] bg-[#DBEAFE]/40 text-[#2563EB] focus:ring-blue-100"
                    : "border-[#E2E8F0] bg-white text-[#0F172A] focus:border-[#2563EB] focus:ring-blue-100"
                }`}
                autoFocus={idx === 0}
              />
            ))}
          </div>

          {error && <p className="text-center text-xs text-[#EF4444] font-semibold">{error}</p>}

          {/* Sandbox Helper Hint */}
          <div className="p-3.5 bg-[#DBEAFE] rounded-[14px] border border-blue-200 flex items-center justify-between text-xs text-[#2563EB]">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#2563EB] shrink-0" />
              <span>Demo OTP: <strong className="font-bold underline">123456</strong></span>
            </div>
            <button
              type="button"
              onClick={() => {
                setOtp(["1", "2", "3", "4", "5", "6"]);
                setError("");
              }}
              className="px-3 py-1 bg-[#2563EB] text-white font-bold rounded-[10px] hover:bg-blue-700 text-xs transition cursor-pointer"
            >
              Auto-Fill
            </button>
          </div>

          {/* Single Primary Action: Verify */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
            rightIcon={<ArrowRight size={18} />}
          >
            Verify & Proceed to Dashboard
          </Button>
        </form>

        {/* Resend OTP & Back Links */}
        <div className="pt-2 flex items-center justify-between text-xs border-t border-[#E2E8F0]">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-1.5 text-[#64748B] hover:text-[#0F172A] font-semibold cursor-pointer min-h-[40px]"
          >
            <ArrowLeft size={14} /> Back
          </button>

          {otpCountdown > 0 ? (
            <span className="text-[#64748B] font-medium">
              Resend in <strong className="text-[#0F172A] font-bold">{otpCountdown}s</strong>
            </span>
          ) : (
            <button
              type="button"
              onClick={resendOtp}
              className="flex items-center gap-1 text-[#2563EB] font-bold hover:text-blue-700 cursor-pointer min-h-[40px]"
            >
              <RefreshCw size={14} /> Resend OTP
            </button>
          )}
        </div>

      </Card>
    </AuthLayout>
  );
}
