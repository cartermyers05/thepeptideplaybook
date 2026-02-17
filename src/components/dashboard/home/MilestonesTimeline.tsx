import { format, addDays, parseISO } from "date-fns";
import { Check, Circle, Target, Package, FlaskConical, Calendar, TrendingUp, Award, Flag, Zap, Star, Trophy, CalendarCheck } from "lucide-react";
import { MILESTONE_DEFINITIONS, MilestoneId } from "@/lib/milestoneDefinitions";

const mono = "'IBM Plex Mono', 'JetBrains Mono', ui-monospace, monospace";
const heading = "'Plus Jakarta Sans', sans-serif";

interface MilestonesTimelineProps {
  currentDay: number;
  courseStartDate?: string | null;
  totalDays: number;
  earnedMilestoneIds?: MilestoneId[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Target, Package, FlaskConical, Calendar, CalendarCheck, TrendingUp, Award, Flag, Zap, Star, Trophy,
};

function getMilestones(
  currentDay: number,
  courseStartDate?: string | null,
  totalDays: number = 56,
  earnedMilestoneIds: MilestoneId[] = []
) {
  const courseStart = courseStartDate ? parseISO(courseStartDate) : null;
  const relevantMilestones = MILESTONE_DEFINITIONS
    .filter((m) => m.targetDay <= totalDays)
    .slice(0, 6);

  return relevantMilestones.map((milestone) => {
    const isEarned = earnedMilestoneIds.includes(milestone.id);
    const dayPassed = currentDay >= milestone.targetDay;
    const completed = isEarned || (milestone.triggerType === "day" && dayPassed);
    const isCurrent = currentDay === milestone.targetDay - 1 || currentDay === milestone.targetDay;

    let dateLabel = `Day ${milestone.targetDay}`;
    if (completed && courseStart) {
      dateLabel = format(addDays(courseStart, milestone.targetDay), "MMM d");
    } else if (milestone.targetDay === currentDay) {
      dateLabel = "Today";
    }

    return { ...milestone, completed, isCurrent, dateLabel };
  });
}

export function MilestonesTimeline({ currentDay, courseStartDate, totalDays, earnedMilestoneIds = [] }: MilestonesTimelineProps) {
  const milestones = getMilestones(currentDay, courseStartDate, totalDays, earnedMilestoneIds);

  return (
    <div className="relative">
      {/* Vertical connecting line */}
      <div
        className="absolute left-[15px] top-4 bottom-4 w-[2px]"
        style={{
          background: `linear-gradient(180deg, #F97316 0%, #FB7185 ${Math.min(100, (currentDay / totalDays) * 100)}%, rgba(255,255,255,0.05) ${Math.min(100, (currentDay / totalDays) * 100)}%)`,
        }}
      />

      <div className="space-y-1">
        {milestones.map((milestone) => {
          const IconComponent = iconMap[milestone.icon] || Circle;

          return (
            <div key={milestone.id} className="flex items-center gap-3.5 relative py-2">
              {/* Node */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 relative z-10"
                style={{
                  backgroundColor: milestone.completed
                    ? "rgba(52,211,153,0.15)"
                    : milestone.isCurrent
                      ? "#19191E"
                      : "#111114",
                  border: milestone.isCurrent
                    ? "2px solid transparent"
                    : milestone.completed
                      ? "none"
                      : "1px solid rgba(255,255,255,0.05)",
                  backgroundImage: milestone.isCurrent
                    ? "linear-gradient(#19191E, #19191E), linear-gradient(135deg, #F97316, #FB7185, #A78BFA)"
                    : "none",
                  backgroundOrigin: "border-box",
                  backgroundClip: milestone.isCurrent ? "padding-box, border-box" : "padding-box",
                  boxShadow: milestone.isCurrent ? "0 0 12px rgba(249,115,22,0.2)" : "none",
                }}
              >
                {milestone.completed ? (
                  <Check className="w-3.5 h-3.5" style={{ color: "#34D399" }} />
                ) : milestone.isCurrent ? (
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "linear-gradient(135deg, #F97316, #FB7185)" }} />
                ) : (
                  <IconComponent className="w-3.5 h-3.5" style={{ color: "#4A4A5A" }} />
                )}
              </div>

              {/* Content */}
              <p
                className="flex-1 text-sm font-medium"
                style={{
                  color: milestone.completed ? "#4A4A5A" : milestone.isCurrent ? "#EBEBF0" : "#8A8A9A",
                  textDecoration: milestone.completed ? "line-through" : "none",
                  fontFamily: heading,
                  fontWeight: milestone.isCurrent ? 700 : 500,
                }}
              >
                {milestone.title}
              </p>

              {/* Date */}
              <span
                className="text-xs flex-shrink-0"
                style={{
                  color: milestone.completed ? "#34D399" : "#4A4A5A",
                  fontFamily: mono,
                }}
              >
                {milestone.completed ? "Done" : milestone.dateLabel}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
