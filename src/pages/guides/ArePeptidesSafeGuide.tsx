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
  { id: "not-one-answer", title: "Why Safety Isn't One Answer", level: 2 },
  { id: "fda-approved-safety", title: "FDA-Approved Peptide Safety", level: 2 },
  { id: "research-peptide-safety", title: "Research Peptide Safety", level: 2 },
  { id: "product-quality", title: "The Product Quality Problem", level: 2 },
  { id: "extra-cautious", title: "Who Should Be Extra Cautious", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const faqItems = [
  {
    question: "Are peptides safer than steroids?",
    answer:
      "Different substances, different risk profiles. Steroids have decades of data on their effects and risks. Research peptides have unknown risks because they haven't been properly studied in humans.",
  },
  {
    question: "Can peptides cause cancer?",
    answer:
      "Unknown. Growth-promoting peptides have theoretical concerns about tumor growth, but this hasn't been studied in humans. We simply don't have the data to answer this question.",
  },
  {
    question: "Are peptides safe long-term?",
    answer:
      "FDA-approved peptides: some long-term data exists from clinical trials and post-market surveillance. Research peptides: zero long-term human data exists.",
  },
];

const relatedGuides = [
  { title: "BPC-157: Complete Research Guide", href: "/guides/bpc-157-complete-guide" },
  { title: "FDA Peptide Regulations 2026", href: "/guides/peptides-fda-legal-status-2026" },
  { title: "BPC-157 vs TB-500: What's the Difference?", href: "/guides/bpc-157-vs-tb-500" },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Are Peptides Safe? Evidence-Based Safety Guide [2026]",
  description: "Honest breakdown of peptide safety in 2026. What research shows, what we don't know, and real risks to understand.",
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
    "@id": `${SITE_URL}/guides/are-peptides-safe`,
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

export default function ArePeptidesSafeGuide() {
  return (
    <GuideLayout
      title="Are Peptides Safe? Evidence-Based Safety Guide [2026]"
      description="Honest breakdown of peptide safety in 2026. What research shows, what we don't know, and real risks to understand."
      slug="are-peptides-safe"
      articleSchema={articleSchema}
      faqSchema={faqSchema}
    >
      <div className="flex gap-10">
        <GuideTableOfContents items={tocItems} />

        <article className="flex-1 max-w-3xl">
          <QuickAnswerBox
            answer="Peptide safety depends entirely on which peptide you're asking about. FDA-approved peptides (like semaglutide) have clinical trial data showing their safety profile. Unapproved research peptides (like BPC-157, TB-500) have minimal or no human safety data — animal studies show no obvious toxicity, but 'safe in rats' does not equal 'safe in humans.' The biggest real-world risk is unregulated gray market product quality."
            lastUpdated="January 30, 2026"
            readTime="9 minutes"
          />

          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            Are Peptides Safe? What the Research Actually Shows
          </h1>

          <section id="not-one-answer" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Why Safety Isn't One Answer</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              "Are peptides safe?" is like asking "are pills safe?" — it depends entirely on which one you're talking about.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Peptides fall into three distinct categories with very different safety profiles:
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-green-500/10 border-l-4 border-green-500 rounded-r-lg">
                <p className="font-semibold text-green-700 dark:text-green-400">1. FDA-Approved Peptides</p>
                <p className="text-sm text-muted-foreground">Went through clinical trials. Known safety profile. Examples: semaglutide, tirzepatide.</p>
              </div>
              <div className="p-4 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-lg">
                <p className="font-semibold text-amber-700 dark:text-amber-400">2. Research Peptides</p>
                <p className="text-sm text-muted-foreground">Animal data only. Unknown safety in humans. Examples: BPC-157, TB-500.</p>
              </div>
              <div className="p-4 bg-destructive/10 border-l-4 border-destructive rounded-r-lg">
                <p className="font-semibold text-destructive">3. Gray Market Products</p>
                <p className="text-sm text-muted-foreground">Unknown content. Unknown purity. No quality control.</p>
              </div>
            </div>
          </section>

          <section id="fda-approved-safety" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">FDA-Approved Peptide Safety</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              GLP-1 agonists (semaglutide, tirzepatide, liraglutide) have been studied in thousands of people through rigorous clinical trials:
            </p>
            <p className="text-muted-foreground mb-2 leading-relaxed"><strong>Common side effects:</strong></p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
              <li>Nausea</li>
              <li>Vomiting</li>
              <li>Diarrhea</li>
              <li>Constipation</li>
            </ul>
            <p className="text-muted-foreground mb-2 leading-relaxed"><strong>Rare but documented:</strong></p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
              <li>Pancreatitis</li>
              <li>Gallbladder issues</li>
              <li>Thyroid concerns (in animal studies)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              These are known quantities — you can have an informed discussion with your doctor about risks vs benefits.
            </p>
          </section>

          <section id="research-peptide-safety" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Research Peptide Safety</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The BPC-157 systematic review tells the story: 35 animal studies, 1 tiny human study (12 patients), 0 randomized controlled trials.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Animal studies show no obvious toxicity. But many substances that are safe in animals fail in humans — this is why we require human trials before approving drugs.
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">Evidence Level</th>
                    <th className="text-left p-3 font-semibold">What It Shows</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3">Cell studies</td>
                    <td className="p-3 text-muted-foreground">Biological activity exists</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3">Animal studies</td>
                    <td className="p-3 text-muted-foreground">No acute toxicity in those animals</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3">Small pilot</td>
                    <td className="p-3 text-muted-foreground">Tolerable short-term in few people</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3">RCT</td>
                    <td className="p-3 text-muted-foreground">Works + known risk profile</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3">Long-term follow-up</td>
                    <td className="p-3 text-muted-foreground">Real-world safety data</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-lg">
              <p className="text-sm font-medium">
                Most research peptides are stuck at level 2 (animal studies). We don't know what happens in humans.
              </p>
            </div>
          </section>

          <section id="product-quality" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">The Product Quality Problem</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Gray market peptides have a quality problem that's separate from the peptide's inherent safety:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>No FDA oversight</li>
              <li>No independent testing requirements</li>
              <li>No manufacturing standards</li>
              <li>Products found to not contain what they claim</li>
              <li>Impurities and contamination documented</li>
              <li>Wrong quantities common</li>
            </ul>
            <div className="p-4 bg-destructive/10 border-l-4 border-destructive rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>Bottom line:</strong> Even if a peptide were inherently safe, you may not know what you're actually taking when you buy from unregulated sources.
              </p>
            </div>
          </section>

          <section id="extra-cautious" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Who Should Be Extra Cautious</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Certain groups face elevated unknown risks with research peptides:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Cancer history:</strong> Growth-promoting peptides have theoretical tumor concerns</li>
              <li><strong>Autoimmune conditions:</strong> Immune-modulating effects unknown</li>
              <li><strong>Cardiovascular disease:</strong> Effects on blood vessels unclear</li>
              <li><strong>Pregnancy/breastfeeding:</strong> No safety data exists</li>
              <li><strong>Athletes:</strong> Many peptides are banned substances</li>
              <li><strong>Anyone on medications:</strong> Drug interactions unknown</li>
            </ul>
          </section>

          <section id="faq">
            <GuideFAQ items={faqItems} />
          </section>

          <BottomLineBox content="FDA-approved = known safety profile. Research peptides = unknown risks. Gray market = unknown content. Know what uncertainty you're accepting before making any decisions." />

          <RelatedGuides guides={relatedGuides} />

          <GuideCTA />

          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
