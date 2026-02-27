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
  { id: "what-is-bpc-157", title: "What is BPC-157?", level: 2 },
  { id: "how-does-bpc-157-work", title: "How Does BPC-157 Work?", level: 2 },
  { id: "animal-lab-studies", title: "Animal & Lab Studies", level: 2 },
  { id: "human-evidence", title: "Human Evidence", level: 2 },
  { id: "fda-status", title: "FDA Status and Legality", level: 2 },
  { id: "safety", title: "Safety Profile and Concerns", level: 2 },
  { id: "what-we-dont-know", title: "What We Don't Know", level: 2 },
  { id: "access", title: "How People Access BPC-157", level: 2 },
  { id: "comparison", title: "BPC-157 vs Other Peptides", level: 2 },
  { id: "primary-sources", title: "Primary Sources", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const faqItems = [
  {
    question: "Is BPC-157 FDA approved?",
    answer:
      "No. BPC-157 is not FDA-approved for any medical use. The FDA classified it as a Category 2 substance in 2024, which prohibits compounding pharmacies from producing it. It is only legally available as a research chemical.",
  },
  {
    question: "What does BPC-157 do?",
    answer:
      "In animal studies, BPC-157 has demonstrated accelerated tendon, ligament, and muscle healing, protection against gut damage from NSAIDs, reduced inflammation, and potential neuroprotective effects. No completed human clinical trials exist as of February 2026.",
  },
  {
    question: "Is BPC-157 safe?",
    answer:
      "No serious adverse effects have been reported in animal studies, even at very high doses. Anecdotal human reports commonly mention mild nausea, dizziness, and injection site irritation as the most frequent side effects. However, no human clinical trials exist to confirm safety.",
  },
  {
    question: "How do you take BPC-157?",
    answer:
      "BPC-157 can be administered via subcutaneous injection near the injury site, intramuscularly, or orally. Most users inject 250-500mcg once or twice daily. Oral administration may be effective for gut-related conditions but has lower systemic bioavailability.",
  },
  {
    question: "Does BPC-157 cause cancer?",
    answer:
      "No published research has shown BPC-157 causes cancer. Some theoretical concerns exist around its angiogenic (blood vessel forming) properties, but animal studies including long-term dosing have not demonstrated tumor formation. The absence of human clinical data means this question cannot be definitively answered.",
  },
  {
    question: "Where can I buy BPC-157?",
    answer:
      "Since the FDA's 2024 Category 2 classification, BPC-157 is no longer available from US compounding pharmacies. It can still be purchased as a research chemical from peptide suppliers, though quality and purity vary significantly.",
  },
];

const relatedGuides = [
  { title: "BPC-157 Side Effects", href: "/guides/bpc-157-side-effects" },
  { title: "BPC-157 vs TB-500: What's the Difference?", href: "/guides/bpc-157-vs-tb-500" },
  { title: "BPC-157 Cancer Risk", href: "/guides/bpc-157-cancer-risk" },
  { title: "How to Reconstitute Peptides", href: "/guides/reconstitution-guide" },
  { title: "Peptides for Beginners", href: "/guides/peptides-for-beginners" },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "BPC-157: Complete Guide to Research, Safety & Legal Status [2026]",
  description: "Everything you need to know about BPC-157 in 2026. FDA status, research findings, safety profile, and what confused Americans should understand.",
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
            answer="BPC-157 has shown tissue-healing effects in animal studies, but no published human clinical trials prove safety or efficacy. Because it is FDA Category 2 and not approved for human use, all claims should be treated as unproven. Animal research suggests potential mechanisms, but these do not translate to proven human benefits. As of 2026, compounding pharmacies cannot legally provide BPC-157."
            lastUpdated="February 2, 2026"
            readTime="12 minutes"
          />

          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            BPC-157: The Complete Research Guide [2026]
          </h1>

          <section id="what-is-bpc-157" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">What is BPC-157?</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed text-lg">
              BPC-157 (Body Protection Compound-157) is a synthetic peptide derived from a protein in human gastric juice that has shown powerful healing and anti-inflammatory effects in over 100 animal studies. It is NOT FDA-approved for human use, and the FDA classified it as a Category 2 substance in 2024, banning compounding pharmacies from producing it. Despite this, BPC-157 remains one of the most researched and discussed peptides in the biohacking community, with anecdotal human reports of accelerated injury recovery, gut healing, and reduced inflammation.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The "body protection" name comes from early research suggesting the peptide may help protect and heal various tissues. However, this research has been conducted almost exclusively in animals, not humans.
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

          <section id="animal-lab-studies" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Animal & Lab Studies</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              A 2025 systematic review examined 36 studies published between 1993 and 2024. Of these, 35 were preclinical studies conducted in animals or cell cultures.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              In animal models, BPC-157 showed improvements in:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Tendon healing (rat Achilles tendon models)</li>
              <li>Muscle repair</li>
              <li>Ligament regeneration</li>
              <li>Bone fracture healing</li>
              <li>Gut ulcer recovery</li>
            </ul>
            <div className="p-4 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-lg mb-4">
              <p className="text-sm font-medium">
                <strong>Critical limitation:</strong> Animal models don't reliably predict human outcomes. Many substances that work in rats fail in human trials. The history of drug development is filled with promising animal results that didn't translate to people.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">Research Type</th>
                    <th className="text-left p-3 font-semibold">Number of Studies</th>
                    <th className="text-left p-3 font-semibold">Findings</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3">Cell studies</td>
                    <td className="p-3 text-muted-foreground">Multiple</td>
                    <td className="p-3 text-muted-foreground">Biological activity exists</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3">Animal studies</td>
                    <td className="p-3 text-muted-foreground">35+</td>
                    <td className="p-3 text-muted-foreground">Healing effects in various models</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3">Randomized controlled trials</td>
                    <td className="p-3 text-muted-foreground">0</td>
                    <td className="p-3 text-muted-foreground">None completed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="human-evidence" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Human Evidence</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>No published human clinical trials exist for BPC-157 proving safety or efficacy.</strong>
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The available human data is extremely limited:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>12-patient study:</strong> Retrospective, no control group, no blinding. 7 of 12 reported pain relief lasting over 6 months. This study design cannot prove causation.</li>
              <li><strong>2-person pilot:</strong> Showed IV BPC-157 was tolerated up to 20mg in 2 healthy adults. That's the entire human safety dataset.</li>
            </ul>
            <div className="p-4 bg-destructive/10 border-l-4 border-destructive rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>What this means:</strong> Claims that BPC-157 is "proven" to heal injuries, fix gut issues, or provide other benefits in humans are not supported by clinical evidence. The gap between animal studies and human proof remains unbridged.
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
              <strong>Theoretical concerns:</strong> BPC-157 promotes angiogenesis (blood vessel growth). The implications for cancer, vascular conditions, and other situations are unknown.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong>Biggest real risk:</strong> Unregulated products may not contain what they claim. Contamination and mislabeling are documented issues in the gray market peptide supply.
            </p>
          </section>

          <WhatWeDontKnow topic="BPC-157" variant="research-peptide" />

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

          <PrimarySources topic="bpc-157" />

          <section id="faq">
            <GuideFAQ items={faqItems} />
          </section>

          <BottomLineBox content="BPC-157 has shown healing effects in animal studies but has not been proven safe or effective in humans. No human clinical trials exist. FDA Category 2 status means it's prohibited from compounding. Anyone claiming it's a 'proven treatment' is overstating the evidence." />

          <RelatedGuides guides={relatedGuides} />

          <GuideCTA />

          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
