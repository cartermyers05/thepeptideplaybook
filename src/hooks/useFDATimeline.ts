import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface FDATimelineEvent {
  id: string;
  peptide_name: string;
  event_date: string;
  event_type: string;
  title: string;
  description: string | null;
  status: string;
  source_url: string | null;
  news_article_id: string | null;
  created_at: string;
}

export function useFDATimeline() {
  return useQuery({
    queryKey: ["fda-timeline"],
    queryFn: async (): Promise<FDATimelineEvent[]> => {
      const { data, error } = await (supabase as any)
        .from("fda_timeline_events")
        .select("*")
        .order("event_date", { ascending: true });

      if (error) throw error;
      return (data || []) as FDATimelineEvent[];
    },
    staleTime: 1000 * 60 * 30,
  });
}
