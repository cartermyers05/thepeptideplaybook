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
  { id: "what-is-bpc-157", title: "What is BPC-157?", level: 2 },
  { id: "how-does-bpc-157-work", title: "How Does BPC-157 Work?", level: 2 },
  { id: "research", title: "What Does the Research Show?", level: 2 },
  { id: "fda-status", title: "FDA Status and Legality", level: 2 },
  { id: "safety", title: "Safety Profile and Concerns", level: 2 },
  { id: "access", title: "How People Access BPC-157", level: 2 },
  { id: "comparison", title: "BPC-157 vs Other Peptides", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const faqItems = [
  {
    question: "Is BPC-157 legal to buy?",
    answer:
      "BPC-157 exists in a legal gray area. It's not a controlled substance, so possession isn't necessarily illegal. However, there's no legal basis for selling it as a drug, food, or supplement in the US. Products are typically labeled 'for research use only.'",
  },
  {
    question: "Does BPC-157 actually work for injury healing?",
    answer:
      "In animal studies, BPC-157 has shown effects on tissue healing. However, no human clinical trials have proven it works for any injury in people. The honest answer is: we don't know if it works in humans.",
  },
  {
    question: "What are the side effects of BPC-157?",
    answer:
      "There is no clinical safety data on BPC-157 in humans beyond a pilot study in two people. Animal studies haven't shown obvious toxicity, but this doesn't mean it's safe for human use.",
  },
  {
    question: "Can my doctor prescribe BPC-157?",
    answer:
      "No. Because BPC-157 is a Category 2 substance, compounding pharmacies cannot legally prepare it, and there's no FDA-approved version to prescribe.",
  },
];

const relatedGuides = [
  { title: "FDA Peptide Regulations 2026: What's Legal", href: "/guides/peptides-fda-legal-status-2026" },
  { title: "Are Peptides Safe? What the Research Shows", href: "/guides/are-peptides-safe" },
  { title: "BPC-157 vs TB-500: What's the Difference?", href: "/guides/bpc-157-vs-tb-500" },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "BPC-157: Complete Guide to Research, Safety & Legal Status [2026]",
  description: "Everything you need to know about BPC-157 in 2026. FDA status, research findings, safety profile, and what confused Americans should understand.",
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
    "@id": `${SITE_URL}/guides/bpc-157-complete-guide`,
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

export default function BPC157Guide() {
  return (
    <GuideLayout
      title="BPC-157: Complete Guide to Research, Safety & Legal Status [2026]"
      description="Everything you need to know about BPC-157 in 2026. FDA status, research findings, safety profile, and what confused Americans should understand."
      slug="bpc-157-complete-guide"
      articleSchema={articleSchema}
      faqSchema={faqSchema}
    >
      <div className="flex gap-10">
        <GuideTableOfContents items={tocItems} />

        <article className="flex-1 max-w-3xl">
          <QuickAnswerBox
            answer="BPC-157 (Body Protection Compound-157) is a synthetic peptide derived from a protein found in human gastric juice. Research in animal studies suggests it may promote tissue healing, but there are no FDA-approved human uses and no completed clinical trials proving safety or efficacy in humans. As of January 2026, BPC-157 is classified as a Category 2 bulk drug substance by the FDA, meaning compounding pharmacies cannot legally provide it."
            lastUpdated="January 30, 2026"
            readTime="12 minutes"
          />

          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            BPC-157: The Complete Research Guide [2026]
          </h1>

          <section id="what-is-bpc-157" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">What is BPC-157?</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              BPC-157, short for Body Protection Compound-157, is a synthetic peptide consisting of 15 amino acids. It's derived from a naturally occurring protein found in human gastric juice — the digestive fluid in your stomach.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The "body protection" name comes from early research suggesting the peptide may help protect and heal various tissues. However, this research has been conducted almost exclusively in animals, not humans.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              BPC-157 gained popularity in wellness and biohacking communities after anecdotal reports suggested benefits for injury recovery, gut health, and general healing. Influencers and TikTok creators have promoted it heavily, often making claims that far exceed what the actual research supports.
            </p>
            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>What this means for you:</strong> BPC-157 exists in a space where hype significantly outpaces evidence. The substance has real biological activity in laboratory settings, but translating that to proven human benefits is a massive leap that hasn't been made yet.
              </p>
            </div>
          </section>

          <section id="how-does-bpc-157-work" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">How Does BPC-157 Work?</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Research in animal and cell studies has identified several potential mechanisms:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Enhancement of growth hormone receptor expression</li>
              <li>Modulation of pathways involved in cell growth and angiogenesis</li>
              <li>Reduction of inflammatory cytokines (IL-6, TNF-alpha)</li>
              <li>Interaction with nitric oxide system</li>
              <li>Activation of VEGF signaling</li>
            </ul>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Important:</strong> These mechanisms are from lab and animal studies. The human body is far more complex, and mechanisms in a petri dish don't automatically translate to people.
              </p>
            </div>
          </section>

          <section id="research" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">What Does the Research Actually Show?</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              A 2025 systematic review examined 36 studies published between 1993 and 2024:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>35 were preclinical studies (animals or cells)</li>
              <li>1 was a small retrospective human study (12 patients, no control group)</li>
              <li>0 were randomized controlled trials</li>
            </ul>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              In animal models, BPC-157 showed improvements in tendon healing, muscle repair, ligament regeneration, bone fracture healing, and gut ulcer recovery.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>The single human study:</strong> 12 patients with chronic knee pain received BPC-157 injection. 7 reported pain relief &gt;6 months. Problems: no control group, no blinding, retrospective design.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              A 2025 pilot in 2 healthy adults showed IV BPC-157 was tolerated up to 20mg. That's it — two people.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">Research Category</th>
                    <th className="text-left p-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3">Animal studies</td>
                    <td className="p-3 text-muted-foreground">Multiple positive findings</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3">Human safety data</td>
                    <td className="p-3 text-muted-foreground">2 people in pilot</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3">Human efficacy trials</td>
                    <td className="p-3 text-muted-foreground">None completed</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3">Randomized controlled trials</td>
                    <td className="p-3 text-muted-foreground">None</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3">FDA approval</td>
                    <td className="p-3 text-muted-foreground">None</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>What this means for you:</strong> The gap between "works in rats" and "proven in humans" is enormous. Current evidence does not support claims that BPC-157 is a proven treatment for anything.
              </p>
            </div>
          </section>

          <section id="fda-status" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">FDA Status and Legality in 2026</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The FDA classifies BPC-157 as a <strong>Category 2 bulk drug substance</strong>. This means:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Compounding pharmacies cannot legally make or sell it</li>
              <li>Not FDA-approved for any human use</li>
              <li>No legal basis for using in compounded medications</li>
              <li>WADA prohibits it under S0 (unapproved substances)</li>
            </ul>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>The "research chemical" loophole:</strong> Some websites sell BPC-157 labeled "for research only." This is a legal gray area with no quality control.
            </p>
            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>What this means for you:</strong> You cannot legally obtain BPC-157 through a legitimate US pharmacy.
              </p>
            </div>
          </section>

          <section id="safety" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Safety Profile and Concerns</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>What we know:</strong> Animal studies show no lethal dose or obvious organ damage. Pilot study in 2 humans showed tolerance.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>What we don't know:</strong> Long-term effects, drug interactions, effects in people with health conditions, safe dosing, effects of contaminated products.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>Theoretical concerns:</strong> BPC-157 promotes angiogenesis (blood vessel growth) — unknown implications for cancer, vascular conditions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong>Biggest real risk:</strong> Unregulated products may not contain what they claim. Contamination and mislabeling are documented issues.
            </p>
          </section>

          <section id="access" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">How People Access BPC-157</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>Pre-2023:</strong> Compounding pharmacies with prescription.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong>Now (2026):</strong> Research chemical suppliers ("not for human use"), overseas sources, gray market. No safe regulated route exists in the US.
            </p>
          </section>

          <section id="comparison" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">BPC-157 vs Other Peptides</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">Peptide</th>
                    <th className="text-left p-3 font-semibold">Focus</th>
                    <th className="text-left p-3 font-semibold">FDA Status</th>
                    <th className="text-left p-3 font-semibold">Human Data</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">BPC-157</td>
                    <td className="p-3 text-muted-foreground">Healing, gut</td>
                    <td className="p-3 text-muted-foreground">Category 2</td>
                    <td className="p-3 text-muted-foreground">Minimal</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">TB-500</td>
                    <td className="p-3 text-muted-foreground">Tissue repair</td>
                    <td className="p-3 text-muted-foreground">Category 2</td>
                    <td className="p-3 text-muted-foreground">None</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Sermorelin</td>
                    <td className="p-3 text-muted-foreground">GH release</td>
                    <td className="p-3 text-muted-foreground">Can compound</td>
                    <td className="p-3 text-muted-foreground">Some</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">CJC-1295</td>
                    <td className="p-3 text-muted-foreground">GH release</td>
                    <td className="p-3 text-muted-foreground">Limbo</td>
                    <td className="p-3 text-muted-foreground">Limited</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="faq">
            <GuideFAQ items={faqItems} />
          </section>

          <BottomLineBox content="BPC-157 has interesting animal research but has not been proven safe or effective in humans. FDA Category 2 means it's prohibited from compounding. Anyone claiming it's a 'proven treatment' is overstating the evidence." />

          <RelatedGuides guides={relatedGuides} />

          <GuideCTA />

          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
