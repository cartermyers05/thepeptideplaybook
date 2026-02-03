import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface Peptide {
  name: string;
  purpose: string;
  dosing_research: string;
  timing: string;
  frequency: string;
  site: string;
  notes: string;
}

interface Lesson {
  day: number;
  phase: string;
  title: string;
  content: string;
  action_item: string;
}

interface UserCourse {
  id: string;
  user_id: string;
  template_id: string;
  goal: string;
  title: string;
  peptides: Peptide[];
  duration_days: number;
  lessons: Lesson[];
  current_day: number;
  status: 'not_started' | 'waiting_supplies' | 'active' | 'completed';
  supplies_status: string | null;
  started_at: string | null;
  purchased_at: string;
  created_at: string;
}

interface CourseTemplate {
  id: string;
  goal: string;
  title: string;
  description: string;
  peptides: Peptide[];
  duration_days: number;
  lessons: Lesson[];
  created_at: string;
}

export function useCourse() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch user's active course
  const { data: userCourse, isLoading: courseLoading } = useQuery({
    queryKey: ["user-course", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from("user_courses")
        .select("*")
        .eq("user_id", user.id)
        .order("purchased_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        return {
          ...data,
          peptides: data.peptides as unknown as Peptide[],
          lessons: data.lessons as unknown as Lesson[],
          status: data.status as UserCourse['status'],
        } as UserCourse;
      }
      return null;
    },
    enabled: !!user?.id,
  });

  // Fetch all user courses
  const { data: allCourses } = useQuery({
    queryKey: ["all-user-courses", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from("user_courses")
        .select("*")
        .eq("user_id", user.id)
        .order("purchased_at", { ascending: false });

      if (error) throw error;
      
      return (data || []).map(course => ({
        ...course,
        peptides: course.peptides as unknown as Peptide[],
        lessons: course.lessons as unknown as Lesson[],
        status: course.status as UserCourse['status'],
      })) as UserCourse[];
    },
    enabled: !!user?.id,
  });

  // Check if user has purchased a specific course
  const hasPurchasedCourse = (goal: string) => {
    return allCourses?.some(course => course.goal === goal);
  };

  // Update course status
  const updateCourseStatus = useMutation({
    mutationFn: async ({ 
      courseId, 
      status, 
      suppliesStatus,
      startedAt 
    }: { 
      courseId: string; 
      status: UserCourse['status'];
      suppliesStatus?: string;
      startedAt?: string;
    }) => {
      const updateData: Record<string, unknown> = { status };
      if (suppliesStatus) updateData.supplies_status = suppliesStatus;
      if (startedAt) updateData.started_at = startedAt;
      
      const { error } = await supabase
        .from("user_courses")
        .update(updateData)
        .eq("id", courseId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-course"] });
      queryClient.invalidateQueries({ queryKey: ["all-user-courses"] });
    },
    onError: (error) => {
      toast.error("Failed to update course status");
      console.error(error);
    },
  });

  // Advance to next day
  const advanceDay = useMutation({
    mutationFn: async (courseId: string) => {
      if (!userCourse) throw new Error("No course found");
      
      const newDay = userCourse.current_day + 1;
      const isCompleted = newDay >= userCourse.duration_days;
      
      const { error } = await supabase
        .from("user_courses")
        .update({ 
          current_day: newDay,
          status: isCompleted ? 'completed' : userCourse.status
        })
        .eq("id", courseId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-course"] });
    },
  });

  // Get today's lesson
  const todaysLesson = userCourse?.lessons?.find(
    (lesson) => lesson.day === userCourse.current_day
  );

  // Get course progress percentage
  const progressPercent = userCourse
    ? Math.round((userCourse.current_day / userCourse.duration_days) * 100)
    : 0;

  return {
    userCourse,
    allCourses,
    courseLoading,
    todaysLesson,
    progressPercent,
    hasPurchasedCourse,
    updateCourseStatus,
    advanceDay,
  };
}

// Hook to fetch course template by goal
export function useCourseTemplate(goal: string) {
  const { data: template, isLoading } = useQuery({
    queryKey: ["course-template", goal],
    queryFn: async () => {
      // Convert URL slug to database goal format
      const dbGoal = goal.replace('-', '_');
      
      const { data, error } = await supabase
        .from("course_templates")
        .select("*")
        .eq("goal", dbGoal)
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        return {
          ...data,
          peptides: data.peptides as unknown as Peptide[],
          lessons: data.lessons as unknown as Lesson[],
        } as CourseTemplate;
      }
      return null;
    },
    enabled: !!goal,
  });

  return { template, isLoading };
}
