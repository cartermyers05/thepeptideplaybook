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
import { Check, X } from "lucide-react";

const tocItems = [
  { id: "myth-heals-anything", title: "Myth: 'BPC-157 heals anything in 2 weeks'", level: 2 },
  { id: "myth-completely-safe", title: "Myth: 'Peptides are completely safe'", level: 2 },
  { id: "myth-fda-big-pharma", title: "Myth: 'FDA banned peptides because Big Pharma'", level: 2 },
  { id: "myth-hollywood", title: "Myth: 'Everyone in Hollywood uses peptides'", level: 2 },
  { id: "myth-no-doctor", title: "Myth: 'You don't need a doctor for peptides'", level: 2 },
  { id: "whats-actually-true", title: "What's Actually True", level: 2 },
  { id: "primary-sources", title: "Primary Sources", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const changelogEntries: ChangelogEntry[] = [
  { date: "Feb 2, 2026", change: "Initial publication" },
];

const faqItems = [
  {
    question: "Are TikTok peptide influencers paid?",
    answer:
      "Many are. Peptide suppliers and 'wellness' companies often sponsor content creators. Even those without direct sponsorship may earn affiliate commissions. Always consider financial incentives when evaluating health claims on social media.",
  },
  {
    question: "Why is peptide misinformation so common?",
    answer:
      "Several factors: complex science that's easy to oversimplify, real biological activity that seems to validate claims, lack of regulatory oversight on marketing, financial incentives for sellers and influencers, and genuine desperation from people seeking health solutions.",
  },
  {
    question: "Where can I find accurate peptide information?",
    answer:
      "PubMed for peer-reviewed research, FDA.gov for regulatory status, and educational resources that cite primary sources and acknowledge limitations. Be skeptical of any source that makes definitive claims without citing studies or acknowledging unknowns.",
  },
];

const relatedGuides = [
  { title: "BPC-157: Complete Research Guide", href: "/guides/bpc-157-complete-guide" },
  { title: "Are Peptides Safe? Research Overview", href: "/guides/are-peptides-safe" },
  { title: "FDA Peptide Regulations 2026", href: "/guides/peptides-fda-legal-status-2026" },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Peptide TikTok Myths vs Reality: Fact-Checking Viral Claims [2026]",
  description: "Fact-checking the most common TikTok peptide claims against peer-reviewed research. Wolverine healing, miracle fat loss, and other viral myths debunked.",
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
    "@id": `${SITE_URL}/guides/peptide-tiktok-myths`,
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

function MythCard({ 
  myth, 
  reality, 
  evidence 
}: { 
  myth: string; 
  reality: string; 
  evidence: string;
}) {
  return (
    <div className="glass-card-subtle p-6 mb-6">
      <div className="flex items-start gap-3 mb-4">
        <X className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
        <p className="text-lg font-semibold text-destructive">{myth}</p>
      </div>
      <div className="flex items-start gap-3 mb-4">
        <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
        <p className="text-muted-foreground">{reality}</p>
      </div>
      <div className="p-3 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Evidence:</strong> {evidence}
        </p>
      </div>
    </div>
  );
}

export default function PeptideTikTokMyths() {
  return (
    <GuideLayout
      title="Peptide TikTok Myths vs Reality: Fact-Checking Viral Claims [2026]"
      description="Fact-checking the most common TikTok peptide claims against peer-reviewed research. Wolverine healing, miracle fat loss, and other viral myths debunked."
      slug="peptide-tiktok-myths"
      articleSchema={articleSchema}
      faqSchema={faqSchema}
    >
      <div className="flex gap-10">
        <GuideTableOfContents items={tocItems} />

        <article className="flex-1 max-w-3xl">
          <QuickAnswerBox
            answer="TikTok has popularized peptides with viral claims about 'wolverine healing,' 'reversing aging,' and 'miracle fat loss.' Most of these claims extrapolate wildly from limited animal research. This guide fact-checks the most common TikTok peptide claims against what peer-reviewed research actually shows."
            lastUpdated="February 2, 2026"
            readTime="10 minutes"
          />

          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            Peptide TikTok Myths vs Reality: Fact-Checking Viral Claims
          </h1>

          <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg mb-8">
            <p className="text-sm font-medium">
              <strong>Why this matters:</strong> Peptide content has billions of views on TikTok. Much of it makes claims that far exceed what research supports. This guide separates viral hype from peer-reviewed evidence.
            </p>
          </div>

          <section id="myth-heals-anything" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Myth: "BPC-157 heals anything in 2 weeks"</h2>
            <MythCard
              myth='"BPC-157 is like wolverine healing, it fixes everything in 2 weeks"'
              reality="BPC-157 has shown healing effects in animal studies, but no human clinical trials prove it heals anything. Timeline claims are made up."
              evidence="A 2025 systematic review found 35 animal studies and zero completed human clinical trials proving efficacy. Healing timelines have never been studied in humans."
            />
            <p className="text-muted-foreground leading-relaxed">
              The "wolverine healing" narrative is TikTok fiction. Real healing is complex, and no peptide has been proven to dramatically accelerate it in humans.
            </p>
          </section>

          <section id="myth-completely-safe" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Myth: "Peptides are completely safe because they're natural"</h2>
            <MythCard
              myth={"\"Peptides are just amino acids, they're totally natural and safe\""}
              reality="Many peptides are synthetic, and 'natural' doesn't mean safe. Long-term safety in humans has never been established for most research peptides."
              evidence="BPC-157 is synthetic (not found in nature in this form). No multi-year human safety studies exist. 'Natural' substances can be toxic; snake venom is natural."
            />
            <p className="text-muted-foreground leading-relaxed">
              The naturalistic fallacy is particularly dangerous with injectables. Without clinical trials, we genuinely don't know the long-term risks.
            </p>
          </section>

          <section id="myth-fda-big-pharma" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Myth: "The FDA banned peptides because Big Pharma"</h2>
            <MythCard
              myth='"Big Pharma got scared of peptides and paid the FDA to ban them"'
              reality="The FDA categorized peptides based on a standard evaluation process that considers safety evidence and prior use history. No conspiracy is required to explain requiring proof before allowing medical use."
              evidence="FDA Category 2 means insufficient safety/efficacy data and no prior compounding history. This is the default for unapproved substances. Semaglutide (a peptide) is FDA-approved because it went through clinical trials."
            />
            <p className="text-muted-foreground leading-relaxed">
              Conspiracy theories are emotionally satisfying but don't match reality. Pharmaceutical companies actually sell peptides (GLP-1 drugs like Ozempic). The FDA approves peptides when they have supporting data.
            </p>
          </section>

          <section id="myth-hollywood" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Myth: "Everyone in Hollywood uses peptides"</h2>
            <MythCard
              myth={"\"All the celebrities and athletes use BPC-157, that's why they recover so fast\""}
              reality="This is unverifiable speculation used to sell products. Some celebrities may use peptides, but their use doesn't prove safety or efficacy."
              evidence="No verified data on celebrity peptide use exists. Athletes who are caught using banned peptides face suspension (Joe Rogan has discussed this openly). Anecdotes from wealthy people don't equal clinical evidence."
            />
            <p className="text-muted-foreground leading-relaxed">
              Celebrity endorsement (real or imagined) is a marketing tactic, not evidence. Rich people use unproven treatments too.
            </p>
          </section>

          <section id="myth-no-doctor" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Myth: "You don't need a doctor for peptides"</h2>
            <MythCard
              myth={"\"Just order online and inject yourself, doctors don't know anything about peptides anyway\""}
              reality="Self-administering research chemicals without medical oversight carries real risks including infection, contamination, and unknown interactions with health conditions or medications."
              evidence="Injection site infections require medical treatment. Product contamination has caused serious illness with other injectables. Drug interactions are completely unstudied."
            />
            <p className="text-muted-foreground leading-relaxed">
              While many doctors are unfamiliar with peptides, that's an argument for finding informed medical supervision, not for avoiding medicine entirely.
            </p>
          </section>

          <section id="whats-actually-true" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">What's Actually True</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Not everything on TikTok is wrong. Here's what the evidence actually supports:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground"><strong>Peptides are biologically active.</strong> They do have effects in lab and animal studies.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground"><strong>Some peptides are FDA-approved.</strong> GLP-1 medications like semaglutide went through trials and are legitimate drugs.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground"><strong>Regulations have changed.</strong> FDA Category 2 status did restrict access to some peptides.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground"><strong>Some people report benefits.</strong> Anecdotal reports exist, though they don't prove causation.</span>
              </li>
            </ul>
            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg mt-4">
              <p className="text-sm font-medium">
                <strong>The key difference:</strong> Acknowledging biological activity is different from claiming proven treatments. TikTok often conflates the two.
              </p>
            </div>
          </section>

          <WhatWeDontKnow 
            topic="viral peptide claims"
            items={[
              "How many people are influenced to self-administer peptides by social media",
              "Adverse events resulting from TikTok-promoted peptide use",
              "Financial relationships between influencers and peptide suppliers",
              "Long-term effects on those who followed viral advice"
            ]}
            variant="general"
          />

          <PrimarySources 
            topic="bpc-157"
            additionalSources={[
              {
                title: "BPC 157 Systematic Review (2024)",
                url: "https://pubmed.ncbi.nlm.nih.gov/30915550/",
                description: "Comprehensive review showing 35 animal studies, zero completed human trials"
              }
            ]}
          />

          <GuideChangelog entries={changelogEntries} />

          <section id="faq">
            <GuideFAQ items={faqItems} />
          </section>

          <BottomLineBox content="TikTok peptide claims typically extrapolate wildly from limited evidence. 'Wolverine healing' is fiction. 'Completely safe' is unproven. 'Big Pharma conspiracy' ignores that pharma sells peptides (Ozempic). Biological activity exists, but proven treatments require clinical trials. Be skeptical of any source that promises certainty." />

          <RelatedGuides guides={relatedGuides} />

          <GuideCTA />

          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
