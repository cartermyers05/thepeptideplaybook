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
  { id: "overview", title: "Overview", level: 2 },
  { id: "semaglutide", title: "Semaglutide", level: 2 },
  { id: "tirzepatide", title: "Tirzepatide", level: 2 },
  { id: "aod-9604", title: "AOD-9604", level: 2 },
  { id: "mots-c", title: "MOTS-c", level: 2 },
  { id: "tesamorelin", title: "Tesamorelin", level: 2 },
  { id: "comparison", title: "Comparison Table", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const faqItems = [
  { question: "Which peptide is most effective for weight loss?", answer: "Tirzepatide shows the highest efficacy in clinical trials (~20% body weight loss), followed closely by semaglutide (~15%). Both are FDA-approved." },
  { question: "Are weight loss peptides safe?", answer: "FDA-approved options (semaglutide, tirzepatide) have extensive safety data. Research peptides (AOD-9604, MOTS-c) have limited human safety data." },
  { question: "Do I need a prescription?", answer: "Semaglutide and tirzepatide require prescriptions. Research peptides are sold without prescriptions but labeled 'not for human consumption.'" },
  { question: "How fast do results appear?", answer: "GLP-1 medications typically show significant results within 4-8 weeks. Research peptides may require longer timeframes." },
  { question: "Will I regain weight after stopping?", answer: "Studies show weight regain is common after stopping GLP-1 medications unless lifestyle changes are maintained." },
  { question: "Can I combine weight loss peptides?", answer: "Combining medications requires medical supervision. Most protocols focus on single-agent therapy." },
  { question: "What about muscle loss?", answer: "GLP-1 medications can cause muscle loss along with fat loss. Protein intake and resistance training help preserve muscle." },
  { question: "Are compounded versions safe?", answer: "FDA has warned about compounded GLP-1 products. Quality and safety vary. Pharmaceutical versions are preferred when available." },
];

const relatedGuides = [
  { title: "Semaglutide Complete Guide", href: "/guides/semaglutide-complete-guide", description: "FDA-approved GLP-1" },
  { title: "Tirzepatide vs Semaglutide", href: "/guides/tirzepatide-vs-semaglutide", description: "Head-to-head comparison" },
  { title: "HGH Fragment Guide", href: "/guides/hgh-fragment", description: "Fat-targeting peptide" },
];

const changelogEntries = [{ date: "Feb 5, 2026", change: "Initial publication" }];

const articleSchema = {
  "@context": "https://schema.org", "@type": "Article",
  headline: "Best Peptides for Weight Loss (2026)",
  datePublished: "2026-02-05", dateModified: "2026-02-05",
  author: { "@type": "Organization", name: "Peptide Playbook" },
  publisher: { "@type": "Organization", name: "Peptide Playbook", url: SITE_URL },
};

export default function BestPeptidesWeightLoss() {
  return (
    <GuideLayout title="Best Peptides for Weight Loss (2026)" description="Complete comparison of weight loss peptides: Semaglutide, Tirzepatide, AOD-9604, MOTS-c, and Tesamorelin." slug="best-peptides-weight-loss" articleSchema={articleSchema}>
      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="lg:w-64 shrink-0"><GuideTableOfContents items={tocItems} /></aside>
        <article className="flex-1 min-w-0">
          <QuickAnswerBox answer="The most researched peptides for weight loss include Semaglutide (FDA-approved), Tirzepatide (FDA-approved), AOD-9604, MOTS-c, and Tesamorelin. Each works through different mechanisms — from appetite suppression to targeted fat metabolism." lastUpdated="February 2026" readTime="13 min" />
          <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-6">Best Peptides for Weight Loss (2026)</h1>
          
          <section id="overview" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-muted-foreground">Weight loss peptides work through various mechanisms: GLP-1 receptor activation (appetite suppression), GH-related fat metabolism, or mitochondrial pathways. FDA-approved options have the strongest evidence.</p>
          </section>
          
          <section id="semaglutide" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Semaglutide</h2>
            <p className="text-muted-foreground mb-4">GLP-1 receptor agonist FDA-approved as Wegovy® for weight management and Ozempic® for diabetes.</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Mechanism:</strong> Reduces appetite, slows gastric emptying</li>
              <li><strong>Efficacy:</strong> ~15% body weight loss in clinical trials</li>
              <li><strong>Dosing:</strong> Weekly subcutaneous injection up to 2.4mg</li>
              <li><strong>Side effects:</strong> Nausea, vomiting, constipation</li>
            </ul>
            <p className="text-muted-foreground mt-4">See our <Link to="/guides/semaglutide-complete-guide" className="text-primary hover:underline">complete semaglutide guide</Link>.</p>
          </section>
          
          <section id="tirzepatide" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Tirzepatide</h2>
            <p className="text-muted-foreground mb-4">Dual GIP/GLP-1 receptor agonist FDA-approved as Zepbound® for weight management and Mounjaro® for diabetes.</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Mechanism:</strong> Dual incretin action (GIP + GLP-1)</li>
              <li><strong>Efficacy:</strong> ~20% body weight loss — highest of any medication</li>
              <li><strong>Dosing:</strong> Weekly injection up to 15mg</li>
              <li><strong>Side effects:</strong> Similar to semaglutide, possibly less nausea</li>
            </ul>
          </section>
          
          <section id="aod-9604" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">AOD-9604</h2>
            <p className="text-muted-foreground mb-4">Modified fragment of growth hormone (amino acids 176-191) targeting fat metabolism without affecting blood sugar.</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Mechanism:</strong> Lipolysis stimulation, lipogenesis inhibition</li>
              <li><strong>Status:</strong> Not FDA-approved; TGA-approved in Australia for osteoarthritis</li>
              <li><strong>Dosing:</strong> 250-500mcg daily (research protocols)</li>
            </ul>
            <p className="text-muted-foreground mt-4">See our <Link to="/guides/hgh-fragment" className="text-primary hover:underline">HGH Fragment guide</Link>.</p>
          </section>
          
          <section id="mots-c" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">MOTS-c</h2>
            <p className="text-muted-foreground mb-4">Mitochondrial-derived peptide studied as an "exercise mimetic" affecting glucose metabolism and fat oxidation.</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Mechanism:</strong> AMPK activation, mitochondrial function</li>
              <li><strong>Status:</strong> Research peptide; no clinical trials completed</li>
              <li><strong>Evidence:</strong> Primarily animal studies</li>
            </ul>
          </section>
          
          <section id="tesamorelin" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Tesamorelin</h2>
            <p className="text-muted-foreground mb-4">GHRH analog FDA-approved (Egrifta®) for HIV-associated lipodystrophy — reduces visceral fat.</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Mechanism:</strong> Stimulates natural GH release</li>
              <li><strong>Approved for:</strong> HIV lipodystrophy (off-label use exists)</li>
              <li><strong>Dosing:</strong> 2mg daily subcutaneous</li>
            </ul>
          </section>
          
          <section id="comparison" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Comparison Table</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead><tr className="border-b border-border"><th className="text-left py-3 pr-4">Peptide</th><th className="text-left py-3 pr-4">FDA Status</th><th className="text-left py-3 pr-4">Mechanism</th><th className="text-left py-3">Evidence</th></tr></thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50"><td className="py-3 pr-4">Semaglutide</td><td className="py-3 pr-4 text-primary">FDA-approved</td><td className="py-3 pr-4">GLP-1</td><td className="py-3">Strong</td></tr>
                  <tr className="border-b border-border/50"><td className="py-3 pr-4">Tirzepatide</td><td className="py-3 pr-4 text-primary">FDA-approved</td><td className="py-3 pr-4">GIP/GLP-1</td><td className="py-3">Strong</td></tr>
                  <tr className="border-b border-border/50"><td className="py-3 pr-4">AOD-9604</td><td className="py-3 pr-4">Not approved</td><td className="py-3 pr-4">Lipolysis</td><td className="py-3">Moderate</td></tr>
                  <tr className="border-b border-border/50"><td className="py-3 pr-4">MOTS-c</td><td className="py-3 pr-4">Research only</td><td className="py-3 pr-4">Mitochondrial</td><td className="py-3">Limited</td></tr>
                  <tr className="border-b border-border/50"><td className="py-3 pr-4">Tesamorelin</td><td className="py-3 pr-4 text-primary">FDA-approved*</td><td className="py-3 pr-4">GHRH</td><td className="py-3">Moderate</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-2">*Approved for HIV lipodystrophy only</p>
          </section>
          
          <GuideChangelog entries={changelogEntries} />
          <GuideFAQ items={faqItems} />
          <BottomLineBox content="For weight loss, FDA-approved GLP-1 medications (semaglutide, tirzepatide) have the strongest evidence and are the recommended first-line options. Research peptides like AOD-9604 and MOTS-c have theoretical benefits but lack robust human clinical trial data." />
          <RelatedGuides guides={relatedGuides} />
          <GuideCTA />
          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
