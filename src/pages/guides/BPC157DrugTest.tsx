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
  { id: "what-tests-look-for", title: "What Drug Tests Look For", level: 2 },
  { id: "wada-testing", title: "WADA/USADA Testing (Athletes)", level: 2 },
  { id: "military-testing", title: "Military Drug Testing", level: 2 },
  { id: "employment-testing", title: "Employment Drug Tests", level: 2 },
  { id: "detection-window", title: "Detection Window", level: 2 },
  { id: "what-we-dont-know", title: "What We Don't Know", level: 2 },
  { id: "primary-sources", title: "Primary Sources", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const changelogEntries: ChangelogEntry[] = [
  { date: "Feb 2, 2026", change: "Initial publication" },
];

const faqItems = [
  {
    question: "Will BPC-157 fail a pre-employment drug test?",
    answer:
      "Standard pre-employment drug tests (5-panel, 10-panel) test for common recreational drugs like marijuana, cocaine, opiates, amphetamines, and PCP. They do not test for peptides. BPC-157 will not show up on these panels.",
  },
  {
    question: "How long does BPC-157 stay in your system?",
    answer:
      "Detection windows for BPC-157 are not publicly established. Peptides are generally cleared quickly (hours to days), but detection methods for anti-doping can identify metabolites that persist longer. For standard drug tests, this is irrelevant as they don't test for peptides.",
  },
  {
    question: "Can the military test for peptides?",
    answer:
      "Standard military drug testing does not include peptides. However, the military has the capability to conduct specialized testing if there's specific suspicion of performance-enhancing substance use. This would be a targeted investigation, not routine screening.",
  },
];

const relatedGuides = [
  { title: "BPC-157: Complete Research Guide", href: "/guides/bpc-157-complete-guide" },
  { title: "FDA Peptide Regulations 2026", href: "/guides/peptides-fda-legal-status-2026" },
  { title: "Are Peptides Legal?", href: "/guides/are-peptides-legal" },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Does BPC-157 Show Up on Drug Tests? Detection & Testing [2026]",
  description: "Will BPC-157 fail a drug test? WADA bans it, but standard employment and military panels don't test for peptides. Complete detection guide.",
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
    "@id": `${SITE_URL}/guides/bpc-157-drug-test`,
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

export default function BPC157DrugTest() {
  return (
    <GuideLayout
      title="Does BPC-157 Show Up on Drug Tests? Detection & Testing [2026]"
      description="Will BPC-157 fail a drug test? WADA bans it, but standard employment and military panels don't test for peptides. Complete detection guide."
      slug="bpc-157-drug-test"
      articleSchema={articleSchema}
      faqSchema={faqSchema}
    >
      <div className="flex gap-10">
        <GuideTableOfContents items={tocItems} />

        <article className="flex-1 max-w-3xl">
          <QuickAnswerBox
            answer="BPC-157 is banned by WADA and can be detected in anti-doping tests. Detection methods exist but are not used in standard employment or military drug panels (which test for recreational drugs, not peptides). WADA/USADA athletic testing and some military performance-enhancement screenings can detect peptides. Detection windows are not well-established publicly."
            lastUpdated="February 2, 2026"
            readTime="7 minutes"
          />

          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            Does BPC-157 Show Up on Drug Tests? Complete Testing Guide
          </h1>

          <section id="what-tests-look-for" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">What Drug Tests Look For</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Not all drug tests are the same. Understanding what each type screens for is crucial:
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">Test Type</th>
                    <th className="text-left p-3 font-semibold">What It Tests</th>
                    <th className="text-left p-3 font-semibold">Tests for Peptides?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">5-Panel (Standard Employment)</td>
                    <td className="p-3 text-muted-foreground">THC, cocaine, opiates, PCP, amphetamines</td>
                    <td className="p-3 text-muted-foreground">No</td>
                  </tr>
                  <tr className="border-t border-border bg-muted/30">
                    <td className="p-3 font-medium">10-Panel (Extended Employment)</td>
                    <td className="p-3 text-muted-foreground">Above + benzos, barbiturates, methadone, etc.</td>
                    <td className="p-3 text-muted-foreground">No</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Military Standard</td>
                    <td className="p-3 text-muted-foreground">Similar to 10-panel + steroids in some cases</td>
                    <td className="p-3 text-muted-foreground">Not routinely</td>
                  </tr>
                  <tr className="border-t border-border bg-muted/30">
                    <td className="p-3 font-medium">WADA/USADA Anti-Doping</td>
                    <td className="p-3 text-muted-foreground">Comprehensive PED screening</td>
                    <td className="p-3 text-primary font-medium">Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="wada-testing" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">WADA/USADA Testing (Athletes)</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The World Anti-Doping Agency (WADA) and US Anti-Doping Agency (USADA) prohibit BPC-157 under category S0 (Non-Approved Substances).
            </p>
            <div className="p-4 bg-destructive/10 border-l-4 border-destructive rounded-r-lg mb-4">
              <p className="text-sm font-medium">
                <strong>For athletes:</strong> BPC-157 is banned in all sports governed by WADA. Detection methods exist and are actively used. A positive test results in sanctions.
              </p>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              WADA testing uses mass spectrometry and other advanced techniques capable of detecting peptides and their metabolites. These tests are specifically designed to catch performance-enhancing substances.
            </p>
          </section>

          <section id="military-testing" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Military Drug Testing</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Standard military urinalysis does not screen for peptides. The DOD Drug Demand Reduction Program focuses on illicit drugs and certain controlled substances.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              However, the military has the capability for expanded testing:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>Command-directed testing:</strong> Can include specialized panels if there's suspicion</li>
              <li><strong>Special operations:</strong> Some units may have enhanced screening</li>
              <li><strong>Investigation-based:</strong> Specific testing if performance-enhancement use is suspected</li>
            </ul>
            <div className="p-4 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>Important:</strong> While routine testing doesn't include peptides, using research chemicals could still violate UCMJ articles on health/fitness and unauthorized substance use.
              </p>
            </div>
          </section>

          <section id="employment-testing" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Employment Drug Tests</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Standard pre-employment and workplace drug tests do NOT screen for peptides. These panels focus on recreational drugs that impair job performance:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Marijuana/THC</li>
              <li>Cocaine</li>
              <li>Opiates (heroin, morphine, codeine)</li>
              <li>Amphetamines (meth, MDMA)</li>
              <li>Phencyclidine (PCP)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              BPC-157 will not appear on any standard employment drug screen.
            </p>
          </section>

          <section id="detection-window" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Detection Window (What We Know)</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Specific detection windows for BPC-157 are not publicly disclosed by anti-doping agencies (to prevent athletes from timing their use).
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              General peptide pharmacokinetics suggest:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>Parent compound:</strong> Likely cleared within hours to days</li>
              <li><strong>Metabolites:</strong> May persist longer and are what tests often detect</li>
              <li><strong>Testing sensitivity:</strong> Continually improving, allowing detection of smaller amounts</li>
            </ul>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">For athletes:</strong> Assume detection is possible regardless of timing. Anti-doping science advances constantly.
              </p>
            </div>
          </section>

          <WhatWeDontKnow 
            topic="BPC-157 detection"
            items={[
              "Exact detection windows for urine and blood testing",
              "How long metabolites persist in different individuals",
              "Whether testing methods will become more widespread",
              "Specific testing protocols used by different organizations",
              "How factors like dosage and frequency affect detection"
            ]}
          />

          <PrimarySources 
            topic="regulatory"
            additionalSources={[
              {
                title: "WADA 2024 Prohibited List",
                url: "https://www.wada-ama.org/en/prohibited-list",
                description: "Official list of banned substances in sport, including S0 category for non-approved substances"
              },
              {
                title: "USADA Athlete Guide",
                url: "https://www.usada.org/",
                description: "US Anti-Doping Agency resources for athletes"
              }
            ]}
          />

          <GuideChangelog entries={changelogEntries} />

          <section id="faq">
            <GuideFAQ items={faqItems} />
          </section>

          <BottomLineBox content="BPC-157 will NOT show up on standard employment or military drug tests. These panels test for recreational drugs, not peptides. However, WADA/USADA anti-doping tests CAN detect BPC-157. Athletes in tested sports should assume detection is possible. For non-athletes, peptides are not part of routine screening." />

          <RelatedGuides guides={relatedGuides} />

          <GuideCTA />

          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
