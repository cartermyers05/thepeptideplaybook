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
  { id: "legitimate-clinic", title: "What Makes a Clinic Legitimate", level: 2 },
  { id: "questions-ask", title: "Questions to Ask Before Signing Up", level: 2 },
  { id: "credentials-verify", title: "Credentials to Verify", level: 2 },
  { id: "red-flags", title: "Red Flags to Avoid", level: 2 },
  { id: "telemedicine-inperson", title: "Telemedicine vs In-Person", level: 2 },
  { id: "cost-expectations", title: "Cost Expectations", level: 2 },
  { id: "good-first-visit", title: "What a Good First Visit Looks Like", level: 2 },
  { id: "primary-sources", title: "Primary Sources", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const faqItems = [
  {
    question: "Do I need a prescription for peptides?",
    answer:
      "FDA-approved peptides (like semaglutide) require a prescription from a licensed physician. Non-approved peptides (like BPC-157) exist in a gray area where they're sold as 'research chemicals' without prescription. However, legitimate clinics only prescribe FDA-approved or legally compoundable peptides.",
  },
  {
    question: "How much should a peptide clinic cost?",
    answer:
      "Costs vary widely. Initial consultations range from $150-$500. Monthly medication costs depend on the peptide: GLP-1 medications may be $300-$800/month through clinics; other peptides vary. Be wary of extremely cheap options (quality concerns) or extremely expensive ones (may be taking advantage). Insurance rarely covers elective peptide therapy.",
  },
  {
    question: "Can I get peptides through telemedicine?",
    answer:
      "Yes, many legitimate peptide clinics offer telemedicine consultations. Quality telemedicine services still require proper medical evaluation, bloodwork, and follow-up. Some states have restrictions on prescribing via telemedicine. Ensure the prescribing physician is licensed in your state.",
  },
  {
    question: "What if a clinic offers peptides that are FDA banned?",
    answer:
      "This is a major red flag. Legitimate clinics only prescribe FDA-approved medications or peptides that can be legally compounded. If a clinic offers Category 2 peptides (like BPC-157) claiming they can prescribe them, they're operating outside legal bounds. Walk away.",
  },
];

const relatedGuides = [
  { title: "Peptide Quality Testing Guide", href: "/guides/peptide-quality-testing" },
  { title: "Are Peptides Legal?", href: "/guides/are-peptides-legal" },
  { title: "FDA Peptide Regulations 2026", href: "/guides/peptides-fda-legal-status-2026" },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Find a Legitimate Peptide Clinic [2026]",
  description: "Complete guide to evaluating peptide clinics. What credentials to verify, red flags to avoid, cost expectations, and what to expect from a quality consultation.",
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
    "@id": `${SITE_URL}/guides/find-peptide-clinic`,
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

export default function FindPeptideClinic() {
  return (
    <GuideLayout
      title="How to Find a Legitimate Peptide Clinic [2026]"
      description="Complete guide to evaluating peptide clinics. What credentials to verify, red flags to avoid, cost expectations, and what to expect from a quality consultation."
      slug="find-peptide-clinic"
      articleSchema={articleSchema}
      faqSchema={faqSchema}
    >
      <div className="flex gap-10">
        <GuideTableOfContents items={tocItems} />

        <article className="flex-1 max-w-3xl">
          <QuickAnswerBox
            answer="Legitimate peptide clinics should have licensed physicians, use FDA-registered compounding pharmacies (where legal), provide proper medical oversight, and not guarantee results. Red flags include clinics that don't require bloodwork, sell peptides directly without prescription, or make unrealistic claims. Telemedicine options exist but vary in quality."
            lastUpdated="February 2, 2026"
            readTime="9 minutes"
          />

          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            How to Find a Legitimate Peptide Clinic
          </h1>

          <section id="legitimate-clinic" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">What Makes a Clinic "Legitimate"</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              A legitimate peptide clinic operates within medical and legal frameworks, prioritizing patient safety over sales.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">Key Characteristics:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>Licensed physicians:</strong> MD or DO with active medical license</li>
              <li><strong>Proper medical evaluation:</strong> Not just selling products</li>
              <li><strong>Bloodwork requirements:</strong> Labs before and during treatment</li>
              <li><strong>Legal peptide sources:</strong> FDA-registered compounding pharmacies</li>
              <li><strong>Honest about limitations:</strong> No guaranteed results claims</li>
              <li><strong>Follow-up care:</strong> Ongoing monitoring and adjustments</li>
            </ul>

            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>Important distinction:</strong> Legitimate clinics prescribe FDA-approved medications or legally compoundable peptides. They do not sell "research" peptides or prohibited substances.
              </p>
            </div>
          </section>

          <section id="questions-ask" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Questions to Ask Before Signing Up</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Before committing to any peptide clinic, get answers to these questions:
            </p>
            
            <h3 className="text-xl font-semibold mb-3">About the Provider:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Who is the prescribing physician and what is their license number?</li>
              <li>Is the physician licensed in my state?</li>
              <li>What is the physician's experience with peptide therapy?</li>
              <li>Will I have direct access to the physician?</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">About the Process:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>What bloodwork is required before treatment?</li>
              <li>How often will I be monitored?</li>
              <li>What happens if I have side effects?</li>
              <li>What is the follow-up schedule?</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">About the Medications:</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Where are the peptides sourced from?</li>
              <li>Which compounding pharmacy do you use?</li>
              <li>Is the pharmacy FDA-registered?</li>
              <li>Can I see quality documentation?</li>
            </ul>
          </section>

          <section id="credentials-verify" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Credentials to Verify</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Don't take claims at face value. Verify credentials independently.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">Physician Verification:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Check state medical board for active license</li>
              <li>Look for disciplinary actions</li>
              <li>Verify board certifications</li>
              <li>Check NPI (National Provider Identifier) registry</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Pharmacy Verification:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>FDA 503A or 503B registration</li>
              <li>State pharmacy board licensing</li>
              <li>PCAB accreditation (gold standard, but not required)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Business Verification:</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Physical address (not just a PO Box)</li>
              <li>Business registration in stated location</li>
              <li>BBB rating and complaints</li>
              <li>Online reviews (with critical eye)</li>
            </ul>
          </section>

          <section id="red-flags" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Red Flags to Avoid</h2>
            
            <h3 className="text-xl font-semibold mb-3">Major Red Flags:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>No bloodwork required:</strong> Legitimate treatment requires baseline labs</li>
              <li><strong>Guaranteed results:</strong> No ethical provider promises specific outcomes</li>
              <li><strong>Selling banned peptides:</strong> BPC-157, TB-500 cannot be legally prescribed</li>
              <li><strong>Peptides sold directly from clinic:</strong> Should come from licensed pharmacy</li>
              <li><strong>High-pressure sales tactics:</strong> Legitimate medicine doesn't work this way</li>
              <li><strong>No physician involvement:</strong> Must have licensed MD/DO prescribing</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Warning Signs:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Physician never available to speak with</li>
              <li>No follow-up appointments offered</li>
              <li>Vague answers about medication sources</li>
              <li>Unwilling to share pharmacy information</li>
              <li>Cookie-cutter protocols for everyone</li>
            </ul>

            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>Trust your instincts:</strong> If something feels off, it probably is. Legitimate medical care involves proper evaluation, not product sales.
              </p>
            </div>
          </section>

          <section id="telemedicine-inperson" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Telemedicine vs In-Person</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Both telemedicine and in-person clinics can be legitimate, but each has pros and cons.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">Telemedicine Advantages:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Convenient access from anywhere</li>
              <li>Often lower costs</li>
              <li>Easier scheduling</li>
              <li>Access to specialized providers</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Telemedicine Limitations:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>No physical examination</li>
              <li>Must arrange own blood draws</li>
              <li>Some states restrict telemedicine prescribing</li>
              <li>May feel less personal</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">In-Person Advantages:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Complete physical evaluation</li>
              <li>On-site lab draws</li>
              <li>Hands-on injection training</li>
              <li>Direct relationship with provider</li>
            </ul>
          </section>

          <section id="cost-expectations" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Cost Expectations</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Peptide therapy costs vary significantly. Here's what to expect:
            </p>
            
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">Cost Category</th>
                    <th className="text-left p-3 font-semibold">Typical Range</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Initial Consultation</td>
                    <td className="p-3 text-muted-foreground">$150-$500</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Bloodwork</td>
                    <td className="p-3 text-muted-foreground">$100-$400</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">GLP-1 medications (monthly)</td>
                    <td className="p-3 text-muted-foreground">$300-$800</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Follow-up visits</td>
                    <td className="p-3 text-muted-foreground">$75-$200</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Membership programs (monthly)</td>
                    <td className="p-3 text-muted-foreground">$200-$600</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              <strong>Insurance:</strong> Most insurance doesn't cover elective peptide therapy. Some may cover GLP-1 medications for diabetes or weight loss with proper documentation.
            </p>
          </section>

          <section id="good-first-visit" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">What a Good First Visit Looks Like</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              A quality first consultation should include:
            </p>
            
            <h3 className="text-xl font-semibold mb-3">Before the Visit:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Comprehensive health questionnaire</li>
              <li>Request for previous lab work</li>
              <li>Clear information about costs</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">During the Visit:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Thorough review of medical history</li>
              <li>Discussion of goals and expectations</li>
              <li>Honest conversation about what peptides can/cannot do</li>
              <li>Explanation of risks and side effects</li>
              <li>Bloodwork ordered or reviewed</li>
              <li>Time for your questions</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">After the Visit:</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Clear treatment plan in writing</li>
              <li>Contact information for questions</li>
              <li>Follow-up appointment scheduled</li>
              <li>No pressure to start immediately</li>
            </ul>
          </section>

          <section id="primary-sources" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Primary Sources</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>
                <a href="https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  FDA: Compounding and the FDA
                </a>
              </li>
              <li>
                <a href="https://www.fsmb.org/state-medical-boards/contacts" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  FSMB: State Medical Board Contacts
                </a>
              </li>
              <li>
                <a href="https://www.achc.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  ACHC: Accreditation for Healthcare
                </a>
              </li>
            </ul>
          </section>

          <section id="faq">
            <GuideFAQ items={faqItems} />
          </section>

          <BottomLineBox content="Legitimate peptide clinics have licensed physicians, require proper medical evaluation and bloodwork, source medications from FDA-registered pharmacies, and provide ongoing follow-up care. Avoid clinics that sell banned peptides, guarantee results, or skip medical evaluation. Verify credentials independently and trust your instincts if something seems off." />

          <RelatedGuides guides={relatedGuides} />

          <GuideCTA />

          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
