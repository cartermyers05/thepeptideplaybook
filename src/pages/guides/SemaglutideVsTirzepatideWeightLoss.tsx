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
  { id: "comparison-table", title: "Side-by-Side Comparison", level: 2 },
  { id: "how-semaglutide-works", title: "How Semaglutide Works", level: 2 },
  { id: "how-tirzepatide-works", title: "How Tirzepatide Works", level: 2 },
  { id: "clinical-trials", title: "Clinical Trial Results", level: 2 },
  { id: "side-effects", title: "Side Effects Comparison", level: 2 },
  { id: "cost-insurance", title: "Cost and Insurance", level: 2 },
  { id: "which-to-choose", title: "Which Should You Choose?", level: 2 },
  { id: "primary-sources", title: "Primary Sources", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const faqItems = [
  {
    question: "Can I switch from Ozempic to Mounjaro?",
    answer:
      "Yes, switching is possible with your doctor's guidance. Ozempic (semaglutide) and Mounjaro (tirzepatide) have different mechanisms and dosing schedules. Your doctor will typically start you on the lowest dose of Mounjaro and titrate up gradually. There's no standard protocol for switching, and you should discuss the timing with your prescriber.",
  },
  {
    question: "Which has fewer side effects: semaglutide or tirzepatide?",
    answer:
      "Side effect profiles are similar. Both cause GI symptoms (nausea, vomiting, diarrhea) in 30-50% of users, typically during dose escalation. Clinical trials show comparable tolerability. Individual responses vary, so one medication may be better tolerated than the other for a specific person.",
  },
  {
    question: "Is tirzepatide worth the extra cost?",
    answer:
      "Tirzepatide produces greater average weight loss (20-25% vs 15-17% with semaglutide) in clinical trials. Whether this justifies the cost depends on your insurance coverage, personal goals, and response to medication. Some patients achieve excellent results with semaglutide alone.",
  },
  {
    question: "How long does it take to see weight loss results?",
    answer:
      "Most patients notice weight loss within 4-8 weeks of starting either medication. Maximum weight loss typically occurs at 12-18 months. Both medications require gradual dose increases over several months to reach therapeutic doses.",
  },
];

const relatedGuides = [
  { title: "Semaglutide Complete Guide", href: "/guides/semaglutide-complete-guide" },
  { title: "Tirzepatide vs Semaglutide", href: "/guides/tirzepatide-vs-semaglutide" },
  { title: "Are Peptides Safe?", href: "/guides/are-peptides-safe" },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Semaglutide vs Tirzepatide: Which Works Better for Weight Loss? [2026]",
  description: "Head-to-head comparison of semaglutide and tirzepatide for weight loss. Clinical trial data, side effects, costs, and which GLP-1 medication produces better results.",
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
    "@id": `${SITE_URL}/guides/semaglutide-vs-tirzepatide-weight-loss`,
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

export default function SemaglutideVsTirzepatideWeightLoss() {
  return (
    <GuideLayout
      title="Semaglutide vs Tirzepatide: Which Works Better for Weight Loss? [2026]"
      description="Head-to-head comparison of semaglutide and tirzepatide for weight loss. Clinical trial data, side effects, costs, and which GLP-1 medication produces better results."
      slug="semaglutide-vs-tirzepatide-weight-loss"
      articleSchema={articleSchema}
      faqSchema={faqSchema}
    >
      <div className="flex gap-10">
        <GuideTableOfContents items={tocItems} />

        <article className="flex-1 max-w-3xl">
          <QuickAnswerBox
            answer="Both are FDA-approved GLP-1 medications for weight loss. Clinical trials show tirzepatide (Mounjaro/Zepbound) produces greater average weight loss (20-25%) compared to semaglutide (Wegovy/Ozempic, 15-17%). Tirzepatide is a dual GIP/GLP-1 agonist while semaglutide is GLP-1 only. Side effects are similar. Cost and insurance coverage vary significantly."
            lastUpdated="February 2, 2026"
            readTime="10 minutes"
          />

          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            Semaglutide vs Tirzepatide: Which Works Better for Weight Loss?
          </h1>

          <section id="comparison-table" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Side-by-Side Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">Feature</th>
                    <th className="text-left p-3 font-semibold">Semaglutide</th>
                    <th className="text-left p-3 font-semibold">Tirzepatide</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Brand Names</td>
                    <td className="p-3 text-muted-foreground">Wegovy, Ozempic</td>
                    <td className="p-3 text-muted-foreground">Zepbound, Mounjaro</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Mechanism</td>
                    <td className="p-3 text-muted-foreground">GLP-1 only</td>
                    <td className="p-3 text-muted-foreground">GIP + GLP-1 dual</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Average Weight Loss</td>
                    <td className="p-3 text-muted-foreground">15-17%</td>
                    <td className="p-3 text-muted-foreground">20-25%</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">FDA Approved For</td>
                    <td className="p-3 text-muted-foreground">Diabetes, Weight Loss</td>
                    <td className="p-3 text-muted-foreground">Diabetes, Weight Loss</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Dosing</td>
                    <td className="p-3 text-muted-foreground">Weekly injection</td>
                    <td className="p-3 text-muted-foreground">Weekly injection</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Manufacturer</td>
                    <td className="p-3 text-muted-foreground">Novo Nordisk</td>
                    <td className="p-3 text-muted-foreground">Eli Lilly</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="how-semaglutide-works" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">How Semaglutide Works</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Semaglutide is a GLP-1 receptor agonist. It mimics the natural hormone glucagon-like peptide-1, which is released after eating.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>Mechanism of action:</strong>
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Slows gastric emptying (food stays in stomach longer)</li>
              <li>Reduces appetite through brain signaling</li>
              <li>Increases insulin release when blood sugar rises</li>
              <li>Decreases glucagon secretion</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Semaglutide was first approved for type 2 diabetes (as Ozempic) and later for chronic weight management (as Wegovy) at higher doses.
            </p>
          </section>

          <section id="how-tirzepatide-works" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">How Tirzepatide Works</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Tirzepatide is a dual GIP/GLP-1 receptor agonist. It's the first medication to target both incretin pathways simultaneously.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>The dual mechanism:</strong>
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>GLP-1 effects: Same as semaglutide (appetite, gastric emptying, insulin)</li>
              <li>GIP effects: Enhanced insulin secretion, possible direct fat cell effects</li>
              <li>Combined: Potentially greater metabolic effects than GLP-1 alone</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              This dual targeting may explain why tirzepatide produces greater weight loss in clinical trials compared to semaglutide.
            </p>
          </section>

          <section id="clinical-trials" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Clinical Trial Results: Head-to-Head</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The SURMOUNT and STEP clinical trial programs provide the key evidence for both medications.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">Semaglutide (Wegovy) Results:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>STEP 1: 16.9% average weight loss at 68 weeks (2.4mg dose)</li>
              <li>STEP 3 (with lifestyle intervention): 16% weight loss</li>
              <li>About 50% of participants lost 15%+ of body weight</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Tirzepatide (Zepbound) Results:</h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>SURMOUNT-1: 20.9% weight loss (15mg dose) at 72 weeks</li>
              <li>One-third of participants lost 25%+ of body weight</li>
              <li>Up to 22.5% weight loss reported at highest doses</li>
            </ul>

            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>Key takeaway:</strong> Tirzepatide consistently produces 5-8% more weight loss than semaglutide in clinical trials. However, individual results vary significantly.
              </p>
            </div>
          </section>

          <section id="side-effects" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Side Effects Comparison</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Both medications share similar gastrointestinal side effects, which are the most common reason for discontinuation.
            </p>
            
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">Side Effect</th>
                    <th className="text-left p-3 font-semibold">Semaglutide</th>
                    <th className="text-left p-3 font-semibold">Tirzepatide</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Nausea</td>
                    <td className="p-3 text-muted-foreground">44%</td>
                    <td className="p-3 text-muted-foreground">31%</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Diarrhea</td>
                    <td className="p-3 text-muted-foreground">30%</td>
                    <td className="p-3 text-muted-foreground">23%</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Vomiting</td>
                    <td className="p-3 text-muted-foreground">24%</td>
                    <td className="p-3 text-muted-foreground">12%</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Constipation</td>
                    <td className="p-3 text-muted-foreground">24%</td>
                    <td className="p-3 text-muted-foreground">17%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>Serious but rare risks (both medications):</strong>
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Pancreatitis (inflammation of pancreas)</li>
              <li>Gallbladder problems</li>
              <li>Thyroid C-cell tumors (seen in rodent studies, unclear human relevance)</li>
              <li>Hypoglycemia (mainly when combined with other diabetes medications)</li>
            </ul>
          </section>

          <section id="cost-insurance" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Cost and Insurance Coverage</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Both medications are expensive without insurance. Prices can vary significantly based on pharmacy and location.
            </p>
            
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">Medication</th>
                    <th className="text-left p-3 font-semibold">List Price (monthly)</th>
                    <th className="text-left p-3 font-semibold">With Insurance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Wegovy</td>
                    <td className="p-3 text-muted-foreground">$1,300-$1,500</td>
                    <td className="p-3 text-muted-foreground">$0-$500</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Ozempic</td>
                    <td className="p-3 text-muted-foreground">$900-$1,100</td>
                    <td className="p-3 text-muted-foreground">$0-$300</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Zepbound</td>
                    <td className="p-3 text-muted-foreground">$1,000-$1,200</td>
                    <td className="p-3 text-muted-foreground">$0-$500</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Mounjaro</td>
                    <td className="p-3 text-muted-foreground">$1,000-$1,200</td>
                    <td className="p-3 text-muted-foreground">$0-$300</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              <strong>Insurance coverage varies widely.</strong> Many insurers cover these medications for diabetes but not for weight loss alone. Check with your specific plan for coverage details.
            </p>
          </section>

          <section id="which-to-choose" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Which Should You Choose?</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The right choice depends on several factors:
            </p>
            
            <p className="text-muted-foreground mb-3 leading-relaxed">
              <strong>Consider semaglutide if:</strong>
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Your insurance covers it but not tirzepatide</li>
              <li>You have a history of good response to GLP-1 medications</li>
              <li>You prefer a medication with longer track record (approved earlier)</li>
              <li>Cost is a primary concern and semaglutide is more affordable for you</li>
            </ul>

            <p className="text-muted-foreground mb-3 leading-relaxed">
              <strong>Consider tirzepatide if:</strong>
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>You need maximum possible weight loss</li>
              <li>You haven't responded adequately to semaglutide</li>
              <li>Your insurance covers it equally well</li>
              <li>You have type 2 diabetes (may offer additional glycemic benefits)</li>
            </ul>

            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>Important:</strong> Both medications are prescription-only and require medical supervision. This decision should be made with your healthcare provider based on your individual health profile.
              </p>
            </div>
          </section>

          <section id="primary-sources" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Primary Sources</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>
                <a href="https://www.nejm.org/doi/full/10.1056/NEJMoa2032183" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  STEP 1 Trial: Semaglutide Weight Loss (NEJM)
                </a>
              </li>
              <li>
                <a href="https://www.nejm.org/doi/full/10.1056/NEJMoa2206038" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  SURMOUNT-1 Trial: Tirzepatide Weight Loss (NEJM)
                </a>
              </li>
              <li>
                <a href="https://www.fda.gov/drugs/drug-safety-and-availability/fda-approves-new-medication-chronic-weight-management" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  FDA: Wegovy Approval
                </a>
              </li>
              <li>
                <a href="https://www.fda.gov/news-events/press-announcements/fda-approves-new-medication-chronic-weight-management" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  FDA: Zepbound Approval
                </a>
              </li>
            </ul>
          </section>

          <section id="faq">
            <GuideFAQ items={faqItems} />
          </section>

          <BottomLineBox content="Tirzepatide produces greater average weight loss (20-25%) compared to semaglutide (15-17%) in clinical trials. Both are FDA-approved, prescription medications with similar side effect profiles. The best choice depends on your insurance coverage, health goals, and individual response. Consult with your healthcare provider to determine which medication is right for you." />

          <RelatedGuides guides={relatedGuides} />

          <GuideCTA />

          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
