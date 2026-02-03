import { useMemo } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, subMonths, addMonths, getDay } from "date-fns";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { CheckIn } from "@/hooks/useCheckIn";

interface StreakCalendarProps {
  checkIns: CheckIn[];
}

export function StreakCalendar({ checkIns }: StreakCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const checkInDates = useMemo(() => {
    return new Set(checkIns.filter((c) => c.completed).map((c) => c.date));
  }, [checkIns]);

  const days = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const startDayOfWeek = getDay(startOfMonth(currentMonth));

  const prevMonth = () => setCurrentMonth((m) => subMonths(m, 1));
  const nextMonth = () => setCurrentMonth((m) => addMonths(m, 1));

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="icon" onClick={prevMonth}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <h3 className="font-medium">{format(currentMonth, "MMMM yyyy")}</h3>
        <Button variant="ghost" size="icon" onClick={nextMonth}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-xs text-muted-foreground font-medium py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for days before the first of the month */}
        {Array.from({ length: startDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {/* Days */}
        {days.map((day) => {
          const dateStr = format(day, "yyyy-MM-dd");
          const hasCheckIn = checkInDates.has(dateStr);
          const isToday = isSameDay(day, new Date());

          return (
            <div
              key={dateStr}
              className={cn(
                "aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-colors",
                hasCheckIn
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/50 text-muted-foreground",
                isToday && !hasCheckIn && "ring-2 ring-primary/50"
              )}
            >
              {format(day, "d")}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary" />
          <span className="text-muted-foreground">Check-in</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-muted" />
          <span className="text-muted-foreground">Missed</span>
        </div>
      </div>
    </div>
  );
}
