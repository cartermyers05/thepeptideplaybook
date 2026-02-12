import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, AlertTriangle, BookOpen, Users, Star, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export interface Peptide {
  id: string;
  name: string;
  slug: string;
  category: string;
  primary_use: string;
  research_status: "strong" | "moderate" | "limited" | "emerging";
  fda_status: "FDA Approved" | "Category 2" | "Under Review" | "Not Regulated";
  mechanism: string;
  studies: string;
  safety: string;
  related_peptides: string[];
  total_study_count?: number;
  human_study_count?: number;
  created_at: string;
  updated_at: string;
}

const researchBadgeColors: Record<string, string> = {
  strong: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200",
  moderate: "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200",
  limited: "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200",
  emerging: "bg-muted text-muted-foreground",
};

const fdaBadgeColors: Record<string, string> = {
  "FDA Approved": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200",
  "Category 2": "bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-200",
  "Under Review": "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200",
  "Not Regulated": "bg-muted text-muted-foreground",
};

const researchToStars: Record<string, number> = {
  strong: 5,
  moderate: 3,
  limited: 2,
  emerging: 1,
};

function StarRating({ count }: { count: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i < count ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
        />
      ))}
    </span>
  );
}

interface PeptideCardProps {
  peptide: Peptide;
  isMatch?: boolean;
  isSelectedForCompare?: boolean;
  onToggleCompare?: (id: string) => void;
}

export function PeptideCard({ peptide, isMatch, isSelectedForCompare, onToggleCompare }: PeptideCardProps) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      className="bg-card border border-border rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => setExpanded(!expanded)}
      initial={false}
      animate={{ height: "auto" }}
    >
      <div className="p-5">
        {/* Header: Name + Badges */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-semibold text-foreground">
              {peptide.name}
            </h3>
            {isMatch && (
              <Badge className="bg-primary text-primary-foreground text-xs">
                Your Match
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {onToggleCompare && (
              <label
                className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                <Checkbox
                  checked={isSelectedForCompare}
                  onCheckedChange={() => onToggleCompare(peptide.id)}
                />
                Compare
              </label>
            )}
            <Badge variant="outline" className="text-xs">
              {peptide.category}
            </Badge>
            <Badge
              variant="secondary"
              className={cn("text-xs", researchBadgeColors[peptide.research_status])}
            >
              {peptide.research_status}
            </Badge>
          </div>
        </div>

        {/* Quick stats row */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <StarRating count={researchToStars[peptide.research_status] || 1} />
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-sm text-muted-foreground">{peptide.primary_use}</span>
        </div>

        {/* 3 Info Sections */}
        <div className="space-y-4 text-sm">
          {/* Mechanism */}
          <div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              How it works
            </span>
            <p
              className={cn(
                "text-foreground mt-1",
                !expanded && "line-clamp-2"
              )}
            >
              {peptide.mechanism}
            </p>
          </div>

          {/* Studies */}
          <div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              What research shows
            </span>
            <p
              className={cn(
                "text-foreground mt-1",
                !expanded && "line-clamp-2"
              )}
            >
              {peptide.studies}
            </p>
          </div>

          {/* Safety */}
          <div>
            <span className="text-xs font-medium text-amber-600 dark:text-amber-500 uppercase tracking-wider flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              Key safety note
            </span>
            <p
              className={cn(
                "text-foreground mt-1",
                !expanded && "line-clamp-2"
              )}
            >
              {peptide.safety}
            </p>
          </div>
        </div>

        {/* Footer: FDA + Study Counts + Related + Expand */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
          <div className="flex flex-wrap items-center gap-3">
            <Badge
              variant="secondary"
              className={cn("text-xs", fdaBadgeColors[peptide.fda_status])}
            >
              {peptide.fda_status}
            </Badge>
            
            {/* Study counts */}
            {(peptide.total_study_count ?? 0) > 0 && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  <span>{peptide.total_study_count} studies</span>
                </div>
                {(peptide.human_study_count ?? 0) > 0 && (
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{peptide.human_study_count} human</span>
                  </div>
                )}
              </div>
            )}
            
            {peptide.related_peptides?.length > 0 && (
              <span className="text-xs text-muted-foreground">
                Related: {peptide.related_peptides.join(", ")}
              </span>
            )}

            <button
              className="text-xs text-primary flex items-center gap-1 hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/dashboard/plan");
              }}
            >
              View Full Protocol <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <button
            className="text-xs text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
          >
            {expanded ? "Show less" : "View full"}
            {expanded ? (
              <ChevronUp className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
