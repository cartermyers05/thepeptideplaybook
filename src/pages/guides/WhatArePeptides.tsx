import { GuideLayout } from "@/components/guides/GuideLayout";
import { QuickAnswerBox } from "@/components/guides/QuickAnswerBox";
import { BottomLineBox } from "@/components/guides/BottomLineBox";
import { GuideFAQ } from "@/components/guides/GuideFAQ";
import { GuideCTA } from "@/components/guides/GuideCTA";
import { GuideDisclaimer } from "@/components/guides/GuideDisclaimer";
import { RelatedGuides } from "@/components/guides/RelatedGuides";
import { GuideTableOfContents } from "@/components/guides/GuideTableOfContents";
import { GuideChangelog } from "@/components/guides/GuideChangelog";
import { KeyTakeawayBox } from "@/components/guides/KeyTakeawayBox";
import { References } from "@/components/guides/References";
import { SITE_URL } from "@/lib/seo";
import { Link } from "react-router-dom";

const tocItems = [
  { id: "definition", title: "What Are Peptides?", level: 2 },
  { id: "how-they-work", title: "How Peptides Work in the Body", level: 2 },
  { id: "peptides-vs-proteins", title: "Peptides vs Proteins", level: 2 },
  { id: "categories", title: "Types of Peptides", level: 2 },
  { id: "healing-peptides", title: "Healing Peptides (BPC-157, TB-500)", level: 3 },
  { id: "gh-peptides", title: "Growth Hormone Peptides", level: 3 },
  { id: "weight-loss-peptides", title: "Weight Loss Peptides (GLP-1)", level: 3 },
  { id: "anti-aging-peptides", title: "Anti-Aging & Skin Peptides", level: 3 },
  { id: "are-they-safe", title: "Are Peptides Safe?", level: 2 },
  { id: "legal-status", title: "Legal Status of Peptides", level: 2 },
  { id: "how-to-use", title: "How Are Peptides Administered?", level: 2 },
  { id: "buying-peptides", title: "Where to Get Peptides", level: 2 },
  { id: "research-limitations", title: "Research Limitations", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
  { id: "references", title: "References", level: 2 },
];

const faqItems = [
  {
    question: "What are peptides used for?",
    answer: "Peptides are studied for various applications including tissue healing and recovery (BPC-157, TB-500), weight loss (semaglutide, tirzepatide), growth hormone optimization (CJC-1295, ipamorelin), anti-aging and skin rejuvenation (GHK-Cu), and muscle preservation. Some peptides like semaglutide are FDA-approved medications, while others remain research compounds."
  },
  {
    question: "Are peptides steroids?",
    answer: "No, peptides are not steroids. Steroids are lipid-based hormones derived from cholesterol (like testosterone and cortisol). Peptides are short chains of amino acids that act as signaling molecules. They work through completely different mechanisms — steroids typically bind to intracellular receptors, while peptides usually bind to cell surface receptors."
  },
  {
    question: "Are peptides safe to take?",
    answer: "Safety varies significantly by peptide. FDA-approved peptides (semaglutide, tirzepatide) have extensive safety data from clinical trials. Research peptides (BPC-157, TB-500) have mostly animal studies and limited human data. All peptides carry some risk, and many research peptides have unknown long-term effects. Quality and purity from unregulated sources is also a major safety concern."
  },
  {
    question: "Do peptides really work?",
    answer: "Some peptides have strong clinical evidence — semaglutide and tirzepatide are proven to cause significant weight loss in multiple large trials. Other peptides like BPC-157 show promising results in animal studies but lack human clinical trials. Effectiveness varies by peptide, with FDA-approved options having the strongest evidence."
  },
  {
    question: "Are peptides legal?",
    answer: "Legal status varies. Prescription peptides (semaglutide, tirzepatide) are legal with a prescription. Research peptides are legal to purchase for 'research purposes' but not FDA-approved for human use. Some peptides are controlled substances or banned by sports organizations like WADA. Compounded peptides exist in a regulatory gray area that the FDA is actively addressing."
  },
  {
    question: "How are peptides different from supplements?",
    answer: "Peptides are bioactive compounds that work through specific receptor mechanisms, while supplements typically provide nutrients. Peptides often require injection for effectiveness (though some work orally or topically). Most research peptides are not dietary supplements and are not regulated by the FDA as such."
  },
  {
    question: "How long do peptides take to work?",
    answer: "Timeline varies by peptide and goal. Weight loss peptides typically show noticeable results in 4-8 weeks. Healing peptides may show benefits in 2-4 weeks for acute injuries. Skin peptides generally require 8-12 weeks for visible changes. Growth hormone peptides may take 3-6 months for body composition changes."
  },
  {
    question: "Can I take peptides orally?",
    answer: "Most peptides are destroyed by digestive enzymes and require injection. Exceptions include BPC-157 (some oral absorption), collagen peptides (digested but provide amino acids), and semaglutide (available as Rybelsus oral tablets using special absorption technology). Topical peptides like GHK-Cu work for skin applications."
  },
  {
    question: "What is the most popular peptide?",
    answer: "Semaglutide (Ozempic, Wegovy) is currently the most widely used peptide, with millions of prescriptions for weight loss and diabetes. In the research peptide space, BPC-157 is the most popular healing peptide, followed by CJC-1295/Ipamorelin for growth hormone optimization."
  },
  {
    question: "Do peptides have side effects?",
    answer: "Yes, all peptides can have side effects. GLP-1 peptides commonly cause nausea, constipation, and appetite suppression. Growth hormone peptides may cause water retention and tingling. BPC-157's side effects are largely unknown due to limited human data. Injection site reactions are common with all injectable peptides."
  },
];

const relatedGuides = [
  { title: "Peptides for Beginners", href: "/guides/peptides-for-beginners", description: "Start here if you're new to peptides" },
  { title: "BPC-157 Complete Guide", href: "/guides/bpc-157-complete-guide", description: "Most researched healing peptide" },
  { title: "Semaglutide Complete Guide", href: "/guides/semaglutide-complete-guide", description: "FDA-approved weight loss peptide" },
  { title: "Are Peptides Safe?", href: "/guides/are-peptides-safe", description: "Honest breakdown of risks and unknowns" },
  { title: "FDA Legal Status 2026", href: "/guides/peptides-fda-legal-status-2026", description: "What's legal, banned, and gray area" },
];

const changelogEntries = [
  { date: "Feb 6, 2026", change: "Initial publication - comprehensive peptide overview" },
];

const references = [
  { number: 1, text: "Fosgerau K, Hoffmann T. Peptide therapeutics: current status and future directions. Drug Discov Today. 2015;20(1):122-8.", url: "https://pubmed.ncbi.nlm.nih.gov/25450771/" },
  { number: 2, text: "Lau JL, Dunn MK. Therapeutic peptides: Historical perspectives, current development trends, and future directions. Bioorg Med Chem. 2018;26(10):2700-2707.", url: "https://pubmed.ncbi.nlm.nih.gov/29097106/" },
  { number: 3, text: "Muttenthaler M, King GF, Adams DJ, Alewood PF. Trends in peptide drug discovery. Nat Rev Drug Discov. 2021;20(4):309-325.", url: "https://pubmed.ncbi.nlm.nih.gov/33536635/" },
  { number: 4, text: "Wang L, Wang N, Zhang W, et al. Therapeutic peptides: current applications and future directions. Signal Transduct Target Ther. 2022;7(1):48.", url: "https://pubmed.ncbi.nlm.nih.gov/35165272/" },
  { number: 5, text: "Wilding JPH, Batterham RL, Calanna S, et al. Once-Weekly Semaglutide in Adults with Overweight or Obesity. N Engl J Med. 2021;384(11):989-1002.", url: "https://pubmed.ncbi.nlm.nih.gov/33567185/" },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What Are Peptides? Complete Guide to Peptide Science (2026)",
  datePublished: "2026-02-06",
  dateModified: "2026-02-06",
  author: { "@type": "Organization", name: "Peptide Playbook" },
  publisher: { "@type": "Organization", name: "Peptide Playbook", url: SITE_URL },
};

export default function WhatArePeptides() {
  return (
    <GuideLayout
      title="What Are Peptides? Complete Guide to Peptide Science (2026)"
      description="What are peptides? Comprehensive guide covering how peptides work, types of peptides (healing, weight loss, anti-aging, growth hormone), safety, legal status, and clinical research."
      slug="what-are-peptides"
      articleSchema={articleSchema}
    >
      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="lg:w-64 shrink-0">
          <GuideTableOfContents items={tocItems} />
        </aside>

        <article className="flex-1 min-w-0">
          <QuickAnswerBox
            answer="Peptides are short chains of amino acids (typically 2-50) that act as signaling molecules in the body. They're smaller than proteins and include hormones, neurotransmitters, and growth factors. Some peptides like semaglutide are FDA-approved drugs; others are research compounds. Categories include healing peptides (BPC-157, TB-500), weight loss peptides (GLP-1 agonists), growth hormone peptides (CJC-1295, ipamorelin), and anti-aging peptides (GHK-Cu)."
            lastUpdated="February 2026"
            readTime="25 min"
          />

          <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-6">
            What Are Peptides? Complete Guide to Peptide Science (2026)
          </h1>

          <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
            Peptides have exploded in popularity over the past few years, driven by the success of weight loss medications like Ozempic (semaglutide) and growing interest in healing and anti-aging compounds. But what exactly are peptides, how do they work, and what does the science actually show?
          </p>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            This comprehensive guide covers everything you need to understand peptides — from basic science to specific categories, safety considerations, legal status, and how to evaluate the research. Whether you're hearing about peptides for the first time or looking to deepen your understanding, this guide provides an evidence-based foundation.
          </p>

          {/* Section: What Are Peptides? */}
          <section id="definition" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">What Are Peptides?</h2>
            <p className="text-muted-foreground mb-4">
              Peptides are short chains of amino acids — the same building blocks that make up proteins. The key difference is size: peptides typically contain 2-50 amino acids, while proteins contain 50+ amino acids (often hundreds or thousands).<sup className="text-primary cursor-pointer hover:underline"><a href="#ref-1">1</a></sup>
            </p>
            <p className="text-muted-foreground mb-4">
              Your body naturally produces thousands of different peptides that serve critical functions:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li><strong>Hormones:</strong> Insulin (regulates blood sugar), oxytocin (social bonding), and vasopressin (water balance) are all peptide hormones</li>
              <li><strong>Neurotransmitters:</strong> Endorphins (natural painkillers) are peptides</li>
              <li><strong>Growth factors:</strong> IGF-1 and various growth factors that regulate tissue repair</li>
              <li><strong>Antimicrobial peptides:</strong> Your immune system produces peptides that kill bacteria and viruses</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              When we talk about "peptide therapy" or "peptide supplements," we're referring to synthetic or bioidentical versions of these natural compounds — or novel peptides designed to interact with specific biological pathways.
            </p>
            <div className="bg-muted/30 p-4 rounded-lg mb-4">
              <h3 className="font-semibold mb-2">Key Definition</h3>
              <p className="text-muted-foreground text-sm">
                <strong>Peptide:</strong> A molecule consisting of 2-50 amino acids linked by peptide bonds. Peptides act as signaling molecules that trigger specific cellular responses when they bind to receptors.
              </p>
            </div>
          </section>

          {/* Section: How Peptides Work */}
          <section id="how-they-work" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">How Peptides Work in the Body</h2>
            <p className="text-muted-foreground mb-4">
              Peptides work primarily through receptor binding. When a peptide reaches its target cell, it binds to specific receptors (usually on the cell surface), triggering a cascade of intracellular signaling that produces a biological effect.<sup className="text-primary cursor-pointer hover:underline"><a href="#ref-2">2</a></sup>
            </p>
            <p className="text-muted-foreground mb-4">
              This mechanism differs from how most traditional drugs work:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li><strong>High specificity:</strong> Peptides typically target specific receptors, reducing off-target effects</li>
              <li><strong>Natural signaling:</strong> They often mimic or enhance natural biological processes</li>
              <li><strong>Low toxicity:</strong> Peptides break down into natural amino acids, reducing accumulation</li>
              <li><strong>Short half-life:</strong> Most peptides are metabolized quickly, requiring frequent dosing</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              However, this also creates challenges: most peptides cannot be taken orally because digestive enzymes break them down before absorption. This is why many peptides require injection — though pharmaceutical companies are developing oral formulations (like Rybelsus, an oral semaglutide).
            </p>
          </section>

          <KeyTakeawayBox content="Peptides are short amino acid chains (2-50 amino acids) that act as signaling molecules. They work by binding to specific receptors and triggering cellular responses. Your body naturally produces thousands of peptides; therapeutic peptides are synthetic versions designed to enhance or mimic these natural functions." />

          {/* Section: Peptides vs Proteins */}
          <section id="peptides-vs-proteins" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Peptides vs Proteins: What's the Difference?</h2>
            <p className="text-muted-foreground mb-4">
              The distinction between peptides and proteins is primarily one of size and structure:
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 pr-4">Feature</th>
                    <th className="text-left py-3 pr-4">Peptides</th>
                    <th className="text-left py-3">Proteins</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium">Size</td>
                    <td className="py-3 pr-4">2-50 amino acids</td>
                    <td className="py-3">50+ amino acids (often thousands)</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium">Structure</td>
                    <td className="py-3 pr-4">Simple, linear or small folds</td>
                    <td className="py-3">Complex 3D structures</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium">Examples</td>
                    <td className="py-3 pr-4">Insulin, BPC-157, semaglutide</td>
                    <td className="py-3">Hemoglobin, antibodies, enzymes</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium">Manufacturing</td>
                    <td className="py-3 pr-4">Chemical synthesis common</td>
                    <td className="py-3">Usually require biological systems</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium">Stability</td>
                    <td className="py-3 pr-4">Generally less stable</td>
                    <td className="py-3">More stable when properly folded</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground">
              Both peptides and proteins are made of amino acids linked by peptide bonds. The main practical difference is that peptides' smaller size makes them easier to synthesize and modify, but also makes them more susceptible to degradation.
            </p>
          </section>

          {/* Section: Types of Peptides */}
          <section id="categories" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Types of Peptides: Major Categories</h2>
            <p className="text-muted-foreground mb-6">
              Therapeutic peptides can be grouped into several major categories based on their primary effects:<sup className="text-primary cursor-pointer hover:underline"><a href="#ref-3">3</a></sup>
            </p>

            <h3 id="healing-peptides" className="text-xl font-semibold mb-3">Healing & Recovery Peptides</h3>
            <p className="text-muted-foreground mb-4">
              These peptides are studied for tissue repair, injury recovery, and healing acceleration:
            </p>
            <div className="space-y-4 mb-6">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">BPC-157 (Body Protection Compound)</h4>
                <p className="text-muted-foreground text-sm mb-2">
                  A 15-amino acid peptide derived from human gastric juice. Studied for tendon, ligament, muscle, and gut healing. Strong animal evidence; no published human trials. FDA issued warning letters in 2024.
                </p>
                <Link to="/guides/bpc-157-complete-guide" className="text-primary text-sm hover:underline">→ Complete BPC-157 Guide</Link>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">TB-500 (Thymosin Beta-4)</h4>
                <p className="text-muted-foreground text-sm mb-2">
                  A 43-amino acid peptide involved in tissue repair and regeneration. Studied for wound healing and cardiac repair. Primarily animal research; banned by WADA.
                </p>
                <Link to="/guides/tb-500-research-guide" className="text-primary text-sm hover:underline">→ Complete TB-500 Guide</Link>
              </div>
            </div>

            <h3 id="gh-peptides" className="text-xl font-semibold mb-3">Growth Hormone Peptides</h3>
            <p className="text-muted-foreground mb-4">
              These peptides stimulate your body's natural growth hormone production:
            </p>
            <div className="space-y-4 mb-6">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">CJC-1295 / Ipamorelin Stack</h4>
                <p className="text-muted-foreground text-sm mb-2">
                  The most popular GH secretagogue combination. CJC-1295 is a GHRH analog; ipamorelin is a ghrelin mimetic. Together they stimulate pulsatile GH release. Used for anti-aging, recovery, and body composition.
                </p>
                <Link to="/guides/hgh-peptides" className="text-primary text-sm hover:underline">→ HGH Peptides Guide</Link>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">MK-677 (Ibutamoren)</h4>
                <p className="text-muted-foreground text-sm mb-2">
                  An oral GH secretagogue (technically not a peptide, but often grouped with them). Convenient oral dosing but affects appetite, blood sugar, and sleep. Some human clinical data available.
                </p>
              </div>
            </div>

            <h3 id="weight-loss-peptides" className="text-xl font-semibold mb-3">Weight Loss Peptides (GLP-1 Agonists)</h3>
            <p className="text-muted-foreground mb-4">
              These are the most clinically validated peptides, with extensive human trial data:
            </p>
            <div className="space-y-4 mb-6">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Semaglutide (Ozempic, Wegovy)</h4>
                <p className="text-muted-foreground text-sm mb-2">
                  FDA-approved GLP-1 receptor agonist. Clinical trials show 15-17% body weight reduction. Weekly injection. The most prescribed weight loss medication globally as of 2026.<sup className="text-primary cursor-pointer hover:underline"><a href="#ref-5">5</a></sup>
                </p>
                <Link to="/guides/semaglutide-complete-guide" className="text-primary text-sm hover:underline">→ Complete Semaglutide Guide</Link>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Tirzepatide (Mounjaro, Zepbound)</h4>
                <p className="text-muted-foreground text-sm mb-2">
                  Dual GIP/GLP-1 receptor agonist. Clinical trials show up to 22.5% weight loss — the most effective weight loss medication ever studied. FDA-approved for diabetes and obesity.
                </p>
                <Link to="/guides/tirzepatide-vs-semaglutide" className="text-primary text-sm hover:underline">→ Tirzepatide vs Semaglutide</Link>
              </div>
            </div>

            <h3 id="anti-aging-peptides" className="text-xl font-semibold mb-3">Anti-Aging & Skin Peptides</h3>
            <p className="text-muted-foreground mb-4">
              These peptides target skin health, collagen production, and cellular aging:
            </p>
            <div className="space-y-4 mb-6">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">GHK-Cu (Copper Peptide)</h4>
                <p className="text-muted-foreground text-sm mb-2">
                  Naturally occurring copper-binding tripeptide. 50+ years of research. Studies show 55.8% wrinkle reduction. Available topically (skincare) and injectable. Modulates 4,000+ genes.
                </p>
                <Link to="/guides/ghk-cu-complete-guide" className="text-primary text-sm hover:underline">→ Complete GHK-Cu Guide</Link>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Epitalon</h4>
                <p className="text-muted-foreground text-sm mb-2">
                  Synthetic version of epithalamin. Studied for telomerase activation and potential longevity effects. Primarily Russian research; limited Western clinical data.
                </p>
                <Link to="/guides/epitalon-peptide" className="text-primary text-sm hover:underline">→ Epitalon Research Guide</Link>
              </div>
            </div>
          </section>

          <KeyTakeawayBox content="Major peptide categories include: Healing (BPC-157, TB-500), Growth Hormone (CJC-1295/Ipamorelin), Weight Loss (semaglutide, tirzepatide), and Anti-Aging (GHK-Cu, Epitalon). FDA-approved peptides have the strongest evidence; research peptides have mostly animal studies." />

          {/* Section: Are Peptides Safe? */}
          <section id="are-they-safe" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Are Peptides Safe?</h2>
            <p className="text-muted-foreground mb-4">
              Safety varies dramatically between peptides. It's critical to distinguish between:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li><strong>FDA-approved peptides:</strong> Semaglutide and tirzepatide have extensive Phase 3 trial data with thousands of participants. Side effects are well-documented (nausea, constipation, etc.).</li>
              <li><strong>Research peptides:</strong> BPC-157, TB-500, and others have mostly animal studies. Human safety data is largely anecdotal. Long-term effects are unknown.</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              Common safety concerns with research peptides:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li><strong>Purity and contamination:</strong> Unregulated sources may contain impurities, wrong peptides, or bacterial contamination</li>
              <li><strong>Unknown long-term effects:</strong> Most research peptides haven't been studied beyond 4-12 weeks</li>
              <li><strong>Theoretical cancer concerns:</strong> Peptides that promote angiogenesis or cell growth could theoretically affect tumor progression (no evidence, but no safety data either)</li>
              <li><strong>Drug interactions:</strong> Limited data on how research peptides interact with medications</li>
            </ul>
            <p className="text-muted-foreground">
              <Link to="/guides/are-peptides-safe" className="text-primary hover:underline">→ Full safety breakdown: Are Peptides Safe?</Link>
            </p>
          </section>

          {/* Section: Legal Status */}
          <section id="legal-status" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Legal Status of Peptides (2026)</h2>
            <p className="text-muted-foreground mb-4">
              Peptide legality exists on a spectrum:
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 pr-4">Category</th>
                    <th className="text-left py-3 pr-4">Examples</th>
                    <th className="text-left py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium">FDA Approved</td>
                    <td className="py-3 pr-4">Semaglutide, Tirzepatide</td>
                    <td className="py-3 text-primary">Legal with prescription</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium">Research Compounds</td>
                    <td className="py-3 pr-4">BPC-157, TB-500, CJC-1295</td>
                    <td className="py-3 text-muted-foreground">Legal to buy "for research" — not for human use</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium">Compounded</td>
                    <td className="py-3 pr-4">Compounded semaglutide</td>
                    <td className="py-3 text-muted-foreground">Gray area — FDA crackdown ongoing</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium">WADA Banned</td>
                    <td className="py-3 pr-4">BPC-157, TB-500, GH peptides</td>
                    <td className="py-3 text-destructive">Prohibited in sports</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground">
              <Link to="/guides/peptides-fda-legal-status-2026" className="text-primary hover:underline">→ Complete FDA Legal Status Guide</Link>
            </p>
          </section>

          {/* Section: How to Use */}
          <section id="how-to-use" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">How Are Peptides Administered?</h2>
            <p className="text-muted-foreground mb-4">
              Most peptides require specific administration methods:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li><strong>Subcutaneous injection:</strong> Most common method. Small needle into fat tissue (belly, thigh). Required for most peptides because oral digestion destroys them.</li>
              <li><strong>Intramuscular injection:</strong> Some practitioners prefer IM for certain peptides, though evidence doesn't clearly favor either route.</li>
              <li><strong>Topical:</strong> GHK-Cu and some cosmetic peptides work topically for skin applications.</li>
              <li><strong>Oral:</strong> Limited options — BPC-157 has some oral bioavailability; Rybelsus (oral semaglutide) uses special absorption technology.</li>
              <li><strong>Nasal spray:</strong> Some peptides (like certain research compounds) are formulated nasally for brain-related effects.</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              Research peptides typically come as lyophilized (freeze-dried) powder that must be reconstituted with bacteriostatic water before injection.
            </p>
            <p className="text-muted-foreground">
              <Link to="/guides/peptide-reconstitution" className="text-primary hover:underline">→ Peptide Reconstitution Guide</Link>
            </p>
          </section>

          {/* Section: Where to Get Peptides */}
          <section id="buying-peptides" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Where to Get Peptides</h2>
            <p className="text-muted-foreground mb-4">
              Sources vary significantly in quality and legality:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li><strong>Prescription (FDA-approved):</strong> Semaglutide and tirzepatide through licensed healthcare providers. Most reliable quality.</li>
              <li><strong>Compounding pharmacies:</strong> Some peptides available through compounding pharmacies with a prescription. Quality varies; FDA increasing oversight.</li>
              <li><strong>Research peptide vendors:</strong> Sell "for research purposes only" — legal gray area. Quality varies enormously. Look for third-party testing and Certificates of Analysis (COA).</li>
              <li><strong>Peptide clinics:</strong> Licensed clinics that prescribe and administer peptides. Legality depends on which peptides and how they're sourced.</li>
            </ul>
            <p className="text-muted-foreground">
              <Link to="/guides/verify-peptide-coa" className="text-primary hover:underline">→ How to Verify Peptide COA</Link>
            </p>
          </section>

          {/* Section: Research Limitations */}
          <section id="research-limitations" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Research Limitations: What We Don't Know</h2>
            <p className="text-muted-foreground mb-4">
              It's important to acknowledge what the research doesn't tell us:<sup className="text-primary cursor-pointer hover:underline"><a href="#ref-4">4</a></sup>
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li><strong>Limited human trials:</strong> Most research peptides (BPC-157, TB-500, etc.) have zero published human clinical trials. Evidence is primarily from animal studies and anecdotal reports.</li>
              <li><strong>Unknown long-term effects:</strong> Even FDA-approved peptides have limited long-term data. Research peptides have essentially none.</li>
              <li><strong>Optimal dosing unknown:</strong> Dosing recommendations for research peptides are based on animal studies or anecdotal use, not human pharmacokinetics.</li>
              <li><strong>Individual variation:</strong> Response to peptides can vary significantly between individuals.</li>
              <li><strong>Combination effects:</strong> How peptides interact with each other and with medications is largely unknown.</li>
            </ul>
            <p className="text-muted-foreground">
              The gap between animal research and human application is substantial. Promising animal studies frequently don't translate to humans, and safety profiles can differ dramatically between species.
            </p>
          </section>

          <GuideChangelog entries={changelogEntries} />
          <GuideFAQ items={faqItems} />
          
          <BottomLineBox content="Peptides are short amino acid chains that act as signaling molecules. Categories include healing (BPC-157, TB-500), weight loss (semaglutide, tirzepatide), growth hormone (CJC-1295/Ipamorelin), and anti-aging (GHK-Cu). FDA-approved peptides have strong clinical evidence; research peptides have mostly animal studies and unknown long-term safety. Legal status varies from prescription-required to research-only to banned in sports." />
          
          <RelatedGuides guides={relatedGuides} />
          
          <section id="references" className="mb-10">
            <References references={references} />
          </section>
          
          <GuideCTA />
          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}