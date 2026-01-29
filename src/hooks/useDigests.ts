import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface DigestSource {
  title: string;
  url: string;
}

export interface ResearchDigest {
  id: string;
  month: string;
  date: string;
  highlights: string[];
  full_content: string;
  sources: DigestSource[];
  published_at: string | null;
  created_at: string;
}

export function useDigests() {
  return useQuery({
    queryKey: ["research-digests"],
    queryFn: async (): Promise<ResearchDigest[]> => {
      const { data, error } = await supabase
        .from("research_digests")
        .select("*")
        .not("published_at", "is", null)
        .order("date", { ascending: false });

      if (error) {
        console.error("Error fetching digests:", error);
        throw error;
      }

      // Transform the data to match our interface
      return (data || []).map((digest) => ({
        id: digest.id,
        month: digest.month,
        date: digest.date,
        highlights: (digest.highlights as unknown as string[]) || [],
        full_content: digest.full_content,
        sources: (digest.sources as unknown as DigestSource[]) || [],
        published_at: digest.published_at,
        created_at: digest.created_at,
      }));
    },
  });
}

export function useLatestDigest() {
  return useQuery({
    queryKey: ["latest-digest"],
    queryFn: async (): Promise<ResearchDigest | null> => {
      const { data, error } = await supabase
        .from("research_digests")
        .select("*")
        .not("published_at", "is", null)
        .order("date", { ascending: false })
        .limit(1)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          // No rows returned
          return null;
        }
        console.error("Error fetching latest digest:", error);
        throw error;
      }

      return {
        id: data.id,
        month: data.month,
        date: data.date,
        highlights: (data.highlights as unknown as string[]) || [],
        full_content: data.full_content,
        sources: (data.sources as unknown as DigestSource[]) || [],
        published_at: data.published_at,
        created_at: data.created_at,
      };
    },
  });
}
