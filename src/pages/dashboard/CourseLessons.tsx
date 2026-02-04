import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Lock, Play, ChevronDown, ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useCourse } from "@/hooks/useCourse";
import { useLessons } from "@/hooks/useLessons";

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
  
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set(['Preparation', 'Getting Started']));

  if (!userCourse) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-muted-foreground">No course found. Purchase a course to get started.</p>
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
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">{userCourse.title}</h1>
          <p className="text-muted-foreground">
            {userCourse.current_day} of {userCourse.duration_days} lessons complete
          </p>
        </div>

        {/* Progress bar */}
        <div className="card-premium p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm font-bold text-primary">{progressPercent}%</span>
          </div>
          <div className="progress-teal">
            <div 
              className="progress-teal-fill" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Lessons by phase */}
        <div className="space-y-4">
          {Object.entries(phases).map(([phase, lessons]) => {
            const phaseStartDay = Math.min(...lessons.map(l => l.day));
            const phaseEndDay = Math.max(...lessons.map(l => l.day));
            
            return (
              <div key={phase} className="card-premium overflow-hidden">
                {/* Phase header */}
                <button
                  onClick={() => togglePhase(phase)}
                  className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <span className="font-semibold">{phase}</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      Days {phaseStartDay}-{phaseEndDay}
                    </span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${expandedPhases.has(phase) ? 'rotate-180' : ''}`} />
                </button>

                {/* Lessons */}
                {expandedPhases.has(phase) && (
                  <div className="divide-y divide-border">
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
                                ? 'bg-accent border-l-3 border-primary'
                                : status === 'completed'
                                  ? 'border-l-3 border-success'
                                  : 'hover:bg-muted/30'
                          }`}
                        >
                          {/* Status icon */}
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                            status === 'completed' 
                              ? 'bg-success text-white'
                              : status === 'current'
                                ? 'bg-primary text-white'
                                : 'bg-muted text-muted-foreground'
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
                            <div className={`font-medium ${status === 'completed' ? 'text-muted-foreground' : 'text-foreground'}`}>
                              Day {lesson.day}: {lesson.title}
                            </div>
                            {status === 'current' && (
                              <span className="text-xs text-primary font-medium">Current lesson</span>
                            )}
                          </div>

                          {/* Action */}
                          {status === 'current' && (
                            <span className="btn-teal text-sm px-4 py-2 flex items-center gap-1.5">
                              Continue
                              <ArrowRight className="w-3 h-3" />
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
                <div className="text-xs font-medium text-primary uppercase tracking-wide mb-1">
                  Day {selectedLesson.day}
                </div>
                <DialogTitle className="text-2xl">
                  {selectedLesson.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="prose prose-sm dark:prose-invert max-w-none mt-4">
                {selectedLesson.content.split('\n').map((paragraph, i) => (
                  <p key={i} className="text-foreground/90 leading-relaxed">{paragraph}</p>
                ))}
              </div>

              {/* Action Item */}
              <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">Today's Action</p>
                    <p className="text-sm text-muted-foreground mt-1">
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
                    className="btn-teal flex-1"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Mark Complete & Continue
                  </Button>
                )}
                <Button variant="outline" onClick={() => setSelectedLesson(null)} className="flex-1 sm:flex-none">
                  Close
                </Button>
              </div>

              {/* Coach prompt */}
              <div className="mt-4 pt-4 border-t border-border">
                <Link 
                  to="/dashboard/coach"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
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
