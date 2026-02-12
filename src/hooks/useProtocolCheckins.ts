import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface ProtocolCheckin {
  id: string;
  user_id: string;
  protocol_progress_id: string;
  week_number: number;
  weight_lbs: number | null;
  symptom_rating: number | null;
  energy_rating: number | null;
  notes: string | null;
  created_at: string;
}

export function useCurrentWeekCheckin(progressId: string | undefined, weekNumber: number) {
  return useQuery({
    queryKey: ["protocol-checkin", progressId, weekNumber],
    queryFn: async (): Promise<ProtocolCheckin | null> => {
      const { data, error } = await (supabase as any)
        .from("protocol_checkins")
        .select("*")
        .eq("protocol_progress_id", progressId)
        .eq("week_number", weekNumber)
        .maybeSingle();
      if (error) throw error;
      return data as ProtocolCheckin | null;
    },
    enabled: !!progressId && weekNumber > 0,
  });
}

export function useAllCheckins(progressId: string | undefined) {
  return useQuery({
    queryKey: ["protocol-checkins-all", progressId],
    queryFn: async (): Promise<ProtocolCheckin[]> => {
      const { data, error } = await (supabase as any)
        .from("protocol_checkins")
        .select("*")
        .eq("protocol_progress_id", progressId)
        .order("week_number", { ascending: true });
      if (error) throw error;
      return (data || []) as ProtocolCheckin[];
    },
    enabled: !!progressId,
  });
}

export function useLastLoggedWeight(progressId: string | undefined) {
  return useQuery({
    queryKey: ["protocol-checkin-last-weight", progressId],
    queryFn: async (): Promise<number | null> => {
      const { data, error } = await (supabase as any)
        .from("protocol_checkins")
        .select("weight_lbs")
        .eq("protocol_progress_id", progressId)
        .not("weight_lbs", "is", null)
        .order("week_number", { ascending: false })
        .limit(1);
      if (error) throw error;
      return data?.[0]?.weight_lbs ?? null;
    },
    enabled: !!progressId,
  });
}

export function useSubmitCheckin() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (params: {
      id?: string;
      protocol_progress_id: string;
      week_number: number;
      weight_lbs?: number | null;
      symptom_rating?: number | null;
      energy_rating?: number | null;
      notes?: string | null;
    }) => {
      if (params.id) {
        // Update existing
        const { error } = await (supabase as any)
          .from("protocol_checkins")
          .update({
            weight_lbs: params.weight_lbs ?? null,
            symptom_rating: params.symptom_rating ?? null,
            energy_rating: params.energy_rating ?? null,
            notes: params.notes ?? null,
          })
          .eq("id", params.id);
        if (error) throw error;
      } else {
        // Insert new
        const { error } = await (supabase as any)
          .from("protocol_checkins")
          .insert({
            user_id: user!.id,
            protocol_progress_id: params.protocol_progress_id,
            week_number: params.week_number,
            weight_lbs: params.weight_lbs ?? null,
            symptom_rating: params.symptom_rating ?? null,
            energy_rating: params.energy_rating ?? null,
            notes: params.notes ?? null,
          });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["protocol-checkin"] });
      queryClient.invalidateQueries({ queryKey: ["protocol-checkins-all"] });
      queryClient.invalidateQueries({ queryKey: ["protocol-checkin-last-weight"] });
    },
  });
}
