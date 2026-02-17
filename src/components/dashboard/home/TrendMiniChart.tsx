import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format, subDays, parseISO } from "date-fns";
import type { DailyLog } from "@/hooks/useDailyLog";

const mono = "'JetBrains Mono', ui-monospace, monospace";
const heading = "'Outfit', sans-serif";

interface TrendMiniChartProps {
  allLogs: DailyLog[];
}

export function TrendMiniChart({ allLogs }: TrendMiniChartProps) {
  const chartData = useMemo(() => {
    const today = new Date();
    const logMap = new Map<string, DailyLog>();
    allLogs.forEach((l) => logMap.set(l.log_date, l));

    return Array.from({ length: 14 }, (_, i) => {
      const date = subDays(today, 13 - i);
      const dateStr = format(date, "yyyy-MM-dd");
      const log = logMap.get(dateStr);

      let compliance: number | undefined;
      if (log?.actions_completed) {
        const vals = Object.values(log.actions_completed as Record<string, boolean>);
        if (vals.length > 0) {
          compliance = Math.round((vals.filter(Boolean).length / vals.length) * 100);
        }
      }

      return {
        date: format(date, "MMM d"),
        compliance,
        energy: log?.energy_rating ?? undefined,
      };
    });
  }, [allLogs]);

  const hasData = chartData.some((d) => d.compliance !== undefined || d.energy !== undefined);
  if (!hasData) return null;

  return (
    <div
      className="rounded-[20px] bg-white overflow-hidden"
      style={{
        boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.06)",
        border: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <div className="px-5 pt-4 pb-2 flex items-baseline justify-between">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground" style={{ fontFamily: mono }}>
          14-Day Trends
        </h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ background: "#60A5FA" }} />
            <span className="text-[10px] text-muted-foreground" style={{ fontFamily: mono }}>Compliance</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ background: "#34D399" }} />
            <span className="text-[10px] text-muted-foreground" style={{ fontFamily: mono }}>Energy</span>
          </div>
        </div>
      </div>
      <div className="px-3 pb-4" style={{ height: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="complianceGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60A5FA" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#60A5FA" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34D399" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#34D399" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 9, fill: "#A1A1AA", fontFamily: mono }}
              tickLine={false}
              axisLine={false}
              interval={2}
            />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 9, fill: "#A1A1AA", fontFamily: mono }}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 9, fill: "#A1A1AA", fontFamily: mono }}
              tickLine={false}
              axisLine={false}
              domain={[0, 10]}
            />
            <Tooltip
              contentStyle={{
                background: "white",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: 12,
                fontSize: 11,
                fontFamily: mono,
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              }}
              formatter={(value: any, name: string) =>
                name === "compliance" ? [`${value}%`, "Compliance"] : [value, "Energy"]
              }
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="compliance"
              stroke="#60A5FA"
              strokeWidth={2}
              fill="url(#complianceGrad)"
              connectNulls={false}
              animationDuration={1200}
              dot={false}
              activeDot={{ r: 3, strokeWidth: 0, fill: "#60A5FA" }}
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="energy"
              stroke="#34D399"
              strokeWidth={2}
              fill="url(#energyGrad)"
              connectNulls={false}
              animationDuration={1200}
              dot={false}
              activeDot={{ r: 3, strokeWidth: 0, fill: "#34D399" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
