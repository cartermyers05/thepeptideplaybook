import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface QuizResponse {
  id: string;
  primary_goal: string;
  age_range: string | null;
  experience_level: string;
  main_concerns: string[];
  timeline: string;
  created_at: string | null;
}

export function useQuizResponse() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["quiz-response", user?.id],
    queryFn: async (): Promise<QuizResponse | null> => {
      if (!user?.id) return null;

      const { data, error } = await supabase
        .from("quiz_responses")
        .select("id, primary_goal, age_range, experience_level, main_concerns, timeline, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Error fetching quiz response:", error);
        return null;
      }

      return data;
    },
    enabled: !!user?.id,
  });
}
