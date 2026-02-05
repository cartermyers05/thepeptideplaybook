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
import { Link } from "react-router-dom";

const tocItems = [
  { id: "what-is-tb500", title: "What is TB-500?", level: 2 },
  { id: "mechanism", title: "Mechanism of Action", level: 2 },
  { id: "research", title: "Research Findings", level: 2 },
  { id: "comparison", title: "TB-500 vs BPC-157", level: 2 },
  { id: "dosing", title: "Dosing Protocols", level: 2 },
  { id: "side-effects", title: "Side Effects", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const faqItems = [
  { question: "What is TB-500 used for?", answer: "TB-500 is studied for wound healing, tissue repair, inflammation reduction, and recovery from injuries. It's particularly popular in equine medicine." },
  { question: "How does TB-500 differ from BPC-157?", answer: "TB-500 works systemically through cell migration and angiogenesis. BPC-157 works more locally through the nitric oxide system. They're often stacked." },
  { question: "Is TB-500 FDA approved?", answer: "No. TB-500 is not FDA-approved for any human use. It's sold as a research peptide." },
  { question: "How long until TB-500 works?", answer: "Effects on healing may be noticed within 2-4 weeks. Full benefits typically develop over 4-8 weeks of consistent use." },
  { question: "Can I use TB-500 for muscle growth?", answer: "TB-500 isn't a muscle builder but supports recovery between workouts. Faster healing may indirectly support training consistency." },
  { question: "Is TB-500 banned in sports?", answer: "Yes. TB-500 is prohibited by WADA under the S0 category (Non-Approved Substances)." },
];

const relatedGuides = [
  { title: "BPC-157 Complete Guide", href: "/guides/bpc-157-complete-guide", description: "Complementary healing peptide" },
  { title: "BPC-157 vs TB-500", href: "/guides/bpc-157-vs-tb-500", description: "Detailed comparison" },
  { title: "Best Peptides for Muscle Growth", href: "/guides/best-peptides-muscle-growth", description: "Recovery and growth" },
];

const changelogEntries = [{ date: "Feb 5, 2026", change: "Initial publication" }];

const articleSchema = {
  "@context": "https://schema.org", "@type": "Article",
  headline: "TB-500: Complete Research Guide",
  datePublished: "2026-02-05", dateModified: "2026-02-05",
  author: { "@type": "Organization", name: "Peptide Playbook" },
  publisher: { "@type": "Organization", name: "Peptide Playbook", url: SITE_URL },
};

export default function TB500ResearchGuide() {
  return (
    <GuideLayout title="TB-500: Complete Research Guide" description="TB-500 (Thymosin Beta-4) is a 43-amino acid peptide studied for wound healing, tissue repair, and inflammation reduction." slug="tb-500-research-guide" articleSchema={articleSchema}>
      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="lg:w-64 shrink-0"><GuideTableOfContents items={tocItems} /></aside>
        <article className="flex-1 min-w-0">
          <QuickAnswerBox answer="TB-500 (Thymosin Beta-4) is a 43-amino acid peptide studied for wound healing, tissue repair, inflammation reduction, and cardiac repair. It works by promoting cell migration, blood vessel formation, and reducing inflammatory cytokines." lastUpdated="February 2026" readTime="11 min" />
          <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-6">TB-500: Complete Research Guide</h1>
          
          <section id="what-is-tb500" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">What is TB-500?</h2>
            <p className="text-muted-foreground mb-4">TB-500 is a synthetic version of Thymosin Beta-4 (Tβ4), a naturally occurring 43-amino acid peptide present in most tissues and cell types. It was originally isolated from the thymus gland.</p>
            <p className="text-muted-foreground">TB-500 is widely used in equine medicine and has become popular in human biohacking communities for its potential healing properties.</p>
          </section>
          
          <section id="mechanism" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Mechanism of Action</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Actin binding:</strong> TB-500 sequesters actin, promoting cell migration</li>
              <li><strong>Angiogenesis:</strong> Stimulates new blood vessel formation</li>
              <li><strong>Anti-inflammatory:</strong> Reduces inflammatory cytokines</li>
              <li><strong>Stem cell differentiation:</strong> May promote tissue-specific cell development</li>
            </ul>
          </section>
          
          <section id="research" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Research Findings</h2>
            <p className="text-muted-foreground mb-4">Thymosin Beta-4 research includes:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Wound healing:</strong> Accelerated closure in animal models</li>
              <li><strong>Cardiac repair:</strong> Improved outcomes post-heart attack in animals</li>
              <li><strong>Neurological:</strong> Neuroprotective effects in stroke models</li>
              <li><strong>Musculoskeletal:</strong> Tendon and muscle repair enhancement</li>
            </ul>
            <p className="text-muted-foreground mt-4">Human clinical data is limited. Most research is preclinical or observational.</p>
          </section>
          
          <section id="comparison" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">TB-500 vs BPC-157</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead><tr className="border-b border-border"><th className="text-left py-3 pr-4">Factor</th><th className="text-left py-3 pr-4">TB-500</th><th className="text-left py-3">BPC-157</th></tr></thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50"><td className="py-3 pr-4">Origin</td><td className="py-3 pr-4">Thymus gland</td><td className="py-3">Gastric juice</td></tr>
                  <tr className="border-b border-border/50"><td className="py-3 pr-4">Mechanism</td><td className="py-3 pr-4">Cell migration, angiogenesis</td><td className="py-3">Nitric oxide, growth factors</td></tr>
                  <tr className="border-b border-border/50"><td className="py-3 pr-4">Effects</td><td className="py-3 pr-4">Systemic</td><td className="py-3">More localized</td></tr>
                  <tr className="border-b border-border/50"><td className="py-3 pr-4">Best for</td><td className="py-3 pr-4">Widespread tissue repair</td><td className="py-3">Targeted healing, gut</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mt-4">See <Link to="/guides/bpc-157-vs-tb-500" className="text-primary hover:underline">BPC-157 vs TB-500 comparison</Link>.</p>
          </section>
          
          <section id="dosing" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Dosing Protocols in Research</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Loading phase:</strong> 2-5mg twice weekly for 4-6 weeks</li>
              <li><strong>Maintenance:</strong> 2mg twice weekly</li>
              <li><strong>Administration:</strong> Subcutaneous injection</li>
            </ul>
          </section>
          
          <section id="side-effects" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Side Effects</h2>
            <p className="text-muted-foreground mb-4">Limited human data. Reported effects include:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Injection site reactions</li>
              <li>Head rush or lightheadedness (uncommon)</li>
              <li>Lethargy initially</li>
            </ul>
            <p className="text-muted-foreground mt-4">See <Link to="/guides/tb-500-side-effects" className="text-primary hover:underline">TB-500 side effects guide</Link>.</p>
          </section>
          
          <GuideChangelog entries={changelogEntries} />
          <GuideFAQ items={faqItems} />
          <BottomLineBox content="TB-500 is one of the most studied peptides for tissue repair, with strong animal research supporting its wound healing and regenerative effects. Human clinical data is limited. It's often combined with BPC-157 for comprehensive healing support." />
          <RelatedGuides guides={relatedGuides} />
          <GuideCTA />
          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
