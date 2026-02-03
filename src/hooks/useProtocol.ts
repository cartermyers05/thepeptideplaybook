import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import type { Json } from "@/integrations/supabase/types";

export interface Peptide {
  name: string;
  purpose: string;
  dosage: string;
  frequency: string;
  timing: string;
}

export interface Protocol {
  id: string;
  user_id: string;
  goal: string;
  protocol_name: string;
  peptides: Peptide[];
  cycle_length_weeks: number;
  current_day: number;
  current_week: number;
  status: "not_started" | "active" | "paused" | "completed";
  started_at: string | null;
  created_at: string;
  updated_at: string;
}

// Protocol templates based on quiz goals
const PROTOCOL_TEMPLATES: Record<string, { name: string; peptides: Peptide[]; weeks: number }> = {
  fat_loss: {
    name: "GLP-1 Weight Management Protocol",
    weeks: 8,
    peptides: [
      {
        name: "Semaglutide",
        purpose: "Appetite suppression & fat metabolism",
        dosage: "0.25mg → 1mg weekly",
        frequency: "Once per week",
        timing: "Same day each week, any time",
      },
      {
        name: "BPC-157",
        purpose: "Gut health & recovery support",
        dosage: "250mcg",
        frequency: "Daily",
        timing: "Morning, empty stomach",
      },
    ],
  },
  muscle_recovery: {
    name: "Performance & Recovery Stack",
    weeks: 8,
    peptides: [
      {
        name: "BPC-157",
        purpose: "Tissue repair & recovery",
        dosage: "250-500mcg",
        frequency: "Daily",
        timing: "Post-workout or morning",
      },
      {
        name: "TB-500",
        purpose: "Systemic healing & flexibility",
        dosage: "2.5mg",
        frequency: "2x per week",
        timing: "Any time, consistent days",
      },
    ],
  },
  injury_recovery: {
    name: "Injury Healing Focus Protocol",
    weeks: 6,
    peptides: [
      {
        name: "BPC-157",
        purpose: "Local tissue repair",
        dosage: "250mcg",
        frequency: "2x daily",
        timing: "Morning and evening, near injury site",
      },
      {
        name: "TB-500",
        purpose: "Systemic healing support",
        dosage: "2.5mg",
        frequency: "2x per week",
        timing: "Any consistent days",
      },
    ],
  },
  anti_aging: {
    name: "Longevity & Vitality Stack",
    weeks: 12,
    peptides: [
      {
        name: "Epithalon",
        purpose: "Telomere support & cellular health",
        dosage: "5mg",
        frequency: "Daily for 10 days, repeat every 6 months",
        timing: "Evening, before bed",
      },
      {
        name: "GHK-Cu",
        purpose: "Skin regeneration & collagen",
        dosage: "200mcg",
        frequency: "Daily",
        timing: "Morning",
      },
    ],
  },
  cognitive: {
    name: "Cognitive Enhancement Stack",
    weeks: 8,
    peptides: [
      {
        name: "Semax",
        purpose: "Focus & mental clarity",
        dosage: "200-600mcg",
        frequency: "Daily",
        timing: "Morning, intranasal",
      },
      {
        name: "Selank",
        purpose: "Anxiety reduction & mood",
        dosage: "250-500mcg",
        frequency: "Daily",
        timing: "Morning or as needed, intranasal",
      },
    ],
  },
  general_wellness: {
    name: "Beginner Wellness Protocol",
    weeks: 6,
    peptides: [
      {
        name: "BPC-157",
        purpose: "Overall healing & gut health",
        dosage: "250mcg",
        frequency: "Daily",
        timing: "Morning, empty stomach",
      },
    ],
  },
};

export function useProtocol() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: protocol, isLoading, error } = useQuery({
    queryKey: ["protocol", user?.id],
    queryFn: async (): Promise<Protocol | null> => {
      if (!user?.id) return null;

      const { data, error } = await supabase
        .from("protocols")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      return {
        ...data,
        peptides: (data.peptides as unknown as Peptide[]) || [],
        status: (data.status as Protocol["status"]) || "not_started",
        current_day: data.current_day || 0,
        current_week: data.current_week || 1,
      } as Protocol;
    },
    enabled: !!user?.id,
  });

  const createProtocol = useMutation({
    mutationFn: async (goal: string): Promise<Protocol> => {
      if (!user?.id) throw new Error("User not authenticated");

      const template = PROTOCOL_TEMPLATES[goal] || PROTOCOL_TEMPLATES.general_wellness;

      const { data, error } = await supabase
        .from("protocols")
        .insert({
          user_id: user.id,
          goal,
          protocol_name: template.name,
          peptides: template.peptides as unknown as Json,
          cycle_length_weeks: template.weeks,
          status: "not_started",
          current_day: 0,
          current_week: 1,
        })
        .select()
        .single();

      if (error) throw error;

      return {
        ...data,
        peptides: template.peptides,
        status: "not_started" as const,
        current_day: 0,
        current_week: 1,
      } as Protocol;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["protocol", user?.id] });
    },
  });

  const startProtocol = useMutation({
    mutationFn: async (protocolId: string) => {
      const { error } = await supabase
        .from("protocols")
        .update({
          status: "active",
          started_at: new Date().toISOString(),
          current_day: 1,
          current_week: 1,
        })
        .eq("id", protocolId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["protocol", user?.id] });
    },
  });

  const pauseProtocol = useMutation({
    mutationFn: async (protocolId: string) => {
      const { error } = await supabase
        .from("protocols")
        .update({ status: "paused" })
        .eq("id", protocolId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["protocol", user?.id] });
    },
  });

  const resumeProtocol = useMutation({
    mutationFn: async (protocolId: string) => {
      const { error } = await supabase
        .from("protocols")
        .update({ status: "active" })
        .eq("id", protocolId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["protocol", user?.id] });
    },
  });

  return {
    protocol,
    isLoading,
    error,
    createProtocol,
    startProtocol,
    pauseProtocol,
    resumeProtocol,
  };
}
