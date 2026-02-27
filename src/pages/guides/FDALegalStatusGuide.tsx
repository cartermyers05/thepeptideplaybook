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
import { SITE_URL } from "@/lib/seo";

const tocItems = [
  { id: "category-system", title: "The FDA Category System", level: 2 },
  { id: "category-2", title: "Category 2 Peptides (Prohibited)", level: 2 },
  { id: "regulatory-limbo", title: "Peptides in Regulatory Limbo", level: 2 },
  { id: "fda-approved", title: "FDA-Approved Peptides", level: 2 },
  { id: "can-compound", title: "What Can Still Be Compounded", level: 2 },
  { id: "gray-market", title: "The Gray Market", level: 2 },
  { id: "what-we-dont-know", title: "What We Don't Know", level: 2 },
  { id: "primary-sources", title: "Primary Sources", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const faqItems = [
  {
    question: "Is BPC-157 legal in the US?",
    answer:
      "BPC-157 was classified as a Category 2 substance by the FDA in 2024, meaning compounding pharmacies can no longer produce it. It remains available as a research chemical from peptide suppliers, but it is not legal for human use.",
  },
  {
    question: "Can you buy peptides without a prescription?",
    answer:
      "FDA-approved peptides require a prescription. Research peptides can legally be purchased as 'for research use only' chemicals, but using them for personal health purposes exists in a legal gray area.",
  },
  {
    question: "Did the FDA ban peptides?",
    answer:
      "The FDA did not ban all peptides. It specifically restricted certain compounded peptides under Category 2 classifications. FDA-approved pharmaceutical peptides remain fully legal. The restrictions primarily affect non-FDA-approved research peptides that were previously available from compounding pharmacies.",
  },
  {
    question: "Are peptides legal in 2026?",
    answer:
      "FDA-approved peptides (semaglutide, tirzepatide, liraglutide, sermorelin, tesamorelin) are legal with a prescription. The regulatory landscape for compounded peptides remains in flux, with ongoing legal challenges and potential policy changes under the current administration.",
  },
  {
    question: "Will peptides be banned?",
    answer:
      "Complete peptide bans are extremely unlikely given that several peptides are FDA-approved blockbuster medications. The regulatory focus is on restricting unapproved compounded versions while maintaining access to pharmaceutical-grade approved products.",
  },
];

const relatedGuides = [
  { title: "BPC-157: Complete Research Guide", href: "/guides/bpc-157-complete-guide" },
  { title: "What Are Peptides?", href: "/guides/what-are-peptides" },
  { title: "Peptides for Beginners", href: "/guides/peptides-for-beginners" },
  { title: "Best Peptides for Weight Loss", href: "/guides/best-peptides-weight-loss" },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "FDA Peptide Regulations 2026: Complete Legal Status Guide",
  description: "Complete breakdown of which peptides are legal, banned, or in regulatory limbo in 2026. Category 1, Category 2, compounding rules explained.",
  datePublished: "2026-01-30",
  dateModified: "2026-02-27",
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
    "@id": `${SITE_URL}/guides/peptides-fda-legal-status-2026`,
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

export default function FDALegalStatusGuide() {
  return (
    <GuideLayout
      title="FDA Peptide Regulations 2026: Complete Legal Status Guide"
      description="Complete breakdown of which peptides are legal, banned, or in regulatory limbo in 2026. Category 1, Category 2, compounding rules explained."
      slug="peptides-fda-legal-status-2026"
      articleSchema={articleSchema}
      faqSchema={faqSchema}
    >
      <div className="flex gap-10">
        <GuideTableOfContents items={tocItems} />

        <article className="flex-1 max-w-3xl">
          <QuickAnswerBox
            answer="This guide covers FDA regulatory categories, not clinical evidence. The FDA's Category 2 designation for peptides like BPC-157 and TB-500 is based on safety concerns and lack of adequate human data, not proven harm. Category 1 peptides can be compounded; Category 2 cannot. FDA-approved peptides (semaglutide, tirzepatide) require prescriptions. Regulatory status may change as the FDA reviews evidence."
            lastUpdated="February 2, 2026"
            readTime="10 minutes"
          />

          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            FDA Peptide Regulations 2026: What's Legal and What's Not
          </h1>

          <section id="category-system" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Understanding the FDA Category System</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The FDA maintains a category system that determines which bulk drug substances can be used by compounding pharmacies:
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-green-500/10 border-l-4 border-green-500 rounded-r-lg">
                <p className="font-semibold text-green-700 dark:text-green-400">Category 1</p>
                <p className="text-sm text-muted-foreground">Can be compounded while under evaluation — no significant safety risks identified.</p>
              </div>
              <div className="p-4 bg-destructive/10 border-l-4 border-destructive rounded-r-lg">
                <p className="font-semibold text-destructive">Category 2</p>
                <p className="text-sm text-muted-foreground">Safety concerns identified — CANNOT be compounded. FDA may take action against violators.</p>
              </div>
              <div className="p-4 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-lg">
                <p className="font-semibold text-amber-700 dark:text-amber-400">Category 3</p>
                <p className="text-sm text-muted-foreground">Insufficient data — generally cannot be compounded.</p>
              </div>
            </div>
          </section>

          <section id="category-2" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Category 2 Peptides (Prohibited)</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              These peptides have been placed on the Category 2 list due to safety concerns. Compounding pharmacies cannot legally prepare them:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">Peptide</th>
                    <th className="text-left p-3 font-semibold">Common Claims</th>
                    <th className="text-left p-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "BPC-157", claims: "Healing, gut", status: "Prohibited" },
                    { name: "TB-500", claims: "Tissue repair", status: "Prohibited" },
                    { name: "AOD-9604", claims: "Fat loss", status: "Prohibited" },
                    { name: "Epithalon", claims: "Anti-aging", status: "Prohibited" },
                    { name: "GHK-Cu", claims: "Skin", status: "Prohibited" },
                    { name: "MOTS-c", claims: "Metabolism", status: "Prohibited" },
                    { name: "Dihexa", claims: "Cognitive", status: "Prohibited" },
                    { name: "Selank", claims: "Anxiety", status: "Prohibited" },
                    { name: "Thymosin Alpha-1", claims: "Immune", status: "Prohibited" },
                    { name: "DSIP", claims: "Sleep", status: "Prohibited" },
                  ].map((item, i) => (
                    <tr key={i} className="border-t border-border">
                      <td className="p-3 font-medium">{item.name}</td>
                      <td className="p-3 text-muted-foreground">{item.claims}</td>
                      <td className="p-3 text-destructive font-medium">{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              These were added in 2023 without the traditional advisory process — this sparked lawsuits that continue, but the restrictions remain in effect.
            </p>
          </section>

          <section id="regulatory-limbo" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Peptides in Regulatory Limbo</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>CJC-1295 and Ipamorelin:</strong> These were removed from Category 2 in September 2024, but they were NOT added to Category 1. The Pharmacy Compounding Advisory Committee (PCAC) recommended against their inclusion.
            </p>
            <div className="p-4 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>Result:</strong> Still cannot be legally compounded. Being removed from Category 2 doesn't mean they're approved — it just means they're in regulatory limbo.
              </p>
            </div>
          </section>

          <section id="fda-approved" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">FDA-Approved Peptides</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              These peptides have gone through FDA approval and are available by prescription:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">Peptide</th>
                    <th className="text-left p-3 font-semibold">Brand Names</th>
                    <th className="text-left p-3 font-semibold">Compounding</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Semaglutide</td>
                    <td className="p-3 text-muted-foreground">Ozempic, Wegovy</td>
                    <td className="p-3 text-muted-foreground">Very restricted</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Tirzepatide</td>
                    <td className="p-3 text-muted-foreground">Mounjaro, Zepbound</td>
                    <td className="p-3 text-muted-foreground">Very restricted</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Liraglutide</td>
                    <td className="p-3 text-muted-foreground">Victoza, Saxenda</td>
                    <td className="p-3 text-muted-foreground">Very restricted</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Compounding of FDA-approved peptides is only permitted during declared shortages and subject to strict rules.
            </p>
          </section>

          <section id="can-compound" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">What Can Still Be Compounded</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>Sermorelin</strong> meets the criteria for compounding. Substances with USP monographs or on the Category 1 list can generally be compounded with a valid prescription from a licensed healthcare provider.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Check the FDA's current Category 1 list for the most up-to-date information on which substances can be legally compounded.
            </p>
          </section>

          <section id="gray-market" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">The Gray Market</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Despite regulations, Category 2 peptides remain available through:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Research chemical suppliers ("not for human use")</li>
              <li>Overseas sources</li>
              <li>Underground markets</li>
            </ul>
            <div className="p-4 bg-destructive/10 border-l-4 border-destructive rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>Important:</strong> These products have no quality control. Just because you CAN obtain something doesn't mean it's safe, legal, or contains what it claims.
              </p>
            </div>
          </section>

          <WhatWeDontKnow variant="regulatory" />

          <PrimarySources topic="peptide-legal" />

          <section id="faq">
            <GuideFAQ items={faqItems} />
          </section>

          <BottomLineBox content="FDA peptide regulations in 2026 are restrictive. Most popular healing peptides are Category 2 banned. Legal options: FDA-approved peptides by prescription or Category 1 substances through legitimate compounding pharmacies." />

          <RelatedGuides guides={relatedGuides} />

          <GuideCTA />

          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
