import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  userPhone: string;
  countryCode: string;
  tempPhone: string;
  tempCountryCode: string;
  otpSent: boolean;
  otpCountdown: number;
  sendOtp: (phone: string, countryCode: string) => boolean;
  resendOtp: () => void;
  verifyOtp: (otp: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("govscheme_auth") === "true";
  });

  const [userPhone, setUserPhone] = useState<string>(() => {
    return localStorage.getItem("govscheme_phone") || "";
  });

  const [countryCode, setCountryCode] = useState<string>(() => {
    return localStorage.getItem("govscheme_country_code") || "+91";
  });

  const [tempPhone, setTempPhone] = useState<string>("");
  const [tempCountryCode, setTempCountryCode] = useState<string>("+91");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otpCountdown, setOtpCountdown] = useState<number>(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (otpCountdown > 0) {
      timer = setTimeout(() => setOtpCountdown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpCountdown]);

  const sendOtp = (phone: string, code: string) => {
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) return false;

    setTempPhone(cleanPhone);
    setTempCountryCode(code);
    setOtpSent(true);
    setOtpCountdown(30);
    return true;
  };

  const resendOtp = () => {
    if (otpCountdown === 0 && tempPhone) {
      setOtpCountdown(30);
    }
  };

  const verifyOtp = (otp: string) => {
    if (otp.length === 6) {
      setIsAuthenticated(true);
      setUserPhone(tempPhone || "9876543210");
      setCountryCode(tempCountryCode || "+91");
      
      localStorage.setItem("govscheme_auth", "true");
      localStorage.setItem("govscheme_phone", tempPhone || "9876543210");
      localStorage.setItem("govscheme_country_code", tempCountryCode || "+91");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserPhone("");
    setTempPhone("");
    setOtpSent(false);
    localStorage.removeItem("govscheme_auth");
    localStorage.removeItem("govscheme_phone");
    localStorage.removeItem("govscheme_country_code");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userPhone,
        countryCode,
        tempPhone,
        tempCountryCode,
        otpSent,
        otpCountdown,
        sendOtp,
        resendOtp,
        verifyOtp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
