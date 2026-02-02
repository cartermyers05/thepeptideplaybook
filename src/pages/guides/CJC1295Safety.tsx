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
import { GuideChangelog, ChangelogEntry } from "@/components/guides/GuideChangelog";
import { SITE_URL } from "@/lib/seo";

const tocItems = [
  { id: "what-is-cjc-1295", title: "What Is CJC-1295?", level: 2 },
  { id: "fda-position", title: "FDA Position on GH Secretagogues", level: 2 },
  { id: "known-side-effects", title: "Known Side Effects", level: 2 },
  { id: "serious-adverse-events", title: "Serious Adverse Events", level: 2 },
  { id: "drug-interactions", title: "Drug Interactions", level: 2 },
  { id: "who-should-avoid", title: "Who Should Avoid CJC-1295", level: 2 },
  { id: "what-we-dont-know", title: "What We Don't Know", level: 2 },
  { id: "primary-sources", title: "Primary Sources", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const changelogEntries: ChangelogEntry[] = [
  { date: "Feb 2, 2026", change: "Initial publication" },
];

const faqItems = [
  {
    question: "Is CJC-1295 FDA approved?",
    answer:
      "No. CJC-1295 is not FDA approved for any use. It is not approved for anti-aging, performance enhancement, or any medical condition. Its regulatory status for compounding is currently in a gray area.",
  },
  {
    question: "Can CJC-1295 cause diabetes?",
    answer:
      "Growth hormone and GH secretagogues can affect glucose metabolism and insulin sensitivity. People with diabetes, prediabetes, or metabolic syndrome may be at higher risk for complications. However, specific diabetes risk from CJC-1295 has not been formally studied.",
  },
  {
    question: "Is CJC-1295 safer than HGH?",
    answer:
      "This cannot be definitively answered. CJC-1295 stimulates natural GH release rather than adding external GH, which some suggest may be safer. However, CJC-1295 has far less safety data than pharmaceutical HGH. Unknown risks are still risks.",
  },
];

const relatedGuides = [
  { title: "Growth Hormone Peptides Guide", href: "/guides/growth-hormone-peptides-guide" },
  { title: "FDA Peptide Regulations 2026", href: "/guides/peptides-fda-legal-status-2026" },
  { title: "Are Peptides Safe? Research Overview", href: "/guides/are-peptides-safe" },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "CJC-1295 Safety: FDA Concerns & Side Effects [2026]",
  description: "CJC-1295 safety analysis: FDA concerns about GH secretagogues, known side effects, and what remains unknown. Evidence-based research summary.",
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
    "@id": `${SITE_URL}/guides/cjc-1295-safety`,
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

export default function CJC1295Safety() {
  return (
    <GuideLayout
      title="CJC-1295 Safety: FDA Concerns & Side Effects [2026]"
      description="CJC-1295 safety analysis: FDA concerns about GH secretagogues, known side effects, and what remains unknown. Evidence-based research summary."
      slug="cjc-1295-safety"
      articleSchema={articleSchema}
      faqSchema={faqSchema}
    >
      <div className="flex gap-10">
        <GuideTableOfContents items={tocItems} />

        <article className="flex-1 max-w-3xl">
          <QuickAnswerBox
            answer="CJC-1295 is a growth hormone releasing hormone (GHRH) analog that stimulates natural GH production. The FDA has noted serious adverse events associated with growth hormone secretagogues. Side effects may include water retention, joint pain, numbness/tingling, and potential effects on blood sugar. It is not FDA-approved for anti-aging or performance use."
            lastUpdated="February 2, 2026"
            readTime="9 minutes"
          />

          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            CJC-1295 Safety: What You Need to Know
          </h1>

          <section id="what-is-cjc-1295" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">What Is CJC-1295?</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              CJC-1295 is a synthetic peptide that mimics growth hormone-releasing hormone (GHRH). It stimulates the pituitary gland to release growth hormone (GH) naturally, rather than providing external GH directly.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              There are two main forms:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>CJC-1295 with DAC:</strong> Drug Affinity Complex extends half-life to days</li>
              <li><strong>CJC-1295 without DAC (Mod GRF 1-29):</strong> Shorter acting, requires more frequent administration</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Both are used in wellness and anti-aging contexts, but neither is FDA approved for these purposes.
            </p>
          </section>

          <section id="fda-position" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">FDA Position on GH Secretagogues</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The FDA has expressed concerns about growth hormone secretagogues as a class:
            </p>
            <div className="p-4 bg-destructive/10 border-l-4 border-destructive rounded-r-lg mb-4">
              <p className="text-sm font-medium">
                <strong>FDA Warning:</strong> The FDA has identified serious adverse events associated with products marketed as GH secretagogues, including products containing CJC-1295 and similar peptides.
              </p>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Key FDA concerns include:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Products marketed for anti-aging without approval</li>
              <li>Lack of safety data for long-term use</li>
              <li>Potential metabolic effects (glucose, insulin)</li>
              <li>Risk of tumor growth with sustained GH elevation</li>
            </ul>
          </section>

          <section id="known-side-effects" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Known Side Effects</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Based on limited clinical data and user reports, side effects associated with CJC-1295 include:
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">Side Effect</th>
                    <th className="text-left p-3 font-semibold">Mechanism</th>
                    <th className="text-left p-3 font-semibold">Evidence Level</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3">Water retention/bloating</td>
                    <td className="p-3 text-muted-foreground">GH effect on sodium retention</td>
                    <td className="p-3 text-muted-foreground">Common, consistent with GH effects</td>
                  </tr>
                  <tr className="border-t border-border bg-muted/30">
                    <td className="p-3">Joint pain</td>
                    <td className="p-3 text-muted-foreground">GH effect on tissues</td>
                    <td className="p-3 text-muted-foreground">Common with GH elevation</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3">Numbness/tingling</td>
                    <td className="p-3 text-muted-foreground">Carpal tunnel-like effects</td>
                    <td className="p-3 text-muted-foreground">Reported with GH therapy</td>
                  </tr>
                  <tr className="border-t border-border bg-muted/30">
                    <td className="p-3">Injection site reactions</td>
                    <td className="p-3 text-muted-foreground">Local irritation</td>
                    <td className="p-3 text-muted-foreground">Common with any injectable</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3">Headache</td>
                    <td className="p-3 text-muted-foreground">Various mechanisms</td>
                    <td className="p-3 text-muted-foreground">Anecdotal reports</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="serious-adverse-events" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Serious Adverse Events (FDA Reports)</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The FDA has received adverse event reports associated with GH secretagogues. While causation is not always proven, reported serious events include:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Cardiovascular events (mechanism unclear)</li>
              <li>Metabolic disturbances (blood sugar, insulin)</li>
              <li>Cases of rapid tumor growth (theoretical concern with any GH elevation)</li>
            </ul>
            <div className="p-4 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>Context:</strong> Adverse event reports do not prove causation. However, they warrant caution, especially for substances without formal safety studies.
              </p>
            </div>
          </section>

          <section id="drug-interactions" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Drug Interactions</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              CJC-1295 has not been formally studied for drug interactions. Based on its mechanism, potential concerns include:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>Diabetes medications:</strong> May affect blood sugar control</li>
              <li><strong>Insulin:</strong> GH can cause insulin resistance</li>
              <li><strong>Corticosteroids:</strong> Complex interactions with GH axis</li>
              <li><strong>Thyroid medications:</strong> GH affects thyroid hormone metabolism</li>
            </ul>
          </section>

          <section id="who-should-avoid" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Who Should Avoid CJC-1295</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Based on known GH effects, the following groups should exercise extreme caution or avoid CJC-1295:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>People with active cancer or cancer history</li>
              <li>Diabetics or those with impaired glucose tolerance</li>
              <li>People with heart disease</li>
              <li>Those with history of carpal tunnel syndrome</li>
              <li>Pregnant or breastfeeding women</li>
              <li>Children and adolescents</li>
            </ul>
          </section>

          <WhatWeDontKnow 
            topic="CJC-1295"
            items={[
              "Long-term safety in humans (no multi-year studies)",
              "Cancer risk with chronic GH elevation",
              "Cardiovascular effects with extended use",
              "Drug interactions (never formally studied)",
              "Optimal protocols for any use",
              "Whether pulsatile GH release is safer than sustained elevation"
            ]}
          />

          <PrimarySources 
            topic="general"
            additionalSources={[
              {
                title: "FDA Warning on Unapproved Substances",
                url: "https://www.fda.gov/drugs/human-drug-compounding/bulk-drug-substances-used-compounding",
                description: "FDA guidance on compounding regulations and unapproved substances"
              }
            ]}
          />

          <GuideChangelog entries={changelogEntries} />

          <section id="faq">
            <GuideFAQ items={faqItems} />
          </section>

          <BottomLineBox content="CJC-1295 is not FDA approved. The FDA has noted serious adverse events with GH secretagogues. Known side effects include water retention, joint pain, and potential metabolic effects. Long-term safety is unknown. People with cancer, diabetes, or heart conditions should be especially cautious." />

          <RelatedGuides guides={relatedGuides} />

          <GuideCTA />

          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
