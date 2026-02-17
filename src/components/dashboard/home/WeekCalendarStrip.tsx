import { format, addDays, startOfWeek, getDay, isSameDay, parseISO, differenceInDays, isAfter } from "date-fns";
import { Check, Syringe } from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const mono = "'JetBrains Mono', ui-monospace, monospace";

interface WeekCalendarStripProps {
  currentDay: number;
  courseStartDate?: string | null;
  injectionDays?: string[];
  schedule?: Record<string, string[]>;
}

interface DayInfo {
  dateKey: string;
  dayName: string;
  dayNumber: string;
  dayNameFull: string;
  isToday: boolean;
  isCompleted: boolean;
  hasInjection: boolean;
  isFuture: boolean;
  compounds: string[];
}

function getWeekDays(
  courseStartDate: string | null | undefined,
  currentDay: number,
  schedule?: Record<string, string[]>
): DayInfo[] {
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const courseStart = courseStartDate ? parseISO(courseStartDate) : null;
  const dayNamesFull = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return Array.from({ length: 7 }, (_, i) => {
    const date = addDays(weekStart, i);
    const dayOfWeek = getDay(date);
    const dayNameFull = dayNamesFull[dayOfWeek];

    let lessonDay: number | null = null;
    if (courseStart) {
      const diff = differenceInDays(date, courseStart);
      lessonDay = diff >= 0 ? diff : null;
    }

    const isCompleted = lessonDay !== null && lessonDay < currentDay && !isSameDay(date, today);
    const compounds = schedule ? (schedule[dayNameFull] || []) : [];
    const hasInjection = compounds.length > 0;

    return {
      dateKey: format(date, "yyyy-MM-dd"),
      dayName: format(date, "EEE"),
      dayNumber: format(date, "d"),
      dayNameFull,
      isToday: isSameDay(date, today),
      isCompleted,
      hasInjection,
      isFuture: isAfter(date, today),
      compounds,
    };
  });
}

export function WeekCalendarStrip({ currentDay, courseStartDate, schedule }: WeekCalendarStripProps) {
  const weekDays = getWeekDays(courseStartDate, currentDay, schedule);

  return (
    <TooltipProvider delayDuration={200}>
      <div className="grid grid-cols-7 gap-1.5">
        {weekDays.map((day, i) => (
          <motion.div
            key={day.dateKey}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="text-center rounded-[12px] py-2.5 px-1 transition-all relative cursor-default group"
                  style={{
                    backgroundColor: day.isToday ? "#F4F4F5" : "transparent",
                    border: "1.5px solid transparent",
                    backgroundImage: day.isToday
                      ? "linear-gradient(#F4F4F5, #F4F4F5), linear-gradient(135deg, #F97316, #FB7185, #A78BFA)"
                      : "none",
                    backgroundOrigin: "border-box",
                    backgroundClip: day.isToday ? "padding-box, border-box" : "padding-box",
                    animation: day.isToday ? "pulse-border 2s ease-in-out infinite" : "none",
                  }}
                >
                  {/* Hover highlight */}
                  <div className="absolute inset-0 rounded-[12px] bg-muted/0 group-hover:bg-muted/50 transition-colors duration-200" />
                  <p className="text-[10px] font-medium mb-1 text-muted-foreground relative z-10" style={{ fontFamily: mono }}>
                    {day.dayName}
                  </p>
                  <p
                    className="text-base font-bold relative z-10"
                    style={{
                      color: day.isToday ? "#0A0A0A" : day.isFuture ? "#C4C4C4" : "#6B7280",
                      fontFamily: mono,
                    }}
                  >
                    {day.dayNumber}
                  </p>
                  <div className="h-4 flex items-center justify-center gap-0.5 mt-0.5 relative z-10">
                    {day.isCompleted && !day.isToday && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 20, delay: i * 0.05 }}
                      >
                        <Check className="w-3 h-3" style={{ color: "#34D399" }} />
                      </motion.div>
                    )}
                    {day.hasInjection && (
                      <Syringe
                        className="w-3 h-3"
                        style={{ color: day.isToday ? "#FB7185" : "rgba(251,113,133,0.4)" }}
                      />
                    )}
                  </div>
                </div>
              </TooltipTrigger>
              {day.compounds.length > 0 && (
                <TooltipContent side="bottom" className="text-xs max-w-[160px]">
                  <p className="font-semibold mb-0.5">{day.dayNameFull}</p>
                  {day.compounds.map((c) => (
                    <p key={c} className="text-muted-foreground">{c}</p>
                  ))}
                </TooltipContent>
              )}
            </Tooltip>
          </motion.div>
        ))}
      </div>
    </TooltipProvider>
  );
}
