import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface LessonProgress {
  id: string;
  user_id: string;
  course_id: string;
  day: number;
  completed: boolean;
  completed_at: string | null;
  notes: string | null;
}

export function useLessons(courseId: string | undefined) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch all lesson progress for a course
  const { data: lessonProgress, isLoading } = useQuery({
    queryKey: ["lesson-progress", courseId],
    queryFn: async () => {
      if (!courseId || !user?.id) return [];
      
      const { data, error } = await supabase
        .from("lesson_progress")
        .select("*")
        .eq("course_id", courseId)
        .eq("user_id", user.id)
        .order("day", { ascending: true });

      if (error) throw error;
      return data as LessonProgress[];
    },
    enabled: !!courseId && !!user?.id,
  });

  // Check if a specific day is completed
  const isDayCompleted = (day: number) => {
    return lessonProgress?.some(p => p.day === day && p.completed) ?? false;
  };

  // Complete a lesson
  const completeLesson = useMutation({
    mutationFn: async ({ day, notes }: { day: number; notes?: string }) => {
      if (!courseId || !user?.id) throw new Error("Missing course or user");

      const { error } = await supabase
        .from("lesson_progress")
        .upsert({
          user_id: user.id,
          course_id: courseId,
          day,
          completed: true,
          completed_at: new Date().toISOString(),
          notes,
        }, {
          onConflict: 'user_id,course_id,day'
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lesson-progress", courseId] });
      toast.success("Lesson completed!");
    },
    onError: (error) => {
      toast.error("Failed to complete lesson");
      console.error(error);
    },
  });

  // Get completed days count
  const completedDays = lessonProgress?.filter(p => p.completed).length ?? 0;

  // Calculate streak (consecutive days completed)
  const calculateStreak = () => {
    if (!lessonProgress?.length) return 0;
    
    const completedDaysSet = new Set(
      lessonProgress.filter(p => p.completed).map(p => p.day)
    );
    
    let streak = 0;
    for (let i = 0; i < 1000; i++) {
      if (completedDaysSet.has(i)) {
        streak++;
      } else if (streak > 0) {
        break;
      }
    }
    return streak;
  };

  return {
    lessonProgress,
    isLoading,
    isDayCompleted,
    completeLesson,
    completedDays,
    streak: calculateStreak(),
  };
}
