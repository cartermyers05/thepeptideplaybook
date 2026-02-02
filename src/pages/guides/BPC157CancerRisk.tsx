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
import { EvidenceTable, Study } from "@/components/guides/EvidenceTable";
import { GuideChangelog, ChangelogEntry } from "@/components/guides/GuideChangelog";
import { SITE_URL } from "@/lib/seo";

const tocItems = [
  { id: "angiogenesis-concern", title: "The Angiogenesis Concern Explained", level: 2 },
  { id: "animal-studies", title: "What Animal Studies Show", level: 2 },
  { id: "what-we-dont-know", title: "What We Don't Know", level: 2 },
  { id: "who-should-avoid", title: "Who Should Be Extra Cautious", level: 2 },
  { id: "honest-answer", title: "The Honest Answer", level: 2 },
  { id: "primary-sources", title: "Primary Sources", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const evidenceStudies: Study[] = [
  {
    studyType: "Animal",
    species: "Rat",
    sampleSize: "24",
    condition: "Corneal angiogenesis model",
    outcome: "Blood vessel growth",
    result: "Increased angiogenesis observed",
    pubmedLink: "https://pubmed.ncbi.nlm.nih.gov/27847366/",
  },
  {
    studyType: "Cell",
    condition: "Endothelial cell culture",
    outcome: "VEGF expression",
    result: "Upregulation of angiogenic factors",
    pubmedLink: "https://pubmed.ncbi.nlm.nih.gov/21030672/",
  },
  {
    studyType: "Human",
    sampleSize: "0",
    condition: "Cancer risk evaluation",
    outcome: "Tumor growth",
    result: "No human studies conducted",
  },
];

const changelogEntries: ChangelogEntry[] = [
  { date: "Feb 2, 2026", change: "Initial publication with evidence table" },
];

const faqItems = [
  {
    question: "Can BPC-157 make cancer grow faster?",
    answer:
      "There is no direct evidence that BPC-157 accelerates cancer growth. However, BPC-157 promotes angiogenesis (new blood vessel formation), and tumors require blood supply to grow. Theoretically, this could support tumor growth in someone who already has cancer. No studies have tested this directly.",
  },
  {
    question: "Should cancer survivors avoid BPC-157?",
    answer:
      "Given the angiogenesis concern and complete lack of cancer safety data, cancer survivors should be extremely cautious. The theoretical risk combined with unknown long-term effects makes this a situation where extra caution is warranted. Discuss with your oncologist.",
  },
  {
    question: "Is BPC-157 safer than steroids for cancer risk?",
    answer:
      "This comparison cannot be made based on available evidence. Anabolic steroids have documented associations with certain cancers (liver, prostate). BPC-157 has no human cancer data at all. Absence of evidence is not evidence of absence.",
  },
];

const relatedGuides = [
  { title: "BPC-157: Complete Research Guide", href: "/guides/bpc-157-complete-guide" },
  { title: "Are Peptides Safe? Research Overview", href: "/guides/are-peptides-safe" },
  { title: "BPC-157 Side Effects", href: "/guides/bpc-157-side-effects" },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Does BPC-157 Cause Cancer? What Research Shows [2026]",
  description: "Evidence-based analysis of BPC-157 and cancer risk. No human studies exist, but angiogenesis concerns warrant caution. What we know and don't know.",
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
    "@id": `${SITE_URL}/guides/bpc-157-cancer-risk`,
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

export default function BPC157CancerRisk() {
  return (
    <GuideLayout
      title="Does BPC-157 Cause Cancer? What Research Shows [2026]"
      description="Evidence-based analysis of BPC-157 and cancer risk. No human studies exist, but angiogenesis concerns warrant caution."
      slug="bpc-157-cancer-risk"
      articleSchema={articleSchema}
      faqSchema={faqSchema}
    >
      <div className="flex gap-10">
        <GuideTableOfContents items={tocItems} />

        <article className="flex-1 max-w-3xl">
          <QuickAnswerBox
            answer="There is no direct evidence that BPC-157 causes cancer in humans. However, BPC-157 promotes angiogenesis (blood vessel growth), and some researchers have raised theoretical concerns that this could potentially support tumor growth in people who already have cancer. No human studies have evaluated cancer risk. This remains an unknown."
            lastUpdated="February 2, 2026"
            readTime="8 minutes"
          />

          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            Does BPC-157 Cause Cancer? What Research Actually Shows
          </h1>

          <EvidenceTable studies={evidenceStudies} title="BPC-157 Angiogenesis Evidence" />

          <section id="angiogenesis-concern" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">The Angiogenesis Concern Explained</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              BPC-157 has been shown to promote angiogenesis, the formation of new blood vessels. This is part of its proposed healing mechanism. More blood vessels means more nutrient and oxygen delivery to healing tissues.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The concern: tumors also need blood supply to grow. Cancer cells release signals to create new blood vessels (tumor angiogenesis). In theory, anything that promotes blood vessel growth could potentially support tumor expansion.
            </p>
            <div className="p-4 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>Important distinction:</strong> This is a theoretical concern, not a proven risk. No study has shown BPC-157 causes cancer or accelerates tumor growth. But no study has ruled it out either.
              </p>
            </div>
          </section>

          <section id="animal-studies" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">What Animal Studies Show</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Animal studies confirm that BPC-157 does promote angiogenesis:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Increased VEGF (vascular endothelial growth factor) expression</li>
              <li>Enhanced blood vessel formation in wound healing models</li>
              <li>Improved blood flow to damaged tissues</li>
            </ul>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              However, no animal studies have specifically tested BPC-157 in cancer models. Researchers have not implanted tumors and then administered BPC-157 to see what happens.
            </p>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">The gap:</strong> We know BPC-157 promotes blood vessel growth. We don't know whether this affects tumor growth specifically.
              </p>
            </div>
          </section>

          <WhatWeDontKnow 
            topic="BPC-157 and cancer risk"
            items={[
              "Whether BPC-157 affects tumor growth in animals or humans",
              "Long-term cancer risk from BPC-157 use (no studies exist)",
              "Whether BPC-157's angiogenesis affects existing cancers differently than wound healing",
              "Safe timeframes for use in people with cancer history",
              "Interaction with cancer treatments (chemotherapy, immunotherapy)",
              "Whether stopping BPC-157 reverses any theoretical effects"
            ]}
          />

          <section id="who-should-avoid" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Who Should Be Extra Cautious</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Given the theoretical angiogenesis concern, the following groups may want to exercise additional caution:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>Active cancer patients:</strong> Any substance promoting blood vessel growth could theoretically support tumor spread</li>
              <li><strong>Cancer survivors:</strong> Particularly those with high recurrence risk or recent remission</li>
              <li><strong>Those with pre-cancerous conditions:</strong> Polyps, dysplasia, or abnormal growth findings</li>
              <li><strong>Those with family history of angiogenesis-dependent cancers:</strong> Some cancers are more dependent on blood supply than others</li>
            </ul>
            <div className="p-4 bg-destructive/10 border-l-4 border-destructive rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>This is not medical advice.</strong> If you have cancer concerns, discuss any peptide use with your oncologist. They can assess your individual risk factors.
              </p>
            </div>
          </section>

          <section id="honest-answer" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">The Honest Answer</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>Does BPC-157 cause cancer?</strong> We don't know. There's no evidence it does, but there's also no evidence it doesn't.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>Is the angiogenesis concern valid?</strong> It's theoretically plausible but unproven. Many substances promote angiogenesis without causing cancer.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong>What should you do?</strong> Make decisions based on your risk tolerance. If you have cancer history or concerns, be extra cautious. If not, understand that this is an unknown, not a proven risk.
            </p>
          </section>

          <PrimarySources 
            topic="bpc-157"
            additionalSources={[
              {
                title: "American Cancer Society: Angiogenesis and Cancer",
                url: "https://www.cancer.org/",
                description: "Background on how blood vessel growth relates to tumor development"
              }
            ]}
          />

          <GuideChangelog entries={changelogEntries} />

          <section id="faq">
            <GuideFAQ items={faqItems} />
          </section>

          <BottomLineBox content="There is no evidence BPC-157 causes cancer. However, its angiogenesis-promoting effects raise theoretical concerns for people with existing cancer or high cancer risk. No human cancer safety studies exist. If you have cancer concerns, discuss with your oncologist before using any peptide." />

          <RelatedGuides guides={relatedGuides} />

          <GuideCTA />

          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
