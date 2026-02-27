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
  { id: "quick-comparison", title: "Quick Comparison", level: 2 },
  { id: "how-each-works", title: "How Each Works", level: 2 },
  { id: "clinical-trials", title: "Clinical Trial Head-to-Head", level: 2 },
  { id: "weight-loss-results", title: "Weight Loss Results", level: 2 },
  { id: "side-effects", title: "Side Effect Profiles", level: 2 },
  { id: "cost-comparison", title: "Cost Comparison", level: 2 },
  { id: "which-to-consider", title: "Which Should You Consider?", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const faqItems = [
  {
    question: "Which causes more weight loss, tirzepatide or semaglutide?",
    answer:
      "Tirzepatide produces more weight loss in clinical comparisons. A 2024 JAMA study of 18,386 patients found tirzepatide users were significantly more likely to achieve 15%+ weight loss than semaglutide users, with the average tirzepatide patient losing 5-7 more pounds.",
  },
  {
    question: "Is tirzepatide safer than semaglutide?",
    answer:
      "Both medications have similar side effect profiles, primarily gastrointestinal symptoms like nausea and diarrhea. Neither has shown significant safety advantages over the other in published clinical trials.",
  },
  {
    question: "Can I switch from semaglutide to tirzepatide?",
    answer:
      "Yes, many patients switch under medical supervision. The typical approach is to start tirzepatide at a lower dose after discontinuing semaglutide, with gradual dose escalation. Consult your prescribing physician for transition protocols.",
  },
  {
    question: "Which is cheaper, tirzepatide or semaglutide?",
    answer:
      "List prices are comparable ($900-1,300/month without insurance). Insurance coverage and manufacturer coupons vary significantly. Compounded semaglutide is more widely available and often less expensive than compounded tirzepatide through telehealth platforms.",
  },
  {
    question: "Which has fewer side effects — tirzepatide or semaglutide?",
    answer:
      "Both medications have similar GI side effect profiles (nausea, vomiting, diarrhea). Some data suggests tirzepatide may have slightly lower rates of nausea, but the differences aren't dramatic. Both are generally well-tolerated when doses are titrated slowly.",
  },
];

const relatedGuides = [
  { title: "Semaglutide Complete Guide: How It Works & Safety", href: "/guides/semaglutide-complete-guide" },
  { title: "Best Peptides for Weight Loss", href: "/guides/best-peptides-weight-loss" },
  { title: "Semaglutide Side Effects", href: "/guides/semaglutide-side-effects" },
  { title: "Semaglutide Dosing Guide", href: "/guides/semaglutide-dosing" },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Tirzepatide vs Semaglutide: Which Is Better for Weight Loss? [2026]",
  description: "Head-to-head comparison of tirzepatide (Mounjaro/Zepbound) and semaglutide (Ozempic/Wegovy). Clinical trial results, side effects, costs, and which one might be right for you.",
  datePublished: "2026-01-30",
  dateModified: "2026-02-27",
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
    "@id": `${SITE_URL}/guides/tirzepatide-vs-semaglutide`,
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

export default function TirzepatideVsSemaglutideGuide() {
  return (
    <GuideLayout
      title="Tirzepatide vs Semaglutide: Which Is Better for Weight Loss? [2026]"
      description="Head-to-head comparison of tirzepatide (Mounjaro/Zepbound) and semaglutide (Ozempic/Wegovy). Clinical trial results, side effects, costs, and which one might be right for you."
      slug="tirzepatide-vs-semaglutide"
      articleSchema={articleSchema}
      faqSchema={faqSchema}
    >
      <div className="flex gap-10">
        <GuideTableOfContents items={tocItems} />

        <article className="flex-1 max-w-3xl">
          <QuickAnswerBox
            answer="Tirzepatide (Mounjaro/Zepbound) and semaglutide (Ozempic/Wegovy) are both FDA-approved GLP-1 medications, but tirzepatide adds a second mechanism (GIP receptor activation). In head-to-head trials, tirzepatide produces ~5% greater weight loss on average. Semaglutide has longer-term safety data and proven cardiovascular benefits from the SELECT trial. Both are effective — the 'better' choice depends on individual factors, insurance coverage, and doctor recommendations."
            lastUpdated="January 30, 2026"
            readTime="10 minutes"
          />

          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            Tirzepatide vs Semaglutide: Complete Comparison [2026]
          </h1>

          <section id="quick-comparison" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Quick Comparison Overview</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">Feature</th>
                    <th className="text-left p-3 font-semibold">Tirzepatide</th>
                    <th className="text-left p-3 font-semibold">Semaglutide</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Brand Names</td>
                    <td className="p-3 text-muted-foreground">Mounjaro, Zepbound</td>
                    <td className="p-3 text-muted-foreground">Ozempic, Wegovy</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Manufacturer</td>
                    <td className="p-3 text-muted-foreground">Eli Lilly</td>
                    <td className="p-3 text-muted-foreground">Novo Nordisk</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Mechanism</td>
                    <td className="p-3 text-muted-foreground">GLP-1 + GIP dual agonist</td>
                    <td className="p-3 text-muted-foreground">GLP-1 agonist only</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Avg Weight Loss</td>
                    <td className="p-3 text-muted-foreground">20-22%</td>
                    <td className="p-3 text-muted-foreground">15-17%</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Dosing</td>
                    <td className="p-3 text-muted-foreground">Weekly injection</td>
                    <td className="p-3 text-muted-foreground">Weekly injection</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Max Dose</td>
                    <td className="p-3 text-muted-foreground">15mg</td>
                    <td className="p-3 text-muted-foreground">2.4mg (Wegovy)</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">CV Outcomes Trial</td>
                    <td className="p-3 text-muted-foreground">SURPASS-CVOT (ongoing)</td>
                    <td className="p-3 text-muted-foreground">SELECT (completed, positive)</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">List Price</td>
                    <td className="p-3 text-muted-foreground">~$1,060/month</td>
                    <td className="p-3 text-muted-foreground">~$1,350/month</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="how-each-works" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">How Each Works: GLP-1 vs GLP-1/GIP</h2>
            
            <h3 className="text-xl font-semibold mb-3">Semaglutide: GLP-1 Only</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Semaglutide activates only GLP-1 receptors. GLP-1 (glucagon-like peptide-1) is released by your intestines after eating and signals satiety to your brain. It also stimulates insulin release and slows gastric emptying.
            </p>

            <h3 className="text-xl font-semibold mb-3">Tirzepatide: Dual GLP-1/GIP</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Tirzepatide is a "twincretin" — it activates both GLP-1 and GIP (glucose-dependent insulinotropic polypeptide) receptors. GIP is another gut hormone that:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Enhances insulin secretion (complementary to GLP-1)</li>
              <li>May have direct effects on fat tissue metabolism</li>
              <li>Could contribute to greater weight loss effects</li>
            </ul>
            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>What this means for you:</strong> The dual mechanism likely explains why tirzepatide produces greater weight loss in clinical trials. It's hitting two biological pathways instead of one.
              </p>
            </div>
          </section>

          <section id="clinical-trials" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Clinical Trial Head-to-Head: SURMOUNT-5</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The SURMOUNT-5 trial directly compared tirzepatide and semaglutide in adults with obesity without diabetes. This is the most definitive comparison we have.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>Trial details:</strong>
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>751 participants</li>
              <li>72 weeks duration</li>
              <li>Maximum doses: tirzepatide 15mg vs semaglutide 2.4mg</li>
            </ul>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>Results:</strong>
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Tirzepatide: 20.2% average weight loss</li>
              <li>Semaglutide: 13.7% average weight loss</li>
              <li>Difference: ~6.5 percentage points favoring tirzepatide</li>
            </ul>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Important context:</strong> The semaglutide arm showed lower weight loss than in the STEP trials (~15-17%). Some experts suggest the dosing titration schedule may have been suboptimal. Regardless, tirzepatide showed a statistically significant advantage.
              </p>
            </div>
          </section>

          <section id="weight-loss-results" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Weight Loss Results Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">Trial</th>
                    <th className="text-left p-3 font-semibold">Drug</th>
                    <th className="text-left p-3 font-semibold">Avg Weight Loss</th>
                    <th className="text-left p-3 font-semibold">≥5% Loss</th>
                    <th className="text-left p-3 font-semibold">≥10% Loss</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">STEP 1</td>
                    <td className="p-3 text-muted-foreground">Semaglutide 2.4mg</td>
                    <td className="p-3 text-muted-foreground">14.9%</td>
                    <td className="p-3 text-muted-foreground">86%</td>
                    <td className="p-3 text-muted-foreground">69%</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">SURMOUNT-1</td>
                    <td className="p-3 text-muted-foreground">Tirzepatide 15mg</td>
                    <td className="p-3 text-muted-foreground">22.5%</td>
                    <td className="p-3 text-muted-foreground">91%</td>
                    <td className="p-3 text-muted-foreground">83%</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">SURMOUNT-5</td>
                    <td className="p-3 text-muted-foreground">Tirzepatide vs Sema</td>
                    <td className="p-3 text-muted-foreground">20.2% vs 13.7%</td>
                    <td className="p-3 text-muted-foreground">—</td>
                    <td className="p-3 text-muted-foreground">—</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              <strong>Key takeaway:</strong> More patients on tirzepatide achieve clinically meaningful weight loss thresholds. However, both medications produce far greater weight loss than any previous FDA-approved options.
            </p>
          </section>

          <section id="side-effects" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Side Effect Profiles</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Both medications share similar GI side effect profiles because they both activate GLP-1 receptors. The most common issues are:
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">Side Effect</th>
                    <th className="text-left p-3 font-semibold">Tirzepatide</th>
                    <th className="text-left p-3 font-semibold">Semaglutide</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Nausea</td>
                    <td className="p-3 text-muted-foreground">~25-30%</td>
                    <td className="p-3 text-muted-foreground">~30-35%</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Diarrhea</td>
                    <td className="p-3 text-muted-foreground">~15-20%</td>
                    <td className="p-3 text-muted-foreground">~15-20%</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Vomiting</td>
                    <td className="p-3 text-muted-foreground">~10-15%</td>
                    <td className="p-3 text-muted-foreground">~10-15%</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Constipation</td>
                    <td className="p-3 text-muted-foreground">~10%</td>
                    <td className="p-3 text-muted-foreground">~10%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Some data suggests tirzepatide may have slightly lower rates of nausea than semaglutide at equivalent efficacy doses, but the differences aren't dramatic. Both medications are generally well-tolerated when doses are titrated slowly over 4-5 months.
            </p>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Practical tip:</strong> Most GI side effects peak during dose escalation and improve over time. Starting low and going slow is the key to tolerability with both medications.
              </p>
            </div>
          </section>

          <section id="cost-comparison" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Cost Comparison</h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">Medication</th>
                    <th className="text-left p-3 font-semibold">List Price</th>
                    <th className="text-left p-3 font-semibold">With Insurance</th>
                    <th className="text-left p-3 font-semibold">Savings Cards</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Mounjaro (diabetes)</td>
                    <td className="p-3 text-muted-foreground">~$1,060/mo</td>
                    <td className="p-3 text-muted-foreground">$25-150/mo</td>
                    <td className="p-3 text-muted-foreground">As low as $25</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Zepbound (weight)</td>
                    <td className="p-3 text-muted-foreground">~$1,060/mo</td>
                    <td className="p-3 text-muted-foreground">Varies widely</td>
                    <td className="p-3 text-muted-foreground">Available</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Ozempic (diabetes)</td>
                    <td className="p-3 text-muted-foreground">~$935/mo</td>
                    <td className="p-3 text-muted-foreground">$25-150/mo</td>
                    <td className="p-3 text-muted-foreground">As low as $25</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Wegovy (weight)</td>
                    <td className="p-3 text-muted-foreground">~$1,350/mo</td>
                    <td className="p-3 text-muted-foreground">Varies widely</td>
                    <td className="p-3 text-muted-foreground">Available</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              <strong>Key insight:</strong> Insurance coverage is often better for diabetes indications than weight management. The SELECT trial results are improving Wegovy coverage; similar data from Eli Lilly's SURPASS-CVOT trial (ongoing) could do the same for Zepbound.
            </p>
          </section>

          <section id="which-to-consider" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Which Should You Consider?</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>Tirzepatide may be better if:</strong>
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Maximizing weight loss is your primary goal</li>
              <li>You've tried semaglutide with insufficient results</li>
              <li>You have type 2 diabetes (both are excellent options)</li>
              <li>Insurance covers it at a comparable copay</li>
            </ul>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>Semaglutide may be better if:</strong>
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>You have established cardiovascular disease (SELECT trial data)</li>
              <li>You want an oral option (Rybelsus for diabetes)</li>
              <li>Insurance only covers semaglutide</li>
              <li>You prefer the medication with longer real-world experience</li>
            </ul>
            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>What this means for you:</strong> Both medications are highly effective. The "best" choice depends on your specific health situation, insurance coverage, and what your doctor recommends. Don't get paralyzed by analysis — either option is far better than no treatment for eligible patients.
              </p>
            </div>
          </section>

          <section id="faq">
            <GuideFAQ items={faqItems} />
          </section>

          <BottomLineBox content="Tirzepatide produces greater average weight loss (~20-22%) compared to semaglutide (~15-17%) in clinical trials, likely due to its dual GLP-1/GIP mechanism. However, semaglutide has more long-term data and proven cardiovascular benefits from the SELECT trial. Both are FDA-approved, effective medications — the right choice depends on individual factors and insurance coverage." />

          <RelatedGuides guides={relatedGuides} />

          <GuideCTA />

          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
