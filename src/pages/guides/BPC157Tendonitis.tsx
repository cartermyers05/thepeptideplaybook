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
  { id: "what-is-bpc-157", title: "What Is BPC-157?", level: 2 },
  { id: "animal-studies", title: "Animal Studies on Tendon Healing", level: 2 },
  { id: "human-evidence", title: "Human Evidence (Currently None)", level: 2 },
  { id: "mechanism", title: "How BPC-157 Theoretically Works", level: 2 },
  { id: "risks-unknowns", title: "Risks and Unknowns", level: 2 },
  { id: "legal-status", title: "Legal Status", level: 2 },
  { id: "primary-sources", title: "Primary Sources", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const faqItems = [
  {
    question: "How long does BPC-157 take to heal tendons?",
    answer:
      "There is no established timeline for tendon healing with BPC-157 in humans because no human clinical trials exist. In animal studies, improvements were seen over weeks, but animal healing does not directly translate to humans. Anecdotal reports vary widely from weeks to months.",
  },
  {
    question: "Is BPC-157 better than physical therapy for tendonitis?",
    answer:
      "There is no scientific evidence to answer this question. BPC-157 has never been tested against physical therapy or any other tendonitis treatment in humans. Physical therapy has decades of clinical evidence supporting its use for tendonitis. BPC-157 does not.",
  },
  {
    question: "Can I use BPC-157 for tennis elbow?",
    answer:
      "Tennis elbow (lateral epicondylitis) is a form of tendonitis. BPC-157 has shown tendon-healing effects in rat models, but there are no human studies specifically on tennis elbow or any tendon condition. It is not FDA-approved and cannot be legally compounded in the US.",
  },
  {
    question: "Should I inject BPC-157 near the injury site?",
    answer:
      "There is no established protocol for BPC-157 injection in humans. Some animal studies used local injection near the injury, others used systemic administration. Without human clinical trials, optimal administration methods are unknown. This is not medical advice.",
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
  headline: "BPC-157 for Tendonitis: What Does the Research Show? [2026]",
  description: "Evidence-based analysis of BPC-157 for tendon healing. Animal study findings, why there's no human data, and what this means for tendonitis treatment.",
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
    "@id": `${SITE_URL}/guides/bpc-157-tendonitis`,
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

export default function BPC157Tendonitis() {
  return (
    <GuideLayout
      title="BPC-157 for Tendonitis: What Does the Research Show? [2026]"
      description="Evidence-based analysis of BPC-157 for tendon healing. Animal study findings, why there's no human data, and what this means for tendonitis treatment."
      slug="bpc-157-tendonitis"
      articleSchema={articleSchema}
      faqSchema={faqSchema}
    >
      <div className="flex gap-10">
        <GuideTableOfContents items={tocItems} />

        <article className="flex-1 max-w-3xl">
          <QuickAnswerBox
            answer="BPC-157 has shown tendon-healing effects in multiple animal studies, including rat Achilles tendon models. However, there are zero published human clinical trials specifically on tendonitis. The animal data is promising but cannot be directly applied to human treatment decisions. BPC-157 is not FDA-approved and is banned by WADA."
            lastUpdated="February 2, 2026"
            readTime="9 minutes"
          />

          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            BPC-157 for Tendonitis: What Does the Research Show?
          </h1>

          <section id="what-is-bpc-157" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">What Is BPC-157?</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              BPC-157 (Body Protection Compound-157) is a synthetic peptide consisting of 15 amino acids. It's derived from a protein found naturally in human gastric juice.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              In laboratory and animal studies, BPC-157 has shown effects on tissue repair, including tendons, ligaments, muscles, and the GI tract. These findings have made it popular in wellness and athletic communities for injury recovery.
            </p>
            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>Key point:</strong> Despite popularity, BPC-157 has never been proven to work for tendonitis or any injury in humans through clinical trials.
              </p>
            </div>
          </section>

          <section id="animal-studies" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Animal Studies on Tendon Healing</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Several animal studies have examined BPC-157's effects on tendon healing, primarily in rats.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">Achilles Tendon Studies (Rats):</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Transected (cut) Achilles tendons showed improved healing with BPC-157</li>
              <li>Increased collagen organization observed</li>
              <li>Enhanced mechanical strength in some studies</li>
              <li>Effects seen with both local and systemic administration</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Other Tendon Studies:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Quadriceps tendon repairs showed accelerated healing</li>
              <li>Rotator cuff models (limited studies)</li>
              <li>Tendon-to-bone healing improvements reported</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">What These Studies Showed:</h3>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">Finding</th>
                    <th className="text-left p-3 font-semibold">Evidence Level</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3">Accelerated tendon healing</td>
                    <td className="p-3 text-muted-foreground">Animal studies only</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3">Improved collagen formation</td>
                    <td className="p-3 text-muted-foreground">Animal studies only</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3">Enhanced mechanical strength</td>
                    <td className="p-3 text-muted-foreground">Some animal studies</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3">Works for human tendonitis</td>
                    <td className="p-3 text-muted-foreground">No evidence</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Important limitation:</strong> Rat tendons heal differently than human tendons. Results in rodent models often fail to translate to human outcomes.
              </p>
            </div>
          </section>

          <section id="human-evidence" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Human Evidence: Currently None</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              As of February 2026, there are no published human clinical trials on BPC-157 for tendonitis or any tendon injury.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">What Exists:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>One small retrospective study (12 patients, knee pain, no control group)</li>
              <li>One pilot safety study (2 healthy adults, IV administration, single dose)</li>
              <li>No randomized controlled trials</li>
              <li>No studies specifically on tendonitis in humans</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">What This Means:</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Claims that BPC-157 "works" for tendonitis are extrapolations from animal data, not proven human outcomes. We simply do not know if it helps human tendon injuries.
            </p>

            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>The evidence gap:</strong> The jump from "helps rat tendons" to "treats human tendonitis" is enormous and unproven.
              </p>
            </div>
          </section>

          <section id="mechanism" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">How BPC-157 Theoretically Works on Tendons</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Based on animal and cell studies, researchers have identified potential mechanisms:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>Growth factor modulation:</strong> May affect VEGF, EGF, and other growth factors involved in tissue repair</li>
              <li><strong>Angiogenesis:</strong> Promotes blood vessel formation (important for healing)</li>
              <li><strong>Collagen synthesis:</strong> May enhance collagen production and organization</li>
              <li><strong>Anti-inflammatory effects:</strong> Reduces inflammatory markers in some models</li>
              <li><strong>Nitric oxide modulation:</strong> Affects blood flow and healing processes</li>
            </ul>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Caveat:</strong> These are mechanisms observed in laboratory settings. Whether they produce clinically meaningful tendon healing in humans is unknown.
              </p>
            </div>
          </section>

          <section id="risks-unknowns" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Risks and Unknowns</h2>
            
            <h3 className="text-xl font-semibold mb-3">Unknown Factors:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Optimal dosing for tendon injuries (no human studies)</li>
              <li>Best administration route (injection site, oral, other)</li>
              <li>Duration of treatment needed</li>
              <li>Long-term effects on tendon tissue</li>
              <li>Drug interactions</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Potential Risks:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Contaminated or mislabeled products (no quality control)</li>
              <li>Injection site infections or reactions</li>
              <li>Unknown long-term effects</li>
              <li>May not work at all for human tendons</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">What Works for Tendonitis (With Evidence):</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Physical therapy and eccentric exercises</li>
              <li>Rest and activity modification</li>
              <li>Anti-inflammatory approaches (ice, NSAIDs short-term)</li>
              <li>Corticosteroid injections (short-term relief)</li>
              <li>PRP (emerging evidence, mixed results)</li>
            </ul>
          </section>

          <section id="legal-status" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Legal Status</h2>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>FDA:</strong> Category 2 bulk drug substance (cannot be compounded)</li>
              <li><strong>WADA:</strong> Prohibited under S0 (non-approved substances)</li>
              <li><strong>US availability:</strong> Only through "research use only" gray market</li>
              <li><strong>Prescription:</strong> No legal basis for prescribing</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Athletes subject to drug testing (NCAA, Olympic, professional sports) risk suspension for using BPC-157.
            </p>
          </section>

          <section id="primary-sources" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Primary Sources</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>
                <a href="https://pubmed.ncbi.nlm.nih.gov/21030672/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  PubMed: BPC-157 and Achilles Tendon Healing in Rats
                </a>
              </li>
              <li>
                <a href="https://pubmed.ncbi.nlm.nih.gov/20225319/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  PubMed: BPC-157 Tendon-to-Bone Healing
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

          <BottomLineBox content="BPC-157 shows promising tendon-healing effects in animal studies, particularly rat Achilles tendon models. However, there are zero human clinical trials proving it works for tendonitis. The animal data cannot be directly applied to human treatment. If you have tendonitis, proven treatments like physical therapy have far more evidence than BPC-157." />

          <RelatedGuides guides={relatedGuides} />

          <GuideCTA />

          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
