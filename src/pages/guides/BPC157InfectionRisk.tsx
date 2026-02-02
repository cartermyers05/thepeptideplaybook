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
  { id: "why-infections-happen", title: "Why Injection Infections Happen", level: 2 },
  { id: "signs-of-infection", title: "Signs of Injection Site Infection", level: 2 },
  { id: "when-to-seek-care", title: "When to Seek Medical Care", level: 2 },
  { id: "risk-factors", title: "Risk Factors", level: 2 },
  { id: "contamination-concerns", title: "Product Contamination Concerns", level: 2 },
  { id: "what-we-dont-know", title: "What We Don't Know", level: 2 },
  { id: "primary-sources", title: "Primary Sources", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const changelogEntries: ChangelogEntry[] = [
  { date: "Feb 2, 2026", change: "Initial publication with harm reduction focus" },
];

const faqItems = [
  {
    question: "What does an infected injection site look like?",
    answer:
      "Signs include: increasing redness spreading from the site, warmth or heat at the area, swelling that gets worse over days, pus or discharge, red streaks extending from the site (sign of spreading infection), and fever. Any of these warrant medical evaluation.",
  },
  {
    question: "Can I treat an injection infection at home?",
    answer:
      "Minor irritation (small red area, no warmth, no fever) can be monitored at home. However, true infections require antibiotics and sometimes drainage. If you're unsure, see a doctor. Untreated infections can become serious abscesses or spread to blood (sepsis).",
  },
  {
    question: "How do I know if my peptides are contaminated?",
    answer:
      "You cannot tell by looking. Research peptides are not tested for sterility or endotoxins. Contamination is invisible. The only way to know is third-party lab testing, which most suppliers don't provide. Assume any 'research chemical' peptide could contain contaminants.",
  },
];

const relatedGuides = [
  { title: "BPC-157: Complete Research Guide", href: "/guides/bpc-157-complete-guide" },
  { title: "Research Peptide Contamination Risks", href: "/guides/peptide-contamination" },
  { title: "How to Verify Peptide COA", href: "/guides/verify-peptide-coa" },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "BPC-157 Injection Infections: Risks & Prevention [2026]",
  description: "Injection site infections from BPC-157: signs to watch for, when to seek care, and risk factors. Harm reduction information for informed decisions.",
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
    "@id": `${SITE_URL}/guides/bpc-157-infection-risk`,
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

export default function BPC157InfectionRisk() {
  return (
    <GuideLayout
      title="BPC-157 Injection Infections: Risks & Prevention [2026]"
      description="Injection site infections from BPC-157: signs to watch for, when to seek care, and risk factors. Harm reduction information for informed decisions."
      slug="bpc-157-infection-risk"
      articleSchema={articleSchema}
      faqSchema={faqSchema}
    >
      <div className="flex gap-10">
        <GuideTableOfContents items={tocItems} />

        <article className="flex-1 max-w-3xl">
          <QuickAnswerBox
            answer="Injection site infections are a real risk when self-administering any injectable, including BPC-157. Risks include bacterial infection, abscess formation, and cellulitis. These risks increase with non-sterile technique, contaminated products, or reusing needles. This is harm reduction information, not encouragement to use research peptides."
            lastUpdated="February 2, 2026"
            readTime="8 minutes"
          />

          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            BPC-157 Injection Infections: What You Need to Know
          </h1>

          <div className="p-4 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-lg mb-8">
            <p className="text-sm font-medium">
              <strong>Harm Reduction Notice:</strong> This guide provides safety information for those who may already be using injectable research peptides. It is not medical advice or encouragement to use these substances.
            </p>
          </div>

          <section id="why-infections-happen" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Why Injection Infections Happen</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Any time you break the skin barrier, you create an entry point for bacteria. Injection-related infections occur when:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>Bacteria enter the injection site:</strong> From unclean skin, non-sterile needles, or contaminated products</li>
              <li><strong>The immune response fails:</strong> Sometimes bacteria overwhelm local defenses</li>
              <li><strong>Foreign material is introduced:</strong> Contaminants in the injected substance</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Research peptides purchased online are not manufactured under pharmaceutical-grade conditions. They may contain bacteria, endotoxins, or other contaminants that increase infection risk.
            </p>
          </section>

          <section id="signs-of-infection" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Signs of Injection Site Infection</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Watch for these warning signs after any injection:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Early Signs (1-3 days)</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Redness beyond normal injection site irritation</li>
                  <li>• Increasing warmth at the site</li>
                  <li>• Swelling that worsens over time</li>
                  <li>• Pain that increases rather than decreases</li>
                </ul>
              </div>
              <div className="p-4 bg-destructive/10 rounded-lg">
                <h3 className="font-semibold mb-2">Serious Signs (Seek Care)</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Red streaks extending from the site</li>
                  <li>• Pus or discharge</li>
                  <li>• Fever or chills</li>
                  <li>• Hardened lump forming (abscess)</li>
                </ul>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              <strong>Note:</strong> Some mild redness and tenderness immediately after injection is normal. Concerning signs are those that worsen over days rather than improve.
            </p>
          </section>

          <section id="when-to-seek-care" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">When to Seek Medical Care</h2>
            <div className="p-4 bg-destructive/10 border-l-4 border-destructive rounded-r-lg mb-4">
              <p className="font-semibold mb-2">Go to Urgent Care or ER if you have:</p>
              <ul className="text-sm space-y-1">
                <li>• Fever over 100.4°F (38°C)</li>
                <li>• Red streaks spreading from injection site</li>
                <li>• Rapidly expanding redness or swelling</li>
                <li>• Pus draining from the site</li>
                <li>• Feeling generally unwell with chills or sweats</li>
              </ul>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>What to tell the doctor:</strong> You don't need to explain exactly what you injected. You can simply say "I gave myself an injection and I'm concerned about infection." They will treat the infection regardless.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Early treatment with antibiotics can prevent an infection from becoming an abscess that requires surgical drainage.
            </p>
          </section>

          <section id="risk-factors" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Risk Factors for Infection</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Factors that increase infection risk with injectable peptides:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>Reusing needles:</strong> Needles become dull and harbor bacteria</li>
              <li><strong>Not cleaning injection site:</strong> Skin bacteria are introduced</li>
              <li><strong>Contaminated products:</strong> Research peptides may contain bacteria or endotoxins</li>
              <li><strong>Poor storage:</strong> Improper temperature control can promote bacterial growth</li>
              <li><strong>Diabetes or immune issues:</strong> Reduced ability to fight infection</li>
              <li><strong>Touching needle tip:</strong> Transfers bacteria from hands</li>
            </ul>
          </section>

          <section id="contamination-concerns" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Product Contamination Concerns</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Unlike pharmaceutical drugs, research peptides are not manufactured under FDA-regulated conditions:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>No sterility testing requirements</li>
              <li>No endotoxin testing (bacterial toxins that cause inflammation)</li>
              <li>Variable manufacturing conditions between suppliers</li>
              <li>No recalls or safety monitoring for contaminated batches</li>
            </ul>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Reality check:</strong> You cannot determine if a peptide is sterile by appearance. Clear liquid does not mean sterile. The only way to ensure sterility is pharmaceutical-grade manufacturing, which research peptides do not have.
              </p>
            </div>
          </section>

          <WhatWeDontKnow 
            topic="injection infections"
            items={[
              "Exact contamination rates in research peptide supply",
              "Which suppliers have better quality control",
              "Long-term effects of repeated exposure to endotoxins",
              "Whether certain injection sites have higher infection rates",
              "How to reliably sterilize research peptides at home"
            ]}
          />

          <PrimarySources 
            topic="safety"
            additionalSources={[
              {
                title: "CDC: Injection Safety",
                url: "https://www.cdc.gov/injection-safety/",
                description: "General guidelines on injection safety practices"
              }
            ]}
          />

          <GuideChangelog entries={changelogEntries} />

          <section id="faq">
            <GuideFAQ items={faqItems} />
          </section>

          <BottomLineBox content="Injection site infections are a real risk with any injectable, including research peptides like BPC-157. Watch for increasing redness, warmth, swelling, or fever. Seek medical care if symptoms worsen. Product contamination is a significant concern with unregulated research chemicals. This is harm reduction information, not endorsement of use." />

          <RelatedGuides guides={relatedGuides} />

          <GuideCTA />

          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
