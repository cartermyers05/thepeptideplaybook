import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Lock, Play, ChevronDown, ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useCourse } from "@/hooks/useCourse";
import { useLessons } from "@/hooks/useLessons";
import { getGoalTheme } from "@/lib/goalThemes";

interface Lesson {
  day: number;
  phase: string;
  title: string;
  content: string;
  action_item: string;
}

export default function CourseLessons() {
  const { userCourse, progressPercent, advanceDay } = useCourse();
  const { isDayCompleted, completeLesson } = useLessons(userCourse?.id);
  
  // Get goal-based theme
  const goalTheme = getGoalTheme(userCourse?.goal);
  const GoalIcon = goalTheme.Icon;
  
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set(['Preparation', 'Getting Started']));

  if (!userCourse) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-gray-500">No blueprint found. Purchase a blueprint to get started.</p>
        </div>
      </DashboardLayout>
    );
  }

  // Group lessons by phase
  const phases = userCourse.lessons.reduce((acc, lesson) => {
    if (!acc[lesson.phase]) {
      acc[lesson.phase] = [];
    }
    acc[lesson.phase].push(lesson);
    return acc;
  }, {} as Record<string, Lesson[]>);

  const togglePhase = (phase: string) => {
    const newExpanded = new Set(expandedPhases);
    if (newExpanded.has(phase)) {
      newExpanded.delete(phase);
    } else {
      newExpanded.add(phase);
    }
    setExpandedPhases(newExpanded);
  };

  const handleCompleteLesson = async () => {
    if (!selectedLesson) return;
    
    await completeLesson.mutateAsync({ day: selectedLesson.day });
    
    // Advance course day if this was the current day
    if (selectedLesson.day === userCourse.current_day) {
      await advanceDay.mutateAsync(userCourse.id);
    }
    
    setSelectedLesson(null);
  };

  const getLessonStatus = (day: number) => {
    if (isDayCompleted(day)) return 'completed';
    if (day === userCourse.current_day) return 'current';
    if (day < userCourse.current_day) return 'available';
    return 'locked';
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto animate-fade-up">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-10 h-10 rounded-xl ${goalTheme.iconBg} flex items-center justify-center`}>
              <GoalIcon className={`w-5 h-5 ${goalTheme.iconColor}`} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-black">{userCourse.title}</h1>
              <p className="text-gray-500 text-sm">{goalTheme.tagline}</p>
            </div>
          </div>
          <p className="text-gray-500 mt-2">
            {userCourse.current_day} of {userCourse.duration_days} lessons complete
          </p>
        </div>

        {/* Progress bar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">Progress</span>
            <span className="text-sm font-bold text-black">{progressPercent}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-500" 
              style={{ 
                width: `${progressPercent}%`,
                background: `linear-gradient(to right, ${goalTheme.gradientFrom}, ${goalTheme.gradientTo})`
              }}
            />
          </div>
        </div>

        {/* Lessons by phase */}
        <div className="space-y-4">
          {Object.entries(phases).map(([phase, lessons]) => {
            const phaseStartDay = Math.min(...lessons.map(l => l.day));
            const phaseEndDay = Math.max(...lessons.map(l => l.day));
            
            return (
              <div key={phase} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Phase header */}
                <button
                  onClick={() => togglePhase(phase)}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <span className="font-semibold text-black">{phase}</span>
                    <span className="text-xs text-gray-400 ml-2">
                      Days {phaseStartDay}-{phaseEndDay}
                    </span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedPhases.has(phase) ? 'rotate-180' : ''}`} />
                </button>

                {/* Lessons */}
                {expandedPhases.has(phase) && (
                  <div className="divide-y divide-gray-100">
                    {lessons.map((lesson) => {
                      const status = getLessonStatus(lesson.day);
                      
                      return (
                        <motion.button
                          key={lesson.day}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          onClick={() => status !== 'locked' && setSelectedLesson(lesson)}
                          disabled={status === 'locked'}
                          className={`w-full flex items-center gap-4 p-4 text-left transition-all ${
                            status === 'locked' 
                              ? 'opacity-50 cursor-not-allowed' 
                              : status === 'current'
                                ? `${goalTheme.accentBg} border-l-[3px]`
                                : status === 'completed'
                                  ? 'border-l-[3px] border-green-500'
                                  : 'hover:bg-gray-50'
                          }`}
                          style={{
                            borderLeftColor: status === 'current' ? goalTheme.progressColor : undefined
                          }}
                        >
                          {/* Status icon */}
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                            status === 'completed' 
                              ? 'bg-green-100 text-green-600'
                              : status === 'current'
                                ? `${goalTheme.iconBg} ${goalTheme.iconColor}`
                                : 'bg-gray-100 text-gray-400'
                          }`}>
                            {status === 'completed' ? (
                              <Check className="w-4 h-4" />
                            ) : status === 'locked' ? (
                              <Lock className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
                          </div>

                          {/* Lesson info */}
                          <div className="flex-1 min-w-0">
                            <div className={`font-medium ${status === 'completed' ? 'text-gray-500' : 'text-black'}`}>
                              Day {lesson.day}: {lesson.title}
                            </div>
                            {status === 'current' && (
                              <span className="text-xs text-gray-500 font-medium">Current lesson</span>
                            )}
                          </div>

                          {/* Action */}
                          {status === 'current' && (
                            <span 
                              className="text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 text-white"
                              style={{ backgroundColor: goalTheme.progressColor }}
                            >
                              Current
                            </span>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lesson modal */}
      <Dialog open={!!selectedLesson} onOpenChange={() => setSelectedLesson(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {selectedLesson && (
            <>
              <DialogHeader>
                <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
                  Day {selectedLesson.day}
                </div>
                <DialogTitle className="text-2xl text-black">
                  {selectedLesson.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="prose prose-sm dark:prose-invert max-w-none mt-4">
                {selectedLesson.content.split('\n').map((paragraph, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed">{paragraph}</p>
                ))}
              </div>

              {/* Action Item */}
              <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-black">Today's Action</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {selectedLesson.action_item}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                {!isDayCompleted(selectedLesson.day) && (
                  <Button 
                    onClick={handleCompleteLesson}
                    disabled={completeLesson.isPending}
                    className="bg-black text-white hover:bg-black/90 flex-1 rounded-lg"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Mark Complete & Continue
                  </Button>
                )}
                <Button variant="outline" onClick={() => setSelectedLesson(null)} className="flex-1 sm:flex-none border-gray-200">
                  Close
                </Button>
              </div>

              {/* Coach prompt */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Link 
                  to="/dashboard/coach"
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Questions about this lesson? Ask AI Coach
                </Link>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
