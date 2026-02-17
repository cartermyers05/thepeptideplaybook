import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageSquare, Layers, BarChart3, Flame, CheckCircle2, Clock, Lightbulb } from "lucide-react";
import { format } from "date-fns";
import { CompoundCard } from "./CompoundCard";
import { CompletionBanner } from "./CompletionBanner";
import { RestDayCard } from "./RestDayCard";
import { ProgressRing } from "./ProgressRing";
import { WeekCalendarStrip } from "./WeekCalendarStrip";
import { MilestonesTimeline } from "./MilestonesTimeline";
import type { UserProtocol, Compound } from "@/hooks/useUserProtocol";
import type { DailyLog } from "@/hooks/useDailyLog";

/* ── Animation variants ── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5 } },
};

const cardStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.45 } },
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

/* ── Hexagon Watermark ── */
function HexagonWatermark() {
  return (
    <svg
      width="180" height="180" viewBox="0 0 32 32" fill="none"
      className="absolute -top-6 -right-6 opacity-[0.06] pointer-events-none"
      style={{ transform: "rotate(15deg)" }}
    >
      <path d="M16 2L28 9V23L16 30L4 23V9L16 2Z" stroke="url(#wm)" strokeWidth="1.5" fill="none" />
      <defs>
        <linearGradient id="wm" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="50%" stopColor="#FB7185" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Mini sparkline bar chart ── */
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
          key={i} x={i * 8 + 1} y={20 - val * 18}
          width={5} height={Math.max(2, val * 18)} rx={1}
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

/* ── Smart Insight ── */
function getSmartInsight(
  currentWeek: number | null,
  compliancePercent: number,
  currentStreak: number,
  weeklyExpectation: string | null
): { text: string; type: "welcome" | "praise" | "encourage" | "streak" | "expectation" | "default" } {
  if (currentWeek === 1) return { text: "Welcome to Week 1. Focus on getting comfortable with your routine — side effects are typically mildest now.", type: "welcome" };
  if (compliancePercent >= 90) return { text: `Your consistency is in the top tier. Keep this pace through Week ${currentWeek} for optimal results.`, type: "praise" };
  if (currentStreak >= 7) return { text: `${currentStreak}-day streak! You're building a solid habit. Research shows 21 consecutive days locks in behavior change.`, type: "streak" };
  if (compliancePercent < 50) return { text: "Missed a few days? That's okay. Consistency matters more than perfection — get back on track today.", type: "encourage" };
  if (weeklyExpectation) return { text: weeklyExpectation, type: "expectation" };
  return { text: "Stay consistent with your protocol. Small daily actions compound into significant results over time.", type: "default" };
}

/* ── Gradient separator ── */
function GradientSeparator() {
  return (
    <div className="my-5 h-[2px] rounded-full opacity-10" style={{ background: "linear-gradient(90deg, #F97316, #FB7185, #A78BFA)" }} />
  );
}

/* ── Completion Progress Bar for Today's Stack ── */
function StackProgressBar({ completed, total }: { completed: number; total: number }) {
  const pct = total > 0 ? (completed / total) * 100 : 0;
  const allDone = completed === total && total > 0;
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #F97316, #FB7185, #A78BFA)" }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
      <span className="text-[10px] font-semibold text-muted-foreground" style={{ fontFamily: mono }}>
        {completed}/{total}
      </span>
      {allDone && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "#34D399" }} />
        </motion.div>
      )}
    </div>
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
  const currentWeekExpectation = currentWeek ? weeklyExpectations.find((w) => w.week === currentWeek) : null;

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
  const insight = getSmartInsight(currentWeek, compliancePercent, currentStreak, currentWeekExpectation?.description || null);
  const completedCount = todayCompounds.filter((c) => actionsCompleted[c.name]).length;

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative">
      <HexagonWatermark />

      {/* ─── GREETING ─── */}
      <motion.div variants={itemVariants} className="mb-1">
        <p className="text-[13px] font-medium text-muted-foreground">Hey {firstName}</p>
        <p className="text-sm font-semibold text-foreground" style={{ fontFamily: heading }}>
          {protocol.protocol_name}
        </p>
      </motion.div>

      {/* ─── ROW 1: STAT CARDS (staggered) ─── */}
      <motion.div variants={cardStagger} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {[
          {
            label: "Cycle Progress", value: `${progressPercent}%`,
            visual: <MiniProgressArc percent={progressPercent} />,
          },
          {
            label: "Current Day", value: `Day ${dayNumber}`,
            visual: (
              <span className="inline-block text-[10px] font-medium px-1.5 py-0.5 rounded bg-muted text-muted-foreground mt-1" style={{ fontFamily: mono }}>
                Week {currentWeek}
              </span>
            ),
          },
          {
            label: "Compliance", value: `${compliancePercent}%`,
            visual: <ComplianceSparkline logs={allLogs} />,
          },
          {
            label: "Streak", value: `${currentStreak}`,
            visual: (
              <div className="flex items-center gap-1">
                <Flame className="w-5 h-5" style={{ color: currentStreak > 0 ? "#F97316" : "#9CA3AF", filter: currentStreak > 0 ? "drop-shadow(0 0 4px rgba(249,115,22,0.4))" : "none" }} />
                <p className="text-[10px] text-muted-foreground" style={{ fontFamily: mono }}>days</p>
              </div>
            ),
          },
        ].map((card) => (
          <motion.div
            key={card.label}
            variants={cardItem}
            className="rounded-[16px] bg-white border border-border overflow-hidden"
          >
            <div className="h-[3px]" style={{ background: "linear-gradient(90deg, #F97316, #FB7185, #A78BFA)" }} />
            <div className="p-3.5 md:p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground" style={{ fontFamily: mono }}>
                {card.label}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-[28px] font-bold text-foreground leading-tight" style={{ fontFamily: heading }}>
                  {card.value}
                </p>
                {card.visual}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ─── SMART INSIGHT ─── */}
      <motion.div variants={itemVariants} className="mb-5">
        <div className="rounded-[16px] bg-white border border-border overflow-hidden flex">
          <div className="w-[3px] flex-shrink-0 rounded-l-[16px]" style={{ background: "linear-gradient(180deg, #F97316, #FB7185, #A78BFA)" }} />
          <div className="p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
              <Lightbulb className="w-4 h-4" style={{ color: "#F97316" }} />
            </div>
            <p className="text-sm text-foreground leading-relaxed" style={{ fontFamily: heading }}>
              {insight.text}
            </p>
          </div>
        </div>
      </motion.div>

      <GradientSeparator />

      {/* ─── ROW 2: TODAY'S STACK + THIS WEEK ─── */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-5">
        {/* Left: Today's Stack */}
        <div className="md:col-span-3 rounded-[16px] bg-white border border-border overflow-hidden">
          <div className="px-4 pt-4 pb-2 border-b border-border space-y-2">
            <div className="flex items-baseline justify-between">
              <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground" style={{ fontFamily: mono }}>
                Today's Stack
              </h2>
              <span className="text-[11px] text-muted-foreground" style={{ fontFamily: mono }}>
                {format(new Date(), "EEE, MMM d")}
              </span>
            </div>
            {todayCompounds.length > 0 && (
              <StackProgressBar completed={completedCount} total={todayCompounds.length} />
            )}
          </div>
          <div className="p-3">
            {todayCompounds.length === 0 ? (
              <RestDayCard nextDay={getNextScheduledDay()} />
            ) : (
              <div className="space-y-2">
                {todayCompounds.map((compound, index) => (
                  <CompoundCard
                    key={compound.name}
                    compound={compound}
                    checked={!!actionsCompleted[compound.name]}
                    allDone={allDone}
                    onToggle={() => onToggleAction(compound.name)}
                    index={index}
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

        {/* Right: This Week */}
        <div className="md:col-span-2 rounded-[16px] bg-white border border-border overflow-hidden md:min-h-[280px]">
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

      <GradientSeparator />

      {/* ─── ROW 3: JOURNEY + PROTOCOL OVERVIEW ─── */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-5">
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
        <div className="md:col-span-2 rounded-[16px] bg-white border border-border overflow-hidden md:min-h-[280px]">
          <div className="px-4 pt-4 pb-2 border-b border-border">
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground" style={{ fontFamily: mono }}>
              Protocol Overview
            </h2>
          </div>
          <div className="p-5 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
            >
              <ProgressRing percent={progressPercent} size={100} strokeWidth={6} />
            </motion.div>
            <div className="w-full mt-4 space-y-2">
              {[
                { label: "Compounds", value: `${protocol.compounds?.length || 0}` },
                { label: "Cycle", value: `${protocol.cycle_length_weeks} weeks` },
                { label: "Remaining", value: `${daysRemaining} days` },
              ].map((row) => (
                <div key={row.label} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="font-medium text-foreground" style={{ fontFamily: mono }}>{row.value}</span>
                </div>
              ))}
            </div>
            {phase && (
              <div className="w-full mt-4">
                <div className="flex items-center gap-1">
                  {["Starting", "Building", "Optimization", "Final"].map((p, i) => (
                    <div
                      key={p}
                      className="h-1.5 flex-1 rounded-full transition-all duration-500"
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

      <GradientSeparator />

      {/* ─── ROW 4: QUICK ACCESS ─── */}
      <motion.div variants={cardStagger} className="mb-8">
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
            <motion.button
              key={card.label}
              variants={cardItem}
              onClick={() => navigate(card.to)}
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="rounded-[14px] overflow-hidden text-left group relative bg-white border border-border hover:shadow-lg"
            >
              <div className="h-[2px]" style={{ background: card.gradient }} />
              <div className="p-4">
                <div className="flex items-start justify-between mb-2.5">
                  <motion.div
                    className="w-9 h-9 rounded-[10px] flex items-center justify-center bg-muted"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <card.icon className="w-4 h-4" style={{ color: card.color }} />
                  </motion.div>
                  <motion.div
                    whileHover={{ rotate: -45 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </motion.div>
                </div>
                <p className="font-bold text-sm text-foreground" style={{ fontFamily: heading }}>
                  {card.label}
                </p>
                <p className="text-xs mt-0.5 text-muted-foreground">{card.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <div className="text-xs text-center py-4 text-muted-foreground border-t border-border">
        For educational purposes only. Not medical advice. Always consult a healthcare provider.
      </div>
    </motion.div>
  );
}
