import { MILESTONE_DETAILS, MilestoneType, Milestone } from "@/hooks/useMilestones";
import { cn } from "@/lib/utils";

interface AchievementGridProps {
  earnedMilestones: Milestone[];
}

const ALL_MILESTONES: MilestoneType[] = [
  "first_checkin",
  "first_recon",
  "week_1",
  "cycle_complete",
];

export function AchievementGrid({ earnedMilestones }: AchievementGridProps) {
  const earnedSet = new Set(earnedMilestones.map((m) => m.milestone_type));

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {ALL_MILESTONES.map((type) => {
        const details = MILESTONE_DETAILS[type];
        const isEarned = earnedSet.has(type);

        return (
          <div
            key={type}
            className={cn(
              "flex flex-col items-center text-center p-4 rounded-lg transition-all",
              isEarned
                ? "bg-primary/10 border-2 border-primary/20"
                : "bg-muted/50 opacity-50"
            )}
          >
            <span className={cn("text-3xl mb-2", !isEarned && "grayscale")}>
              {details.icon}
            </span>
            <p className={cn("text-xs font-medium", !isEarned && "text-muted-foreground")}>
              {details.label}
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
