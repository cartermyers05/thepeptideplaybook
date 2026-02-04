import { MILESTONE_DEFINITIONS, MilestoneId } from "@/lib/milestoneDefinitions";
import { MILESTONE_DETAILS, Milestone } from "@/hooks/useMilestones";
import { cn } from "@/lib/utils";
import { Target, Package, FlaskConical, Calendar, CalendarCheck, TrendingUp, Award, Flag, Zap, Star, Trophy, Circle } from "lucide-react";

interface AchievementGridProps {
  earnedMilestones: Milestone[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Target,
  Package,
  FlaskConical,
  Calendar,
  CalendarCheck,
  TrendingUp,
  Award,
  Flag,
  Zap,
  Star,
  Trophy,
};

// Show first 8 milestones for the grid
const DISPLAY_MILESTONES = MILESTONE_DEFINITIONS.slice(0, 8);

export function AchievementGrid({ earnedMilestones }: AchievementGridProps) {
  const earnedSet = new Set(earnedMilestones.map((m) => m.milestone_type));

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {DISPLAY_MILESTONES.map((milestone) => {
        const isEarned = earnedSet.has(milestone.id);
        const IconComponent = iconMap[milestone.icon] || Circle;

        return (
          <div
            key={milestone.id}
            className={cn(
              "flex flex-col items-center text-center p-4 rounded-lg transition-all",
              isEarned
                ? "bg-primary/10 border-2 border-primary/20"
                : "bg-muted/50 opacity-50"
            )}
          >
            <div className={cn("mb-2", !isEarned && "grayscale opacity-50")}>
              <IconComponent className="w-8 h-8 text-primary" />
            </div>
            <p className={cn("text-xs font-medium", !isEarned && "text-muted-foreground")}>
              {milestone.title}
            </p>
            {isEarned && (
              <span className="text-[10px] text-primary mt-1">✓ Earned</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
