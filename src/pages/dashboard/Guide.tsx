import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useTier } from "@/hooks/useTier";
import { UpgradePrompt } from "@/components/dashboard/UpgradePrompt";
import { BookOpen, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const chapters = [
  { title: "Introduction to Peptides", pages: "1-8" },
  { title: "GLP-1 Receptor Agonists", pages: "9-22" },
  { title: "Recovery Peptides (BPC-157, TB-500)", pages: "23-38" },
  { title: "Growth Hormone Secretagogues", pages: "39-52" },
  { title: "Skin and Hair Peptides", pages: "53-60" },
  { title: "Cognitive and Immune Peptides", pages: "61-70" },
  { title: "FDA Regulations and Legal Status", pages: "71-78" },
  { title: "Evaluating Sources", pages: "79-82" },
];

export default function Guide() {
  const { canAccessGuide } = useTier();

  if (!canAccessGuide) {
    return (
      <DashboardLayout>
        <UpgradePrompt requiredTier="starter" feature="The Complete Guide" />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight mb-2">
              The Complete Guide
            </h1>
            <p className="text-muted-foreground">
              80+ pages of research-based peptide education
            </p>
          </div>
          <Button className="btn-primary-clean">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>

        {/* PDF Viewer Placeholder */}
        <div className="bg-muted rounded-xl p-12 flex flex-col items-center justify-center mb-8 min-h-[400px]">
          <BookOpen className="w-16 h-16 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center">
            PDF viewer would be embedded here
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            (Integration with PDF.js or similar)
          </p>
        </div>

        {/* Table of Contents */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-semibold mb-4">Table of Contents</h2>
          <ul className="space-y-2">
            {chapters.map((chapter, i) => (
              <li
                key={i}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <span className="text-sm">{chapter.title}</span>
                <span className="text-xs text-muted-foreground">Pages {chapter.pages}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Last Updated */}
        <p className="text-xs text-muted-foreground mt-6 text-center">
          Last updated: January 15, 2026
        </p>
      </div>
    </DashboardLayout>
  );
}
