import { motion } from "framer-motion";
import { Lightbulb, RefreshCw, Sparkles } from "lucide-react";
import { useDailyBriefing, useGenerateDailyBriefing } from "@/hooks/useDailyBriefing";
import type { Compound } from "@/hooks/useUserProtocol";

const heading = "'Outfit', sans-serif";
const mono = "'JetBrains Mono', ui-monospace, monospace";

interface Props {
  protocolId: string | undefined;
  todayCompounds: Compound[];
  weekNumber: number | null;
  cycleLengthWeeks: number;
  // Fallback static insight
  fallbackInsight: string;
}

export function DailyBriefingCard({ protocolId, todayCompounds, weekNumber, cycleLengthWeeks, fallbackInsight }: Props) {
  const { data: briefing, isLoading } = useDailyBriefing();
  const generate = useGenerateDailyBriefing();

  const handleGenerate = () => {
    if (!protocolId || !weekNumber) return;
    generate.mutate({
      protocol_id: protocolId,
      today_compounds: todayCompounds.map(c => ({ name: c.name })),
      week_number: weekNumber,
      cycle_length_weeks: cycleLengthWeeks,
    });
  };

  const content = briefing?.content || fallbackInsight;
  const tips = briefing?.compound_tips || [];
  const highlight = briefing?.data_highlight;
  const hasAIBriefing = !!briefing;

  return (
    <div
      className="rounded-[20px] overflow-hidden relative flex flex-col"
      style={{
        background: "linear-gradient(135deg, rgba(249,115,22,0.08), rgba(251,113,133,0.06), rgba(167,139,250,0.08))",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.6)",
        boxShadow: "0 1px 4px rgba(0,0,0,0.02)",
      }}
    >
      {/* Shimmer */}
      {!hasAIBriefing && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
            width: "50%",
          }}
        />
      )}

      <div className="p-4 flex items-start gap-3">
        <motion.div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{
            background: hasAIBriefing
              ? "linear-gradient(135deg, rgba(249,115,22,0.2), rgba(167,139,250,0.2))"
              : "linear-gradient(135deg, rgba(249,115,22,0.15), rgba(167,139,250,0.15))",
            boxShadow: "0 0 20px rgba(249,115,22,0.1)",
          }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {hasAIBriefing ? (
            <Sparkles className="w-5 h-5" style={{ color: "#F97316" }} />
          ) : (
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
              <path d="M16 2L28 9V23L16 30L4 23V9L16 2Z" stroke="url(#insightHex2)" strokeWidth="2" fill="none" />
              <defs>
                <linearGradient id="insightHex2" x1="0" y1="0" x2="32" y2="32">
                  <stop offset="0%" stopColor="#F97316" />
                  <stop offset="100%" stopColor="#A78BFA" />
                </linearGradient>
              </defs>
            </svg>
          )}
        </motion.div>

        <div className="flex-1 min-w-0">
          <p className="text-[15px] text-foreground leading-relaxed font-medium" style={{ fontFamily: heading }}>
            {generate.isPending ? "Generating your daily briefing..." : content}
          </p>

          {/* Compound tips */}
          {tips.length > 0 && (
            <div className="mt-2 space-y-1">
              {tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <Lightbulb className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: "#FBBF24" }} />
                  <p className="text-[12px] text-muted-foreground">
                    <span className="font-medium text-foreground">{tip.compound}:</span> {tip.tip}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Data highlight */}
          {highlight && (
            <p className="text-[11px] mt-2 text-muted-foreground" style={{ fontFamily: mono }}>
              📊 {highlight}
            </p>
          )}
        </div>
      </div>

      {/* Generate button when no AI briefing exists */}
      {!hasAIBriefing && !isLoading && protocolId && (
        <div className="px-4 pb-3">
          <button
            onClick={handleGenerate}
            disabled={generate.isPending}
            className="text-[11px] font-medium flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
            style={{ fontFamily: mono }}
          >
            {generate.isPending ? (
              <RefreshCw className="w-3 h-3 animate-spin" />
            ) : (
              <Sparkles className="w-3 h-3" />
            )}
            Get AI-powered daily briefing
          </button>
        </div>
      )}
    </div>
  );
}
