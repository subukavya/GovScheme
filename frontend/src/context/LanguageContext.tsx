import { createContext, useContext, useState, type ReactNode } from "react";
import type { Language } from "../types";

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", flag: "🇮🇳" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", flag: "🇮🇳" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", flag: "🇮🇳" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
];

const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    heroTitle: "AI-Powered Government Scheme Eligibility Recommender",
    heroSubtitle: "Empowering rural households across India to instantly discover, verify eligibility, and apply for government welfare schemes.",
    getStarted: "Get Started",
    login: "Login / Register",
    dashboard: "Dashboard",
    schemes: "Schemes",
    profile: "User Profile",
    checkEligibility: "Check Eligibility",
    uploadDocuments: "Upload Documents",
    aiAssistant: "AI Voice Assistant",
    logout: "Logout",
  },
  hi: {
    heroTitle: "एआई-संचालित सरकारी योजना पात्रता सिफारिशकर्ता",
    heroSubtitle: "भारत भर के ग्रामीण परिवारों को सरकारी कल्याणकारी योजनाओं की तुरंत खोज, पात्रता सत्यापन और आवेदन करने में सक्षम बनाना।",
    getStarted: "शुरू करें",
    login: "लॉगिन / पंजीकरण",
    dashboard: "डैशबोर्ड",
    schemes: "योजनाएं",
    profile: "उपयोगकर्ता प्रोफ़ाइल",
    checkEligibility: "पात्रता जांचें",
    uploadDocuments: "दस्तावेज़ अपलोड करें",
    aiAssistant: "एआई वॉयस असिस्टेंट",
    logout: "लॉगआउट",
  },
  mr: {
    heroTitle: "एआय-आधारित शासकीय योजना पात्रता शिफारस प्रणाली",
    heroSubtitle: "ग्रामीण भागातील नागरिकांसाठी योग्य शासकीय योजना शोधणे आणि थेट अर्ज करणे आता सोपे.",
    getStarted: "शुरू करा",
    login: "लॉगिन",
    dashboard: "डॅशबोर्ड",
    schemes: "शासकीय योजना",
    profile: "प्रोफाइल",
    checkEligibility: "पात्रता तपासा",
    uploadDocuments: "कागदपत्रे अपलोड करा",
    aiAssistant: "एआय व्हॉईस सहाय्यक",
    logout: "लॉगआउट",
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(SUPPORTED_LANGUAGES[0]);

  const t = (key: string): string => {
    return TRANSLATIONS[language.code]?.[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
