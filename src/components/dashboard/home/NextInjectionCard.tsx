import { Link } from "react-router-dom";
import { Syringe, Calendar } from "lucide-react";
import { format, addDays, getDay, differenceInDays } from "date-fns";
import { GoalTheme } from "@/lib/goalThemes";

interface NextInjectionCardProps {
  currentDay: number;
  courseStartDate?: string | null;
  currentWeek: number;
  courseStatus?: string | null;
  goalTheme?: GoalTheme;
}

function calculateNextInjection(currentDay: number, courseStartDate?: string | null) {
  const injectionDayOfWeek = 0; // Sunday
  const today = new Date();
  
  // Find next injection day (Sunday)
  let nextDate = new Date(today);
  while (getDay(nextDate) !== injectionDayOfWeek) {
    nextDate = addDays(nextDate, 1);
  }
  
  const daysUntil = differenceInDays(nextDate, today);
  
  return {
    date: nextDate,
    dateFormatted: format(nextDate, 'EEEE, MMM d'),
    daysUntil,
  };
}

function getDoseForWeek(week: number): { dose: string; units: number } {
  if (week >= 5) return { dose: "1.0mg", units: 40 };
  if (week >= 3) return { dose: "0.5mg", units: 20 };
  return { dose: "0.25mg", units: 10 };
}

export function NextInjectionCard({ 
  currentDay, 
  courseStartDate, 
  currentWeek,
  courseStatus,
  goalTheme
}: NextInjectionCardProps) {
  const nextInjection = calculateNextInjection(currentDay, courseStartDate);
  const { dose, units } = getDoseForWeek(currentWeek);
  
  const iconBgClass = goalTheme?.iconBg || "bg-rose-100";
  const iconColorClass = goalTheme?.iconColor || "text-rose-500";

  // Don't show injection info if course hasn't started
  if (courseStatus !== 'active') {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-full">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Injection Schedule
        </h3>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
            <Calendar className="w-6 h-6 text-gray-400" />
          </div>
          <div>
            <p className="font-semibold text-gray-500">Start your course first</p>
            <p className="text-sm text-gray-400">Schedule will appear here</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-full">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
        Next Injection
      </h3>
      
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 ${iconBgClass} rounded-xl flex items-center justify-center`}>
          <Syringe className={`w-6 h-6 ${iconColorClass}`} />
        </div>
        <div>
          <p className="font-bold text-black text-lg">{nextInjection.dateFormatted}</p>
          <p className="text-gray-500">
            {nextInjection.daysUntil === 0 ? 'Today!' : `In ${nextInjection.daysUntil} day${nextInjection.daysUntil !== 1 ? 's' : ''}`}
          </p>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-xl p-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Dose</span>
          <span className="font-semibold text-black">{dose}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Draw</span>
          <span className="font-semibold text-black">{units} units</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Week</span>
          <span className="font-semibold text-black">Week {currentWeek}</span>
        </div>
      </div>
      
      <Link 
        to="/dashboard/plan"
        className="block w-full mt-4 py-3 text-center border border-gray-200 rounded-xl text-gray-600 font-medium hover:border-black hover:text-black transition-colors"
      >
        View Full Schedule
      </Link>
    </div>
  );
}
