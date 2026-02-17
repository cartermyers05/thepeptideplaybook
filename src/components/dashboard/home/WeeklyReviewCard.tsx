import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, TrendingUp, TrendingDown, Minus, RefreshCw } from "lucide-react";
import { useState } from "react";
import { useWeeklyReview, useGenerateWeeklyReview } from "@/hooks/useWeeklyReview";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const heading = "'Outfit', sans-serif";
const mono = "'JetBrains Mono', ui-monospace, monospace";

const moodConfig = {
  green: { label: "Strong week", color: "#34D399", bg: "rgba(52,211,153,0.08)", border: "rgba(52,211,153,0.2)" },
  yellow: { label: "Steady progress", color: "#FBBF24", bg: "rgba(251,191,36,0.08)", border: "rgba(251,191,36,0.2)" },
  red: { label: "Needs attention", color: "#FB7185", bg: "rgba(251,113,133,0.08)", border: "rgba(251,113,133,0.2)" },
};

const categoryIcons: Record<string, typeof TrendingUp> = {
  compliance: TrendingUp,
  energy: TrendingUp,
  symptoms: TrendingDown,
  weight: Minus,
  progress: TrendingUp,
};

interface Props {
  protocolId: string | undefined;
  weekNumber: number | null;
}

export function WeeklyReviewCard({ protocolId, weekNumber }: Props) {
  const { data: review, isLoading } = useWeeklyReview(protocolId, weekNumber);
  const generateReview = useGenerateWeeklyReview();
  const [isOpen, setIsOpen] = useState(false);

  if (!protocolId || !weekNumber) return null;

  const handleGenerate = () => {
    if (!protocolId || !weekNumber) return;
    generateReview.mutate({ protocol_id: protocolId, week_number: weekNumber });
  };

  // No review yet — show generate CTA
  if (!review && !isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[20px] overflow-hidden bg-white"
        style={{
          boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.04)",
          border: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.12), rgba(167,139,250,0.12))" }}
            >
              <Sparkles className="w-4 h-4" style={{ color: "#F97316" }} />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground" style={{ fontFamily: heading }}>
                Week {weekNumber} Review
              </p>
              <p className="text-[11px] text-muted-foreground">AI-powered analysis of your week</p>
            </div>
          </div>
          <button
            onClick={handleGenerate}
            disabled={generateReview.isPending}
            className="text-xs font-medium px-3 py-1.5 rounded-full transition-all disabled:opacity-50"
            style={{
              background: "linear-gradient(135deg, #F97316, #FB7185)",
              color: "white",
              fontFamily: mono,
            }}
          >
            {generateReview.isPending ? (
              <RefreshCw className="w-3 h-3 animate-spin" />
            ) : (
              "Generate"
            )}
          </button>
        </div>
      </motion.div>
    );
  }

  if (isLoading || !review) return null;

  const mood = moodConfig[review.mood] || moodConfig.yellow;
  const insights = Array.isArray(review.insights) ? review.insights : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[20px] overflow-hidden bg-white"
      style={{
        boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.04)",
        border: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.12), rgba(167,139,250,0.12))" }}
              >
                <Sparkles className="w-4 h-4" style={{ color: "#F97316" }} />
              </div>
              <p className="text-sm font-semibold text-foreground" style={{ fontFamily: heading }}>
                Week {review.week_number} Review
              </p>
            </div>
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{
                background: mood.bg,
                color: mood.color,
                border: `1px solid ${mood.border}`,
                fontFamily: mono,
              }}
            >
              {mood.label}
            </span>
          </div>

          {/* Insights */}
          <div className="space-y-2 mb-3">
            {insights.slice(0, 4).map((insight, i) => {
              const Icon = categoryIcons[insight.category] || TrendingUp;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-2"
                >
                  <Icon className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-muted-foreground" />
                  <p className="text-[13px] text-foreground leading-relaxed">{insight.text}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Recommendation */}
          {review.recommendation && (
            <div
              className="rounded-xl p-3 mb-2"
              style={{
                background: "linear-gradient(135deg, rgba(249,115,22,0.06), rgba(167,139,250,0.06))",
                border: "1px solid rgba(249,115,22,0.1)",
              }}
            >
              <p className="text-[12px] font-semibold text-muted-foreground mb-0.5" style={{ fontFamily: mono }}>
                💡 Recommendation
              </p>
              <p className="text-[13px] text-foreground leading-relaxed">{review.recommendation}</p>
            </div>
          )}

          {/* Deep dive toggle */}
          {review.full_analysis && (
            <CollapsibleTrigger asChild>
              <button className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors mt-1" style={{ fontFamily: mono }}>
                <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                {isOpen ? "Hide" : "Show"} full analysis
              </button>
            </CollapsibleTrigger>
          )}
        </div>

        <AnimatePresence>
          <CollapsibleContent>
            <div className="px-4 pb-4 border-t" style={{ borderColor: "rgba(0,0,0,0.04)" }}>
              <div className="pt-3 text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                {review.full_analysis}
              </div>
            </div>
          </CollapsibleContent>
        </AnimatePresence>
      </Collapsible>
    </motion.div>
  );
}
