import { format, addDays, startOfWeek, getDay, isSameDay, parseISO, differenceInDays, isAfter } from "date-fns";
import { Check, Syringe } from "lucide-react";

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
  isToday: boolean;
  isCompleted: boolean;
  hasInjection: boolean;
  isFuture: boolean;
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
    const hasInjection = schedule ? (schedule[dayNameFull]?.length || 0) > 0 : false;

    return {
      dateKey: format(date, "yyyy-MM-dd"),
      dayName: format(date, "EEE"),
      dayNumber: format(date, "d"),
      isToday: isSameDay(date, today),
      isCompleted,
      hasInjection,
      isFuture: isAfter(date, today),
    };
  });
}

export function WeekCalendarStrip({ currentDay, courseStartDate, schedule }: WeekCalendarStripProps) {
  const weekDays = getWeekDays(courseStartDate, currentDay, schedule);

  return (
    <div className="grid grid-cols-7 gap-1.5">
      {weekDays.map((day) => (
        <div
          key={day.dateKey}
          className="text-center rounded-[12px] py-2.5 px-1 transition-all relative"
          style={{
            backgroundColor: day.isToday ? "#F4F4F5" : "transparent",
            border: day.isToday
              ? "1.5px solid transparent"
              : "1.5px solid transparent",
            backgroundImage: day.isToday
              ? "linear-gradient(#F4F4F5, #F4F4F5), linear-gradient(135deg, #F97316, #FB7185, #A78BFA)"
              : "none",
            backgroundOrigin: "border-box",
            backgroundClip: day.isToday ? "padding-box, border-box" : "padding-box",
          }}
        >
          <p className="text-[10px] font-medium mb-1 text-muted-foreground" style={{ fontFamily: mono }}>
            {day.dayName}
          </p>
          <p
            className="text-base font-bold"
            style={{
              color: day.isToday ? "#0A0A0A" : day.isFuture ? "#C4C4C4" : "#6B7280",
              fontFamily: mono,
            }}
          >
            {day.dayNumber}
          </p>
          <div className="h-4 flex items-center justify-center gap-0.5 mt-0.5">
            {day.isCompleted && !day.isToday && (
              <Check className="w-3 h-3" style={{ color: "#34D399" }} />
            )}
            {day.hasInjection && (
              <Syringe
                className="w-3 h-3"
                style={{ color: day.isToday ? "#FB7185" : "rgba(251,113,133,0.4)" }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
