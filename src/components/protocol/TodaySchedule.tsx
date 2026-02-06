import { useState } from "react";
import { Check, Sun, Moon, Dumbbell, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Peptide } from "@/hooks/useProtocol";

interface ScheduledDose {
  peptide: Peptide;
  timeSlot: "morning" | "evening" | "post-workout" | "other";
  completed: boolean;
}

interface TodayScheduleProps {
  peptides: Peptide[];
  onMarkComplete: (peptideName: string, timeSlot: string) => void;
  completedDoses: string[]; // Format: "peptideName-timeSlot"
}

const timeSlotConfig = {
  morning: { icon: Sun, label: "Morning", color: "text-amber-500", bg: "bg-amber-50" },
  evening: { icon: Moon, label: "Evening", color: "text-indigo-500", bg: "bg-indigo-50" },
  "post-workout": { icon: Dumbbell, label: "Post-Workout", color: "text-green-500", bg: "bg-green-50" },
  other: { icon: Clock, label: "Anytime", color: "text-muted-foreground", bg: "bg-muted" },
};

function parseTimeSlot(timing: string): "morning" | "evening" | "post-workout" | "other" {
  const lower = timing.toLowerCase();
  if (lower.includes("morning") || lower.includes("am") || lower.includes("empty stomach")) {
    return "morning";
  }
  if (lower.includes("evening") || lower.includes("night") || lower.includes("pm") || lower.includes("before bed")) {
    return "evening";
  }
  if (lower.includes("post-workout") || lower.includes("after workout") || lower.includes("after training")) {
    return "post-workout";
  }
  return "other";
}

function expandSchedule(peptides: Peptide[]): ScheduledDose[] {
  const doses: ScheduledDose[] = [];

  peptides.forEach((peptide) => {
    const frequency = peptide.frequency.toLowerCase();
    const timing = peptide.timing.toLowerCase();

    // Check for twice daily
    if (frequency.includes("twice daily") || frequency.includes("2x daily") || frequency.includes("bid")) {
      doses.push({ peptide, timeSlot: "morning", completed: false });
      doses.push({ peptide, timeSlot: "evening", completed: false });
    }
    // Once daily
    else if (frequency.includes("once daily") || frequency.includes("1x daily") || frequency.includes("daily")) {
      doses.push({ peptide, timeSlot: parseTimeSlot(timing), completed: false });
    }
    // Weekly peptides - only show on day 1 or specific days
    else if (frequency.includes("weekly") || frequency.includes("twice weekly")) {
      // For now, show weekly peptides as "other" timing
      doses.push({ peptide, timeSlot: parseTimeSlot(timing), completed: false });
    }
    // Default: show once
    else {
      doses.push({ peptide, timeSlot: parseTimeSlot(timing), completed: false });
    }
  });

  // Sort by time slot
  const order = ["morning", "post-workout", "evening", "other"];
  return doses.sort((a, b) => order.indexOf(a.timeSlot) - order.indexOf(b.timeSlot));
}

export function TodaySchedule({ peptides, onMarkComplete, completedDoses }: TodayScheduleProps) {
  const scheduledDoses = expandSchedule(peptides);
  const allCompleted = scheduledDoses.every(d => 
    completedDoses.includes(`${d.peptide.name}-${d.timeSlot}`)
  );

  if (peptides.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {scheduledDoses.map((dose, index) => {
        const config = timeSlotConfig[dose.timeSlot];
        const Icon = config.icon;
        const isCompleted = completedDoses.includes(`${dose.peptide.name}-${dose.timeSlot}`);
        const doseKey = `${dose.peptide.name}-${dose.timeSlot}`;

        return (
          <Card 
            key={`${dose.peptide.name}-${dose.timeSlot}-${index}`}
            className={cn(
              "transition-all duration-200",
              isCompleted && "opacity-60"
            )}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                {/* Time slot icon */}
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                  config.bg
                )}>
                  <Icon className={cn("w-5 h-5", config.color)} />
                </div>

                {/* Dose info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={cn("text-xs font-medium uppercase tracking-wide", config.color)}>
                      {config.label}
                    </span>
                  </div>
                  <p className={cn(
                    "font-semibold text-foreground",
                    isCompleted && "line-through text-muted-foreground"
                  )}>
                    {dose.peptide.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {dose.peptide.dosage} • {dose.peptide.site || "Subcutaneous"}
                  </p>
                </div>

                {/* Complete button */}
                <Button
                  size="sm"
                  variant={isCompleted ? "secondary" : "default"}
                  className={cn(
                    "rounded-full shrink-0",
                    isCompleted && "bg-green-100 text-green-700 hover:bg-green-200"
                  )}
                  onClick={() => onMarkComplete(dose.peptide.name, dose.timeSlot)}
                  disabled={isCompleted}
                >
                  {isCompleted ? (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      Done
                    </>
                  ) : (
                    "Mark Complete"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* All done celebration */}
      {allCompleted && scheduledDoses.length > 0 && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-center">
          <p className="text-green-700 font-medium">✨ All doses complete for today!</p>
        </div>
      )}
    </div>
  );
}
