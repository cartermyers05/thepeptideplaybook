import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { ArrowRight, MessageSquare, Layers, BarChart3, Flame, CheckCircle2, Clock, Lightbulb } from "lucide-react";
import { format } from "date-fns";
import { useEffect, useRef } from "react";
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

/* ── Floating Hexagons ── */
function FloatingHexagons() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[
        { size: 80, top: "5%", right: "3%", delay: 0, duration: 7 },
        { size: 50, top: "35%", left: "2%", delay: 1.5, duration: 8 },
        { size: 35, bottom: "20%", right: "8%", delay: 3, duration: 6 },
      ].map((hex, i) => (
        <motion.svg
          key={i}
          width={hex.size}
          height={hex.size}
          viewBox="0 0 32 32"
          fill="none"
          className="absolute"
          style={{ top: hex.top, right: hex.right, left: (hex as any).left, bottom: (hex as any).bottom }}
          animate={{ y: [-6, 6, -6], rotate: [0, 5, -5, 0] }}
          transition={{ duration: hex.duration, repeat: Infinity, ease: "easeInOut", delay: hex.delay }}
        >
          <path d="M16 2L28 9V23L16 30L4 23V9L16 2Z" stroke="url(#fh)" strokeWidth="0.8" fill="none" opacity={0.04} />
          <defs>
            <linearGradient id={`fh${i}`} x1="0" y1="0" x2="32" y2="32">
              <stop offset="0%" stopColor="#F97316" />
              <stop offset="50%" stopColor="#FB7185" />
              <stop offset="100%" stopColor="#A78BFA" />
            </linearGradient>
          </defs>
        </motion.svg>
      ))}
    </div>
  );
}

/* ── Animated number counter ── */
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(motionVal, value, { duration: 1.2, ease: "easeOut" });
    return controls.stop;
  }, [value, motionVal]);

  useEffect(() => {
    const unsub = rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${v}${suffix}`;
    });
    return unsub;
  }, [rounded, suffix]);

  return <span ref={ref}>{value}{suffix}</span>;
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
    <svg width="72" height="28" viewBox="0 0 72 28" className="mt-1">
      {bars.map((val, i) => (
        <motion.rect
          key={i} x={i * 10 + 1} y={28 - val * 24}
          width={7} height={Math.max(3, val * 24)} rx={2}
          fill={val >= 0.8 ? "#F97316" : val > 0 ? "#FB7185" : "hsl(0 0% 88%)"}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: i * 0.05, duration: 0.4 }}
          style={{ transformOrigin: "bottom" }}
        />
      ))}
    </svg>
  );
}

/* ── Mini progress arc (bigger) ── */
function MiniProgressArc({ percent }: { percent: number }) {
  const r = 16;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" className="mt-0.5">
      <circle cx="20" cy="20" r={r} fill="none" stroke="hsl(0 0% 90%)" strokeWidth="3.5" />
      <motion.circle
        cx="20" cy="20" r={r} fill="none"
        stroke="url(#miniGrad)" strokeWidth="3.5" strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        transform="rotate(-90 20 20)"
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

/* ── Shimmer overlay for insight card ── */
function ShimmerOverlay() {
  return (
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
  );
}

/* ── Stat card color configs ── */
const statCardConfigs = [
  { tint: "rgba(249,115,22,0.04)", borderColor: "rgba(249,115,22,0.12)", hoverBg: "rgba(249,115,22,0.08)" },
  { tint: "rgba(96,165,250,0.04)", borderColor: "rgba(96,165,250,0.12)", hoverBg: "rgba(96,165,250,0.08)" },
  { tint: "rgba(251,113,133,0.04)", borderColor: "rgba(251,113,133,0.12)", hoverBg: "rgba(251,113,133,0.08)" },
  { tint: "rgba(167,139,250,0.04)", borderColor: "rgba(167,139,250,0.12)", hoverBg: "rgba(167,139,250,0.08)" },
];

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

  const phaseDescriptions: Record<string, string> = {
    Starting: "Your body is adjusting. Focus on consistency and monitoring for side effects.",
    Building: "Compounds are reaching effective levels. Track changes in energy and recovery.",
    Optimization: "Peak benefit window. Fine-tune timing and dosing based on your response.",
    Final: "Taper phase. Prepare for cycle completion and assess overall results.",
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative">
      <FloatingHexagons />

      {/* ─── GREETING ─── */}
      <motion.div variants={itemVariants} className="mb-1">
        <p className="text-[13px] font-medium text-muted-foreground">Hey {firstName}</p>
        <p className="text-sm font-semibold text-foreground" style={{ fontFamily: heading }}>
          {protocol.protocol_name}
        </p>
      </motion.div>

      {/* ─── ROW 1: GLASSMORPHIC STAT CARDS ─── */}
      <motion.div variants={cardStagger} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {[
          {
            label: "Progress", value: progressPercent, suffix: "%",
            detail: `${dayNumber} days elapsed`,
            visual: <MiniProgressArc percent={progressPercent} />,
          },
          {
            label: "Day", value: dayNumber, suffix: "",
            detail: `Week ${currentWeek || 1}`,
            visual: (
              <span className="inline-block text-[10px] font-medium px-1.5 py-0.5 rounded bg-white/60 text-muted-foreground mt-1" style={{ fontFamily: mono }}>
                Week {currentWeek}
              </span>
            ),
          },
          {
            label: "Compliance", value: compliancePercent, suffix: "%",
            detail: `${allLogs.length} days logged`,
            visual: <ComplianceSparkline logs={allLogs} />,
          },
          {
            label: "Streak", value: currentStreak, suffix: "",
            detail: currentStreak > 0 ? "Keep it going!" : "Start today",
            visual: (
              <div className="flex items-center gap-1">
                <motion.div
                  animate={currentStreak > 0 ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Flame className="w-6 h-6" style={{ color: currentStreak > 0 ? "#F97316" : "#D4D4D8", filter: currentStreak > 0 ? "drop-shadow(0 0 6px rgba(249,115,22,0.5))" : "none" }} />
                </motion.div>
                <p className="text-[10px] text-muted-foreground" style={{ fontFamily: mono }}>days</p>
              </div>
            ),
          },
        ].map((card, idx) => (
          <motion.div
            key={card.label}
            variants={cardItem}
            whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="rounded-[16px] overflow-hidden cursor-default group relative"
            style={{
              background: statCardConfigs[idx].tint,
              backdropFilter: "blur(12px)",
              border: `1px solid ${statCardConfigs[idx].borderColor}`,
            }}
          >
            <div className="p-3.5 md:p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1" style={{ fontFamily: mono }}>
                {card.label}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-[28px] font-bold text-foreground leading-tight" style={{ fontFamily: heading }}>
                  <AnimatedCounter value={card.value} suffix={card.suffix} />
                </p>
                {card.visual}
              </div>
              {/* Hover reveal detail */}
              <motion.p
                className="text-[11px] text-muted-foreground mt-1 overflow-hidden"
                initial={{ opacity: 0, height: 0 }}
                whileHover={{ opacity: 1, height: "auto" }}
                style={{ fontFamily: mono }}
              >
                {card.detail}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ─── SMART INSIGHT GRADIENT BANNER ─── */}
      <motion.div variants={itemVariants} className="mb-5">
        <div
          className="rounded-[16px] overflow-hidden relative flex"
          style={{
            background: "radial-gradient(ellipse at 20% 50%, rgba(249,115,22,0.06), transparent 70%), radial-gradient(ellipse at 80% 50%, rgba(167,139,250,0.05), transparent 70%), rgba(255,255,255,0.8)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(249,115,22,0.1)",
          }}
        >
          <ShimmerOverlay />
          <div className="w-[3px] flex-shrink-0" style={{ background: "linear-gradient(180deg, #F97316, #FB7185, #A78BFA)" }} />
          <div className="p-4 flex items-start gap-3">
            <motion.div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.12), rgba(167,139,250,0.12))" }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
                <path d="M16 2L28 9V23L16 30L4 23V9L16 2Z" stroke="url(#insightHex)" strokeWidth="2" fill="none" />
                <defs>
                  <linearGradient id="insightHex" x1="0" y1="0" x2="32" y2="32">
                    <stop offset="0%" stopColor="#F97316" />
                    <stop offset="100%" stopColor="#A78BFA" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
            <p className="text-[15px] text-foreground leading-relaxed" style={{ fontFamily: heading }}>
              {insight.text}
            </p>
          </div>
        </div>
      </motion.div>

      {/* ─── Gradient Separator ─── */}
      <div className="my-5 h-[2px] rounded-full opacity-10" style={{ background: "linear-gradient(90deg, #F97316, #FB7185, #A78BFA)" }} />

      {/* ─── ROW 2: TODAY'S STACK (dark header) + THIS WEEK ─── */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-5">
        {/* Left: Today's Stack */}
        <div className="md:col-span-3 rounded-[16px] overflow-hidden border border-border bg-white">
          {/* Dark header */}
          <div
            className="px-4 pt-3.5 pb-3 space-y-2"
            style={{ backgroundColor: "#0A0A0A" }}
          >
            <div className="flex items-baseline justify-between">
              <h2 className="text-[11px] font-semibold uppercase tracking-wider" style={{ fontFamily: mono, color: "rgba(255,255,255,0.7)" }}>
                Today's Stack
              </h2>
              <span className="text-[11px]" style={{ fontFamily: mono, color: "rgba(255,255,255,0.4)" }}>
                {format(new Date(), "EEE, MMM d")}
              </span>
            </div>
            {todayCompounds.length > 0 && (
              <div className="flex items-center gap-2.5">
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #F97316, #FB7185, #A78BFA)" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${todayCompounds.length > 0 ? (completedCount / todayCompounds.length) * 100 : 0}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
                <span className="text-[10px] font-semibold" style={{ fontFamily: mono, color: "rgba(255,255,255,0.5)" }}>
                  {completedCount}/{todayCompounds.length}
                </span>
                {allDone && todayCompounds.length > 0 && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}>
                    <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "#34D399" }} />
                  </motion.div>
                )}
              </div>
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
              <motion.p
                className="text-sm text-foreground leading-relaxed mb-4"
                style={{ fontFamily: heading }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {currentWeekExpectation.description}
              </motion.p>
            )}
            <WeekCalendarStrip
              currentDay={dayNumber}
              courseStartDate={protocol.start_date}
              schedule={protocol.schedule as Record<string, string[]>}
            />
          </div>
        </div>
      </motion.div>

      {/* ─── Gradient Separator ─── */}
      <div className="my-5 h-[2px] rounded-full opacity-10" style={{ background: "linear-gradient(90deg, #F97316, #FB7185, #A78BFA)" }} />

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
        <div className="md:col-span-2 rounded-[16px] bg-white border border-border overflow-hidden md:min-h-[280px] relative">
          {/* Decorative concentric rings */}
          <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" width="160" height="160" viewBox="0 0 160 160" fill="none">
            {[50, 65, 80].map((r) => (
              <circle key={r} cx="80" cy="80" r={r} stroke="url(#decorRing)" strokeWidth="0.5" opacity={0.04} />
            ))}
            <defs>
              <linearGradient id="decorRing" x1="0" y1="0" x2="160" y2="160">
                <stop offset="0%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#A78BFA" />
              </linearGradient>
            </defs>
          </svg>

          <div className="px-4 pt-4 pb-2 border-b border-border">
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground" style={{ fontFamily: mono }}>
              Protocol Overview
            </h2>
          </div>
          <div className="p-5 flex flex-col items-center relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
            >
              <ProgressRing percent={progressPercent} size={100} strokeWidth={6} />
            </motion.div>
            <div className="w-full mt-4 space-y-1">
              {[
                { label: "Compounds", value: `${protocol.compounds?.length || 0}` },
                { label: "Cycle", value: `${protocol.cycle_length_weeks} weeks` },
                { label: "Remaining", value: `${daysRemaining} days` },
              ].map((row, i) => (
                <div
                  key={row.label}
                  className="flex justify-between text-sm py-1.5 px-2 rounded-lg"
                  style={{ backgroundColor: i % 2 === 0 ? "rgba(0,0,0,0.015)" : "transparent" }}
                >
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="font-medium text-foreground" style={{ fontFamily: mono }}>{row.value}</span>
                </div>
              ))}
            </div>
            {phase && (
              <div className="w-full mt-4">
                <div className="flex items-center gap-1">
                  {["Starting", "Building", "Optimization", "Final"].map((p, i) => (
                    <motion.div
                      key={p}
                      className="h-2 flex-1 rounded-full cursor-default relative group"
                      whileHover={{ scaleY: 1.8 }}
                      style={{
                        background: i <= phase.index
                          ? "linear-gradient(90deg, #F97316, #FB7185, #A78BFA)"
                          : "hsl(0 0% 92%)",
                        opacity: i <= phase.index ? 1 : 0.5,
                        transformOrigin: "bottom",
                      }}
                      title={phaseDescriptions[p]}
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

      {/* ─── Gradient Separator ─── */}
      <div className="my-5 h-[2px] rounded-full opacity-10" style={{ background: "linear-gradient(90deg, #F97316, #FB7185, #A78BFA)" }} />

      {/* ─── ROW 4: QUICK ACCESS — Bento gradient cards ─── */}
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
            { icon: MessageSquare, label: "AI Coach", desc: "Ask anything", to: "/dashboard/coach", color: "#F97316", bgTint: "rgba(249,115,22,0.05)", bgHover: "rgba(249,115,22,0.12)" },
            { icon: Layers, label: "My Protocol", desc: "Compounds & schedule", to: "/dashboard/protocol", color: "#FB7185", bgTint: "rgba(251,113,133,0.05)", bgHover: "rgba(251,113,133,0.12)" },
            { icon: BarChart3, label: "Progress", desc: "Track results", to: "/dashboard/progress", color: "#A78BFA", bgTint: "rgba(167,139,250,0.05)", bgHover: "rgba(167,139,250,0.12)" },
          ].map((card) => (
            <motion.button
              key={card.label}
              variants={cardItem}
              onClick={() => navigate(card.to)}
              whileHover={{ scale: 1.02, y: -3, boxShadow: "0 12px 32px rgba(0,0,0,0.08)" }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="rounded-[14px] overflow-hidden text-left group relative border border-border"
              style={{ background: card.bgTint }}
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-2.5">
                  <motion.div
                    className="w-11 h-11 rounded-[12px] flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${card.bgTint}, ${card.bgHover})` }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <card.icon className="w-5 h-5" style={{ color: card.color }} />
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
      <div
        className="text-xs text-center py-4 text-muted-foreground"
        style={{ borderTop: "2px solid transparent", borderImage: "linear-gradient(90deg, transparent, rgba(249,115,22,0.1), rgba(167,139,250,0.1), transparent) 1" }}
      >
        For educational purposes only. Not medical advice. Always consult a healthcare provider.
      </div>
    </motion.div>
  );
}
