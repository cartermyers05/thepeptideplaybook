import { HelpCircle } from "lucide-react";

interface WhatWeDontKnowProps {
  unknowns: string[];
  title?: string;
}

export function WhatWeDontKnow({ unknowns, title = "What We Don't Know" }: WhatWeDontKnowProps) {
  if (!unknowns || unknowns.length === 0) {
    return null;
  }

  return (
    <section className="my-8 p-6 bg-amber-500/5 border border-amber-500/20 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle className="w-5 h-5 text-amber-600" />
        <h3 className="text-lg font-semibold text-amber-700 dark:text-amber-400">{title}</h3>
      </div>
      <p className="text-muted-foreground text-sm mb-4">
        Despite the research available, significant gaps in our knowledge remain:
      </p>
      <ul className="space-y-2">
        {unknowns.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-muted-foreground">
            <span className="text-amber-600 mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
