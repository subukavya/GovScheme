import { Phone, Mail } from "lucide-react";
import Logo from "../ui/Logo";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200/80 bg-white text-slate-600">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Col 1: Brand & Description */}
          <div className="space-y-4 md:col-span-1">
            <Logo clickable={false} />
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              AI-powered welfare recommendation system empowering rural Indian households to discover, verify, and receive scheme benefits.
            </p>
          </div>

          {/* Col 2: Government Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Government Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://pmkisan.gov.in" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">
                  PM-KISAN Samman Nidhi
                </a>
              </li>
              <li>
                <a href="https://pmayg.nic.in" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">
                  PMAY Housing Gramin
                </a>
              </li>
              <li>
                <a href="https://pmvishwakarma.gov.in" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">
                  PM Vishwakarma Artisans
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Technology */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Platform Features
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>AI Eligibility Match Engine</li>
              <li>OCR Document Reader</li>
              <li>Multilingual Voice Assistance</li>
              <li>12 Indian Regional Languages</li>
            </ul>
          </div>

          {/* Col 4: Rural Helpdesk */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Rural Support Helpline
            </h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-center gap-2 font-bold text-slate-800">
                <Phone size={14} className="text-blue-600" /> 1800-115-555 (Toll-Free)
              </p>
              <p className="flex items-center gap-2 text-slate-500">
                <Mail size={14} className="text-blue-600" /> helpdesk@govscheme.ai
              </p>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} GovScheme AI. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-600 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-600 cursor-pointer">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
