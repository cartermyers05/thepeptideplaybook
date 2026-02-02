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
  { id: "wada-status", title: "WADA Prohibited Status", level: 2 },
  { id: "us-military", title: "US Military Policy", level: 2 },
  { id: "ncaa-college", title: "NCAA and College Sports", level: 2 },
  { id: "professional-sports", title: "Professional Sports", level: 2 },
  { id: "olympic-athletes", title: "Olympic Athletes", level: 2 },
  { id: "detection-testing", title: "Detection and Testing", level: 2 },
  { id: "consequences", title: "Consequences of Violation", level: 2 },
  { id: "primary-sources", title: "Primary Sources", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const faqItems = [
  {
    question: "How long does BPC-157 stay in your system?",
    answer:
      "Detection windows for BPC-157 are not publicly established. Advanced testing can potentially detect peptides for weeks after use. WADA and anti-doping labs continuously improve detection methods. Assuming any 'safe' window for avoiding detection is risky and unreliable.",
  },
  {
    question: "Can I get a TUE for BPC-157?",
    answer:
      "No. Therapeutic Use Exemptions (TUEs) are only granted for FDA-approved medications with legitimate therapeutic need. BPC-157 is not FDA-approved for any condition, so no TUE is possible. There is no legal pathway to use BPC-157 while competing in tested sports.",
  },
  {
    question: "Will BPC-157 show up on a drug test?",
    answer:
      "It depends on the test. Standard workplace drug tests don't detect peptides. Sports anti-doping tests (WADA, USADA) can detect peptides using advanced methods. Testing capabilities continue to improve, and samples can be retested years later with new technology.",
  },
  {
    question: "Is BPC-157 banned in all sports?",
    answer:
      "BPC-157 is banned by WADA, which covers the Olympics and most international sports. USADA follows WADA rules for US Olympic athletes. NCAA bans peptide hormones. NFL, NBA, MLB, and UFC prohibit growth hormone-related peptides. Some recreational sports may not test for it, but WADA-affiliated competitions universally ban it.",
  },
];

const relatedGuides = [
  { title: "BPC-157: Complete Research Guide", href: "/guides/bpc-157-complete-guide" },
  { title: "Are Peptides Legal?", href: "/guides/are-peptides-legal" },
  { title: "FDA Peptide Regulations 2026", href: "/guides/peptides-fda-legal-status-2026" },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Is BPC-157 Banned? WADA, Military & Sports Rules [2026]",
  description: "Complete guide to BPC-157 prohibition status. WADA, USADA, US Military, NCAA, NFL, NBA, MLB, and Olympic rules explained.",
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
    "@id": `${SITE_URL}/guides/bpc-157-wada-banned`,
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

export default function BPC157WADABanned() {
  return (
    <GuideLayout
      title="Is BPC-157 Banned? WADA, Military & Sports Rules [2026]"
      description="Complete guide to BPC-157 prohibition status. WADA, USADA, US Military, NCAA, NFL, NBA, MLB, and Olympic rules explained."
      slug="bpc-157-wada-banned"
      articleSchema={articleSchema}
      faqSchema={faqSchema}
    >
      <div className="flex gap-10">
        <GuideTableOfContents items={tocItems} />

        <article className="flex-1 max-w-3xl">
          <QuickAnswerBox
            answer="Yes, BPC-157 is banned by WADA under category S0 (Non-Approved Substances). It's also prohibited by the US Military, NCAA, and most professional sports organizations. Athletes can be suspended for using BPC-157 even if obtained legally for personal use. There is no therapeutic use exemption (TUE) available for BPC-157."
            lastUpdated="February 2, 2026"
            readTime="8 minutes"
          />

          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            Is BPC-157 Banned? WADA, Military & Sports Rules
          </h1>

          <section id="wada-status" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">WADA Prohibited Status</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The World Anti-Doping Agency (WADA) prohibits BPC-157 under category S0: Non-Approved Substances.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">What S0 Means:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Covers substances without current marketing authorization</li>
              <li>Includes drugs in pre-clinical or clinical development</li>
              <li>Substances not approved for human therapeutic use</li>
              <li>Banned at all times (in and out of competition)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Why BPC-157 Falls Under S0:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Not approved by any regulatory agency for human use</li>
              <li>Has not completed clinical trials</li>
              <li>Considered a pharmacological substance with no approved therapeutic use</li>
            </ul>

            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>Key point:</strong> Even if you have a "valid" reason to use BPC-157, WADA prohibition means zero tolerance for athletes subject to testing.
              </p>
            </div>
          </section>

          <section id="us-military" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">US Military Policy</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The US Military prohibits service members from using unapproved substances like BPC-157.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">Department of Defense Position:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Unapproved substances are prohibited under military regulations</li>
              <li>Research chemicals are not approved for use by service members</li>
              <li>Use can result in administrative or disciplinary action</li>
              <li>May affect security clearances and career progression</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Specific Concerns:</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Military drug testing may not routinely detect peptides</li>
              <li>However, targeted testing or investigations can reveal use</li>
              <li>Purchase records and communications can be evidence</li>
            </ul>
          </section>

          <section id="ncaa-college" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">NCAA and College Sports</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The NCAA prohibits peptide hormones and bans substances covered by WADA.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">NCAA Banned Substance List:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Peptide hormones and growth factors are prohibited</li>
              <li>Includes substances that are not FDA-approved</li>
              <li>BPC-157 falls under this category</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Consequences for College Athletes:</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Loss of eligibility for one full year (first offense)</li>
              <li>Permanent loss of eligibility possible for repeat offenses</li>
              <li>Vacated wins and titles if positive test</li>
              <li>Scholarship implications</li>
            </ul>
          </section>

          <section id="professional-sports" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Professional Sports (NFL, NBA, MLB, UFC)</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Major professional sports leagues have their own policies on performance-enhancing substances.
            </p>
            
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">League</th>
                    <th className="text-left p-3 font-semibold">BPC-157 Status</th>
                    <th className="text-left p-3 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">NFL</td>
                    <td className="p-3 text-muted-foreground">Prohibited</td>
                    <td className="p-3 text-muted-foreground">Falls under PES policy</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">NBA</td>
                    <td className="p-3 text-muted-foreground">Prohibited</td>
                    <td className="p-3 text-muted-foreground">Covered by PED program</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">MLB</td>
                    <td className="p-3 text-muted-foreground">Prohibited</td>
                    <td className="p-3 text-muted-foreground">Joint Drug Agreement</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">UFC/MMA</td>
                    <td className="p-3 text-muted-foreground">Prohibited</td>
                    <td className="p-3 text-muted-foreground">USADA testing applies</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">NHL</td>
                    <td className="p-3 text-muted-foreground">Prohibited</td>
                    <td className="p-3 text-muted-foreground">PES Program</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Suspensions range from 4 games to multi-year bans depending on the league and circumstances.
            </p>
          </section>

          <section id="olympic-athletes" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Olympic Athletes</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Olympic athletes are subject to WADA rules through the United States Anti-Doping Agency (USADA) or their national equivalent.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">USADA Enforcement:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Follows WADA Prohibited List</li>
              <li>Year-round testing possible (in and out of competition)</li>
              <li>Whereabouts requirements for elite athletes</li>
              <li>Advanced testing methods for peptide detection</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Consequences:</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Minimum 2-year ban for first offense (can be 4 years)</li>
              <li>Loss of medals and records</li>
              <li>Lifetime ban possible for repeat offenders</li>
              <li>Public announcement of violations</li>
            </ul>
          </section>

          <section id="detection-testing" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Detection and Testing</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Anti-doping laboratories use sophisticated methods to detect peptides.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">Testing Methods:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>Mass spectrometry:</strong> Can detect peptide fragments</li>
              <li><strong>Immunoassays:</strong> Screening for peptide hormones</li>
              <li><strong>Biological passport:</strong> Tracks changes over time</li>
              <li><strong>Sample storage:</strong> Samples kept for 10+ years for retesting</li>
            </ul>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Important:</strong> Testing methods continue to improve. Athletes have been sanctioned years after competition when retesting with new technology detected previously undetectable substances.
              </p>
            </div>
          </section>

          <section id="consequences" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Consequences of Violation</h2>
            
            <h3 className="text-xl font-semibold mb-3">Immediate Consequences:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Provisional suspension pending investigation</li>
              <li>Removal from competition or team</li>
              <li>Public announcement</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Long-term Consequences:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Multi-year or lifetime competition bans</li>
              <li>Stripping of titles, medals, and records</li>
              <li>Loss of sponsorships and endorsements</li>
              <li>Reputation damage</li>
              <li>Financial penalties in some leagues</li>
            </ul>

            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>Risk assessment:</strong> No unproven peptide is worth a career-ending suspension. Proven rehabilitation methods exist that don't carry doping risks.
              </p>
            </div>
          </section>

          <section id="primary-sources" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Primary Sources</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>
                <a href="https://www.wada-ama.org/en/prohibited-list" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  WADA: Prohibited List
                </a>
              </li>
              <li>
                <a href="https://www.usada.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  USADA: U.S. Anti-Doping Agency
                </a>
              </li>
              <li>
                <a href="https://www.ncaa.org/sports/2015/6/10/drug-testing.aspx" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  NCAA: Drug Testing Program
                </a>
              </li>
              <li>
                <a href="https://www.fda.gov/drugs/human-drug-compounding/bulk-drug-substances-used-compounding" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  FDA: Bulk Drug Substances in Compounding
                </a>
              </li>
            </ul>
          </section>

          <section id="faq">
            <GuideFAQ items={faqItems} />
          </section>

          <BottomLineBox content="BPC-157 is definitively banned by WADA under category S0, making it prohibited for all Olympic and international athletes. The US Military, NCAA, and all major professional sports leagues also prohibit it. No TUE is available. Athletes risk multi-year suspensions, loss of titles, and career damage. The unproven benefits don't justify these career-ending consequences." />

          <RelatedGuides guides={relatedGuides} />

          <GuideCTA />

          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
