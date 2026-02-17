import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserProtocol } from "@/hooks/useUserProtocol";
import { useTodayLog, useUpsertDailyLog, useAllLogs, useRecentLogs } from "@/hooks/useDailyLog";
import { useProfile } from "@/hooks/useProfile";
import { useProgressStats } from "@/hooks/useProgressData";
import { NoProtocolState } from "@/components/dashboard/home/NoProtocolState";
import { ActiveProtocolState } from "@/components/dashboard/home/ActiveProtocolState";
import { FloatingChatButton } from "@/components/dashboard/home/FloatingChatButton";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { protocol, isLoading, currentWeek, daysRemaining, progressPercent, todayCompounds, todayName, daysElapsed, totalDays } = useUserProtocol();
  const { data: todayLog } = useTodayLog(protocol?.id);
  const upsertLog = useUpsertDailyLog();
  const { data: profile } = useProfile();
  const { data: allLogs = [] } = useAllLogs(protocol?.id);
  const { data: recentLogs = [] } = useRecentLogs(7);
  const stats = useProgressStats(allLogs, protocol ?? null);

  const firstName = profile?.full_name?.split(" ")[0] || "there";
  const shouldPulse = recentLogs.length === 0;

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="max-w-[800px] mx-auto space-y-6 py-8">
          <Skeleton className="h-10 w-48 rounded-xl bg-[#19191E]" />
          <Skeleton className="h-52 w-full rounded-[20px] bg-[#19191E]" />
          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="h-36 rounded-2xl bg-[#19191E]" />
            <Skeleton className="h-36 rounded-2xl bg-[#19191E]" />
            <Skeleton className="h-36 rounded-2xl bg-[#19191E]" />
          </div>
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

  return (
    <DashboardLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[720px] mx-auto py-6 md:py-8 px-0 relative z-10"
      >
        {!protocol ? (
          <NoProtocolState firstName={firstName} />
        ) : (
          <ActiveProtocolState
            protocol={protocol}
            currentWeek={currentWeek}
            daysElapsed={daysElapsed}
            daysRemaining={daysRemaining}
            totalDays={totalDays}
            progressPercent={progressPercent}
            todayCompounds={todayCompounds}
            todayName={todayName}
            actionsCompleted={actionsCompleted}
            allDone={allDone}
            dayNumber={dayNumber}
            compliancePercent={stats.compliancePercent}
            onToggleAction={handleToggleAction}
            firstName={firstName}
            currentStreak={profile?.current_streak || 0}
            hasCheckedInThisWeek={stats.hasCheckedInThisWeek}
          />
        )}
      </motion.div>

      <FloatingChatButton onClick={() => navigate("/dashboard/coach")} shouldPulse={shouldPulse} />
    </DashboardLayout>
  );
}
