import { format, addDays, parseISO } from "date-fns";
import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface MilestonesTimelineProps {
  currentDay: number;
  courseStartDate?: string | null;
  totalDays: number;
}

interface Milestone {
  id: string;
  title: string;
  day: number;
  type: 'lesson' | 'streak' | 'dose' | 'progress';
}

const courseMilestones: Milestone[] = [
  { id: 'first-checkin', title: 'First Check-In', day: 1, type: 'lesson' },
  { id: 'reconstitution', title: 'Reconstitution Complete', day: 4, type: 'lesson' },
  { id: 'first-injection', title: 'First Injection', day: 5, type: 'lesson' },
  { id: 'week-1', title: 'Week 1 Complete', day: 7, type: 'streak' },
  { id: 'first-increase', title: 'First Dose Increase', day: 14, type: 'dose' },
  { id: 'one-month', title: 'One Month Complete', day: 28, type: 'streak' },
  { id: 'halfway', title: 'Halfway There!', day: 28, type: 'progress' },
  { id: 'final-week', title: 'Final Week', day: 49, type: 'progress' },
  { id: 'complete', title: 'Course Complete!', day: 56, type: 'progress' },
];

function getMilestones(currentDay: number, courseStartDate?: string | null, totalDays: number = 56) {
  const courseStart = courseStartDate ? parseISO(courseStartDate) : null;
  
  // Filter milestones to show only relevant ones (first 5 upcoming/recent)
  const relevantMilestones = courseMilestones
    .filter(m => m.day <= totalDays)
    .slice(0, 6);
  
  return relevantMilestones.map(milestone => {
    const completed = currentDay >= milestone.day;
    const isCurrent = currentDay === milestone.day - 1 || currentDay === milestone.day;
    
    let dateLabel = `Day ${milestone.day}`;
    if (completed && courseStart) {
      dateLabel = format(addDays(courseStart, milestone.day), 'MMM d');
    } else if (milestone.day === currentDay) {
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

export function MilestonesTimeline({ currentDay, courseStartDate, totalDays }: MilestonesTimelineProps) {
  const milestones = getMilestones(currentDay, courseStartDate, totalDays);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
        Milestones
      </h3>
      
      <div className="space-y-3">
        {milestones.map((milestone) => (
          <div key={milestone.id} className="flex items-center gap-4">
            {/* Status indicator */}
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
              milestone.completed 
                ? "bg-green-100" 
                : milestone.isCurrent 
                  ? "bg-black" 
                  : "bg-gray-100"
            )}>
              {milestone.completed ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : milestone.isCurrent ? (
                <div className="w-2 h-2 bg-white rounded-full" />
              ) : (
                <Circle className="w-4 h-4 text-gray-300" />
              )}
            </div>
            
            {/* Content */}
            <p className={cn(
              "flex-1 font-medium",
              milestone.completed ? "text-gray-400" : "text-black"
            )}>
              {milestone.title}
            </p>
            
            {/* Date/Day */}
            <span className="text-sm text-gray-400">
              {milestone.dateLabel}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
