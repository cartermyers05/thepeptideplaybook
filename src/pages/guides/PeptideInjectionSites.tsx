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
  { id: "subq-vs-im", title: "Subcutaneous vs Intramuscular", level: 2 },
  { id: "best-sites", title: "Best Injection Sites", level: 2 },
  { id: "how-to-inject", title: "How to Inject (Overview)", level: 2 },
  { id: "site-reactions", title: "Common Injection Site Reactions", level: 2 },
  { id: "when-concerned", title: "When to Be Concerned", level: 2 },
  { id: "site-rotation", title: "Site Rotation", level: 2 },
  { id: "sterile-technique", title: "Sterile Technique", level: 2 },
  { id: "primary-sources", title: "Primary Sources", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const faqItems = [
  { question: "Does it matter where I inject peptides?", answer: "For most peptides, subcutaneous injection into fat tissue (abdomen, thigh) provides consistent absorption. Local injection near an injury site is used by some but isn't proven superior. Systemic absorption occurs regardless of SubQ site." },
  { question: "How do I reduce injection pain?", answer: "Use proper needle size (29-31 gauge insulin needles), let alcohol dry before injecting, inject slowly, rotate sites, and ensure peptide solution is at room temperature. Proper technique reduces discomfort." },
  { question: "What does an infected injection site look like?", answer: "Signs of infection include increasing redness, warmth, swelling, pus or discharge, fever, and red streaks extending from site. These require immediate medical attention. Normal injection site reactions (mild redness, small bump) typically resolve within 24-48 hours." },
];

const relatedGuides = [
  { title: "Peptide Quality Testing", href: "/guides/peptide-quality-testing" },
  { title: "Are Peptides Safe?", href: "/guides/are-peptides-safe" },
  { title: "Find a Peptide Clinic", href: "/guides/find-peptide-clinic" },
];

const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: "Peptide Injection Sites: Where & How to Inject Safely [2026]", description: "Guide to peptide injection sites, technique, and safety. Subcutaneous vs intramuscular, site rotation, and recognizing complications.", datePublished: "2026-02-02", dateModified: "2026-02-02", author: { "@type": "Organization", name: "Peptide Playbook" }, publisher: { "@type": "Organization", name: "Peptide Playbook", logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` } }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/guides/peptide-injection-sites` } };

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqItems.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };

export default function PeptideInjectionSites() {
  return (
    <GuideLayout title="Peptide Injection Sites: Where & How to Inject Safely [2026]" description="Guide to peptide injection sites, technique, and safety. Subcutaneous vs intramuscular, site rotation, and recognizing complications." slug="peptide-injection-sites" articleSchema={articleSchema} faqSchema={faqSchema}>
      <div className="flex gap-10">
        <GuideTableOfContents items={tocItems} />
        <article className="flex-1 max-w-3xl">
          <QuickAnswerBox answer="Subcutaneous injection (into fat tissue) is the most common method for peptides like BPC-157 and TB-500. Common sites include the abdomen, thigh, and upper arm. Injection site reactions (redness, swelling, itching) are the most frequently reported side effect. Proper technique, rotation, and sterile practices reduce complications." lastUpdated="February 2, 2026" readTime="7 minutes" />
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Peptide Injection Sites: Where & How to Inject Safely</h1>
          <section id="subq-vs-im" className="mb-10"><h2 className="text-2xl font-bold mb-4">Subcutaneous vs Intramuscular</h2><p className="text-muted-foreground mb-4 leading-relaxed"><strong>Subcutaneous (SubQ):</strong> Into fat tissue, 45-90 degree angle, shorter needle. Most common for peptides. <strong>Intramuscular (IM):</strong> Into muscle tissue, 90 degree angle, longer needle. Less common for peptides. Most research peptides use subcutaneous administration.</p></section>
          <section id="best-sites" className="mb-10"><h2 className="text-2xl font-bold mb-4">Best Injection Sites</h2><ul className="list-disc list-inside text-muted-foreground space-y-2"><li><strong>Abdomen:</strong> 2 inches away from navel, most popular</li><li><strong>Thigh:</strong> Front/outer thigh, good for rotation</li><li><strong>Upper arm:</strong> Back of arm, may need assistance</li><li><strong>Love handles:</strong> Side fat, alternative site</li></ul></section>
          <section id="how-to-inject" className="mb-10"><h2 className="text-2xl font-bold mb-4">How to Inject (Overview)</h2><ul className="list-disc list-inside text-muted-foreground space-y-2"><li>Wash hands thoroughly</li><li>Clean injection site with alcohol</li><li>Allow alcohol to dry completely</li><li>Pinch skin for SubQ injection</li><li>Insert needle at proper angle</li><li>Inject slowly</li><li>Apply gentle pressure after</li></ul><p className="text-muted-foreground mt-4 text-sm">This is educational information, not medical instruction. Consult a healthcare provider for proper training.</p></section>
          <section id="site-reactions" className="mb-10"><h2 className="text-2xl font-bold mb-4">Common Injection Site Reactions</h2><ul className="list-disc list-inside text-muted-foreground space-y-2"><li>Mild redness (normal, resolves in hours)</li><li>Small bump or lump</li><li>Itching</li><li>Minor bruising</li><li>Temporary soreness</li></ul></section>
          <section id="when-concerned" className="mb-10"><h2 className="text-2xl font-bold mb-4">When to Be Concerned</h2><p className="text-muted-foreground mb-4 leading-relaxed">Seek medical attention for: increasing pain/redness after 48 hours, pus or discharge, fever, red streaks from site, severe swelling, or signs of allergic reaction.</p></section>
          <section id="site-rotation" className="mb-10"><h2 className="text-2xl font-bold mb-4">Site Rotation</h2><p className="text-muted-foreground leading-relaxed">Rotate injection sites to prevent lipodystrophy (fat tissue changes) and reduce irritation. Use different areas of abdomen or alternate between abdomen and thighs.</p></section>
          <section id="sterile-technique" className="mb-10"><h2 className="text-2xl font-bold mb-4">Sterile Technique</h2><ul className="list-disc list-inside text-muted-foreground space-y-2"><li>Use new needle for each injection</li><li>Clean vial tops with alcohol</li><li>Don't touch needle</li><li>Store reconstituted peptides properly</li><li>Discard if solution appears cloudy</li></ul></section>
          <section id="primary-sources" className="mb-10"><h2 className="text-2xl font-bold mb-4">Primary Sources</h2><ul className="list-disc list-inside text-muted-foreground space-y-2"><li><a href="https://www.cdc.gov/injectionsafety/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">CDC: Injection Safety</a></li></ul></section>
          <section id="faq"><GuideFAQ items={faqItems} /></section>
          <BottomLineBox content="Subcutaneous injection into fat tissue (abdomen, thigh) is standard for most peptides. Proper technique includes sterile practice, site rotation, and appropriate needle size. Minor injection site reactions are common and typically resolve quickly. Signs of infection require medical attention. This is educational information, not medical instruction." />
          <RelatedGuides guides={relatedGuides} />
          <GuideCTA />
          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
