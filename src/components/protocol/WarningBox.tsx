import { ReactNode } from "react";

interface WarningBoxProps {
  type: "amber" | "red" | "info";
  children: ReactNode;
}

const config = {
  amber: {
    bg: "rgba(120,53,15,0.5)",
    border: "rgba(245,158,11,0.3)",
    icon: "⚠️",
    iconColor: "#F59E0B",
    heading: null,
  },
  red: {
    bg: "rgba(127,29,29,0.5)",
    border: "rgba(239,68,68,0.3)",
    icon: "🚨",
    iconColor: "#EF4444",
    heading: "STOP AND SEEK MEDICAL CARE",
  },
  info: {
    bg: "rgba(6,214,160,0.08)",
    border: "rgba(6,214,160,0.15)",
    icon: "💡",
    iconColor: "#06D6A0",
    heading: null,
  },
};

export function WarningBox({ type, children }: WarningBoxProps) {
  const c = config[type];

  return (
    <div
      className="rounded-xl"
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        padding: type === "red" ? 24 : 16,
      }}
    >
      <div className="flex gap-3">
        <span className="shrink-0 text-lg" style={{ color: c.iconColor }}>
          {c.icon}
        </span>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#CBD5E1" }}>
          {c.heading && (
            <p className="mb-2" style={{ fontWeight: 700, color: c.iconColor }}>
              {c.heading}
            </p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
