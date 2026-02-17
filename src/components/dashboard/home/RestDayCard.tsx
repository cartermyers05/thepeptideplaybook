interface RestDayCardProps {
  nextDay: string | null;
}

export function RestDayCard({ nextDay }: RestDayCardProps) {
  return (
    <div
      className="rounded-[14px] p-6 text-center"
      style={{ border: "2px dashed #E8EAED" }}
    >
      <p className="text-lg font-semibold" style={{ color: "#0A0A0A" }}>Rest Day</p>
      <p className="text-sm mt-1" style={{ color: "#4B5563" }}>
        No injections scheduled today.
      </p>
      {nextDay && (
        <p className="text-[13px] mt-2" style={{ color: "#9CA3AF" }}>
          Next scheduled: {nextDay}
        </p>
      )}
    </div>
  );
}
