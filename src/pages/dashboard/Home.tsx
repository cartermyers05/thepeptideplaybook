import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ClipboardCheck, MessageSquare, FileText, Trophy, Flame } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useProtocol } from "@/hooks/useProtocol";
import { useStreak } from "@/hooks/useStreak";
import { useCheckIn } from "@/hooks/useCheckIn";
import { useMilestones, MILESTONE_DETAILS } from "@/hooks/useMilestones";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckInFlow } from "@/components/coach/CheckInFlow";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { protocol, isLoading: isLoadingProtocol } = useProtocol();
  const { currentStreak } = useStreak();
  const { hasCheckedInToday } = useCheckIn();
  const { recentMilestones } = useMilestones();
  const [showCheckIn, setShowCheckIn] = useState(false);

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

  const getStatusMessage = () => {
    if (!protocol) return null;
    if (hasCheckedInToday) return { text: "On track", color: "text-primary bg-primary/10" };
    return { text: "Check in today", color: "text-amber-600 bg-amber-100" };
  };

  const status = getStatusMessage();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Status Bar */}
        {protocol?.status === "active" && (
          <div className="flex flex-wrap items-center gap-3 text-sm">
            {currentStreak > 0 && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium">
                <Flame className="w-4 h-4" />
                {currentStreak}-day streak
              </span>
            )}
            <span className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground">
              Week {protocol.current_week} of {protocol.cycle_length_weeks}
            </span>
            {status && (
              <span className={`px-3 py-1.5 rounded-full font-medium ${status.color}`}>
                {status.text}
              </span>
            )}
          </div>
        )}

        {/* Welcome Header */}
        <div>
          <h1 className="text-2xl font-semibold">
            Welcome back, {firstName}!
          </h1>
          {protocol?.status === "active" && (
            <p className="text-muted-foreground">
              Day {protocol.current_day} of your {protocol.cycle_length_weeks * 7}-day cycle
            </p>
          )}
        </div>

        {/* Today's Focus - Check-In Card */}
        <Card className={hasCheckedInToday ? "border-primary/30 bg-primary/5" : "border-2 border-primary shadow-lg"}>
          <CardContent className="py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${hasCheckedInToday ? "bg-primary/20" : "bg-primary"}`}>
                  <ClipboardCheck className={`w-6 h-6 ${hasCheckedInToday ? "text-primary" : "text-primary-foreground"}`} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">
                    {hasCheckedInToday ? "Today's Check-In Complete! ✓" : "Today's Check-In"}
                  </h2>
                  <p className="text-muted-foreground">
                    {hasCheckedInToday 
                      ? "Great job! Come back tomorrow to continue your streak."
                      : "Log your daily progress to maintain your streak"}
                  </p>
                </div>
              </div>
              {!hasCheckedInToday && (
                <Button size="lg" onClick={() => setShowCheckIn(true)} className="btn-primary-clean">
                  Complete Check-In
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card className="cursor-pointer hover:border-primary/50 transition-colors h-full" onClick={() => navigate("/dashboard/coach")}>
              <CardContent className="py-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-muted">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Need Help?</h3>
                    <p className="text-sm text-muted-foreground">Ask your AI coach anything</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card className="cursor-pointer hover:border-primary/50 transition-colors h-full" onClick={() => navigate("/dashboard/protocol")}>
              <CardContent className="py-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-muted">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">View Protocol</h3>
                    <p className="text-sm text-muted-foreground">
                      {protocol ? `${protocol.protocol_name}` : "See your full plan"}
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
                Take our quick quiz to get a personalized peptide course.
              </p>
              <Button onClick={() => navigate("/quiz")} className="btn-primary-clean">Build My Course</Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Check-In Modal */}
      <Dialog open={showCheckIn} onOpenChange={setShowCheckIn}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Daily Check-In</DialogTitle>
          </DialogHeader>
          <CheckInFlow onComplete={() => setShowCheckIn(false)} />
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
