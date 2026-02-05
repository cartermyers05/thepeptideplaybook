import { Link } from "react-router-dom";
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
  { id: "what-are-peptides", title: "What Are Peptides?", level: 2 },
  { id: "how-peptides-work", title: "How Peptides Work", level: 2 },
  { id: "peptide-categories", title: "Categories of Peptides", level: 2 },
  { id: "popular-peptides", title: "Most Popular Peptides", level: 2 },
  { id: "fda-vs-research", title: "FDA-Approved vs Research", level: 2 },
  { id: "safety-first", title: "Safety First", level: 2 },
  { id: "delivery-methods", title: "Delivery Methods", level: 2 },
  { id: "reading-research", title: "How to Read Research", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const faqItems = [
  {
    question: "Are peptides steroids?",
    answer: "No. Peptides are short chains of amino acids (typically 2-50), while anabolic steroids are synthetic derivatives of testosterone. They have completely different mechanisms, effects, and legal classifications.",
  },
  {
    question: "Do I need a prescription for peptides?",
    answer: "It depends on the peptide. FDA-approved peptides like Semaglutide require a prescription. Research peptides sold as 'not for human consumption' exist in a legal gray area and don't require prescriptions, but also have no quality guarantees.",
  },
  {
    question: "Are peptides legal?",
    answer: "Legality varies by peptide and jurisdiction. FDA-approved peptides are legal with a prescription. Research peptides are legal to possess but sold labeled 'not for human consumption.' Some peptides are banned by WADA for competitive athletes.",
  },
  {
    question: "How long until I see results from peptides?",
    answer: "This varies dramatically by peptide and goal. GLP-1 weight loss peptides may show effects within weeks. Healing peptides like BPC-157 typically require 4-8 weeks. GH secretagogues may take 3-6 months for body composition changes.",
  },
  {
    question: "Can I take multiple peptides at once?",
    answer: "Some peptides are commonly 'stacked' together (e.g., BPC-157 + TB-500 for healing, CJC-1295 + Ipamorelin for GH release). However, interaction data is limited. Starting with one peptide to assess response is generally recommended.",
  },
  {
    question: "Where do people get peptides?",
    answer: "FDA-approved peptides come from pharmacies or telehealth clinics. Research peptides are sold online by research chemical companies. Quality varies dramatically — third-party testing and Certificates of Analysis are essential for research peptides.",
  },
  {
    question: "What's the difference between pharmaceutical and compounded peptides?",
    answer: "Pharmaceutical peptides are FDA-approved and manufactured to strict standards. Compounded peptides are mixed by compounding pharmacies, often at lower cost but with less regulatory oversight. The FDA has cracked down on some compounded GLP-1s.",
  },
  {
    question: "Are peptides safe for long-term use?",
    answer: "Long-term safety data is limited for most peptides outside of FDA-approved ones. Even FDA-approved peptides like Semaglutide have ongoing safety monitoring. Research peptides have virtually no long-term human safety data.",
  },
];

const relatedGuides = [
  {
    title: "Peptide Reconstitution Guide",
    href: "/guides/peptide-reconstitution",
    description: "Step-by-step guide to mixing peptides safely",
  },
  {
    title: "FDA Peptide Regulations 2026",
    href: "/guides/peptides-fda-legal-status-2026",
    description: "Complete legal status breakdown",
  },
  {
    title: "Are Peptides Safe?",
    href: "/guides/are-peptides-safe",
    description: "Evidence-based safety analysis",
  },
];

const changelogEntries = [
  { date: "Feb 5, 2026", change: "Initial publication" },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Peptides for Beginners: Where to Start",
  datePublished: "2026-02-05",
  dateModified: "2026-02-05",
  author: {
    "@type": "Organization",
    name: "Peptide Playbook",
  },
  publisher: {
    "@type": "Organization",
    name: "Peptide Playbook",
    url: SITE_URL,
  },
  description:
    "If you're new to peptides, this guide covers what they are, how they work, the most common types studied, safety considerations, and how to approach peptide research responsibly.",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/guides/peptides-for-beginners`,
  },
};

export default function PeptidesForBeginners() {
  return (
    <GuideLayout
      title="Peptides for Beginners: Where to Start"
      description="If you're new to peptides, this guide covers what they are, how they work, the most common types studied, safety considerations, and how to approach peptide research responsibly."
      slug="peptides-for-beginners"
      articleSchema={articleSchema}
    >
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Table of Contents Sidebar */}
        <aside className="lg:w-64 shrink-0">
          <GuideTableOfContents items={tocItems} />
        </aside>

        {/* Main Content */}
        <article className="flex-1 min-w-0">
          <QuickAnswerBox
            answer="Peptides are short chains of amino acids that act as signaling molecules in the body. Different peptides target different pathways — from growth hormone release to tissue healing to appetite regulation. If you're new to peptides, start by understanding the categories, prioritize safety, and learn how to evaluate research quality."
            lastUpdated="February 2026"
            readTime="14 min"
          />

          <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-6">
            Peptides for Beginners: Where to Start
          </h1>

          <section id="what-are-peptides" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">What Are Peptides?</h2>
            <p className="text-muted-foreground mb-4">
              Peptides are short chains of amino acids — typically between 2 and 50 amino acids linked together. They're essentially small proteins. Your body naturally produces hundreds of peptides that serve as hormones, neurotransmitters, and signaling molecules.
            </p>
            <p className="text-muted-foreground mb-4">
              The peptides discussed in biohacking and research communities are typically <strong>synthetic versions</strong> of naturally occurring peptides, or novel peptides designed to interact with specific receptors in the body.
            </p>
            <p className="text-muted-foreground">
              Examples of natural peptides include insulin (51 amino acids), oxytocin (9 amino acids), and growth hormone-releasing hormone (44 amino acids). Synthetic research peptides mimic or modify these natural signaling molecules.
            </p>
          </section>

          <section id="how-peptides-work" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">How Peptides Work in the Body</h2>
            <p className="text-muted-foreground mb-4">
              Peptides work by binding to specific receptors on cell surfaces or inside cells, triggering biological responses. Think of them as highly specific keys that only fit certain locks.
            </p>
            <div className="bg-muted/30 p-6 rounded-lg mb-4">
              <h3 className="font-semibold mb-3">Key Mechanisms:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Receptor binding:</strong> Peptides bind to cell-surface receptors, triggering intracellular signaling cascades</li>
                <li><strong>Hormone mimicry:</strong> Some peptides mimic natural hormones (e.g., GLP-1 analogs)</li>
                <li><strong>Gene expression:</strong> Certain peptides influence which genes are turned on or off</li>
                <li><strong>Enzyme activation:</strong> Some peptides activate or inhibit specific enzymes</li>
              </ul>
            </div>
            <p className="text-muted-foreground">
              Unlike small molecule drugs that can affect multiple pathways, peptides tend to be highly targeted — which is why they're of such interest for therapeutic research.
            </p>
          </section>

          <section id="peptide-categories" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Categories of Peptides</h2>
            <p className="text-muted-foreground mb-4">
              Peptides are typically categorized by their primary mechanism or intended use:
            </p>
            
            <div className="space-y-4 mb-4">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-primary mb-2">Growth Hormone Secretagogues</h3>
                <p className="text-muted-foreground text-sm">
                  Stimulate natural GH release. Includes CJC-1295, Ipamorelin, GHRP-2, GHRP-6, MK-677 (technically not a peptide). Used for body composition, recovery, anti-aging research.
                </p>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-primary mb-2">Healing & Recovery Peptides</h3>
                <p className="text-muted-foreground text-sm">
                  Target tissue repair pathways. Includes BPC-157, TB-500 (Thymosin Beta-4), GHK-Cu. Studied for injury recovery, gut healing, wound repair.
                </p>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-primary mb-2">Weight Loss Peptides</h3>
                <p className="text-muted-foreground text-sm">
                  Affect appetite, metabolism, or fat storage. Includes <Link to="/guides/semaglutide-complete-guide" className="text-primary hover:underline">Semaglutide</Link>, Tirzepatide (FDA-approved), AOD-9604, MOTS-c. The GLP-1 class has the strongest clinical evidence.
                </p>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-primary mb-2">Cognitive & Neuroprotective</h3>
                <p className="text-muted-foreground text-sm">
                  Target brain function and neural health. Includes Semax, Selank, Dihexa, PE-22-28. Limited human research, mostly animal studies.
                </p>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-primary mb-2">Anti-Aging & Longevity</h3>
                <p className="text-muted-foreground text-sm">
                  Target aging pathways. Includes Epitalon (telomerase), SS-31 (mitochondria), GHK-Cu (skin/collagen). Theoretical mechanisms often outpace clinical evidence.
                </p>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-primary mb-2">Tanning & Cosmetic</h3>
                <p className="text-muted-foreground text-sm">
                  Affect melanin production. Melanotan I and Melanotan II stimulate melanocytes. Not FDA-approved, significant side effect profile.
                </p>
              </div>
            </div>
          </section>

          <section id="popular-peptides" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Most Popular Peptides Overview</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse mb-4">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 pr-4 font-semibold">Peptide</th>
                    <th className="text-left py-3 pr-4 font-semibold">Category</th>
                    <th className="text-left py-3 pr-4 font-semibold">Primary Use</th>
                    <th className="text-left py-3 font-semibold">Evidence Level</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium">Semaglutide</td>
                    <td className="py-3 pr-4">Weight Loss</td>
                    <td className="py-3 pr-4">Appetite, blood sugar</td>
                    <td className="py-3">FDA-approved ✓</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium">BPC-157</td>
                    <td className="py-3 pr-4">Healing</td>
                    <td className="py-3 pr-4">Tissue repair</td>
                    <td className="py-3">Animal studies</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium">TB-500</td>
                    <td className="py-3 pr-4">Healing</td>
                    <td className="py-3 pr-4">Systemic repair</td>
                    <td className="py-3">Animal studies</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium">CJC-1295</td>
                    <td className="py-3 pr-4">GH Release</td>
                    <td className="py-3 pr-4">Growth hormone</td>
                    <td className="py-3">Phase II trials</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium">Ipamorelin</td>
                    <td className="py-3 pr-4">GH Release</td>
                    <td className="py-3 pr-4">Growth hormone</td>
                    <td className="py-3">Phase II trials</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium">GHK-Cu</td>
                    <td className="py-3 pr-4">Skin/Healing</td>
                    <td className="py-3 pr-4">Collagen, wounds</td>
                    <td className="py-3">In vitro + topical</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium">Tirzepatide</td>
                    <td className="py-3 pr-4">Weight Loss</td>
                    <td className="py-3 pr-4">Dual GIP/GLP-1</td>
                    <td className="py-3">FDA-approved ✓</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium">MK-677</td>
                    <td className="py-3 pr-4">GH Release</td>
                    <td className="py-3 pr-4">Oral GH secretagogue</td>
                    <td className="py-3">Human trials</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium">Melanotan II</td>
                    <td className="py-3 pr-4">Tanning</td>
                    <td className="py-3 pr-4">Skin pigmentation</td>
                    <td className="py-3">Not approved</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium">Epitalon</td>
                    <td className="py-3 pr-4">Anti-Aging</td>
                    <td className="py-3 pr-4">Telomerase</td>
                    <td className="py-3">Limited human data</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="fda-vs-research" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">FDA-Approved vs Research Peptides</h2>
            <p className="text-muted-foreground mb-4">
              There's a critical distinction between FDA-approved peptide medications and "research peptides":
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                <h3 className="font-semibold text-primary mb-2">FDA-Approved Peptides</h3>
                <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                  <li>Passed clinical trials for safety and efficacy</li>
                  <li>Manufactured under strict GMP standards</li>
                  <li>Require prescription</li>
                  <li>Have known dosing, side effects</li>
                  <li>Examples: Semaglutide, Tirzepatide, Insulin</li>
                </ul>
              </div>
              
              <div className="bg-muted/30 border border-border p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Research Peptides</h3>
                <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                  <li>Sold as "not for human consumption"</li>
                  <li>No manufacturing quality requirements</li>
                  <li>No prescription needed</li>
                  <li>Limited or no human safety data</li>
                  <li>Examples: BPC-157, TB-500, most GH peptides</li>
                </ul>
              </div>
            </div>
            
            <p className="text-muted-foreground">
              The <Link to="/guides/peptides-fda-legal-status-2026" className="text-primary hover:underline">FDA peptide regulations guide</Link> covers the current legal landscape in detail.
            </p>
          </section>

          <section id="safety-first" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Safety First</h2>
            <p className="text-muted-foreground mb-4">
              If you're researching peptides, prioritizing safety is essential:
            </p>
            
            <div className="bg-muted/30 p-6 rounded-lg mb-4">
              <h3 className="font-semibold mb-3">Safety Checklist:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Consult a healthcare provider:</strong> Especially important for GH peptides and if you have any medical conditions</li>
                <li><strong>Get baseline bloodwork:</strong> Know your starting point — hormones, metabolic markers, organ function</li>
                <li><strong>Start low, go slow:</strong> Begin with lowest studied doses, increase gradually only if needed</li>
                <li><strong>Source quality matters:</strong> <Link to="/guides/verify-peptide-coa" className="text-primary hover:underline">Third-party testing and COAs</Link> are essential for research peptides</li>
                <li><strong>Monitor for side effects:</strong> Keep a log of any changes — positive or negative</li>
                <li><strong>Understand limitations:</strong> Most research peptides lack human safety data</li>
              </ul>
            </div>
            
            <p className="text-muted-foreground">
              Read our <Link to="/guides/are-peptides-safe" className="text-primary hover:underline">comprehensive peptide safety guide</Link> for deeper analysis.
            </p>
          </section>

          <section id="delivery-methods" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Delivery Methods: Topical vs Injectable vs Oral</h2>
            
            <div className="space-y-4 mb-4">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Subcutaneous Injection (Most Common)</h3>
                <p className="text-muted-foreground text-sm">
                  Most peptides are administered via subcutaneous (under the skin) injection using insulin syringes. This bypasses digestion and provides predictable absorption. Requires <Link to="/guides/peptide-reconstitution" className="text-primary hover:underline">proper reconstitution technique</Link>.
                </p>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Topical Application</h3>
                <p className="text-muted-foreground text-sm">
                  Some peptides like GHK-Cu are used topically in serums and creams. Limited to localized effects — peptides generally can't penetrate deep enough for systemic absorption through skin.
                </p>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Oral Administration</h3>
                <p className="text-muted-foreground text-sm">
                  Most peptides are destroyed by stomach acid and digestive enzymes. Exceptions include oral Semaglutide (Rybelsus®) which uses absorption enhancers, and MK-677 which is technically a non-peptide compound.
                </p>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Intranasal</h3>
                <p className="text-muted-foreground text-sm">
                  Some peptides (Semax, Selank, VIP) are administered nasally. Provides faster absorption and may cross blood-brain barrier more effectively for neurological targets.
                </p>
              </div>
            </div>
          </section>

          <section id="reading-research" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">How to Read Peptide Research</h2>
            <p className="text-muted-foreground mb-4">
              Critical evaluation of peptide research helps separate hype from evidence:
            </p>
            
            <div className="bg-muted/30 p-6 rounded-lg mb-4">
              <h3 className="font-semibold mb-3">Evidence Hierarchy:</h3>
              <ol className="list-decimal list-inside text-muted-foreground space-y-2">
                <li><strong>Randomized controlled trials (RCTs):</strong> Gold standard — humans, placebo-controlled, randomized</li>
                <li><strong>Human cohort/observational studies:</strong> Valuable but can't prove causation</li>
                <li><strong>Animal studies:</strong> Useful for mechanisms, but don't always translate to humans</li>
                <li><strong>In vitro (cell) studies:</strong> Shows potential but very limited applicability</li>
                <li><strong>Anecdotal reports:</strong> Interesting but not scientific evidence</li>
              </ol>
            </div>
            
            <div className="bg-muted/30 p-6 rounded-lg mb-4">
              <h3 className="font-semibold mb-3">Red Flags to Watch For:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Claims based solely on animal studies presented as human evidence</li>
                <li>Single studies presented as definitive proof</li>
                <li>No mention of limitations or potential risks</li>
                <li>Sellers citing their own "research"</li>
                <li>Extraordinary claims without extraordinary evidence</li>
              </ul>
            </div>
            
            <p className="text-muted-foreground">
              <strong>PubMed (pubmed.ncbi.nlm.nih.gov)</strong> is the primary database for searching peer-reviewed biomedical literature. Start there for primary sources.
            </p>
          </section>

          <GuideChangelog entries={changelogEntries} />

          <GuideFAQ items={faqItems} />

          <BottomLineBox content="Peptides are powerful signaling molecules with diverse applications — from FDA-approved weight loss medications to research compounds studied for healing and anti-aging. If you're new to peptides, prioritize understanding the evidence levels for each compound, start with safety fundamentals, and approach research peptides with appropriate caution given the limited human data available." />

          <RelatedGuides guides={relatedGuides} />

          <GuideCTA />

          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
