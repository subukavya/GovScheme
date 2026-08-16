import { CheckCircle2, ArrowRight } from "lucide-react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import type { Scheme } from "../../types";

export interface SchemeCardProps {
  scheme: Scheme;
  onApply: (scheme: Scheme) => void;
  onViewDetails: (scheme: Scheme) => void;
}

export default function SchemeCard({ scheme, onApply, onViewDetails }: SchemeCardProps) {
  const oneLineBenefit = scheme.benefits[0] || scheme.summary;

  return (
    <Card
      hoverEffect
      padding="lg"
      className="flex flex-col h-full justify-between group bg-white border border-[#E2E8F0] shadow-soft rounded-[20px]"
    >
      <div className="space-y-4">
        {/* Top Badges: Eligibility Match & Category */}
        <div className="flex items-center justify-between gap-3">
          <Badge matchPercentage={scheme.matchPercentage} />
          <Badge label={scheme.category} variant="category" />
        </div>

        {/* Scheme Name */}
        <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] leading-snug group-hover:text-[#2563EB] transition-colors">
          {scheme.name}
        </h3>

        {/* One-Line Benefit */}
        <div className="bg-[#F8FAFC] rounded-[14px] p-3.5 border border-[#E2E8F0] flex items-start gap-2.5">
          <CheckCircle2 size={18} className="text-[#10B981] shrink-0 mt-0.5" />
          <p className="text-xs font-semibold text-[#0F172A] leading-relaxed line-clamp-2">
            {oneLineBenefit}
          </p>
        </div>
      </div>

      {/* Action Button: View Details */}
      <div className="pt-4 border-t border-[#E2E8F0] mt-6">
        <Button
          variant="outline"
          size="md"
          fullWidth
          onClick={() => (onViewDetails ? onViewDetails(scheme) : onApply(scheme))}
          rightIcon={<ArrowRight size={16} />}
        >
          View Details
        </Button>
      </div>
    </Card>
  );
}
