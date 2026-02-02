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
  { id: "comparison-table", title: "Side-by-Side Comparison", level: 2 },
  { id: "bpc-157-mechanism", title: "How BPC-157 Works", level: 2 },
  { id: "tb-500-mechanism", title: "How TB-500 Works", level: 2 },
  { id: "research-comparison", title: "Research Evidence Comparison", level: 2 },
  { id: "stacking", title: "The 'Stacking' Question", level: 2 },
  { id: "cost-comparison", title: "Cost Comparison", level: 2 },
  { id: "legal-status", title: "Legal Status (Both)", level: 2 },
  { id: "primary-sources", title: "Primary Sources", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const faqItems = [
  {
    question: "Should I take BPC-157 and TB-500 together?",
    answer:
      "There is no scientific evidence supporting or refuting 'stacking' BPC-157 and TB-500. This practice comes from bodybuilding and biohacking communities, not clinical research. No studies have examined the combination in humans. The safety and efficacy of using both together is completely unknown.",
  },
  {
    question: "Which heals injuries faster: BPC-157 or TB-500?",
    answer:
      "This cannot be answered scientifically because there are no human clinical trials for either peptide for injury healing. Animal studies suggest both may promote tissue repair through different mechanisms, but animal results don't directly translate to humans. We don't know which, if either, works for human injuries.",
  },
  {
    question: "Which has fewer side effects: BPC-157 or TB-500?",
    answer:
      "Neither has sufficient human safety data to compare side effects. Animal studies suggest both have low acute toxicity, but this doesn't prove human safety. Anecdotal reports mention similar side effects (injection site reactions, nausea), but these aren't from controlled studies.",
  },
  {
    question: "Is TB-500 stronger than BPC-157?",
    answer:
      "'Stronger' isn't scientifically meaningful without human trials. They work through different mechanisms on different pathways. BPC-157 affects nitric oxide and growth factors; TB-500 involves actin binding and cell migration. Comparing potency is impossible without proper research.",
  },
];

const relatedGuides = [
  { title: "BPC-157: Complete Research Guide", href: "/guides/bpc-157-complete-guide" },
  { title: "TB-500 for Tendon Repair", href: "/guides/tb-500-tendon-repair" },
  { title: "BPC-157 vs TB-500", href: "/guides/bpc-157-vs-tb-500" },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "TB-500 vs BPC-157: Complete Comparison [2026]",
  description: "Detailed comparison of TB-500 and BPC-157 peptides. Mechanisms, research evidence, stacking, costs, and legal status explained.",
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
    "@id": `${SITE_URL}/guides/tb-500-vs-bpc-157`,
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

export default function TB500vsBPC157() {
  return (
    <GuideLayout
      title="TB-500 vs BPC-157: Complete Comparison [2026]"
      description="Detailed comparison of TB-500 and BPC-157 peptides. Mechanisms, research evidence, stacking, costs, and legal status explained."
      slug="tb-500-vs-bpc-157"
      articleSchema={articleSchema}
      faqSchema={faqSchema}
    >
      <div className="flex gap-10">
        <GuideTableOfContents items={tocItems} />

        <article className="flex-1 max-w-3xl">
          <QuickAnswerBox
            answer="BPC-157 and TB-500 are both peptides studied for tissue healing but work through different mechanisms. BPC-157 (15 amino acids) affects nitric oxide and growth factor pathways. TB-500/Thymosin Beta-4 (43 amino acids) involves actin-binding and cell migration. Neither has human clinical trial data proving efficacy. Both are FDA Category 2 (cannot be compounded) and WADA banned."
            lastUpdated="February 2, 2026"
            readTime="9 minutes"
          />

          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            TB-500 vs BPC-157: Complete Comparison
          </h1>

          <section id="comparison-table" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Side-by-Side Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">Feature</th>
                    <th className="text-left p-3 font-semibold">BPC-157</th>
                    <th className="text-left p-3 font-semibold">TB-500</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Full Name</td>
                    <td className="p-3 text-muted-foreground">Body Protection Compound-157</td>
                    <td className="p-3 text-muted-foreground">Thymosin Beta-4 fragment</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Size</td>
                    <td className="p-3 text-muted-foreground">15 amino acids</td>
                    <td className="p-3 text-muted-foreground">43 amino acids</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Origin</td>
                    <td className="p-3 text-muted-foreground">Gastric juice protein fragment</td>
                    <td className="p-3 text-muted-foreground">Thymus gland protein</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Primary Mechanism</td>
                    <td className="p-3 text-muted-foreground">Nitric oxide, growth factors</td>
                    <td className="p-3 text-muted-foreground">Actin binding, cell migration</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">FDA Status</td>
                    <td className="p-3 text-muted-foreground">Category 2 (prohibited)</td>
                    <td className="p-3 text-muted-foreground">Category 2 (prohibited)</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">WADA Status</td>
                    <td className="p-3 text-muted-foreground">Banned (S0)</td>
                    <td className="p-3 text-muted-foreground">Banned (S0)</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Human Trials</td>
                    <td className="p-3 text-muted-foreground">Minimal (2 person pilot)</td>
                    <td className="p-3 text-muted-foreground">None for injury healing</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="bpc-157-mechanism" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">How BPC-157 Works (Mechanism)</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              BPC-157 is a 15 amino acid peptide derived from a protein in human gastric juice. Research suggests it works through multiple pathways.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">Proposed Mechanisms (from animal/cell studies):</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>Nitric oxide modulation:</strong> Affects blood flow and tissue healing</li>
              <li><strong>Growth factor activation:</strong> VEGF, EGF, and other growth factors</li>
              <li><strong>Angiogenesis:</strong> Promotes new blood vessel formation</li>
              <li><strong>Anti-inflammatory effects:</strong> Reduces inflammatory cytokines</li>
              <li><strong>Collagen synthesis:</strong> May enhance structural protein production</li>
            </ul>

            <p className="text-muted-foreground leading-relaxed">
              BPC-157 is often described as having "systemic" effects, potentially working on multiple tissue types including tendons, muscles, gut, and the nervous system.
            </p>
          </section>

          <section id="tb-500-mechanism" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">How TB-500 Works (Mechanism)</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              TB-500 is a synthetic version of Thymosin Beta-4, a naturally occurring 43 amino acid peptide found throughout the body. It has a distinct mechanism from BPC-157.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">Proposed Mechanisms (from animal/cell studies):</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>Actin binding:</strong> Regulates the actin protein crucial for cell movement</li>
              <li><strong>Cell migration:</strong> Helps cells move to injury sites</li>
              <li><strong>Stem cell recruitment:</strong> May promote stem cell differentiation</li>
              <li><strong>Angiogenesis:</strong> Also promotes blood vessel growth</li>
              <li><strong>Anti-inflammatory:</strong> Reduces inflammation through different pathways</li>
            </ul>

            <p className="text-muted-foreground leading-relaxed">
              TB-500 is theorized to work more on structural tissue repair through cell mobility, while BPC-157 may work more through growth factors and circulation.
            </p>
          </section>

          <section id="research-comparison" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Research Evidence Comparison</h2>
            
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">Research Type</th>
                    <th className="text-left p-3 font-semibold">BPC-157</th>
                    <th className="text-left p-3 font-semibold">TB-500</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Animal studies</td>
                    <td className="p-3 text-muted-foreground">Many (35+ preclinical)</td>
                    <td className="p-3 text-muted-foreground">Multiple</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Human safety studies</td>
                    <td className="p-3 text-muted-foreground">1 pilot (2 people)</td>
                    <td className="p-3 text-muted-foreground">Some (mostly cardiac)</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Human efficacy trials</td>
                    <td className="p-3 text-muted-foreground">None</td>
                    <td className="p-3 text-muted-foreground">None for injury</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Tendon studies</td>
                    <td className="p-3 text-muted-foreground">Multiple (animal)</td>
                    <td className="p-3 text-muted-foreground">Some (animal)</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Muscle studies</td>
                    <td className="p-3 text-muted-foreground">Some (animal)</td>
                    <td className="p-3 text-muted-foreground">Some (animal)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>Key takeaway:</strong> Neither peptide has human clinical trials proving efficacy for injury healing. BPC-157 has more preclinical studies; TB-500 has some human cardiac research.
              </p>
            </div>
          </section>

          <section id="stacking" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">The "Stacking" Question</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              "Stacking" BPC-157 and TB-500 together is popular in bodybuilding and biohacking communities. The theory is that different mechanisms might be complementary.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">What We Know:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>No studies have tested the combination</li>
              <li>No evidence it's more effective than either alone</li>
              <li>No evidence it's safe to combine</li>
              <li>The practice is based on speculation, not science</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">The Theoretical Argument:</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Proponents suggest BPC-157's growth factor effects might complement TB-500's cell migration effects. This is plausible reasoning, but unproven.
            </p>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Reality:</strong> Combining two unproven substances doesn't equal proven benefits. It may just double the cost and unknown risks.
              </p>
            </div>
          </section>

          <section id="cost-comparison" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Cost Comparison</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Prices vary significantly depending on source, quantity, and quality claims. These are approximate ranges from gray market sources.
            </p>
            
            <div className="overflow-x-auto mb-4">
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
                    <td className="p-3 font-medium">Price per vial (5mg)</td>
                    <td className="p-3 text-muted-foreground">$30-$60</td>
                    <td className="p-3 text-muted-foreground">$40-$80</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Typical "cycle" cost</td>
                    <td className="p-3 text-muted-foreground">$100-$300</td>
                    <td className="p-3 text-muted-foreground">$150-$400</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              <strong>Note:</strong> Lower prices often indicate lower quality or questionable sourcing. "You get what you pay for" may not apply when there's no quality oversight.
            </p>
          </section>

          <section id="legal-status" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Legal Status (Both Peptides)</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              BPC-157 and TB-500 share the same legal restrictions:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>FDA:</strong> Both are Category 2 bulk drug substances</li>
              <li><strong>Compounding:</strong> Neither can be legally prepared by compounding pharmacies</li>
              <li><strong>WADA:</strong> Both banned under S0 (non-approved substances)</li>
              <li><strong>Availability:</strong> Only through "research use" gray market</li>
            </ul>

            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>For athletes:</strong> Using either peptide risks suspension from WADA, USADA, NCAA, and professional sports.
              </p>
            </div>
          </section>

          <section id="primary-sources" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Primary Sources</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>
                <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  PubMed: BPC-157 Studies
                </a>
              </li>
              <li>
                <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  PubMed: Thymosin Beta-4 Research
                </a>
              </li>
              <li>
                <a href="https://www.fda.gov/drugs/human-drug-compounding/bulk-drug-substances-used-compounding" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  FDA: Bulk Drug Substances in Compounding
                </a>
              </li>
              <li>
                <a href="https://www.wada-ama.org/en/prohibited-list" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  WADA: Prohibited List
                </a>
              </li>
            </ul>
          </section>

          <section id="faq">
            <GuideFAQ items={faqItems} />
          </section>

          <BottomLineBox content="BPC-157 and TB-500 work through different mechanisms (growth factors vs actin binding), but neither has human clinical trials proving efficacy for injury healing. Both share the same FDA Category 2 status and WADA ban. 'Stacking' is popular but unproven. The choice between them (or combining them) is based on speculation, not science." />

          <RelatedGuides guides={relatedGuides} />

          <GuideCTA />

          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
