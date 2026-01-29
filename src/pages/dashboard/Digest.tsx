import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useTier } from "@/hooks/useTier";
import { UpgradePrompt } from "@/components/dashboard/UpgradePrompt";
import { Mail, Calendar, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const digests = [
  {
    month: "January 2026",
    date: "Jan 1, 2026",
    highlights: [
      "New Phase 3 trial data on retatrutide shows 24% weight loss",
      "FDA removes ipamorelin and CJC-1295 from Category 2 list",
      "Study on BPC-157 mechanism reveals VEGF pathway modulation",
    ],
  },
  {
    month: "December 2025",
    date: "Dec 1, 2025",
    highlights: [
      "Tirzepatide SURMOUNT-OSA trial shows sleep apnea improvements",
      "New safety data on long-term GLP-1 use published",
      "Research review: peptides for tendon repair",
    ],
  },
  {
    month: "November 2025",
    date: "Nov 1, 2025",
    highlights: [
      "FDA guidance update on compounding pharmacies",
      "Semaglutide cardiovascular benefit confirmed in SELECT trial",
      "Emerging research on SS-31 for mitochondrial health",
    ],
  },
];

export default function Digest() {
  const { canAccessDigest } = useTier();

  if (!canAccessDigest) {
    return (
      <DashboardLayout>
        <UpgradePrompt requiredTier="pro" feature="Research Digest" />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Research Digest
          </h1>
          <p className="text-muted-foreground">
            Monthly updates on peptide research, regulations, and emerging studies
          </p>
        </div>

        <div className="space-y-6">
          {digests.map((digest, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{digest.month} Digest</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {digest.date}
                    </p>
                  </div>
                </div>
                {i === 0 && (
                  <Badge className="bg-primary/10 text-primary">Latest</Badge>
                )}
              </div>

              <ul className="space-y-2 mb-4">
                {digest.highlights.map((highlight, j) => (
                  <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    {highlight}
                  </li>
                ))}
              </ul>

              <button className="text-sm text-primary hover:underline flex items-center gap-1">
                Read full digest <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 rounded-xl bg-muted/50 text-center">
          <p className="text-sm text-muted-foreground">
            New digests are published on the 1st of each month. 
            You'll also receive them via email.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
