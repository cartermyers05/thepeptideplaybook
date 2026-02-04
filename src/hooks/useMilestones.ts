import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export type MilestoneType =
  | "first_checkin"
  | "first_recon"
  | "week_1"
  | "streak_7"
  | "streak_14"
  | "streak_30"
  | "streak_60"
  | "streak_90"
  | "cycle_complete";

export interface Milestone {
  id: string;
  user_id: string;
  milestone_type: MilestoneType;
  achieved_at: string;
}

export const MILESTONE_DETAILS: Record<MilestoneType, { label: string; icon: string; description: string }> = {
  first_checkin: { label: "First Check-In", icon: "Target", description: "Completed your first daily check-in" },
  first_recon: { label: "First Reconstitution", icon: "FlaskConical", description: "Completed the reconstitution guide" },
  week_1: { label: "Week 1 Complete", icon: "Calendar", description: "One week into your protocol" },
  streak_7: { label: "7-Day Streak", icon: "Flame", description: "7 consecutive days of check-ins" },
  streak_14: { label: "14-Day Streak", icon: "Zap", description: "14 consecutive days of check-ins" },
  streak_30: { label: "30-Day Streak", icon: "Dumbbell", description: "30 consecutive days of check-ins" },
  streak_60: { label: "60-Day Streak", icon: "Trophy", description: "60 consecutive days of check-ins" },
  streak_90: { label: "90-Day Streak", icon: "Crown", description: "90 consecutive days of check-ins" },
  cycle_complete: { label: "Cycle Complete", icon: "Award", description: "Finished your entire protocol cycle" },
};

export function useMilestones() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: milestones, isLoading } = useQuery({
    queryKey: ["milestones", user?.id],
    queryFn: async (): Promise<Milestone[]> => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from("milestones")
        .select("*")
        .eq("user_id", user.id)
        .order("achieved_at", { ascending: false });

      if (error) throw error;
      return (data as Milestone[]) || [];
    },
    enabled: !!user?.id,
  });

  const awardMilestone = useMutation({
    mutationFn: async (milestoneType: MilestoneType) => {
      if (!user?.id) throw new Error("User not authenticated");

      // Check if already earned
      const existing = milestones?.find((m) => m.milestone_type === milestoneType);
      if (existing) return existing;

      const { data, error } = await supabase
        .from("milestones")
        .insert({
          user_id: user.id,
          milestone_type: milestoneType,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["milestones", user?.id] });
    },
  });

  const hasMilestone = (type: MilestoneType) => {
    return milestones?.some((m) => m.milestone_type === type) || false;
  };

  const earnedMilestones = milestones || [];
  const recentMilestones = earnedMilestones.slice(0, 5);

  return {
    milestones: earnedMilestones,
    recentMilestones,
    isLoading,
    awardMilestone,
    hasMilestone,
  };
}
