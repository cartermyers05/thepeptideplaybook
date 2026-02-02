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
  { id: "federal-law", title: "Federal Law Overview", level: 2 },
  { id: "fda-approved-vs-research", title: "FDA-Approved vs Research Peptides", level: 2 },
  { id: "research-use-loophole", title: "The 'Research Use Only' Loophole", level: 2 },
  { id: "state-variations", title: "State-by-State Variations", level: 2 },
  { id: "importing", title: "Importing Peptides", level: 2 },
  { id: "athlete-rules", title: "Athlete-Specific Rules", level: 2 },
  { id: "trouble", title: "What Could Get You in Trouble", level: 2 },
  { id: "primary-sources", title: "Primary Sources", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const faqItems = [
  {
    question: "Can I buy peptides legally online?",
    answer:
      "It depends on the peptide. FDA-approved peptides (like semaglutide) require a prescription. 'Research use only' peptides exist in a legal gray area: possessing them isn't necessarily illegal, but selling them for human consumption is. Many websites sell peptides labeled for research, which individuals purchase at their own risk.",
  },
  {
    question: "Is it illegal to inject research peptides?",
    answer:
      "Personal use of research peptides is generally not prosecuted. The legal risk falls primarily on sellers making therapeutic claims or selling for human consumption. However, using unapproved substances carries health risks, and athletes can face career consequences for positive tests.",
  },
  {
    question: "What happens if customs seizes my peptides?",
    answer:
      "Customs may seize peptides imported without proper documentation. You'll typically receive a notice of seizure. Consequences for small personal quantities are usually just loss of the product. Larger quantities or repeat offenses could attract more scrutiny. Importing prescription-only peptides without a valid prescription is illegal.",
  },
  {
    question: "Are peptides controlled substances?",
    answer:
      "Most peptides are not DEA-controlled substances like opioids or stimulants. However, they're still regulated by the FDA. Selling unapproved peptides for human use is illegal. Some growth hormone-related peptides fall under specific regulations. Check the current DEA and FDA schedules for specific substances.",
  },
];

const relatedGuides = [
  { title: "FDA Peptide Regulations 2026", href: "/guides/peptides-fda-legal-status-2026" },
  { title: "BPC-157 WADA Banned Status", href: "/guides/bpc-157-wada-banned" },
  { title: "Are Peptides Safe?", href: "/guides/are-peptides-safe" },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Are Peptides Legal? State-by-State + Federal Rules [2026]",
  description: "Complete guide to peptide legality in 2026. Federal law, FDA status, state variations, importing rules, and athlete restrictions explained.",
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
    "@id": `${SITE_URL}/guides/are-peptides-legal`,
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

export default function ArePeptidesLegal() {
  return (
    <GuideLayout
      title="Are Peptides Legal? State-by-State + Federal Rules [2026]"
      description="Complete guide to peptide legality in 2026. Federal law, FDA status, state variations, importing rules, and athlete restrictions explained."
      slug="are-peptides-legal"
      articleSchema={articleSchema}
      faqSchema={faqSchema}
    >
      <div className="flex gap-10">
        <GuideTableOfContents items={tocItems} />

        <article className="flex-1 max-w-3xl">
          <QuickAnswerBox
            answer="Peptide legality is complicated. Possessing research peptides is generally not illegal for individuals. Selling peptides for human consumption without FDA approval is illegal. FDA-approved peptides (like semaglutide) require prescriptions. 'Research use only' peptides exist in a gray area. Some states have additional restrictions. WADA bans most peptides for athletes."
            lastUpdated="February 2, 2026"
            readTime="11 minutes"
          />

          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            Are Peptides Legal? State-by-State + Federal Rules
          </h1>

          <section id="federal-law" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Federal Law Overview</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              At the federal level, peptide legality depends on two main factors: FDA approval status and how the peptide is being used or sold.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">Key Federal Rules:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Selling peptides for human consumption requires FDA approval</li>
              <li>Making therapeutic claims about unapproved peptides is illegal</li>
              <li>Possessing peptides for personal use is generally not prosecuted</li>
              <li>Most peptides are NOT DEA-controlled substances</li>
              <li>Compounding pharmacies have specific restrictions on which peptides they can prepare</li>
            </ul>

            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>Important distinction:</strong> The law primarily targets sellers and manufacturers, not individual users. However, using unapproved substances still carries health and career risks.
              </p>
            </div>
          </section>

          <section id="fda-approved-vs-research" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">FDA-Approved vs Research Peptides</h2>
            
            <h3 className="text-xl font-semibold mb-3">FDA-Approved Peptides (Prescription Required):</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>Semaglutide</strong> (Ozempic, Wegovy): Diabetes and weight loss</li>
              <li><strong>Tirzepatide</strong> (Mounjaro, Zepbound): Diabetes and weight loss</li>
              <li><strong>Liraglutide</strong> (Victoza, Saxenda): Diabetes and weight loss</li>
              <li><strong>Insulin</strong> (various): Diabetes</li>
              <li><strong>Tesamorelin</strong> (Egrifta): HIV lipodystrophy</li>
            </ul>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              These can be legally prescribed by licensed physicians and filled at pharmacies.
            </p>

            <h3 className="text-xl font-semibold mb-3">"Research Use Only" Peptides (Gray Area):</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>BPC-157:</strong> Not FDA-approved, Category 2 (cannot be compounded)</li>
              <li><strong>TB-500:</strong> Not FDA-approved, Category 2</li>
              <li><strong>Ipamorelin, CJC-1295:</strong> Not FDA-approved</li>
              <li><strong>GHK-Cu:</strong> Not FDA-approved</li>
            </ul>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">The gray area:</strong> These peptides are sold as "research chemicals" not intended for human use. People buy them anyway, which isn't typically prosecuted individually, but the products lack quality oversight.
              </p>
            </div>
          </section>

          <section id="research-use-loophole" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">The "Research Use Only" Loophole</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Many online vendors sell peptides labeled "for research use only" or "not for human consumption." This labeling allows them to operate in a legal gray zone.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">How It Works:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Vendors sell peptides as research chemicals</li>
              <li>Packaging disclaims human use</li>
              <li>No therapeutic claims are made on the website</li>
              <li>Buyer assumes all responsibility</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">The Reality:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Everyone knows these are being used by humans</li>
              <li>The FDA considers this a violation when therapeutic intent is clear</li>
              <li>Enforcement has been sporadic but increasing</li>
              <li>Product quality varies wildly with no oversight</li>
            </ul>
          </section>

          <section id="state-variations" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">State-by-State Variations</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              While federal law sets the baseline, some states have additional restrictions.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">States with Notable Restrictions:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>California:</strong> Stricter enforcement on "research chemical" sellers</li>
              <li><strong>New York:</strong> Additional regulations on compounding pharmacies</li>
              <li><strong>Florida:</strong> Active enforcement against peptide clinics making false claims</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Medical Practice Laws:</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Each state regulates medical practice differently. Some states have taken action against clinics prescribing peptides off-label or from compounding pharmacies when prohibited.
            </p>

            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>Note:</strong> This is not exhaustive legal advice. State laws change, and specific situations require consultation with a licensed attorney in your jurisdiction.
              </p>
            </div>
          </section>

          <section id="importing" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Importing Peptides</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Importing peptides from overseas carries additional legal considerations.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">Customs and FDA Import Rules:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>FDA can refuse entry to unapproved drugs/biologics</li>
              <li>Small personal quantities may be allowed under "personal importation" policy</li>
              <li>This is discretionary, not guaranteed</li>
              <li>Large quantities will likely be seized</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">What Typically Happens:</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Small packages often pass through without inspection</li>
              <li>Seized packages result in destruction of product</li>
              <li>Repeat seizures can attract more scrutiny</li>
              <li>No prosecution for typical personal amounts</li>
            </ul>
          </section>

          <section id="athlete-rules" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Athlete-Specific Rules</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Athletes face additional restrictions through sports organizations, regardless of general legality.
            </p>
            
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">Organization</th>
                    <th className="text-left p-3 font-semibold">Peptide Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">WADA (Olympics, International)</td>
                    <td className="p-3 text-muted-foreground">Most peptides banned under S0, S2</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">USADA (US Olympic)</td>
                    <td className="p-3 text-muted-foreground">Follows WADA prohibited list</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">NCAA</td>
                    <td className="p-3 text-muted-foreground">Peptide hormones banned</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">NFL, NBA, MLB, UFC</td>
                    <td className="p-3 text-muted-foreground">Growth hormone peptides banned</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">US Military</td>
                    <td className="p-3 text-muted-foreground">Most peptides prohibited</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Consequences include suspensions, loss of eligibility, and career damage. No therapeutic use exemption (TUE) is available for most peptides.
            </p>
          </section>

          <section id="trouble" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">What Could Get You in Trouble</h2>
            
            <h3 className="text-xl font-semibold mb-3">Higher Risk Activities:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Selling peptides for human use</li>
              <li>Making therapeutic claims about peptides</li>
              <li>Importing large quantities</li>
              <li>Using peptides while subject to drug testing</li>
              <li>Operating a clinic prescribing prohibited peptides</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Lower Risk (But Not Zero):</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Personal possession of small quantities</li>
              <li>Purchasing from "research" vendors for personal use</li>
              <li>Importing small amounts for personal use</li>
            </ul>
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
                <a href="https://www.fda.gov/regulatory-information/search-fda-guidance-documents/personal-importation-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  FDA: Personal Importation Policy
                </a>
              </li>
              <li>
                <a href="https://www.wada-ama.org/en/prohibited-list" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  WADA: Prohibited List
                </a>
              </li>
              <li>
                <a href="https://www.dea.gov/drug-information/drug-scheduling" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  DEA: Drug Scheduling
                </a>
              </li>
            </ul>
          </section>

          <section id="faq">
            <GuideFAQ items={faqItems} />
          </section>

          <BottomLineBox content="Peptide legality is nuanced. FDA-approved peptides require prescriptions. 'Research' peptides exist in a gray area where possession isn't typically prosecuted but selling for human use is illegal. Athletes face strict bans through WADA and sports organizations. The legal risk primarily falls on sellers, but buyers face quality/safety risks and potential career consequences in sports or military." />

          <RelatedGuides guides={relatedGuides} />

          <GuideCTA />

          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
