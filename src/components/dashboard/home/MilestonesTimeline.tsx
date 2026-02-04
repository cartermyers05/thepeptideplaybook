import { format, addDays, parseISO } from "date-fns";
import { Check, Circle, Target, Package, FlaskConical, Calendar, TrendingUp, Award, Flag, Zap, Star, Trophy, CalendarCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { MILESTONE_DEFINITIONS, MilestoneId } from "@/lib/milestoneDefinitions";

interface MilestonesTimelineProps {
  currentDay: number;
  courseStartDate?: string | null;
  totalDays: number;
  earnedMilestoneIds?: MilestoneId[];
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

function getMilestones(
  currentDay: number,
  courseStartDate?: string | null,
  totalDays: number = 56,
  earnedMilestoneIds: MilestoneId[] = []
) {
  const courseStart = courseStartDate ? parseISO(courseStartDate) : null;
  
  // Get relevant milestones (filter by total days and take first 6)
  const relevantMilestones = MILESTONE_DEFINITIONS
    .filter(m => m.targetDay <= totalDays)
    .slice(0, 6);
  
  return relevantMilestones.map(milestone => {
    // A milestone is completed if it's in earnedMilestoneIds OR if day-based and current day has passed
    const isEarned = earnedMilestoneIds.includes(milestone.id);
    const dayPassed = currentDay >= milestone.targetDay;
    const completed = isEarned || (milestone.triggerType === "day" && dayPassed);
    const isCurrent = currentDay === milestone.targetDay - 1 || currentDay === milestone.targetDay;
    
    let dateLabel = `Day ${milestone.targetDay}`;
    if (completed && courseStart) {
      dateLabel = format(addDays(courseStart, milestone.targetDay), 'MMM d');
    } else if (milestone.targetDay === currentDay) {
      dateLabel = 'Today';
    }
    
    return {
      ...milestone,
      completed,
      isCurrent,
      dateLabel,
    };
  });
}

export function MilestonesTimeline({ 
  currentDay, 
  courseStartDate, 
  totalDays,
  earnedMilestoneIds = [] 
}: MilestonesTimelineProps) {
  const milestones = getMilestones(currentDay, courseStartDate, totalDays, earnedMilestoneIds);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
        Milestones
      </h3>
      
      <div className="space-y-3">
        {milestones.map((milestone) => {
          const IconComponent = iconMap[milestone.icon] || Circle;
          
          return (
            <div key={milestone.id} className="flex items-center gap-4">
              {/* Status indicator */}
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all",
                milestone.completed 
                  ? "bg-green-100" 
                  : milestone.isCurrent 
                    ? "bg-black" 
                    : "bg-gray-100"
              )}>
                {milestone.completed ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : milestone.isCurrent ? (
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                ) : (
                  <IconComponent className="w-4 h-4 text-gray-300" />
                )}
              </div>
              
              {/* Content */}
              <p className={cn(
                "flex-1 font-medium transition-colors",
                milestone.completed 
                  ? "text-gray-400 line-through" 
                  : milestone.isCurrent
                    ? "text-black font-semibold"
                    : "text-gray-600"
              )}>
                {milestone.title}
              </p>
              
              {/* Date/Day */}
              <span className={cn(
                "text-sm",
                milestone.completed ? "text-green-600" : "text-gray-400"
              )}>
                {milestone.completed ? "✓" : milestone.dateLabel}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
