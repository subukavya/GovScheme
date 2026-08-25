import React, { useState } from 'react';
import { X, Smartphone, Mail, KeyRound, UserCheck, ShieldCheck, ArrowRight } from 'lucide-react';
import { UserProfile } from '../types';
import { initialUserProfile } from '../data/initialUserData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  onContinueGuest: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onContinueGuest
}) => {
  const [authMethod, setAuthMethod] = useState<'mobile' | 'email'>('mobile');
  const [mobileNumber, setMobileNumber] = useState('9840212345');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('1234');
  const [email, setEmail] = useState('ramesh.kumar@rural.gov.in');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
    }, 800);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(initialUserProfile);
      onClose();
    }, 900);
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(initialUserProfile);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transition-colors">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider">Government Portal Auth</span>
          </div>
          <h2 className="text-2xl font-bold font-heading">Citizen Login / Portal Access</h2>
          <p className="text-xs text-blue-100 mt-1">Access personalized scheme eligibility and document vault.</p>
        </div>

        {/* Mode Switcher */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => { setAuthMethod('mobile'); setOtpSent(false); }}
              className={`py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                authMethod === 'mobile'
                  ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 shadow'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" /> Mobile OTP
            </button>
            <button
              onClick={() => setAuthMethod('email')}
              className={`py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                authMethod === 'email'
                  ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 shadow'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <Mail className="w-3.5 h-3.5" /> Email Login
            </button>
          </div>

          {/* Mobile OTP Form */}
          {authMethod === 'mobile' && (
            <div>
              {!otpSent ? (
                <form onSubmit={handleSendOTP} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Mobile Number (Aadhaar Linked)
                    </label>
                    <div className="flex gap-2">
                      <span className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold flex items-center">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="98402 12345"
                        className="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-blue-600 outline-none"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow transition flex items-center justify-center gap-2"
                  >
                    {loading ? 'Sending OTP...' : 'Send One-Time Password (OTP)'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs text-emerald-800 dark:text-emerald-300">
                    OTP sent to +91 {mobileNumber}. Enter test code <strong>1234</strong> below.
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Enter 4-Digit OTP Code
                    </label>
                    <input
                      type="text"
                      maxLength={4}
                      required
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="1234"
                      className="w-full tracking-widest text-center px-3 py-2 text-base font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition flex items-center justify-center gap-2"
                  >
                    {loading ? 'Verifying OTP...' : 'Verify OTP & Login'}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Email Form */}
          {authMethod === 'email' && (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ramesh.kumar@rural.gov.in"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow transition"
              >
                {loading ? 'Logging in...' : 'Login with Email'}
              </button>
            </form>
          )}

          {/* Guest Mode Divider */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
            <button
              onClick={() => {
                onContinueGuest();
                onClose();
              }}
              className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition flex items-center justify-center gap-1.5"
            >
              <span>Continue in Guest Mode</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <p className="text-[10px] text-slate-400 mt-2">
              Guest users can search schemes, test eligibility, and talk to AI assistant without logging in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
