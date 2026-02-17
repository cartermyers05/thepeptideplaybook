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

interface WeeklyExpectation {
  week: number;
  description: string;
}

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

  const weeklyExpectations = (protocol.weekly_expectations || []) as WeeklyExpectation[];
  const currentWeekExpectation = currentWeek
    ? weeklyExpectations.find((w) => w.week === currentWeek)
    : null;

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

  // Determine phase from weekly expectations
  const getPhaseInfo = () => {
    if (!currentWeek || weeklyExpectations.length === 0) return null;
    const totalWeeks = protocol.cycle_length_weeks;
    if (currentWeek <= Math.ceil(totalWeeks * 0.25)) return { name: "Starting", index: 0 };
    if (currentWeek <= Math.ceil(totalWeeks * 0.6)) return { name: "Building", index: 1 };
    if (currentWeek <= Math.ceil(totalWeeks * 0.85)) return { name: "Optimization", index: 2 };
    return { name: "Final", index: 3 };
  };

  const phase = getPhaseInfo();

  return (
    <>
      {/* ─── SECTION 1: TODAY'S FOCUS ─── */}
      <motion.div variants={itemVariants} className="mb-2">
        <p className="text-[13px] font-medium text-muted-foreground mb-0.5">
          Hey {firstName}
        </p>
        <p className="text-sm font-semibold text-foreground" style={{ fontFamily: heading }}>
          {protocol.protocol_name}
        </p>
      </motion.div>

      {/* Status line + progress bar */}
      <motion.div variants={itemVariants} className="mb-6">
        <p className="text-[12px] text-muted-foreground mb-2" style={{ fontFamily: mono }}>
          Week {currentWeek} of {protocol.cycle_length_weeks} · Day {dayNumber} · {daysRemaining} days left
        </p>
        <div className="w-full h-1 rounded-full overflow-hidden bg-muted">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #F97316, #FB7185, #A78BFA)" }}
            initial={{ width: "0%" }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          />
        </div>
      </motion.div>

      {/* Today's Stack */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: heading, letterSpacing: "-0.03em" }}>
            Today's Stack
          </h2>
          <span className="text-[12px] text-muted-foreground" style={{ fontFamily: mono }}>
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

      {/* ─── SECTION 2: THIS WEEK'S OUTLOOK ─── */}
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="text-xs font-semibold uppercase tracking-wider mb-3 text-muted-foreground" style={{ fontFamily: mono, letterSpacing: "0.08em" }}>
          This Week
        </h2>
        <div className="rounded-[16px] bg-white border border-border overflow-hidden">
          {currentWeekExpectation && (
            <div className="px-4 pt-4 pb-3 border-b border-border">
              <p className="text-sm text-foreground leading-relaxed" style={{ fontFamily: heading }}>
                {currentWeekExpectation.description}
              </p>
            </div>
          )}
          <div className="p-3">
            <WeekCalendarStrip
              currentDay={dayNumber}
              courseStartDate={protocol.start_date}
              schedule={protocol.schedule as Record<string, string[]>}
            />
          </div>
        </div>
      </motion.div>

      {/* ─── SECTION 3: PROTOCOL OVERVIEW ─── */}
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="text-xs font-semibold uppercase tracking-wider mb-3 text-muted-foreground" style={{ fontFamily: mono, letterSpacing: "0.08em" }}>
          Protocol Overview
        </h2>
        <div className="rounded-[16px] bg-white border border-border p-5">
          <div className="flex items-center gap-5">
            <ProgressRing percent={progressPercent} size={100} strokeWidth={6} />
            <div className="flex-1 space-y-2.5">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4" style={{ color: currentStreak > 0 ? "#F97316" : "#9CA3AF" }} />
                <span className="text-sm font-medium text-foreground" style={{ fontFamily: mono }}>
                  {currentStreak} day streak
                </span>
              </div>
              {compliancePercent > 0 && (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" style={{ color: "#34D399" }} />
                  <span className="text-sm font-medium text-foreground" style={{ fontFamily: mono }}>
                    {compliancePercent}% compliance
                  </span>
                </div>
              )}
              {/* Phase indicator */}
              {phase && (
                <div className="flex items-center gap-1 mt-1">
                  {["Starting", "Building", "Optimization", "Final"].map((p, i) => (
                    <div
                      key={p}
                      className="h-1.5 flex-1 rounded-full"
                      style={{
                        background: i <= phase.index
                          ? "linear-gradient(90deg, #F97316, #FB7185, #A78BFA)"
                          : "hsl(0 0% 92%)",
                        opacity: i <= phase.index ? 1 : 0.5,
                      }}
                    />
                  ))}
                </div>
              )}
              {phase && (
                <p className="text-[11px] text-muted-foreground" style={{ fontFamily: mono }}>
                  {phase.name} phase
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── SECTION 4: JOURNEY TIMELINE ─── */}
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="text-xs font-semibold uppercase tracking-wider mb-3 text-muted-foreground" style={{ fontFamily: mono, letterSpacing: "0.08em" }}>
          Your Journey
        </h2>
        <div className="rounded-[16px] p-5 bg-white border border-border">
          <MilestonesTimeline
            currentDay={dayNumber}
            courseStartDate={protocol.start_date}
            totalDays={totalDays}
            maxVisible={4}
          />
        </div>
      </motion.div>

      {/* ─── SECTION 5: QUICK ACTIONS ─── */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: heading, letterSpacing: "-0.03em" }}>
            Quick Access
          </h2>
          {/* Inline check-in nudge */}
          <button
            onClick={() => navigate("/dashboard/progress")}
            className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border border-border transition-colors hover:bg-muted"
            style={{ fontFamily: mono }}
          >
            {hasCheckedInThisWeek ? (
              <CheckCircle2 className="w-3 h-3" style={{ color: "#34D399" }} />
            ) : (
              <Clock className="w-3 h-3" style={{ color: "#FB7185" }} />
            )}
            <span className="text-muted-foreground">
              {hasCheckedInThisWeek ? "Checked in" : "Check-in due"}
            </span>
          </button>
        </div>
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
                  <div className="w-9 h-9 rounded-[10px] flex items-center justify-center bg-muted">
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
