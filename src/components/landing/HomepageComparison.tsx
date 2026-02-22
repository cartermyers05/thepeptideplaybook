const rows = [
  { source: "Reddit", time: "10+ hours", cost: "Free", personalized: "No", trustworthy: "🤷" },
  { source: "TikTok", time: "Fast", cost: "Free", personalized: "No", trustworthy: "🤷" },
  { source: "Clinics", time: "Weeks", cost: "$300–500", personalized: "Yes", trustworthy: "Yes" },
  { source: "Books", time: "Hours", cost: "$30–200", personalized: "No", trustworthy: "Maybe" },
  {
    source: "Peptide Playbook",
    time: "Minutes",
    cost: "$67",
    personalized: "Yes",
    trustworthy: "Yes ✓",
    highlighted: true,
  },
];

const fields = ["Time", "Cost", "Personalized?", "Trustworthy?"] as const;
const fieldKeys = ["time", "cost", "personalized", "trustworthy"] as const;

export function HomepageComparison() {
  return (
    <section className="bg-[#0a0a0f] px-5 py-[60px] md:px-10 md:py-20">
      <h2 className="text-center font-bold text-[24px] md:text-[36px] text-[#F1F5F9] mb-8">
        Let's compare your options
      </h2>
      <div className="max-w-[760px] mx-auto space-y-3">
        {rows.map((row, i) => (
          <div
            key={i}
            className="rounded-xl p-4"
            style={{
              background: row.highlighted ? "#0D1F17" : "#111827",
              border: `1px solid ${row.highlighted ? "#06D6A0" : "#1E293B"}`,
            }}
          >
            <p
              className="font-bold text-[16px] mb-2"
              style={{ color: row.highlighted ? "#06D6A0" : "#F1F5F9" }}
            >
              {row.source}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {fields.map((label, j) => (
                <div key={j}>
                  <span className="text-[11px] text-[#64748B] uppercase tracking-wide" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {label}
                  </span>
                  <p className="text-[14px] text-[#94A3B8]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {(row as any)[fieldKeys[j]]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="text-center mt-6 text-[16px] md:text-[18px] text-[#94A3B8] italic max-w-[600px] mx-auto">
        You could keep Googling. Or you could get a straight answer in the next 5 minutes.
      </p>
    </section>
  );
}
