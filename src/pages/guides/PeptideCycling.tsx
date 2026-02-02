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
  { id: "what-is-cycling", title: "What Is Peptide Cycling?", level: 2 },
  { id: "why-people-think", title: "Why People Think Cycling Is Needed", level: 2 },
  { id: "research-shows", title: "What Research Actually Shows", level: 2 },
  { id: "may-need-cycling", title: "Peptides That May Need Cycling", level: 2 },
  { id: "probably-dont", title: "Peptides That Probably Don't", level: 2 },
  { id: "common-protocols", title: "Common Cycling Protocols (Anecdotal)", level: 2 },
  { id: "honest-answer", title: "The Honest Answer", level: 2 },
  { id: "primary-sources", title: "Primary Sources", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const faqItems = [
  { question: "How long should a BPC-157 cycle be?", answer: "There is no established cycle length for BPC-157 because no clinical trials exist. Common anecdotal protocols range from 4-12 weeks on, sometimes with breaks. Whether cycling is even necessary for BPC-157 is unknown." },
  { question: "Can I take peptides year-round?", answer: "This depends on the peptide and hasn't been studied. GH secretagogues may show desensitization with continuous use. BPC-157's long-term effects are completely unknown. Consult a physician before any extended protocol." },
  { question: "Do peptides stop working over time?", answer: "Some peptides (particularly GH secretagogues) may show reduced response over time due to receptor desensitization. This varies by compound and individual. BPC-157 desensitization hasn't been studied in humans." },
];

const relatedGuides = [
  { title: "BPC-157 Complete Guide", href: "/guides/bpc-157-complete-guide" },
  { title: "Ipamorelin + CJC-1295", href: "/guides/ipamorelin-cjc-1295" },
  { title: "Are Peptides Safe?", href: "/guides/are-peptides-safe" },
];

const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Peptide Cycling: Do You Need to Cycle Peptides? [2026]", description: "Evidence-based analysis of peptide cycling protocols. What research shows, which peptides may need cycling, and honest assessment of the evidence.", datePublished: "2026-02-02", dateModified: "2026-02-02", author: { "@type": "Organization", name: "Peptide Playbook" }, publisher: { "@type": "Organization", name: "Peptide Playbook", logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guides/peptide-cycling` } };

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqItems.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };

export default function PeptideCycling() {
  return (
    <GuideLayout title="Peptide Cycling: Do You Need to Cycle Peptides? [2026]" description="Evidence-based analysis of peptide cycling protocols. What research shows, which peptides may need cycling, and honest assessment of the evidence." slug="peptide-cycling" articleSchema={articleSchema} faqSchema={faqSchema}>
      <div className="flex gap-10">
        <GuideTableOfContents items={tocItems} />
        <article className="flex-1 max-w-3xl">
          <QuickAnswerBox answer="There is no clinical research establishing optimal peptide cycling protocols. The 'cycle on/off' recommendations you see online are based on bodybuilding culture extrapolation, not scientific evidence. Some peptides (like growth hormone secretagogues) may have diminishing effects over time, but this varies by compound. Consult a physician before any protocol." lastUpdated="February 2, 2026" readTime="7 minutes" />
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Peptide Cycling: Do You Need to Cycle Peptides?</h1>
          <section id="what-is-cycling" className="mb-10"><h2 className="text-2xl font-bold mb-4">What Is Peptide Cycling?</h2><p className="text-muted-foreground leading-relaxed">"Cycling" refers to using a substance for a period of time, then taking a break before resuming. The concept comes from bodybuilding culture around steroids and has been applied to peptides without scientific validation.</p></section>
          <section id="why-people-think" className="mb-10"><h2 className="text-2xl font-bold mb-4">Why People Think Cycling Is Needed</h2><ul className="list-disc list-inside text-muted-foreground space-y-2"><li>Prevent receptor desensitization</li><li>Avoid tolerance/reduced effectiveness</li><li>Allow body to "reset"</li><li>Mitigate unknown long-term effects</li></ul><p className="text-muted-foreground mt-4">These are theoretical concerns, not proven necessities for most peptides.</p></section>
          <section id="research-shows" className="mb-10"><h2 className="text-2xl font-bold mb-4">What Research Actually Shows</h2><p className="text-muted-foreground leading-relaxed">Clinical research on peptide cycling protocols is essentially nonexistent. Animal studies don't typically test cycling. The cycling protocols you see online are community-developed, not science-based.</p></section>
          <section id="may-need-cycling" className="mb-10"><h2 className="text-2xl font-bold mb-4">Peptides That May Need Cycling</h2><ul className="list-disc list-inside text-muted-foreground space-y-2"><li><strong>GH Secretagogues (GHRP, Ipamorelin):</strong> May show desensitization</li><li><strong>GnRH analogs:</strong> Receptor downregulation documented</li></ul></section>
          <section id="probably-dont" className="mb-10"><h2 className="text-2xl font-bold mb-4">Peptides That Probably Don't Need Cycling</h2><ul className="list-disc list-inside text-muted-foreground space-y-2"><li><strong>BPC-157:</strong> No evidence of desensitization (also no long-term studies)</li><li><strong>TB-500:</strong> Similar lack of evidence either way</li><li><strong>GLP-1 medications:</strong> Used continuously without cycling</li></ul></section>
          <section id="common-protocols" className="mb-10"><h2 className="text-2xl font-bold mb-4">Common Cycling Protocols (Anecdotal)</h2><p className="text-muted-foreground mb-4 leading-relaxed">These are NOT evidence-based recommendations:</p><ul className="list-disc list-inside text-muted-foreground space-y-2"><li>BPC-157: 4-6 weeks on, 2-4 weeks off</li><li>GH secretagogues: 5 days on, 2 days off; or 8 weeks on, 4 weeks off</li></ul></section>
          <section id="honest-answer" className="mb-10"><h2 className="text-2xl font-bold mb-4">The Honest Answer</h2><p className="text-muted-foreground leading-relaxed">We don't know if cycling most peptides is necessary, beneficial, or irrelevant. The protocols are guesses based on principles from other compounds. Consult a knowledgeable physician and acknowledge the uncertainty.</p></section>
          <section id="primary-sources" className="mb-10"><h2 className="text-2xl font-bold mb-4">Primary Sources</h2><ul className="list-disc list-inside text-muted-foreground space-y-2"><li><a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">PubMed: GHRP Desensitization Studies</a></li></ul></section>
          <section id="faq"><GuideFAQ items={faqItems} /></section>
          <BottomLineBox content="Peptide cycling protocols are not based on clinical research. They're extrapolations from bodybuilding culture applied to compounds that haven't been properly studied. GH secretagogues may show desensitization; BPC-157 and TB-500 cycling necessity is unknown. The honest answer is we don't have scientific guidance on optimal protocols." />
          <RelatedGuides guides={relatedGuides} />
          <GuideCTA />
          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
