import { AlertTriangle } from "lucide-react";

export function GuideDisclaimer() {
  return (
    <div className="mt-12 p-4 bg-muted/50 rounded-lg border border-border">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="font-semibold text-foreground">Medical Disclaimer:</strong>{" "}
          This content is for educational purposes only and does not constitute medical
          advice. Peptide Playbook does not sell peptides. Always consult a healthcare
          provider before making any decisions about your health.
        </p>
      </div>
    </div>
  );
}
