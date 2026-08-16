import { type ReactNode, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = "lg",
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "modal-title" : undefined}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#0F172A]/60 backdrop-blur-xs"
            onClick={onClose}
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`relative w-full ${maxWidthClasses[maxWidth]} bg-white rounded-[24px] shadow-2xl border border-[#E2E8F0] overflow-hidden z-10 my-8`}
          >
            {/* Header */}
            {(title || subtitle) && (
              <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-[#E2E8F0] bg-slate-50/50">
                <div>
                  {title && <h3 id="modal-title" className="text-xl font-bold text-[#0F172A]">{title}</h3>}
                  {subtitle && <p className="text-xs text-[#64748B] mt-1">{subtitle}</p>}
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close dialog"
                  className="p-2 text-[#64748B] hover:text-[#0F172A] hover:bg-slate-200/60 rounded-full transition-colors cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
                >
                  <X size={20} />
                </button>
              </div>
            )}

            {/* Content */}
            <div className="p-6 sm:p-8">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
