import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface ProtocolProgress {
  id: string;
  user_id: string;
  protocol_template_id: string;
  peptide_slug: string;
  goal_slug: string;
  start_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface WeeklyContent {
  id: string;
  peptide_slug: string;
  week_number: number;
  title: string;
  content: string;
  dose_info: string | null;
  dose_change: boolean;
  new_dose: string | null;
  previous_dose: string | null;
  alert_message: string | null;
  phase_name: string | null;
}

export function computeCurrentWeek(startDate: string): number {
  const start = new Date(startDate + "T00:00:00");
  const now = Date.now();
  return Math.floor((now - start.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;
}

export function useProtocolProgress(templateId: string | undefined, peptideSlug: string, goalSlug: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["protocol-progress", user?.id, templateId],
    queryFn: async (): Promise<ProtocolProgress | null> => {
      const { data, error } = await (supabase as any)
        .from("protocol_progress")
        .select("*")
        .eq("user_id", user!.id)
        .eq("protocol_template_id", templateId)
        .in("status", ["active", "paused"])
        .maybeSingle();

      if (error) throw error;
      return data as ProtocolProgress | null;
    },
    enabled: !!user?.id && !!templateId,
  });
}

export function useWeeklyContent(peptideSlug: string, weekNumber: number) {
  return useQuery({
    queryKey: ["weekly-content", peptideSlug, weekNumber],
    queryFn: async (): Promise<WeeklyContent | null> => {
      // Clamp to max 20 for now
      const week = Math.min(Math.max(weekNumber, 1), 20);
      const { data, error } = await (supabase as any)
        .from("protocol_weekly_content")
        .select("*")
        .eq("peptide_slug", peptideSlug)
        .eq("week_number", week)
        .maybeSingle();

      if (error) throw error;
      return data as WeeklyContent | null;
    },
    enabled: !!peptideSlug && weekNumber > 0,
  });
}

export function useStartTracking() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (params: {
      protocol_template_id: string;
      peptide_slug: string;
      goal_slug: string;
      start_date: string;
    }) => {
      const { error } = await (supabase as any)
        .from("protocol_progress")
        .insert({
          user_id: user!.id,
          protocol_template_id: params.protocol_template_id,
          peptide_slug: params.peptide_slug,
          goal_slug: params.goal_slug,
          start_date: params.start_date,
          status: "active",
        });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["protocol-progress"] });
    },
  });
}

export function usePauseTracking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (progressId: string) => {
      const { error } = await (supabase as any)
        .from("protocol_progress")
        .update({ status: "paused" })
        .eq("id", progressId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["protocol-progress"] });
    },
  });
}

export function useResumeTracking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (progressId: string) => {
      const { error } = await (supabase as any)
        .from("protocol_progress")
        .update({ status: "active" })
        .eq("id", progressId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["protocol-progress"] });
    },
  });
}

// Find next dose change week from weekly content
export function useNextMilestone(peptideSlug: string, currentWeek: number) {
  return useQuery({
    queryKey: ["next-milestone", peptideSlug, currentWeek],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("protocol_weekly_content")
        .select("week_number, new_dose")
        .eq("peptide_slug", peptideSlug)
        .eq("dose_change", true)
        .gt("week_number", currentWeek)
        .order("week_number", { ascending: true })
        .limit(1);

      if (error) throw error;
      if (data && data.length > 0) {
        const weeksAway = data[0].week_number - currentWeek;
        return `Next increase → ${data[0].new_dose} in ${weeksAway} week${weeksAway !== 1 ? "s" : ""}`;
      }
      return "You've reached your maintenance dose";
    },
    enabled: !!peptideSlug && currentWeek > 0,
  });
}
