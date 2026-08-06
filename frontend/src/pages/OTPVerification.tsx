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
    }, 1000);
  };

  return (
    <AuthLayout>
      <Card glass padding="xl" className="w-full shadow-2xl border border-white/80 space-y-8 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center mb-2">
            <Logo size="md" clickable={false} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Verify OTP
          </h2>
          <div className="text-xs text-slate-500">
            <span>Sent to </span>
            <span className="font-bold text-slate-900">{tempCountryCode} {tempPhone || "9876543210"}</span>
            <button
              onClick={() => navigate("/login")}
              className="ml-2 text-blue-600 font-bold underline hover:text-blue-700 inline-block"
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
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className={`w-11 sm:w-13 h-14 sm:h-15 rounded-2xl border text-center text-xl font-black transition-all focus:outline-none focus:ring-4 ${
                  digit
                    ? "border-blue-600 bg-blue-50/80 text-blue-900 focus:ring-blue-200"
                    : "border-slate-200 bg-slate-50/50 text-slate-900 focus:border-blue-500 focus:ring-blue-100"
                }`}
                autoFocus={idx === 0}
              />
            ))}
          </div>

          {error && <p className="text-center text-xs text-rose-500 font-semibold">{error}</p>}

          {/* Sandbox Helper Hint */}
          <div className="p-3.5 bg-blue-50/80 rounded-2xl border border-blue-100 flex items-center justify-between text-xs text-blue-800">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-blue-600 shrink-0" />
              <span>Demo OTP: <strong className="font-extrabold underline">123456</strong></span>
            </div>
            <button
              type="button"
              onClick={() => {
                setOtp(["1", "2", "3", "4", "5", "6"]);
                setError("");
              }}
              className="px-3 py-1 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 text-xs transition cursor-pointer"
            >
              Auto-Fill
            </button>
          </div>

          {/* Verify Button */}
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

        {/* Resend OTP */}
        <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-700 font-semibold cursor-pointer"
          >
            <ArrowLeft size={14} /> Back
          </button>

          {otpCountdown > 0 ? (
            <span className="text-slate-400 font-medium">
              Resend in <strong className="text-slate-700 font-bold">{otpCountdown}s</strong>
            </span>
          ) : (
            <button
              type="button"
              onClick={resendOtp}
              className="flex items-center gap-1 text-blue-600 font-bold hover:text-blue-700 cursor-pointer"
            >
              <RefreshCw size={14} /> Resend OTP
            </button>
          )}
        </div>

      </Card>
    </AuthLayout>
  );
}
