import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export type MilestoneType =
  | "first_checkin"
  | "first_recon"
  | "week_1"
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
