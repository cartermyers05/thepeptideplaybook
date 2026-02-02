import { GuideLayout } from "@/components/guides/GuideLayout";
import { QuickAnswerBox } from "@/components/guides/QuickAnswerBox";
import { BottomLineBox } from "@/components/guides/BottomLineBox";
import { GuideFAQ } from "@/components/guides/GuideFAQ";
import { GuideCTA } from "@/components/guides/GuideCTA";
import { GuideDisclaimer } from "@/components/guides/GuideDisclaimer";
import { RelatedGuides } from "@/components/guides/RelatedGuides";
import { GuideTableOfContents } from "@/components/guides/GuideTableOfContents";
import { PrimarySources } from "@/components/articles/PrimarySources";
import { WhatWeDontKnow } from "@/components/articles/WhatWeDontKnow";
import { EvidenceTable, Study } from "@/components/guides/EvidenceTable";
import { GuideChangelog, ChangelogEntry } from "@/components/guides/GuideChangelog";
import { SITE_URL } from "@/lib/seo";

const tocItems = [
  { id: "human-data-problem", title: "The Human Data Problem", level: 2 },
  { id: "animal-studies", title: "What Animal Studies Show", level: 2 },
  { id: "anecdotal-reports", title: "Anecdotal Reports", level: 2 },
  { id: "theoretical-risks", title: "Theoretical Risks", level: 2 },
  { id: "what-we-dont-know", title: "What We Don't Know", level: 2 },
  { id: "primary-sources", title: "Primary Sources", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const evidenceStudies: Study[] = [
  {
    studyType: "Animal",
    species: "Rat",
    sampleSize: "Various",
    condition: "Wound healing models",
    outcome: "Tissue repair",
    result: "Improved healing observed",
    pubmedLink: "https://pubmed.ncbi.nlm.nih.gov/",
  },
  {
    studyType: "Animal",
    species: "Mouse",
    condition: "Cardiac injury",
    outcome: "Heart function",
    result: "Improved parameters",
  },
  {
    studyType: "Human",
    sampleSize: "0",
    condition: "Side effect evaluation",
    outcome: "Safety profile",
    result: "No published human trials",
  },
];

const changelogEntries: ChangelogEntry[] = [
  { date: "Feb 2, 2026", change: "Initial publication with evidence table" },
];

const faqItems = [
  {
    question: "Is TB-500 safer than BPC-157?",
    answer:
      "There is no data to support this comparison. Neither TB-500 nor BPC-157 has published human safety trials. TB-500 has less overall research than BPC-157. Claiming one is safer than the other is speculation, not science.",
  },
  {
    question: "Can TB-500 cause heart problems?",
    answer:
      "Unknown. TB-500 (Thymosin Beta-4) plays a role in cardiac tissue development and repair. Animal studies suggest potential cardioprotective effects, but effects in humans with heart conditions have not been studied. This is a significant unknown.",
  },
  {
    question: "What are the most common TB-500 side effects?",
    answer:
      "Based on anecdotal reports (not clinical data): headache, lethargy/tiredness, nausea, injection site reactions, and temporary flu-like symptoms. These are user reports, not verified in controlled studies. Actual side effect profile in humans is unknown.",
  },
];

const relatedGuides = [
  { title: "BPC-157 vs TB-500: Complete Comparison", href: "/guides/bpc-157-vs-tb-500" },
  { title: "Are Peptides Safe? Research Overview", href: "/guides/are-peptides-safe" },
  { title: "FDA Peptide Regulations 2026", href: "/guides/peptides-fda-legal-status-2026" },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "TB-500 Side Effects: What Human Data Exists [2026]",
  description: "TB-500 (Thymosin Beta-4) side effects: almost no human data exists. What animal studies show, anecdotal reports, and what remains unknown.",
  datePublished: "2026-02-02",
  dateModified: "2026-02-02",
  author: {
    "@type": "Organization",
    name: "Peptide Playbook",
  },
  publisher: {
    "@type": "Organization",
    name: "Peptide Playbook",
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`,
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/guides/tb-500-side-effects`,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function TB500SideEffects() {
  return (
    <GuideLayout
      title="TB-500 Side Effects: What Human Data Exists [2026]"
      description="TB-500 (Thymosin Beta-4) side effects: almost no human data exists. What animal studies show, anecdotal reports, and what remains unknown."
      slug="tb-500-side-effects"
      articleSchema={articleSchema}
      faqSchema={faqSchema}
    >
      <div className="flex gap-10">
        <GuideTableOfContents items={tocItems} />

        <article className="flex-1 max-w-3xl">
          <QuickAnswerBox
            answer="There is almost no published human safety data on TB-500 (Thymosin Beta-4). Side effect information comes primarily from anecdotal reports, not clinical trials. Reported effects include headache, nausea, and injection site reactions. TB-500 is FDA Category 2 and cannot be legally compounded. Long-term safety is completely unknown."
            lastUpdated="February 2, 2026"
            readTime="7 minutes"
          />

          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            TB-500 Side Effects: What We Actually Know
          </h1>

          <EvidenceTable studies={evidenceStudies} title="TB-500 Evidence Summary" />

          <section id="human-data-problem" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">The Human Data Problem</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              TB-500 (a synthetic version of Thymosin Beta-4) has been studied in animals but has essentially no published human clinical trial data for safety or efficacy.
            </p>
            <div className="p-4 bg-destructive/10 border-l-4 border-destructive rounded-r-lg mb-4">
              <p className="text-sm font-medium">
                <strong>Critical fact:</strong> When you see "side effects" listed for TB-500, these are anecdotal reports from users, not verified clinical findings. The actual side effect profile in humans has never been formally studied.
              </p>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              This means every claim about TB-500 side effects should be treated with skepticism. We genuinely don't know what happens in humans beyond user reports.
            </p>
          </section>

          <section id="animal-studies" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">What Animal Studies Show</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Animal research on Thymosin Beta-4 (the natural peptide TB-500 is based on) shows:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>No obvious acute toxicity in standard dosing ranges</li>
              <li>Effects on wound healing and tissue repair</li>
              <li>Involvement in cardiac tissue development</li>
              <li>Role in angiogenesis (blood vessel formation)</li>
            </ul>
            <div className="p-4 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>Limitation:</strong> Animal studies do not predict human side effects. What's tolerated in rats may cause problems in humans. This is why clinical trials exist.
              </p>
            </div>
          </section>

          <section id="anecdotal-reports" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Anecdotal Reports (User Data)</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The following "side effects" are reported in online forums and user discussions. These are NOT verified in clinical studies:
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">Reported Effect</th>
                    <th className="text-left p-3 font-semibold">Frequency</th>
                    <th className="text-left p-3 font-semibold">Evidence Level</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3">Headache</td>
                    <td className="p-3 text-muted-foreground">Common in reports</td>
                    <td className="p-3 text-muted-foreground">Anecdotal only</td>
                  </tr>
                  <tr className="border-t border-border bg-muted/30">
                    <td className="p-3">Lethargy/Tiredness</td>
                    <td className="p-3 text-muted-foreground">Occasional</td>
                    <td className="p-3 text-muted-foreground">Anecdotal only</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3">Nausea</td>
                    <td className="p-3 text-muted-foreground">Occasional</td>
                    <td className="p-3 text-muted-foreground">Anecdotal only</td>
                  </tr>
                  <tr className="border-t border-border bg-muted/30">
                    <td className="p-3">Injection site reactions</td>
                    <td className="p-3 text-muted-foreground">Common</td>
                    <td className="p-3 text-muted-foreground">Expected with any injection</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3">Temporary flu-like symptoms</td>
                    <td className="p-3 text-muted-foreground">Occasional</td>
                    <td className="p-3 text-muted-foreground">Anecdotal only</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              <strong>Important:</strong> Forum reports have significant limitations. Users may attribute unrelated symptoms to TB-500, products may be contaminated, and placebo/nocebo effects are common.
            </p>
          </section>

          <section id="theoretical-risks" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Theoretical Risks</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Based on Thymosin Beta-4's known biological activities, potential concerns include:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>Angiogenesis effects:</strong> Like BPC-157, TB-500 promotes blood vessel growth, raising theoretical cancer concerns</li>
              <li><strong>Cardiac effects:</strong> Unknown effects in people with existing heart conditions</li>
              <li><strong>Immune modulation:</strong> May affect immune function in unpredictable ways</li>
              <li><strong>Product contamination:</strong> Research peptides may contain harmful contaminants</li>
            </ul>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Note:</strong> These are theoretical concerns, not proven risks. But they also haven't been ruled out by research.
              </p>
            </div>
          </section>

          <WhatWeDontKnow 
            topic="TB-500"
            items={[
              "Long-term safety in humans (no studies exist)",
              "Actual side effect frequency and severity",
              "Drug interactions with any medication",
              "Effects in people with heart conditions",
              "Effects in people with cancer or cancer history",
              "Whether anecdotal reports accurately reflect real effects",
              "Safe duration of use or protocols"
            ]}
          />

          <PrimarySources 
            topic="tb-500"
            additionalSources={[
              {
                title: "Thymosin Beta-4 Overview",
                url: "https://pubmed.ncbi.nlm.nih.gov/",
                description: "Research on the natural peptide Thymosin Beta-4 (basis for TB-500)"
              }
            ]}
          />

          <GuideChangelog entries={changelogEntries} />

          <section id="faq">
            <GuideFAQ items={faqItems} />
          </section>

          <BottomLineBox content="TB-500 has essentially no human safety data. All 'side effects' are anecdotal reports from user forums, not clinical findings. The actual safety profile is unknown. TB-500 is FDA Category 2 and cannot be legally compounded. Anyone claiming to know TB-500's side effects definitively is speculating beyond available evidence." />

          <RelatedGuides guides={relatedGuides} />

          <GuideCTA />

          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
