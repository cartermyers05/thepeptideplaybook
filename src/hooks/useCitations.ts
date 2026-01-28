import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface AICitation {
  id: string;
  article_id: string;
  ai_engine: string;
  query: string;
  citation_position: number | null;
  referrer_url: string | null;
  created_at: string;
}

interface CitationsFilter {
  article_id?: string;
  ai_engine?: string;
  start_date?: string;
  end_date?: string;
}

export function useCitations(filter?: CitationsFilter) {
  return useQuery({
    queryKey: ["citations", filter],
    queryFn: async () => {
      let query = supabase
        .from("ai_citations")
        .select("*")
        .order("created_at", { ascending: false });

      if (filter?.article_id) {
        query = query.eq("article_id", filter.article_id);
      }
      if (filter?.ai_engine) {
        query = query.eq("ai_engine", filter.ai_engine);
      }
      if (filter?.start_date) {
        query = query.gte("created_at", filter.start_date);
      }
      if (filter?.end_date) {
        query = query.lte("created_at", filter.end_date);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as AICitation[];
    },
  });
}

export function useCitationStats() {
  return useQuery({
    queryKey: ["citation-stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ai_citations")
        .select("ai_engine, created_at");

      if (error) throw error;

      // Group by engine
      const byEngine: Record<string, number> = {};
      const byDate: Record<string, number> = {};
      
      (data || []).forEach((citation) => {
        byEngine[citation.ai_engine] = (byEngine[citation.ai_engine] || 0) + 1;
        const date = citation.created_at.split("T")[0];
        byDate[date] = (byDate[date] || 0) + 1;
      });

      return {
        total: data?.length || 0,
        byEngine,
        byDate,
      };
    },
  });
}

export function useTrackCitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (citation: {
      article_id: string;
      ai_engine: string;
      query: string;
      citation_position?: number;
      referrer_url?: string;
    }) => {
      const { error } = await supabase.from("ai_citations").insert(citation);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["citations"] });
      queryClient.invalidateQueries({ queryKey: ["citation-stats"] });
    },
  });
}

export function useTopCitedArticles(limit = 10) {
  return useQuery({
    queryKey: ["top-cited-articles", limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("id, slug, title, citation_count")
        .eq("status", "published")
        .order("citation_count", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    },
  });
}
