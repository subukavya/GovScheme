import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Sparkles,
  Building2,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Bookmark,
  ChevronRight,
  ExternalLink,
  SlidersHorizontal,
  RefreshCw,
  Info,
  ShieldAlert
} from 'lucide-react';
import { Scheme, UserProfile, RuleEvaluationResult, MLRecommendationResult, CombinedSchemeAnalysis, LanguageCode } from '../types';
import { evaluateSchemeEligibility } from '../engine/ruleEngine';
import { computeMLRecommendation } from '../engine/mlEngine';
import { translations } from '../data/translations';

interface SchemeDiscoveryProps {
  schemes: Scheme[];
  user: UserProfile;
  currentLang: LanguageCode;
  onSelectScheme: (analysis: CombinedSchemeAnalysis) => void;
  onToggleBookmark: (schemeId: string) => void;
  isBookmarked: (schemeId: string) => boolean;
}

export const SchemeDiscovery: React.FC<SchemeDiscoveryProps> = ({
  schemes,
  user,
  currentLang,
  onSelectScheme,
  onToggleBookmark,
  isBookmarked
}) => {
  const t = translations[currentLang] || translations['en'];

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryTab, setActiveCategoryTab] = useState<'Recommended' | 'All' | 'Central' | 'State' | 'Trending' | 'Saved'>('Recommended');
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>('All');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [selectedOccupationFilter, setSelectedOccupationFilter] = useState<string>('All');
  const [selectedIncomeFilter, setSelectedIncomeFilter] = useState<string>('All');

  // Compute Rule + ML analysis for all schemes
  const analyzedSchemes: CombinedSchemeAnalysis[] = useMemo(() => {
    return schemes.map(scheme => {
      const ruleResult = evaluateSchemeEligibility(user, scheme);
      const mlResult = computeMLRecommendation(user, scheme, ruleResult, schemes);
      return {
        scheme,
        ruleResult,
        mlResult
      };
    });
  }, [schemes, user]);

  // Unique Filter Options
  const statesList = useMemo(() => {
    const set = new Set<string>();
    schemes.forEach(s => {
      if (s.state !== 'Central') set.add(s.state);
    });
    return ['All', 'Central', ...Array.from(set)];
  }, [schemes]);

  const categoriesList = useMemo(() => {
    const set = new Set<string>();
    schemes.forEach(s => set.add(s.category));
    return ['All', ...Array.from(set)];
  }, [schemes]);

  // Filtered & ML Ranked List
  const filteredSchemes = useMemo(() => {
    return analyzedSchemes
      .filter(item => {
        const { scheme, ruleResult } = item;

        // Search Filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = scheme.name.toLowerCase().includes(q);
          const matchesDesc = scheme.shortDescription.toLowerCase().includes(q);
          const matchesDept = scheme.department.toLowerCase().includes(q);
          const matchesTag = scheme.tags.some(t => t.toLowerCase().includes(q));
          if (!matchesName && !matchesDesc && !matchesDept && !matchesTag) return false;
        }

        // Tab Filter
        if (activeCategoryTab === 'Recommended' && ruleResult.status === 'Not Eligible') return false;
        if (activeCategoryTab === 'Central' && scheme.state !== 'Central') return false;
        if (activeCategoryTab === 'State' && scheme.state === 'Central') return false;
        if (activeCategoryTab === 'Trending' && (scheme.popularityScore ?? 0) < 90) return false;
        if (activeCategoryTab === 'Saved' && !isBookmarked(scheme.id)) return false;

        // Filter Dropdowns
        if (selectedStateFilter !== 'All') {
          if (selectedStateFilter === 'Central' && scheme.state !== 'Central') return false;
          if (selectedStateFilter !== 'Central' && scheme.state !== selectedStateFilter && scheme.state !== 'Central') return false;
        }
        if (selectedCategoryFilter !== 'All' && scheme.category !== selectedCategoryFilter) return false;
        if (selectedOccupationFilter !== 'All') {
          const occs = scheme.eligibilityRules.allowedOccupations || [];
          if (!occs.some(o => o.toLowerCase().includes(selectedOccupationFilter.toLowerCase()))) return false;
        }

        // Income Range Filter
        if (selectedIncomeFilter !== 'All') {
          const maxInc = scheme.eligibilityRules.maxAnnualIncome;
          if (selectedIncomeFilter === 'bpl' && (!maxInc || maxInc > 120000)) return false;
          if (selectedIncomeFilter === '2.5l' && (!maxInc || maxInc > 250000)) return false;
          if (selectedIncomeFilter === '5l' && (!maxInc || maxInc > 500000)) return false;
        }

        return true;
      })
      .sort((a, b) => b.mlResult.confidenceScore - a.mlResult.confidenceScore);
  }, [analyzedSchemes, searchQuery, activeCategoryTab, selectedStateFilter, selectedCategoryFilter, selectedOccupationFilter, selectedIncomeFilter, isBookmarked]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 dark:text-blue-400 mb-1">
            <Building2 className="w-4 h-4 text-amber-500" />
            <span>NATIONAL WELFARE SCHEME DISCOVERY PORTAL</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
            {t.allSchemes}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time hybrid Rule + ML eligibility evaluation tailored for {user.fullName} ({user.occupation}, {user.state}).
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-blue-600 outline-none shadow-sm"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600">
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {[
          { id: 'Recommended', label: `✨ ${t.recommendedSchemes}`, count: analyzedSchemes.filter(a => a.ruleResult.status !== 'Not Eligible').length },
          { id: 'All', label: t.allSchemes, count: schemes.length },
          { id: 'Central', label: t.centralSchemes, count: schemes.filter(s => s.state === 'Central').length },
          { id: 'State', label: t.stateSchemes, count: schemes.filter(s => s.state !== 'Central').length },
          { id: 'Trending', label: `🔥 ${t.trending}`, count: schemes.filter(s => s.popularityScore >= 90).length },
          { id: 'Saved', label: `🔖 Saved`, count: user.savedSchemeIds.length },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveCategoryTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${activeCategoryTab === tab.id
              ? 'bg-blue-700 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
          >
            <span>{tab.label}</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeCategoryTab === tab.id ? 'bg-blue-900 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Dropdown Filters */}
      <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 flex flex-wrap items-center gap-4 text-xs">
        <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
          <SlidersHorizontal className="w-4 h-4 text-blue-600" /> Filters:
        </span>

        {/* State Filter */}
        <select
          value={selectedStateFilter}
          onChange={(e) => setSelectedStateFilter(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium focus:ring-2 focus:ring-blue-600 outline-none"
        >
          <option value="All">State: All</option>
          {statesList.filter(s => s !== 'All').map(st => (
            <option key={st} value={st}>{st}</option>
          ))}
        </select>

        {/* Category Filter */}
        <select
          value={selectedCategoryFilter}
          onChange={(e) => setSelectedCategoryFilter(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium focus:ring-2 focus:ring-blue-600 outline-none"
        >
          <option value="All">Category: All</option>
          {categoriesList.filter(c => c !== 'All').map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Income Range Filter */}
        <select
          value={selectedIncomeFilter}
          onChange={(e) => setSelectedIncomeFilter(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium focus:ring-2 focus:ring-blue-600 outline-none"
        >
          <option value="All">Income: Any</option>
          <option value="bpl">BPL (below ₹1.2L)</option>
          <option value="2.5l">Below ₹2.5 Lakh</option>
          <option value="5l">Below ₹5 Lakh</option>
        </select>

        {/* Reset Filters */}
        {(selectedStateFilter !== 'All' || selectedCategoryFilter !== 'All' || selectedIncomeFilter !== 'All' || searchQuery !== '') && (
          <button
            onClick={() => {
              setSelectedStateFilter('All');
              setSelectedCategoryFilter('All');
              setSelectedIncomeFilter('All');
              setSearchQuery('');
            }}
            className="text-red-600 dark:text-red-400 font-bold hover:underline ml-auto flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" /> Reset Filters
          </button>
        )}
      </div>

      {/* Scheme Cards Grid */}
      {filteredSchemes.length === 0 ? (
        <div className="gov-card p-12 text-center space-y-4">
          <ShieldAlert className="w-12 h-12 text-amber-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-white font-heading">
            No Government Schemes Found
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Complete your profile or adjust your filters to view personalized welfare recommendations.
          </p>
          <button
            onClick={() => {
              setSelectedStateFilter('All');
              setSelectedCategoryFilter('All');
              setActiveCategoryTab('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-blue-700 text-white font-bold text-xs shadow"
          >
            Browse All Schemes
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map(analysis => {
            const { scheme, ruleResult, mlResult } = analysis;
            const bookmarked = isBookmarked(scheme.id);

            return (
              <div
                key={scheme.id}
                className="gov-card p-6 flex flex-col justify-between space-y-4 hover:border-blue-500 transition duration-200 relative group"
              >
                <div className="space-y-3">
                  {/* Top Badges */}
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                        {scheme.state === 'Central' ? 'Central' : scheme.state}
                      </span>

                      {/* Rule Engine Status Badge */}
                      {ruleResult.status === 'Eligible' && (
                        <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {t.eligibleStatus}
                        </span>
                      )}
                      {ruleResult.status === 'Conditionally Eligible' && (
                        <span className="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 text-amber-600" /> {t.conditionalStatus}
                        </span>
                      )}
                      {ruleResult.status === 'Not Eligible' && (
                        <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <XCircle className="w-3 h-3 text-slate-400" /> {t.notEligibleStatus}
                        </span>
                      )}
                    </div>

                    {/* Bookmark Icon */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(scheme.id);
                      }}
                      className="p-1 rounded-lg text-slate-400 hover:text-amber-500 transition"
                      title={bookmarked ? 'Remove Bookmark' : 'Save Scheme'}
                    >
                      <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
                    </button>
                  </div>

                  {/* ML Match Confidence Score - Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">AI Match Confidence</span>
                      <span className={`font-extrabold text-sm font-heading ${mlResult.confidenceScore >= 75 ? 'text-emerald-600 dark:text-emerald-400' :
                          mlResult.confidenceScore >= 50 ? 'text-amber-600 dark:text-amber-400' :
                            'text-slate-500 dark:text-slate-400'
                        }`}>{mlResult.confidenceScore}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${mlResult.confidenceScore >= 75 ? 'bg-emerald-500' :
                            mlResult.confidenceScore >= 50 ? 'bg-amber-500' :
                              'bg-slate-400'
                          }`}
                        style={{ width: `${mlResult.confidenceScore}%` }}
                      />
                    </div>
                  </div>

                  {/* Scheme Name */}
                  <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 font-heading group-hover:text-blue-600 transition">
                    {scheme.name}
                  </h3>

                  {/* Financial Benefit Amount */}
                  {scheme.financialBenefitAmount && (
                    <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      Benefit: Up to ₹{scheme.financialBenefitAmount.toLocaleString('en-IN')}/year
                    </div>
                  )}

                  {/* Short Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {scheme.shortDescription}
                  </p>

                  {/* Why Eligible / Explanation Preview */}
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block mb-0.5">
                      {t.whyEligible}:
                    </span>
                    <p className="line-clamp-2">{mlResult.matchReason}</p>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectScheme(analysis)}
                    className="w-full py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow transition flex items-center justify-center gap-1.5"
                  >
                    <span>View Scheme Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
