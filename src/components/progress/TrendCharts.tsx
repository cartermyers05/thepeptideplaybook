import { useMemo } from "react";
import { format, parseISO } from "date-fns";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Zap, Smile, Moon } from "lucide-react";
import type { CheckIn } from "@/hooks/useCheckIn";

interface TrendChartsProps {
  checkIns: CheckIn[];
}

export function TrendCharts({ checkIns }: TrendChartsProps) {
  const chartData = useMemo(() => {
    // Sort by date ascending and take last 14 days
    const sorted = [...checkIns]
      .filter((c) => c.completed && c.energy_level && c.mood && c.sleep_quality)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-14);

    return sorted.map((c) => ({
      date: format(parseISO(c.date), "MMM d"),
      energy: c.energy_level,
      mood: c.mood,
      sleep: c.sleep_quality,
    }));
  }, [checkIns]);

  if (chartData.length < 2) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Complete at least 2 check-ins to see your trends.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="h-[200px]">
        <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" /> Energy Level
        </h4>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              className="text-muted-foreground"
            />
            <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="energy"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))", strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="h-[200px]">
        <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
          <Smile className="w-4 h-4 text-green-600" /> Mood
        </h4>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              className="text-muted-foreground"
            />
            <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="hsl(142 76% 36%)"
              strokeWidth={2}
              dot={{ fill: "hsl(142 76% 36%)", strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="h-[200px]">
        <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
          <Moon className="w-4 h-4 text-blue-500" /> Sleep Quality
        </h4>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              className="text-muted-foreground"
            />
            <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="sleep"
              stroke="hsl(221 83% 53%)"
              strokeWidth={2}
              dot={{ fill: "hsl(221 83% 53%)", strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
