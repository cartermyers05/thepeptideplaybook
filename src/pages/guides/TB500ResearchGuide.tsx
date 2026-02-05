import { GuideLayout } from "@/components/guides/GuideLayout";
import { QuickAnswerBox } from "@/components/guides/QuickAnswerBox";
import { BottomLineBox } from "@/components/guides/BottomLineBox";
import { GuideFAQ } from "@/components/guides/GuideFAQ";
import { GuideCTA } from "@/components/guides/GuideCTA";
import { GuideDisclaimer } from "@/components/guides/GuideDisclaimer";
import { RelatedGuides } from "@/components/guides/RelatedGuides";
import { GuideTableOfContents } from "@/components/guides/GuideTableOfContents";
import { GuideChangelog } from "@/components/guides/GuideChangelog";
import { KeyTakeawayBox } from "@/components/guides/KeyTakeawayBox";
import { References } from "@/components/guides/References";
import { SITE_URL } from "@/lib/seo";
import { Link } from "react-router-dom";

const tocItems = [
  { id: "what-is-tb500", title: "What Is TB-500?", level: 2 },
  { id: "mechanism", title: "How Does TB-500 Work?", level: 2 },
  { id: "research", title: "Research Findings", level: 2 },
  { id: "comparison", title: "TB-500 vs BPC-157", level: 2 },
  { id: "dosing", title: "Dosing Protocols", level: 2 },
  { id: "reconstitution", title: "Reconstitution", level: 2 },
  { id: "side-effects", title: "Side Effects", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
  { id: "references", title: "References", level: 2 },
];

const faqItems = [
  { question: "What is TB-500 used for?", answer: "TB-500 is studied for tissue repair, wound healing, and inflammation reduction. Research areas include tendon/ligament healing, cardiac repair, corneal healing, and musculoskeletal recovery. It's widely used in equine veterinary medicine." },
  { question: "Is TB-500 the same as Thymosin Beta-4?", answer: "Yes—TB-500 is a synthetic version with the same sequence and activity as natural Thymosin Beta-4. TB-500 is the commercial/research name for the synthetic peptide." },
  { question: "TB-500 or BPC-157—which is better?", answer: "They work through different mechanisms and are often combined. TB-500 promotes cell migration and angiogenesis systemically. BPC-157 works through nitric oxide pathways and growth factors. For musculoskeletal injuries, many research protocols use both together." },
  { question: "How long until TB-500 works?", answer: "Animal studies show effects within days. In research settings, initial improvements are often reported at 1-2 weeks, with significant recovery over 4-6 weeks during a loading phase." },
  { question: "Can TB-500 be taken orally?", answer: "TB-500 is primarily studied via subcutaneous or intramuscular injection. Unlike BPC-157 (which has demonstrated oral bioactivity), TB-500's larger size (43 amino acids) makes oral absorption less reliable." },
  { question: "How should I store TB-500?", answer: "Unreconstituted: -20°C for long-term or 2-8°C for short-term. Reconstituted with bacteriostatic water: 2-8°C, use within 30 days. Avoid freeze-thaw cycles with reconstituted peptide." },
];

const relatedGuides = [
  { title: "BPC-157 Complete Guide", href: "/guides/bpc-157-complete-guide", description: "Complementary healing peptide" },
  { title: "BPC-157 vs TB-500", href: "/guides/bpc-157-vs-tb-500", description: "Detailed comparison" },
  { title: "Peptide Reconstitution Guide", href: "/guides/peptide-reconstitution", description: "Step-by-step mixing" },
];

const changelogEntries = [{ date: "Feb 5, 2026", change: "Complete guide rewrite with expanded research citations" }];

const references = [
  { number: 1, text: "Goldstein AL, Hannappel E, Kleinman HK. Thymosin β4: actin-sequestering protein moonlights to repair injured tissues. Trends Mol Med. 2005;11(9):421-9.", url: "https://pubmed.ncbi.nlm.nih.gov/16099219/" },
  { number: 2, text: "Bock-Marquette I, Saxena A, White MD, et al. Thymosin β4 activates integrin-linked kinase and promotes cardiac cell migration, survival and cardiac repair. Nature. 2004;432:466-72.", url: "https://pubmed.ncbi.nlm.nih.gov/15565145/" },
  { number: 3, text: "Sosne G, Qiu P, Christopherson PL, Wheater MK. Thymosin beta 4 suppression of corneal NFkappaB: a potential anti-inflammatory pathway. Exp Eye Res. 2007;84(5):789-94.", url: "https://pubmed.ncbi.nlm.nih.gov/17350616/" },
  { number: 4, text: "Malinda KM, Sidhu GS, Mani H, et al. Thymosin beta4 accelerates wound healing. J Invest Dermatol. 1999;113(3):364-8.", url: "https://pubmed.ncbi.nlm.nih.gov/10469334/" },
];

const articleSchema = {
  "@context": "https://schema.org", "@type": "Article",
  headline: "TB-500: Complete Research Guide to Thymosin Beta-4",
  datePublished: "2026-02-05", dateModified: "2026-02-05",
  author: { "@type": "Organization", name: "Peptide Playbook" },
  publisher: { "@type": "Organization", name: "Peptide Playbook", url: SITE_URL },
};

export default function TB500ResearchGuide() {
  return (
    <GuideLayout title="TB-500: Complete Research Guide to Thymosin Beta-4" description="TB-500 (Thymosin Beta-4) is a 43-amino acid peptide studied for wound healing, tissue repair, and inflammation. Compare TB-500 vs BPC-157, dosing, and research." slug="tb-500-research-guide" articleSchema={articleSchema}>
      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="lg:w-64 shrink-0"><GuideTableOfContents items={tocItems} /></aside>
        <article className="flex-1 min-w-0">
          <QuickAnswerBox answer="TB-500 is a synthetic version of Thymosin Beta-4, a 43-amino acid peptide present in virtually all human cells. It promotes tissue repair through cell migration, angiogenesis, and inflammation reduction. Frequently studied alongside BPC-157 as they target repair through different mechanisms." lastUpdated="February 2026" readTime="14 min" />
          <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-6">TB-500: Complete Research Guide to Thymosin Beta-4</h1>
          
          <p className="text-muted-foreground mb-6 text-lg leading-relaxed">TB-500 represents one of the most extensively studied peptides for tissue repair and regeneration. As a synthetic version of Thymosin Beta-4—a peptide naturally present in virtually all human cells—it has attracted significant research interest for wound healing, cardiac repair, and musculoskeletal recovery.</p>

          <section id="what-is-tb500" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">What Is TB-500?</h2>
            <p className="text-muted-foreground mb-4">Thymosin Beta-4 (Tβ4) is a 43-amino acid peptide with a molecular weight of 4,921 Da. First isolated from the thymus gland, it's actually present in virtually all cells and is the most abundant intracellular peptide in mammals.<sup className="text-primary cursor-pointer hover:underline"><a href="#ref-1">1</a></sup></p>
            <p className="text-muted-foreground mb-4">The active region is the sequence Ac-SDKP (amino acids 17-23), which mediates many of its regenerative effects. TB-500 is the synthetic, commercially available version with identical sequence and activity.</p>
            <p className="text-muted-foreground"><strong>Regulatory status:</strong> TB-500 is not FDA-approved for human use. It's widely used in equine veterinary medicine and available as a research peptide.</p>
          </section>

          <section id="mechanism" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">How Does TB-500 Work?</h2>
            <p className="text-muted-foreground mb-4">TB-500's primary mechanism involves actin binding and regulation. Actin is the most abundant intracellular protein, essential for cell structure and movement.</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li><strong>Actin sequestration:</strong> TB-500 binds G-actin, promoting cell migration to injury sites</li>
              <li><strong>Angiogenesis:</strong> Stimulates new blood vessel formation at injury sites</li>
              <li><strong>Anti-inflammatory:</strong> Reduces NF-κB pathway activation<sup className="text-primary cursor-pointer hover:underline"><a href="#ref-3">3</a></sup></li>
              <li><strong>ECM remodeling:</strong> Promotes extracellular matrix reorganization</li>
            </ul>
            <p className="text-muted-foreground">Its small molecular size allows systemic distribution—TB-500 reaches injury sites throughout the body rather than acting only locally.</p>
          </section>

          <KeyTakeawayBox content="TB-500 promotes healing through actin binding (cell migration), angiogenesis (new blood vessels), and inflammation reduction. Its systemic distribution means it can reach injury sites throughout the body." />

          <section id="research" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Research Findings</h2>
            <p className="text-muted-foreground mb-4"><strong>Wound Healing:</strong> Accelerated wound closure, increased collagen deposition, and reduced scarring in animal models.<sup className="text-primary cursor-pointer hover:underline"><a href="#ref-4">4</a></sup></p>
            <p className="text-muted-foreground mb-4"><strong>Cardiac Repair:</strong> Post-heart attack, Tβ4 reduced scar size and improved cardiac function in mice (Nature, 2004).<sup className="text-primary cursor-pointer hover:underline"><a href="#ref-2">2</a></sup></p>
            <p className="text-muted-foreground mb-4"><strong>Corneal Healing:</strong> Promoted corneal wound healing with significant anti-inflammatory effects.</p>
            <p className="text-muted-foreground"><strong>Musculoskeletal:</strong> Enhanced tendon healing strength and promoted muscle fiber regeneration in animal studies. Widely used in equine veterinary medicine.</p>
          </section>

          <section id="comparison" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">TB-500 vs BPC-157</h2>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted"><tr><th className="text-left py-3 px-4 font-semibold">Feature</th><th className="text-left py-3 px-4 font-semibold">TB-500</th><th className="text-left py-3 px-4 font-semibold">BPC-157</th></tr></thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border/50"><td className="py-3 px-4">Origin</td><td className="py-3 px-4">All human cells</td><td className="py-3 px-4">Human gastric juice</td></tr>
                  <tr className="border-t border-border/50"><td className="py-3 px-4">Size</td><td className="py-3 px-4">43 amino acids</td><td className="py-3 px-4">15 amino acids</td></tr>
                  <tr className="border-t border-border/50"><td className="py-3 px-4">Mechanism</td><td className="py-3 px-4">Actin binding, angiogenesis</td><td className="py-3 px-4">NO pathway, growth factors</td></tr>
                  <tr className="border-t border-border/50"><td className="py-3 px-4">Best For</td><td className="py-3 px-4">Cardiac, corneal, systemic</td><td className="py-3 px-4">Gut, tendon/ligament</td></tr>
                  <tr className="border-t border-border/50"><td className="py-3 px-4">Route</td><td className="py-3 px-4">SC or IM</td><td className="py-3 px-4">SC, IM, or oral</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground">Many protocols combine both for complementary tissue repair. See <Link to="/guides/bpc-157-vs-tb-500" className="text-primary hover:underline">BPC-157 vs TB-500 comparison</Link>.</p>
          </section>

          <section id="dosing" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Dosing Protocols</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Loading:</strong> 2-5mg SC, 2x/week for 4-6 weeks</li>
              <li><strong>Maintenance:</strong> 2mg SC, 2x/week or weekly</li>
              <li><strong>Cycle:</strong> 6-8 weeks on / 2-4 weeks off</li>
            </ul>
          </section>

          <section id="reconstitution" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Reconstitution</h2>
            <div className="bg-muted/50 p-4 rounded-lg mb-4">
              <p className="font-medium mb-2">5mg vial + 2mL BAC water = 2.5mg/mL</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>For 2.5mg: draw 1mL (100 units)</li>
                <li>For 2mg: draw 0.8mL (80 units)</li>
              </ul>
            </div>
            <p className="text-muted-foreground">Store at 2-8°C, use within 30 days. See <Link to="/guides/peptide-reconstitution" className="text-primary hover:underline">Peptide Reconstitution Guide</Link>.</p>
          </section>

          <section id="side-effects" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Side Effects</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Injection site redness (transient)</li>
              <li>Mild headache (uncommon)</li>
              <li>Temporary lethargy post-injection</li>
            </ul>
            <p className="text-muted-foreground mt-4">No serious adverse events at standard doses in research. Theoretical concern: angiogenesis could affect existing tumors (precautionary, no evidence).</p>
          </section>

          <KeyTakeawayBox content="TB-500 and BPC-157 work through completely different mechanisms—many research protocols combine both for comprehensive tissue repair. Loading phase: 2-5mg 2x/week for 4-6 weeks." />

          <GuideChangelog entries={changelogEntries} />
          <GuideFAQ items={faqItems} />
          <References references={references} />
          <BottomLineBox content="TB-500 is one of the most studied peptides for tissue repair, with strong animal research supporting wound healing, cardiac repair, and regenerative effects. It works through cell migration and angiogenesis—different from BPC-157's nitric oxide pathway—which is why they're often combined. Human clinical data remains limited, but the peptide has a favorable safety profile in research conducted to date." />
          <RelatedGuides guides={relatedGuides} />
          <GuideCTA />
          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
