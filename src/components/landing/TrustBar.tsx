const items = [
  "📚 500+ studies analyzed",
  "💊 45+ peptides covered",
  "🚫 No conflicts of interest",
  "✅ 30-day money-back guarantee",
  "⚡ Instant access",
];

export function TrustBar() {
  return (
    <section className="bg-[#0a0a0f] border-t border-b border-[#1E293B] px-5 py-8">
      <div className="max-w-[900px] mx-auto grid grid-cols-2 md:flex md:justify-between md:items-center gap-3 md:gap-4">
        {items.map((item, i) => (
          <span
            key={i}
            className="text-center text-[13px] md:text-[14px] text-[#94A3B8]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
