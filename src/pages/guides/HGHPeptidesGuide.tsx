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
  { id: "what-are-hgh-peptides", title: "What are HGH Peptides?", level: 2 },
  { id: "how-they-work", title: "How They Work", level: 2 },
  { id: "cjc-1295", title: "CJC-1295", level: 2 },
  { id: "ipamorelin", title: "Ipamorelin", level: 2 },
  { id: "ghrp-6-ghrp-2", title: "GHRP-6 and GHRP-2", level: 2 },
  { id: "sermorelin", title: "Sermorelin", level: 2 },
  { id: "stacking", title: "Stacking Combinations", level: 2 },
  { id: "timing", title: "Timing & Administration", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const faqItems = [
  { question: "Are HGH peptides the same as HGH?", answer: "No. HGH peptides stimulate your body to produce its own growth hormone. Synthetic HGH replaces natural production. Peptides work within physiological limits." },
  { question: "Which HGH peptide is best?", answer: "CJC-1295 + Ipamorelin is the most common combination, offering sustained GH release with minimal side effects. Individual response varies." },
  { question: "Do HGH peptides require a prescription?", answer: "HGH peptides are not FDA-approved for anti-aging or bodybuilding. They're sold as research chemicals. Some clinics prescribe them off-label." },
  { question: "How long until results?", answer: "Body composition changes typically require 3-6 months. Sleep and recovery improvements may be noticed within weeks." },
  { question: "Can I take HGH peptides with food?", answer: "No. GH release is blunted by elevated blood sugar and insulin. Take peptides fasted or 2+ hours after eating." },
  { question: "What time of day is best?", answer: "Before bed is common, as it amplifies natural nighttime GH pulses. Some protocols add a morning dose." },
  { question: "Do HGH peptides cause water retention?", answer: "Less than synthetic HGH, but some water retention can occur, especially initially. This typically subsides." },
  { question: "Are there long-term risks?", answer: "Limited long-term human data exists. Theoretical concerns include effects on glucose metabolism and potential tumor growth stimulation." },
];

const relatedGuides = [
  { title: "CJC-1295 Safety", href: "/guides/cjc-1295-safety", description: "Safety profile and concerns" },
  { title: "IGF-1 Peptide Guide", href: "/guides/igf-1-peptide", description: "Downstream effects of GH" },
  { title: "Epitalon Peptide", href: "/guides/epitalon-peptide", description: "Anti-aging research" },
];

const changelogEntries = [{ date: "Feb 5, 2026", change: "Initial publication" }];

const articleSchema = {
  "@context": "https://schema.org", "@type": "Article",
  headline: "HGH Peptides: Complete Breakdown",
  datePublished: "2026-02-05", dateModified: "2026-02-05",
  author: { "@type": "Organization", name: "Peptide Playbook" },
  publisher: { "@type": "Organization", name: "Peptide Playbook", url: SITE_URL },
};

export default function HGHPeptidesGuide() {
  return (
    <GuideLayout title="HGH Peptides: Complete Breakdown" description="HGH peptides stimulate natural growth hormone production. Complete guide to CJC-1295, Ipamorelin, GHRP-6, GHRP-2, and Sermorelin." slug="hgh-peptides" articleSchema={articleSchema}>
      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="lg:w-64 shrink-0"><GuideTableOfContents items={tocItems} /></aside>
        <article className="flex-1 min-w-0">
          <QuickAnswerBox answer="HGH peptides are compounds that stimulate your body's natural growth hormone production rather than replacing it with synthetic HGH. The most studied include CJC-1295, Ipamorelin, GHRP-6, GHRP-2, and Sermorelin." lastUpdated="February 2026" readTime="15 min" />
          <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-6">HGH Peptides: Complete Breakdown</h1>
          
          <section id="what-are-hgh-peptides" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">What are HGH Peptides?</h2>
            <p className="text-muted-foreground mb-4">HGH peptides, also called growth hormone secretagogues, are compounds that stimulate the pituitary gland to release growth hormone naturally. Unlike synthetic HGH, they work within your body's feedback mechanisms.</p>
            <p className="text-muted-foreground">There are two main categories: GHRH analogs (like CJC-1295) that mimic growth hormone-releasing hormone, and ghrelin mimetics (like Ipamorelin, GHRP-6) that act on ghrelin receptors.</p>
          </section>
          
          <section id="how-they-work" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">How Growth Hormone Secretagogues Work</h2>
            <div className="bg-muted/30 p-4 rounded-lg">
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>GHRH analogs:</strong> Directly stimulate GH-releasing hormone receptors on the pituitary</li>
                <li><strong>Ghrelin mimetics:</strong> Activate growth hormone secretagogue receptors</li>
                <li><strong>Combined effect:</strong> Stacking both types amplifies GH release synergistically</li>
              </ul>
            </div>
          </section>
          
          <section id="cjc-1295" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">CJC-1295</h2>
            <p className="text-muted-foreground mb-4">CJC-1295 is a GHRH analog with extended half-life. Two versions exist:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>CJC-1295 with DAC:</strong> Very long half-life (days), causes sustained elevated GH</li>
              <li><strong>CJC-1295 no DAC (Mod GRF 1-29):</strong> Shorter half-life, more physiological pulsatile release</li>
            </ul>
            <p className="text-muted-foreground mt-4">Typical dosing: 100-300 mcg before bed. See <Link to="/guides/cjc-1295-safety" className="text-primary hover:underline">CJC-1295 safety guide</Link>.</p>
          </section>
          
          <section id="ipamorelin" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Ipamorelin</h2>
            <p className="text-muted-foreground mb-4">Ipamorelin is considered the most selective ghrelin mimetic, causing GH release without significantly affecting cortisol, prolactin, or appetite.</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Selective GH release</li>
              <li>Minimal hunger increase</li>
              <li>Typical dosing: 100-300 mcg, 1-3x daily</li>
            </ul>
          </section>
          
          <section id="ghrp-6-ghrp-2" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">GHRP-6 and GHRP-2</h2>
            <p className="text-muted-foreground mb-4">Earlier generation ghrelin mimetics with stronger but less selective effects:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>GHRP-6:</strong> Strong GH release, significant hunger increase, some cortisol/prolactin elevation</li>
              <li><strong>GHRP-2:</strong> Slightly more selective than GHRP-6, still increases hunger</li>
            </ul>
          </section>
          
          <section id="sermorelin" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Sermorelin</h2>
            <p className="text-muted-foreground mb-4">Sermorelin is a 29-amino-acid GHRH analog. It was FDA-approved for pediatric growth hormone deficiency but discontinued commercially. Some clinics still prescribe it.</p>
            <p className="text-muted-foreground">Dosing: 200-500 mcg before bed.</p>
          </section>
          
          <section id="stacking" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Common Stacking Combinations</h2>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-muted-foreground mb-2"><strong>Most popular stack:</strong> CJC-1295 (no DAC) + Ipamorelin</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>100-300 mcg each, combined in same injection</li>
                <li>Before bed or 2x daily (morning + before bed)</li>
                <li>Synergistic GH release with good tolerability</li>
              </ul>
            </div>
          </section>
          
          <section id="timing" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Timing and Administration</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Fasted state:</strong> Essential — elevated insulin blunts GH release</li>
              <li><strong>Before bed:</strong> Amplifies natural nighttime GH pulses</li>
              <li><strong>2+ hours after eating:</strong> Required for optimal response</li>
            </ul>
          </section>
          
          <GuideChangelog entries={changelogEntries} />
          <GuideFAQ items={faqItems} />
          <BottomLineBox content="HGH peptides offer a way to boost natural growth hormone production without the risks and costs of synthetic HGH. CJC-1295 + Ipamorelin is the most popular combination for its balance of efficacy and tolerability. Results require consistent use over months, not weeks." />
          <RelatedGuides guides={relatedGuides} />
          <GuideCTA />
          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
