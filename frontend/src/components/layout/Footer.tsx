import { Phone, Mail } from "lucide-react";
import Logo from "../ui/Logo";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#E2E8F0] bg-white text-[#64748B] text-xs font-normal">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Description */}
          <div className="space-y-3 md:col-span-1">
            <Logo clickable={false} />
            <p className="text-xs text-[#64748B] leading-relaxed max-w-xs font-normal">
              Official AI Welfare Recommender for rural Indian households to discover, verify eligibility, and apply for government schemes.
            </p>
          </div>

          {/* Col 2: Official Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
              Government Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://pmkisan.gov.in" target="_blank" rel="noreferrer" className="hover:text-[#2563EB] transition-colors focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded">
                  PM-KISAN Samman Nidhi
                </a>
              </li>
              <li>
                <a href="https://pmayg.nic.in" target="_blank" rel="noreferrer" className="hover:text-[#2563EB] transition-colors focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded">
                  PMAY Housing Gramin
                </a>
              </li>
              <li>
                <a href="https://pmvishwakarma.gov.in" target="_blank" rel="noreferrer" className="hover:text-[#2563EB] transition-colors focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded">
                  PM Vishwakarma Artisans
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Platform Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
              Key Features
            </h4>
            <ul className="space-y-2 text-xs text-[#64748B]">
              <li>AI Eligibility Match Engine</li>
              <li>OCR Document Auto-Fill</li>
              <li>Multilingual Voice Assistant</li>
              <li>Direct Benefit Transfer (DBT)</li>
            </ul>
          </div>

          {/* Col 4: Rural Helpdesk */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
              Rural Support Helpline
            </h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-center gap-2 font-bold text-[#0F172A]">
                <Phone size={14} className="text-[#2563EB]" /> 1800-115-555 (Toll-Free)
              </p>
              <p className="flex items-center gap-2 text-[#64748B]">
                <Mail size={14} className="text-[#2563EB]" /> helpdesk@govscheme.ai
              </p>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <p>© {new Date().getFullYear()} GovScheme AI. All Rights Reserved.</p>
          <div className="flex items-center gap-6 font-medium">
            <span className="hover:text-[#0F172A] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#0F172A] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#0F172A] cursor-pointer">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
