interface StudyCardProps {
  name: string;
  year: string;
  sampleSize: number;
  finding: string;
  limitation: string;
}

export function StudyCard({ name, year, sampleSize, finding, limitation }: StudyCardProps) {
  return (
    <div
      className="rounded-xl"
      style={{
        background: "#111827",
        border: "1px solid #1E293B",
        padding: 20,
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: "#F1F5F9" }}>
          {name}
        </span>
        <span
          className="rounded-full shrink-0"
          style={{
            background: "rgba(6,214,160,0.1)",
            color: "#06D6A0",
            border: "1px solid rgba(6,214,160,0.2)",
            padding: "4px 12px",
            fontSize: 14,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {year}
        </span>
      </div>
      <p className="mb-2" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>
        <span style={{ color: "#64748B" }}>n=</span>
        <span style={{ color: "#06D6A0" }}>{sampleSize.toLocaleString()}</span>
      </p>
      <p className="mb-2" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#CBD5E1" }}>
        {finding}
      </p>
      {limitation && (
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#64748B" }}>
          <span className="italic">Limitation: </span>{limitation}
        </p>
      )}
    </div>
  );
}
