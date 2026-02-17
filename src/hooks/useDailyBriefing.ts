import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface DailyBriefing {
  id: string;
  user_id: string;
  briefing_date: string;
  content: string;
  compound_tips: { compound: string; tip: string }[];
  data_highlight: string;
  created_at: string;
}

export function useDailyBriefing() {
  const { user } = useAuth();
  const today = new Date().toISOString().split("T")[0];

  return useQuery({
    queryKey: ["daily-briefing", user?.id, today],
    queryFn: async (): Promise<DailyBriefing | null> => {
      const { data, error } = await (supabase as any)
        .from("daily_briefings")
        .select("*")
        .eq("user_id", user!.id)
        .eq("briefing_date", today)
        .maybeSingle();

      if (error) throw error;
      return data as DailyBriefing | null;
    },
    enabled: !!user?.id,
  });
}

export function useGenerateDailyBriefing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      protocol_id: string;
      today_compounds: { name: string }[];
      week_number: number;
      cycle_length_weeks: number;
    }) => {
      const { data, error } = await supabase.functions.invoke("generate-daily-briefing", {
        body: params,
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data as DailyBriefing;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["daily-briefing"] });
    },
  });
}
