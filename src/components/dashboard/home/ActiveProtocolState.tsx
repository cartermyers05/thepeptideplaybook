import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageCircle, Layers, TrendingUp, Flame, CheckCircle2, Clock } from "lucide-react";
import { format } from "date-fns";
import { CompoundCard } from "./CompoundCard";
import { CompletionBanner } from "./CompletionBanner";
import { RestDayCard } from "./RestDayCard";
import { ProgressRing } from "./ProgressRing";
import type { UserProtocol, Compound } from "@/hooks/useUserProtocol";

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const mono = "JetBrains Mono, ui-monospace, monospace";

interface ActiveProtocolStateProps {
  protocol: UserProtocol;
  currentWeek: number | null;
  daysElapsed: number;
  daysRemaining: number;
  totalDays: number;
  progressPercent: number;
  todayCompounds: Compound[];
  todayName: string;
  actionsCompleted: Record<string, boolean>;
  allDone: boolean;
  dayNumber: number;
  compliancePercent: number;
  onToggleAction: (compoundName: string) => void;
  firstName: string;
  currentStreak: number;
  hasCheckedInThisWeek: boolean;
}

export function ActiveProtocolState({
  protocol,
  currentWeek,
  daysRemaining,
  daysElapsed,
  totalDays,
  progressPercent,
  todayCompounds,
  todayName,
  actionsCompleted,
  allDone,
  dayNumber,
  compliancePercent,
  onToggleAction,
  firstName,
  currentStreak,
  hasCheckedInThisWeek,
}: ActiveProtocolStateProps) {
  const navigate = useNavigate();

  const getNextScheduledDay = () => {
    if (!protocol.schedule) return null;
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const todayIdx = new Date().getDay();
    for (let i = 1; i <= 7; i++) {
      const nextIdx = (todayIdx + i) % 7;
      const nextDay = dayNames[nextIdx];
      const scheduled = (protocol.schedule as Record<string, string[]>)[nextDay] || [];
      if (scheduled.length > 0) return nextDay;
    }
    return null;
  };

  const weeklyExpectation = protocol.weekly_expectations?.find(
    (w) => w.week === currentWeek
  );

  return (
    <>
      {/* Section 1: Hero Status Card */}
      <motion.div variants={itemVariants} className="mb-6">
        <div
          className="rounded-[18px] overflow-hidden"
          style={{
            background: "#FFFFFF",
            border: "1px solid #E8EAED",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}
        >
          {/* Gradient top border */}
          <div className="h-[3px]" style={{ background: "linear-gradient(90deg, #F97316, #FB7185, #A78BFA)" }} />

          <div className="p-5">
            {/* Top row: text + ring */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm mb-0.5" style={{ color: "#9CA3AF" }}>
                  Hey {firstName}
                </p>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "linear-gradient(135deg, #F97316, #FB7185)" }} />
                  <h1
                    className="text-xl font-bold truncate"
                    style={{ color: "#0A0A0A", letterSpacing: "-0.02em", fontFamily: "Outfit, sans-serif" }}
                  >
                    {protocol.protocol_name}
                  </h1>
                </div>
                <p className="text-sm" style={{ color: "#4B5563" }}>
                  Week <span style={{ fontFamily: mono, fontWeight: 600 }}>{currentWeek}</span> of{" "}
                  <span style={{ fontFamily: mono, fontWeight: 600 }}>{protocol.cycle_length_weeks}</span>
                </p>
              </div>

              <ProgressRing
                percent={progressPercent}
                size={72}
                strokeWidth={5}
                progressColor="url(#home-ring-grad)"
                className="flex-shrink-0"
              />
              {/* Hidden SVG for gradient def */}
              <svg width="0" height="0" style={{ position: "absolute" }}>
                <defs>
                  <linearGradient id="home-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F97316" />
                    <stop offset="50%" stopColor="#FB7185" />
                    <stop offset="100%" stopColor="#A78BFA" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Stat pills */}
            <div className="flex items-center gap-2 mt-4">
              {[
                { label: "Day", value: dayNumber, color: "#FB7185" },
                { label: "Compliance", value: `${compliancePercent}%`, color: "#22C55E" },
                { label: "Remaining", value: `${daysRemaining}d`, color: "#A78BFA" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex-1 rounded-xl px-3 py-2 text-center"
                  style={{ backgroundColor: "#F9FAFB", border: "1px solid #F3F4F6" }}
                >
                  <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "#9CA3AF" }}>
                    {stat.label}
                  </p>
                  <p className="text-base font-bold" style={{ fontFamily: mono, color: stat.color }}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <div className="w-full h-1 rounded-full overflow-hidden" style={{ backgroundColor: "#E8EAED" }}>
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{ background: "linear-gradient(90deg, #F97316, #FB7185, #A78BFA)", width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Section 2: Today's Actions */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-xl font-bold" style={{ color: "#0A0A0A", fontFamily: "Outfit, sans-serif" }}>Today</h2>
          <span className="text-sm" style={{ color: "#9CA3AF" }}>
            {format(new Date(), "EEE, MMM d")}
          </span>
        </div>

        {todayCompounds.length === 0 ? (
          <RestDayCard nextDay={getNextScheduledDay()} />
        ) : (
          <div className="space-y-2">
            {todayCompounds.map((compound) => (
              <CompoundCard
                key={compound.name}
                compound={compound}
                checked={!!actionsCompleted[compound.name]}
                allDone={allDone}
                onToggle={() => onToggleAction(compound.name)}
              />
            ))}
          </div>
        )}

        <AnimatePresence>
          {allDone && todayCompounds.length > 0 && (
            <CompletionBanner dayNumber={dayNumber} />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Section 3: Weekly Insight */}
      {weeklyExpectation && (
        <motion.div variants={itemVariants} className="mb-8">
          <div
            className="rounded-[14px] overflow-hidden flex"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8EAED" }}
          >
            <div className="w-1 flex-shrink-0" style={{ background: "linear-gradient(180deg, #F97316, #FB7185, #A78BFA)" }} />
            <div className="p-4 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#9CA3AF" }}>
                Week {currentWeek} Insight
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>
                {weeklyExpectation.description}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Section 4: Streak + Check-in */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="grid grid-cols-2 gap-3">
          {/* Streak */}
          <div
            className="rounded-[14px] p-4 flex items-center gap-3"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8EAED" }}
          >
            <div
              className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: currentStreak > 0 ? "rgba(249,115,22,0.1)" : "#F3F4F6" }}
            >
              <Flame className="w-[18px] h-[18px]" style={{ color: currentStreak > 0 ? "#F97316" : "#9CA3AF" }} />
            </div>
            <div>
              <p className="text-lg font-bold" style={{ fontFamily: mono, color: "#0A0A0A" }}>
                {currentStreak}
              </p>
              <p className="text-xs" style={{ color: "#9CA3AF" }}>day streak</p>
            </div>
          </div>

          {/* Check-in nudge */}
          <button
            onClick={() => navigate("/dashboard/progress")}
            className="rounded-[14px] p-4 flex items-center gap-3 text-left transition-all hover:border-[#9CA3AF] active:scale-[0.98]"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8EAED" }}
          >
            <div
              className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: hasCheckedInThisWeek ? "rgba(34,197,94,0.1)" : "rgba(251,113,133,0.1)" }}
            >
              {hasCheckedInThisWeek ? (
                <CheckCircle2 className="w-[18px] h-[18px]" style={{ color: "#22C55E" }} />
              ) : (
                <Clock className="w-[18px] h-[18px]" style={{ color: "#FB7185" }} />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate" style={{ color: "#0A0A0A" }}>
                {hasCheckedInThisWeek ? "Checked in" : "Check-in due"}
              </p>
              <p className="text-xs" style={{ color: "#9CA3AF" }}>
                {hasCheckedInThisWeek ? "This week" : "Weekly"}
              </p>
            </div>
          </button>
        </div>
      </motion.div>

      {/* Section 5: Quick Access */}
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="text-lg font-bold mb-3" style={{ color: "#0A0A0A", fontFamily: "Outfit, sans-serif" }}>Quick Access</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[
            { icon: MessageCircle, label: "AI Coach", desc: "Ask anything", to: "/dashboard/coach", gradient: "linear-gradient(90deg, #F97316, #F59E0B)" },
            { icon: Layers, label: "Protocol", desc: "Compounds & schedule", to: "/dashboard/protocol", gradient: "linear-gradient(90deg, #FB7185, #F43F5E)" },
            { icon: TrendingUp, label: "Progress", desc: "Check-ins & photos", to: "/dashboard/progress", gradient: "linear-gradient(90deg, #A78BFA, #8B5CF6)" },
          ].map((card) => (
            <button
              key={card.label}
              onClick={() => navigate(card.to)}
              className="bg-white rounded-[14px] overflow-hidden text-left transition-all duration-200 hover:border-[#9CA3AF] active:scale-[0.98] group"
              style={{ border: "1px solid #E8EAED" }}
            >
              <div className="h-[2px]" style={{ background: card.gradient }} />
              <div className="flex items-center gap-3 px-4" style={{ height: 68 }}>
                <div
                  className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#F3F4F6" }}
                >
                  <card.icon className="w-[18px] h-[18px]" style={{ color: "#4B5563" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[15px]" style={{ color: "#0A0A0A" }}>{card.label}</p>
                  <p className="text-xs" style={{ color: "#9CA3AF" }}>{card.desc}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 flex-shrink-0 transition-colors duration-200 group-hover:text-[#4B5563]" style={{ color: "#D1D5DB" }} />
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Footer disclaimer */}
      <div className="text-xs text-center py-4" style={{ color: "#9CA3AF", borderTop: "1px solid #E8EAED" }}>
        For educational purposes only. Not medical advice. Always consult a healthcare provider.
      </div>
    </>
  );
}
