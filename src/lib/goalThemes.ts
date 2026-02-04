import { Flame, Dumbbell, Heart, Sparkles, Brain, Rocket, LucideIcon } from "lucide-react";

export interface GoalTheme {
  id: string;
  name: string;
  tagline: string;
  gradient: string;
  gradientFrom: string;
  gradientTo: string;
  iconBg: string;
  iconColor: string;
  accentBg: string;
  accentText: string;
  progressColor: string;
  Icon: LucideIcon;
}

const goalThemes: Record<string, GoalTheme> = {
  fat_loss: {
    id: "fat_loss",
    name: "Fat Loss",
    tagline: "Your metabolism journey",
    gradient: "from-rose-400 to-orange-400",
    gradientFrom: "#fb7185",
    gradientTo: "#fb923c",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-500",
    accentBg: "bg-rose-50",
    accentText: "text-rose-600",
    progressColor: "#fb7185",
    Icon: Flame,
  },
  muscle: {
    id: "muscle",
    name: "Muscle",
    tagline: "Your strength journey",
    gradient: "from-blue-400 to-indigo-500",
    gradientFrom: "#60a5fa",
    gradientTo: "#6366f1",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
    accentBg: "bg-blue-50",
    accentText: "text-blue-600",
    progressColor: "#60a5fa",
    Icon: Dumbbell,
  },
  recovery: {
    id: "recovery",
    name: "Recovery",
    tagline: "Your healing journey",
    gradient: "from-green-400 to-emerald-500",
    gradientFrom: "#4ade80",
    gradientTo: "#10b981",
    iconBg: "bg-green-100",
    iconColor: "text-green-500",
    accentBg: "bg-green-50",
    accentText: "text-green-600",
    progressColor: "#4ade80",
    Icon: Heart,
  },
  anti_aging: {
    id: "anti_aging",
    name: "Anti-Aging",
    tagline: "Your longevity journey",
    gradient: "from-purple-400 to-violet-500",
    gradientFrom: "#c084fc",
    gradientTo: "#8b5cf6",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-500",
    accentBg: "bg-purple-50",
    accentText: "text-purple-600",
    progressColor: "#c084fc",
    Icon: Sparkles,
  },
  cognitive: {
    id: "cognitive",
    name: "Cognitive",
    tagline: "Your mental clarity journey",
    gradient: "from-amber-400 to-yellow-500",
    gradientFrom: "#fbbf24",
    gradientTo: "#eab308",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
    accentBg: "bg-amber-50",
    accentText: "text-amber-600",
    progressColor: "#fbbf24",
    Icon: Brain,
  },
  beginner: {
    id: "beginner",
    name: "Beginner",
    tagline: "Your first peptide journey",
    gradient: "from-teal-400 to-cyan-500",
    gradientFrom: "#2dd4bf",
    gradientTo: "#06b6d4",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-500",
    accentBg: "bg-teal-50",
    accentText: "text-teal-600",
    progressColor: "#2dd4bf",
    Icon: Rocket,
  },
};

// Default theme for unknown goals
const defaultTheme: GoalTheme = {
  id: "default",
  name: "Peptide",
  tagline: "Your peptide journey",
  gradient: "from-gray-400 to-gray-500",
  gradientFrom: "#9ca3af",
  gradientTo: "#6b7280",
  iconBg: "bg-gray-100",
  iconColor: "text-gray-500",
  accentBg: "bg-gray-50",
  accentText: "text-gray-600",
  progressColor: "#000000",
  Icon: Rocket,
};

/**
 * Get the theme configuration for a specific goal
 * @param goal - The goal identifier (e.g., "fat_loss", "muscle")
 * @returns The theme configuration object
 */
export function getGoalTheme(goal?: string | null): GoalTheme {
  if (!goal) return defaultTheme;
  
  // Normalize the goal string (handle both snake_case and kebab-case)
  const normalizedGoal = goal.toLowerCase().replace(/-/g, "_");
  
  return goalThemes[normalizedGoal] || defaultTheme;
}

export { goalThemes };
