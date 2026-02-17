import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface WeeklyReview {
  id: string;
  user_id: string;
  protocol_id: string;
  week_number: number;
  insights: { text: string; category: string }[];
  mood: "green" | "yellow" | "red";
  recommendation: string;
  full_analysis: string;
  generated_at: string;
}

export function useWeeklyReview(protocolId: string | undefined, weekNumber: number | null) {
  const { user } = useAuth();

  const query = useQuery({
    queryKey: ["weekly-review", user?.id, protocolId, weekNumber],
    queryFn: async (): Promise<WeeklyReview | null> => {
      const { data, error } = await (supabase as any)
        .from("weekly_reviews")
        .select("*")
        .eq("user_id", user!.id)
        .eq("protocol_id", protocolId)
        .eq("week_number", weekNumber)
        .maybeSingle();

      if (error) throw error;
      return data as WeeklyReview | null;
    },
    enabled: !!user?.id && !!protocolId && !!weekNumber,
  });

  return query;
}

export function useGenerateWeeklyReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { protocol_id: string; week_number: number; force?: boolean }) => {
      const { data, error } = await supabase.functions.invoke("generate-weekly-review", {
        body: params,
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data as WeeklyReview;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["weekly-review"] });
    },
  });
}
