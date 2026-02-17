const mono = "'JetBrains Mono', ui-monospace, monospace";
const heading = "'Outfit', sans-serif";

interface RestDayCardProps {
  nextDay: string | null;
}

export function RestDayCard({ nextDay }: RestDayCardProps) {
  return (
    <div className="rounded-[16px] p-8 text-center border-2 border-dashed border-border">
      <p className="text-xl font-bold text-foreground" style={{ fontFamily: heading }}>
        Rest Day
      </p>
      <p className="text-sm mt-1.5 text-muted-foreground">
        No compounds scheduled today.
      </p>
      {nextDay && (
        <p className="text-xs mt-3 text-muted-foreground" style={{ fontFamily: mono }}>
          Next scheduled: {nextDay}
        </p>
      )}
    </div>
  );
}
