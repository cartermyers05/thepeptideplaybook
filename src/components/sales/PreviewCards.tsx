export default function PreviewCards() {
  return (
    <section className="py-10 md:py-16 px-6">
      <h2 className="text-2xl md:text-4xl font-bold text-center text-foreground">
        What you'll see inside
      </h2>
      <p className="text-muted-foreground text-base text-center mt-2 mb-10">
        A preview of what's waiting after checkout.
      </p>

      {/* Desktop grid / Mobile horizontal scroll */}
      <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-[900px] mx-auto">
        <Card1 />
        <Card2 />
        <Card3 />
      </div>
      <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-6 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
        <Card1 mobile />
        <Card2 mobile />
        <Card3 mobile />
      </div>

      {/* Mobile scroll dots */}
      <div className="flex md:hidden justify-center gap-2 mt-4">
        <div className="w-2 h-2 rounded-full bg-primary" />
        <div className="w-2 h-2 rounded-full bg-border" />
        <div className="w-2 h-2 rounded-full bg-border" />
      </div>
    </section>
  );
}

function FeatureLabel() {
  return (
    <span
      className="text-primary text-[10px] uppercase tracking-wider"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      FEATURE
    </span>
  );
}

function CardShell({ children, mobile }: { children: React.ReactNode; mobile?: boolean }) {
  return (
    <div
      className={`bg-card border border-border rounded-xl p-6 ${
        mobile ? "w-[280px] shrink-0 snap-start" : ""
      }`}
    >
      {children}
    </div>
  );
}

function Card1({ mobile }: { mobile?: boolean }) {
  return (
    <CardShell mobile={mobile}>
      <FeatureLabel />
      <p className="font-bold text-base text-foreground mt-3">
        Ask anything. Get cited answers.
      </p>
      {/* User bubble */}
      <div className="flex justify-end mt-3">
        <div className="bg-secondary rounded-lg px-3 py-2 max-w-[85%]">
          <p className="text-xs text-foreground">What about tirzepatide for weight loss?</p>
        </div>
      </div>
      {/* AI bubble */}
      <div className="mt-1.5">
        <div className="bg-background border border-border rounded-lg px-3 py-2 max-w-[90%]">
          <p className="text-xs text-foreground">
            Tirzepatide has strong Phase 3 trial data showing significant efficacy...
          </p>
          <span
            className="inline-block mt-1 bg-primary/10 text-primary text-[10px] px-1.5 py-0.5 rounded"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            STRONG — Phase 3 trials
          </span>
        </div>
      </div>
    </CardShell>
  );
}

function Card2({ mobile }: { mobile?: boolean }) {
  const rows = [
    { name: "BPC-157", level: "MODERATE", color: "text-yellow-400 bg-yellow-400/10" },
    { name: "Semaglutide", level: "STRONG", color: "text-primary bg-primary/10" },
    { name: "Selank", level: "PRELIMINARY", color: "text-muted-foreground bg-muted-foreground/10" },
  ];
  return (
    <CardShell mobile={mobile}>
      <FeatureLabel />
      <p className="font-bold text-base text-foreground mt-3">
        41+ peptides. Evidence-rated.
      </p>
      <div className="mt-3">
        {rows.map((row, i) => (
          <div
            key={i}
            className={`flex justify-between items-center py-2 ${
              i < rows.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <span className="text-xs font-bold text-foreground">{row.name}</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded ${row.color}`}
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {row.level}
            </span>
          </div>
        ))}
      </div>
      <p className="text-muted-foreground/60 text-[11px] mt-2">...and 38 more</p>
    </CardShell>
  );
}

function Card3({ mobile }: { mobile?: boolean }) {
  return (
    <CardShell mobile={mobile}>
      <FeatureLabel />
      <p className="font-bold text-base text-foreground mt-3">
        Walk in prepared. Not embarrassed.
      </p>
      <div className="bg-background border border-border rounded-lg p-3 mt-3">
        <p className="text-xs font-bold text-foreground">Step 1: Frame the conversation</p>
        <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed italic">
          "I've been reading some peer-reviewed research on peptide therapy and wanted to get your perspective on..."
        </p>
        <p
          className="text-primary text-[10px] mt-2"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          4-step framework included
        </p>
      </div>
    </CardShell>
  );
}
