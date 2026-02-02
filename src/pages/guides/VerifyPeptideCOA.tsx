import { GuideLayout } from "@/components/guides/GuideLayout";
import { QuickAnswerBox } from "@/components/guides/QuickAnswerBox";
import { BottomLineBox } from "@/components/guides/BottomLineBox";
import { GuideFAQ } from "@/components/guides/GuideFAQ";
import { GuideCTA } from "@/components/guides/GuideCTA";
import { GuideDisclaimer } from "@/components/guides/GuideDisclaimer";
import { RelatedGuides } from "@/components/guides/RelatedGuides";
import { GuideTableOfContents } from "@/components/guides/GuideTableOfContents";
import { PrimarySources } from "@/components/articles/PrimarySources";
import { WhatWeDontKnow } from "@/components/articles/WhatWeDontKnow";
import { GuideChangelog, ChangelogEntry } from "@/components/guides/GuideChangelog";
import { SITE_URL } from "@/lib/seo";

const tocItems = [
  { id: "what-is-coa", title: "What Is a COA?", level: 2 },
  { id: "hplc-testing", title: "HPLC Testing Explained (Purity)", level: 2 },
  { id: "mass-spec", title: "Mass Spectrometry Explained (Identity)", level: 2 },
  { id: "legitimate-coa", title: "What a Legitimate COA Looks Like", level: 2 },
  { id: "red-flags", title: "Red Flags to Watch For", level: 2 },
  { id: "questions-to-ask", title: "Questions to Ask Your Supplier", level: 2 },
  { id: "third-party-labs", title: "Third-Party Testing Labs", level: 2 },
  { id: "primary-sources", title: "Primary Sources", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const changelogEntries: ChangelogEntry[] = [
  { date: "Feb 2, 2026", change: "Initial publication" },
];

const faqItems = [
  {
    question: "What purity percentage is acceptable?",
    answer:
      "For research peptides, 98%+ purity is generally considered acceptable. Pharmaceutical-grade peptides are typically 99%+. Anything below 95% suggests manufacturing quality issues. However, purity only tells you about the peptide portion, not about contaminants like endotoxins or bacteria.",
  },
  {
    question: "Can COAs be faked?",
    answer:
      "Yes. Fraudulent COAs exist in the research peptide market. Red flags include: generic templates without lab details, batch numbers that don't match your product, same COA used across different batches, and inability to verify with the testing lab.",
  },
  {
    question: "Should I pay for my own testing?",
    answer:
      "If you're using research peptides, independent third-party testing is the only way to verify what you have. It costs $50-200 per sample depending on tests requested. For those committed to harm reduction, this is worth considering.",
  },
];

const relatedGuides = [
  { title: "Research Peptide Contamination Risks", href: "/guides/peptide-contamination" },
  { title: "BPC-157 Injection Infections", href: "/guides/bpc-157-infection-risk" },
  { title: "Are Peptides Safe? Research Overview", href: "/guides/are-peptides-safe" },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Verify Peptide COA: HPLC & Mass Spec Explained [2026]",
  description: "Learn to read peptide Certificates of Analysis. HPLC purity testing, mass spectrometry identity confirmation, and red flags to watch for.",
  datePublished: "2026-02-02",
  dateModified: "2026-02-02",
  author: {
    "@type": "Organization",
    name: "Peptide Playbook",
  },
  publisher: {
    "@type": "Organization",
    name: "Peptide Playbook",
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`,
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/guides/verify-peptide-coa`,
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

export default function VerifyPeptideCOA() {
  return (
    <GuideLayout
      title="How to Verify Peptide COA: HPLC & Mass Spec Explained [2026]"
      description="Learn to read peptide Certificates of Analysis. HPLC purity testing, mass spectrometry identity confirmation, and red flags to watch for."
      slug="verify-peptide-coa"
      articleSchema={articleSchema}
      faqSchema={faqSchema}
    >
      <div className="flex gap-10">
        <GuideTableOfContents items={tocItems} />

        <article className="flex-1 max-w-3xl">
          <QuickAnswerBox
            answer="A Certificate of Analysis (COA) should include HPLC (purity testing) and Mass Spectrometry (identity confirmation). Red flags: no COA provided, COA without batch numbers, purity below 98%, no lab name, or COA that does not match your batch. Legitimate suppliers provide third-party testing from ISO-certified labs."
            lastUpdated="February 2, 2026"
            readTime="10 minutes"
          />

          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            How to Verify Peptide COA: A Complete Guide
          </h1>

          <section id="what-is-coa" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">What Is a COA?</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              A Certificate of Analysis (COA) is a document from a laboratory that confirms testing results for a specific product batch. For peptides, a COA typically includes:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>Identity confirmation:</strong> Is this actually the peptide claimed?</li>
              <li><strong>Purity:</strong> What percentage is the active peptide vs impurities?</li>
              <li><strong>Batch number:</strong> Links results to a specific production run</li>
              <li><strong>Testing date:</strong> When was the analysis performed?</li>
              <li><strong>Lab name and accreditation:</strong> Who performed the testing?</li>
            </ul>
            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>Why it matters:</strong> In the unregulated peptide market, COAs are your only verification tool. Without one, you have no idea what's in the vial.
              </p>
            </div>
          </section>

          <section id="hplc-testing" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">HPLC Testing Explained (Purity)</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>HPLC</strong> (High-Performance Liquid Chromatography) measures the purity of a peptide sample. Here's how it works:
            </p>
            <ol className="list-decimal list-inside text-muted-foreground mb-4 space-y-2">
              <li>Sample is dissolved and passed through a column</li>
              <li>Different molecules travel at different speeds</li>
              <li>A detector measures each component as it exits</li>
              <li>Results show a "chromatogram" with peaks for each substance</li>
            </ol>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>What to look for:</strong>
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Main peak should be 98%+ of total area</li>
              <li>Smaller peaks indicate impurities or degradation products</li>
              <li>Peak retention time should match reference standard</li>
            </ul>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Limitation:</strong> HPLC tells you purity of the peptide fraction. It doesn't test for bacteria, endotoxins, or other biological contaminants.
              </p>
            </div>
          </section>

          <section id="mass-spec" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Mass Spectrometry Explained (Identity)</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>Mass Spectrometry (MS)</strong> confirms the identity of a peptide by measuring its molecular weight:
            </p>
            <ol className="list-decimal list-inside text-muted-foreground mb-4 space-y-2">
              <li>Sample molecules are ionized (given an electrical charge)</li>
              <li>Ions are separated by their mass-to-charge ratio</li>
              <li>Detector records the molecular weight of each component</li>
              <li>Results confirm if the peptide has the expected mass</li>
            </ol>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>What to look for:</strong>
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Observed mass should match theoretical mass (within 1-2 Da)</li>
              <li>BPC-157: Expected ~1419 Da</li>
              <li>TB-500 fragment (Ac-SDKP): Expected ~487 Da</li>
            </ul>
            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>Why this matters:</strong> Without MS, you could have a 98% pure sample of the wrong peptide. HPLC alone can't tell you what the peptide actually is.
              </p>
            </div>
          </section>

          <section id="legitimate-coa" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">What a Legitimate COA Looks Like</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              A trustworthy COA should include:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>Lab name and address:</strong> Verifiable third-party laboratory</li>
              <li><strong>Lab accreditation:</strong> ISO 17025 or equivalent</li>
              <li><strong>Unique batch/lot number:</strong> Should match your product label</li>
              <li><strong>Test date:</strong> Recent testing, not years old</li>
              <li><strong>HPLC chromatogram:</strong> Visual graph of purity analysis</li>
              <li><strong>MS spectrum:</strong> Mass spectrometry confirmation</li>
              <li><strong>Analyst signature or ID:</strong> Who performed the tests</li>
            </ul>
          </section>

          <section id="red-flags" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Red Flags to Watch For</h2>
            <div className="space-y-4 mb-4">
              {[
                { flag: "No COA provided", meaning: "Major red flag. Never purchase without one." },
                { flag: "No batch number or generic batch numbers", meaning: "Cannot verify it matches your product." },
                { flag: "Purity below 98%", meaning: "Manufacturing quality issues; higher impurity risk." },
                { flag: "No lab name or 'in-house testing' only", meaning: "Unverifiable; conflict of interest." },
                { flag: "Same COA for all batch numbers", meaning: "Suggests fabrication, not actual testing." },
                { flag: "Unable to contact or verify lab", meaning: "Lab may not exist or COA may be fake." },
                { flag: "No MS data, only HPLC", meaning: "Identity not confirmed; could be wrong peptide." },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-destructive/5 rounded-lg">
                  <span className="text-destructive font-bold">⚠️</span>
                  <div>
                    <p className="font-medium">{item.flag}</p>
                    <p className="text-sm text-muted-foreground">{item.meaning}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="questions-to-ask" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Questions to Ask Your Supplier</h2>
            <ol className="list-decimal list-inside text-muted-foreground mb-4 space-y-2">
              <li>"Can I see the COA for the specific batch I'm purchasing?"</li>
              <li>"Which third-party lab performs your testing?"</li>
              <li>"Is the lab ISO 17025 accredited?"</li>
              <li>"Do you test for endotoxins/sterility in addition to purity?"</li>
              <li>"Can I contact the lab to verify this COA?"</li>
            </ol>
            <p className="text-muted-foreground leading-relaxed">
              Legitimate suppliers should answer these questions readily. Evasion or refusal is a red flag.
            </p>
          </section>

          <section id="third-party-labs" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Third-Party Testing Labs</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              If you want to verify peptides independently, several labs offer testing services. Look for:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>ISO 17025 accreditation</li>
              <li>Experience with peptide analysis</li>
              <li>Both HPLC and MS capabilities</li>
              <li>Clear pricing and turnaround time</li>
            </ul>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Cost:</strong> Independent testing typically costs $50-200 per sample. For those using research peptides, this is a worthwhile investment in harm reduction.
              </p>
            </div>
          </section>

          <WhatWeDontKnow 
            topic="peptide verification"
            items={[
              "Complete picture of gray market peptide quality",
              "How many COAs in circulation are fraudulent",
              "Whether passed testing guarantees sterility",
              "Long-term stability of peptides from various sources",
              "Full contaminant profiles beyond purity"
            ]}
            variant="general"
          />

          <PrimarySources 
            topic="general"
            additionalSources={[
              {
                title: "ISO 17025: Testing Laboratory Standards",
                url: "https://www.iso.org/ISO-IEC-17025-testing-and-calibration-laboratories.html",
                description: "International standard for laboratory competence and quality"
              }
            ]}
          />

          <GuideChangelog entries={changelogEntries} />

          <section id="faq">
            <GuideFAQ items={faqItems} />
          </section>

          <BottomLineBox content="A legitimate COA includes HPLC (purity), MS (identity), batch numbers matching your product, and verifiable third-party lab details. Red flags include missing data, untraceable labs, or generic batch numbers. When in doubt, consider independent testing. A COA is your only verification tool in an unregulated market." />

          <RelatedGuides guides={relatedGuides} />

          <GuideCTA />

          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
