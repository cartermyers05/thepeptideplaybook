import { useMemo } from "react";
import { DailyLog } from "./useDailyLog";

export function useProgressStats(logs: DailyLog[], protocol: { compounds?: any[]; schedule?: Record<string, string[]> } | null) {
  return useMemo(() => {
    const daysLogged = logs.length;

    // Calculate compliance
    let totalExpected = 0;
    let totalCompleted = 0;
    for (const log of logs) {
      const actions = log.actions_completed || {};
      const values = Object.values(actions);
      totalExpected += values.length;
      totalCompleted += values.filter(Boolean).length;
    }
    const compliancePercent = totalExpected > 0 ? Math.round((totalCompleted / totalExpected) * 100) : 0;

    // Weight data points
    const weightData = logs
      .filter((l) => l.weight_lbs != null)
      .map((l) => ({ date: l.log_date, value: Number(l.weight_lbs) }));

    // Energy data points
    const energyData = logs
      .filter((l) => l.energy_rating != null)
      .map((l) => ({ date: l.log_date, value: l.energy_rating! }));

    // Check if check-in exists this week
    const now = new Date();
    const dayOfWeek = now.getDay();
    const monday = new Date(now);
    monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7));
    monday.setHours(0, 0, 0, 0);
    const mondayStr = monday.toISOString().split("T")[0];

    const thisWeekCheckIn = logs.find(
      (l) => l.log_date >= mondayStr && l.energy_rating != null
    );

    return {
      daysLogged,
      compliancePercent,
      weightData,
      energyData,
      hasCheckedInThisWeek: !!thisWeekCheckIn,
      thisWeekCheckIn,
    };
  }, [logs, protocol]);
}
