import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageCircle, Layers, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { CompoundCard } from "./CompoundCard";
import { CompletionBanner } from "./CompletionBanner";
import { RestDayCard } from "./RestDayCard";
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
      {/* Protocol Header */}
      <motion.div variants={itemVariants} className="mb-6">
        <p className="text-sm mb-0.5" style={{ color: "#9CA3AF" }}>
          Hey {firstName}
        </p>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "linear-gradient(135deg, #F97316, #FB7185)" }} />
          <h1
            className="text-[28px] font-bold truncate"
            style={{ color: "#0A0A0A", letterSpacing: "-0.02em" }}
          >
            {protocol.protocol_name}
          </h1>
        </div>

        {/* Stats row with dividers */}
        <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
          <span className="text-sm font-semibold whitespace-nowrap" style={{ color: "#0A0A0A" }}>
            Week <span style={{ fontFamily: mono }}>{currentWeek}</span> of <span style={{ fontFamily: mono }}>{protocol.cycle_length_weeks}</span>
          </span>
          <span className="mx-3 w-px h-4 flex-shrink-0" style={{ backgroundColor: "#E8EAED" }} />
          <span className="text-sm whitespace-nowrap" style={{ color: "#4B5563" }}>
            Day <span style={{ fontFamily: mono, color: "#FB7185" }}>{dayNumber}</span>
          </span>
          <span className="mx-3 w-px h-4 flex-shrink-0" style={{ backgroundColor: "#E8EAED" }} />
          <span className="text-sm font-semibold whitespace-nowrap" style={{ color: "#22C55E" }}>
            <span style={{ fontFamily: mono }}>{compliancePercent}%</span> compliance
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full h-1 rounded-full overflow-hidden" style={{ backgroundColor: "#E8EAED" }}>
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{ background: "linear-gradient(90deg, #F97316, #FB7185, #A78BFA)", width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </motion.div>

      {/* Today's Protocol */}
      <motion.div variants={itemVariants} className="mb-10">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-xl font-bold" style={{ color: "#0A0A0A" }}>Today</h2>
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

      {/* Quick Access */}
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="text-lg font-bold mb-3" style={{ color: "#0A0A0A" }}>Quick Access</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[
            { icon: MessageCircle, label: "AI Coach", desc: "Ask anything", to: "/dashboard/coach", hoverBg: "rgba(249,115,22,0.1)" },
            { icon: Layers, label: "Protocol", desc: "Compounds & schedule", to: "/dashboard/protocol", hoverBg: "rgba(251,113,133,0.1)" },
            { icon: TrendingUp, label: "Progress", desc: "Check-ins & photos", to: "/dashboard/progress", hoverBg: "rgba(167,139,250,0.1)" },
          ].map((card) => (
            <button
              key={card.label}
              onClick={() => navigate(card.to)}
              className="flex items-center gap-3 bg-white rounded-[14px] px-4 text-left transition-all duration-200 hover:border-[#9CA3AF] active:scale-[0.98] group"
              style={{ border: "1px solid #E8EAED", height: 72 }}
            >
              <div
                className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                style={{ backgroundColor: "#F3F4F6" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = card.hoverBg; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#F3F4F6"; }}
              >
                <card.icon className="w-[18px] h-[18px]" style={{ color: "#4B5563" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[15px]" style={{ color: "#0A0A0A" }}>{card.label}</p>
                <p className="text-xs" style={{ color: "#9CA3AF" }}>{card.desc}</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 flex-shrink-0 transition-colors duration-200 group-hover:text-[#4B5563]" style={{ color: "#D1D5DB" }} />
            </button>
          ))}
        </div>
      </motion.div>

      {/* Legal disclaimer */}
      <div className="text-xs text-center py-4" style={{ color: "#9CA3AF", borderTop: "1px solid #E8EAED" }}>
        For educational purposes only. Not medical advice. Always consult a healthcare provider.
      </div>
    </>
  );
}
