interface RestDayCardProps {
  nextDay: string | null;
}

export function RestDayCard({ nextDay }: RestDayCardProps) {
  return (
    <div
      className="rounded-2xl p-6 text-center"
      style={{ border: "2px dashed #E5E7EB" }}
    >
      <p className="text-2xl mb-2">😌</p>
      <p className="text-lg font-bold" style={{ color: "#111827" }}>Rest Day</p>
      <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
        No injections scheduled. Your body recovers and adapts on rest days.
      </p>
      {nextDay && (
        <p className="text-[13px] mt-2" style={{ color: "#9CA3AF" }}>
          Next scheduled: {nextDay}
        </p>
      )}
    </div>
  );
}
