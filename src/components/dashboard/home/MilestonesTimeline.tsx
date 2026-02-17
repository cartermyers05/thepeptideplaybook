import { format, addDays, parseISO } from "date-fns";
import { motion } from "framer-motion";
import { Check, Circle, Target, Package, FlaskConical, Calendar, TrendingUp, Award, Flag, Zap, Star, Trophy, CalendarCheck } from "lucide-react";
import { MILESTONE_DEFINITIONS, MilestoneId } from "@/lib/milestoneDefinitions";

const mono = "'JetBrains Mono', ui-monospace, monospace";
const heading = "'Outfit', sans-serif";

interface MilestonesTimelineProps {
  currentDay: number;
  courseStartDate?: string | null;
  totalDays: number;
  earnedMilestoneIds?: MilestoneId[];
  maxVisible?: number;
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

export function MilestonesTimeline({ currentDay, courseStartDate, totalDays, earnedMilestoneIds = [], maxVisible }: MilestonesTimelineProps) {
  const allMilestones = getMilestones(currentDay, courseStartDate, totalDays, earnedMilestoneIds);

  let milestones = allMilestones;
  if (maxVisible && allMilestones.length > maxVisible) {
    const currentIdx = allMilestones.findIndex((m) => m.isCurrent);
    const firstIncompleteIdx = allMilestones.findIndex((m) => !m.completed);
    const anchorIdx = currentIdx >= 0 ? currentIdx : firstIncompleteIdx >= 0 ? firstIncompleteIdx : 0;
    const startIdx = Math.max(0, anchorIdx - 1);
    milestones = allMilestones.slice(startIdx, startIdx + maxVisible);
  }

  return (
    <div className="relative">
      {/* Animated vertical connecting line */}
      <motion.div
        className="absolute left-[15px] top-4 bottom-4 w-[2px]"
        style={{
          background: `linear-gradient(180deg, #F97316 0%, #FB7185 ${Math.min(100, (currentDay / totalDays) * 100)}%, hsl(0 0% 90%) ${Math.min(100, (currentDay / totalDays) * 100)}%)`,
        }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        style-origin="top"
      />

      <div className="space-y-1">
        {milestones.map((milestone, i) => {
          const IconComponent = iconMap[milestone.icon] || Circle;

          return (
            <motion.div
              key={milestone.id}
              className="flex items-center gap-3.5 relative py-2"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              {/* Node */}
              <motion.div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 relative z-10"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15, delay: i * 0.1 + 0.2 }}
                style={{
                  backgroundColor: milestone.completed
                    ? "rgba(52,211,153,0.1)"
                    : milestone.isCurrent
                      ? "#F4F4F5"
                      : "#FFFFFF",
                  border: milestone.isCurrent
                    ? "2px solid transparent"
                    : milestone.completed
                      ? "none"
                      : "1px solid hsl(0 0% 90%)",
                  backgroundImage: milestone.isCurrent
                    ? "linear-gradient(#F4F4F5, #F4F4F5), linear-gradient(135deg, #F97316, #FB7185, #A78BFA)"
                    : "none",
                  backgroundOrigin: "border-box",
                  backgroundClip: milestone.isCurrent ? "padding-box, border-box" : "padding-box",
                  boxShadow: milestone.isCurrent ? "0 0 10px rgba(249,115,22,0.15)" : "none",
                }}
              >
                {milestone.completed ? (
                  <Check className="w-3.5 h-3.5" style={{ color: "#34D399" }} />
                ) : milestone.isCurrent ? (
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ background: "linear-gradient(135deg, #F97316, #FB7185)" }}
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                ) : (
                  <IconComponent className="w-3.5 h-3.5 text-muted-foreground" />
                )}
              </motion.div>

              {/* Content */}
              <p
                className="flex-1 text-sm font-medium"
                style={{
                  color: milestone.completed ? "#9CA3AF" : milestone.isCurrent ? "#0A0A0A" : "#6B7280",
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
                  color: milestone.completed ? "#34D399" : "#9CA3AF",
                  fontFamily: mono,
                }}
              >
                {milestone.completed ? "Done" : milestone.dateLabel}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
