import { Link } from "react-router-dom";
import { GuideLayout } from "@/components/guides/GuideLayout";
import { QuickAnswerBox } from "@/components/guides/QuickAnswerBox";
import { BottomLineBox } from "@/components/guides/BottomLineBox";
import { GuideFAQ } from "@/components/guides/GuideFAQ";
import { GuideCTA } from "@/components/guides/GuideCTA";
import { GuideDisclaimer } from "@/components/guides/GuideDisclaimer";
import { RelatedGuides } from "@/components/guides/RelatedGuides";
import { GuideTableOfContents } from "@/components/guides/GuideTableOfContents";
import { WhatWeDontKnow } from "@/components/guides/WhatWeDontKnow";
import { PrimarySources } from "@/components/articles/PrimarySources";
import { GuideChangelog } from "@/components/guides/GuideChangelog";
import { SITE_URL } from "@/lib/seo";

const tocItems = [
  { id: "what-is-igf1", title: "What is IGF-1?", level: 2 },
  { id: "gh-igf1-axis", title: "GH → IGF-1 Axis", level: 2 },
  { id: "igf1-lr3", title: "IGF-1 LR3", level: 2 },
  { id: "igf1-des", title: "IGF-1 DES", level: 2 },
  { id: "mgf", title: "Mechano Growth Factor", level: 2 },
  { id: "research-findings", title: "Research Findings", level: 2 },
  { id: "safety", title: "Safety Considerations", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const faqItems = [
  {
    question: "What is the difference between IGF-1 and HGH?",
    answer: "HGH (growth hormone) is released by the pituitary gland and stimulates the liver to produce IGF-1. Most of HGH's anabolic effects are actually mediated through IGF-1. HGH also has direct effects on fat metabolism that are IGF-1 independent.",
  },
  {
    question: "Is IGF-1 LR3 better than regular IGF-1?",
    answer: "IGF-1 LR3 has a significantly longer half-life (20-30 hours vs minutes) because it binds poorly to IGF binding proteins. This makes it more practical for research use but also means effects are more systemic rather than localized.",
  },
  {
    question: "Why is IGF-1 DES considered 'site-specific'?",
    answer: "IGF-1 DES has very short activity (20-30 minutes) which limits its effects to the area near injection. Some research suggests this allows more targeted muscle effects with less systemic exposure.",
  },
  {
    question: "Can IGF-1 peptides cause cancer?",
    answer: "This is a significant concern. IGF-1 promotes cell growth and division. Epidemiological studies link higher IGF-1 levels to increased cancer risk. Anyone with cancer history or risk factors should avoid IGF-1 compounds.",
  },
  {
    question: "Do IGF-1 peptides cause hypoglycemia?",
    answer: "Yes, IGF-1 can lower blood sugar, potentially causing hypoglycemia. This is especially true with IGF-1 LR3 due to its extended half-life. Blood sugar monitoring and timing around meals is important.",
  },
  {
    question: "How do IGF-1 peptides compare to GH secretagogues?",
    answer: "GH secretagogues (CJC-1295, Ipamorelin) stimulate your body's own GH production, which then produces IGF-1 naturally. Direct IGF-1 peptides bypass this step. Secretagogues are generally considered safer as they work within physiological feedback loops.",
  },
];

const unknowns = [
  "Long-term cancer risk with exogenous IGF-1 peptides in humans",
  "Optimal dosing protocols for muscle growth vs side effect profile",
  "Whether localized IGF-1 DES injections truly remain site-specific",
  "How synthetic MGF compares to naturally expressed MGF",
  "Interaction effects with GH secretagogues when stacked",
];

const sources = [
  {
    title: "IGF-1 Physiology - Endotext",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK279139/",
    description: "Comprehensive review of IGF-1 biology and clinical significance",
  },
  {
    title: "IGF-1 and Cancer - NCI",
    url: "https://www.cancer.gov/about-cancer/causes-prevention/risk/hormones",
    description: "National Cancer Institute guidance on hormones and cancer risk",
  },
  {
    title: "PubMed - IGF-1 Research",
    url: "https://pubmed.ncbi.nlm.nih.gov/?term=IGF-1+muscle",
    description: "Database of peer-reviewed IGF-1 research studies",
  },
];

const relatedGuides = [
  {
    title: "HGH Peptides: Complete Breakdown",
    href: "/guides/hgh-peptides",
    description: "GH secretagogues that boost natural IGF-1",
  },
  {
    title: "Best Peptides for Muscle Growth",
    href: "/guides/best-peptides-muscle-growth",
    description: "Comparison of muscle-building peptides",
  },
  {
    title: "CJC-1295 Safety Guide",
    href: "/guides/cjc-1295-safety",
    description: "GH-releasing peptide safety profile",
  },
];

const changelogEntries = [
  { date: "Feb 5, 2026", change: "Initial publication" },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "IGF-1 Peptide Research Guide",
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
    "Insulin-like Growth Factor 1 (IGF-1) is a peptide hormone that mediates many of growth hormone's effects on muscle growth, tissue repair, and metabolism.",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/guides/igf-1-peptide`,
  },
};

export default function IGF1PeptideGuide() {
  return (
    <GuideLayout
      title="IGF-1 Peptide Research Guide"
      description="Insulin-like Growth Factor 1 (IGF-1) is a peptide hormone that mediates many of growth hormone's effects on muscle growth, tissue repair, and metabolism. Variants like IGF-1 LR3 and IGF-1 DES are studied for enhanced bioavailability."
      slug="igf-1-peptide"
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
            answer="IGF-1 (Insulin-like Growth Factor 1) mediates most of growth hormone's anabolic effects. Variants like IGF-1 LR3 (extended half-life) and IGF-1 DES (higher potency, short duration) are studied for muscle growth and recovery. However, IGF-1 promotes cell proliferation broadly — the same mechanism that builds muscle also raises concerns about cancer risk."
            lastUpdated="February 2026"
            readTime="11 min"
          />

          <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-6">
            IGF-1 Peptide Research Guide
          </h1>

          <section id="what-is-igf1" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">What is IGF-1?</h2>
            <p className="text-muted-foreground mb-4">
              Insulin-like Growth Factor 1 (IGF-1) is a 70-amino acid peptide hormone structurally similar to insulin. It's one of the most potent natural activators of the AKT signaling pathway, which regulates cell growth, survival, and metabolism.
            </p>
            <p className="text-muted-foreground mb-4">
              IGF-1 is primarily produced by the liver in response to growth hormone (GH) stimulation, but it's also produced locally in many tissues where it acts in autocrine and paracrine fashion.
            </p>
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="font-semibold mb-3">Key Functions of IGF-1:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Muscle protein synthesis:</strong> Primary driver of muscle growth</li>
                <li><strong>Cell proliferation:</strong> Stimulates division in many cell types</li>
                <li><strong>Cell survival:</strong> Inhibits apoptosis (programmed cell death)</li>
                <li><strong>Tissue repair:</strong> Accelerates wound healing and regeneration</li>
                <li><strong>Glucose metabolism:</strong> Insulin-like effects on blood sugar</li>
              </ul>
            </div>
          </section>

          <section id="gh-igf1-axis" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">The GH → IGF-1 Axis Explained</h2>
            <p className="text-muted-foreground mb-4">
              Growth hormone doesn't directly cause most of its anabolic effects. Instead, it stimulates IGF-1 production, which then mediates the effects:
            </p>
            
            <div className="bg-muted/30 p-6 rounded-lg mb-4">
              <ol className="list-decimal list-inside text-muted-foreground space-y-2">
                <li>Pituitary releases GH in pulses (primarily during sleep)</li>
                <li>GH binds to receptors in the liver</li>
                <li>Liver produces and releases IGF-1 into circulation</li>
                <li>IGF-1 travels to target tissues (muscle, bone, etc.)</li>
                <li>IGF-1 activates growth and repair pathways</li>
                <li>High IGF-1 feeds back to reduce GH release</li>
              </ol>
            </div>
            
            <p className="text-muted-foreground">
              <Link to="/guides/hgh-peptides" className="text-primary hover:underline">GH secretagogues</Link> like CJC-1295 and Ipamorelin work upstream — they increase GH, which then increases IGF-1 naturally. Direct IGF-1 peptides bypass this system entirely.
            </p>
          </section>

          <section id="igf1-lr3" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">IGF-1 LR3: Extended Half-Life Variant</h2>
            <p className="text-muted-foreground mb-4">
              IGF-1 LR3 (Long R3 IGF-1) is a modified version with 83 amino acids instead of 70. The modifications significantly change its pharmacology:
            </p>
            
            <div className="bg-muted/30 p-6 rounded-lg mb-4">
              <h3 className="font-semibold mb-3">Key Differences from Native IGF-1:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Half-life:</strong> 20-30 hours vs 12-15 minutes for native IGF-1</li>
                <li><strong>Binding protein affinity:</strong> Binds poorly to IGFBP-3, remaining more "free" and active</li>
                <li><strong>Potency:</strong> Approximately 3x more potent due to sustained activity</li>
                <li><strong>Dosing:</strong> Research typically uses 20-100 mcg daily or every other day</li>
              </ul>
            </div>
            
            <p className="text-muted-foreground">
              The extended half-life makes LR3 more practical but also means effects are systemic — it affects all tissues, not just the target area.
            </p>
          </section>

          <section id="igf1-des" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">IGF-1 DES: Truncated High-Potency Variant</h2>
            <p className="text-muted-foreground mb-4">
              IGF-1 DES (Des(1-3) IGF-1) is a 67-amino acid variant missing the first three amino acids. This truncation dramatically changes its properties:
            </p>
            
            <div className="bg-muted/30 p-6 rounded-lg mb-4">
              <h3 className="font-semibold mb-3">IGF-1 DES Characteristics:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Potency:</strong> 5-10x more potent than native IGF-1 at the receptor</li>
                <li><strong>Half-life:</strong> Very short — approximately 20-30 minutes</li>
                <li><strong>Binding proteins:</strong> Does not bind to IGFBPs at all</li>
                <li><strong>Localization:</strong> Short activity theoretically limits effects to injection site</li>
              </ul>
            </div>
            
            <p className="text-muted-foreground">
              Some researchers theorize that injecting IGF-1 DES directly into a muscle allows site-specific growth. However, whether this truly remains localized is debated.
            </p>
          </section>

          <section id="mgf" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Mechano Growth Factor (MGF)</h2>
            <p className="text-muted-foreground mb-4">
              MGF is a splice variant of IGF-1 that's produced locally in muscle tissue in response to mechanical stress (exercise, damage):
            </p>
            
            <div className="bg-muted/30 p-6 rounded-lg mb-4">
              <h3 className="font-semibold mb-3">MGF vs Systemic IGF-1:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Production:</strong> Made locally in muscle, not liver</li>
                <li><strong>Timing:</strong> Expression peaks 24-48 hours post-exercise</li>
                <li><strong>Function:</strong> Activates satellite cells for muscle repair</li>
                <li><strong>Synthetic form:</strong> PEG-MGF has extended half-life for research</li>
              </ul>
            </div>
            
            <p className="text-muted-foreground">
              Synthetic MGF (and PEGylated MGF) are studied for muscle recovery, but data on exogenous MGF matching natural MGF's effects is limited.
            </p>
          </section>

          <section id="research-findings" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Research Findings</h2>
            <p className="text-muted-foreground mb-4">
              Key research on IGF-1 peptides includes:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li><strong>Muscle protein synthesis:</strong> Human studies show IGF-1 infusion increased muscle protein synthesis by 25%</li>
              <li><strong>LR3 pharmacokinetics:</strong> LR3 variant demonstrated 20-30 hour half-life vs 12-15 minutes for native IGF-1</li>
              <li><strong>DES potency:</strong> Animal studies show truncated IGF-1 (DES) has 10x higher potency but very short duration</li>
              <li><strong>MGF expression:</strong> MGF expression peaks 24-48 hours post-exercise, preceding systemic IGF-1 increase</li>
              <li><strong>Cancer association:</strong> Meta-analyses link higher circulating IGF-1 to increased colorectal and breast cancer risk</li>
            </ul>
          </section>

          <section id="safety" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Safety Considerations</h2>
            
            <div className="bg-destructive/10 border border-destructive/30 p-6 rounded-lg mb-4">
              <h3 className="font-semibold text-destructive mb-3">Major Safety Concerns:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Cancer risk:</strong> IGF-1 promotes cell proliferation — epidemiological data links higher IGF-1 to cancer risk</li>
                <li><strong>Hypoglycemia:</strong> IGF-1 has insulin-like effects and can drop blood sugar</li>
                <li><strong>Organ growth:</strong> Can cause growth of internal organs (organomegaly) with chronic use</li>
                <li><strong>Acromegaly-like effects:</strong> Potential for bone/cartilage growth</li>
                <li><strong>No FDA approval:</strong> Not approved for muscle building or anti-aging</li>
              </ul>
            </div>
            
            <p className="text-muted-foreground mb-4">
              The cancer concern is particularly significant. The same mechanism that makes IGF-1 effective for muscle growth — promoting cell division and survival — also applies to cancer cells.
            </p>
            
            <WhatWeDontKnow unknowns={unknowns} />
          </section>

          <PrimarySources sources={sources} />

          <GuideChangelog entries={changelogEntries} />

          <GuideFAQ items={faqItems} />

          <BottomLineBox content="IGF-1 peptides (LR3, DES, MGF) offer direct activation of muscle growth pathways that GH secretagogues only indirectly stimulate. However, this potency comes with significant safety trade-offs — particularly the cancer risk associated with promoting cell proliferation. Most researchers consider GH secretagogues a safer approach, as they work within the body's natural feedback systems rather than overriding them." />

          <RelatedGuides guides={relatedGuides} />

          <GuideCTA />

          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
