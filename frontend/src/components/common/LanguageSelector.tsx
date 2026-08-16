import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check, ArrowRight } from "lucide-react";
import { useLanguage, SUPPORTED_LANGUAGES } from "../../context/LanguageContext";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

interface LanguageSelectorProps {
  showFullModalOnClick?: boolean;
}

export default function LanguageSelector({ showFullModalOnClick = false }: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(language);
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

  const handleOpenSelector = () => {
    if (showFullModalOnClick) {
      setSelectedLang(language);
      setModalOpen(true);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleConfirmLanguage = () => {
    setLanguage(selectedLang);
    setModalOpen(false);
  };

  return (
    <>
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <button
          onClick={handleOpenSelector}
          aria-label="Select Language"
          className="flex items-center gap-2 px-3.5 py-2 rounded-[14px] border border-[#E2E8F0] bg-white hover:bg-slate-50 text-[#0F172A] text-xs font-bold shadow-xs transition-all cursor-pointer min-h-[40px] focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          <Globe size={16} className="text-[#2563EB]" />
          <span className="text-base leading-none">{language.flag}</span>
          <span className="font-bold text-xs">{language.nativeName}</span>
          <ChevronDown size={14} className="text-[#64748B]" />
        </button>

        {isOpen && !showFullModalOnClick && (
          <div className="absolute right-0 mt-2 w-56 rounded-[20px] bg-white shadow-xl border border-[#E2E8F0] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="px-4 py-2 text-[11px] font-bold text-[#64748B] uppercase tracking-wider border-b border-[#E2E8F0]">
              Choose Language / भाषा चुनिए
            </div>
            <div className="max-h-64 overflow-y-auto py-1">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isSelected = lang.code === language.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-xs transition-colors cursor-pointer min-h-[44px] ${
                      isSelected
                        ? "bg-[#DBEAFE] text-[#2563EB] font-bold"
                        : "text-[#0F172A] hover:bg-slate-50 font-medium"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{lang.flag}</span>
                      <div className="flex flex-col text-left">
                        <span className="font-bold text-xs">{lang.nativeName}</span>
                        <span className="text-[10px] text-[#64748B]">{lang.name}</span>
                      </div>
                    </div>
                    {isSelected && <Check size={16} className="text-[#2563EB]" />}
                  </button>
                );
              })}
            </div>
            <div className="p-2 border-t border-[#E2E8F0]">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setSelectedLang(language);
                  setModalOpen(true);
                }}
                className="w-full text-center text-xs font-bold text-[#2563EB] py-1.5 hover:underline cursor-pointer"
              >
                Expand Language Screen
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FULL LANGUAGE SELECTION MODAL */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Select Preferred Language / भाषा चुनें"
        subtitle="Choose your language for an easy, step-by-step experience"
        maxWidth="xl"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[380px] overflow-y-auto p-1">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = lang.code === selectedLang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLang(lang)}
                  className={`p-4 rounded-[16px] border text-left flex items-center justify-between transition-all cursor-pointer min-h-[64px] ${
                    isSelected
                      ? "bg-[#DBEAFE] border-[#2563EB] text-[#2563EB] shadow-xs"
                      : "bg-white border-[#E2E8F0] hover:border-blue-300 text-[#0F172A]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{lang.flag}</span>
                    <div>
                      <div className="font-bold text-sm">{lang.nativeName}</div>
                      <div className="text-xs text-[#64748B]">{lang.name}</div>
                    </div>
                  </div>
                  {isSelected && <Check size={20} className="text-[#2563EB] shrink-0" />}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#E2E8F0] flex justify-end">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleConfirmLanguage}
              rightIcon={<ArrowRight size={18} />}
            >
              Continue / आगे बढ़ें ({selectedLang.nativeName})
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
