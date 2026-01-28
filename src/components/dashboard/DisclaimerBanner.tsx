import { Info } from "lucide-react";

export default function DisclaimerBanner() {
  return (
    <div className="border-b border-amber-500/20 bg-amber-500/5">
      <div className="container px-4">
        <div className="flex items-center gap-3 py-2.5">
          <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
          <p className="text-sm text-foreground/80">
            <span className="font-medium text-amber-600 dark:text-amber-400">Educational information only</span>
            <span className="mx-2 text-muted-foreground">•</span>
            <span>Not medical advice</span>
            <span className="mx-2 text-muted-foreground">•</span>
            <span>Most peptides NOT FDA-approved</span>
            <span className="mx-2 text-muted-foreground">•</span>
            <span>Consult a healthcare provider</span>
          </p>
        </div>
      </div>
    </div>
  );
}
