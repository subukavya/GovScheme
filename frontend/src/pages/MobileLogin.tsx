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
            Mobile Number Login
          </h2>
          <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
            Enter your phone number to receive a 6-digit verification code.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Mobile Number
            </label>

            <div className="flex gap-3">
              {/* Country Code Dropdown */}
              <div className="relative shrink-0">
                <select
                  value={selectedCountry.code}
                  onChange={(e) => {
                    const found = COUNTRY_CODES.find((c) => c.code === e.target.value);
                    if (found) setSelectedCountry(found);
                  }}
                  className="h-13 px-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-bold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer appearance-none pr-8"
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.dialCode}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[10px]">
                  ▼
                </div>
              </div>

              {/* Phone Input */}
              <div className="relative flex-1">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="98765 43210"
                  maxLength={10}
                  className={`w-full h-13 rounded-2xl border pl-11 pr-4 text-slate-900 font-bold text-base transition-all placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:ring-4 ${
                    error
                      ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100 bg-rose-50/20"
                      : "border-slate-200 focus:border-blue-500 focus:ring-blue-100 bg-slate-50/50"
                  }`}
                  autoFocus
                />
              </div>
            </div>

            {error && <p className="text-xs text-rose-500 font-semibold">{error}</p>}
          </div>

          {/* Sandbox Helper Hint */}
          <div className="p-3.5 bg-blue-50/80 rounded-2xl border border-blue-100 flex items-center gap-3 text-xs text-blue-800">
            <Sparkles size={16} className="text-blue-600 shrink-0" />
            <div>
              <span>Demo Login: Use OTP <strong className="font-extrabold underline">123456</strong></span>
            </div>
          </div>

          {/* Send OTP Button */}
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
        <div className="pt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5 font-medium">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span>Protected by Government OTP Gateways</span>
        </div>

      </Card>
    </AuthLayout>
  );
}
