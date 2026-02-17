import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageSquare, Layers, BarChart3, Flame } from "lucide-react";
import { format } from "date-fns";
import { CompoundCard } from "./CompoundCard";
import { CompletionBanner } from "./CompletionBanner";
import { RestDayCard } from "./RestDayCard";
import { ProgressRing } from "./ProgressRing";
import type { UserProtocol, Compound } from "@/hooks/useUserProtocol";

const itemVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const jakarta = "'Plus Jakarta Sans', sans-serif";
const mono = "'IBM Plex Mono', 'JetBrains Mono', ui-monospace, monospace";

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
  progressPercent,
  todayCompounds,
  actionsCompleted,
  allDone,
  dayNumber,
  compliancePercent,
  onToggleAction,
  firstName,
  currentStreak,
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
      {/* Hero Status Card */}
      <motion.div variants={itemVariants} className="mb-6">
        <div
          className="rounded-[24px] overflow-hidden relative"
          style={{
            background: "linear-gradient(145deg, #111114 0%, #141118 40%, #12111A 100%)",
            border: "1px solid rgba(255,255,255,0.05)",
            padding: 28,
          }}
        >
          {/* Decorative hexagons */}
          <div className="hidden md:block absolute pointer-events-none" style={{ right: -10, bottom: -20 }}>
            <svg width={180} height={180} viewBox="0 0 100 100" style={{ transform: "rotate(12deg)" }}>
              <polygon
                points="50,0 100,25 100,75 50,100 0,75 0,25"
                fill="none"
                stroke="url(#hero-hex)"
                strokeWidth={1.5}
              />
              <defs>
                <linearGradient id="hero-hex" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(249,115,22,0.1)" />
                  <stop offset="100%" stopColor="rgba(167,139,250,0.06)" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="relative z-10">
            {/* Mobile: ring centered above */}
            <div className="flex justify-center mb-4 md:hidden">
              <ProgressRing percent={progressPercent} size={88} strokeWidth={6} />
            </div>

            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium" style={{ color: "#4A4A5A" }}>
                  Hey {firstName}
                </p>
                <h1
                  className="text-[26px] font-extrabold mt-1 truncate"
                  style={{ fontFamily: jakarta, color: "#EBEBF0", letterSpacing: "-0.035em" }}
                >
                  {protocol.protocol_name}
                </h1>

                {/* Stat pills */}
                <div className="flex items-center gap-2 mt-3.5 flex-wrap">
                  <div
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5"
                    style={{ backgroundColor: "#19191E", border: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#F97316" }} />
                    <span style={{ fontFamily: mono, fontSize: 12, fontWeight: 500, color: "#8A8A9A" }}>
                      Week{" "}
                      <span style={{ fontWeight: 700, color: "#F97316" }}>{currentWeek}</span>
                      {" "}of {protocol.cycle_length_weeks}
                    </span>
                  </div>
                  <div
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5"
                    style={{ backgroundColor: "#19191E", border: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#FB7185" }} />
                    <span style={{ fontFamily: mono, fontSize: 12, fontWeight: 500, color: "#8A8A9A" }}>
                      Day <span style={{ fontWeight: 700, color: "#EBEBF0" }}>{dayNumber}</span>
                    </span>
                  </div>
                  {compliancePercent > 0 && (
                    <div
                      className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5"
                      style={{ backgroundColor: "#19191E", border: "1px solid rgba(255,255,255,0.05)" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#34D399" }} />
                      <span style={{ fontFamily: mono, fontSize: 12, fontWeight: 500, color: "#8A8A9A" }}>
                        <span style={{ fontWeight: 700, color: "#34D399" }}>{compliancePercent}%</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Desktop ring */}
              <div className="hidden md:block flex-shrink-0">
                <ProgressRing percent={progressPercent} size={100} strokeWidth={6} />
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="w-full h-1 rounded-full overflow-hidden" style={{ backgroundColor: "#19191E" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #F97316, #FB7185, #A78BFA)" }}
              initial={{ width: "0%" }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
            />
          </div>
          <p className="text-right mt-1.5" style={{ fontFamily: mono, fontSize: 11, color: "#4A4A5A" }}>
            {daysRemaining} days remaining
          </p>
        </div>
      </motion.div>

      {/* Today's Stack */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-baseline justify-between mb-4">
          <h2
            className="text-[20px] font-bold"
            style={{ fontFamily: jakarta, color: "#EBEBF0", letterSpacing: "-0.03em" }}
          >
            Today's Stack
          </h2>
          <span style={{ fontFamily: mono, fontSize: 13, color: "#4A4A5A" }}>
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

      {/* Streak Counter */}
      {currentStreak >= 2 && (
        <motion.div variants={itemVariants} className="mb-8">
          <div
            className="rounded-[14px] px-5 py-3.5 flex items-center gap-3"
            style={{ backgroundColor: "#111114", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            <Flame
              className="w-[22px] h-[22px] flex-shrink-0"
              style={{ color: "#F97316", filter: "drop-shadow(0 0 4px rgba(249,115,22,0.4))" }}
            />
            <div>
              <p style={{ fontFamily: mono, fontSize: 14, fontWeight: 600, color: "#EBEBF0" }}>
                <span style={{ color: "#F97316" }}>{currentStreak}</span> day streak
              </p>
              <p style={{ fontSize: 12, color: "#4A4A5A" }}>Keep going.</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick Access */}
      <motion.div variants={itemVariants} className="mb-8">
        <h2
          className="text-[18px] font-bold mb-3"
          style={{ fontFamily: jakarta, color: "#EBEBF0", letterSpacing: "-0.03em" }}
        >
          Quick Access
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {[
            { icon: MessageSquare, label: "AI Coach", desc: "Ask anything", to: "/dashboard/coach", color: "#F97316" },
            { icon: Layers, label: "My Protocol", desc: "Compounds & schedule", to: "/dashboard/protocol", color: "#FB7185" },
            { icon: BarChart3, label: "Progress", desc: "Track results", to: "/dashboard/progress", color: "#A78BFA" },
          ].map((card) => (
            <button
              key={card.label}
              onClick={() => navigate(card.to)}
              className="relative rounded-[14px] p-4 text-left transition-all duration-200 hover:bg-[#222228] hover:-translate-y-0.5 group"
              style={{
                backgroundColor: "#111114",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <span
                className="absolute top-3.5 right-3.5 text-[12px] transition-colors"
                style={{ color: "#4A4A5A" }}
              >
                →
              </span>
              <div
                className="w-9 h-9 rounded-[10px] flex items-center justify-center mb-2.5"
                style={{ backgroundColor: "#19191E" }}
              >
                <card.icon className="w-4 h-4" style={{ color: card.color }} />
              </div>
              <p
                className="font-bold text-[14px]"
                style={{ fontFamily: jakarta, color: "#EBEBF0" }}
              >
                {card.label}
              </p>
              <p className="text-[12px]" style={{ color: "#4A4A5A" }}>{card.desc}</p>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <div
        className="text-xs text-center py-4"
        style={{ color: "#4A4A5A", borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        For educational purposes only. Not medical advice. Always consult a healthcare provider.
      </div>
    </>
  );
}
