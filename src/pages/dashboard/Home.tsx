import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useProtocol } from "@/hooks/useProtocol";
import { useCheckIn } from "@/hooks/useCheckIn";
import { useCourse } from "@/hooks/useCourse";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckInFlow } from "@/components/coach/CheckInFlow";
import { WelcomeModal } from "@/components/onboarding/WelcomeModal";

// Dashboard components
import { ProgressRing } from "@/components/dashboard/home/ProgressRing";
import { NextInjectionCard } from "@/components/dashboard/home/NextInjectionCard";
import { WeekCalendarStrip } from "@/components/dashboard/home/WeekCalendarStrip";
import { MilestonesTimeline } from "@/components/dashboard/home/MilestonesTimeline";
import { TodayLessonCard } from "@/components/dashboard/home/TodayLessonCard";
import { QuickActionCards } from "@/components/dashboard/home/QuickActionCards";

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
  const { hasCheckedInToday } = useCheckIn();
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  const displayName = profile?.full_name?.split(' ')[0] || user?.user_metadata?.full_name?.split(" ")[0] || "there";
  const isLoading = isLoadingProtocol || courseLoading;

  const currentDay = userCourse?.current_day ?? 0;
  const totalDays = userCourse?.duration_days ?? 56;
  const courseTitle = userCourse?.title ?? 'Your Course';
  const currentWeek = Math.ceil((currentDay + 1) / 7);

  // Get today's lesson
  const todayLesson = userCourse?.lessons?.find(
    (l: { day: number }) => l.day === currentDay
  );
  const currentPhase = todayLesson?.phase || 'Getting Started';

  // Show welcome modal for new users who haven't set supplies status
  useEffect(() => {
    if (!isLoading && userCourse && !userCourse.supplies_status && userCourse.status === 'not_started') {
      setShowWelcome(true);
    }
  }, [isLoading, userCourse]);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Skeleton className="h-20 w-full rounded-2xl" />
          <Skeleton className="h-48 w-full rounded-2xl" />
          <div className="grid grid-cols-2 gap-6">
            <Skeleton className="h-48 w-full rounded-2xl" />
            <Skeleton className="h-48 w-full rounded-2xl" />
          </div>
          <Skeleton className="h-32 w-full rounded-2xl" />
        </div>
      </DashboardLayout>
    );
  }

  // No course CTA
  if (!protocol && !userCourse) {
    return (
      <DashboardLayout>
        <div className="space-y-8 animate-fade-up">
          {/* Header */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-black mb-1">
              {getGreeting()}, {displayName}
            </h1>
            <p className="text-gray-500">Ready to start your journey?</p>
          </div>

          {/* Build Course CTA */}
          <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-10 text-center">
            <h3 className="font-semibold text-xl text-black mb-2">No Course Yet</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Take our quick quiz to get a personalized peptide course designed for your specific goals.
            </p>
            <Button 
              onClick={() => navigate("/quiz")} 
              className="bg-black text-white hover:bg-black/90 font-semibold rounded-xl px-8 py-6 text-lg"
            >
              Build My Course
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-up">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-black mb-1">
            {getGreeting()}, {displayName}
          </h1>
          <p className="text-gray-500">
            Day {currentDay} of {totalDays} · {courseTitle.replace(' Course', '')}
          </p>
        </div>

        {/* Checked in success state */}
        {hasCheckedInToday && (
          <div className="bg-green-50 rounded-2xl border border-green-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-green-700">Today's Check-In Complete</p>
                <p className="text-sm text-green-600">Great job! See you tomorrow.</p>
              </div>
            </div>
          </div>
        )}

        {/* Today's Lesson Card - Hero */}
        <TodayLessonCard 
          lesson={todayLesson} 
          currentDay={currentDay}
          hasCompletedToday={hasCheckedInToday}
        />

        {/* Progress + Next Injection Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Progress Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Your Progress
            </h3>
            
            <div className="flex items-center gap-6">
              <ProgressRing percent={progressPercent} size={80} strokeWidth={6} />
              
              <div>
                <p className="text-2xl font-bold text-black">{currentDay}</p>
                <p className="text-gray-500">of {totalDays} days</p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                Phase: <span className="font-medium text-black">{currentPhase}</span>
              </p>
            </div>
          </div>

          {/* Next Injection Card */}
          <NextInjectionCard 
            currentDay={currentDay}
            courseStartDate={userCourse?.started_at}
            currentWeek={currentWeek}
            courseStatus={userCourse?.status}
          />
        </div>

        {/* Week Calendar Strip */}
        <WeekCalendarStrip 
          currentDay={currentDay}
          courseStartDate={userCourse?.started_at}
          injectionDayOfWeek={0} // Sunday
        />

        {/* Quick Actions */}
        <QuickActionCards />

        {/* Milestones Timeline */}
        <MilestonesTimeline 
          currentDay={currentDay}
          courseStartDate={userCourse?.started_at}
          totalDays={totalDays}
        />
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
