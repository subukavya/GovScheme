import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import AuthLayout from "../components/layout/AuthLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Logo from "../components/ui/Logo";
import { useAuth } from "../context/AuthContext";
import type { CountryCode } from "../types";

export const COUNTRY_CODES: CountryCode[] = [
  { code: "IN", country: "India", flag: "🇮🇳", dialCode: "+91" },
  { code: "US", country: "United States", flag: "🇺🇸", dialCode: "+1" },
  { code: "UK", country: "United Kingdom", flag: "🇬🇧", dialCode: "+44" },
  { code: "AE", country: "UAE", flag: "🇦🇪", dialCode: "+971" },
  { code: "NP", country: "Nepal", flag: "🇳🇵", dialCode: "+977" },
];

export default function MobileLogin() {
  const navigate = useNavigate();
  const { sendOtp } = useAuth();
  
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(COUNTRY_CODES[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val.length <= 10) {
      setPhoneNumber(val);
      if (error) setError("");
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length < 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const success = sendOtp(phoneNumber, selectedCountry.dialCode);
      setIsLoading(false);
      if (success) {
        navigate("/verify-otp");
      } else {
        setError("Failed to send OTP. Please check your number.");
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
            Mobile Number Login
          </h2>
          <p className="text-xs text-[#64748B] max-w-xs mx-auto leading-relaxed font-normal">
            Enter your mobile phone number to receive a 6-digit verification code.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="mobile-input" className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider">
              Mobile Number
            </label>

            <div className="flex gap-3">
              {/* Country Code Dropdown */}
              <div className="relative shrink-0">
                <select
                  aria-label="Country Code"
                  value={selectedCountry.code}
                  onChange={(e) => {
                    const found = COUNTRY_CODES.find((c) => c.code === e.target.value);
                    if (found) setSelectedCountry(found);
                  }}
                  className="h-13 px-3.5 rounded-[16px] border border-[#E2E8F0] bg-white text-[#0F172A] text-xs font-bold focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 cursor-pointer appearance-none pr-8 min-h-[50px]"
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.dialCode}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none text-[10px]">
                  ▼
                </div>
              </div>

              {/* Phone Input */}
              <div className="relative flex-1">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" size={18} />
                <input
                  id="mobile-input"
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="98765 43210"
                  maxLength={10}
                  className={`w-full h-13 rounded-[16px] border pl-11 pr-4 text-[#0F172A] font-bold text-base transition-all placeholder:text-[#64748B] placeholder:font-normal focus:outline-none focus:ring-4 min-h-[50px] ${
                    error
                      ? "border-[#EF4444] focus:border-[#EF4444] focus:ring-red-100 bg-red-50/20"
                      : "border-[#E2E8F0] focus:border-[#2563EB] focus:ring-blue-100 bg-white"
                  }`}
                  autoFocus
                />
              </div>
            </div>

            {error && <p className="text-xs text-[#EF4444] font-semibold">{error}</p>}
          </div>

          {/* Sandbox Helper Hint */}
          <div className="p-3.5 bg-[#DBEAFE] rounded-[14px] border border-blue-200 flex items-center gap-3 text-xs text-[#2563EB]">
            <Sparkles size={16} className="text-[#2563EB] shrink-0" />
            <div>
              <span>Demo Login: Use OTP <strong className="font-bold underline">123456</strong></span>
            </div>
          </div>

          {/* Send OTP Button (Single Primary Action) */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
            rightIcon={<ArrowRight size={18} />}
          >
            Send OTP
          </Button>
        </form>

        {/* Security Note */}
        <div className="pt-2 text-center text-xs text-[#64748B] flex items-center justify-center gap-1.5 font-medium">
          <ShieldCheck size={14} className="text-[#10B981]" />
          <span>Protected by Official Government Gateway</span>
        </div>

      </Card>
    </AuthLayout>
  );
}
