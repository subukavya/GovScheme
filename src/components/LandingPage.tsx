import React from 'react';
import { 
  Building2, 
  Sparkles, 
  Bot, 
  ShieldCheck, 
  Globe2, 
  ArrowRight, 
  CheckCircle2, 
  UserCheck, 
  FileText, 
  ExternalLink, 
  Mic, 
  ScanLine, 
  Zap, 
  Award,
  ChevronRight
} from 'lucide-react';
import { LanguageCode, UserProfile, Scheme } from '../types';
import { translations } from '../data/translations';

interface LandingPageProps {
  currentLang: LanguageCode;
  onGetStarted: () => void;
  onTalkToAI: () => void;
  onNavigateTab: (tab: string) => void;
  topSchemes: Scheme[];
  user: UserProfile | null;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  currentLang,
  onGetStarted,
  onTalkToAI,
  onNavigateTab,
  topSchemes,
  user
}) => {
  const t = translations[currentLang] || translations['en'];

  return (
    <div className="space-y-16 py-6 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-14 shadow-2xl mx-4 sm:mx-8 border border-blue-800/50">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          {/* Govt Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-800/70 border border-blue-400/30 text-blue-200 text-xs font-semibold backdrop-blur-sm shadow-inner">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>National Government Scheme Eligibility Recommender</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight font-heading">
            {t.appName}
          </h1>

          <p className="text-2xl sm:text-3xl font-bold text-amber-400 font-heading">
            "{t.tagline}"
          </p>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-base shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <span>{t.getStarted}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onTalkToAI}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-800/80 hover:bg-blue-700 text-white font-bold text-base border border-blue-400/40 backdrop-blur-sm transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Bot className="w-5 h-5 text-amber-400" />
              <span>{t.talkToAI}</span>
            </button>
          </div>

          {/* Quick Input Methods shortcuts */}
          <div className="pt-6 border-t border-blue-800/60 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-300">
            <span className="font-semibold text-slate-400">Choose Input Method:</span>
            <button onClick={() => onNavigateTab('profile')} className="hover:text-amber-400 flex items-center gap-1 font-medium transition">
              <FileText className="w-3.5 h-3.5 text-blue-400" /> Manual Form
            </button>
            <button onClick={onTalkToAI} className="hover:text-amber-400 flex items-center gap-1 font-medium transition">
              <Mic className="w-3.5 h-3.5 text-emerald-400" /> Voice Input
            </button>
            <button onClick={() => onNavigateTab('vault')} className="hover:text-amber-400 flex items-center gap-1 font-medium transition">
              <ScanLine className="w-3.5 h-3.5 text-purple-400" /> OCR Document Scan
            </button>
          </div>
        </div>
      </section>

      {/* Three Core Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: AI Powered */}
          <div className="gov-card p-6 relative overflow-hidden group hover:border-blue-500 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading mb-2">
              {t.aiPoweredTitle}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.aiPoweredDesc}
            </p>
          </div>

          {/* Card 2: Multilingual */}
          <div className="gov-card p-6 relative overflow-hidden group hover:border-emerald-500 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Globe2 className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading mb-2">
              {t.multilingualTitle}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.multilingualDesc}
            </p>
          </div>

          {/* Card 3: Government Verified */}
          <div className="gov-card p-6 relative overflow-hidden group hover:border-amber-500 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading mb-2">
              {t.govtVerifiedTitle}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.govtVerifiedDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Simple 4-Step Interactive Workflow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
            Simplified User Journey
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
            {t.howItWorks}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {[
            {
              title: t.step1Title,
              desc: t.step1Desc,
              icon: FileText,
              color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800'
            },
            {
              title: t.step2Title,
              desc: t.step2Desc,
              icon: Zap,
              color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800'
            },
            {
              title: t.step3Title,
              desc: t.step3Desc,
              icon: Award,
              color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
            },
            {
              title: t.step4Title,
              desc: t.step4Desc,
              icon: ExternalLink,
              color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800'
            }
          ].map((step, idx) => (
            <div key={idx} className="gov-card p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold border ${step.color}`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Schemes Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white font-heading">
              Featured National Welfare Schemes
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Discover verified welfare initiatives across Central and State Governments.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('schemes')}
            className="text-xs font-bold text-blue-700 dark:text-blue-400 hover:text-blue-800 flex items-center gap-1"
          >
            <span>View All Schemes ({topSchemes.length}+)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topSchemes.slice(0, 3).map(scheme => (
            <div key={scheme.id} className="gov-card p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <span className="bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                    {scheme.state === 'Central' ? 'Central Govt' : scheme.state}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {scheme.financialBenefitAmount ? `Up to ₹${scheme.financialBenefitAmount.toLocaleString('en-IN')}` : 'Welfare Benefit'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1 font-heading">
                  {scheme.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {scheme.shortDescription}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-medium">
                  {scheme.category}
                </span>
                <button
                  onClick={() => onNavigateTab('schemes')}
                  className="text-blue-700 dark:text-blue-400 font-bold hover:underline"
                >
                  Check Eligibility →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 rounded-2xl p-8 sm:p-10 text-slate-950 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl font-black font-heading tracking-tight">
              Ready to Discover Your Eligible Government Schemes?
            </h3>
            <p className="text-xs font-semibold opacity-90 leading-relaxed">
              Complete your profile in 2 minutes or speak to our AI Assistant to find all welfare programs for your household.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={onGetStarted}
              className="px-6 py-3 rounded-xl bg-slate-950 text-white font-bold text-xs hover:bg-slate-900 transition shadow"
            >
              Build Profile
            </button>
            <button
              onClick={onTalkToAI}
              className="px-6 py-3 rounded-xl bg-white text-slate-950 font-bold text-xs hover:bg-slate-100 transition shadow flex items-center gap-1.5"
            >
              <Bot className="w-4 h-4 text-blue-700" />
              <span>Talk to AI</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
