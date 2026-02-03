import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { format } from "date-fns";

export interface CheckIn {
  id: string;
  user_id: string;
  protocol_id: string | null;
  date: string;
  completed: boolean;
  injection_done: "yes" | "not_yet" | "skipped" | null;
  energy_level: number | null;
  mood: number | null;
  sleep_quality: number | null;
  side_effects: string[];
  notes: string | null;
  created_at: string;
}

export interface CheckInData {
  injection_done: "yes" | "not_yet" | "skipped";
  energy_level: number;
  mood: number;
  sleep_quality: number;
  side_effects: string[];
  notes?: string;
}

export function useCheckIn() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const today = format(new Date(), "yyyy-MM-dd");

  const { data: todayCheckIn, isLoading: isLoadingToday } = useQuery({
    queryKey: ["check-in", user?.id, today],
    queryFn: async (): Promise<CheckIn | null> => {
      if (!user?.id) return null;

      const { data, error } = await supabase
        .from("check_ins")
        .select("*")
        .eq("user_id", user.id)
        .eq("date", today)
        .maybeSingle();

      if (error) throw error;
      return data as CheckIn | null;
    },
    enabled: !!user?.id,
  });

  const { data: recentCheckIns, isLoading: isLoadingRecent } = useQuery({
    queryKey: ["check-ins-recent", user?.id],
    queryFn: async (): Promise<CheckIn[]> => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from("check_ins")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: false })
        .limit(30);

      if (error) throw error;
      return (data as CheckIn[]) || [];
    },
    enabled: !!user?.id,
  });

  const { data: allCheckIns, isLoading: isLoadingAll } = useQuery({
    queryKey: ["check-ins-all", user?.id],
    queryFn: async (): Promise<CheckIn[]> => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from("check_ins")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: false });

      if (error) throw error;
      return (data as CheckIn[]) || [];
    },
    enabled: !!user?.id,
  });

  const submitCheckIn = useMutation({
    mutationFn: async ({ protocolId, data }: { protocolId?: string; data: CheckInData }) => {
      if (!user?.id) throw new Error("User not authenticated");

      const { error } = await supabase.from("check_ins").upsert(
        {
          user_id: user.id,
          protocol_id: protocolId || null,
          date: today,
          completed: true,
          injection_done: data.injection_done,
          energy_level: data.energy_level,
          mood: data.mood,
          sleep_quality: data.sleep_quality,
          side_effects: data.side_effects,
          notes: data.notes || null,
        },
        { onConflict: "user_id,date" }
      );

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["check-in", user?.id, today] });
      queryClient.invalidateQueries({ queryKey: ["check-ins-recent", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["check-ins-all", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["streak", user?.id] });
    },
  });

  const hasCheckedInToday = !!todayCheckIn?.completed;

  return {
    todayCheckIn,
    recentCheckIns,
    allCheckIns,
    hasCheckedInToday,
    isLoading: isLoadingToday || isLoadingRecent,
    isLoadingAll,
    submitCheckIn,
  };
}
