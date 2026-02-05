import { GuideLayout } from "@/components/guides/GuideLayout";
import { QuickAnswerBox } from "@/components/guides/QuickAnswerBox";
import { BottomLineBox } from "@/components/guides/BottomLineBox";
import { GuideFAQ } from "@/components/guides/GuideFAQ";
import { GuideCTA } from "@/components/guides/GuideCTA";
import { GuideDisclaimer } from "@/components/guides/GuideDisclaimer";
import { RelatedGuides } from "@/components/guides/RelatedGuides";
import { GuideTableOfContents } from "@/components/guides/GuideTableOfContents";
import { GuideChangelog } from "@/components/guides/GuideChangelog";
import { SITE_URL } from "@/lib/seo";

const tocItems = [
  { id: "what-is-mt2", title: "What is Melanotan 2?", level: 2 },
  { id: "mechanism", title: "How MT-2 Works", level: 2 },
  { id: "tanning-research", title: "Tanning Research", level: 2 },
  { id: "mt1-vs-mt2", title: "MT-1 vs MT-2", level: 2 },
  { id: "side-effects", title: "Side Effects", level: 2 },
  { id: "legal-status", title: "Legal Status", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const faqItems = [
  { question: "Is Melanotan 2 legal?", answer: "MT-2 is not FDA-approved and is illegal to sell for human use in most countries. It's sold as a research chemical. Some countries have stricter bans." },
  { question: "How fast does MT-2 work?", answer: "Initial skin darkening may appear within 1-2 weeks. Full effects typically develop over 4-8 weeks with continued use." },
  { question: "Do you still need sun exposure?", answer: "Some UV exposure enhances results, but MT-2 can produce tanning effects without sun. However, this doesn't protect against UV damage like natural tanning." },
  { question: "What about new moles?", answer: "MT-2 can cause new moles or darkening of existing moles. Any suspicious changes should be evaluated by a dermatologist due to melanoma concerns." },
  { question: "Can women use MT-2?", answer: "Yes, but women may experience different side effects including increased libido. The peptide affects both sexes similarly for tanning." },
  { question: "How is it administered?", answer: "Subcutaneous injection is the standard route. Nasal sprays exist but have lower and less predictable absorption." },
  { question: "Storage requirements?", answer: "Store lyophilized powder at room temperature. After reconstitution, refrigerate and use within 30 days." },
  { question: "Is the tan permanent?", answer: "No. The tan fades gradually after stopping use, similar to a natural tan. Maintenance doses can extend duration." },
];

const relatedGuides = [
  { title: "Are Peptides Safe?", href: "/guides/are-peptides-safe", description: "Safety considerations" },
  { title: "Peptides for Beginners", href: "/guides/peptides-for-beginners", description: "Getting started" },
];

const changelogEntries = [{ date: "Feb 5, 2026", change: "Initial publication" }];

const articleSchema = {
  "@context": "https://schema.org", "@type": "Article",
  headline: "Melanotan 2: Complete Research Guide",
  datePublished: "2026-02-05", dateModified: "2026-02-05",
  author: { "@type": "Organization", name: "Peptide Playbook" },
  publisher: { "@type": "Organization", name: "Peptide Playbook", url: SITE_URL },
};

export default function Melanotan2Guide() {
  return (
    <GuideLayout title="Melanotan 2: Complete Research Guide" description="Melanotan 2 (MT-2) is a synthetic melanocortin studied for skin pigmentation, photoprotection, and sexual dysfunction." slug="melanotan-2" articleSchema={articleSchema}>
      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="lg:w-64 shrink-0"><GuideTableOfContents items={tocItems} /></aside>
        <article className="flex-1 min-w-0">
          <QuickAnswerBox answer="Melanotan 2 (MT-2) is a synthetic analog of alpha-melanocyte stimulating hormone studied for skin pigmentation, photoprotection, and sexual dysfunction. It remains one of the most widely discussed peptides in consumer communities." lastUpdated="February 2026" readTime="12 min" />
          <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-6">Melanotan 2: Complete Research Guide</h1>
          
          <section id="what-is-mt2" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">What is Melanotan 2?</h2>
            <p className="text-muted-foreground mb-4">Melanotan 2 (MT-2) is a synthetic analog of alpha-melanocyte stimulating hormone (α-MSH). It was originally developed at the University of Arizona as a potential treatment for skin cancer prevention through increased pigmentation.</p>
            <p className="text-muted-foreground">The peptide activates melanocortin receptors, particularly MC1R (tanning) and MC4R (sexual function, appetite).</p>
          </section>
          
          <section id="mechanism" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">How MT-2 Works</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>MC1R activation:</strong> Stimulates melanocytes to produce melanin (tanning)</li>
              <li><strong>MC4R activation:</strong> Affects sexual arousal and appetite suppression</li>
              <li><strong>Photoprotection:</strong> Increased melanin may provide some UV protection</li>
            </ul>
          </section>
          
          <section id="tanning-research" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Tanning and UV Protection Research</h2>
            <p className="text-muted-foreground mb-4">Research has shown MT-2 effectively increases skin pigmentation. However, the increased melanin doesn't provide the same UV protection as a natural tan developed through gradual sun exposure.</p>
            <p className="text-muted-foreground">The peptide was never approved for this use, and development was discontinued due to side effect concerns.</p>
          </section>
          
          <section id="mt1-vs-mt2" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Melanotan 1 vs Melanotan 2</h2>
            <div className="bg-muted/30 p-4 rounded-lg">
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>MT-1 (Afamelanotide):</strong> FDA-approved for erythropoietic protoporphyria. More selective for MC1R.</li>
                <li><strong>MT-2:</strong> Not approved. Activates multiple receptors, causing more side effects including sexual effects.</li>
              </ul>
            </div>
          </section>
          
          <section id="side-effects" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Side Effects</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Nausea (common, especially initially)</li>
              <li>Facial flushing</li>
              <li>New or darkened moles (requires monitoring)</li>
              <li>Appetite suppression</li>
              <li>Spontaneous erections</li>
              <li>Fatigue and drowsiness</li>
            </ul>
          </section>
          
          <section id="legal-status" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Legal Status and FDA Position</h2>
            <p className="text-muted-foreground">MT-2 is not FDA-approved and is classified as an unapproved drug. The FDA has issued warnings about MT-2 products sold online. It's banned by WADA for athletes.</p>
          </section>
          
          <GuideChangelog entries={changelogEntries} />
          <GuideFAQ items={faqItems} />
          <BottomLineBox content="Melanotan 2 effectively increases skin pigmentation but carries significant risks including mole changes that require dermatological monitoring. It's not FDA-approved and is illegal to sell for human use. Users should understand these risks and the lack of long-term safety data." />
          <RelatedGuides guides={relatedGuides} />
          <GuideCTA />
          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
