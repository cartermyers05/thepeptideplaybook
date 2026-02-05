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
  { id: "what-is-epitalon", title: "What is Epitalon?", level: 2 },
  { id: "telomeres", title: "Telomeres and Aging", level: 2 },
  { id: "mechanism", title: "Mechanism of Action", level: 2 },
  { id: "research", title: "Khavinson's Research", level: 2 },
  { id: "dosing", title: "Dosing Protocols", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const faqItems = [
  { question: "Does Epitalon actually extend lifespan?", answer: "Animal studies showed increased lifespan in some models. Human longevity data is observational. Claims of lifespan extension in humans are not proven." },
  { question: "Is Epitalon FDA approved?", answer: "No. Epitalon is not FDA-approved and is sold as a research peptide. It was researched primarily in Russia." },
  { question: "How is Epitalon administered?", answer: "Subcutaneous injection is most common. Some research has explored intranasal administration." },
  { question: "What's the typical cycle length?", answer: "Research protocols typically use 5-10mg daily for 10-20 days, repeated 1-2 times per year." },
  { question: "Are there side effects?", answer: "Limited side effect data exists. Injection site reactions are reported. Theoretical concerns about stimulating any rapidly dividing cells exist." },
  { question: "Can I measure if Epitalon is working?", answer: "Telomere length testing exists but is expensive and has high variability. Melatonin levels could theoretically be monitored." },
];

const relatedGuides = [
  { title: "NAD Peptides", href: "/guides/nad-peptides", description: "Other longevity compounds" },
  { title: "SS-31 Peptide", href: "/guides/ss-31-peptide", description: "Mitochondrial research" },
];

const changelogEntries = [{ date: "Feb 5, 2026", change: "Initial publication" }];

const articleSchema = {
  "@context": "https://schema.org", "@type": "Article",
  headline: "Epitalon: The Telomere Peptide",
  datePublished: "2026-02-05", dateModified: "2026-02-05",
  author: { "@type": "Organization", name: "Peptide Playbook" },
  publisher: { "@type": "Organization", name: "Peptide Playbook", url: SITE_URL },
};

export default function EpitalonPeptide() {
  return (
    <GuideLayout title="Epitalon: The Telomere Peptide" description="Epitalon is a synthetic tetrapeptide studied for telomerase activation and anti-aging effects based on research by Dr. Vladimir Khavinson." slug="epitalon-peptide" articleSchema={articleSchema}>
      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="lg:w-64 shrink-0"><GuideTableOfContents items={tocItems} /></aside>
        <article className="flex-1 min-w-0">
          <QuickAnswerBox answer="Epitalon (Epithalon/Epithalone) is a synthetic tetrapeptide studied for its potential to activate telomerase, the enzyme that maintains telomere length. Research by Dr. Vladimir Khavinson suggests it may influence biological aging markers." lastUpdated="February 2026" readTime="10 min" />
          <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-6">Epitalon: The Telomere Peptide</h1>
          
          <section id="what-is-epitalon" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">What is Epitalon?</h2>
            <p className="text-muted-foreground mb-4">Epitalon (also spelled Epithalon or Epithalone) is a synthetic tetrapeptide with the sequence Ala-Glu-Asp-Gly. It was developed based on research into epithalamin, a peptide extract from the pineal gland.</p>
            <p className="text-muted-foreground">The peptide was primarily researched by Dr. Vladimir Khavinson at the St. Petersburg Institute of Bioregulation and Gerontology in Russia.</p>
          </section>
          
          <section id="telomeres" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Telomeres and Aging</h2>
            <p className="text-muted-foreground mb-4">Telomeres are protective caps at the ends of chromosomes that shorten with each cell division. When telomeres become critically short, cells enter senescence or die — a process linked to aging.</p>
            <p className="text-muted-foreground">Telomerase is an enzyme that can extend telomeres, potentially delaying cellular aging. Most adult cells have low telomerase activity.</p>
          </section>
          
          <section id="mechanism" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Mechanism of Action</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Telomerase activation:</strong> Research suggests Epitalon may increase telomerase activity</li>
              <li><strong>Pineal gland:</strong> May influence melatonin production</li>
              <li><strong>Gene expression:</strong> Studies show effects on various aging-related genes</li>
            </ul>
          </section>
          
          <section id="research" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Khavinson's Research</h2>
            <p className="text-muted-foreground mb-4">Dr. Khavinson's research includes:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Animal studies showing extended lifespan in some models</li>
              <li>Cell culture studies demonstrating telomerase activation</li>
              <li>Observational human studies on aging markers</li>
            </ul>
            <p className="text-muted-foreground mt-4">Note: Most research was conducted in Russia and some studies lack the rigor of Western clinical trials.</p>
          </section>
          
          <section id="dosing" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Dosing Protocols in Studies</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Typical dose:</strong> 5-10mg daily</li>
              <li><strong>Cycle length:</strong> 10-20 days</li>
              <li><strong>Frequency:</strong> 1-2 times per year</li>
              <li><strong>Administration:</strong> Subcutaneous injection</li>
            </ul>
          </section>
          
          <GuideChangelog entries={changelogEntries} />
          <GuideFAQ items={faqItems} />
          <BottomLineBox content="Epitalon is one of the most discussed peptides in longevity research, with theoretical appeal based on telomerase activation. However, clinical evidence is limited, primarily from Russian research, and no FDA approval exists. The gap between theoretical mechanisms and proven human benefits remains significant." />
          <RelatedGuides guides={relatedGuides} />
          <GuideCTA />
          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
