import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageCircle, ClipboardList, TrendingUp, Clock } from "lucide-react";
import { format } from "date-fns";
import { ProgressRing } from "./ProgressRing";
import { CompoundCard } from "./CompoundCard";
import { CompletionBanner } from "./CompletionBanner";
import { RestDayCard } from "./RestDayCard";
import type { UserProtocol, Compound } from "@/hooks/useUserProtocol";

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

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

  // Find next day with compounds for rest day card
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
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-[15px] mb-1" style={{ color: "#6B7280" }}>
              Hey {firstName} 👋
            </p>
            <h1 className="text-2xl font-bold tracking-tight mb-3" style={{ color: "#111827" }}>
              {protocol.protocol_name}
            </h1>
            {/* Stat Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
              <span
                className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[13px] font-bold whitespace-nowrap"
                style={{ color: "#F97316", backgroundColor: "#FFF7ED" }}
              >
                Week {currentWeek} of {protocol.cycle_length_weeks}
              </span>
              <span
                className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[13px] font-bold whitespace-nowrap"
                style={{ color: "#8B5CF6", backgroundColor: "#F3E8FF" }}
              >
                Day {dayNumber}
              </span>
              <span
                className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[13px] font-bold whitespace-nowrap"
                style={{ color: "#10B981", backgroundColor: "#ECFDF5" }}
              >
                {compliancePercent}% compliance
              </span>
            </div>
          </div>

          {/* Progress Ring - desktop only */}
          <div className="hidden md:flex flex-col items-center ml-6">
            <ProgressRing percent={progressPercent} size={80} strokeWidth={6} progressColor="#F97316" />
            <span className="text-[11px] mt-1" style={{ color: "#9CA3AF" }}>of cycle</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-5">
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#E5E7EB" }}>
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                background: "linear-gradient(90deg, #F97316, #F59E0B)",
                width: `${progressPercent}%`,
              }}
            />
          </div>
          <p className="text-xs text-right mt-1.5" style={{ color: "#9CA3AF" }}>
            {daysRemaining} days remaining
          </p>
        </div>
      </motion.div>

      {/* Today's Protocol */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-xl font-bold" style={{ color: "#111827" }}>Today's Protocol</h2>
          <span className="text-sm" style={{ color: "#9CA3AF" }}>
            {format(new Date(), "EEEE, MMM d")}
          </span>
        </div>

        {todayCompounds.length === 0 ? (
          <RestDayCard nextDay={getNextScheduledDay()} />
        ) : (
          <div className="space-y-3">
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
        <h2 className="text-lg font-bold mb-4" style={{ color: "#111827" }}>Quick Access</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: MessageCircle, label: "Ask Coach", desc: "Get help with your protocol", color: "#F97316", to: "/dashboard/coach" },
            { icon: ClipboardList, label: "My Protocol", desc: "View compounds & schedule", color: "#8B5CF6", to: "/dashboard/protocol" },
            { icon: TrendingUp, label: "Progress", desc: "Check-ins & photos", color: "#10B981", to: "/dashboard/progress" },
          ].map((card) => (
            <button
              key={card.label}
              onClick={() => navigate(card.to)}
              className="bg-white rounded-2xl p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] relative"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)", minHeight: 100 }}
            >
              <ArrowRight className="absolute top-4 right-4 w-4 h-4" style={{ color: "#9CA3AF" }} />
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                style={{ backgroundColor: card.color }}
              >
                <card.icon className="w-5 h-5 text-white" />
              </div>
              <p className="font-bold text-base" style={{ color: "#111827" }}>{card.label}</p>
              <p className="text-[13px] mt-0.5" style={{ color: "#6B7280" }}>{card.desc}</p>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Legal disclaimer */}
      <div className="text-xs text-center py-4" style={{ color: "#9CA3AF", borderTop: "1px solid #E5E7EB" }}>
        For educational purposes only. Not medical advice. Always consult a healthcare provider.
      </div>
    </>
  );
}
