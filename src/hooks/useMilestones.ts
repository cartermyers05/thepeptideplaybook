import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";
import {
  MilestoneId,
  MILESTONE_DEFINITIONS,
  getMilestoneById,
  getCelebrationConfig,
} from "@/lib/milestoneDefinitions";

// Map old types to new for backwards compatibility
export type MilestoneType = MilestoneId;

export interface Milestone {
  id: string;
  user_id: string;
  milestone_type: MilestoneType;
  achieved_at: string;
}

// Re-export for backwards compatibility
export const MILESTONE_DETAILS: Record<
  MilestoneType,
  { label: string; icon: string; description: string }
> = Object.fromEntries(
  MILESTONE_DEFINITIONS.map((m) => [
    m.id,
    { label: m.title, icon: m.icon, description: m.description },
  ])
) as Record<MilestoneType, { label: string; icon: string; description: string }>;

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
      if (existing) return { alreadyEarned: true, data: existing };

      const { data, error } = await supabase
        .from("milestones")
        .insert({
          user_id: user.id,
          milestone_type: milestoneType,
        })
        .select()
        .single();

      if (error) throw error;
      return { alreadyEarned: false, data };
    },
    onSuccess: (result, milestoneType) => {
      queryClient.invalidateQueries({ queryKey: ["milestones", user?.id] });
      
      // Only celebrate if it's a new milestone
      if (!result.alreadyEarned) {
        const definition = getMilestoneById(milestoneType);
        if (definition) {
          const config = getCelebrationConfig(definition.celebration);
          
          // Show toast notification
          toast.success(definition.celebrationMessage, {
            duration: config.toastDuration,
            icon: "🎉",
          });
          
          // For major celebrations, could trigger confetti here
          // if (config.showConfetti) { triggerConfetti(); }
        }
      }
    },
    onError: (error) => {
      console.error("Failed to award milestone:", error);
    },
  });

  // Check if a milestone has been earned
  const hasMilestone = (type: MilestoneType) => {
    return milestones?.some((m) => m.milestone_type === type) || false;
  };

  // Get all earned milestone IDs
  const earnedMilestoneIds = milestones?.map((m) => m.milestone_type as MilestoneId) || [];

  // Get upcoming milestones based on current day
  const getUpcomingMilestones = (currentDay: number) => {
    return MILESTONE_DEFINITIONS.filter(
      (m) => !earnedMilestoneIds.includes(m.id) && m.targetDay > currentDay
    ).slice(0, 3);
  };

  // Check and award day-based milestones automatically
  const checkDayMilestones = async (currentDay: number) => {
    const dayMilestones = MILESTONE_DEFINITIONS.filter(
      (m) =>
        (m.triggerType === "day" || m.triggerType === "hybrid") &&
        m.targetDay <= currentDay &&
        !earnedMilestoneIds.includes(m.id)
    );

    for (const milestone of dayMilestones) {
      await awardMilestone.mutateAsync(milestone.id);
    }
  };

  const earnedMilestones = milestones || [];
  const recentMilestones = earnedMilestones.slice(0, 5);

  return {
    milestones: earnedMilestones,
    recentMilestones,
    isLoading,
    awardMilestone,
    hasMilestone,
    earnedMilestoneIds,
    getUpcomingMilestones,
    checkDayMilestones,
    MILESTONE_DEFINITIONS,
  };
}
