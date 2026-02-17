const jakarta = "'Plus Jakarta Sans', sans-serif";
const mono = "'IBM Plex Mono', 'JetBrains Mono', ui-monospace, monospace";

interface RestDayCardProps {
  nextDay: string | null;
}

export function RestDayCard({ nextDay }: RestDayCardProps) {
  return (
    <div
      className="rounded-[16px] p-8 text-center"
      style={{ border: "2px dashed rgba(255,255,255,0.06)" }}
    >
      <p
        className="text-[20px] font-bold"
        style={{ fontFamily: jakarta, color: "#EBEBF0" }}
      >
        Rest Day
      </p>
      <p className="text-[14px] mt-1.5" style={{ color: "#8A8A9A" }}>
        No compounds scheduled today.
      </p>
      {nextDay && (
        <p className="text-[12px] mt-3" style={{ fontFamily: mono, color: "#4A4A5A" }}>
          Next: {nextDay}
        </p>
      )}
    </div>
  );
}
