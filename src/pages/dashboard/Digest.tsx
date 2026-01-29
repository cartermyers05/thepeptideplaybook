import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useTier } from "@/hooks/useTier";
import { UpgradePrompt } from "@/components/dashboard/UpgradePrompt";
import { Mail, Calendar, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";

const digests = [
  {
    id: "jan-2026",
    month: "January 2026",
    date: "Jan 1, 2026",
    highlights: [
      "New Phase 3 trial data on retatrutide shows 24% weight loss",
      "FDA removes ipamorelin and CJC-1295 from Category 2 list",
      "Study on BPC-157 mechanism reveals VEGF pathway modulation",
    ],
    fullContent: `## FDA GLP-1 Compounding Guidance Update

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
  },
  {
    id: "dec-2025",
    month: "December 2025",
    date: "Dec 1, 2025",
    highlights: [
      "Tirzepatide SURMOUNT-OSA trial shows sleep apnea improvements",
      "New safety data on long-term GLP-1 use published",
      "Research review: peptides for tendon repair",
    ],
    fullContent: `## Tirzepatide SURMOUNT-OSA Results

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
  },
  {
    id: "nov-2025",
    month: "November 2025",
    date: "Nov 1, 2025",
    highlights: [
      "FDA guidance update on compounding pharmacies",
      "Semaglutide cardiovascular benefit confirmed in SELECT trial",
      "Emerging research on SS-31 for mitochondrial health",
    ],
    fullContent: `## FDA Compounding Pharmacy Guidance

Key regulatory updates:

- 503A pharmacies face stricter limitations
- 503B outsourcing facilities gain more flexibility
- Interstate shipping rules clarified

### Action Items

1. Verify your pharmacy's 503A vs 503B status
2. Confirm compliance with new guidelines
3. Request updated documentation

---

## SELECT Trial Cardiovascular Results

Semaglutide shows 20% reduction in major cardiovascular events:

- Heart attack, stroke, and cardiovascular death all reduced
- Benefits independent of weight loss
- FDA considering label expansion

### Who Benefits Most

Patients with established cardiovascular disease and obesity showed the greatest benefit.

---

## SS-31 (Elamipretide) Research

Emerging mitochondrial peptide showing promise:

- Targets cardiolipin in mitochondrial membrane
- Phase 2 trials in heart failure underway
- Potential applications in aging research

**Status**: Investigational only. Not available outside clinical trials.`,
    sources: [
      { title: "FDA Compounding Guidance", url: "https://www.fda.gov" },
      { title: "SELECT Trial Results", url: "https://nejm.org" },
    ],
  },
];

export default function Digest() {
  const { canAccessDigest } = useTier();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!canAccessDigest) {
    return (
      <DashboardLayout>
        <UpgradePrompt requiredTier="pro" feature="Research Digest" />
      </DashboardLayout>
    );
  }

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

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
            <div key={digest.id} className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="p-6">
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

                <Button
                  variant="ghost"
                  className="text-sm text-primary hover:text-primary p-0 h-auto"
                  onClick={() => toggleExpand(digest.id)}
                >
                  {expandedId === digest.id ? (
                    <>
                      Hide full digest <ChevronUp className="w-4 h-4 ml-1" />
                    </>
                  ) : (
                    <>
                      Read full digest <ChevronDown className="w-4 h-4 ml-1" />
                    </>
                  )}
                </Button>
              </div>

              {expandedId === digest.id && (
                <div className="border-t border-border bg-muted/30 p-6">
                  <div className="prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground">
                    <ReactMarkdown>{digest.fullContent}</ReactMarkdown>
                  </div>

                  {digest.sources.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-border">
                      <p className="text-xs font-medium text-muted-foreground mb-2">Sources</p>
                      <div className="flex flex-wrap gap-2">
                        {digest.sources.map((source, idx) => (
                          <a
                            key={idx}
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline flex items-center gap-1"
                          >
                            {source.title}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
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
