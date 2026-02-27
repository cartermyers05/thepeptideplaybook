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
  { id: "what-is-semaglutide", title: "What is Semaglutide?", level: 2 },
  { id: "how-semaglutide-works", title: "How Semaglutide Works", level: 2 },
  { id: "fda-approved-uses", title: "FDA-Approved Uses", level: 2 },
  { id: "clinical-trials", title: "Clinical Trial Results", level: 2 },
  { id: "side-effects", title: "Side Effects and Safety", level: 2 },
  { id: "cost-insurance", title: "Cost and Insurance", level: 2 },
  { id: "compounding-controversy", title: "Compounding Controversy", level: 2 },
  { id: "vs-other-glp1s", title: "Semaglutide vs Other GLP-1s", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
];

const faqItems = [
  {
    question: "How much weight can you lose on semaglutide?",
    answer:
      "Clinical trials show average weight loss of 15-17% of body weight over 68 weeks with Wegovy (2.4mg weekly). Individual results vary significantly — some patients lose more, others less. Weight regain is common after stopping the medication.",
  },
  {
    question: "Is semaglutide safe long-term?",
    answer:
      "Semaglutide has been studied in trials lasting up to 2 years with an acceptable safety profile. The SELECT trial (17,604 patients, 4+ years) showed cardiovascular benefits. However, lifetime data doesn't exist yet as these medications are relatively new.",
  },
  {
    question: "Can I get semaglutide from a compounding pharmacy?",
    answer:
      "As of January 2026, the FDA shortage status for semaglutide has been resolved. This means compounding pharmacies can no longer legally produce semaglutide copies. Only brand-name Ozempic and Wegovy from Novo Nordisk are available through legitimate channels.",
  },
  {
    question: "What's the difference between Ozempic and Wegovy?",
    answer:
      "Both contain semaglutide but are FDA-approved for different uses. Ozempic (0.25mg-2mg) is approved for type 2 diabetes. Wegovy (up to 2.4mg) is approved for chronic weight management. Wegovy uses higher doses specifically optimized for weight loss.",
  },
  {
    question: "What are the most common side effects of semaglutide?",
    answer:
      "The most common side effects are gastrointestinal: nausea (affecting 30-44% of patients), diarrhea (21-30%), vomiting (18-24%), and constipation (16-24%). These typically diminish within 4-8 weeks at a stable dose.",
  },
];

const relatedGuides = [
  { title: "Tirzepatide vs Semaglutide: Head-to-Head Comparison", href: "/guides/tirzepatide-vs-semaglutide" },
  { title: "FDA Peptide Regulations 2026: What's Legal", href: "/guides/peptides-fda-legal-status-2026" },
  { title: "Are Peptides Safe? What the Research Shows", href: "/guides/are-peptides-safe" },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Semaglutide Complete Guide: How It Works, Results & Safety [2026]",
  description: "Everything you need to know about semaglutide (Ozempic, Wegovy) in 2026. FDA-approved uses, clinical trial results, side effects, costs, and the compounding controversy explained.",
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
    "@id": `${SITE_URL}/guides/semaglutide-complete-guide`,
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

export default function SemaglutideGuide() {
  return (
    <GuideLayout
      title="Semaglutide Complete Guide: How It Works, Results & Safety [2026]"
      description="Everything you need to know about semaglutide (Ozempic, Wegovy) in 2026. FDA-approved uses, clinical trial results, side effects, costs, and the compounding controversy explained."
      slug="semaglutide-complete-guide"
      articleSchema={articleSchema}
      faqSchema={faqSchema}
    >
      <div className="flex gap-10">
        <GuideTableOfContents items={tocItems} />

        <article className="flex-1 max-w-3xl">
          <QuickAnswerBox
            answer="Semaglutide is an FDA-approved GLP-1 receptor agonist medication sold as Ozempic (for type 2 diabetes) and Wegovy (for weight management). Clinical trials show 15-17% average weight loss over 68 weeks. Unlike research peptides, semaglutide has extensive human trial data — the SELECT trial included over 17,000 patients followed for 4+ years. As of 2026, compounded versions are no longer legally available due to resolved shortage status."
            lastUpdated="January 30, 2026"
            readTime="14 minutes"
          />

          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            Semaglutide: The Complete Guide [2026]
          </h1>

          <section id="what-is-semaglutide" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">What is Semaglutide?</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed text-lg">
              Semaglutide is a GLP-1 receptor agonist available as Ozempic (for type 2 diabetes), Wegovy (for weight management), and Rybelsus (oral tablet). Clinical trials demonstrate average weight loss of 15-17% over 68 weeks, making it one of the most effective FDA-approved weight loss medications. As of January 2026, an oral version of Wegovy is also available, expanding access beyond weekly injections.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Developed by Novo Nordisk, semaglutide is available in two brand-name versions:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>Ozempic</strong> — FDA-approved for type 2 diabetes (2017)</li>
              <li><strong>Wegovy</strong> — FDA-approved for chronic weight management (2021)</li>
              <li><strong>Rybelsus</strong> — Oral tablet form for diabetes (2019)</li>
            </ul>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Semaglutide gained massive public attention starting in 2022-2023, becoming one of the most discussed medications in recent history. Celebrity use and social media drove unprecedented demand, leading to widespread shortages.
            </p>
            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>What this means for you:</strong> Semaglutide represents the gold standard for what peptide research should look like — extensive human trials, FDA approval, and ongoing safety monitoring. It's the benchmark against which other peptides should be compared.
              </p>
            </div>
          </section>

          <section id="how-semaglutide-works" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">How Semaglutide Works (GLP-1 Mechanism)</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              GLP-1 is a hormone naturally released by your intestines after eating. Semaglutide mimics this hormone but lasts much longer in your body (about 1 week vs. minutes for natural GLP-1).
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>Key mechanisms:</strong>
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>Appetite suppression</strong> — Acts on brain areas controlling hunger and satiety</li>
              <li><strong>Delayed gastric emptying</strong> — Food stays in stomach longer, increasing fullness</li>
              <li><strong>Insulin secretion</strong> — Stimulates insulin release when blood sugar is elevated</li>
              <li><strong>Glucagon reduction</strong> — Decreases a hormone that raises blood sugar</li>
            </ul>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The weight loss effect comes primarily from reduced appetite and food intake. Patients typically report feeling full faster and having fewer food cravings, particularly for high-calorie foods.
            </p>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Key distinction:</strong> Unlike stimulant-based weight loss drugs, GLP-1 medications work with your body's natural satiety signals. This is why they're generally well-tolerated for extended use.
              </p>
            </div>
          </section>

          <section id="fda-approved-uses" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">FDA-Approved Uses</h2>
            
            <h3 className="text-xl font-semibold mb-3">Type 2 Diabetes (Ozempic)</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Ozempic is approved to improve blood sugar control in adults with type 2 diabetes, alongside diet and exercise. It's also approved to reduce cardiovascular risk in diabetic patients with known heart disease.
            </p>

            <h3 className="text-xl font-semibold mb-3">Chronic Weight Management (Wegovy)</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Wegovy is approved for adults with:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>BMI ≥30 (obesity), OR</li>
              <li>BMI ≥27 with at least one weight-related condition (high blood pressure, type 2 diabetes, high cholesterol)</li>
            </ul>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              In December 2023, Wegovy also received FDA approval for reducing cardiovascular risk in overweight/obese adults with established cardiovascular disease.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">Brand</th>
                    <th className="text-left p-3 font-semibold">Approved For</th>
                    <th className="text-left p-3 font-semibold">Max Dose</th>
                    <th className="text-left p-3 font-semibold">Form</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Ozempic</td>
                    <td className="p-3 text-muted-foreground">Type 2 diabetes</td>
                    <td className="p-3 text-muted-foreground">2mg weekly</td>
                    <td className="p-3 text-muted-foreground">Injection</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Wegovy</td>
                    <td className="p-3 text-muted-foreground">Weight management</td>
                    <td className="p-3 text-muted-foreground">2.4mg weekly</td>
                    <td className="p-3 text-muted-foreground">Injection</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Rybelsus</td>
                    <td className="p-3 text-muted-foreground">Type 2 diabetes</td>
                    <td className="p-3 text-muted-foreground">14mg daily</td>
                    <td className="p-3 text-muted-foreground">Oral tablet</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="clinical-trials" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Clinical Trial Results</h2>
            
            <h3 className="text-xl font-semibold mb-3">STEP Trials (Weight Loss)</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The STEP (Semaglutide Treatment Effect in People with obesity) program included multiple trials with thousands of participants:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li><strong>STEP 1:</strong> 1,961 adults without diabetes — 14.9% average weight loss at 68 weeks</li>
              <li><strong>STEP 2:</strong> 1,210 adults with diabetes — 9.6% average weight loss</li>
              <li><strong>STEP 3:</strong> With intensive behavioral therapy — 16% weight loss</li>
              <li><strong>STEP 4:</strong> Withdrawal study — patients regained 2/3 of lost weight after stopping</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">SELECT Trial (Cardiovascular)</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The SELECT trial was a landmark study following 17,604 overweight/obese adults with cardiovascular disease but without diabetes for over 4 years:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>20% reduction in major cardiovascular events (heart attack, stroke, cardiovascular death)</li>
              <li>Average 9.4% weight loss maintained over the study period</li>
              <li>Benefits seen regardless of starting weight</li>
            </ul>

            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>What this means for you:</strong> SELECT changed the conversation — semaglutide isn't just a weight loss drug, it's a cardiovascular medication. This is why insurance coverage is expanding.
              </p>
            </div>
          </section>

          <section id="side-effects" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Side Effects and Safety Data</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>Common side effects (occurring in &gt;5% of patients):</strong>
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Nausea (most common, usually improves over time)</li>
              <li>Diarrhea</li>
              <li>Vomiting</li>
              <li>Constipation</li>
              <li>Abdominal pain</li>
              <li>Headache</li>
              <li>Fatigue</li>
            </ul>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>Serious but rare risks:</strong>
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Pancreatitis (inflammation of pancreas)</li>
              <li>Gallbladder problems</li>
              <li>Kidney injury (usually from dehydration)</li>
              <li>Thyroid tumors (seen in rodent studies — FDA requires boxed warning)</li>
              <li>Diabetic retinopathy complications (in diabetes patients)</li>
            </ul>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>Contraindications:</strong> Personal or family history of medullary thyroid carcinoma or Multiple Endocrine Neoplasia syndrome type 2.
            </p>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Important:</strong> Most GI side effects occur during dose escalation and improve with time. Starting at low doses and titrating slowly minimizes discomfort.
              </p>
            </div>
          </section>

          <section id="cost-insurance" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Cost and Insurance Coverage</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>List prices (without insurance):</strong>
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Ozempic: ~$935/month</li>
              <li>Wegovy: ~$1,350/month</li>
            </ul>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>Insurance coverage:</strong>
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Ozempic for diabetes: Generally well-covered</li>
              <li>Wegovy for weight loss: Coverage varies widely</li>
              <li>Medicare Part D: Added coverage in 2024 for patients with cardiovascular disease</li>
              <li>Employer plans: Increasingly adding coverage after SELECT trial results</li>
            </ul>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>Patient savings programs:</strong> Novo Nordisk offers savings cards that can reduce costs to as low as $25/month for commercially insured patients.
            </p>
          </section>

          <section id="compounding-controversy" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">The Compounding Controversy</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              During the 2022-2024 shortage, the FDA placed semaglutide on the drug shortage list. This allowed compounding pharmacies to legally produce semaglutide copies under section 503A/503B of the Federal Food, Drug, and Cosmetic Act.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>What happened:</strong>
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Thousands of telehealth companies emerged offering "compounded semaglutide"</li>
              <li>Prices were significantly lower (~$200-400/month)</li>
              <li>Quality varied dramatically — some products were contaminated or underdosed</li>
              <li>FDA issued warnings about safety concerns</li>
            </ul>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <strong>Current status (January 2026):</strong> The FDA has resolved the semaglutide shortage. This means:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>Compounding pharmacies can no longer legally produce semaglutide</li>
              <li>Only brand-name Ozempic and Wegovy are legally available</li>
              <li>Products still being sold as "compounded semaglutide" are now illegal</li>
            </ul>
            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
              <p className="text-sm font-medium">
                <strong>What this means for you:</strong> If someone is offering you cheap semaglutide in 2026, it's either illegal, counterfeit, or both. The only legitimate options are brand-name products from Novo Nordisk.
              </p>
            </div>
          </section>

          <section id="vs-other-glp1s" className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Semaglutide vs Other GLP-1 Medications</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">Medication</th>
                    <th className="text-left p-3 font-semibold">Class</th>
                    <th className="text-left p-3 font-semibold">Avg Weight Loss</th>
                    <th className="text-left p-3 font-semibold">Dosing</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Semaglutide (Wegovy)</td>
                    <td className="p-3 text-muted-foreground">GLP-1</td>
                    <td className="p-3 text-muted-foreground">~15-17%</td>
                    <td className="p-3 text-muted-foreground">Weekly injection</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Tirzepatide (Zepbound)</td>
                    <td className="p-3 text-muted-foreground">GLP-1/GIP</td>
                    <td className="p-3 text-muted-foreground">~20-22%</td>
                    <td className="p-3 text-muted-foreground">Weekly injection</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Liraglutide (Saxenda)</td>
                    <td className="p-3 text-muted-foreground">GLP-1</td>
                    <td className="p-3 text-muted-foreground">~5-8%</td>
                    <td className="p-3 text-muted-foreground">Daily injection</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 font-medium">Dulaglutide (Trulicity)</td>
                    <td className="p-3 text-muted-foreground">GLP-1</td>
                    <td className="p-3 text-muted-foreground">~5%</td>
                    <td className="p-3 text-muted-foreground">Weekly injection</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Tirzepatide (Mounjaro/Zepbound) has shown higher average weight loss in head-to-head trials, but semaglutide has more long-term safety data and the SELECT cardiovascular outcomes trial.
            </p>
          </section>

          <section id="faq">
            <GuideFAQ items={faqItems} />
          </section>

          <BottomLineBox content="Semaglutide is an FDA-approved GLP-1 medication with robust clinical trial data showing 15-17% weight loss and cardiovascular benefits. As of 2026, only brand-name versions (Ozempic, Wegovy) are legally available — compounded versions are no longer permitted. Cost remains a barrier for many, but insurance coverage is expanding." />

          <RelatedGuides guides={relatedGuides} />

          <GuideCTA />

          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
