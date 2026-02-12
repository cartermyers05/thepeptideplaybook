import { WeeklyContent } from "@/hooks/useProtocolProgress";

interface ProtocolProgressHeaderProps {
  currentWeek: number;
  weeklyContent: WeeklyContent | null;
  nextMilestoneText: string;
}

export function ProtocolProgressHeader({
  currentWeek,
  weeklyContent,
  nextMilestoneText,
}: ProtocolProgressHeaderProps) {
  const phaseName = weeklyContent?.phase_name || "";
  const doseInfo = weeklyContent?.dose_info || "";
  const progressPercent = Math.min((currentWeek / 68) * 100, 100);

  return (
    <div
      className="rounded-xl p-6 md:p-6 mb-4"
      style={{
        background: "linear-gradient(135deg, rgba(6,214,160,0.05), rgba(15,15,25,0.9))",
        border: "1px solid rgba(6,214,160,0.1)",
      }}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        {/* Left: Week number */}
        <div className="flex flex-col items-start shrink-0">
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: "#64748B",
              letterSpacing: 2,
              textTransform: "uppercase" as const,
            }}
          >
            WEEK
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 48,
              fontWeight: 700,
              color: "#06D6A0",
              lineHeight: 1,
            }}
          >
            {currentWeek}
          </span>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              color: "#94A3B8",
              marginTop: 4,
            }}
          >
            {phaseName}
          </span>
        </div>

        {/* Right: Dose + progress */}
        <div className="flex-1 flex flex-col gap-3">
          {doseInfo && (
            <span
              className="self-start"
              style={{
                background: "rgba(6,214,160,0.1)",
                border: "1px solid rgba(6,214,160,0.2)",
                borderRadius: 10,
                padding: "8px 16px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                color: "#06D6A0",
              }}
            >
              Current dose: {doseInfo}
            </span>
          )}

          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              color: "#64748B",
            }}
          >
            {nextMilestoneText}
          </span>

          <div>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: "#64748B",
              }}
            >
              Week {currentWeek} of 68
            </span>
            <div
              className="w-full mt-1"
              style={{
                height: 6,
                borderRadius: 3,
                background: "#1a1a2e",
              }}
            >
              <div
                style={{
                  height: 6,
                  borderRadius: 3,
                  background: "#06D6A0",
                  width: `${progressPercent}%`,
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
