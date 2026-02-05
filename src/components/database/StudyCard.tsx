import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  Users, 
  FlaskConical,
  Star,
  Calendar,
  BookOpen
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Study } from "@/hooks/useStudies";

const evidenceBadgeColors: Record<string, string> = {
  high: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  moderate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  low: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  very_low: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

const studyTypeLabels: Record<string, string> = {
  randomized_controlled_trial: "RCT",
  meta_analysis: "Meta-Analysis",
  systematic_review: "Systematic Review",
  cohort: "Cohort Study",
  case_control: "Case-Control",
  animal: "Animal Study",
  in_vitro: "In Vitro",
  case_study: "Case Study",
  observational: "Observational",
};

const speciesIcons: Record<string, JSX.Element> = {
  human: <Users className="w-3 h-3" />,
  mouse: <FlaskConical className="w-3 h-3" />,
  rat: <FlaskConical className="w-3 h-3" />,
};

interface StudyCardProps {
  study: Study;
}

export function StudyCard({ study }: StudyCardProps) {
  const [expanded, setExpanded] = useState(false);

  const hasHumanData = study.species?.includes("human");
  const primarySpecies = study.species?.[0] || "unknown";

  return (
    <motion.div
      className="bg-card border border-border rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => setExpanded(!expanded)}
      initial={false}
    >
      <div className="p-5">
        {/* Header: Title + Badges */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {study.is_landmark_study && (
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 shrink-0" />
              )}
              <h3 className={cn(
                "font-semibold text-foreground leading-tight",
                !expanded && "line-clamp-2"
              )}>
                {study.title}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <span className="font-medium">{study.journal}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{study.publication_year}</span>
              </div>
              {study.sample_size && hasHumanData && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>n={study.sample_size}</span>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <Badge variant="outline" className="text-xs">
              {studyTypeLabels[study.study_type] || study.study_type}
            </Badge>
            {study.evidence_level && (
              <Badge
                variant="secondary"
                className={cn("text-xs", evidenceBadgeColors[study.evidence_level])}
              >
                {study.evidence_level.replace("_", " ")} evidence
              </Badge>
            )}
          </div>
        </div>

        {/* Key Findings */}
        <div className="mb-4">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Key Findings
          </span>
          <p className={cn(
            "text-foreground mt-1 text-sm",
            !expanded && "line-clamp-3"
          )}>
            {study.key_findings}
          </p>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 text-sm"
            >
              {/* Dosing Info */}
              {study.dosing_info && (
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Dosing Information
                  </span>
                  <p className="text-foreground mt-1">{study.dosing_info}</p>
                </div>
              )}

              {/* Safety Findings */}
              {study.safety_findings && (
                <div>
                  <span className="text-xs font-medium text-amber-600 dark:text-amber-500 uppercase tracking-wider">
                    Safety Notes
                  </span>
                  <p className="text-foreground mt-1">{study.safety_findings}</p>
                </div>
              )}

              {/* Abstract */}
              {study.abstract && (
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Abstract
                  </span>
                  <p className="text-foreground mt-1 text-xs leading-relaxed">
                    {study.abstract}
                  </p>
                </div>
              )}

              {/* Authors */}
              {study.authors && study.authors.length > 0 && (
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Authors
                  </span>
                  <p className="text-foreground mt-1 text-xs">
                    {study.authors.join(", ")}
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer: Peptides + Links + Expand */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
          <div className="flex flex-wrap items-center gap-2">
            {/* Species badges */}
            <div className="flex items-center gap-1">
              {speciesIcons[primarySpecies] || <FlaskConical className="w-3 h-3" />}
              <span className="text-xs text-muted-foreground capitalize">
                {primarySpecies}
              </span>
            </div>
            
            {/* Peptide tags */}
            {study.peptide_names.slice(0, 3).map((name) => (
              <Badge key={name} variant="outline" className="text-xs">
                {name}
              </Badge>
            ))}
            {study.peptide_names.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{study.peptide_names.length - 3} more
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* PubMed Link */}
            {study.pubmed_url && (
              <a
                href={study.pubmed_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline flex items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                <BookOpen className="w-3 h-3" />
                PubMed
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {/* Expand button */}
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
      </div>
    </motion.div>
  );
}
