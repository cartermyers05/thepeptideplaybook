import { useState } from "react";
import { useAllCheckins, ProtocolCheckin } from "@/hooks/useProtocolCheckins";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

const SYMPTOM_EMOJIS = ["😊", "🙂", "😐", "😣", "😰"];
const ENERGY_EMOJIS = ["⚡", "🔋", "😴", "🪫", "💤"];
const SYMPTOM_DOT_COLORS = ["#22c55e", "#84cc16", "#eab308", "#f97316", "#ef4444"];

interface CheckinHistoryProps {
  progressId: string;
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.[0]) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background: "#111827", border: "1px solid #1E293B", borderRadius: 8, padding: "8px 12px" }}>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#F1F5F9" }}>
        Week {d.week}: {d.weight} lbs
      </span>
    </div>
  );
}

export function CheckinHistory({ progressId }: CheckinHistoryProps) {
  const { data: checkins } = useAllCheckins(progressId);
  const [open, setOpen] = useState(false);

  if (!checkins || checkins.length < 2) return null;

  const weightData = checkins
    .filter((c) => c.weight_lbs != null)
    .map((c) => ({ week: c.week_number, weight: Number(c.weight_lbs) }));

  return (
    <div
      className="rounded-xl mb-4"
      style={{ background: "#111827", border: "1px solid #1E293B", borderRadius: 12, padding: 20 }}
    >
      <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, color: "#F1F5F9", marginBottom: 16 }}>
        Your Progress
      </h3>

      {/* Weight chart */}
      {weightData.length >= 2 && (
        <div className="mb-4" style={{ width: "100%", height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weightData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid stroke="#1E293B" strokeDasharray="3 3" />
              <XAxis
                dataKey="week"
                tick={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fill: "#64748B" }}
                axisLine={{ stroke: "#1E293B" }}
                tickLine={false}
              />
              <YAxis
                domain={["dataMin - 2", "dataMax + 2"]}
                tick={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fill: "#64748B" }}
                axisLine={{ stroke: "#1E293B" }}
                tickLine={false}
                width={45}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#06D6A0"
                strokeWidth={2}
                dot={{ fill: "#06D6A0", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Symptom dots */}
      <div className="flex items-end gap-3 mb-4 overflow-x-auto pb-1">
        {checkins.map((c) => (
          <div key={c.week_number} className="flex flex-col items-center gap-1 shrink-0">
            <div
              style={{
                width: 12, height: 12, borderRadius: 6,
                background: c.symptom_rating ? SYMPTOM_DOT_COLORS[c.symptom_rating - 1] : "#1E293B",
              }}
            />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#64748B" }}>
              {c.week_number}
            </span>
          </div>
        ))}
      </div>

      {/* Expandable history */}
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <button
            className="flex items-center gap-1 w-full"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#64748B", background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            See all entries
            <ChevronDown
              className="w-4 h-4 transition-transform"
              style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-3 overflow-x-auto">
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>
              <thead>
                <tr style={{ color: "#64748B" }}>
                  <th style={{ textAlign: "left", padding: "8px 12px", fontWeight: 500 }}>Week</th>
                  <th style={{ textAlign: "left", padding: "8px 12px", fontWeight: 500 }}>Weight</th>
                  <th style={{ textAlign: "center", padding: "8px 12px", fontWeight: 500 }}>Symptoms</th>
                  <th style={{ textAlign: "center", padding: "8px 12px", fontWeight: 500 }}>Energy</th>
                  <th style={{ textAlign: "left", padding: "8px 12px", fontWeight: 500 }}>Notes</th>
                  <th style={{ textAlign: "left", padding: "8px 12px", fontWeight: 500 }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {checkins.map((c, i) => (
                  <tr key={c.id} style={{ background: i % 2 === 0 ? "#111827" : "#0a0a0f", color: "#CBD5E1" }}>
                    <td style={{ padding: "8px 12px" }}>{c.week_number}</td>
                    <td style={{ padding: "8px 12px", fontFamily: "'JetBrains Mono', monospace" }}>
                      {c.weight_lbs ? `${c.weight_lbs}` : "—"}
                    </td>
                    <td style={{ padding: "8px 12px", textAlign: "center" }}>
                      {c.symptom_rating ? SYMPTOM_EMOJIS[c.symptom_rating - 1] : "—"}
                    </td>
                    <td style={{ padding: "8px 12px", textAlign: "center" }}>
                      {c.energy_rating ? ENERGY_EMOJIS[c.energy_rating - 1] : "—"}
                    </td>
                    <td style={{ padding: "8px 12px", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {c.notes || "—"}
                    </td>
                    <td style={{ padding: "8px 12px", whiteSpace: "nowrap", fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}>
                      {new Date(c.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
