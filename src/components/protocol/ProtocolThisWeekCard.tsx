import { motion } from "framer-motion";
import { Sparkles, Moon } from "lucide-react";
import { Compound } from "@/hooks/useUserProtocol";

interface Props {
  currentWeek: number;
  weeklyExpectations?: { week: number; description: string }[] | null;
  todayCompounds: Compound[];
  todayName: string;
}

const WEEK_NUDGES: Record<number, string> = {
  1: "Loading phase — your body is adapting to the compounds.",
  2: "Stay consistent. Subtle shifts may start appearing.",
  3: "This is when most users start noticing changes.",
  4: "You're building momentum. Track how you feel.",
  6: "Midway mark — reassess your progress.",
  8: "Deep adaptation phase. Keep going.",
  12: "Final stretch — this is where results compound.",
};

export function ProtocolThisWeekCard({ currentWeek, weeklyExpectations, todayCompounds, todayName }: Props) {
  const weekData = weeklyExpectations?.find((w) => w.week === currentWeek);
  const nudge = WEEK_NUDGES[currentWeek] || `Week ${currentWeek} — stay the course.`;
  const isRestDay = todayCompounds.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="rounded-2xl p-5 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(59,130,246,0.05), rgba(167,139,250,0.06))",
        border: "1px solid #E8EAED",
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-4 h-4" style={{ color: "#A78BFA" }} />
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#A78BFA" }}>
          This Week
        </span>
      </div>

      {weekData ? (
        <p className="text-sm font-medium mb-3" style={{ color: "#0A0A0A" }}>
          {weekData.description}
        </p>
      ) : (
        <p className="text-sm mb-3" style={{ color: "#4B5563" }}>
          {nudge}
        </p>
      )}

      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-medium" style={{ color: "#9CA3AF" }}>
          {todayName}:
        </span>
        {isRestDay ? (
          <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor: "#F3F4F6", color: "#6B7280" }}>
            <Moon className="w-3 h-3" /> Rest Day
          </span>
        ) : (
          todayCompounds.map((c) => (
            <span
              key={c.name}
              className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{ backgroundColor: "rgba(34,197,94,0.08)", color: "#16A34A", border: "1px solid rgba(34,197,94,0.15)" }}
            >
              {c.name}
            </span>
          ))
        )}
      </div>
    </motion.div>
  );
}
