import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageSquare, Layers, BarChart3, Flame, CheckCircle2, Clock } from "lucide-react";
import { format } from "date-fns";
import { CompoundCard } from "./CompoundCard";
import { CompletionBanner } from "./CompletionBanner";
import { RestDayCard } from "./RestDayCard";
import { ProgressRing } from "./ProgressRing";
import { WeekCalendarStrip } from "./WeekCalendarStrip";
import { MilestonesTimeline } from "./MilestonesTimeline";
import type { UserProtocol, Compound } from "@/hooks/useUserProtocol";

const itemVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5 } },
};

const mono = "'JetBrains Mono', ui-monospace, monospace";
const heading = "'Outfit', sans-serif";

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
  totalDays,
  progressPercent,
  todayCompounds,
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

  return (
    <>
      {/* ─── HERO STATUS CARD ─── */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="rounded-[24px] overflow-hidden relative bg-white border border-border"
          style={{ borderTop: "3px solid transparent", borderImage: "linear-gradient(90deg, #F97316, #FB7185, #A78BFA) 1", borderImageSlice: "1 1 0 1" }}
        >
          <div className="p-6 md:p-7">
            {/* Mobile: ring centered above */}
            <div className="flex flex-col items-center md:hidden mb-4">
              <ProgressRing percent={progressPercent} size={88} strokeWidth={6} />
            </div>

            {/* Desktop: two columns */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium mb-1 text-muted-foreground">
                  Hey {firstName}
                </p>
                <h1
                  className="text-[24px] md:text-[26px] font-extrabold truncate text-foreground"
                  style={{ letterSpacing: "-0.03em", fontFamily: heading }}
                >
                  {protocol.protocol_name}
                </h1>

                {/* Stat pills */}
                <div className="flex items-center gap-2 mt-3.5 flex-wrap">
                  {[
                    { dot: "#F97316", label: `Week ${currentWeek} of ${protocol.cycle_length_weeks}` },
                    { dot: "#FB7185", label: `Day ${dayNumber}` },
                    ...(compliancePercent > 0
                      ? [{ dot: "#34D399", label: `${compliancePercent}%` }]
                      : []),
                  ].map((pill, i) => (
                    <div
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted border border-border"
                    >
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: pill.dot }} />
                      <span className="text-xs font-medium text-muted-foreground" style={{ fontFamily: mono }}>
                        {pill.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop ring */}
              <div className="hidden md:block flex-shrink-0">
                <ProgressRing percent={progressPercent} size={100} strokeWidth={6} />
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar below hero card */}
        <div className="mt-4">
          <div className="w-full h-1 rounded-full overflow-hidden bg-muted">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #F97316, #FB7185, #A78BFA)" }}
              initial={{ width: "0%" }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
            />
          </div>
          <p className="text-right mt-1.5 text-[11px] text-muted-foreground" style={{ fontFamily: mono }}>
            {daysRemaining} days remaining
          </p>
        </div>
      </motion.div>

      {/* ─── WEEK CALENDAR ─── */}
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="text-xs font-semibold uppercase tracking-wider mb-3 text-muted-foreground" style={{ fontFamily: mono, letterSpacing: "0.08em" }}>
          This Week
        </h2>
        <div className="rounded-[16px] p-4 bg-white border border-border">
          <WeekCalendarStrip
            currentDay={dayNumber}
            courseStartDate={protocol.start_date}
            schedule={protocol.schedule as Record<string, string[]>}
          />
        </div>
      </motion.div>

      {/* ─── TODAY'S STACK ─── */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: heading, letterSpacing: "-0.03em" }}>
            Today's Stack
          </h2>
          <span className="text-[13px] text-muted-foreground" style={{ fontFamily: mono }}>
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

      {/* ─── JOURNEY TIMELINE ─── */}
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="text-xs font-semibold uppercase tracking-wider mb-3 text-muted-foreground" style={{ fontFamily: mono, letterSpacing: "0.08em" }}>
          Your Journey
        </h2>
        <div className="rounded-[16px] p-5 bg-white border border-border">
          <MilestonesTimeline
            currentDay={dayNumber}
            courseStartDate={protocol.start_date}
            totalDays={totalDays}
          />
        </div>
      </motion.div>

      {/* ─── STREAK + CHECK-IN ─── */}
      {(currentStreak >= 2 || true) && (
        <motion.div variants={itemVariants} className="mb-8">
          <div className="grid grid-cols-2 gap-3">
            {/* Streak */}
            <div className="rounded-[14px] p-4 flex items-center gap-3 bg-white border border-border">
              <div
                className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: currentStreak > 0 ? "rgba(249,115,22,0.08)" : "hsl(0 0% 96%)" }}
              >
                <Flame
                  className="w-[18px] h-[18px]"
                  style={{
                    color: currentStreak > 0 ? "#F97316" : "#9CA3AF",
                    filter: currentStreak > 0 ? "drop-shadow(0 0 4px rgba(249,115,22,0.3))" : "none",
                  }}
                />
              </div>
              <div>
                <p className="text-lg font-bold" style={{ fontFamily: mono }}>
                  <span style={{ color: "#F97316" }}>{currentStreak}</span>{" "}
                  <span className="text-sm font-medium text-muted-foreground">day streak</span>
                </p>
              </div>
            </div>

            {/* Check-in nudge */}
            <button
              onClick={() => navigate("/dashboard/progress")}
              className="rounded-[14px] p-4 flex items-center gap-3 text-left transition-all hover:shadow-sm active:scale-[0.98] bg-white border border-border"
            >
              <div
                className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: hasCheckedInThisWeek ? "rgba(52,211,153,0.08)" : "rgba(251,113,133,0.08)" }}
              >
                {hasCheckedInThisWeek ? (
                  <CheckCircle2 className="w-[18px] h-[18px]" style={{ color: "#34D399" }} />
                ) : (
                  <Clock className="w-[18px] h-[18px]" style={{ color: "#FB7185" }} />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {hasCheckedInThisWeek ? "Checked in" : "Check-in due"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {hasCheckedInThisWeek ? "This week" : "Weekly"}
                </p>
              </div>
            </button>
          </div>
        </motion.div>
      )}

      {/* ─── QUICK ACCESS ─── */}
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="text-lg font-bold mb-3 text-foreground" style={{ fontFamily: heading, letterSpacing: "-0.03em" }}>
          Quick Access
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {[
            { icon: MessageSquare, label: "AI Coach", desc: "Ask anything", to: "/dashboard/coach", color: "#F97316", gradient: "linear-gradient(90deg, #F97316, #F59E0B)" },
            { icon: Layers, label: "My Protocol", desc: "Compounds & schedule", to: "/dashboard/protocol", color: "#FB7185", gradient: "linear-gradient(90deg, #FB7185, #F43F5E)" },
            { icon: BarChart3, label: "Progress", desc: "Track results", to: "/dashboard/progress", color: "#A78BFA", gradient: "linear-gradient(90deg, #A78BFA, #8B5CF6)" },
          ].map((card) => (
            <button
              key={card.label}
              onClick={() => navigate(card.to)}
              className="rounded-[14px] overflow-hidden text-left transition-all duration-200 group relative bg-white border border-border hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="h-[2px]" style={{ background: card.gradient }} />
              <div className="p-4">
                <div className="flex items-start justify-between mb-2.5">
                  <div
                    className="w-9 h-9 rounded-[10px] flex items-center justify-center bg-muted"
                  >
                    <card.icon className="w-4 h-4" style={{ color: card.color }} />
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
                <p className="font-bold text-sm text-foreground" style={{ fontFamily: heading }}>
                  {card.label}
                </p>
                <p className="text-xs mt-0.5 text-muted-foreground">
                  {card.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <div className="text-xs text-center py-4 text-muted-foreground border-t border-border">
        For educational purposes only. Not medical advice. Always consult a healthcare provider.
      </div>
    </>
  );
}
