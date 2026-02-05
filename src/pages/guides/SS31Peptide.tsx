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
  { id: "what-is-ss31", title: "What is SS-31?", level: 2 },
  { id: "mechanism", title: "Mechanism of Action", level: 2 },
  { id: "research", title: "Research Findings", level: 2 },
  { id: "clinical-status", title: "Clinical Development", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const faqItems = [
  { question: "What is SS-31 used for?", answer: "SS-31 is studied for age-related mitochondrial dysfunction, heart failure, kidney disease, and conditions involving impaired cellular energy production." },
  { question: "Is SS-31 FDA approved?", answer: "No. SS-31 (Elamipretide) remains in clinical trials. It has received Fast Track designation for certain conditions but is not yet approved." },
  { question: "How does SS-31 target mitochondria?", answer: "SS-31 concentrates in the inner mitochondrial membrane by binding to cardiolipin, stabilizing the membrane and reducing oxidative stress." },
  { question: "What company is developing SS-31?", answer: "Stealth BioTherapeutics is developing Elamipretide (SS-31) for mitochondrial diseases and age-related conditions." },
  { question: "Are there any side effects?", answer: "Clinical trials have reported injection site reactions and some gastrointestinal effects. Overall tolerability has been acceptable in studies." },
  { question: "Is SS-31 available as a research peptide?", answer: "Some research chemical suppliers offer SS-31, but quality varies significantly. The pharmaceutical development version has stricter manufacturing." },
];

const relatedGuides = [
  { title: "NAD Peptides", href: "/guides/nad-peptides", description: "Other longevity compounds" },
  { title: "Epitalon Peptide", href: "/guides/epitalon-peptide", description: "Telomere research" },
];

const changelogEntries = [{ date: "Feb 5, 2026", change: "Initial publication" }];

const articleSchema = {
  "@context": "https://schema.org", "@type": "Article",
  headline: "SS-31: Mitochondrial Peptide Research Guide",
  datePublished: "2026-02-05", dateModified: "2026-02-05",
  author: { "@type": "Organization", name: "Peptide Playbook" },
  publisher: { "@type": "Organization", name: "Peptide Playbook", url: SITE_URL },
};

export default function SS31Peptide() {
  return (
    <GuideLayout title="SS-31: Mitochondrial Peptide Research Guide" description="SS-31 (Elamipretide) is a mitochondria-targeting peptide studied for age-related mitochondrial dysfunction, heart failure, and cellular energy production." slug="ss-31-peptide" articleSchema={articleSchema}>
      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="lg:w-64 shrink-0"><GuideTableOfContents items={tocItems} /></aside>
        <article className="flex-1 min-w-0">
          <QuickAnswerBox answer="SS-31 (Elamipretide) is a mitochondria-targeting peptide studied for age-related mitochondrial dysfunction, heart failure, and cellular energy production. It concentrates in the inner mitochondrial membrane to reduce oxidative stress." lastUpdated="February 2026" readTime="10 min" />
          <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-6">SS-31: Mitochondrial Peptide Research Guide</h1>
          
          <section id="what-is-ss31" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">What is SS-31?</h2>
            <p className="text-muted-foreground mb-4">SS-31, also known as Elamipretide or Bendavia, is a tetrapeptide that selectively targets and concentrates in the inner mitochondrial membrane. It was developed by Stealth BioTherapeutics for treating mitochondrial dysfunction.</p>
            <p className="text-muted-foreground">The peptide's unique property is its ability to penetrate cells and accumulate specifically in mitochondria, where it binds to cardiolipin — a phospholipid essential for mitochondrial function.</p>
          </section>
          
          <section id="mechanism" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Mechanism of Action</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Cardiolipin binding:</strong> Stabilizes mitochondrial membrane structure</li>
              <li><strong>Electron transport:</strong> Improves efficiency of energy production</li>
              <li><strong>ROS reduction:</strong> Decreases reactive oxygen species generation</li>
              <li><strong>ATP production:</strong> Enhances cellular energy output</li>
            </ul>
          </section>
          
          <section id="research" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Research Findings</h2>
            <p className="text-muted-foreground mb-4">Clinical and preclinical research has examined SS-31 for:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Heart failure with preserved ejection fraction</li>
              <li>Primary mitochondrial myopathy</li>
              <li>Age-related kidney function decline</li>
              <li>Skeletal muscle dysfunction in aging</li>
            </ul>
          </section>
          
          <section id="clinical-status" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Clinical Development Status</h2>
            <p className="text-muted-foreground mb-4">Stealth BioTherapeutics has conducted multiple Phase II and Phase III trials. The compound has received FDA Fast Track designation for Barth syndrome and primary mitochondrial myopathy.</p>
            <p className="text-muted-foreground">As of 2026, approval decisions are pending for certain indications.</p>
          </section>
          
          <GuideChangelog entries={changelogEntries} />
          <GuideFAQ items={faqItems} />
          <BottomLineBox content="SS-31 represents a novel approach to treating mitochondrial dysfunction by directly targeting the inner mitochondrial membrane. While not yet FDA-approved, ongoing clinical trials show promise for age-related conditions and primary mitochondrial diseases." />
          <RelatedGuides guides={relatedGuides} />
          <GuideCTA />
          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
