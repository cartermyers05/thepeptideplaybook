interface EvidenceRatingProps {
  level: number;
  description: string;
}

export function EvidenceRating({ level, description }: EvidenceRatingProps) {
  const clampedLevel = Math.max(0, Math.min(5, level));

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="rounded-full"
            style={{
              width: 12,
              height: 12,
              backgroundColor: i < clampedLevel ? "#06D6A0" : "#1a1a2e",
            }}
          />
        ))}
      </div>
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          color: "#94A3B8",
        }}
      >
        {description}
      </span>
    </div>
  );
}
