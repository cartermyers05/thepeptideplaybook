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
  { id: "what-is-vip", title: "What is VIP?", level: 2 },
  { id: "mechanism", title: "Mechanism of Action", level: 2 },
  { id: "cirs-research", title: "CIRS and Mold Research", level: 2 },
  { id: "other-research", title: "Other Research Areas", level: 2 },
  { id: "administration", title: "Administration", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const faqItems = [
  { question: "What is VIP used for?", answer: "VIP is primarily studied for CIRS (Chronic Inflammatory Response Syndrome), mold illness, pulmonary hypertension, and conditions involving immune dysregulation." },
  { question: "Is VIP FDA approved?", answer: "No. VIP is not FDA-approved for any condition. It's used by some practitioners off-label for CIRS based on Dr. Shoemaker's protocols." },
  { question: "How is VIP administered?", answer: "Intranasal spray is the primary route for CIRS protocols. IV administration has been studied for pulmonary conditions." },
  { question: "What is the Shoemaker Protocol?", answer: "Dr. Ritchie Shoemaker developed a multi-step protocol for treating CIRS/mold illness, with VIP as one of the final steps after addressing other factors." },
  { question: "Are there side effects?", answer: "Nasal irritation is common. Some report temporary worsening of symptoms initially. Monitoring of inflammatory markers is recommended." },
];

const relatedGuides = [
  { title: "BPC-157 Complete Guide", href: "/guides/bpc-157-complete-guide", description: "Gut and healing peptide" },
  { title: "Peptides for Beginners", href: "/guides/peptides-for-beginners", description: "Getting started" },
];

const changelogEntries = [{ date: "Feb 5, 2026", change: "Initial publication" }];

const articleSchema = {
  "@context": "https://schema.org", "@type": "Article",
  headline: "VIP Peptide Research Guide",
  datePublished: "2026-02-05", dateModified: "2026-02-05",
  author: { "@type": "Organization", name: "Peptide Playbook" },
  publisher: { "@type": "Organization", name: "Peptide Playbook", url: SITE_URL },
};

export default function VIPPeptide() {
  return (
    <GuideLayout title="VIP Peptide Research Guide" description="Vasoactive Intestinal Peptide (VIP) is studied for CIRS, mold illness, pulmonary conditions, and immune regulation." slug="vip-peptide" articleSchema={articleSchema}>
      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="lg:w-64 shrink-0"><GuideTableOfContents items={tocItems} /></aside>
        <article className="flex-1 min-w-0">
          <QuickAnswerBox answer="Vasoactive Intestinal Peptide (VIP) is a 28-amino acid neuropeptide studied for chronic inflammatory response syndrome (CIRS), mold illness, pulmonary hypertension, and immune regulation." lastUpdated="February 2026" readTime="8 min" />
          <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-6">VIP Peptide Research Guide</h1>
          
          <section id="what-is-vip" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">What is VIP?</h2>
            <p className="text-muted-foreground mb-4">Vasoactive Intestinal Peptide (VIP) is a 28-amino acid neuropeptide found throughout the body, including the brain, gut, heart, and lungs. It was first isolated from the intestine but has widespread regulatory functions.</p>
            <p className="text-muted-foreground">VIP plays roles in vasodilation, smooth muscle relaxation, immune modulation, and neuroprotection.</p>
          </section>
          
          <section id="mechanism" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Mechanism of Action</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Vasodilation:</strong> Relaxes blood vessels, lowers pulmonary artery pressure</li>
              <li><strong>Anti-inflammatory:</strong> Modulates cytokine production, reduces inflammation</li>
              <li><strong>Neuroprotective:</strong> Supports neuronal survival and function</li>
              <li><strong>Immune regulation:</strong> Influences T-cell balance and autoimmune responses</li>
            </ul>
          </section>
          
          <section id="cirs-research" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">CIRS and Mold Illness Research</h2>
            <p className="text-muted-foreground mb-4">Dr. Ritchie Shoemaker pioneered the use of intranasal VIP for Chronic Inflammatory Response Syndrome (CIRS), often triggered by mold exposure.</p>
            <p className="text-muted-foreground mb-4">In his protocol, VIP is typically used as a final step after:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Removing from moldy environment</li>
              <li>Cholestyramine binding treatment</li>
              <li>Addressing MARCoNS colonization</li>
              <li>Correcting other biomarkers</li>
            </ul>
          </section>
          
          <section id="other-research" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Other Research Areas</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Pulmonary hypertension:</strong> IV VIP studied for vasodilatory effects</li>
              <li><strong>Cardiovascular:</strong> Cardioprotective properties in animal models</li>
              <li><strong>Neurological:</strong> Neuroprotective effects in Parkinson's and stroke models</li>
            </ul>
          </section>
          
          <section id="administration" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Administration</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Intranasal:</strong> Primary route for CIRS protocols</li>
              <li><strong>Dosing:</strong> Typically 50mcg per nostril, 4x daily in protocols</li>
              <li><strong>Duration:</strong> Varies; often used for extended periods in CIRS</li>
            </ul>
          </section>
          
          <GuideChangelog entries={changelogEntries} />
          <GuideFAQ items={faqItems} />
          <BottomLineBox content="VIP is a naturally occurring peptide with significant regulatory functions. Its use for CIRS/mold illness is based primarily on Dr. Shoemaker's clinical experience rather than randomized controlled trials. Practitioners specializing in CIRS typically oversee its use as part of a comprehensive treatment protocol." />
          <RelatedGuides guides={relatedGuides} />
          <GuideCTA />
          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
