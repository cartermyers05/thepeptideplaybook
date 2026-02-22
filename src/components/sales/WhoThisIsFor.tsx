import { Check, X } from "lucide-react";

const forYou = [
  "You've been researching peptides and want clear, honest answers",
  "You're overwhelmed by contradictory information online",
  "You want to talk to your doctor but don't know where to start",
  "You care about evidence quality, not just hype",
  "You want one trusted source instead of 47 browser tabs",
];

const notForYou = [
  "You're looking for someone to sell you peptides",
  "You want dosing protocols or medical advice",
  "You've already read the primary research yourself",
  "You're looking for a quick fix, not actual understanding",
];

export default function WhoThisIsFor() {
  return (
    <section className="py-10 md:py-16 px-6">
      <h2 className="text-2xl md:text-4xl font-bold text-center text-foreground mb-8">
        Is this for you?
      </h2>

      <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center max-w-[700px] mx-auto">
        {/* For you */}
        <div className="flex-1 bg-card border border-primary rounded-xl p-7">
          <p className="text-primary text-base font-bold mb-4">This is for you if...</p>
          <div className="space-y-3.5">
            {forYou.map((item, i) => (
              <div key={i} className="flex gap-2.5">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-foreground text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Not for you */}
        <div className="flex-1 bg-card border border-border rounded-xl p-7">
          <p className="text-muted-foreground text-base font-bold mb-4">This is NOT for you if...</p>
          <div className="space-y-3.5">
            {notForYou.map((item, i) => (
              <div key={i} className="flex gap-2.5">
                <X className="w-4 h-4 text-muted-foreground/60 shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-muted-foreground/60 text-[13px] italic text-center max-w-[500px] mx-auto mt-6">
        Peptide Playbook is education and research. Not medical advice. Not a pharmacy.
      </p>
    </section>
  );
}
