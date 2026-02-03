import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Lock, Play, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
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
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{userCourse.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{userCourse.current_day} of {userCourse.duration_days} days complete</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        {/* Lessons by phase */}
        <div className="space-y-4">
          {Object.entries(phases).map(([phase, lessons]) => (
            <div key={phase} className="rounded-xl border border-border overflow-hidden">
              {/* Phase header */}
              <button
                onClick={() => togglePhase(phase)}
                className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <span className="font-semibold">{phase}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${expandedPhases.has(phase) ? 'rotate-180' : ''}`} />
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
                        className={`w-full flex items-center gap-4 p-4 text-left transition-colors ${
                          status === 'locked' 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'hover:bg-muted/30'
                        }`}
                      >
                        {/* Status icon */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          status === 'completed' 
                            ? 'bg-primary text-primary-foreground'
                            : status === 'current'
                              ? 'bg-primary/20 text-primary'
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
                          <div className="font-medium truncate">
                            Day {lesson.day}: {lesson.title}
                          </div>
                          {status === 'current' && (
                            <span className="text-xs text-primary">Current lesson</span>
                          )}
                        </div>

                        {/* Status badge */}
                        {status === 'current' && (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-primary text-primary-foreground">
                            Start
                          </span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lesson modal */}
      <Dialog open={!!selectedLesson} onOpenChange={() => setSelectedLesson(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedLesson && (
            <>
              <DialogHeader>
                <DialogTitle>
                  Day {selectedLesson.day}: {selectedLesson.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {selectedLesson.content.split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="action-item"
                    checked={isDayCompleted(selectedLesson.day)}
                    disabled={isDayCompleted(selectedLesson.day)}
                  />
                  <div>
                    <label htmlFor="action-item" className="font-medium text-sm">
                      Action Item
                    </label>
                    <p className="text-sm text-muted-foreground">
                      {selectedLesson.action_item}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <Button variant="outline" onClick={() => setSelectedLesson(null)}>
                  Close
                </Button>
                {!isDayCompleted(selectedLesson.day) && (
                  <Button 
                    onClick={handleCompleteLesson}
                    disabled={completeLesson.isPending}
                  >
                    Mark Complete
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
