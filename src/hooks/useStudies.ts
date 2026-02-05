import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Study {
  id: string;
  pubmed_id: string | null;
  doi: string | null;
  title: string;
  authors: string[] | null;
  journal: string;
  publication_year: number;
  publication_date: string | null;
  study_type: string;
  species: string[] | null;
  sample_size: number | null;
  abstract: string | null;
  key_findings: string;
  dosing_info: string | null;
  safety_findings: string | null;
  peptide_names: string[];
  research_areas: string[] | null;
  evidence_level: "high" | "moderate" | "low" | "very_low" | null;
  is_landmark_study: boolean;
  pubmed_url: string | null;
  full_text_url: string | null;
  created_at: string;
  updated_at: string;
  verified_at: string | null;
  verified_by: string | null;
}

export interface StudyFilters {
  search?: string;
  peptideName?: string;
  studyType?: string;
  evidenceLevel?: string;
  species?: string;
  researchArea?: string;
  yearFrom?: number;
  yearTo?: number;
  landmarkOnly?: boolean;
}

export function useStudies(filters?: StudyFilters) {
  return useQuery({
    queryKey: ["studies", filters],
    queryFn: async () => {
      let query = supabase
        .from("studies")
        .select("*")
        .order("publication_year", { ascending: false });

      // Filter by peptide name (array contains)
      if (filters?.peptideName && filters.peptideName !== "all") {
        query = query.contains("peptide_names", [filters.peptideName]);
      }

      // Filter by study type
      if (filters?.studyType && filters.studyType !== "all") {
        query = query.eq("study_type", filters.studyType);
      }

      // Filter by evidence level
      if (filters?.evidenceLevel && filters.evidenceLevel !== "all") {
        query = query.eq("evidence_level", filters.evidenceLevel);
      }

      // Filter by species
      if (filters?.species && filters.species !== "all") {
        query = query.contains("species", [filters.species]);
      }

      // Filter by year range
      if (filters?.yearFrom) {
        query = query.gte("publication_year", filters.yearFrom);
      }
      if (filters?.yearTo) {
        query = query.lte("publication_year", filters.yearTo);
      }

      // Filter landmark studies only
      if (filters?.landmarkOnly) {
        query = query.eq("is_landmark_study", true);
      }

      const { data, error } = await query;

      if (error) throw error;

      let results = data as Study[];

      // Client-side search filter (for title, abstract, key_findings)
      if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        results = results.filter(
          (s) =>
            s.title.toLowerCase().includes(searchLower) ||
            s.key_findings.toLowerCase().includes(searchLower) ||
            s.journal.toLowerCase().includes(searchLower) ||
            (s.abstract && s.abstract.toLowerCase().includes(searchLower))
        );
      }

      // Client-side research area filter
      if (filters?.researchArea && filters.researchArea !== "all") {
        results = results.filter(
          (s) => s.research_areas?.includes(filters.researchArea!)
        );
      }

      return results;
    },
  });
}

// Hook to fetch studies for a specific peptide
export function usePeptideStudies(peptideName: string) {
  return useQuery({
    queryKey: ["peptide-studies", peptideName],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("studies")
        .select("*")
        .contains("peptide_names", [peptideName])
        .order("is_landmark_study", { ascending: false })
        .order("evidence_level", { ascending: true })
        .order("publication_year", { ascending: false });

      if (error) throw error;
      return data as Study[];
    },
    enabled: !!peptideName,
  });
}

// Hook to get study counts for peptides
export function useStudyCounts() {
  return useQuery({
    queryKey: ["study-counts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("peptides")
        .select("name, total_study_count, human_study_count");

      if (error) throw error;
      
      const counts: Record<string, { total: number; human: number }> = {};
      data?.forEach((p) => {
        counts[p.name] = {
          total: p.total_study_count || 0,
          human: p.human_study_count || 0,
        };
      });
      return counts;
    },
  });
}

// Hook to fetch a single study by ID
export function useStudy(id: string) {
  return useQuery({
    queryKey: ["study", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("studies")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Study;
    },
    enabled: !!id,
  });
}
