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
  { id: "topical", title: "Topical GHK-Cu", level: 2 },
  { id: "injectable", title: "Injectable GHK-Cu", level: 2 },
  { id: "microneedling", title: "Microneedling", level: 2 },
  { id: "comparison", title: "Side-by-Side Comparison", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const faqItems = [
  { question: "Which method is safer?", answer: "Topical application has the lowest risk profile as effects are localized. Injectable routes carry standard injection risks and potential systemic effects." },
  { question: "Can I use both topical and injectable?", answer: "Some protocols combine both for localized skin benefits plus systemic effects. Start with one method to assess response." },
  { question: "How long until I see results with topical?", answer: "Skin texture improvements typically visible in 4-8 weeks with consistent daily application." },
  { question: "Is topical GHK-Cu absorbed systemically?", answer: "Minimal systemic absorption through intact skin. Peptides generally don't penetrate deep enough for significant systemic effects topically." },
  { question: "What concentration is best for topical use?", answer: "Research uses 0.05-4% concentration. Most effective products contain 1-2% GHK-Cu." },
  { question: "Does microneedling increase absorption?", answer: "Yes. Micro-channels allow deeper penetration. This is an emerging area of research combining mechanical and biochemical approaches." },
];

const relatedGuides = [
  { title: "GHK-Cu: Complete Guide", href: "/guides/ghk-cu-complete-guide", description: "Full research overview" },
  { title: "Peptide Reconstitution", href: "/guides/peptide-reconstitution", description: "How to mix peptides" },
];

const changelogEntries = [{ date: "Feb 5, 2026", change: "Initial publication" }];

const articleSchema = {
  "@context": "https://schema.org", "@type": "Article",
  headline: "GHK-Cu: Topical vs Injectable",
  datePublished: "2026-02-05", dateModified: "2026-02-05",
  author: { "@type": "Organization", name: "Peptide Playbook" },
  publisher: { "@type": "Organization", name: "Peptide Playbook", url: SITE_URL },
};

export default function GHKCuTopicalVsInjectable() {
  return (
    <GuideLayout title="GHK-Cu: Topical vs Injectable" description="GHK-Cu can be used topically or via subcutaneous injection. Comparing localized skin benefits vs systemic regenerative effects." slug="ghk-cu-topical-vs-injectable" articleSchema={articleSchema}>
      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="lg:w-64 shrink-0"><GuideTableOfContents items={tocItems} /></aside>
        <article className="flex-1 min-w-0">
          <QuickAnswerBox answer="GHK-Cu can be used topically (serums, creams) or via subcutaneous injection. Topical application targets localized skin benefits with minimal risk, while injectable routes offer systemic regenerative effects studied in research settings." lastUpdated="February 2026" readTime="8 min" />
          <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-6">GHK-Cu: Topical vs Injectable</h1>
          
          <section id="topical" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Topical GHK-Cu</h2>
            <p className="text-muted-foreground mb-4">Topical GHK-Cu is applied directly to skin via serums, creams, or lotions. Research uses concentrations from 0.05% to 4%.</p>
            <div className="bg-muted/30 p-4 rounded-lg">
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Localized skin benefits only</li>
                <li>Daily application recommended</li>
                <li>Minimal systemic absorption</li>
                <li>Lower risk profile</li>
                <li>Available in many cosmetic products</li>
              </ul>
            </div>
          </section>
          
          <section id="injectable" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Injectable GHK-Cu</h2>
            <p className="text-muted-foreground mb-4">Subcutaneous injection provides systemic distribution throughout the body.</p>
            <div className="bg-muted/30 p-4 rounded-lg">
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Systemic regenerative effects</li>
                <li>Typical dose: 1-2mg daily</li>
                <li>30-day cycles with 14-day breaks</li>
                <li>Requires reconstitution</li>
                <li>Research peptide status</li>
              </ul>
            </div>
          </section>
          
          <section id="microneedling" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Microneedling with GHK-Cu</h2>
            <p className="text-muted-foreground">Emerging research combines microneedling with GHK-Cu application. The micro-channels created allow deeper penetration than standard topical application while avoiding injection.</p>
          </section>
          
          <section id="comparison" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Side-by-Side Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead><tr className="border-b border-border"><th className="text-left py-3 pr-4">Factor</th><th className="text-left py-3 pr-4">Topical</th><th className="text-left py-3">Injectable</th></tr></thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50"><td className="py-3 pr-4">Onset time</td><td className="py-3 pr-4">4-8 weeks</td><td className="py-3">2-4 weeks</td></tr>
                  <tr className="border-b border-border/50"><td className="py-3 pr-4">Effects</td><td className="py-3 pr-4">Localized</td><td className="py-3">Systemic</td></tr>
                  <tr className="border-b border-border/50"><td className="py-3 pr-4">Risk level</td><td className="py-3 pr-4">Low</td><td className="py-3">Moderate</td></tr>
                  <tr className="border-b border-border/50"><td className="py-3 pr-4">Ease of use</td><td className="py-3 pr-4">Very easy</td><td className="py-3">Requires technique</td></tr>
                </tbody>
              </table>
            </div>
          </section>
          
          <GuideChangelog entries={changelogEntries} />
          <GuideFAQ items={faqItems} />
          <BottomLineBox content="Choose topical for localized skin benefits with minimal risk. Choose injectable for systemic regenerative effects with standard research peptide considerations. Both methods have supporting research." />
          <RelatedGuides guides={relatedGuides} />
          <GuideCTA />
          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
