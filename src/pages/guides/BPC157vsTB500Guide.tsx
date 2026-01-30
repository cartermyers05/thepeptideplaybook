import { GuideLayout } from "@/components/guides/GuideLayout";
import { QuickAnswerBox } from "@/components/guides/QuickAnswerBox";
import { BottomLineBox } from "@/components/guides/BottomLineBox";
import { GuideFAQ } from "@/components/guides/GuideFAQ";
import { GuideCTA } from "@/components/guides/GuideCTA";
import { GuideDisclaimer } from "@/components/guides/GuideDisclaimer";
import { RelatedGuides } from "@/components/guides/RelatedGuides";
import { GuideTableOfContents } from "@/components/guides/GuideTableOfContents";
import { SITE_URL } from "@/lib/seo";

const tocItems = [
  { id: "comparison", title: "Side-by-Side Comparison", level: 2 },
  { id: "bpc-157-mechanism", title: "How BPC-157 Works", level: 2 },
  { id: "tb-500-mechanism", title: "How TB-500 Works", level: 2 },
  { id: "research-reality", title: "Research Reality", level: 2 },
  { id: "stacking", title: "The Stacking Question", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const faqItems = [
  {
    question: "Is BPC-157 better for gut issues than TB-500?",
    answer:
      "This is a popular claim based on BPC-157's origin from gastric protein. However, no human evidence supports this specialization. It's speculation based on the peptide's source, not clinical data.",
  },
  {
    question: "Can I take both together?",
    answer:
      "There is no research on combined use of BPC-157 and TB-500. You'd be adding unknowns together with no data on how they interact.",
  },
  {
    question: "Which has fewer side effects?",
    answer:
      "Neither has a validated human side effect profile. Both are anecdotally described as well-tolerated, but anecdotes aren't safety data.",
  },
];

const relatedGuides = [
  { title: "BPC-157: Complete Research Guide", href: "/guides/bpc-157-complete-guide" },
  { title: "FDA Peptide Regulations 2026", href: "/guides/peptides-fda-legal-status-2026" },
  { title: "Are Peptides Safe? What the Research Shows", href: "/guides/are-peptides-safe" },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "BPC-157 vs TB-500: Complete Comparison [2026]",
  description: "BPC-157 vs TB-500 comparison. Different mechanisms, same regulatory status. What evidence shows about these healing peptides.",
  datePublished: "2026-01-30",
  dateModified: "2026-01-30",
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
            answer="BPC-157 and TB-500 are both studied for tissue healing but work through different mechanisms. BPC-157 interacts with nitric oxide and growth factors. TB-500 works through actin-binding and cell migration. Neither has been proven safe or effective in humans. Both are FDA Category 2 prohibited substances. Claims that one is 'better' than the other are not supported by comparative data."
            lastUpdated="January 30, 2026"
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

          <section id="research-reality" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Research Reality</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>BPC-157:</strong> 35 animal studies, 1 tiny human study (12 patients, no control group).
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>TB-500:</strong> Multiple animal studies, zero human studies.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              No head-to-head comparisons exist between these peptides. When you see claims online that one is "better" for certain uses, that's based on anecdotes and speculation — not comparative evidence.
            </p>
            <div className="p-4 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-lg">
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

          <section id="faq">
            <GuideFAQ items={faqItems} />
          </section>

          <BottomLineBox content="Different mechanisms, same evidence gap — neither BPC-157 nor TB-500 is proven in humans. Both are Category 2 prohibited. Choosing between them is choosing between unknowns. Don't let marketing or forum hype convince you otherwise." />

          <RelatedGuides guides={relatedGuides} />

          <GuideCTA />

          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
