// Complete milestone definitions for the Peptide Playbook system

export type MilestoneId =
  | "first_checkin"
  | "supplies_ready"
  | "reconstitution_complete"
  | "first_injection"
  | "week_1_complete"
  | "week_2_complete"
  | "first_dose_increase"
  | "one_month"
  | "halfway"
  | "full_dose"
  | "week_6_complete"
  | "course_complete";

export type CelebrationType = "simple" | "medium" | "major";

export interface MilestoneDefinition {
  id: MilestoneId;
  title: string;
  description: string;
  icon: string;
  targetDay: number;
  celebration: CelebrationType;
  celebrationMessage: string;
  triggerType: "day" | "action" | "hybrid";
}

export const MILESTONE_DEFINITIONS: MilestoneDefinition[] = [
  {
    id: "first_checkin",
    title: "First Check-In",
    description: "Completed your first daily check-in",
    icon: "Target",
    targetDay: 0,
    celebration: "simple",
    celebrationMessage: "Great start! You're on your way.",
    triggerType: "action",
  },
  {
    id: "supplies_ready",
    title: "Supplies Ready",
    description: "Confirmed all supplies are ready",
    icon: "Package",
    targetDay: 2,
    celebration: "simple",
    celebrationMessage: "You're all set to begin!",
    triggerType: "action",
  },
  {
    id: "reconstitution_complete",
    title: "Reconstitution Complete",
    description: "Successfully reconstituted your first vial",
    icon: "FlaskConical",
    targetDay: 4,
    celebration: "medium",
    celebrationMessage: "🎉 You just learned a skill most people never will!",
    triggerType: "action",
  },
  {
    id: "first_injection",
    title: "First Injection 💉",
    description: "Completed your very first injection",
    icon: "Syringe",
    targetDay: 5,
    celebration: "major",
    celebrationMessage: "🎉 HUGE milestone! You did it! The hardest part is behind you.",
    triggerType: "action",
  },
  {
    id: "week_1_complete",
    title: "Week 1 Complete",
    description: "Finished your first full week",
    icon: "Calendar",
    targetDay: 7,
    celebration: "medium",
    celebrationMessage: "One week down! You've built the foundation.",
    triggerType: "day",
  },
  {
    id: "week_2_complete",
    title: "Week 2 Complete",
    description: "Two weeks of consistency",
    icon: "CalendarCheck",
    targetDay: 14,
    celebration: "simple",
    celebrationMessage: "Two weeks strong! 💪",
    triggerType: "day",
  },
  {
    id: "first_dose_increase",
    title: "First Dose Increase",
    description: "Successfully increased your dose",
    icon: "TrendingUp",
    targetDay: 15,
    celebration: "medium",
    celebrationMessage: "Moving up! Your body is adapting well.",
    triggerType: "hybrid",
  },
  {
    id: "one_month",
    title: "One Month Complete 🎉",
    description: "A full month of commitment",
    icon: "Award",
    targetDay: 28,
    celebration: "major",
    celebrationMessage: "🎊 ONE MONTH! You're seeing real changes now.",
    triggerType: "day",
  },
  {
    id: "halfway",
    title: "Halfway There!",
    description: "Crossed the halfway mark",
    icon: "Flag",
    targetDay: 28,
    celebration: "medium",
    celebrationMessage: "Halfway to the finish line! Keep going!",
    triggerType: "day",
  },
  {
    id: "full_dose",
    title: "Full Dose Reached",
    description: "Reached your target maintenance dose",
    icon: "Zap",
    targetDay: 29,
    celebration: "medium",
    celebrationMessage: "Full dose achieved! You're at peak protocol now.",
    triggerType: "hybrid",
  },
  {
    id: "week_6_complete",
    title: "Week 6 Complete",
    description: "Six weeks of dedication",
    icon: "Star",
    targetDay: 42,
    celebration: "medium",
    celebrationMessage: "Six weeks! You're in the home stretch now.",
    triggerType: "day",
  },
  {
    id: "course_complete",
    title: "Course Complete! 🏆",
    description: "Finished your entire course",
    icon: "Trophy",
    targetDay: 56,
    celebration: "major",
    celebrationMessage: "🏆 CONGRATULATIONS! You completed the full course!",
    triggerType: "day",
  },
];

// Get milestone by ID
export const getMilestoneById = (id: MilestoneId): MilestoneDefinition | undefined => {
  return MILESTONE_DEFINITIONS.find((m) => m.id === id);
};

// Get milestones that should be unlocked by a specific day
export const getMilestonesForDay = (currentDay: number): MilestoneDefinition[] => {
  return MILESTONE_DEFINITIONS.filter(
    (m) => m.triggerType === "day" && m.targetDay <= currentDay
  );
};

// Get action-based milestones
export const getActionMilestones = (): MilestoneDefinition[] => {
  return MILESTONE_DEFINITIONS.filter((m) => m.triggerType === "action");
};

// Calculate which milestones should show as upcoming (next 3)
export const getUpcomingMilestones = (
  currentDay: number,
  completedIds: MilestoneId[]
): MilestoneDefinition[] => {
  return MILESTONE_DEFINITIONS.filter(
    (m) => !completedIds.includes(m.id) && m.targetDay > currentDay
  ).slice(0, 3);
};

// Get celebration config for confetti/toast
export const getCelebrationConfig = (celebration: CelebrationType) => {
  switch (celebration) {
    case "simple":
      return {
        showConfetti: false,
        showModal: false,
        toastDuration: 3000,
      };
    case "medium":
      return {
        showConfetti: false,
        showModal: false,
        toastDuration: 5000,
      };
    case "major":
      return {
        showConfetti: true,
        showModal: true,
        toastDuration: 7000,
      };
  }
};
