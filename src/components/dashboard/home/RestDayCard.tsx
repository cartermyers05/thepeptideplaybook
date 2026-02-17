const mono = "'IBM Plex Mono', 'JetBrains Mono', ui-monospace, monospace";
const heading = "'Plus Jakarta Sans', sans-serif";

interface RestDayCardProps {
  nextDay: string | null;
}

export function RestDayCard({ nextDay }: RestDayCardProps) {
  return (
    <div
      className="rounded-[16px] p-8 text-center"
      style={{ border: "2px dashed rgba(255,255,255,0.06)" }}
    >
      <p className="text-xl font-bold" style={{ color: "#EBEBF0", fontFamily: heading }}>
        Rest Day
      </p>
      <p className="text-sm mt-1.5" style={{ color: "#8A8A9A" }}>
        No compounds scheduled today.
      </p>
      {nextDay && (
        <p className="text-xs mt-3" style={{ color: "#4A4A5A", fontFamily: mono }}>
          Next scheduled: {nextDay}
        </p>
      )}
    </div>
  );
}
