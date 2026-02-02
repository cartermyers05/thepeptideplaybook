import { GuideLayout } from "@/components/guides/GuideLayout";
import { QuickAnswerBox } from "@/components/guides/QuickAnswerBox";
import { BottomLineBox } from "@/components/guides/BottomLineBox";
import { GuideFAQ } from "@/components/guides/GuideFAQ";
import { GuideCTA } from "@/components/guides/GuideCTA";
import { GuideDisclaimer } from "@/components/guides/GuideDisclaimer";
import { RelatedGuides } from "@/components/guides/RelatedGuides";
import { GuideTableOfContents } from "@/components/guides/GuideTableOfContents";
import { SITE_URL } from "@/lib/seo";

const tocItems = [
  { id: "why-quality-matters", title: "Why Peptide Quality Matters", level: 2 },
  { id: "testing-done", title: "What Testing Should Be Done", level: 2 },
  { id: "read-coa", title: "How to Read a Certificate of Analysis", level: 2 },
  { id: "red-flags", title: "Red Flags When Buying Peptides", level: 2 },
  { id: "questions-ask", title: "Questions to Ask Suppliers", level: 2 },
  { id: "storage-handling", title: "Storage and Handling", level: 2 },
  { id: "compounding-pharmacy", title: "The Compounding Pharmacy Option", level: 2 },
  { id: "primary-sources", title: "Primary Sources", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const faqItems = [
  {
    question: "How do I know if my peptides are real?",
    answer:
      "Without third-party testing, you can't know with certainty. Look for suppliers who provide Certificates of Analysis (COA) with HPLC and mass spectrometry results. Verify the COA matches your batch number. Consider independent testing through services like Janoshik or similar labs. Subjective 'effects' are not reliable indicators of authenticity.",
  },
  {
    question: "What should a COA include?",
    answer:
      "A legitimate COA should include: product name and batch/lot number, purity percentage (ideally 98%+), HPLC chromatogram, mass spectrometry confirmation, endotoxin testing for injectables, sterility testing for injectables, testing date and lab identification, and matching information to your product.",
  },
  {
    question: "Are cheap peptides safe?",
    answer:
      "Price alone doesn't determine safety, but significantly below-market prices are a red flag. Low prices may indicate: degraded product, incorrect peptide, contamination, lower purity than claimed, or outright fraud. Quality testing and proper manufacturing cost money. Extremely cheap peptides likely cut corners somewhere.",
  },
  {
    question: "Should I test my peptides myself?",
    answer:
      "Independent testing is the only way to verify what you're actually getting. Services like Janoshik offer peptide testing for reasonable costs. This is especially important for injectable peptides where contamination poses direct risks. The cost of testing is minimal compared to health risks from contaminated products.",
  },
];

const relatedGuides = [
  { title: "Find a Legitimate Peptide Clinic", href: "/guides/find-peptide-clinic" },
  { title: "Are Peptides Safe?", href: "/guides/are-peptides-safe" },
  { title: "Peptide Injection Sites", href: "/guides/peptide-injection-sites" },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Verify Peptide Quality: Red Flags & Testing Guide [2026]",
  description: "Complete guide to peptide quality verification. How to read COAs, red flags when buying, testing methods, and storage requirements.",
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
    "@id": `${SITE_URL}/guides/peptide-quality-testing`,
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

export default function PeptideQualityTesting() {
  return (
    <GuideLayout
      title="How to Verify Peptide Quality: Red Flags & Testing Guide [2026]"
      description="Complete guide to peptide quality verification. How to read COAs, red flags when buying, testing methods, and storage requirements."
      slug="peptide-quality-testing"
      articleSchema={articleSchema}
      faqSchema={faqSchema}
    >
      <div className="flex gap-10">
        <GuideTableOfContents items={tocItems} />

        <article className="flex-1 max-w-3xl">
          <QuickAnswerBox
            answer="The unregulated peptide market has significant quality risks including contamination, incorrect dosing, and degraded products. Legitimate suppliers provide third-party testing (HPLC, mass spectrometry), certificates of analysis (COA), and proper storage/shipping. Red flags include no COA, prices far below market, and no verifiable lab testing."
            lastUpdated="February 2, 2026"
            readTime="10 minutes"
          />

          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            How to Verify Peptide Quality: Red Flags & Testing Guide
          </h1>

          <section id="why-quality-matters" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Why Peptide Quality Matters</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The peptide market operates largely outside regulatory oversight. This creates significant quality risks that directly affect safety and effectiveness.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">Documented Quality Issues:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>Wrong peptide:</strong> Products containing different peptides than labeled</li>
              <li><strong>Under-dosing:</strong> Vials with less active ingredient than claimed</li>
              <li><strong>Contamination:</strong> Bacteria, endotoxins, heavy metals, or synthesis byproducts</li>
              <li><strong>Degradation:</strong> Peptides broken down from improper storage or age</li>
              <li><strong>No peptide at all:</strong> Complete fraud with inert substances</li>
            </ul>

            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>The real risk:</strong> Side effects attributed to "peptides" may actually be from contaminants. Lack of effects may be from degraded or absent peptides, not peptide ineffectiveness.
              </p>
            </div>
          </section>

          <section id="testing-done" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">What Testing Should Be Done</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Proper peptide testing involves multiple analytical methods:
            </p>
            
            <h3 className="text-xl font-semibold mb-3">Essential Tests:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>HPLC (High-Performance Liquid Chromatography):</strong> Measures purity percentage</li>
              <li><strong>Mass Spectrometry:</strong> Confirms correct molecular weight/identity</li>
              <li><strong>Endotoxin Testing (LAL):</strong> Critical for injectables</li>
              <li><strong>Sterility Testing:</strong> For injectable products</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Additional Tests (Better Suppliers):</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Amino acid analysis</li>
              <li>Heavy metal testing</li>
              <li>Residual solvent analysis</li>
              <li>Moisture content</li>
            </ul>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Minimum standard:</strong> HPLC + Mass Spec should be considered the absolute minimum for any peptide intended for research.
              </p>
            </div>
          </section>

          <section id="read-coa" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">How to Read a Certificate of Analysis</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              A Certificate of Analysis (COA) documents testing results. Here's what to look for:
            </p>
            
            <h3 className="text-xl font-semibold mb-3">Essential COA Elements:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>Product identification:</strong> Peptide name and sequence</li>
              <li><strong>Batch/Lot number:</strong> Should match your product</li>
              <li><strong>Purity:</strong> HPLC result (98%+ is standard for research grade)</li>
              <li><strong>Molecular weight:</strong> Mass spec confirmation</li>
              <li><strong>Testing date:</strong> Should be recent and before expiration</li>
              <li><strong>Lab identification:</strong> Who performed the testing</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Red Flags in COAs:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Generic COA without specific batch numbers</li>
              <li>No actual test data (just "Pass" without numbers)</li>
              <li>Purity below 95% for peptides</li>
              <li>No HPLC chromatogram included</li>
              <li>Testing date older than product manufacturing date</li>
              <li>Unverifiable testing lab</li>
            </ul>
          </section>

          <section id="red-flags" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Red Flags When Buying Peptides</h2>
            
            <h3 className="text-xl font-semibold mb-3">Major Warning Signs:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>No COA available:</strong> Never buy without documentation</li>
              <li><strong>Prices far below market:</strong> Quality testing costs money</li>
              <li><strong>Claims of human use:</strong> Legitimate suppliers label "research only"</li>
              <li><strong>Therapeutic claims:</strong> Illegal and indicates unscrupulous seller</li>
              <li><strong>No contact information:</strong> Legitimate businesses are reachable</li>
              <li><strong>Payment only in crypto:</strong> May indicate fly-by-night operation</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Subtle Warning Signs:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Same COA used for multiple batch numbers</li>
              <li>Vague sourcing information</li>
              <li>Poor packaging or labeling</li>
              <li>No cold shipping for peptides requiring refrigeration</li>
              <li>Website with minimal information</li>
            </ul>
          </section>

          <section id="questions-ask" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Questions to Ask Suppliers</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Before purchasing, ask suppliers these questions:
            </p>
            
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Can you provide a COA specific to this batch?</li>
              <li>What testing methods do you use?</li>
              <li>Who performs your third-party testing?</li>
              <li>Do you test for endotoxins and sterility?</li>
              <li>How are products stored before shipping?</li>
              <li>What is your cold chain shipping protocol?</li>
              <li>What is your return/replacement policy?</li>
            </ul>

            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>Good sign:</strong> Suppliers who readily answer these questions with specific information. <strong>Bad sign:</strong> Evasive answers or "trust us" responses.
              </p>
            </div>
          </section>

          <section id="storage-handling" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Storage and Handling</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Proper storage is critical for maintaining peptide quality.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">Lyophilized (Powder) Peptides:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Store at -20°C (freezer) for long-term</li>
              <li>Refrigerator (2-8°C) acceptable for shorter periods</li>
              <li>Keep away from light and moisture</li>
              <li>Stable for months to years when properly stored</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Reconstituted (Liquid) Peptides:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Refrigerate immediately after reconstitution</li>
              <li>Use within 2-4 weeks typically</li>
              <li>Never freeze reconstituted peptides</li>
              <li>Use sterile technique when withdrawing doses</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Shipping Requirements:</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Cold packs for temperature-sensitive peptides</li>
              <li>Insulated packaging</li>
              <li>Fast shipping to minimize transit time</li>
            </ul>
          </section>

          <section id="compounding-pharmacy" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">The Compounding Pharmacy Option</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Compounding pharmacies operate under regulatory oversight, offering better quality assurance than gray market sources.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">Advantages:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>FDA-registered facilities</li>
              <li>Sterility and quality testing required</li>
              <li>Pharmacist oversight</li>
              <li>Prescription required (doctor involvement)</li>
              <li>Traceability and accountability</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Limitations:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Many peptides (BPC-157, TB-500) are Category 2 and cannot be compounded</li>
              <li>Only certain peptides are legally available</li>
              <li>Requires a prescription</li>
              <li>Higher cost than gray market</li>
            </ul>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Note:</strong> If a peptide can be legally obtained through a compounding pharmacy with a prescription, this is generally the safer route compared to "research" suppliers.
              </p>
            </div>
          </section>

          <section id="primary-sources" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Primary Sources</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>
                <a href="https://www.fda.gov/drugs/human-drug-compounding/bulk-drug-substances-used-compounding" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  FDA: Bulk Drug Substances in Compounding
                </a>
              </li>
              <li>
                <a href="https://www.fda.gov/drugs/guidance-compliance-regulatory-information/pharmacy-compounding" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  FDA: Pharmacy Compounding Guidance
                </a>
              </li>
              <li>
                <a href="https://www.usp.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  USP: Pharmaceutical Standards
                </a>
              </li>
            </ul>
          </section>

          <section id="faq">
            <GuideFAQ items={faqItems} />
          </section>

          <BottomLineBox content="Peptide quality in the unregulated market is unpredictable. Verify quality through COAs with HPLC and mass spec testing. Red flags include no documentation, below-market prices, and therapeutic claims. Independent testing is the only way to truly verify what you're getting. When possible, FDA-registered compounding pharmacies offer better quality assurance than gray market sources." />

          <RelatedGuides guides={relatedGuides} />

          <GuideCTA />

          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
