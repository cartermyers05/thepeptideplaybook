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

const tocItems = [
  { id: "what-is-reconstitution", title: "What Is Reconstitution?", level: 2 },
  { id: "supplies", title: "What You Need", level: 2 },
  { id: "water-comparison", title: "BAC Water vs Sterile Water", level: 2 },
  { id: "step-by-step", title: "Step-by-Step Reconstitution", level: 2 },
  { id: "dose-calculation", title: "How to Calculate Your Dose", level: 2 },
  { id: "volume-table", title: "Common Reconstitution Volumes", level: 2 },
  { id: "storage", title: "Storage After Reconstitution", level: 2 },
  { id: "common-mistakes", title: "Common Mistakes", level: 2 },
  { id: "injection", title: "How to Inject Subcutaneously", level: 2 },
  { id: "traveling", title: "Traveling with Peptides", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
  { id: "references", title: "References", level: 2 },
];

const faqItems = [
  { question: "BAC water vs sterile water—which should I use?", answer: "Bacteriostatic water contains 0.9% benzyl alcohol preservative, allowing multi-dose use for up to 28 days. Sterile water has no preservative and should be used immediately (single use). BAC water is strongly recommended for peptides." },
  { question: "Can I use saline instead of BAC water?", answer: "Bacteriostatic water is preferred. Saline typically lacks preservative and some peptides have altered stability in saline. Unless the peptide specifically requires saline, stick with BAC water." },
  { question: "How long does reconstituted peptide last?", answer: "With bacteriostatic water at 2-8°C: approximately 28-30 days. Without preservative: use within 24-48 hours. Some peptides may have shorter stability windows—check specific recommendations." },
  { question: "What if my solution is cloudy?", answer: "A properly reconstituted peptide should be clear and colorless. Cloudiness may indicate denaturation or contamination. Wait 15-30 minutes; if still cloudy, discard the vial." },
  { question: "What syringe size should I use?", answer: "1mL (100 unit) insulin syringe with 29-31 gauge needle for subcutaneous injection. For doses under 0.3mL, a 0.3mL (30 unit) syringe provides more precision for accurate dosing." },
  { question: "Can I pre-load syringes in advance?", answer: "Not recommended—contamination risk increases and peptides may degrade faster in plastic syringes. If you must pre-load, refrigerate and use within 24 hours." },
  { question: "How do I travel with peptides?", answer: "Reconstituted: insulated bag with cold pack. Lyophilized (powder): stable at room temperature short-term. TSA allows medically necessary liquids. Consider traveling with unreconstituted vials + BAC water and mixing at destination." },
  { question: "I added too much or too little water—did I ruin it?", answer: "No. Too much water = more dilute solution, draw a larger volume. Too little = more concentrated, draw less. Recalculate: Desired Dose ÷ New Concentration = New Volume to draw." },
];

const relatedGuides = [
  { title: "GHK-Cu Complete Guide", href: "/guides/ghk-cu-complete-guide", description: "Copper peptide research" },
  { title: "TB-500 Research Guide", href: "/guides/tb-500-research-guide", description: "Tissue repair peptide" },
  { title: "HGH Peptides Guide", href: "/guides/hgh-peptides", description: "Growth hormone secretagogues" },
  { title: "Peptides for Beginners", href: "/guides/peptides-for-beginners", description: "Start here if you're new" },
];

const changelogEntries = [{ date: "Feb 5, 2026", change: "Complete guide rewrite with dosing tables and step-by-step instructions" }];

const references = [
  { number: 1, text: "USP General Chapter <797> Pharmaceutical Compounding — Sterile Preparations. United States Pharmacopeia." },
  { number: 2, text: "CDC Safe Injection Practices. Centers for Disease Control and Prevention." },
  { number: 3, text: "Bacteriostatic Water for Injection, USP. Product labeling and specifications." },
];

const articleSchema = {
  "@context": "https://schema.org", "@type": "Article",
  headline: "Peptide Reconstitution Guide: Step-by-Step Instructions",
  datePublished: "2026-02-05", dateModified: "2026-02-05",
  author: { "@type": "Organization", name: "Peptide Playbook" },
  publisher: { "@type": "Organization", name: "Peptide Playbook", url: SITE_URL },
};

export default function PeptideReconstitutionGuide() {
  return (
    <GuideLayout title="Peptide Reconstitution Guide: Step-by-Step Instructions" description="Learn how to reconstitute peptides properly. Step-by-step guide covering BAC water, dosing calculations, storage, and common mistakes to avoid." slug="peptide-reconstitution" articleSchema={articleSchema}>
      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="lg:w-64 shrink-0"><GuideTableOfContents items={tocItems} /></aside>
        <article className="flex-1 min-w-0">
          <QuickAnswerBox answer="Reconstitution is mixing lyophilized (freeze-dried) peptide powder with bacteriostatic water to create an injectable solution. Proper technique preserves peptide integrity and ensures accurate dosing. Key rules: use BAC water, aim at vial wall (not powder), never shake, store at 2-8°C." lastUpdated="February 2026" readTime="12 min" />
          <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-6">Peptide Reconstitution Guide: Step-by-Step Instructions</h1>
          
          <p className="text-muted-foreground mb-8 text-lg leading-relaxed">Proper reconstitution is essential for peptide integrity and accurate dosing. This guide covers everything you need to know—from supplies to technique to storage—with dosing tables and common mistake prevention.</p>

          <section id="what-is-reconstitution" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">What Is Reconstitution?</h2>
            <p className="text-muted-foreground mb-4">Peptides are shipped as lyophilized (freeze-dried) powder for stability. Before use, you must dissolve the powder in a suitable liquid—this process is called reconstitution. Proper technique preserves the peptide's molecular structure and ensures accurate dosing.</p>
            <p className="text-muted-foreground"><strong>The #1 user error is contamination.</strong> Following sterile technique is critical for safety and peptide stability.</p>
          </section>

          <section id="supplies" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">What You Need</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Bacteriostatic water</strong> (contains 0.9% benzyl alcohol preservative)</li>
              <li><strong>Insulin syringes</strong> (29-31 gauge, 1mL)</li>
              <li><strong>Alcohol swabs</strong> (70% isopropyl)</li>
              <li><strong>Peptide vial</strong> (lyophilized powder)</li>
              <li><strong>Clean workspace</strong></li>
            </ul>
          </section>

          <section id="water-comparison" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">BAC Water vs Sterile Water vs Saline</h2>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted"><tr><th className="text-left py-3 px-4 font-semibold">Solution</th><th className="text-left py-3 px-4 font-semibold">Preservative</th><th className="text-left py-3 px-4 font-semibold">Multi-Use?</th><th className="text-left py-3 px-4 font-semibold">Shelf Life</th><th className="text-left py-3 px-4 font-semibold">Best For</th></tr></thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border/50"><td className="py-3 px-4">Bacteriostatic Water</td><td className="py-3 px-4">0.9% benzyl alcohol</td><td className="py-3 px-4">Yes</td><td className="py-3 px-4">28 days</td><td className="py-3 px-4">Multi-dose (recommended)</td></tr>
                  <tr className="border-t border-border/50"><td className="py-3 px-4">Sterile Water</td><td className="py-3 px-4">None</td><td className="py-3 px-4">No</td><td className="py-3 px-4">Immediate</td><td className="py-3 px-4">Single-dose only</td></tr>
                  <tr className="border-t border-border/50"><td className="py-3 px-4">Saline 0.9%</td><td className="py-3 px-4">None typically</td><td className="py-3 px-4">Varies</td><td className="py-3 px-4">Varies</td><td className="py-3 px-4">Not preferred</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="step-by-step" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Step-by-Step Reconstitution</h2>
            <ol className="list-decimal list-inside text-muted-foreground space-y-3">
              <li><strong>Wash hands</strong> thoroughly for 20+ seconds</li>
              <li><strong>Gather supplies</strong> on a clean surface</li>
              <li><strong>Clean both vial stoppers</strong> with alcohol swabs, let air dry</li>
              <li><strong>Draw BAC water</strong> into syringe (desired amount)</li>
              <li><strong>Inject into peptide vial</strong>—aim stream at SIDE of vial wall, never directly onto powder</li>
              <li><strong>DO NOT SHAKE</strong>—let water run down side, dissolve naturally. Gentle swirl after 2-3 min if needed</li>
              <li><strong>Wait for clear solution</strong> (5-15 minutes typically)</li>
              <li><strong>Label vial:</strong> peptide name, concentration, date</li>
              <li><strong>Refrigerate immediately</strong> (2-8°C)</li>
            </ol>
          </section>

          <KeyTakeawayBox content="Two most common mistakes: (1) shooting water directly onto powder (causes foaming/denaturation), (2) shaking the vial. Always aim at the glass wall and let gravity do the work." />

          <section id="dose-calculation" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">How to Calculate Your Dose</h2>
            <div className="bg-muted/50 p-4 rounded-lg mb-4">
              <p className="font-medium mb-2">Formula: Desired Dose ÷ Concentration = Volume to Draw</p>
              <p className="text-muted-foreground"><strong>Example:</strong> Want 1mg. Vial is 5mg reconstituted with 2mL. Concentration = 5÷2 = 2.5mg/mL. Volume = 1÷2.5 = 0.4mL = 40 units on insulin syringe.</p>
            </div>
          </section>

          <section id="volume-table" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Common Reconstitution Volumes</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted"><tr><th className="text-left py-3 px-4 font-semibold">Vial</th><th className="text-left py-3 px-4 font-semibold">BAC Water</th><th className="text-left py-3 px-4 font-semibold">Concentration</th><th className="text-left py-3 px-4 font-semibold">0.5mg</th><th className="text-left py-3 px-4 font-semibold">1mg</th><th className="text-left py-3 px-4 font-semibold">2mg</th></tr></thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border/50"><td className="py-3 px-4">5mg</td><td className="py-3 px-4">1mL</td><td className="py-3 px-4">5mg/mL</td><td className="py-3 px-4">10 units</td><td className="py-3 px-4">20 units</td><td className="py-3 px-4">40 units</td></tr>
                  <tr className="border-t border-border/50"><td className="py-3 px-4">5mg</td><td className="py-3 px-4">2mL</td><td className="py-3 px-4">2.5mg/mL</td><td className="py-3 px-4">20 units</td><td className="py-3 px-4">40 units</td><td className="py-3 px-4">80 units</td></tr>
                  <tr className="border-t border-border/50"><td className="py-3 px-4">10mg</td><td className="py-3 px-4">2mL</td><td className="py-3 px-4">5mg/mL</td><td className="py-3 px-4">10 units</td><td className="py-3 px-4">20 units</td><td className="py-3 px-4">40 units</td></tr>
                  <tr className="border-t border-border/50"><td className="py-3 px-4">10mg</td><td className="py-3 px-4">5mL</td><td className="py-3 px-4">2mg/mL</td><td className="py-3 px-4">25 units</td><td className="py-3 px-4">50 units</td><td className="py-3 px-4">100 units</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">Note: 1mL = 100 units on a standard insulin syringe</p>
          </section>

          <section id="storage" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Storage After Reconstitution</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Store at <strong>2-8°C</strong> (refrigerator)</li>
              <li>Stable for <strong>~30 days</strong> with BAC water</li>
              <li><strong>NEVER freeze</strong> reconstituted peptides (ice crystals damage structure)</li>
              <li>Keep vial <strong>upright</strong></li>
              <li><strong>Protect from light</strong></li>
              <li>Sterile water: use within <strong>24-48 hours</strong></li>
            </ul>
          </section>

          <section id="common-mistakes" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Common Mistakes</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>❌ Shaking → ✅ Gentle swirl only</li>
              <li>❌ Water directly on powder → ✅ Aim at vial wall</li>
              <li>❌ Tap/distilled water → ✅ BAC or sterile water only</li>
              <li>❌ Skip cleaning stoppers → ✅ Alcohol swab every time</li>
              <li>❌ Reusing syringes → ✅ New syringe each time</li>
              <li>❌ Room temp storage → ✅ Refrigerate immediately</li>
              <li>❌ Freezing reconstituted → ✅ Only freeze lyophilized powder</li>
            </ul>
          </section>

          <KeyTakeawayBox content="Use BAC water (not sterile water) for multi-dose vials. Store reconstituted peptides at 2-8°C for up to 30 days. Never freeze reconstituted peptides—only lyophilized powder can be frozen." />

          <section id="injection" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">How to Inject Subcutaneously</h2>
            <ol className="list-decimal list-inside text-muted-foreground space-y-2">
              <li>Draw correct volume into syringe</li>
              <li>Clean injection site with alcohol, let air dry</li>
              <li>Pinch skin (abdomen 1+ inch from navel, outer thigh, or upper arm)</li>
              <li>Insert needle at 45-90° angle</li>
              <li>Inject slowly</li>
              <li>Withdraw at same angle</li>
              <li>Light pressure—don't rub</li>
              <li>Rotate injection sites</li>
              <li>Dispose of syringe in sharps container</li>
            </ol>
          </section>

          <section id="traveling" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Traveling with Peptides</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Reconstituted:</strong> Insulated bag with ice pack</li>
              <li><strong>Lyophilized:</strong> Room temperature stable short-term</li>
              <li>TSA allows medically necessary liquids</li>
              <li>Consider traveling with unreconstituted vials + BAC water, reconstitute at destination</li>
            </ul>
          </section>

          <GuideChangelog entries={changelogEntries} />
          <GuideFAQ items={faqItems} />
          <References references={references} />
          <BottomLineBox content="Proper reconstitution preserves peptide integrity and ensures accurate dosing. Always use bacteriostatic water for multi-dose vials, aim the water stream at the vial wall (never directly on powder), never shake, and store at 2-8°C. With these basics, you'll maintain peptide quality for the full 30-day shelf life." />
          <RelatedGuides guides={relatedGuides} />
          <GuideCTA />
          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
