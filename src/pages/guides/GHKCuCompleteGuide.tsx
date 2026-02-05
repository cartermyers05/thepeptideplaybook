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
  { id: "what-is-ghkcu", title: "What is GHK-Cu?", level: 2 },
  { id: "mechanism", title: "How GHK-Cu Works", level: 2 },
  { id: "research", title: "Research Findings", level: 2 },
  { id: "delivery", title: "Delivery Methods", level: 2 },
  { id: "dosing", title: "Dosing Ranges", level: 2 },
  { id: "reconstitution", title: "Reconstitution", level: 2 },
  { id: "side-effects", title: "Side Effects", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const faqItems = [
  { question: "What is GHK-Cu used for?", answer: "GHK-Cu is studied for skin rejuvenation, wound healing, hair growth stimulation, and anti-aging. It modulates over 4,000 genes toward a regenerative state." },
  { question: "Is GHK-Cu FDA approved?", answer: "No. GHK-Cu is not FDA-approved for any medical condition. It's available as a research peptide and in some cosmetic products." },
  { question: "Can I use GHK-Cu topically instead of injecting?", answer: "Yes. Topical GHK-Cu at 2-4% concentration is studied for localized skin benefits. Injectable routes offer more systemic effects." },
  { question: "How long until I see results?", answer: "Topical skin improvements may be visible in 4-8 weeks. Injectable protocols typically run 30+ days for systemic effects." },
  { question: "Can I combine GHK-Cu with other peptides?", answer: "GHK-Cu is often combined with BPC-157 or TB-500 for enhanced healing. Start compounds individually to assess response." },
  { question: "How do I store reconstituted GHK-Cu?", answer: "Refrigerate at 2-8°C (36-46°F). Use within 30 days. Do not freeze reconstituted peptides." },
  { question: "What concentration for topical use?", answer: "Research uses 0.05-4% concentration. Most commercial products contain 1-2% GHK-Cu." },
  { question: "Is GHK-Cu safe long term?", answer: "Limited long-term data exists. Cycling 30 days on/14 days off is common to avoid copper accumulation concerns." },
];

const relatedGuides = [
  { title: "GHK-Cu: Topical vs Injectable", href: "/guides/ghk-cu-topical-vs-injectable", description: "Comparing delivery methods" },
  { title: "Peptide Reconstitution Guide", href: "/guides/peptide-reconstitution", description: "How to mix peptides safely" },
  { title: "Best Peptides for Muscle Growth", href: "/guides/best-peptides-muscle-growth", description: "Recovery and growth peptides" },
];

const changelogEntries = [{ date: "Feb 5, 2026", change: "Initial publication" }];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "GHK-Cu: Complete Research Guide",
  datePublished: "2026-02-05",
  dateModified: "2026-02-05",
  author: { "@type": "Organization", name: "Peptide Playbook" },
  publisher: { "@type": "Organization", name: "Peptide Playbook", url: SITE_URL },
  description: "GHK-Cu is a naturally occurring copper-binding tripeptide studied for skin rejuvenation, wound healing, hair growth, and anti-aging.",
};

export default function GHKCuCompleteGuide() {
  return (
    <GuideLayout title="GHK-Cu: Complete Research Guide" description="GHK-Cu is a naturally occurring copper-binding tripeptide studied extensively for skin rejuvenation, wound healing, hair growth, and anti-aging." slug="ghk-cu-complete-guide" articleSchema={articleSchema}>
      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="lg:w-64 shrink-0"><GuideTableOfContents items={tocItems} /></aside>
        <article className="flex-1 min-w-0">
          <QuickAnswerBox answer="GHK-Cu is a naturally occurring copper-binding tripeptide studied extensively for skin rejuvenation, wound healing, hair growth, and anti-aging. Research spanning 30+ years shows it modulates over 4,000 genes toward a regenerative state." lastUpdated="February 2026" readTime="14 min" />
          <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-6">GHK-Cu: Complete Research Guide</h1>
          
          <section id="what-is-ghkcu" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">What is GHK-Cu?</h2>
            <p className="text-muted-foreground mb-4">GHK-Cu (glycyl-L-histidyl-L-lysine-copper) is a naturally occurring tripeptide with high affinity for copper ions. It was first isolated from human plasma in 1973 and has been extensively studied for its regenerative properties.</p>
            <p className="text-muted-foreground">The peptide occurs naturally in saliva, plasma, and urine, with levels declining significantly with age — from ~200 ng/mL at age 20 to ~80 ng/mL by age 60.</p>
          </section>
          
          <section id="mechanism" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">How GHK-Cu Works</h2>
            <p className="text-muted-foreground mb-4">GHK-Cu works through multiple mechanisms:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Copper delivery:</strong> Transports copper to cells for enzyme activation</li>
              <li><strong>Gene modulation:</strong> Influences 4,000+ genes toward tissue repair</li>
              <li><strong>Collagen synthesis:</strong> Stimulates production of collagen types I and III</li>
              <li><strong>Anti-inflammatory:</strong> Reduces pro-inflammatory cytokines</li>
              <li><strong>Antioxidant:</strong> Increases superoxide dismutase activity</li>
            </ul>
          </section>
          
          <section id="research" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Research Findings</h2>
            <p className="text-muted-foreground mb-4">Key findings from 30+ years of research:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Increased skin thickness and elasticity in human studies</li>
              <li>Accelerated wound healing in animal models</li>
              <li>Hair follicle stimulation and enlarged follicle size</li>
              <li>Wrinkle reduction comparable to tretinoin in some studies</li>
            </ul>
          </section>
          
          <section id="delivery" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Delivery Methods</h2>
            <div className="space-y-4">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Topical (2-4% concentration)</h3>
                <p className="text-muted-foreground text-sm">Applied daily in serums/creams. Limited to localized skin effects.</p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Subcutaneous Injection (1-2mg daily)</h3>
                <p className="text-muted-foreground text-sm">Systemic effects. Typical cycles: 30 days on, 14 days off.</p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Microneedling</h3>
                <p className="text-muted-foreground text-sm">Enhanced absorption through micro-channels in skin.</p>
              </div>
            </div>
          </section>
          
          <section id="dosing" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Dosing Ranges in Research</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Injectable:</strong> 1-2mg daily subcutaneous for 30-day cycles</li>
              <li><strong>Topical:</strong> 2-4% concentration applied daily</li>
              <li><strong>3x weekly protocol:</strong> 2mg three times per week</li>
            </ul>
          </section>
          
          <section id="reconstitution" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Reconstitution</h2>
            <p className="text-muted-foreground mb-4">Standard reconstitution: 5mg vial + 2mL bacteriostatic water = 2.5mg/mL concentration.</p>
            <p className="text-muted-foreground">For 1mg dose: draw 0.4mL. See our <Link to="/guides/peptide-reconstitution" className="text-primary hover:underline">full reconstitution guide</Link>.</p>
          </section>
          
          <section id="side-effects" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Side Effects and Safety</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Injection site stinging (transient)</li>
              <li>Theoretical copper accumulation with prolonged use</li>
              <li>Cycling recommended: 30 days on, 14 days off</li>
            </ul>
          </section>
          
          <GuideChangelog entries={changelogEntries} />
          <GuideFAQ items={faqItems} />
          <BottomLineBox content="GHK-Cu is one of the most well-researched peptides for skin and tissue regeneration, with 30+ years of studies. Topical application offers localized skin benefits with minimal risk, while injectable routes provide systemic regenerative effects. Cycling is recommended to avoid copper accumulation." />
          <RelatedGuides guides={relatedGuides} />
          <GuideCTA />
          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
