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
  { id: "what-is-reconstitution", title: "What is Reconstitution?", level: 2 },
  { id: "supplies", title: "What You Need", level: 2 },
  { id: "step-by-step", title: "Step-by-Step Process", level: 2 },
  { id: "calculating-dose", title: "Calculating Your Dose", level: 2 },
  { id: "volumes-table", title: "Common Volumes Table", level: 2 },
  { id: "storage", title: "Storage Guidelines", level: 2 },
  { id: "mistakes", title: "Common Mistakes", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const faqItems = [
  { question: "What's the difference between BAC water and sterile water?", answer: "Bacteriostatic water contains 0.9% benzyl alcohol preservative, allowing multi-use over 30 days. Sterile water has no preservative and should be used immediately." },
  { question: "Can I use saline instead of BAC water?", answer: "Bacteriostatic saline (0.9% NaCl with preservative) can be used. Regular saline without preservative should be used immediately like sterile water." },
  { question: "How long does reconstituted peptide last?", answer: "Properly stored in refrigerator (2-8°C), reconstituted peptides with BAC water typically last 30 days. Some more stable peptides may last longer." },
  { question: "What if the solution is cloudy?", answer: "Properly reconstituted peptides should be clear. Cloudiness may indicate contamination, degradation, or improper reconstitution. Do not use cloudy solutions." },
  { question: "What syringe size should I use?", answer: "Insulin syringes (29-31 gauge, 0.5mL or 1mL) are standard for subcutaneous peptide injection. Use the smallest volume syringe that accommodates your dose for accuracy." },
  { question: "Can I pre-load syringes?", answer: "Some people pre-load for convenience, but this increases contamination risk and may accelerate degradation. Best practice is to draw immediately before injection." },
  { question: "How do I travel with peptides?", answer: "Use a small cooler with ice packs. Keep vials upright, protected from light. For flights, check regulations — reconstituted medications typically need to stay with you, not checked luggage." },
  { question: "What if I add too much water?", answer: "The peptide is still usable — you'll just need a larger injection volume per dose. Recalculate: new concentration = peptide amount ÷ new water amount." },
];

const relatedGuides = [
  { title: "Peptides for Beginners", href: "/guides/peptides-for-beginners", description: "Start here if you're new" },
  { title: "BPC-157 Complete Guide", href: "/guides/bpc-157-complete-guide", description: "Popular healing peptide" },
  { title: "Are Peptides Safe?", href: "/guides/are-peptides-safe", description: "Safety considerations" },
];

const changelogEntries = [{ date: "Feb 5, 2026", change: "Initial publication" }];

const articleSchema = {
  "@context": "https://schema.org", "@type": "Article",
  headline: "Peptide Reconstitution Guide",
  datePublished: "2026-02-05", dateModified: "2026-02-05",
  author: { "@type": "Organization", name: "Peptide Playbook" },
  publisher: { "@type": "Organization", name: "Peptide Playbook", url: SITE_URL },
};

export default function PeptideReconstitutionGuide() {
  return (
    <GuideLayout title="Peptide Reconstitution Guide" description="Step-by-step guide to reconstituting peptides with bacteriostatic water. Dosing calculations, storage, and common mistakes to avoid." slug="peptide-reconstitution" articleSchema={articleSchema}>
      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="lg:w-64 shrink-0"><GuideTableOfContents items={tocItems} /></aside>
        <article className="flex-1 min-w-0">
          <QuickAnswerBox answer="Reconstitution is the process of mixing lyophilized (freeze-dried) peptide powder with bacteriostatic water to create an injectable solution. Proper technique preserves peptide integrity and ensures accurate dosing." lastUpdated="February 2026" readTime="10 min" />
          <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-6">Peptide Reconstitution Guide</h1>
          
          <section id="what-is-reconstitution" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">What is Reconstitution?</h2>
            <p className="text-muted-foreground">Reconstitution means dissolving freeze-dried (lyophilized) peptide powder into a liquid for injection. Peptides are sold as powder because they're unstable in liquid form long-term. Adding water "activates" them for use.</p>
          </section>
          
          <section id="supplies" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">What You Need</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Bacteriostatic water (BAC water):</strong> Sterile water with 0.9% benzyl alcohol preservative</li>
              <li><strong>Insulin syringes:</strong> 29-31 gauge, 0.5mL or 1mL</li>
              <li><strong>Alcohol swabs:</strong> For cleaning vial tops</li>
              <li><strong>Peptide vial:</strong> Lyophilized powder</li>
            </ul>
          </section>
          
          <section id="step-by-step" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Step-by-Step Reconstitution</h2>
            <ol className="list-decimal list-inside text-muted-foreground space-y-3">
              <li>Clean both vial tops with alcohol swabs</li>
              <li>Draw desired amount of BAC water into syringe</li>
              <li>Insert needle through peptide vial stopper at an angle</li>
              <li>Slowly release water down the inside wall of the vial (do NOT spray directly onto powder)</li>
              <li>Gently swirl or roll the vial — never shake vigorously</li>
              <li>Wait until powder is fully dissolved (clear solution)</li>
              <li>Store in refrigerator immediately</li>
            </ol>
          </section>
          
          <section id="calculating-dose" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Calculating Your Dose</h2>
            <div className="bg-muted/30 p-4 rounded-lg mb-4">
              <p className="font-semibold mb-2">Formula:</p>
              <p className="text-muted-foreground">Volume to inject = Desired dose ÷ Concentration</p>
              <p className="text-muted-foreground mt-2">Concentration = Peptide amount ÷ Water added</p>
            </div>
            <p className="text-muted-foreground"><strong>Example:</strong> 5mg peptide + 2mL water = 2.5mg/mL. For 250mcg (0.25mg) dose: 0.25 ÷ 2.5 = 0.1mL (10 units on insulin syringe)</p>
          </section>
          
          <section id="volumes-table" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Common Reconstitution Volumes</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead><tr className="border-b border-border"><th className="text-left py-3 pr-4">Peptide</th><th className="text-left py-3 pr-4">Water Added</th><th className="text-left py-3 pr-4">Concentration</th><th className="text-left py-3">Example Dose Volume</th></tr></thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50"><td className="py-3 pr-4">5mg vial</td><td className="py-3 pr-4">2mL</td><td className="py-3 pr-4">2.5mg/mL</td><td className="py-3">250mcg = 0.1mL</td></tr>
                  <tr className="border-b border-border/50"><td className="py-3 pr-4">5mg vial</td><td className="py-3 pr-4">1mL</td><td className="py-3 pr-4">5mg/mL</td><td className="py-3">250mcg = 0.05mL</td></tr>
                  <tr className="border-b border-border/50"><td className="py-3 pr-4">10mg vial</td><td className="py-3 pr-4">2mL</td><td className="py-3 pr-4">5mg/mL</td><td className="py-3">500mcg = 0.1mL</td></tr>
                </tbody>
              </table>
            </div>
          </section>
          
          <section id="storage" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Storage After Reconstitution</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Temperature:</strong> Refrigerate at 2-8°C (36-46°F)</li>
              <li><strong>Duration:</strong> Use within 30 days</li>
              <li><strong>Light:</strong> Store away from direct light</li>
              <li><strong>Never freeze:</strong> Freezing destroys reconstituted peptides</li>
            </ul>
          </section>
          
          <section id="mistakes" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Common Mistakes to Avoid</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Shaking the vial:</strong> Damages peptide structure — swirl gently instead</li>
              <li><strong>Using wrong water:</strong> Only use bacteriostatic or sterile water</li>
              <li><strong>Contamination:</strong> Always clean vial tops, never touch needle</li>
              <li><strong>Spraying onto powder:</strong> Release water down vial wall slowly</li>
              <li><strong>Improper storage:</strong> Room temperature degrades peptides rapidly</li>
            </ul>
          </section>
          
          <GuideChangelog entries={changelogEntries} />
          <GuideFAQ items={faqItems} />
          <BottomLineBox content="Proper reconstitution ensures your peptides remain stable and effective. Use bacteriostatic water, never shake the vial, and always refrigerate immediately after mixing. With correct technique, reconstituted peptides maintain potency for approximately 30 days." />
          <RelatedGuides guides={relatedGuides} />
          <GuideCTA />
          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
