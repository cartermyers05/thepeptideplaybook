import { Clock } from "lucide-react";

const rows = [
  ["Reddit threads & YouTube rabbit holes", "AI coach trained on 500+ studies"],
  ["No idea which sources to trust", "Evidence ratings on every answer"],
  ["Peptide clinics: $300–500/month", "One payment: $67 for life"],
  ["Feel awkward bringing it up to your doctor", "Doctor conversation scripts included"],
  ["Hours of research, still confused", "Ask a question, get a cited answer in seconds"],
];

export default function ComparisonTable() {
  return (
    <section className="py-10 md:py-16 px-6">
      <h2 className="text-2xl md:text-4xl font-bold text-center text-foreground mb-8">
        The old way vs. the Playbook
      </h2>

      <div className="max-w-[700px] mx-auto bg-card border border-border rounded-xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-2">
          <div className="px-3 md:px-5 py-3 md:py-4 border-b border-r border-border">
            <span className="text-muted-foreground text-xs md:text-[13px] font-bold">
              WITHOUT Peptide Playbook
            </span>
          </div>
          <div className="px-3 md:px-5 py-3 md:py-4 border-b border-border bg-primary/[0.04]">
            <span className="text-primary text-xs md:text-[13px] font-bold">
              WITH Peptide Playbook
            </span>
          </div>
        </div>

        {/* Data rows */}
        {rows.map(([left, right], i) => (
          <div key={i} className="grid grid-cols-2">
            <div
              className={`px-3 md:px-5 py-3 md:py-3.5 text-muted-foreground text-xs md:text-[13px] border-r border-border ${
                i < rows.length - 1 ? "border-b border-border" : ""
              }`}
            >
              {left}
            </div>
            <div
              className={`px-3 md:px-5 py-3 md:py-3.5 text-foreground text-xs md:text-[13px] bg-primary/[0.04] ${
                i < rows.length - 1 ? "border-b border-border" : ""
              }`}
            >
              {right}
            </div>
          </div>
        ))}
      </div>

      {/* Urgency line */}
      <div className="flex justify-center mt-6">
        <div className="border border-border rounded-lg px-5 py-3 inline-flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
          <span className="text-muted-foreground text-[13px]">
            Launch price: $67. This increases as we add more peptides and features.
          </span>
        </div>
      </div>
    </section>
  );
}
