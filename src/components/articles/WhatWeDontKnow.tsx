import { AlertCircle } from "lucide-react";

interface WhatWeDontKnowProps {
  topic?: string;
  customBullets?: string[];
  items?: string[];
  variant?: "research-peptide" | "fda-approved" | "regulatory" | "general";
}

const RESEARCH_PEPTIDE_BULLETS = [
  "Long-term safety in humans (no multi-year studies exist)",
  "Optimal protocols and regimens (no clinical data to establish guidelines)",
  "Drug interactions (never formally studied in humans)",
  "Effects in specific populations (pregnancy, elderly, immunocompromised, those with chronic disease)",
  "Product purity and contamination risks from unregulated sources",
  "Whether findings from animal studies translate to clinical outcomes in humans",
];

const FDA_APPROVED_BULLETS = [
  "Very long-term effects beyond clinical trial durations",
  "Effects in populations not well-represented in trials",
  "Optimal duration of treatment for different conditions",
  "Full scope of drug interactions (ongoing surveillance continues)",
  "Rare adverse events that may emerge with broader use",
];

const REGULATORY_BULLETS = [
  "How regulations may change under future administrations",
  "Timeline for ongoing FDA category evaluations",
  "Whether specific peptides will gain Category 1 status",
  "International regulatory harmonization",
  "How states may implement additional restrictions",
  "Long-term enforcement priorities for research chemical suppliers",
];

const GENERAL_BULLETS = [
  "Long-term safety in humans",
  "Optimal protocols and regimens",
  "Drug interactions",
  "Effects in specific populations",
  "Product quality from unregulated sources",
];

function getBullets(variant: string): string[] {
  switch (variant) {
    case "research-peptide":
      return RESEARCH_PEPTIDE_BULLETS;
    case "fda-approved":
      return FDA_APPROVED_BULLETS;
    case "regulatory":
      return REGULATORY_BULLETS;
    default:
      return GENERAL_BULLETS;
  }
}

export function WhatWeDontKnow({ 
  topic, 
  customBullets,
  items,
  variant = "research-peptide" 
}: WhatWeDontKnowProps) {
  const bullets = items || customBullets || getBullets(variant);

  return (
    <section id="what-we-dont-know" className="mb-10">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <AlertCircle className="w-6 h-6 text-amber-500" />
        What We Don't Know
      </h2>
      <p className="text-muted-foreground mb-4 leading-relaxed">
        Despite available research{topic ? ` on ${topic}` : ""}, significant knowledge gaps remain:
      </p>
      <ul className="list-disc list-inside text-muted-foreground space-y-2">
        {bullets.map((bullet, index) => (
          <li key={index}>{bullet}</li>
        ))}
      </ul>
      <div className="mt-4 p-4 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-lg">
        <p className="text-sm font-medium">
          The absence of evidence is not evidence of safety. These unknowns represent real gaps in scientific knowledge that cannot be filled with speculation or anecdote.
        </p>
      </div>
    </section>
  );
}
