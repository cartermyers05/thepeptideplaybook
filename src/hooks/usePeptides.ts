import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Peptide {
  id: string;
  name: string;
  slug: string;
  category: string;
  primary_use: string;
  research_status: "strong" | "moderate" | "limited" | "emerging";
  fda_status: "FDA Approved" | "Category 2" | "Under Review" | "Not Regulated";
  mechanism: string;
  studies: string;
  safety: string;
  related_peptides: string[];
  total_study_count?: number;
  human_study_count?: number;
  created_at: string;
  updated_at: string;
}

export interface PeptideFilters {
  search?: string;
  category?: string;
  researchStatus?: string;
  fdaStatus?: string;
}

export function usePeptides(filters?: PeptideFilters) {
  return useQuery({
    queryKey: ["peptides", filters],
    queryFn: async () => {
      let query = supabase
        .from("peptides")
        .select("*")
        .order("name", { ascending: true });

      if (filters?.category && filters.category !== "all") {
        query = query.eq("category", filters.category);
      }

      if (filters?.researchStatus && filters.researchStatus !== "all") {
        query = query.eq("research_status", filters.researchStatus);
      }

      if (filters?.fdaStatus && filters.fdaStatus !== "all") {
        query = query.eq("fda_status", filters.fdaStatus);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Client-side search filter
      let results = data as Peptide[];
      
      if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        results = results.filter(
          (p) =>
            p.name.toLowerCase().includes(searchLower) ||
            p.primary_use.toLowerCase().includes(searchLower) ||
            p.category.toLowerCase().includes(searchLower)
        );
      }

      return results;
    },
  });
}

export function usePeptide(slug: string) {
  return useQuery({
    queryKey: ["peptide", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("peptides")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) throw error;
      return data as Peptide;
    },
    enabled: !!slug,
  });
}
