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
  { id: "human-data-problem", title: "The Human Data Problem", level: 2 },
  { id: "animal-studies-safety", title: "What Animal Studies Show", level: 2 },
  { id: "anecdotal-reports", title: "Anecdotal Reports", level: 2 },
  { id: "theoretical-risks", title: "Theoretical Risks", level: 2 },
  { id: "fda-safety-concerns", title: "FDA Safety Concerns", level: 2 },
  { id: "quality-risks", title: "Quality/Contamination Risks", level: 2 },
  { id: "primary-sources", title: "Primary Sources", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const faqItems = [
  {
    question: "Does BPC-157 cause cancer?",
    answer:
      "There is no clinical evidence that BPC-157 causes cancer in humans. However, BPC-157 promotes angiogenesis (blood vessel growth), which is a theoretical concern because tumors require blood vessel formation to grow. No long-term human studies exist to evaluate cancer risk. This remains an unknown.",
  },
  {
    question: "Can BPC-157 damage your liver?",
    answer:
      "Animal studies have not shown liver toxicity from BPC-157. However, no human studies have evaluated liver effects. Unregulated products may contain contaminants that could affect liver function. Without proper testing, the risk of liver damage from gray market products is unknown.",
  },
  {
    question: "Is BPC-157 safe long-term?",
    answer:
      "We do not know. There are no long-term human studies on BPC-157. The longest documented human exposure is from a pilot study with only 2 participants receiving a single IV dose. Long-term effects are completely unstudied in humans.",
  },
  {
    question: "What are the most common side effects of BPC-157?",
    answer:
      "Based on anecdotal reports (not clinical trials), commonly reported effects include: nausea, dizziness, headache, flushing, and injection site reactions (redness, swelling, pain). These reports come from online forums and social media, not controlled studies.",
  },
];

const relatedGuides = [
  { title: "BPC-157: Complete Research Guide", href: "/guides/bpc-157-complete-guide" },
  { title: "Are Peptides Safe?", href: "/guides/are-peptides-safe" },
  { title: "BPC-157 WADA Banned Status", href: "/guides/bpc-157-wada-banned" },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "BPC-157 Side Effects: What Human Data Actually Exists [2026]",
  description: "Honest breakdown of BPC-157 side effects based on actual research. What animal studies show, what users report, and what remains completely unknown.",
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
    "@id": `${SITE_URL}/guides/bpc-157-side-effects`,
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

export default function BPC157SideEffects() {
  return (
    <GuideLayout
      title="BPC-157 Side Effects: What Human Data Actually Exists [2026]"
      description="Honest breakdown of BPC-157 side effects based on actual research. What animal studies show, what users report, and what remains completely unknown."
      slug="bpc-157-side-effects"
      articleSchema={articleSchema}
      faqSchema={faqSchema}
    >
      <div className="flex gap-10">
        <GuideTableOfContents items={tocItems} />

        <article className="flex-1 max-w-3xl">
          <QuickAnswerBox
            answer="There is almost no published human safety data on BPC-157. Most 'side effect' information comes from anecdotal reports on forums and social media, not clinical trials. Animal studies show low acute toxicity, but this does not prove safety for humans. Reported anecdotal side effects include nausea, dizziness, and injection site reactions."
            lastUpdated="February 2, 2026"
            readTime="8 minutes"
          />

          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            BPC-157 Side Effects: What Human Data Actually Exists
          </h1>

          <section id="human-data-problem" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">The Human Data Problem</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The fundamental problem with BPC-157 side effect information is simple: there is almost no human clinical data. A 2025 systematic review found only one pilot study in humans, involving just 2 healthy adults who received a single IV dose.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              This means most "side effect" information you find online falls into two categories:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>Animal studies:</strong> Useful but don't directly translate to humans</li>
              <li><strong>Anecdotal reports:</strong> User experiences from forums, Reddit, social media</li>
            </ul>
            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>What this means:</strong> When someone claims to know BPC-157's side effects with certainty, they're extrapolating from incomplete information. The honest answer is: we don't fully know.
              </p>
            </div>
          </section>

          <section id="animal-studies-safety" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">What Animal Studies Show About Safety</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Animal studies on BPC-157 have generally shown a favorable safety profile, but these findings have significant limitations.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">Positive Safety Signals (in Animals):</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>No lethal dose identified in standard toxicity studies</li>
              <li>No obvious organ damage in acute studies</li>
              <li>Generally well-tolerated at studied doses</li>
              <li>No significant behavioral changes observed</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Limitations of Animal Data:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Animals were studied for short periods (days to weeks)</li>
              <li>No long-term studies on chronic exposure</li>
              <li>Animal metabolism differs from human metabolism</li>
              <li>Doses used may not correspond to human dosing</li>
            </ul>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Important:</strong> "Safe in rats" does not mean "safe in humans." Many substances that appear safe in animal studies cause problems in people.
              </p>
            </div>
          </section>

          <section id="anecdotal-reports" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Anecdotal Reports: What Users Say</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Online communities (Reddit, forums, social media) contain thousands of user reports about BPC-157. While not scientific evidence, these reports provide some insight into what people experience.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">Commonly Reported Effects:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>Injection site reactions:</strong> Redness, swelling, itching, pain at injection site</li>
              <li><strong>Nausea:</strong> Especially with higher doses or oral use</li>
              <li><strong>Dizziness:</strong> Occasional reports, often temporary</li>
              <li><strong>Headache:</strong> Some users report headaches during use</li>
              <li><strong>Flushing:</strong> Warmth or redness in face/body</li>
              <li><strong>Fatigue or drowsiness:</strong> Less common but reported</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Less Common Reports:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Hot/cold sensations</li>
              <li>Changes in blood pressure (reported but unverified)</li>
              <li>Mood changes (anxiety, depression in rare cases)</li>
              <li>Gastrointestinal upset</li>
            </ul>

            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>Caveat:</strong> Anecdotal reports have major limitations. Users may have taken contaminated products, incorrect doses, or misattributed effects. Placebo and nocebo effects are significant.
              </p>
            </div>
          </section>

          <section id="theoretical-risks" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Theoretical Risks</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Based on BPC-157's known mechanisms, scientists have identified theoretical risks that haven't been studied in humans.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">Angiogenesis Concerns:</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              BPC-157 promotes angiogenesis (growth of new blood vessels). While this may help healing, it raises theoretical concerns:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Tumors require blood vessel growth; could BPC-157 promote tumor growth?</li>
              <li>Could it worsen diabetic retinopathy or other vascular conditions?</li>
              <li>What about people with existing blood vessel abnormalities?</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Other Unknowns:</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Drug interactions (never studied)</li>
              <li>Effects during pregnancy or breastfeeding (never studied)</li>
              <li>Long-term effects with chronic use (never studied)</li>
              <li>Effects in people with autoimmune conditions</li>
            </ul>
          </section>

          <section id="fda-safety-concerns" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">FDA Safety Concerns</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The FDA has classified BPC-157 as a Category 2 bulk drug substance, prohibiting its use in compounded medications. This decision reflects safety concerns.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">FDA's Position:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Insufficient safety data for human use</li>
              <li>No established safe dosing</li>
              <li>No approved manufacturing standards</li>
              <li>Risk of harm from unregulated products</li>
            </ul>

            <p className="text-muted-foreground leading-relaxed">
              The FDA has issued warning letters to companies selling BPC-157 products with therapeutic claims.
            </p>
          </section>

          <section id="quality-risks" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Quality and Contamination Risks</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Perhaps the biggest real-world risk with BPC-157 comes from product quality, not the peptide itself.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">Documented Issues:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>Under-dosing:</strong> Products containing less peptide than claimed</li>
              <li><strong>Contamination:</strong> Bacteria, endotoxins, or foreign substances</li>
              <li><strong>Degradation:</strong> Peptides breaking down from improper storage/shipping</li>
              <li><strong>Mislabeling:</strong> Wrong peptide or incorrect purity claims</li>
            </ul>

            <p className="text-muted-foreground mb-4 leading-relaxed">
              Since BPC-157 exists only in the gray market (research chemicals, overseas sources), there's no regulatory oversight ensuring product quality.
            </p>

            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>The real risk:</strong> Side effects attributed to "BPC-157" may actually be caused by contaminants, degradation products, or entirely different substances in unregulated products.
              </p>
            </div>
          </section>

          <section id="primary-sources" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Primary Sources</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>
                <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  PubMed: BPC-157 Safety Studies (Animal)
                </a>
              </li>
              <li>
                <a href="https://www.fda.gov/drugs/human-drug-compounding/bulk-drug-substances-used-compounding" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  FDA: Bulk Drug Substances in Compounding
                </a>
              </li>
              <li>
                <a href="https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  FDA: Warning Letters (Peptide Products)
                </a>
              </li>
            </ul>
          </section>

          <section id="faq">
            <GuideFAQ items={faqItems} />
          </section>

          <BottomLineBox content="BPC-157 has minimal human safety data. Animal studies suggest low acute toxicity, but this doesn't prove human safety. Anecdotal reports mention nausea, dizziness, and injection site reactions. The biggest real-world risks may come from unregulated product quality, not the peptide itself. Until human clinical trials exist, the true side effect profile remains unknown." />

          <RelatedGuides guides={relatedGuides} />

          <GuideCTA />

          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
