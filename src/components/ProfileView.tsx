import React, { useState } from 'react';
import { 
  UserCheck, 
  ShieldCheck, 
  Award, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Bookmark, 
  Edit3, 
  Save, 
  ScanLine, 
  MapPin, 
  Briefcase, 
  IndianRupee, 
  GraduationCap, 
  Users, 
  HeartHandshake, 
  TrendingUp,
  Sparkles,
  Zap,
  Plus
} from 'lucide-react';
import { UserProfile, CategorySocial, TargetGender } from '../types';

interface ProfileViewProps {
  user: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onNavigateTab: (tab: string) => void;
  eligibleSchemesCount: number;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  onUpdateProfile,
  onNavigateTab,
  eligibleSchemesCount
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(user);

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <ShieldCheck className="w-64 h-64 text-amber-400" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            {/* Profile Avatar with Verification Badge */}
            <div className="relative">
              <img
                src={user.avatarUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"}
                alt={user.fullName}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-amber-400 shadow-lg"
              />
              {user.verificationBadge && (
                <span className="absolute bottom-1 right-1 bg-emerald-500 text-white p-1.5 rounded-full shadow-md" title="Govt Aadhaar e-KYC Verified">
                  <ShieldCheck className="w-5 h-5" />
                </span>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-black font-heading tracking-tight">{user.fullName}</h1>
                <span className="bg-amber-400 text-slate-950 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase">
                  Verified Citizen
                </span>
              </div>
              <p className="text-xs text-blue-200 flex items-center justify-center sm:justify-start gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{user.district}, {user.state} • {user.mobile}</span>
              </p>
              <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-2 text-xs">
                <span className="bg-blue-800/80 px-2.5 py-1 rounded-md text-blue-100 font-semibold border border-blue-600/40">
                  {user.occupation}
                </span>
                <span className="bg-blue-800/80 px-2.5 py-1 rounded-md text-blue-100 font-semibold border border-blue-600/40">
                  Category: {user.category}
                </span>
              </div>
            </div>
          </div>

          {/* Right Action & Profile Completion Score */}
          <div className="flex flex-col items-center sm:items-end gap-3">
            <div className="bg-blue-950/80 border border-blue-700/60 p-4 rounded-2xl flex items-center gap-4 text-center sm:text-right">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-blue-300 font-bold block">Profile Completion</span>
                <span className="text-2xl font-black text-amber-400 font-heading">{user.profileCompletionScore}%</span>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-amber-400 border-t-blue-500 flex items-center justify-center font-bold text-xs">
                {user.profileCompletionScore}%
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition flex items-center gap-1.5"
              >
                <Edit3 className="w-4 h-4" />
                <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
              </button>
              <button
                onClick={() => onNavigateTab('vault')}
                className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-bold text-xs border border-blue-500/40 transition flex items-center gap-1.5"
              >
                <ScanLine className="w-4 h-4 text-amber-300" />
                <span>Scan OCR Document</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="gov-card p-4 flex flex-col justify-between space-y-2 border-l-4 border-l-emerald-500">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Eligible Schemes</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-heading">{eligibleSchemesCount}</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
        </div>

        <div className="gov-card p-4 flex flex-col justify-between space-y-2 border-l-4 border-l-blue-500">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Applied Schemes</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-heading">2</span>
            <FileText className="w-5 h-5 text-blue-500" />
          </div>
        </div>

        <div className="gov-card p-4 flex flex-col justify-between space-y-2 border-l-4 border-l-amber-500">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Under Review</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-heading">1</span>
            <Clock className="w-5 h-5 text-amber-500" />
          </div>
        </div>

        <div className="gov-card p-4 flex flex-col justify-between space-y-2 border-l-4 border-l-purple-500">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Saved Schemes</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-heading">{user.savedSchemeIds.length}</span>
            <Bookmark className="w-5 h-5 text-purple-500" />
          </div>
        </div>

        <div className="gov-card p-4 flex flex-col justify-between space-y-2 border-l-4 border-l-indigo-500 col-span-2 md:col-span-1">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Vault Documents</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-heading">{user.documents.length}</span>
            <ShieldCheck className="w-5 h-5 text-indigo-500" />
          </div>
        </div>
      </div>

      {/* Main Form & Detail View */}
      <div className="gov-card p-6 sm:p-8 space-y-6">
        <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
              Citizen Eligibility Profile Details
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Information used by the Rule Engine to determine legal welfare eligibility.
            </p>
          </div>
          {isEditing && (
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" /> Save Profile
            </button>
          )}
        </div>

        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          {/* Full Name */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-600 disabled:opacity-80"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Age (Years)</label>
            <input
              type="number"
              disabled={!isEditing}
              value={formData.age}
              onChange={(e) => handleInputChange('age', Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-600 disabled:opacity-80"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Gender</label>
            <select
              disabled={!isEditing}
              value={formData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value as TargetGender)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-600 disabled:opacity-80"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Transgender">Transgender</option>
            </select>
          </div>

          {/* Occupation */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Primary Occupation</label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.occupation}
              onChange={(e) => handleInputChange('occupation', e.target.value)}
              placeholder="e.g. Farmer, Artisan, Daily Wager"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-600 disabled:opacity-80"
            />
          </div>

          {/* Annual Income */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Annual Household Income (₹)</label>
            <input
              type="number"
              disabled={!isEditing}
              value={formData.annualIncome}
              onChange={(e) => handleInputChange('annualIncome', Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-600 disabled:opacity-80"
            />
          </div>

          {/* State */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">State of Residence</label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-600 disabled:opacity-80"
            />
          </div>

          {/* District */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">District</label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.district}
              onChange={(e) => handleInputChange('district', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-600 disabled:opacity-80"
            />
          </div>

          {/* Social Category */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Social Category</label>
            <select
              disabled={!isEditing}
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value as CategorySocial)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-600 disabled:opacity-80"
            >
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="EWS">EWS</option>
            </select>
          </div>

          {/* Land Holding */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Land Holding (Acres)</label>
            <input
              type="number"
              step="0.1"
              disabled={!isEditing}
              value={formData.landHoldingAcres}
              onChange={(e) => handleInputChange('landHoldingAcres', Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-600 disabled:opacity-80"
            />
          </div>

          {/* Education Level */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Education Qualification</label>
            <input
              type="text"
              disabled={!isEditing}
              value={formData.educationLevel}
              onChange={(e) => handleInputChange('educationLevel', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-600 disabled:opacity-80"
            />
          </div>

          {/* Family Count */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Family Members Count</label>
            <input
              type="number"
              disabled={!isEditing}
              value={formData.familyMembersCount}
              onChange={(e) => handleInputChange('familyMembersCount', Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-600 disabled:opacity-80"
            />
          </div>

          {/* Disability Switch */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Person with Disability (Divyangjan)</label>
            <div className="flex items-center gap-4 mt-2">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  disabled={!isEditing}
                  name="disability"
                  checked={formData.hasDisability === true}
                  onChange={() => handleInputChange('hasDisability', true)}
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  disabled={!isEditing}
                  name="disability"
                  checked={formData.hasDisability === false}
                  onChange={() => handleInputChange('hasDisability', false)}
                />
                <span>No</span>
              </label>
            </div>
          </div>
        </form>
      </div>

      {/* Uploaded Documents Vault Quick Access */}
      <div className="gov-card p-6 sm:p-8 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
            Verified Document Vault Status
          </h3>
          <button
            onClick={() => onNavigateTab('vault')}
            className="text-xs font-bold text-blue-700 dark:text-blue-400 hover:underline"
          >
            Manage All Documents ({user.documents.length}) →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {user.documents.map(doc => (
            <div key={doc.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">{doc.type}</span>
                <span className="text-slate-500 font-mono">{doc.docNumber}</span>
              </div>
              <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-0.5 rounded text-[10px]">
                ✓ {doc.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
