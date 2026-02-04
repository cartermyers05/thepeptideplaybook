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
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
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
            <p className="text-gray-500">
              {courseInfo} · {courseTitle}
            </p>
          )}
        </div>

        {/* Progress Card */}
        {userCourse && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">Course Progress</span>
              <span className="text-sm font-bold text-black">{progressPercent}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-black rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {currentDay} of {totalDays} days complete
            </p>
          </div>
        )}

        {/* Today's Check-In or Lesson */}
        {protocol?.status === "active" && !hasCheckedInToday ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          >
            {/* Coral gradient top bar */}
            <div className="h-1 bg-gradient-to-r from-[#fda4af] to-[#fb7185]" />
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center">
                    <ClipboardCheck className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-black">Daily Check-In</h2>
                    <p className="text-gray-500 text-sm">
                      Log your progress to maintain your streak
                    </p>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  onClick={() => setShowCheckIn(true)} 
                  className="bg-black text-white hover:bg-black/90 font-semibold rounded-lg"
                >
                  Complete Check-In
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        ) : todayLesson ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Coral gradient top bar */}
            <div className="h-1 bg-gradient-to-r from-[#fda4af] to-[#fb7185]" />
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                  Today's Lesson
                </span>
                <span className="text-sm text-gray-400">Day {currentDay}</span>
              </div>
              
              <h2 className="text-xl md:text-2xl font-bold text-black mb-2">
                {todayLesson.title}
              </h2>
              <p className="text-gray-500 mb-6 line-clamp-2">
                {todayLesson.content?.slice(0, 120)}...
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  4 min read
                </span>
                
                <Link
                  to="/dashboard/course"
                  className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-black/90 transition-colors"
                >
                  Start Lesson
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ) : userCourse ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-[#fda4af] to-[#fb7185]" />
            <div className="p-6 text-center py-8">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h2 className="text-xl font-bold text-black mb-2">Welcome to Your Course</h2>
              <p className="text-gray-500 mb-4">Start your journey with Day 0</p>
              <Link
                to="/dashboard/course"
                className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-black/90 transition-colors"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : null}

        {/* Checked in success state */}
        {hasCheckedInToday && (
          <div className="bg-white rounded-2xl border border-green-200 shadow-sm p-5 bg-green-50/50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-green-700">Today's Check-In Complete</p>
                <p className="text-sm text-gray-500">Come back tomorrow to continue your streak</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/dashboard/coach" className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
            {/* Purple gradient bar */}
            <div className="h-1 bg-gradient-to-r from-[#c4b5fd] to-[#a78bfa]" />
            <div className="p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-1">AI Coach</h3>
                  <p className="text-sm text-gray-500">
                    Ask anything about your course
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/dashboard/protocol" className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
            {/* Orange gradient bar */}
            <div className="h-1 bg-gradient-to-r from-[#fdba74] to-[#fb923c]" />
            <div className="p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                  <ClipboardList className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-black mb-1">My Plan</h3>
                  <p className="text-sm text-gray-500">
                    View peptides, schedule & guides
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Milestones */}
        {userCourse && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-black mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              Milestones
            </h3>
            <div className="space-y-3">
              {milestones.map((milestone) => (
                <div 
                  key={milestone.id}
                  className="flex items-center gap-3"
                >
                  {milestone.completed ? (
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center animate-check-in">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                      <Circle className="w-3 h-3 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${
                      milestone.completed ? 'text-black' : 'text-gray-500'
                    }`}>
                      {milestone.title}
                    </p>
                  </div>
                  <span className={`text-xs ${
                    milestone.completed ? 'text-green-600' : 'text-gray-400'
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
          <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-8 text-center">
            <h3 className="font-semibold text-lg text-black mb-2">No Course Yet</h3>
            <p className="text-gray-500 mb-4">
              Take our quick quiz to get a personalized peptide course.
            </p>
            <Button onClick={() => navigate("/quiz")} className="bg-black text-white hover:bg-black/90 font-semibold rounded-lg">
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
