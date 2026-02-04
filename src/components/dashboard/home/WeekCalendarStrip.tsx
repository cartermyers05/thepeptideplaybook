import { format, addDays, startOfWeek, getDay, isSameDay, parseISO, differenceInDays, isAfter } from "date-fns";
import { Check, Syringe } from "lucide-react";
import { cn } from "@/lib/utils";

interface WeekCalendarStripProps {
  currentDay: number;
  courseStartDate?: string | null;
  injectionDayOfWeek?: number; // 0 = Sunday
}

interface DayInfo {
  dateKey: string;
  dayName: string;
  dayNumber: string;
  isToday: boolean;
  isCompleted: boolean;
  isInjectionDay: boolean;
  lessonDay: number | null;
  isFuture: boolean;
  isPast: boolean;
}

function getWeekDays(courseStartDate: string | null | undefined, currentDay: number, injectionDayOfWeek: number = 0): DayInfo[] {
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // Start on Monday
  
  const courseStart = courseStartDate ? parseISO(courseStartDate) : null;
  
  return Array.from({ length: 7 }, (_, i) => {
    const date = addDays(weekStart, i);
    const dayOfWeek = getDay(date);
    
    // Calculate what lesson day this calendar day corresponds to
    let lessonDay: number | null = null;
    if (courseStart) {
      const diff = differenceInDays(date, courseStart);
      lessonDay = diff >= 0 ? diff : null;
    }
    
    // A day is completed if we have a course start date and this date's lesson day is less than current day
    const isCompleted = lessonDay !== null && lessonDay < currentDay && !isSameDay(date, today);
    
    return {
      dateKey: format(date, 'yyyy-MM-dd'),
      dayName: format(date, 'EEE'),
      dayNumber: format(date, 'd'),
      isToday: isSameDay(date, today),
      isCompleted,
      isInjectionDay: dayOfWeek === injectionDayOfWeek,
      lessonDay,
      isFuture: isAfter(date, today),
      isPast: !isSameDay(date, today) && !isAfter(date, today),
    };
  });
}

export function WeekCalendarStrip({ 
  currentDay, 
  courseStartDate,
  injectionDayOfWeek = 0 
}: WeekCalendarStripProps) {
  const weekDays = getWeekDays(courseStartDate, currentDay, injectionDayOfWeek);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
        This Week
      </h3>
      
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => (
          <div 
            key={day.dateKey}
            className={cn(
              "text-center p-3 rounded-xl transition-all",
              day.isToday 
                ? "bg-black text-white" 
                : day.isCompleted 
                  ? "bg-green-50 border border-green-200" 
                  : "bg-gray-50"
            )}
          >
            <p className={cn(
              "text-xs font-medium mb-1",
              day.isToday ? "text-gray-400" : "text-gray-400"
            )}>
              {day.dayName}
            </p>
            <p className={cn(
              "text-lg font-bold",
              day.isToday ? "text-white" : "text-black"
            )}>
              {day.dayNumber}
            </p>
            <div className="h-5 flex items-center justify-center gap-1">
              {day.isCompleted && !day.isToday && (
                <Check className="w-4 h-4 text-green-500" />
              )}
              {day.isInjectionDay && (
                <Syringe className={cn(
                  "w-3.5 h-3.5",
                  day.isToday ? "text-rose-300" : "text-rose-400"
                )} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
