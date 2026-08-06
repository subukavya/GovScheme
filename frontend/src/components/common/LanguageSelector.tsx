import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useLanguage, SUPPORTED_LANGUAGES } from "../../context/LanguageContext";

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-white/80 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-all cursor-pointer"
      >
        <Globe size={15} className="text-blue-600" />
        <span className="text-sm">{language.flag}</span>
        <span className="hidden sm:inline font-bold">{language.nativeName}</span>
        <ChevronDown size={14} className="text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white shadow-2xl border border-slate-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
            Select Language / भाषा चुनें
          </div>
          <div className="max-h-60 overflow-y-auto py-1">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = lang.code === language.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-blue-50 text-blue-700 font-bold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{lang.flag}</span>
                    <div className="flex flex-col text-left">
                      <span>{lang.nativeName}</span>
                      <span className="text-[10px] text-slate-400">{lang.name}</span>
                    </div>
                  </div>
                  {isSelected && <Check size={14} className="text-blue-600" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
