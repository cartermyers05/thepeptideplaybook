import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ClipboardCheck, 
  MessageCircle, 
  ClipboardList, 
  Trophy, 
  Flame, 
  ArrowRight, 
  Clock, 
  Check,
  Circle,
  BookOpen
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useProtocol } from "@/hooks/useProtocol";
import { useStreak } from "@/hooks/useStreak";
import { useCheckIn } from "@/hooks/useCheckIn";
import { useMilestones, MILESTONE_DETAILS } from "@/hooks/useMilestones";
import { useCourse } from "@/hooks/useCourse";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckInFlow } from "@/components/coach/CheckInFlow";
import { WelcomeModal } from "@/components/onboarding/WelcomeModal";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: profile } = useProfile();
  const { protocol, isLoading: isLoadingProtocol } = useProtocol();
  const { userCourse, courseLoading, progressPercent } = useCourse();
  const { currentStreak } = useStreak();
  const { hasCheckedInToday } = useCheckIn();
  const { recentMilestones } = useMilestones();
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  const displayName = profile?.full_name?.split(' ')[0] || user?.user_metadata?.full_name?.split(" ")[0] || "there";
  const isLoading = isLoadingProtocol || courseLoading;

  const currentDay = userCourse?.current_day ?? 0;
  const totalDays = userCourse?.duration_days ?? 56;
  const courseTitle = userCourse?.title ?? 'Your Course';

  // Get today's lesson
  const todayLesson = userCourse?.lessons?.find(
    (l: { day: number }) => l.day === currentDay
  );

  // Show welcome modal for new users who haven't set supplies status
  useEffect(() => {
    if (!isLoading && userCourse && !userCourse.supplies_status && userCourse.status === 'not_started') {
      setShowWelcome(true);
    }
  }, [isLoading, userCourse]);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  // Milestones based on progress
  const milestones = [
    { id: 1, title: "First Check-In", completed: currentDay >= 1, day: 1 },
    { id: 2, title: "First Injection", completed: currentDay >= 5, day: 5 },
    { id: 3, title: "Week 1 Complete", completed: currentDay >= 7, day: 7 },
    { id: 4, title: "First Dose Increase", completed: currentDay >= 14, day: 14 },
  ];

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Skeleton className="h-20 w-full rounded-2xl" />
          <Skeleton className="h-48 w-full rounded-2xl" />
          <Skeleton className="h-32 w-full rounded-2xl" />
        </div>
      </DashboardLayout>
    );
  }

  const courseInfo = userCourse ? `Day ${currentDay} of ${totalDays}` : null;

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-up">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              {getGreeting()}, {displayName}
            </h1>
            {currentStreak > 0 && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-medium">
                <Flame className="w-3.5 h-3.5" />
                {currentStreak}
              </span>
            )}
          </div>
          {courseInfo && (
            <p className="text-muted-foreground">
              {courseInfo} · {courseTitle}
            </p>
          )}
        </div>

        {/* Progress Card */}
        {userCourse && (
          <div className="card-premium p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-muted-foreground">Course Progress</span>
              <span className="text-sm font-bold text-foreground">{progressPercent}%</span>
            </div>
            <div className="progress-teal">
              <div 
                className="progress-teal-fill" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {currentDay} of {totalDays} days complete
            </p>
          </div>
        )}

        {/* Today's Check-In or Lesson */}
        {protocol?.status === "active" && !hasCheckedInToday ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-featured p-6"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <ClipboardCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Daily Check-In</h2>
                  <p className="text-white/80 text-sm">
                    Log your progress to maintain your streak
                  </p>
                </div>
              </div>
              <Button 
                size="lg" 
                onClick={() => setShowCheckIn(true)} 
                className="bg-white text-primary hover:bg-white/90 font-semibold"
              >
                Complete Check-In
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        ) : todayLesson ? (
          <div className="card-featured p-6">
            <div className="flex items-start justify-between mb-4">
              <span className="text-sm font-medium text-white/70 uppercase tracking-wide">
                Today's Lesson
              </span>
              <span className="text-sm text-white/70">Day {currentDay}</span>
            </div>
            
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
              {todayLesson.title}
            </h2>
            <p className="text-white/80 mb-6 line-clamp-2">
              {todayLesson.content?.slice(0, 120)}...
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-white/60 text-sm flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                4 min read
              </span>
              
              <Link
                to="/dashboard/course"
                className="inline-flex items-center gap-2 bg-white text-primary px-5 py-2.5 rounded-xl font-semibold hover:bg-white/90 transition-colors"
              >
                Start Lesson
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : userCourse ? (
          <div className="card-featured p-6">
            <div className="text-center py-4">
              <BookOpen className="w-12 h-12 text-white/60 mx-auto mb-3" />
              <h2 className="text-xl font-bold text-white mb-2">Welcome to Your Course</h2>
              <p className="text-white/80 mb-4">Start your journey with Day 0</p>
              <Link
                to="/dashboard/course"
                className="inline-flex items-center gap-2 bg-white text-primary px-5 py-2.5 rounded-xl font-semibold hover:bg-white/90 transition-colors"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : null}

        {/* Checked in success state */}
        {hasCheckedInToday && (
          <div className="card-premium p-5 border-success/30 bg-success/5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <Check className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="font-medium text-success">Today's Check-In Complete</p>
                <p className="text-sm text-muted-foreground">Come back tomorrow to continue your streak</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/dashboard/coach" className="card-premium p-5 hover-lift group">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">AI Coach</h3>
                <p className="text-sm text-muted-foreground">
                  Ask anything about your course
                </p>
              </div>
            </div>
          </Link>

          <Link to="/dashboard/protocol" className="card-premium p-5 hover-lift group">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <ClipboardList className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">My Plan</h3>
                <p className="text-sm text-muted-foreground">
                  View peptides, schedule & guides
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Milestones */}
        {userCourse && (
          <div className="card-premium p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Milestones
            </h3>
            <div className="space-y-3">
              {milestones.map((milestone) => (
                <div 
                  key={milestone.id}
                  className="flex items-center gap-3"
                >
                  {milestone.completed ? (
                    <div className="milestone-complete animate-check-in">
                      <Check className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="milestone-upcoming">
                      <Circle className="w-3 h-3" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${
                      milestone.completed ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {milestone.title}
                    </p>
                  </div>
                  <span className={`text-xs ${
                    milestone.completed ? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {milestone.completed ? 'Complete' : `Day ${milestone.day}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Protocol CTA */}
        {!protocol && !userCourse && (
          <div className="card-premium p-8 text-center border-dashed">
            <h3 className="font-semibold text-lg mb-2">No Course Yet</h3>
            <p className="text-muted-foreground mb-4">
              Take our quick quiz to get a personalized peptide course.
            </p>
            <Button onClick={() => navigate("/quiz")} className="btn-teal">
              Build My Course
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
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

      {/* Welcome Modal for new users */}
      {userCourse && (
        <WelcomeModal
          open={showWelcome}
          onComplete={handleWelcomeComplete}
          courseTitle={courseTitle.replace(' Course', '')}
          durationWeeks={Math.ceil(totalDays / 7)}
        />
      )}
    </DashboardLayout>
  );
}
