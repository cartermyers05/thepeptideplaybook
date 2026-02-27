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
  { id: "comparison", title: "Side-by-Side Comparison", level: 2 },
  { id: "bpc-157-mechanism", title: "How BPC-157 Works", level: 2 },
  { id: "tb-500-mechanism", title: "How TB-500 Works", level: 2 },
  { id: "animal-lab-studies", title: "Animal & Lab Studies", level: 2 },
  { id: "human-evidence", title: "Human Evidence", level: 2 },
  { id: "stacking", title: "The Stacking Question", level: 2 },
  { id: "what-we-dont-know", title: "What We Don't Know", level: 2 },
  { id: "primary-sources", title: "Primary Sources", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const faqItems = [
  {
    question: "Is BPC-157 better for gut issues than TB-500?",
    answer:
      "This is a popular claim based on BPC-157's origin from gastric protein. However, no human evidence supports this specialization. It's speculation based on the peptide's source, not clinical data.",
  },
  {
    question: "Can I take BPC-157 and TB-500 together?",
    answer:
      "There is no research on combined use of BPC-157 and TB-500. You'd be adding unknowns together with no data on how they interact. Many users stack both, but this is based entirely on anecdotal reports, not evidence.",
  },
  {
    question: "Which has fewer side effects?",
    answer:
      "Neither has a validated human side effect profile. Both are anecdotally described as well-tolerated, but anecdotes aren't safety data.",
  },
  {
    question: "Are BPC-157 and TB-500 legal?",
    answer:
      "Both BPC-157 and TB-500 are FDA Category 2 substances, meaning compounding pharmacies cannot legally produce them. They are also prohibited by WADA. They can be purchased as research chemicals but are not legal for human use.",
  },
  {
    question: "Which is better for tendon injuries?",
    answer:
      "BPC-157 has more published animal studies on tendon healing, while TB-500 works through a different mechanism (actin binding and cell migration). No human comparative data exists. Claims that one is definitively better are not supported by evidence.",
  },
];

const relatedGuides = [
  { title: "BPC-157: Complete Research Guide", href: "/guides/bpc-157-complete-guide" },
  { title: "BPC-157 Side Effects", href: "/guides/bpc-157-side-effects" },
  { title: "TB-500 Research Guide", href: "/guides/tb-500-research-guide" },
  { title: "FDA Peptide Regulations 2026", href: "/guides/peptides-fda-legal-status-2026" },
  { title: "Are Peptides Safe? What the Research Shows", href: "/guides/are-peptides-safe" },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "BPC-157 vs TB-500: Complete Comparison [2026]",
  description: "BPC-157 vs TB-500 comparison. Different mechanisms, same regulatory status. What evidence shows about these healing peptides.",
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
    "@id": `${SITE_URL}/guides/bpc-157-vs-tb-500`,
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

const bpc157AndTb500Sources = [
  {
    title: "BPC 157: A Systematic Review (2024)",
    url: "https://pubmed.ncbi.nlm.nih.gov/30915550/",
    description: "Comprehensive review of 36 BPC-157 studies examining preclinical evidence.",
  },
  {
    title: "Thymosin Beta-4 and Tissue Repair",
    url: "https://pubmed.ncbi.nlm.nih.gov/20515666/",
    description: "Review of TB-4 mechanisms in wound healing and tissue regeneration.",
  },
];

export default function BPC157vsTB500Guide() {
  return (
    <GuideLayout
      title="BPC-157 vs TB-500: Complete Comparison [2026]"
      description="BPC-157 vs TB-500 comparison. Different mechanisms, same regulatory status. What evidence shows about these healing peptides."
      slug="bpc-157-vs-tb-500"
      articleSchema={articleSchema}
      faqSchema={faqSchema}
    >
      <div className="flex gap-10">
        <GuideTableOfContents items={tocItems} />

        <article className="flex-1 max-w-3xl">
          <QuickAnswerBox
            answer="BPC-157 and TB-500 have both shown tissue-healing effects in animal studies, but neither has been proven safe or effective in humans. No human clinical trials exist for either peptide. BPC-157 interacts with nitric oxide and growth factors; TB-500 works through actin-binding and cell migration. Both are FDA Category 2 prohibited substances and WADA banned. Claims that one is 'better' than the other are not supported by comparative human data."
            lastUpdated="February 2, 2026"
            readTime="7 minutes"
          />

          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            BPC-157 vs TB-500: What's the Difference?
          </h1>

          <section id="comparison" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Side-by-Side Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">Factor</th>
                    <th className="text-left p-3 font-semibold">BPC-157</th>
                    <th className="text-left p-3 font-semibold">TB-500</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Full name</td>
                    <td className="p-3 text-muted-foreground">Body Protection Compound-157</td>
                    <td className="p-3 text-muted-foreground">Thymosin Beta-4</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Origin</td>
                    <td className="p-3 text-muted-foreground">Gastric protein</td>
                    <td className="p-3 text-muted-foreground">Thymus protein</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Size</td>
                    <td className="p-3 text-muted-foreground">15 amino acids</td>
                    <td className="p-3 text-muted-foreground">43 amino acids</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Mechanism</td>
                    <td className="p-3 text-muted-foreground">NO, VEGF, growth factors</td>
                    <td className="p-3 text-muted-foreground">Actin binding, cell migration</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Human trials</td>
                    <td className="p-3 text-muted-foreground">1 small (12 patients)</td>
                    <td className="p-3 text-muted-foreground">None</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">FDA status</td>
                    <td className="p-3 text-destructive font-medium">Category 2</td>
                    <td className="p-3 text-destructive font-medium">Category 2</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">WADA</td>
                    <td className="p-3 text-muted-foreground">Prohibited</td>
                    <td className="p-3 text-muted-foreground">Prohibited</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="bpc-157-mechanism" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">How BPC-157 Works</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Based on animal and cell studies, BPC-157 appears to work through:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Interaction with nitric oxide system</li>
              <li>Enhancement of growth hormone receptors</li>
              <li>Promotion of angiogenesis (blood vessel growth)</li>
              <li>Reduction of inflammatory cytokines</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              All of these mechanisms come from animal or cell studies — not proven in humans.
            </p>
          </section>

          <section id="tb-500-mechanism" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">How TB-500 Works</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              TB-500 (Thymosin Beta-4) has a different mechanism:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Binds to actin (cell structure protein)</li>
              <li>Affects cell migration to injury sites</li>
              <li>Promotes angiogenesis</li>
              <li>Has been used in veterinary medicine (horses)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Like BPC-157, all preclinical data — no human trials exist.
            </p>
          </section>

          <section id="animal-lab-studies" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Animal & Lab Studies</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Both peptides have shown effects in preclinical research:
            </p>
            <div className="space-y-4 mb-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-semibold mb-2">BPC-157 Animal Data</p>
                <p className="text-sm text-muted-foreground">35+ animal studies showing effects on tendon healing, muscle repair, ligament regeneration, and gut ulcer recovery in rat models.</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-semibold mb-2">TB-500 Animal Data</p>
                <p className="text-sm text-muted-foreground">Multiple animal studies demonstrating wound healing effects, used in veterinary medicine for horses. Cell migration and tissue repair observed in lab settings.</p>
              </div>
            </div>
            <div className="p-4 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>Critical limitation:</strong> Animal models don't reliably predict human outcomes. What works in rats or horses may not work in humans, and what appears safe in animals may cause unexpected problems in people.
              </p>
            </div>
          </section>

          <section id="human-evidence" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Human Evidence</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>BPC-157:</strong> 1 small retrospective study of 12 patients with chronic knee pain. No control group, no blinding. This study design cannot prove the peptide works.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>TB-500:</strong> No published human clinical trials exist.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>No head-to-head comparisons exist between these peptides in humans.</strong> When you see claims online that one is "better" for certain uses, that's based on anecdotes and speculation — not comparative evidence.
            </p>
            <div className="p-4 bg-destructive/10 border-l-4 border-destructive rounded-r-lg">
              <p className="text-sm font-medium">
                Online forums are full of opinions about BPC-157 vs TB-500. These are personal experiences, not evidence. What works for one person tells you nothing about what will work for you.
              </p>
            </div>
          </section>

          <section id="stacking" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">The Stacking Question</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Online forums frequently discuss "stacking" BPC-157 and TB-500 together. The reality:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Zero studies on the combination</li>
              <li>No data on how they interact</li>
              <li>Theoretical synergy is speculation, not science</li>
              <li>Combined unknowns = compounded uncertainty</li>
            </ul>
            <div className="p-4 bg-destructive/10 border-l-4 border-destructive rounded-r-lg">
              <p className="text-sm font-medium">
                When you combine two substances with unknown safety profiles, you're not doubling your uncertainty — you're multiplying it.
              </p>
            </div>
          </section>

          <WhatWeDontKnow topic="BPC-157 and TB-500" variant="research-peptide" />

          <PrimarySources sources={bpc157AndTb500Sources} />

          <section id="faq">
            <GuideFAQ items={faqItems} />
          </section>

          <BottomLineBox content="Different mechanisms, same evidence gap — neither BPC-157 nor TB-500 is proven safe or effective in humans. Both are Category 2 prohibited. Choosing between them is choosing between unknowns. Don't let marketing or forum hype convince you otherwise." />

          <RelatedGuides guides={relatedGuides} />

          <GuideCTA />

          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
