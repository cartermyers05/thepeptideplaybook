import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Peptide } from "@/hooks/usePeptides";

const researchBadgeColors: Record<string, string> = {
  strong: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  moderate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  limited: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  emerging: "bg-muted text-muted-foreground",
};

const fdaBadgeColors: Record<string, string> = {
  "FDA Approved": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "Category 2": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  "Under Review": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  "Not Regulated": "bg-muted text-muted-foreground",
};

interface PeptideCardProps {
  peptide: Peptide;
}

export function PeptideCard({ peptide }: PeptideCardProps) {
  const [expanded, setExpanded] = useState(false);

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
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {peptide.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              {peptide.primary_use}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
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

        {/* Footer: FDA + Related + Expand */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
          <div className="flex flex-wrap items-center gap-3">
            <Badge
              variant="secondary"
              className={cn("text-xs", fdaBadgeColors[peptide.fda_status])}
            >
              {peptide.fda_status}
            </Badge>
            {peptide.related_peptides?.length > 0 && (
              <span className="text-xs text-muted-foreground">
                Related: {peptide.related_peptides.join(", ")}
              </span>
            )}
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
