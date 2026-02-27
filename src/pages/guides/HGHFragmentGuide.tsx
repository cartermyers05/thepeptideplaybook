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
  { id: "what-is-hgh-fragment", title: "What is HGH Fragment?", level: 2 },
  { id: "difference-from-hgh", title: "Difference from Full HGH", level: 2 },
  { id: "mechanism", title: "Mechanism of Action", level: 2 },
  { id: "research-findings", title: "Research Findings", level: 2 },
  { id: "aod-9604", title: "AOD-9604 Connection", level: 2 },
  { id: "dosing", title: "Dosing in Studies", level: 2 },
  { id: "administration", title: "Administration & Timing", level: 2 },
  { id: "side-effects", title: "Side Effects", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const faqItems = [
  {
    question: "Is HGH Fragment 176-191 the same as AOD-9604?",
    answer: "Almost. AOD-9604 is HGH Fragment 176-191 with an additional tyrosine amino acid added at the C-terminus. This modification was made by Metabolic Pharmaceuticals during development. Functionally, they're very similar and target the same fat-burning mechanisms.",
  },
  {
    question: "Does HGH Fragment affect blood sugar like full HGH?",
    answer: "Research suggests HGH Fragment 176-191 does not cause the insulin resistance or blood sugar issues associated with full HGH. This is because it lacks the portion of HGH responsible for those effects. This was one of the primary goals in developing it.",
  },
  {
    question: "Can HGH Fragment build muscle?",
    answer: "No. HGH Fragment 176-191 only contains the lipolytic (fat-burning) portion of growth hormone. It does not stimulate IGF-1 production or have the muscle-building effects of full HGH.",
  },
  {
    question: "Why take HGH Fragment instead of full HGH?",
    answer: "The theoretical advantage is targeted fat loss without HGH's side effects — no insulin resistance, no water retention, no joint pain, no organ growth. However, the trade-off is you also don't get HGH's muscle-building or recovery benefits.",
  },
  {
    question: "Is HGH Fragment FDA-approved?",
    answer: "No. HGH Fragment 176-191 is not FDA-approved. AOD-9604, the slightly modified version, is TGA-approved in Australia for osteoarthritis (as an injection) but not for weight loss. In the US, it remains a research compound.",
  },
  {
    question: "How long until HGH Fragment shows results?",
    answer: "Research protocols typically run 12+ weeks. Unlike GLP-1 medications that show effects within weeks, fat-targeting peptides generally require longer duration studies. Individual response varies significantly.",
  },
];

const unknowns = [
  "Why Phase III trials for obesity were not completed despite promising Phase II data",
  "Long-term safety beyond 12-week study periods",
  "Whether oral forms have adequate bioavailability",
  "Optimal cycling protocols for extended use",
  "Comparison efficacy against modern GLP-1 medications",
];

const sources = [
  {
    title: "AOD-9604 Clinical Trials - ClinicalTrials.gov",
    url: "https://clinicaltrials.gov/search?term=AOD-9604",
    description: "Registry of clinical trials involving AOD-9604 and HGH fragments",
  },
  {
    title: "TGA Public Summary - AOD-9604",
    url: "https://www.tga.gov.au/",
    description: "Australian Therapeutic Goods Administration information on AOD-9604",
  },
  {
    title: "PubMed - HGH Fragment Research",
    url: "https://pubmed.ncbi.nlm.nih.gov/?term=HGH+fragment+176-191",
    description: "Database of peer-reviewed HGH fragment research",
  },
];

const relatedGuides = [
  {
    title: "Best Peptides for Weight Loss",
    href: "/guides/best-peptides-weight-loss",
    description: "Compare all weight loss peptides",
  },
  {
    title: "Semaglutide Complete Guide",
    href: "/guides/semaglutide-complete-guide",
    description: "FDA-approved GLP-1 for weight loss",
  },
  {
    title: "HGH Peptides Guide",
    href: "/guides/hgh-peptides",
    description: "Growth hormone secretagogues overview",
  },
];

const changelogEntries = [
  { date: "Feb 5, 2026", change: "Initial publication" },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "HGH Fragment 176-191 Research Guide",
  datePublished: "2026-02-05",
  dateModified: "2026-02-27",
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
    "HGH Fragment 176-191 is a modified fragment of human growth hormone specifically studied for fat metabolism without the blood sugar effects of full HGH.",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/guides/hgh-fragment`,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function HGHFragmentGuide() {
  return (
    <GuideLayout
      title="HGH Fragment 176-191 Research Guide"
      description="HGH Fragment 176-191 (AOD-9604) is a modified fragment of human growth hormone specifically studied for fat metabolism. Unlike full HGH, research suggests it targets fat loss without affecting blood sugar or insulin sensitivity."
      slug="hgh-fragment"
      articleSchema={articleSchema}
      faqSchema={faqSchema}
    >
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Table of Contents Sidebar */}
        <aside className="lg:w-64 shrink-0">
          <GuideTableOfContents items={tocItems} />
        </aside>

        {/* Main Content */}
        <article className="flex-1 min-w-0">
          <QuickAnswerBox
            answer="HGH Fragment 176-191 is the fat-burning portion of growth hormone (amino acids 176-191) without the muscle-building or blood sugar-affecting components. Also known as AOD-9604, it showed promise in Phase II obesity trials for targeted fat loss without insulin resistance. Development stalled before Phase III completion."
            lastUpdated="February 2026"
            readTime="10 min"
          />

          <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-6">
            HGH Fragment 176-191 Research Guide
          </h1>

          <section id="what-is-hgh-fragment" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">What is HGH Fragment 176-191?</h2>
            <p className="text-muted-foreground mb-4">
              HGH Fragment 176-191 is a synthetic peptide consisting of amino acids 176 through 191 of the human growth hormone sequence — the C-terminal portion. This 16-amino-acid fragment was isolated specifically because it contains the region responsible for HGH's fat-burning (lipolytic) activity.
            </p>
            <p className="text-muted-foreground mb-4">
              The fragment was developed as a potential obesity treatment that could deliver HGH's fat-reducing benefits without the side effects associated with full growth hormone therapy — particularly insulin resistance and effects on blood sugar.
            </p>
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="font-semibold mb-3">Key Characteristics:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Length:</strong> 16 amino acids (176-191 of HGH)</li>
                <li><strong>Function:</strong> Lipolytic (fat-burning) activity only</li>
                <li><strong>IGF-1:</strong> Does NOT increase IGF-1 production</li>
                <li><strong>Muscle:</strong> No direct muscle-building effects</li>
                <li><strong>Blood sugar:</strong> Research shows no impairment of glucose tolerance</li>
              </ul>
            </div>
          </section>

          <section id="difference-from-hgh" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">How Does It Differ from Full HGH?</h2>
            <p className="text-muted-foreground mb-4">
              Full human growth hormone is a 191-amino-acid peptide with multiple functions. HGH Fragment 176-191 contains only the portion responsible for fat metabolism:
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse mb-4">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 pr-4 font-semibold">Effect</th>
                    <th className="text-left py-3 pr-4 font-semibold">Full HGH</th>
                    <th className="text-left py-3 font-semibold">HGH Fragment</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4">Fat burning (lipolysis)</td>
                    <td className="py-3 pr-4">Yes</td>
                    <td className="py-3 text-primary">Yes ✓</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4">Muscle building</td>
                    <td className="py-3 pr-4">Yes (via IGF-1)</td>
                    <td className="py-3">No</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4">IGF-1 increase</td>
                    <td className="py-3 pr-4">Yes</td>
                    <td className="py-3">No</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4">Insulin resistance</td>
                    <td className="py-3 pr-4 text-destructive">Yes (concern)</td>
                    <td className="py-3 text-primary">No ✓</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4">Water retention</td>
                    <td className="py-3 pr-4">Common</td>
                    <td className="py-3">Minimal</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4">Joint effects</td>
                    <td className="py-3 pr-4">Can cause pain</td>
                    <td className="py-3">Not reported</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4">Cost</td>
                    <td className="py-3 pr-4">Very expensive</td>
                    <td className="py-3">Less expensive</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="mechanism" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Mechanism of Action</h2>
            <p className="text-muted-foreground mb-4">
              HGH Fragment 176-191 works through a different pathway than full growth hormone. It doesn't bind to the GH receptor in the same way:
            </p>
            
            <div className="bg-muted/30 p-6 rounded-lg mb-4">
              <h3 className="font-semibold mb-3">How It Burns Fat:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Direct adipocyte action:</strong> Acts directly on fat cells (adipocytes)</li>
                <li><strong>Stimulates lipolysis:</strong> Increases breakdown of stored fat into fatty acids</li>
                <li><strong>Inhibits lipogenesis:</strong> Reduces new fat formation</li>
                <li><strong>Beta-3 receptor:</strong> May work partly through beta-3 adrenergic pathways</li>
              </ul>
            </div>
            
            <p className="text-muted-foreground">
              Importantly, because it doesn't activate the full GH receptor signaling cascade, it doesn't trigger IGF-1 production or the downstream insulin resistance that full HGH can cause.
            </p>
          </section>

          <section id="research-findings" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Research Findings</h2>
            <p className="text-muted-foreground mb-4">
              Key research on HGH Fragment 176-191 and AOD-9604:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li><strong>Phase IIb obesity trial (2004):</strong> 1mg daily showed significant fat loss vs placebo at 12 weeks without affecting glucose tolerance</li>
              <li><strong>Lipolytic activity study (2001):</strong> Fragment 176-191 stimulated lipolysis without binding to GH receptor or affecting IGF-1</li>
              <li><strong>Mechanism study (2002):</strong> Acts directly on adipose tissue to stimulate fat breakdown and inhibit lipogenesis</li>
              <li><strong>Glucose tolerance study (2000):</strong> No impairment of glucose tolerance observed, unlike full HGH</li>
              <li><strong>Safety evaluation (2006):</strong> Well-tolerated in 12-week trials with no serious adverse events</li>
            </ul>
            
            <div className="bg-muted/30 border border-border p-4 rounded-lg mt-4">
              <p className="text-muted-foreground text-sm">
                <strong>Note:</strong> Despite promising Phase II results, Metabolic Pharmaceuticals did not complete Phase III trials for obesity. The company later pivoted to studying AOD-9604 for osteoarthritis, where it received TGA approval in Australia.
              </p>
            </div>
          </section>

          <section id="aod-9604" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">The AOD-9604 Connection</h2>
            <p className="text-muted-foreground mb-4">
              AOD-9604 (Anti-Obesity Drug 9604) is essentially HGH Fragment 176-191 with one modification — an added tyrosine amino acid at the C-terminus:
            </p>
            
            <div className="bg-muted/30 p-6 rounded-lg mb-4">
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Developer:</strong> Metabolic Pharmaceuticals (Australia)</li>
                <li><strong>Modification:</strong> Tyrosine added to C-terminus for stability</li>
                <li><strong>Clinical trials:</strong> Reached Phase IIb for obesity</li>
                <li><strong>TGA approval:</strong> Approved in Australia for osteoarthritis (intra-articular injection)</li>
                <li><strong>Brand name:</strong> Marketed as part of Aethera Biomedical's joint treatment</li>
              </ul>
            </div>
            
            <p className="text-muted-foreground">
              In the research peptide community, HGH Fragment 176-191 and AOD-9604 are often used interchangeably, though technically they differ by one amino acid.
            </p>
          </section>

          <section id="dosing" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Dosing in Research Studies</h2>
            <p className="text-muted-foreground mb-4">
              Clinical trials used the following dosing protocols:
            </p>
            
            <div className="bg-muted/30 p-6 rounded-lg mb-4">
              <h3 className="font-semibold mb-3">Clinical Trial Dosing:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Phase I:</strong> Single doses from 50 mcg to 1500 mcg</li>
                <li><strong>Phase II:</strong> 1 mg daily for 12 weeks showed efficacy</li>
                <li><strong>Administration:</strong> Subcutaneous injection</li>
                <li><strong>Timing:</strong> Typically morning, fasted state</li>
              </ul>
            </div>
            
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="font-semibold mb-3">Research Community Protocols:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Common range:</strong> 250-500 mcg per injection</li>
                <li><strong>Frequency:</strong> 1-2 times daily</li>
                <li><strong>Timing:</strong> Morning fasted and/or pre-workout</li>
                <li><strong>Duration:</strong> 12-16 week cycles</li>
              </ul>
            </div>
          </section>

          <section id="administration" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Administration and Timing</h2>
            <p className="text-muted-foreground mb-4">
              HGH Fragment is typically administered via subcutaneous injection. Timing considerations are based on optimizing fat oxidation:
            </p>
            
            <div className="bg-muted/30 p-6 rounded-lg mb-4">
              <h3 className="font-semibold mb-3">Optimal Timing Protocol:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Morning injection:</strong> Upon waking, before eating (fasted state)</li>
                <li><strong>Wait period:</strong> 30-60 minutes before eating after injection</li>
                <li><strong>Pre-workout:</strong> 30 minutes before cardio if doing fasted training</li>
                <li><strong>Avoid:</strong> Injecting after high-carb meals (elevated insulin may inhibit effects)</li>
              </ul>
            </div>
            
            <p className="text-muted-foreground">
              See our <Link to="/guides/peptide-reconstitution" className="text-primary hover:underline">reconstitution guide</Link> for proper peptide preparation.
            </p>
          </section>

          <section id="side-effects" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Side Effects</h2>
            <p className="text-muted-foreground mb-4">
              Clinical trials reported a favorable safety profile compared to full HGH:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                <h3 className="font-semibold text-primary mb-2">Reported in Trials:</h3>
                <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                  <li>Injection site reactions (mild)</li>
                  <li>Headache (uncommon)</li>
                  <li>Generally well-tolerated</li>
                </ul>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">NOT Reported (Unlike HGH):</h3>
                <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                  <li>Water retention</li>
                  <li>Joint pain</li>
                  <li>Carpal tunnel symptoms</li>
                  <li>Elevated blood sugar</li>
                </ul>
              </div>
            </div>
            
            <WhatWeDontKnow unknowns={unknowns} />
          </section>

          <PrimarySources sources={sources} />

          <GuideChangelog entries={changelogEntries} />

          <GuideFAQ items={faqItems} />

          <BottomLineBox content="HGH Fragment 176-191 (AOD-9604) offers a targeted approach to fat loss — the lipolytic benefits of growth hormone without the muscle-building effects or metabolic side effects. Phase II trials showed promise, but development for obesity was discontinued. In the current landscape, FDA-approved GLP-1 medications like Semaglutide and Tirzepatide have stronger clinical evidence for weight loss, though they work through completely different mechanisms." />

          <RelatedGuides guides={relatedGuides} />

          <GuideCTA />

          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
