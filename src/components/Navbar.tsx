import React, { useState } from 'react';
import { 
  Building2, 
  Languages, 
  Sun, 
  Moon, 
  Eye, 
  Bell, 
  User as UserIcon, 
  Mic, 
  LayoutDashboard, 
  Monitor, 
  Sparkles,
  Search,
  FileCheck,
  CheckCircle2,
  SlidersHorizontal,
  Volume2
} from 'lucide-react';
import { LanguageCode, UserProfile } from '../types';
import { languages, translations } from '../data/translations';

interface NavbarProps {
  currentLang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: 'light' | 'dark' | 'high-contrast';
  setTheme: (theme: 'light' | 'dark' | 'high-contrast') => void;
  textSize: 'normal' | 'large' | 'xlarge';
  setTextSize: (size: 'normal' | 'large' | 'xlarge') => void;
  user: UserProfile | null;
  onOpenAuth: () => void;
  unreadCount: number;
  onOpenNotifications: () => void;
  onStartVoiceCommand: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  activeTab,
  setActiveTab,
  theme,
  setTheme,
  textSize,
  setTextSize,
  user,
  onOpenAuth,
  unreadCount,
  onOpenNotifications,
  onStartVoiceCommand
}) => {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const t = translations[currentLang] || translations['en'];

  const nextTextSize = textSize === 'normal' ? 'large' : textSize === 'large' ? 'xlarge' : 'normal';

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      {/* Top Govt Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-8 flex flex-wrap justify-between items-center gap-2 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center text-amber-400 font-semibold">
            <span className="pulse-dot mr-2"></span> Government of India Digital Initiative
          </span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:inline text-slate-400">National Scheme Eligibility Platform</span>
        </div>

        {/* Accessibility & Language Bar */}
        <div className="flex items-center space-x-3">
          {/* Text Size Control */}
          <button
            onClick={() => setTextSize(nextTextSize)}
            title="Adjust Font Size for Accessibility"
            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs transition"
          >
            Font: {textSize.toUpperCase()}
          </button>

          {/* High Contrast Toggle */}
          <button
            onClick={() => setTheme(theme === 'high-contrast' ? 'light' : 'high-contrast')}
            title="Toggle High Contrast Mode"
            className={`px-2 py-0.5 rounded text-xs transition flex items-center gap-1 ${
              theme === 'high-contrast' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Eye className="w-3 h-3" /> Contrast
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title="Toggle Light/Dark Theme"
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-900/60 hover:bg-blue-800 text-blue-200 text-xs font-medium transition"
            >
              <Languages className="w-3.5 h-3.5 text-amber-400" />
              <span>{languages.find(l => l.code === currentLang)?.nativeName || 'English'}</span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-1 w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl py-1 z-50">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange(lang.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex justify-between items-center hover:bg-blue-50 dark:hover:bg-slate-700 ${
                      currentLang === lang.code ? 'font-bold text-blue-600 dark:text-blue-400 bg-blue-50/50' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{lang.nativeName}</span>
                    <span className="text-[10px] text-slate-400">({lang.name})</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Header */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-900 via-blue-700 to-indigo-800 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Building2 className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white font-heading">
                {t.appName}
              </h1>
              <span className="bg-amber-500/10 text-amber-700 dark:text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/20">
                AI ENGINE
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center space-x-1">
          {[
            { id: 'home', label: t.navHome },
            { id: 'schemes', label: t.navSchemes },
            { id: 'assistant', label: t.navAssistant, isAI: true },
            { id: 'vault', label: t.navVault },
            { id: 'tracker', label: t.navTracker },
            { id: 'profile', label: t.navProfile },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === item.id
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {item.isAI && <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Voice Search Button */}
          <button
            onClick={onStartVoiceCommand}
            className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 transition flex items-center gap-1 text-xs font-semibold"
            title="Voice Search Schemes (Speak to AI)"
          >
            <Mic className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-bounce" />
            <span className="hidden sm:inline">Voice</span>
          </button>

          {/* Kiosk Mode Toggle */}
          <button
            onClick={() => setActiveTab('kiosk')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
              activeTab === 'kiosk'
                ? 'bg-purple-700 text-white shadow'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-700'
            }`}
            title="Switch to CSC Kiosk Mode for Rural Services"
          >
            <Monitor className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span className="hidden sm:inline">{t.navKiosk}</span>
          </button>

          {/* Admin Mode Toggle */}
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
              activeTab === 'admin'
                ? 'bg-indigo-700 text-white shadow'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
            title="Open Government Admin Portal"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="hidden xl:inline">{t.navAdmin}</span>
          </button>

          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Auth Profile Button */}
          {user ? (
            <button
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2 p-1.5 rounded-lg bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-slate-700 hover:bg-blue-100 transition"
            >
              <img
                src={user.avatarUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"}
                alt="Profile Avatar"
                className="w-7 h-7 rounded-full object-cover border border-blue-400"
              />
              <span className="hidden md:inline text-xs font-bold text-slate-800 dark:text-slate-200">
                {user.fullName.split(' ')[0]}
              </span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-3.5 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-sm transition flex items-center gap-1.5"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Login / Guest</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden flex items-center justify-around bg-slate-50 dark:bg-slate-800/90 border-t border-slate-200 dark:border-slate-700 py-1.5 px-2 text-xs">
        {[
          { id: 'home', label: t.navHome },
          { id: 'schemes', label: t.navSchemes },
          { id: 'assistant', label: t.navAssistant },
          { id: 'vault', label: t.navVault },
          { id: 'tracker', label: t.navTracker },
          { id: 'profile', label: t.navProfile },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-2 py-1 rounded text-xs font-medium transition ${
              activeTab === item.id
                ? 'bg-blue-600 text-white font-bold'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
