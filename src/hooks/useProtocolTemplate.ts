import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ProtocolTemplateSection {
  section_number: number;
  title: string;
  default_open: boolean;
  content: string;
}

export interface ProtocolTemplate {
  id: string;
  peptide_slug: string;
  goal_slug: string;
  protocol_name: string;
  peptide_display_name: string;
  evidence_level: number;
  evidence_description: string;
  last_updated: string;
  sections: ProtocolTemplateSection[];
  created_at: string;
  updated_at: string;
}

export function useProtocolTemplate(peptideSlug: string, goalSlug: string) {
  return useQuery({
    queryKey: ["protocol-template", peptideSlug, goalSlug],
    queryFn: async (): Promise<ProtocolTemplate | null> => {
      const { data, error } = await (supabase as any)
        .from("protocol_templates")
        .select("*")
        .eq("peptide_slug", peptideSlug)
        .eq("goal_slug", goalSlug)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      return {
        ...data,
        sections: (data.sections as ProtocolTemplateSection[]) || [],
      } as ProtocolTemplate;
    },
    enabled: !!peptideSlug && !!goalSlug,
  });
}
