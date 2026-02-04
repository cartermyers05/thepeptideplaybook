import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ExtractedValues } from "@/hooks/useQuizChat";

interface QuizProgressSidebarProps {
  extractedValues: ExtractedValues;
  currentStep: number;
  getGoalLabel: (goal: string | null) => string | null;
  getExperienceLabel: (exp: string | null) => string | null;
  getConcernLabel: (concern: string | null) => string | null;
  getTimelineLabel: (timeline: string | null) => string | null;
}

export function QuizProgressSidebar({
  extractedValues,
  currentStep,
  getGoalLabel,
  getExperienceLabel,
  getConcernLabel,
  getTimelineLabel
}: QuizProgressSidebarProps) {
  const items = [
    { key: 'goal', label: 'Goal', value: getGoalLabel(extractedValues.goal) },
    { key: 'experience', label: 'Experience', value: getExperienceLabel(extractedValues.experience) },
    { key: 'concern', label: 'Concern', value: getConcernLabel(extractedValues.concern) },
    { key: 'timeline', label: 'Timeline', value: getTimelineLabel(extractedValues.timeline) },
  ];

  return (
    <div className="bg-card border rounded-xl p-4 shadow-sm">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Building Your Course</h3>
      <div className="space-y-3">
        {items.map((item, index) => {
          const isComplete = item.value !== null;
          const isCurrent = index === currentStep && !isComplete;
          
          return (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "flex items-center gap-3 text-sm",
                isComplete ? "text-foreground" : "text-muted-foreground"
              )}
            >
              <div className={cn(
                "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
                isComplete 
                  ? "bg-primary text-primary-foreground" 
                  : isCurrent 
                    ? "bg-primary/20 text-primary"
                    : "bg-muted"
              )}>
                {isComplete ? (
                  <Check className="w-3 h-3" />
                ) : isCurrent ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-muted-foreground">{item.label}: </span>
                {isComplete ? (
                  <span className="font-medium">{item.value}</span>
                ) : (
                  <span className="text-muted-foreground/50">...</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
