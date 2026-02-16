import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, ClipboardList, TrendingUp, Check } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserProtocol, Compound } from "@/hooks/useUserProtocol";
import { useTodayLog, useUpsertDailyLog } from "@/hooks/useDailyLog";
import { format } from "date-fns";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { protocol, isLoading, currentWeek, daysRemaining, progressPercent, todayCompounds, todayName } = useUserProtocol();
  const { data: todayLog } = useTodayLog(protocol?.id);
  const upsertLog = useUpsertDailyLog();

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6 py-6">
          <Skeleton className="h-12 w-64 rounded-xl" />
          <Skeleton className="h-48 w-full rounded-2xl" />
          <Skeleton className="h-32 w-full rounded-2xl" />
        </div>
      </DashboardLayout>
    );
  }

  const actionsCompleted = (todayLog?.actions_completed || {}) as Record<string, boolean>;
  const allDone = todayCompounds.length > 0 && todayCompounds.every((c) => actionsCompleted[c.name]);
  const dayNumber = protocol?.start_date
    ? Math.floor((Date.now() - new Date(protocol.start_date + "T00:00:00").getTime()) / (24 * 60 * 60 * 1000)) + 1
    : 1;

  const handleToggleAction = (compoundName: string) => {
    if (!protocol) return;
    const current = actionsCompleted[compoundName] || false;
    upsertLog.mutate({
      protocol_id: protocol.id,
      actions_completed: { [compoundName]: !current },
    });
  };

  // No protocol — welcome state
  if (!protocol) {
    return (
      <DashboardLayout>
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="py-6 space-y-8">
          <motion.div
            variants={itemVariants}
            className="rounded-2xl p-6 md:p-10"
            style={{ backgroundColor: "#FFF7ED", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
          >
            <h1 className="text-2xl md:text-[32px] font-bold tracking-tight" style={{ color: "#111827" }}>
              Welcome to Peptide Playbook
            </h1>
            <p className="mt-3 text-[15px] max-w-xl" style={{ color: "#6B7280" }}>
              Let's build your protocol. Chat with your AI coach to get started.
            </p>
            <button
              onClick={() => navigate("/dashboard/coach")}
              className="mt-6 px-8 py-3 rounded-full text-white font-semibold text-[15px] transition-all hover:opacity-90"
              style={{ backgroundColor: "#F97316", minHeight: 48 }}
            >
              Build My Protocol <ArrowRight className="w-4 h-4 inline ml-1" />
            </button>
          </motion.div>

          {/* Quick Access */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <QuickCard icon={<MessageCircle className="w-5 h-5" />} label="Ask Coach" color="#8B5CF6" onClick={() => navigate("/dashboard/coach")} />
            <QuickCard icon={<ClipboardList className="w-5 h-5" />} label="My Protocol" color="#F97316" onClick={() => navigate("/dashboard/protocol")} />
            <QuickCard icon={<TrendingUp className="w-5 h-5" />} label="Progress" color="#10B981" onClick={() => navigate("/dashboard/progress")} />
          </div>
        </motion.div>

        <FloatingChatButton onClick={() => navigate("/dashboard/coach")} />
      </DashboardLayout>
    );
  }

  // Active protocol — Today View
  return (
    <DashboardLayout>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="py-4 md:py-6 space-y-6">
        {/* Protocol Status Bar */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl p-5 md:p-6"
          style={{ backgroundColor: "#FFF7ED", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-xl md:text-2xl font-bold" style={{ color: "#111827" }}>
                🎯 {protocol.protocol_name}
              </h1>
              <p className="text-sm font-mono mt-1" style={{ color: "#6B7280" }}>
                Week {currentWeek} of {protocol.cycle_length_weeks}
              </p>
            </div>
            <span className="text-sm font-mono" style={{ color: "#9CA3AF" }}>
              {daysRemaining} days remaining
            </span>
          </div>
          <div className="mt-4 w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#E5E7EB" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ backgroundColor: "#F97316", width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs" style={{ color: "#9CA3AF" }}>{progressPercent}%</span>
          </div>
        </motion.div>

        {/* Today's Actions */}
        <motion.div variants={itemVariants}>
          <h2 className="text-lg font-semibold mb-3" style={{ color: "#111827" }}>
            Today — {format(new Date(), "EEE, MMM d")}
          </h2>

          {todayCompounds.length === 0 ? (
            <div className="bg-white rounded-2xl p-5 text-center" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
              <p className="text-[15px]" style={{ color: "#6B7280" }}>
                No actions scheduled today. Enjoy your rest day.
              </p>
              <button
                onClick={() => navigate("/dashboard/coach")}
                className="mt-2 text-sm font-medium"
                style={{ color: "#F97316" }}
              >
                Need to adjust your protocol? Ask your coach.
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {todayCompounds.map((compound) => (
                <ActionCard
                  key={compound.name}
                  compound={compound}
                  checked={!!actionsCompleted[compound.name]}
                  onToggle={() => handleToggleAction(compound.name)}
                />
              ))}
            </div>
          )}

          {/* Completion banner */}
          {allDone && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 rounded-xl p-4 text-center"
              style={{
                backgroundColor: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(16,185,129,0.25)",
              }}
            >
              <p className="text-base font-bold" style={{ color: "#10B981" }}>
                Day {dayNumber} complete ✓
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Quick Access */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <QuickCard icon={<MessageCircle className="w-5 h-5" />} label="Ask Coach" color="#8B5CF6" onClick={() => navigate("/dashboard/coach")} />
          <QuickCard icon={<ClipboardList className="w-5 h-5" />} label="My Protocol" color="#F97316" onClick={() => navigate("/dashboard/protocol")} />
          <QuickCard icon={<TrendingUp className="w-5 h-5" />} label="Progress" color="#10B981" onClick={() => navigate("/dashboard/progress")} />
        </motion.div>

        {/* Legal */}
        <div className="text-xs text-center py-4" style={{ color: "#9CA3AF", borderTop: "1px solid #E5E7EB" }}>
          For educational purposes only. Not medical advice. Always consult a healthcare provider.
        </div>
      </motion.div>

      <FloatingChatButton onClick={() => navigate("/dashboard/coach")} />
    </DashboardLayout>
  );
}

function ActionCard({ compound, checked, onToggle }: { compound: Compound; checked: boolean; onToggle: () => void }) {
  const categoryColors: Record<string, string> = {
    "weight-loss": "#F97316",
    recovery: "#8B5CF6",
    performance: "#10B981",
    longevity: "#3B82F6",
  };
  const dotColor = categoryColors[compound.category || ""] || "#6B7280";

  return (
    <button
      onClick={onToggle}
      className="w-full bg-white rounded-2xl p-4 flex items-start gap-4 text-left transition-all hover:shadow-md"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
    >
      <div
        className="w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
        style={{
          borderColor: checked ? "#10B981" : "#D1D5DB",
          backgroundColor: checked ? "#10B981" : "transparent",
        }}
      >
        {checked && <Check className="w-4 h-4 text-white" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: dotColor }} />
          <p className="font-semibold text-[15px]" style={{ color: checked ? "#9CA3AF" : "#111827", textDecoration: checked ? "line-through" : "none" }}>
            {compound.name}
          </p>
        </div>
        <p className="text-sm mt-0.5" style={{ color: "#6B7280" }}>
          {compound.dose} — {compound.route}
        </p>
        <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>
          {compound.timing}
        </p>
      </div>
    </button>
  );
}

function QuickCard({ icon, label, color, onClick }: { icon: React.ReactNode; label: string; color: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-2xl p-4 flex items-center gap-3 w-full text-left transition-all hover:shadow-md"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)", minHeight: 64 }}
    >
      <div style={{ color }}>{icon}</div>
      <span className="text-sm font-semibold" style={{ color: "#111827" }}>{label}</span>
      <ArrowRight className="w-4 h-4 ml-auto" style={{ color: "#9CA3AF" }} />
    </button>
  );
}

function FloatingChatButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-24 md:bottom-8 right-5 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
      style={{ backgroundColor: "#F97316" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </motion.button>
  );
}
