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
  site?: string;
  rationale?: string;
}

export interface Protocol {
  id: string;
  user_id: string;
  goal: string;
  secondary_goals?: string[];
  user_context?: string;
  experience_level?: string;
  constraints?: string[];
  protocol_name: string;
  peptides: Peptide[];
  cycle_length_weeks: number;
  current_day: number;
  current_week: number;
  status: "not_started" | "active" | "paused" | "completed";
  started_at: string | null;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// Protocol templates based on quiz goals - Updated per product rebuild spec
const PROTOCOL_TEMPLATES: Record<string, { name: string; peptides: Peptide[]; weeks: number; notes: string }> = {
  fat_loss: {
    name: "Fat Loss Protocol",
    weeks: 8,
    notes: "Start low, increase gradually. Nausea is common first 2 weeks.",
    peptides: [
      {
        name: "Semaglutide",
        purpose: "Appetite regulation, metabolic optimization",
        dosage: "Start 0.25mg, increase to 0.5mg week 3, 1mg week 5",
        frequency: "Once weekly",
        timing: "Same day each week, morning",
        site: "Subcutaneous, abdomen or thigh",
      },
    ],
  },
  muscle_recovery: {
    name: "Muscle & Recovery Protocol",
    weeks: 8,
    notes: "BPC and TB stack well together. Expect improved recovery by week 2.",
    peptides: [
      {
        name: "BPC-157",
        purpose: "Tissue repair, gut health, recovery",
        dosage: "250mcg",
        frequency: "Twice daily",
        timing: "Morning and post-workout",
        site: "Subcutaneous, near muscle worked or abdomen",
      },
      {
        name: "TB-500",
        purpose: "Systemic healing, flexibility, recovery",
        dosage: "2.5mg",
        frequency: "Twice weekly",
        timing: "Non-consecutive days",
        site: "Subcutaneous, abdomen",
      },
    ],
  },
  injury_recovery: {
    name: "Injury Recovery Protocol",
    weeks: 6,
    notes: "Higher BPC dose for acute injuries. Inject near injury site when possible.",
    peptides: [
      {
        name: "BPC-157",
        purpose: "Localized tissue repair",
        dosage: "250-500mcg",
        frequency: "Twice daily",
        timing: "Morning and evening",
        site: "Subcutaneous, as close to injury as possible",
      },
      {
        name: "TB-500",
        purpose: "Systemic healing support",
        dosage: "2.5mg twice weekly (weeks 1-2), then 2.5mg once weekly",
        frequency: "See dosage",
        timing: "Non-consecutive days",
        site: "Subcutaneous, abdomen",
      },
    ],
  },
  anti_aging: {
    name: "Anti-Aging & Longevity Protocol",
    weeks: 12,
    notes: "Epithalon works in cycles. GHK-Cu has visible skin benefits by week 4.",
    peptides: [
      {
        name: "Epithalon",
        purpose: "Telomere support, cellular health",
        dosage: "5mg",
        frequency: "Once daily for 20 days, then 10 day break, repeat",
        timing: "Evening",
        site: "Subcutaneous, abdomen",
      },
      {
        name: "GHK-Cu",
        purpose: "Skin health, collagen, healing",
        dosage: "1-2mg",
        frequency: "Once daily",
        timing: "Morning",
        site: "Subcutaneous, or topical if using cream",
      },
    ],
  },
  cognitive: {
    name: "Cognitive Enhancement Protocol",
    weeks: 8,
    notes: "Nasal peptides. No injections needed. Effects often felt within days.",
    peptides: [
      {
        name: "Semax",
        purpose: "Focus, memory, neuroprotection",
        dosage: "200-600mcg",
        frequency: "Once daily",
        timing: "Morning",
        site: "Intranasal (nose spray)",
      },
      {
        name: "Selank",
        purpose: "Anxiety reduction, focus, mood",
        dosage: "250-500mcg",
        frequency: "Once daily",
        timing: "Morning or early afternoon",
        site: "Intranasal (nose spray)",
      },
    ],
  },
  general_wellness: {
    name: "Beginner Protocol",
    weeks: 6,
    notes: "The safest starting point. One peptide, once daily, well-researched.",
    peptides: [
      {
        name: "BPC-157",
        purpose: "General healing, gut health, beginner-friendly",
        dosage: "250mcg",
        frequency: "Once daily",
        timing: "Morning, empty stomach",
        site: "Subcutaneous, abdomen",
      },
    ],
  },
};

export function useProtocol() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch single most recent protocol (for backward compatibility)
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

  // Fetch ALL protocols for the user
  const { data: protocols, isLoading: isLoadingProtocols } = useQuery({
    queryKey: ["protocols", user?.id],
    queryFn: async (): Promise<Protocol[]> => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from("protocols")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      return (data || []).map((item) => ({
        ...item,
        peptides: (item.peptides as unknown as Peptide[]) || [],
        status: (item.status as Protocol["status"]) || "not_started",
        current_day: item.current_day || 0,
        current_week: item.current_week || 1,
      })) as Protocol[];
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
    protocols,
    isLoading,
    isLoadingProtocols,
    error,
    createProtocol,
    startProtocol,
    pauseProtocol,
    resumeProtocol,
  };
}
