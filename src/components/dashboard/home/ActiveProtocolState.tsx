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
import type { DailyLog } from "@/hooks/useDailyLog";

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
  allLogs: DailyLog[];
}

/* ── Mini sparkline bar chart (inline SVG) ── */
function ComplianceSparkline({ logs }: { logs: DailyLog[] }) {
  const recent = logs.slice(-7);
  if (recent.length === 0) return null;

  const bars = recent.map((log) => {
    const actions = log.actions_completed || {};
    const vals = Object.values(actions);
    return vals.length > 0 ? vals.filter(Boolean).length / vals.length : 0;
  });

  return (
    <svg width="56" height="20" viewBox="0 0 56 20" className="mt-1">
      {bars.map((val, i) => (
        <rect
          key={i}
          x={i * 8 + 1}
          y={20 - val * 18}
          width={5}
          height={Math.max(2, val * 18)}
          rx={1}
          fill={val >= 0.8 ? "#F97316" : val > 0 ? "#FB7185" : "hsl(0 0% 88%)"}
          opacity={0.85}
        />
      ))}
    </svg>
  );
}

/* ── Mini progress arc ── */
function MiniProgressArc({ percent }: { percent: number }) {
  const r = 12;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" className="mt-0.5">
      <circle cx="15" cy="15" r={r} fill="none" stroke="hsl(0 0% 90%)" strokeWidth="3" />
      <circle
        cx="15" cy="15" r={r} fill="none"
        stroke="url(#miniGrad)" strokeWidth="3" strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={offset}
        transform="rotate(-90 15 15)"
      />
      <defs>
        <linearGradient id="miniGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
      </defs>
    </svg>
  );
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
  allLogs,
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
      {/* ─── GREETING ─── */}
      <motion.div variants={itemVariants} className="mb-1">
        <p className="text-[13px] font-medium text-muted-foreground">Hey {firstName}</p>
        <p className="text-sm font-semibold text-foreground" style={{ fontFamily: heading }}>
          {protocol.protocol_name}
        </p>
      </motion.div>

      {/* ─── ROW 1: STAT CARDS ─── */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {/* Progress */}
        <div className="rounded-[16px] bg-white border border-border overflow-hidden">
          <div className="h-[3px]" style={{ background: "linear-gradient(90deg, #F97316, #FB7185, #A78BFA)" }} />
          <div className="p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground" style={{ fontFamily: mono }}>
              Cycle Progress
            </p>
            <div className="flex items-center justify-between">
              <p className="text-[28px] font-bold text-foreground leading-tight" style={{ fontFamily: heading }}>
                {progressPercent}%
              </p>
              <MiniProgressArc percent={progressPercent} />
            </div>
          </div>
        </div>

        {/* Day */}
        <div className="rounded-[16px] bg-white border border-border overflow-hidden">
          <div className="h-[3px]" style={{ background: "linear-gradient(90deg, #F97316, #FB7185, #A78BFA)" }} />
          <div className="p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground" style={{ fontFamily: mono }}>
              Current Day
            </p>
            <p className="text-[28px] font-bold text-foreground leading-tight" style={{ fontFamily: heading }}>
              Day {dayNumber}
            </p>
            <span className="inline-block text-[10px] font-medium px-1.5 py-0.5 rounded bg-muted text-muted-foreground mt-1" style={{ fontFamily: mono }}>
              Week {currentWeek}
            </span>
          </div>
        </div>

        {/* Compliance */}
        <div className="rounded-[16px] bg-white border border-border overflow-hidden">
          <div className="h-[3px]" style={{ background: "linear-gradient(90deg, #F97316, #FB7185, #A78BFA)" }} />
          <div className="p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground" style={{ fontFamily: mono }}>
              Compliance
            </p>
            <div className="flex items-center justify-between">
              <p className="text-[28px] font-bold text-foreground leading-tight" style={{ fontFamily: heading }}>
                {compliancePercent}%
              </p>
              <ComplianceSparkline logs={allLogs} />
            </div>
          </div>
        </div>

        {/* Streak */}
        <div className="rounded-[16px] bg-white border border-border overflow-hidden">
          <div className="h-[3px]" style={{ background: "linear-gradient(90deg, #F97316, #FB7185, #A78BFA)" }} />
          <div className="p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground" style={{ fontFamily: mono }}>
              Streak
            </p>
            <div className="flex items-center gap-2">
              <p className="text-[28px] font-bold text-foreground leading-tight" style={{ fontFamily: heading }}>
                {currentStreak}
              </p>
              <Flame
                className="w-5 h-5"
                style={{
                  color: currentStreak > 0 ? "#F97316" : "#9CA3AF",
                  filter: currentStreak > 0 ? "drop-shadow(0 0 4px rgba(249,115,22,0.4))" : "none",
                }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5" style={{ fontFamily: mono }}>days</p>
          </div>
        </div>
      </motion.div>

      {/* ─── ROW 2: TODAY'S STACK + THIS WEEK ─── */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {/* Left: Today's Stack (~60%) */}
        <div className="md:col-span-3 rounded-[16px] bg-white border border-border overflow-hidden">
          <div className="px-4 pt-4 pb-2 flex items-baseline justify-between border-b border-border">
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground" style={{ fontFamily: mono }}>
              Today's Stack
            </h2>
            <span className="text-[11px] text-muted-foreground" style={{ fontFamily: mono }}>
              {format(new Date(), "EEE, MMM d")}
            </span>
          </div>
          <div className="p-3">
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
          </div>
        </div>

        {/* Right: This Week (~40%) */}
        <div className="md:col-span-2 rounded-[16px] bg-white border border-border overflow-hidden">
          <div className="px-4 pt-4 pb-2 border-b border-border">
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground" style={{ fontFamily: mono }}>
              This Week
            </h2>
          </div>
          <div className="p-4">
            {currentWeekExpectation && (
              <p className="text-sm text-foreground leading-relaxed mb-4" style={{ fontFamily: heading }}>
                {currentWeekExpectation.description}
              </p>
            )}
            <WeekCalendarStrip
              currentDay={dayNumber}
              courseStartDate={protocol.start_date}
              schedule={protocol.schedule as Record<string, string[]>}
            />
          </div>
        </div>
      </motion.div>

      {/* ─── ROW 3: JOURNEY + PROTOCOL OVERVIEW ─── */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {/* Left: Journey */}
        <div className="md:col-span-3 rounded-[16px] bg-white border border-border overflow-hidden">
          <div className="px-4 pt-4 pb-2 border-b border-border">
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground" style={{ fontFamily: mono }}>
              Your Journey
            </h2>
          </div>
          <div className="p-5">
            <MilestonesTimeline
              currentDay={dayNumber}
              courseStartDate={protocol.start_date}
              totalDays={totalDays}
              maxVisible={4}
            />
          </div>
        </div>

        {/* Right: Protocol Overview */}
        <div className="md:col-span-2 rounded-[16px] bg-white border border-border overflow-hidden">
          <div className="px-4 pt-4 pb-2 border-b border-border">
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground" style={{ fontFamily: mono }}>
              Protocol Overview
            </h2>
          </div>
          <div className="p-5 flex flex-col items-center">
            <ProgressRing percent={progressPercent} size={100} strokeWidth={6} />
            <div className="w-full mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Compounds</span>
                <span className="font-medium text-foreground" style={{ fontFamily: mono }}>{protocol.compounds?.length || 0}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Cycle</span>
                <span className="font-medium text-foreground" style={{ fontFamily: mono }}>{protocol.cycle_length_weeks} weeks</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Remaining</span>
                <span className="font-medium text-foreground" style={{ fontFamily: mono }}>{daysRemaining} days</span>
              </div>
            </div>
            {/* Phase indicator */}
            {phase && (
              <div className="w-full mt-4">
                <div className="flex items-center gap-1">
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
                <p className="text-[11px] text-muted-foreground mt-1.5 text-center" style={{ fontFamily: mono }}>
                  {phase.name} phase
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* ─── ROW 4: QUICK ACCESS ─── */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground" style={{ fontFamily: mono }}>
            Quick Access
          </h2>
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
                <p className="text-xs mt-0.5 text-muted-foreground">{card.desc}</p>
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
