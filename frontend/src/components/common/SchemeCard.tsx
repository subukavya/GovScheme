import { CheckCircle2, ArrowRight, Building2, Gift } from "lucide-react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import type { Scheme } from "../../types";

interface SchemeCardProps {
  scheme: Scheme;
  onApply: (scheme: Scheme) => void;
  onViewDetails: (scheme: Scheme) => void;
}

export default function SchemeCard({ scheme, onApply, onViewDetails }: SchemeCardProps) {
  return (
    <Card hoverEffect glass padding="lg" className="flex flex-col h-full justify-between group">
      <div>
        {/* Top Badges Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <Badge matchPercentage={scheme.matchPercentage} />
          <Badge label={scheme.category} variant="category" />
        </div>

        {/* Scheme Title & Ministry */}
        <h3 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors mb-2">
          {scheme.name}
        </h3>
        
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-4">
          <Building2 size={14} className="text-blue-500 shrink-0" />
          <span className="truncate">{scheme.department}</span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed mb-5 line-clamp-2">
          {scheme.summary}
        </p>

        {/* Benefits Section */}
        <div className="bg-slate-50/80 rounded-2xl p-4 mb-6 border border-slate-100 space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-2">
            <Gift size={13} className="text-amber-500" />
            Key Beneficiary Financial Benefits
          </div>
          {scheme.benefits.slice(0, 3).map((benefit, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-800">
              <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons Footer */}
      <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
        <Button
          variant="outline"
          size="md"
          onClick={() => onViewDetails(scheme)}
          className="flex-1"
        >
          View Details
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={() => onApply(scheme)}
          rightIcon={<ArrowRight size={16} />}
          className="flex-1"
        >
          Apply Now
        </Button>
      </div>
    </Card>
  );
}
