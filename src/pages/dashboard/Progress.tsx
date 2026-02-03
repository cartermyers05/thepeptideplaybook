import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useStreak } from "@/hooks/useStreak";
import { useCheckIn } from "@/hooks/useCheckIn";
import { useMilestones, MILESTONE_DETAILS, MilestoneType } from "@/hooks/useMilestones";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { StreakCalendar } from "@/components/progress/StreakCalendar";
import { AchievementGrid } from "@/components/progress/AchievementGrid";
import { TrendCharts } from "@/components/progress/TrendCharts";
import { Flame, Trophy, Calendar, TrendingUp } from "lucide-react";

export default function Progress() {
  const { currentStreak, longestStreak, isLoading: isLoadingStreak } = useStreak();
  const { allCheckIns, isLoadingAll } = useCheckIn();
  const { milestones, isLoading: isLoadingMilestones } = useMilestones();

  const totalCheckIns = allCheckIns?.length || 0;

  if (isLoadingStreak || isLoadingMilestones) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Your Progress</h1>
          <p className="text-muted-foreground">Track your journey and celebrate milestones</p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            icon={<Flame className="w-5 h-5 text-destructive" />}
            label="Current Streak"
            value={`${currentStreak} days`}
            sublabel="Keep it going!"
          />
          <StatCard
            icon={<Trophy className="w-5 h-5 text-accent-foreground" />}
            label="Longest Streak"
            value={`${longestStreak} days`}
            sublabel="Personal best"
          />
          <StatCard
            icon={<Calendar className="w-5 h-5 text-primary" />}
            label="Total Check-Ins"
            value={`${totalCheckIns}`}
            sublabel="All-time"
          />
        </div>

        {/* Streak Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Streak Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StreakCalendar checkIns={allCheckIns || []} />
          </CardContent>
        </Card>

        {/* Trend Charts */}
        {(allCheckIns?.length || 0) > 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Trends Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TrendCharts checkIns={allCheckIns || []} />
            </CardContent>
          </Card>
        )}

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AchievementGrid earnedMilestones={milestones} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

function StatCard({
  icon,
  label,
  value,
  sublabel,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sublabel: string;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-muted rounded-lg">{icon}</div>
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-semibold">{value}</p>
            <p className="text-xs text-muted-foreground">{sublabel}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
