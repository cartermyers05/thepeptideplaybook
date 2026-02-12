import { WeeklyContent } from "@/hooks/useProtocolProgress";
import { WarningBox } from "./WarningBox";

interface ThisWeekCardProps {
  weeklyContent: WeeklyContent;
}

export function ThisWeekCard({ weeklyContent }: ThisWeekCardProps) {
  return (
    <div
      className="rounded-xl mb-4"
      style={{
        background: "#111827",
        border: "1px solid #1E293B",
        borderRadius: 12,
        padding: 20,
      }}
    >
      {weeklyContent.dose_change && weeklyContent.alert_message && (
        <div className="mb-4">
          <WarningBox type="amber">{weeklyContent.alert_message}</WarningBox>
        </div>
      )}

      <h3
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 16,
          fontWeight: 600,
          color: "#F1F5F9",
          marginBottom: 8,
        }}
      >
        {weeklyContent.title}
      </h3>

      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 15,
          color: "#CBD5E1",
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        {weeklyContent.content}
      </p>
    </div>
  );
}
