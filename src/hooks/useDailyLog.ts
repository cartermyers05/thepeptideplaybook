import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface DailyLog {
  id: string;
  user_id: string;
  protocol_id: string | null;
  log_date: string;
  actions_completed: Record<string, boolean> | null;
  energy_rating: number | null;
  injection_site_reaction: string | null;
  gi_issues: string | null;
  other_symptoms: string | null;
  notes: string | null;
  photo_front_url: string | null;
  photo_side_url: string | null;
  weight_lbs: number | null;
  measurements: Record<string, any> | null;
  created_at: string;
}

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

export function useTodayLog(protocolId: string | undefined) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["daily-log-today", user?.id, protocolId],
    queryFn: async (): Promise<DailyLog | null> => {
      const { data, error } = await (supabase as any)
        .from("daily_logs")
        .select("*")
        .eq("user_id", user!.id)
        .eq("protocol_id", protocolId)
        .eq("log_date", todayStr())
        .maybeSingle();

      if (error) throw error;
      return data as DailyLog | null;
    },
    enabled: !!user?.id && !!protocolId,
  });
}

export function useAllLogs(protocolId: string | undefined) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["daily-logs-all", user?.id, protocolId],
    queryFn: async (): Promise<DailyLog[]> => {
      const { data, error } = await (supabase as any)
        .from("daily_logs")
        .select("*")
        .eq("user_id", user!.id)
        .eq("protocol_id", protocolId)
        .order("log_date", { ascending: true });

      if (error) throw error;
      return (data || []) as DailyLog[];
    },
    enabled: !!user?.id && !!protocolId,
  });
}

export function useRecentLogs(limit = 7) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["daily-logs-recent", user?.id, limit],
    queryFn: async (): Promise<DailyLog[]> => {
      const { data, error } = await (supabase as any)
        .from("daily_logs")
        .select("*")
        .eq("user_id", user!.id)
        .order("log_date", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return (data || []) as DailyLog[];
    },
    enabled: !!user?.id,
  });
}

export function useUpsertDailyLog() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (params: {
      protocol_id: string;
      log_date?: string;
      actions_completed?: Record<string, boolean>;
      energy_rating?: number;
      injection_site_reaction?: string;
      gi_issues?: string;
      other_symptoms?: string;
      notes?: string;
      weight_lbs?: number;
      photo_front_url?: string;
      photo_side_url?: string;
    }) => {
      const date = params.log_date || todayStr();

      // Check if log exists
      const { data: existing } = await (supabase as any)
        .from("daily_logs")
        .select("id, actions_completed")
        .eq("user_id", user!.id)
        .eq("protocol_id", params.protocol_id)
        .eq("log_date", date)
        .maybeSingle();

      if (existing) {
        // Merge actions_completed
        const mergedActions = params.actions_completed
          ? { ...(existing.actions_completed || {}), ...params.actions_completed }
          : existing.actions_completed;

        const updateData: any = { actions_completed: mergedActions };
        if (params.energy_rating !== undefined) updateData.energy_rating = params.energy_rating;
        if (params.injection_site_reaction !== undefined) updateData.injection_site_reaction = params.injection_site_reaction;
        if (params.gi_issues !== undefined) updateData.gi_issues = params.gi_issues;
        if (params.other_symptoms !== undefined) updateData.other_symptoms = params.other_symptoms;
        if (params.notes !== undefined) updateData.notes = params.notes;
        if (params.weight_lbs !== undefined) updateData.weight_lbs = params.weight_lbs;
        if (params.photo_front_url !== undefined) updateData.photo_front_url = params.photo_front_url;
        if (params.photo_side_url !== undefined) updateData.photo_side_url = params.photo_side_url;

        const { error } = await (supabase as any)
          .from("daily_logs")
          .update(updateData)
          .eq("id", existing.id);

        if (error) throw error;
      } else {
        const { error } = await (supabase as any)
          .from("daily_logs")
          .insert({
            user_id: user!.id,
            protocol_id: params.protocol_id,
            log_date: date,
            actions_completed: params.actions_completed || {},
            energy_rating: params.energy_rating,
            injection_site_reaction: params.injection_site_reaction,
            gi_issues: params.gi_issues,
            other_symptoms: params.other_symptoms,
            notes: params.notes,
            weight_lbs: params.weight_lbs,
            photo_front_url: params.photo_front_url,
            photo_side_url: params.photo_side_url,
          });

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["daily-log-today"] });
      queryClient.invalidateQueries({ queryKey: ["daily-logs-all"] });
      queryClient.invalidateQueries({ queryKey: ["daily-logs-recent"] });
    },
  });
}
