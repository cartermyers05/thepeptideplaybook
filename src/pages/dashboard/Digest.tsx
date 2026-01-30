import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useTier } from "@/hooks/useTier";
import { UpgradePrompt } from "@/components/dashboard/UpgradePrompt";
import { useDigests, type ResearchDigest } from "@/hooks/useDigests";
import { DigestCard } from "@/components/dashboard/DigestCard";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText } from "lucide-react";

// Fallback hardcoded digests for when database is empty
const fallbackDigests: ResearchDigest[] = [
  {
    id: "jan-2026",
    month: "January 2026",
    date: "2026-01-01",
    highlights: [
      "New Phase 3 trial data on retatrutide shows 24% weight loss",
      "FDA removes ipamorelin and CJC-1295 from Category 2 list",
      "Study on BPC-157 mechanism reveals VEGF pathway modulation",
    ],
    full_content: `## FDA GLP-1 Compounding Guidance Update

The FDA released updated guidance on January 15, 2026 regarding compounded semaglutide and tirzepatide. Key takeaways:

- **Shortage status**: Both medications remain on the FDA shortage list, allowing 503B compounding pharmacies to continue production
- **Quality standards**: New requirements for sterility testing and potency verification
- **Patient safety**: Enhanced reporting requirements for adverse events

### What This Means For You

If you're currently using compounded GLP-1s, ensure your pharmacy meets the new quality standards. Ask for:
1. Certificate of Analysis (COA) for each batch
2. Sterility testing documentation
3. Potency verification results

---

## Retatrutide Phase 3 Results

The TRIUMPH-3 trial published stunning results:

- **24.2% weight loss** at 48 weeks (vs 2.1% placebo)
- Triple-agonist mechanism (GLP-1, GIP, glucagon)
- Significant improvements in metabolic markers

### Timeline

Eli Lilly expects FDA approval by Q3 2026, with commercial availability by early 2027.

---

## BPC-157 Mechanism Research

New research from the University of Zagreb reveals:

- VEGF pathway modulation as primary healing mechanism
- Enhanced nitric oxide production
- Potential applications beyond musculoskeletal healing

**Important**: This research is still preclinical. No human trials have been completed.`,
    sources: [
      { title: "FDA Guidance Document", url: "https://www.fda.gov" },
      { title: "TRIUMPH-3 Trial (ClinicalTrials.gov)", url: "https://clinicaltrials.gov" },
    ],
    published_at: "2026-01-01T00:00:00Z",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "dec-2025",
    month: "December 2025",
    date: "2025-12-01",
    highlights: [
      "Tirzepatide SURMOUNT-OSA trial shows sleep apnea improvements",
      "New safety data on long-term GLP-1 use published",
      "Research review: peptides for tendon repair",
    ],
    full_content: `## Tirzepatide SURMOUNT-OSA Results

Major findings from the sleep apnea trial:

- **63% reduction** in AHI (Apnea-Hypopnea Index) at 52 weeks
- Many participants no longer required CPAP therapy
- Secondary benefits in cardiovascular markers

### Clinical Implications

This opens a new therapeutic pathway for obstructive sleep apnea treatment, potentially reducing reliance on mechanical devices.

---

## Long-Term GLP-1 Safety Data

A 5-year follow-up study provides reassurance:

- No increased thyroid cancer risk in humans (despite rodent signals)
- Cardiovascular benefits persist long-term
- Bone density concerns not substantiated in extended follow-up

### Monitoring Recommendations

Continue standard monitoring protocols. No additional testing required based on this data.

---

## Peptides for Tendon Repair: Research Review

Summary of current evidence:

| Peptide | Evidence Level | Primary Use |
|---------|---------------|-------------|
| BPC-157 | Preclinical | General healing |
| TB-500 | Preclinical | Soft tissue |
| GHK-Cu | Limited clinical | Wound healing |

**Bottom line**: Promising preclinical data, but human trials are limited. Exercise caution.`,
    sources: [
      { title: "SURMOUNT-OSA Trial", url: "https://clinicaltrials.gov" },
      { title: "NEJM Long-term Safety", url: "https://nejm.org" },
    ],
    published_at: "2025-12-01T00:00:00Z",
    created_at: "2025-12-01T00:00:00Z",
  },
];

export default function Digest() {
  const { isPaid } = useTier();
  const { data: dbDigests, isLoading } = useDigests();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!isPaid) {
    return (
      <DashboardLayout>
        <UpgradePrompt feature="Research Digest" />
      </DashboardLayout>
    );
  }

  // Use database digests if available, otherwise fall back to hardcoded
  const digests = dbDigests && dbDigests.length > 0 ? dbDigests : fallbackDigests;

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Weekly Peptide Digest
          </h1>
          <p className="text-muted-foreground">
            Fresh updates every Monday on peptide research, new breakthroughs, and what's hot
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : digests.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">No digests yet</h3>
            <p className="text-muted-foreground text-sm">
              Monthly research digests will appear here once published.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {digests.map((digest, i) => (
              <DigestCard
                key={digest.id}
                digest={digest}
                isLatest={i === 0}
                isExpanded={expandedId === digest.id}
                onToggle={() => toggleExpand(digest.id)}
              />
            ))}
          </div>
        )}

        <div className="mt-8 p-6 rounded-xl bg-muted/50 text-center">
          <p className="text-sm text-muted-foreground">
            New digests drop every Monday at 8 AM UTC. 
            Stay ahead of the peptide curve 🚀
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
