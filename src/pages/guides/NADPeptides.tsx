import { GuideLayout } from "@/components/guides/GuideLayout";
import { QuickAnswerBox } from "@/components/guides/QuickAnswerBox";
import { BottomLineBox } from "@/components/guides/BottomLineBox";
import { GuideFAQ } from "@/components/guides/GuideFAQ";
import { GuideCTA } from "@/components/guides/GuideCTA";
import { GuideDisclaimer } from "@/components/guides/GuideDisclaimer";
import { RelatedGuides } from "@/components/guides/RelatedGuides";
import { GuideTableOfContents } from "@/components/guides/GuideTableOfContents";
import { GuideChangelog } from "@/components/guides/GuideChangelog";
import { SITE_URL } from "@/lib/seo";

const tocItems = [
  { id: "what-is-nad", title: "What is NAD+?", level: 2 },
  { id: "decline", title: "Why NAD+ Declines", level: 2 },
  { id: "precursors", title: "NAD+ Precursors", level: 2 },
  { id: "peptides", title: "NAD-Related Peptides", level: 2 },
  { id: "administration", title: "Administration Methods", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const faqItems = [
  { question: "Is NAD+ a peptide?", answer: "No, NAD+ is a coenzyme (dinucleotide), not a peptide. However, some peptides influence NAD+ metabolism or are co-administered with NAD+ therapies." },
  { question: "What's the difference between NMN and NR?", answer: "Both are NAD+ precursors. NMN is one step closer to NAD+ in the synthesis pathway. NR (Niagen) has more published human trials. Efficacy debates continue." },
  { question: "Is NAD+ IV therapy effective?", answer: "IV NAD+ bypasses digestion for direct cellular delivery. Some clinics report benefits for fatigue, cognition, and withdrawal. Rigorous clinical trial data is limited." },
  { question: "Can I take NAD+ orally?", answer: "Direct NAD+ oral supplements exist but bioavailability is debated. Precursors (NMN, NR) are more commonly used orally." },
  { question: "How much do NAD+ levels decline with age?", answer: "Studies suggest NAD+ levels may decline 50% or more between ages 40 and 60, varying by tissue and individual." },
  { question: "Are there side effects?", answer: "IV NAD+ can cause flushing, nausea, and discomfort during infusion. Oral precursors are generally well-tolerated." },
];

const relatedGuides = [
  { title: "Epitalon Peptide", href: "/guides/epitalon-peptide", description: "Telomere research" },
  { title: "SS-31 Peptide", href: "/guides/ss-31-peptide", description: "Mitochondrial support" },
];

const changelogEntries = [{ date: "Feb 5, 2026", change: "Initial publication" }];

const articleSchema = {
  "@context": "https://schema.org", "@type": "Article",
  headline: "NAD Peptides Explained",
  datePublished: "2026-02-05", dateModified: "2026-02-05",
  author: { "@type": "Organization", name: "Peptide Playbook" },
  publisher: { "@type": "Organization", name: "Peptide Playbook", url: SITE_URL },
};

export default function NADPeptides() {
  return (
    <GuideLayout title="NAD Peptides Explained" description="NAD+ and related peptides for cellular energy, DNA repair, and longevity research. Guide to NMN, NR, NAD+ IV, and peptides that influence NAD metabolism." slug="nad-peptides" articleSchema={articleSchema}>
      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="lg:w-64 shrink-0"><GuideTableOfContents items={tocItems} /></aside>
        <article className="flex-1 min-w-0">
          <QuickAnswerBox answer="NAD+ (nicotinamide adenine dinucleotide) peptides and precursors are studied for cellular energy, DNA repair, and longevity. Key compounds include NMN, NR, NAD+ IV therapy, and peptides that boost NAD+ biosynthesis pathways." lastUpdated="February 2026" readTime="9 min" />
          <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-6">NAD Peptides Explained</h1>
          
          <section id="what-is-nad" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">What is NAD+?</h2>
            <p className="text-muted-foreground mb-4">NAD+ (nicotinamide adenine dinucleotide) is a coenzyme found in all living cells. It's essential for:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Energy production (mitochondrial function)</li>
              <li>DNA repair mechanisms</li>
              <li>Sirtuin activation (longevity genes)</li>
              <li>Cellular metabolism regulation</li>
            </ul>
          </section>
          
          <section id="decline" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Why NAD+ Declines with Age</h2>
            <p className="text-muted-foreground mb-4">NAD+ levels decline significantly with age due to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Increased NAD+-consuming enzyme activity (CD38, PARPs)</li>
              <li>Reduced biosynthesis efficiency</li>
              <li>Chronic inflammation</li>
              <li>DNA damage accumulation</li>
            </ul>
            <p className="text-muted-foreground mt-4">This decline is associated with age-related diseases and metabolic dysfunction.</p>
          </section>
          
          <section id="precursors" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">NAD+ Precursors: NMN vs NR</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">NMN (Nicotinamide Mononucleotide)</h3>
                <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                  <li>Direct precursor to NAD+</li>
                  <li>Oral dosing: 250-1000mg daily</li>
                  <li>Growing human trial data</li>
                </ul>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">NR (Nicotinamide Riboside)</h3>
                <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                  <li>Converted to NMN, then NAD+</li>
                  <li>Oral dosing: 300-600mg daily</li>
                  <li>More published clinical trials</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section id="peptides" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Peptides That Influence NAD+ Pathways</h2>
            <p className="text-muted-foreground mb-4">While NAD+ itself isn't a peptide, some peptides interact with NAD+ metabolism:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>MOTS-c:</strong> Mitochondrial peptide that may affect NAD+ utilization</li>
              <li><strong>Humanin:</strong> Mitochondrial peptide with metabolic effects</li>
              <li><strong>Epitalon:</strong> May influence cellular energy pathways indirectly</li>
            </ul>
          </section>
          
          <section id="administration" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Administration Methods</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>IV NAD+:</strong> Direct infusion, used in clinics, 250-1000mg sessions</li>
              <li><strong>Subcutaneous NAD+:</strong> Emerging option, less data available</li>
              <li><strong>Oral precursors:</strong> NMN or NR supplements, most convenient</li>
            </ul>
          </section>
          
          <GuideChangelog entries={changelogEntries} />
          <GuideFAQ items={faqItems} />
          <BottomLineBox content="NAD+ boosting strategies target a fundamental aspect of cellular aging. While direct NAD+ IV therapy offers immediate delivery, oral precursors (NMN, NR) are more practical for long-term use. The field is evolving rapidly with new research on optimal dosing and delivery methods." />
          <RelatedGuides guides={relatedGuides} />
          <GuideCTA />
          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
