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
  { id: "how-peptides-work", title: "How Peptides Target Weight Loss", level: 2 },
  { id: "semaglutide", title: "Semaglutide (Ozempic/Wegovy)", level: 2 },
  { id: "tirzepatide", title: "Tirzepatide (Mounjaro/Zepbound)", level: 2 },
  { id: "aod-9604", title: "AOD-9604 (HGH Fragment)", level: 2 },
  { id: "mots-c", title: "MOTS-c (Mitochondrial Peptide)", level: 2 },
  { id: "tesamorelin", title: "Tesamorelin (Egrifta)", level: 2 },
  { id: "cjc-ipamorelin", title: "CJC-1295 + Ipamorelin Stack", level: 2 },
  { id: "comparison-table", title: "Comparison Table", level: 2 },
  { id: "which-peptide", title: "Which Peptide for Your Goals?", level: 2 },
  { id: "faq", title: "FAQ", level: 2 },
  { id: "references", title: "References", level: 2 },
];

const faqItems = [
  {
    question: "What is the most effective peptide for weight loss?",
    answer: "Tirzepatide (Zepbound) has shown the highest efficacy in clinical trials, achieving up to 22.5% body weight loss over 72 weeks in the SURMOUNT-1 trial. Semaglutide (Wegovy) is also highly effective at 14.9% weight loss over 68 weeks (STEP 1 trial). Both are FDA-approved and require a prescription."
  },
  {
    question: "Are weight loss peptides safe?",
    answer: "FDA-approved options like semaglutide and tirzepatide have been evaluated in large clinical trials with thousands of participants. Common side effects include GI symptoms (nausea, diarrhea, vomiting). Research peptides like AOD-9604 and MOTS-c have more limited safety data. Always consult a healthcare provider before use."
  },
  {
    question: "Do you regain weight after stopping weight loss peptides?",
    answer: "Yes, weight regain is common. The STEP 1 extension study showed that approximately two-thirds of lost weight was regained within one year of stopping semaglutide. Lifestyle modifications during treatment can improve long-term outcomes, but these medications typically require ongoing use for weight maintenance."
  },
  {
    question: "What is AOD-9604?",
    answer: "AOD-9604 is a modified fragment of human growth hormone (amino acids 176-191) that targets fat metabolism without the metabolic side effects of full HGH. It's TGA-approved in Australia but not FDA-approved in the US. Research suggests it stimulates fat breakdown and inhibits fat creation without affecting blood sugar or insulin."
  },
  {
    question: "Can I combine multiple weight loss peptides?",
    answer: "Combining multiple peptides increases complexity and potential interaction risks. GLP-1 agonists (semaglutide, tirzepatide) should not be combined with each other without medical supervision. Some practitioners combine GH secretagogues with GLP-1s, but this should only be done under healthcare provider guidance."
  },
  {
    question: "How fast do weight loss peptides work?",
    answer: "GLP-1 agonists: meaningful weight loss typically begins within 8-12 weeks at therapeutic doses. Semaglutide requires a 16-week titration period to reach the full 2.4mg dose. AOD-9604: body composition changes may be noticeable in 4-8 weeks with consistent use."
  },
  {
    question: "Are peptides better than traditional weight loss methods?",
    answer: "Clinical trials show semaglutide and tirzepatide produce significantly more weight loss than diet and exercise alone. However, the best results combine medication with lifestyle changes. These are tools, not replacements for healthy habits, and typically require ongoing use."
  },
  {
    question: "What is the cheapest weight loss peptide option?",
    answer: "Research peptides like AOD-9604 and CJC/Ipamorelin cost $50-200/month, compared to $1,000-1,350/month for branded GLP-1 medications. However, research peptides lack the robust clinical trial evidence and FDA oversight of approved medications. Cost shouldn't be the primary factor in healthcare decisions."
  },
];

const relatedGuides = [
  { title: "Semaglutide Complete Guide", href: "/guides/semaglutide-complete-guide", description: "GLP-1 mechanism and research" },
  { title: "Tirzepatide vs Semaglutide", href: "/guides/tirzepatide-vs-semaglutide", description: "Head-to-head comparison" },
  { title: "What Are Peptides?", href: "/guides/what-are-peptides", description: "Complete beginner overview" },
  { title: "Peptides for Beginners", href: "/guides/peptides-for-beginners", description: "Start here if you're new" },
  { title: "HGH Fragment (AOD-9604) Guide", href: "/guides/hgh-fragment", description: "Deep dive on the fat-targeting peptide" },
];

const changelogEntries = [
  { date: "Feb 5, 2026", change: "Complete guide rewrite with STEP and SURMOUNT trial data" },
];

const references = [
  { number: 1, text: "Wilding JPH, Batterham RL, Calanna S, et al. Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1). N Engl J Med. 2021;384:989-1002.", url: "https://pubmed.ncbi.nlm.nih.gov/33567185/" },
  { number: 2, text: "Jastreboff AM, Aronne LJ, Ahmad NN, et al. Tirzepatide Once Weekly for the Treatment of Obesity (SURMOUNT-1). N Engl J Med. 2022;387:205-216.", url: "https://pubmed.ncbi.nlm.nih.gov/35658024/" },
  { number: 3, text: "Heffernan MA, Thorburn AW, Fam B, et al. Effects of oral administration of a synthetic fragment of human growth hormone on lipid metabolism. Am J Physiol Endocrinol Metab. 2001;281(5):E1159-67.", url: "https://pubmed.ncbi.nlm.nih.gov/11595661/" },
  { number: 4, text: "Lee C, Zeng J, Drew BG, et al. The Mitochondrial-Derived Peptide MOTS-c Promotes Metabolic Homeostasis and Reduces Obesity and Insulin Resistance. Cell Metab. 2015;21(3):443-454.", url: "https://pubmed.ncbi.nlm.nih.gov/25738459/" },
  { number: 5, text: "Falutz J, Allas S, Blot K, et al. Metabolic effects of a growth hormone-releasing factor in patients with HIV. N Engl J Med. 2007;357:2359-70.", url: "https://pubmed.ncbi.nlm.nih.gov/18057338/" },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Best Peptides for Weight Loss (2026): Complete Research Guide",
  datePublished: "2026-02-05",
  dateModified: "2026-02-27",
  author: { "@type": "Organization", name: "Peptide Playbook" },
  publisher: { "@type": "Organization", name: "Peptide Playbook", url: SITE_URL },
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

export default function BestPeptidesWeightLoss() {
  return (
    <GuideLayout
      title="Best Peptides for Weight Loss (2026): Complete Research Guide"
      description="Compare semaglutide (14.9% weight loss), tirzepatide (22.5%), AOD-9604, MOTS-c, and other peptides. Evidence-based analysis of mechanisms, trials, and costs."
      slug="best-peptides-weight-loss"
      articleSchema={articleSchema}
      faqSchema={faqSchema}
    >
      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="lg:w-64 shrink-0">
          <GuideTableOfContents items={tocItems} />
        </aside>

        <article className="flex-1 min-w-0">
          <QuickAnswerBox
            answer="The most researched peptides for weight loss include Semaglutide and Tirzepatide (both FDA-approved), AOD-9604, MOTS-c, and Tesamorelin. Semaglutide trials show 14.9% body weight loss over 68 weeks; Tirzepatide achieved up to 22.5% in the SURMOUNT-1 trial. GLP-1 agonists work through appetite suppression and delayed gastric emptying."
            lastUpdated="February 2026"
            readTime="16 min"
          />

          <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-6">
            Best Peptides for Weight Loss (2026): Complete Research Guide
          </h1>

          <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
            The best peptides for weight loss in 2026 are tirzepatide (Zepbound), semaglutide (Wegovy), and liraglutide (Saxenda) — all FDA-approved GLP-1 receptor agonists with clinical evidence showing 15-22.5% body weight reduction. Non-GLP-1 options like AOD-9604 and tesamorelin show promise in preclinical research but lack FDA approval for weight loss. This guide ranks every weight loss peptide by evidence strength, safety profile, and legal status.
          </p>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Below we examine the clinical trial data, mechanisms of action, realistic expectations, costs, and the important distinctions between approved medications and research peptides.
          </p>

          {/* Section: How Peptides Target Weight Loss */}
          <section id="how-peptides-work" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">How Peptides Target Weight Loss</h2>
            <p className="text-muted-foreground mb-4">
              Peptides influence body weight through four primary mechanisms, and understanding these pathways helps explain why different peptides produce different effects:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-3 mb-4">
              <li><strong>Appetite suppression (GLP-1 agonists):</strong> Semaglutide and tirzepatide mimic incretin hormones that signal satiety to the brain. They slow gastric emptying, making you feel full longer, and act on hypothalamic appetite centers to reduce hunger and food cravings.</li>
              <li><strong>Fat-specific lipolysis (HGH fragments):</strong> AOD-9604 and similar peptides target fat tissue directly, stimulating the breakdown of stored triglycerides without the metabolic side effects of full growth hormone.</li>
              <li><strong>Mitochondrial metabolism (MOTS-c):</strong> This mitochondrial-derived peptide activates AMPK (the cellular energy sensor) and enhances fat oxidation, functioning as an "exercise mimetic."</li>
              <li><strong>Growth hormone stimulation (secretagogues):</strong> CJC-1295 and Ipamorelin increase natural GH production, which indirectly improves body composition through enhanced lipolysis and lean mass preservation.</li>
            </ul>
            <p className="text-muted-foreground">
              <strong>Important distinction:</strong> FDA-approved peptides (semaglutide, tirzepatide, tesamorelin) have undergone rigorous Phase 3 clinical trials with thousands of participants. Research peptides (AOD-9604, MOTS-c, CJC/Ipa) have more limited human data and are not approved for weight loss treatment.
            </p>
          </section>

          {/* Section: Semaglutide */}
          <section id="semaglutide" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Semaglutide (Ozempic/Wegovy)</h2>
            <p className="text-muted-foreground mb-4">
              Semaglutide is a GLP-1 receptor agonist that revolutionized obesity treatment. Originally developed for type 2 diabetes (Ozempic), it was subsequently approved for weight management at higher doses (Wegovy).
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Mechanism:</strong> Semaglutide mimics glucagon-like peptide-1 (GLP-1), a hormone released after eating. It slows gastric emptying, reduces appetite through hypothalamic signaling, and improves insulin sensitivity.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Clinical Evidence:</strong>
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li><strong>STEP 1 Trial:</strong> 14.9% mean body weight loss over 68 weeks vs 2.4% with placebo<sup className="text-primary cursor-pointer hover:underline"><a href="#ref-1">1</a></sup></li>
              <li><strong>STEP 3 Trial</strong> (with intensive behavioral therapy): 16% mean weight loss</li>
              <li>86% of participants achieved ≥5% weight loss (vs 32% placebo)</li>
              <li>Improvements in cardiometabolic markers including blood pressure, lipids, and HbA1c</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              <strong>Dosing:</strong> Wegovy is titrated over 16 weeks: 0.25mg → 0.5mg → 1mg → 1.7mg → 2.4mg weekly. Subcutaneous injection once weekly.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Side Effects:</strong> Nausea (44%), diarrhea (30%), vomiting (24%), constipation (24%). Most GI symptoms improve over time. Black box warning for thyroid C-cell tumors (observed in rodent studies).
            </p>
            <p className="text-muted-foreground">
              <strong>Cost:</strong> $1,000-1,350/month without insurance. Coverage varies significantly by payer.
            </p>
          </section>

          {/* Section: Tirzepatide */}
          <section id="tirzepatide" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Tirzepatide (Mounjaro/Zepbound)</h2>
            <p className="text-muted-foreground mb-4">
              Tirzepatide is a first-in-class dual GIP/GLP-1 receptor agonist. This dual mechanism appears to provide superior efficacy compared to GLP-1 agonists alone.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Mechanism:</strong> Tirzepatide activates both GIP (glucose-dependent insulinotropic polypeptide) and GLP-1 receptors. The combination enhances insulin secretion, reduces glucagon, slows gastric emptying, and provides more potent appetite suppression than GLP-1 activation alone.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Clinical Evidence:</strong>
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li><strong>SURMOUNT-1 Trial:</strong> Up to 22.5% mean body weight loss at the 15mg dose over 72 weeks<sup className="text-primary cursor-pointer hover:underline"><a href="#ref-2">2</a></sup></li>
              <li>At 10mg dose: 19.5% weight loss; at 5mg dose: 15% weight loss</li>
              <li>Superior to semaglutide in SURPASS head-to-head trials for diabetes</li>
              <li>63% of participants at 15mg achieved ≥20% weight loss (vs 1.3% placebo)</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              <strong>Dosing:</strong> Titrated from 2.5mg → 5mg → 7.5mg → 10mg → 12.5mg → 15mg weekly over several months. Subcutaneous injection once weekly.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Side Effects:</strong> Similar to semaglutide—nausea, diarrhea, vomiting, constipation. Some data suggests potentially lower nausea rates than semaglutide at equivalent efficacy.
            </p>
            <p className="text-muted-foreground">
              <strong>Cost:</strong> $1,000-1,100/month without insurance.
            </p>
          </section>

          <KeyTakeawayBox content="Semaglutide and Tirzepatide are the only FDA-approved peptide weight loss medications. Tirzepatide shows superior results in trials (22.5% vs 14.9% weight loss). Both require ongoing use—most patients regain weight if they stop treatment." />

          {/* Section: AOD-9604 */}
          <section id="aod-9604" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">AOD-9604 (HGH Fragment 176-191)</h2>
            <p className="text-muted-foreground mb-4">
              AOD-9604 is a modified fragment of human growth hormone, consisting of amino acids 176-191. It was designed to retain the fat-metabolizing properties of HGH while eliminating the effects on blood sugar, insulin, and IGF-1.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Mechanism:</strong> AOD-9604 stimulates lipolysis (fat breakdown) and inhibits lipogenesis (fat creation) in adipose tissue. Unlike full HGH, it does not cause insulin resistance, water retention, or elevated IGF-1 levels.<sup className="text-primary cursor-pointer hover:underline"><a href="#ref-3">3</a></sup>
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Regulatory Status:</strong> AOD-9604 is <strong>not FDA-approved</strong>. It is TGA-approved in Australia for certain applications. In the US, it's available as a research peptide only.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Research Evidence:</strong> Animal studies show fat reduction without the metabolic side effects of HGH. Human data is limited compared to GLP-1 agonists. Oral formulations have been studied.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Research Dosing:</strong> 250-500mcg daily, subcutaneous injection, typically morning on an empty stomach.
            </p>
            <p className="text-muted-foreground">
              <strong>Cost:</strong> $50-150/month for research peptides (varies by source and purity).
            </p>
            <p className="text-muted-foreground mt-4">
              For more detail, see our <Link to="/guides/hgh-fragment" className="text-primary hover:underline">HGH Fragment Guide</Link>.
            </p>
          </section>

          {/* Section: MOTS-c */}
          <section id="mots-c" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">MOTS-c (Mitochondrial Peptide)</h2>
            <p className="text-muted-foreground mb-4">
              MOTS-c (Mitochondrial Open Reading Frame of the 12S rRNA-c) is a mitochondrial-derived peptide that regulates metabolic homeostasis. It has been called an "exercise mimetic" due to its ability to activate metabolic pathways similar to physical exercise.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Mechanism:</strong> MOTS-c activates AMPK (AMP-activated protein kinase), the cellular energy sensor that's also activated by exercise and caloric restriction. This leads to improved insulin sensitivity, enhanced fat oxidation, and increased glucose uptake by skeletal muscle.<sup className="text-primary cursor-pointer hover:underline"><a href="#ref-4">4</a></sup>
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Research Evidence:</strong>
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>Animal studies: Prevented diet-induced obesity in mice</li>
              <li>Improved insulin sensitivity and glucose metabolism</li>
              <li>2024 human study: Improved metabolic markers in older adults</li>
              <li>Very early-stage for weight loss applications</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              <strong>Research Dosing:</strong> 5-10mg subcutaneous injection, 3-5x per week.
            </p>
            <p className="text-muted-foreground">
              <strong>Important:</strong> MOTS-c is not FDA-approved and has minimal human clinical trial data. It represents an emerging research area rather than an established treatment.
            </p>
          </section>

          {/* Section: Tesamorelin */}
          <section id="tesamorelin" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Tesamorelin (Egrifta)</h2>
            <p className="text-muted-foreground mb-4">
              Tesamorelin is a growth hormone-releasing hormone (GHRH) analog that stimulates the pituitary to produce its own growth hormone. It's FDA-approved specifically for reducing visceral adipose tissue (VAT) in HIV-associated lipodystrophy.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Mechanism:</strong> By mimicking GHRH, tesamorelin triggers physiological GH release, which then promotes lipolysis, particularly in visceral fat depots.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Clinical Evidence:</strong> Phase 3 trials showed 15-18% reduction in visceral abdominal fat over 26 weeks in HIV patients with lipodystrophy.<sup className="text-primary cursor-pointer hover:underline"><a href="#ref-5">5</a></sup>
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Dosing:</strong> 2mg subcutaneous injection daily.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Side Effects:</strong> Injection site reactions, joint pain, peripheral edema. Contraindicated with active malignancy.
            </p>
            <p className="text-muted-foreground">
              <strong>Cost:</strong> $800-1,200/month. Indicated specifically for HIV lipodystrophy—off-label use for general weight loss is not approved.
            </p>
          </section>

          <KeyTakeawayBox content="Research peptides (AOD-9604, MOTS-c) cost $50-200/month compared to $1,000+ for FDA-approved GLP-1s. However, they lack robust clinical trial evidence and regulatory oversight. Cost shouldn't be the primary factor—efficacy and safety data differ dramatically." />

          {/* Section: CJC-1295 + Ipamorelin Stack */}
          <section id="cjc-ipamorelin" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">CJC-1295 + Ipamorelin Stack</h2>
            <p className="text-muted-foreground mb-4">
              This combination of a GHRH analog (CJC-1295) and a selective ghrelin mimetic (Ipamorelin) is popular for enhancing natural growth hormone production. While not primarily a weight loss protocol, improved GH levels can positively affect body composition.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Mechanism:</strong> CJC-1295 stimulates GH release via the GHRH receptor. Ipamorelin activates the ghrelin receptor (GHS-R) to amplify the signal. Together, they produce synergistic GH elevation while maintaining a more natural pulsatile release pattern.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Body Composition Effects:</strong> Improved lipolysis, preservation of lean mass during caloric restriction, enhanced recovery. These are indirect weight loss effects—not the primary fat loss seen with GLP-1 agonists.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Research Dosing:</strong> CJC-1295 (no DAC) 100mcg + Ipamorelin 100-300mcg, administered together, typically before bed.
            </p>
            <p className="text-muted-foreground">
              <strong>Regulatory Status:</strong> Not FDA-approved. Available as research peptides only. See our <Link to="/guides/hgh-peptides" className="text-primary hover:underline">HGH Peptides Guide</Link> for detailed information.
            </p>
          </section>

          {/* Section: Comparison Table */}
          <section id="comparison-table" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Weight Loss Peptides Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold">Peptide</th>
                    <th className="text-left py-3 px-4 font-semibold">Mechanism</th>
                    <th className="text-left py-3 px-4 font-semibold">FDA Status</th>
                    <th className="text-left py-3 px-4 font-semibold">Weight Loss Evidence</th>
                    <th className="text-left py-3 px-4 font-semibold">Admin</th>
                    <th className="text-left py-3 px-4 font-semibold">Monthly Cost</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border/50">
                    <td className="py-3 px-4 font-medium">Semaglutide</td>
                    <td className="py-3 px-4">GLP-1 agonist</td>
                    <td className="py-3 px-4">✅ Approved</td>
                    <td className="py-3 px-4">14.9% (STEP 1)</td>
                    <td className="py-3 px-4">Weekly SC</td>
                    <td className="py-3 px-4">$1,000-1,350</td>
                  </tr>
                  <tr className="border-t border-border/50">
                    <td className="py-3 px-4 font-medium">Tirzepatide</td>
                    <td className="py-3 px-4">Dual GIP/GLP-1</td>
                    <td className="py-3 px-4">✅ Approved</td>
                    <td className="py-3 px-4">22.5% (SURMOUNT-1)</td>
                    <td className="py-3 px-4">Weekly SC</td>
                    <td className="py-3 px-4">$1,000-1,100</td>
                  </tr>
                  <tr className="border-t border-border/50">
                    <td className="py-3 px-4 font-medium">AOD-9604</td>
                    <td className="py-3 px-4">HGH fragment</td>
                    <td className="py-3 px-4">❌ Not approved</td>
                    <td className="py-3 px-4">Moderate (limited data)</td>
                    <td className="py-3 px-4">Daily SC</td>
                    <td className="py-3 px-4">$50-150</td>
                  </tr>
                  <tr className="border-t border-border/50">
                    <td className="py-3 px-4 font-medium">MOTS-c</td>
                    <td className="py-3 px-4">AMPK activation</td>
                    <td className="py-3 px-4">❌ Not approved</td>
                    <td className="py-3 px-4">Early-stage</td>
                    <td className="py-3 px-4">3-5x/week SC</td>
                    <td className="py-3 px-4">$100-200</td>
                  </tr>
                  <tr className="border-t border-border/50">
                    <td className="py-3 px-4 font-medium">Tesamorelin</td>
                    <td className="py-3 px-4">GHRH analog</td>
                    <td className="py-3 px-4">✅ (lipodystrophy)</td>
                    <td className="py-3 px-4">15-18% visceral fat</td>
                    <td className="py-3 px-4">Daily SC</td>
                    <td className="py-3 px-4">$800-1,200</td>
                  </tr>
                  <tr className="border-t border-border/50">
                    <td className="py-3 px-4 font-medium">CJC/Ipamorelin</td>
                    <td className="py-3 px-4">GH secretagogue</td>
                    <td className="py-3 px-4">❌ Not approved</td>
                    <td className="py-3 px-4">Indirect</td>
                    <td className="py-3 px-4">Daily SC</td>
                    <td className="py-3 px-4">$100-200</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section: Which Peptide */}
          <section id="which-peptide" className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Which Peptide for Your Goals?</h2>
            <p className="text-muted-foreground mb-4">
              Choosing the right approach depends on your specific goals, access to medical care, and preferences:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-3">
              <li><strong>Primary fat loss with clinical evidence:</strong> Semaglutide or Tirzepatide (prescription required, strongest data)</li>
              <li><strong>Targeted fat loss without GH effects:</strong> AOD-9604 (research peptide, limited data)</li>
              <li><strong>Metabolic health + performance:</strong> MOTS-c (very early-stage research)</li>
              <li><strong>Body composition + anti-aging:</strong> CJC-1295/Ipamorelin (indirect weight effects)</li>
              <li><strong>HIV lipodystrophy:</strong> Tesamorelin (FDA-approved for this indication)</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              <strong>Important:</strong> This is educational information, not medical advice. Consult a healthcare provider before starting any weight loss protocol.
            </p>
          </section>

          <KeyTakeawayBox content="For maximum evidence-based weight loss, FDA-approved GLP-1 agonists (semaglutide, tirzepatide) are the gold standard. Research peptides offer lower cost but have significantly less clinical validation. All require lifestyle changes for best results." />

          <GuideChangelog entries={changelogEntries} />
          <GuideFAQ items={faqItems} />
          <References references={references} />

          <BottomLineBox content="Tirzepatide and semaglutide represent the most effective evidence-based peptide treatments for weight loss, with clinical trials showing 22.5% and 14.9% weight loss respectively. Both are FDA-approved but expensive ($1,000+/month) and require ongoing use—weight typically returns when treatment stops. Research peptides like AOD-9604 and MOTS-c offer lower-cost alternatives but have limited human data. The best approach combines medication with sustainable lifestyle changes." />

          <RelatedGuides guides={relatedGuides} />
          <GuideCTA />
          <GuideDisclaimer />
        </article>
      </div>
    </GuideLayout>
  );
}
