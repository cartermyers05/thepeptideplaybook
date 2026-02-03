import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ClipboardCheck, MessageSquare, FileText, Trophy, Flame } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProtocol } from "@/hooks/useProtocol";
import { useStreak } from "@/hooks/useStreak";
import { useCheckIn } from "@/hooks/useCheckIn";
import { useMilestones, MILESTONE_DETAILS } from "@/hooks/useMilestones";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { protocol, isLoading: isLoadingProtocol } = useProtocol();
  const { currentStreak } = useStreak();
  const { hasCheckedInToday } = useCheckIn();
  const { recentMilestones } = useMilestones();

  const firstName = user?.user_metadata?.full_name?.split(" ")[0] || "there";
  const isLoading = isLoadingProtocol;

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl font-semibold">
              Welcome back, {firstName}! 
              {currentStreak > 0 && <span className="ml-2">🔥 {currentStreak}-day streak</span>}
            </h1>
            {protocol?.status === "active" && (
              <p className="text-muted-foreground">
                Week {protocol.current_week}, Day {protocol.current_day} of your {protocol.cycle_length_weeks}-week cycle
              </p>
            )}
          </div>
        </div>

        {/* Today's Check-In Card - Prominent CTA */}
        <Card className={hasCheckedInToday ? "border-primary/50 bg-primary/5" : "border-2 border-primary"}>
          <CardContent className="py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${hasCheckedInToday ? "bg-primary/20" : "bg-primary"}`}>
                  <ClipboardCheck className={`w-6 h-6 ${hasCheckedInToday ? "text-primary" : "text-primary-foreground"}`} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">
                    {hasCheckedInToday ? "Check-In Complete! ✓" : "Today's Check-In"}
                  </h2>
                  <p className="text-muted-foreground">
                    {hasCheckedInToday 
                      ? "Great job! Come back tomorrow to continue your streak."
                      : "Log your daily progress to maintain your streak"}
                  </p>
                </div>
              </div>
              {!hasCheckedInToday && (
                <Button size="lg" onClick={() => navigate("/dashboard/coach")}>
                  Complete Check-In
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card className="cursor-pointer hover:border-primary/50 transition-colors" onClick={() => navigate("/dashboard/coach")}>
              <CardContent className="py-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-muted">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Talk to AI Coach</h3>
                    <p className="text-sm text-muted-foreground">Get guidance on dosing, timing, and technique</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card className="cursor-pointer hover:border-primary/50 transition-colors" onClick={() => navigate("/dashboard/protocol")}>
              <CardContent className="py-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-muted">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">View Protocol</h3>
                    <p className="text-sm text-muted-foreground">
                      {protocol ? `${protocol.protocol_name}` : "Get your personalized protocol"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Milestones */}
        {recentMilestones.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Recent Milestones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentMilestones.slice(0, 3).map((milestone) => {
                  const details = MILESTONE_DETAILS[milestone.milestone_type as keyof typeof MILESTONE_DETAILS];
                  return (
                    <div key={milestone.id} className="flex items-center gap-3">
                      <span className="text-2xl">{details?.icon || "🏆"}</span>
                      <div>
                        <p className="font-medium">{details?.label || milestone.milestone_type}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(milestone.achieved_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* No Protocol CTA */}
        {!protocol && (
          <Card className="border-dashed">
            <CardContent className="py-8 text-center">
              <h3 className="font-medium mb-2">No Protocol Yet</h3>
              <p className="text-muted-foreground mb-4">
                Take our quick quiz to get a personalized peptide protocol.
              </p>
              <Button onClick={() => navigate("/quiz")}>Get Your Free Protocol</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
