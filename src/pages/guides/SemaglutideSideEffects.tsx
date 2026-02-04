import { ArrowRight, AlertTriangle, Check, Clock, Utensils, Moon, Droplets, Activity, ThermometerSun } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GuideLayout } from "@/components/guides/GuideLayout";
import { QuickAnswerBox } from "@/components/guides/QuickAnswerBox";
import { GuideFAQ } from "@/components/guides/GuideFAQ";
import { GuideCTA } from "@/components/guides/GuideCTA";
import { SITE_URL } from "@/lib/seo";

const faqs = [
  {
    question: "How long does semaglutide nausea last?",
    answer: "For most people, nausea is worst during the first 2-4 weeks at each new dose and improves as your body adjusts. Mild nausea may persist but typically becomes manageable. If severe nausea lasts more than 2 weeks without improvement, consider staying at your current dose longer before increasing."
  },
  {
    question: "Can semaglutide cause hair loss?",
    answer: "Hair loss (telogen effluvium) has been reported by some users, but it's likely related to rapid weight loss rather than the medication itself. Rapid weight loss can shock hair follicles into a resting phase. This is usually temporary, and hair typically regrows once weight stabilizes. Ensuring adequate protein intake may help."
  },
  {
    question: "Does semaglutide make you tired?",
    answer: "Fatigue can occur, especially early in treatment or when eating significantly fewer calories. Your body is adjusting to burning stored fat instead of incoming food energy. Most people find energy levels normalize after 2-4 weeks. If fatigue persists, ensure you're eating enough protein and staying hydrated."
  },
  {
    question: "What foods should I avoid on semaglutide?",
    answer: "Avoid greasy, fatty, or fried foods as they worsen nausea. Limit high-sugar foods (they can cause dumping syndrome symptoms). Avoid large meals—smaller, frequent meals are better tolerated. Many people find they naturally lose interest in these foods anyway."
  },
  {
    question: "Will semaglutide side effects go away?",
    answer: "Yes, for most people. GI side effects like nausea, bloating, and constipation typically improve significantly after 4-8 weeks on a stable dose. Your body adapts to the medication over time. Side effects tend to recur briefly when increasing doses but again diminish with time."
  },
  {
    question: "Can I drink alcohol on semaglutide?",
    answer: "Alcohol is not contraindicated, but many people find their tolerance decreases significantly. Alcohol may worsen nausea and GI symptoms. It also adds empty calories that can slow weight loss. If you drink, start with much less than usual and see how you react."
  },
  {
    question: "When should I seek medical attention for side effects?",
    answer: "Seek immediate medical care for: severe abdominal pain that doesn't resolve, signs of pancreatitis (severe upper abdominal pain radiating to the back), persistent vomiting that prevents hydration, signs of allergic reaction (rash, difficulty breathing), or vision changes."
  }
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Semaglutide Side Effects: Complete Management Guide (2026)",
  description: "Complete guide to semaglutide side effects including nausea, fatigue, and GI issues. Learn what's normal, how to manage symptoms, and when to seek help.",
  author: {
    "@type": "Organization",
    name: "Peptide Playbook",
  },
  publisher: {
    "@type": "Organization",
    name: "Peptide Playbook",
    url: SITE_URL,
  },
  datePublished: "2025-01-15",
  dateModified: new Date().toISOString().split('T')[0],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const commonSideEffects = [
  { name: "Nausea", frequency: "~44%", severity: "common", management: "Eat smaller meals, avoid greasy foods, take at bedtime" },
  { name: "Vomiting", frequency: "~24%", severity: "common", management: "Stay hydrated, eat bland foods, slow down eating" },
  { name: "Diarrhea", frequency: "~30%", severity: "common", management: "Stay hydrated, avoid high-fat foods, may need electrolytes" },
  { name: "Constipation", frequency: "~24%", severity: "common", management: "Increase fiber, stay hydrated, consider stool softener" },
  { name: "Abdominal pain", frequency: "~20%", severity: "common", management: "Eat smaller portions, avoid trigger foods" },
  { name: "Fatigue", frequency: "~11%", severity: "moderate", management: "Ensure adequate protein, stay hydrated, get enough sleep" },
  { name: "Headache", frequency: "~14%", severity: "moderate", management: "Stay hydrated, monitor blood sugar if diabetic" },
];

const rareButSerious = [
  { name: "Pancreatitis", warning: "Severe upper abdominal pain radiating to back" },
  { name: "Gallbladder issues", warning: "Severe pain in upper right abdomen, especially after eating" },
  { name: "Hypoglycemia", warning: "Shakiness, sweating, confusion (mainly if on other diabetes meds)" },
  { name: "Kidney problems", warning: "Severe dehydration from vomiting/diarrhea can affect kidneys" },
  { name: "Allergic reactions", warning: "Rash, itching, difficulty breathing, swelling" },
];

export default function SemaglutideSideEffects() {
  return (
    <GuideLayout
      title="Semaglutide Side Effects: Complete Management Guide (2026)"
      description="Complete guide to semaglutide side effects including nausea, fatigue, and GI issues. Learn what's normal, how to manage symptoms, and when to seek help."
      slug="semaglutide-side-effects"
      articleSchema={articleSchema}
      faqSchema={faqSchema}
    >
      {/* Quick Answer */}
      <QuickAnswerBox 
        answer="The most common semaglutide side effects are GI-related: nausea (44%), diarrhea (30%), and constipation (24%). These typically improve after 4-8 weeks as your body adjusts. Managing with smaller meals and slow titration helps significantly."
        readTime="7 min read"
        lastUpdated="January 2026"
      />

      <article className="prose prose-gray dark:prose-invert max-w-none">
        <h1>Semaglutide Side Effects: What to Expect & How to Manage</h1>
        
        <p className="lead">
          Semaglutide is highly effective for weight loss, but most people experience some side effects—
          especially early in treatment. The good news: these effects typically improve with time and 
          can be managed with the right strategies.
        </p>

        {/* Timeline Overview */}
        <h2>Side Effect Timeline</h2>

        <div className="not-prose my-6">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-muted" />
            
            <div className="space-y-6">
              <div className="relative pl-10">
                <div className="absolute left-2 w-4 h-4 rounded-full bg-primary border-2 border-background" />
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Week 1-2
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Nausea and appetite suppression begin. This is when side effects are often 
                    strongest. Stay on the starting dose.
                  </p>
                </div>
              </div>

              <div className="relative pl-10">
                <div className="absolute left-2 w-4 h-4 rounded-full bg-primary/70 border-2 border-background" />
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold">Week 3-4</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Body begins adapting. Nausea typically reduces but may not disappear completely. 
                    Weight loss becomes noticeable.
                  </p>
                </div>
              </div>

              <div className="relative pl-10">
                <div className="absolute left-2 w-4 h-4 rounded-full bg-primary/50 border-2 border-background" />
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold">Week 5-8</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    First dose increase. Side effects may briefly return but usually milder than 
                    initial weeks. Most people feel significantly better.
                  </p>
                </div>
              </div>

              <div className="relative pl-10">
                <div className="absolute left-2 w-4 h-4 rounded-full bg-primary/30 border-2 border-background" />
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold">Week 9+</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    For most people, GI side effects have significantly improved. The "new normal" 
                    is established.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Common Side Effects Table */}
        <h2>Common Side Effects & Frequencies</h2>

        <div className="not-prose my-6 overflow-x-auto">
          <table className="w-full text-sm border rounded-lg overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3 font-semibold">Side Effect</th>
                <th className="text-left p-3 font-semibold">Frequency</th>
                <th className="text-left p-3 font-semibold">Management</th>
              </tr>
            </thead>
            <tbody>
              {commonSideEffects.map((effect, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3 font-medium">{effect.name}</td>
                  <td className="p-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
                      {effect.frequency}
                    </span>
                  </td>
                  <td className="p-3 text-muted-foreground">{effect.management}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Management Strategies */}
        <h2>How to Minimize Side Effects</h2>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          <div className="border rounded-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Utensils className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold">Eating Strategies</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Eat smaller, more frequent meals</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Avoid greasy, fried, and fatty foods</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Eat slowly and stop when satisfied, not full</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Prioritize protein at every meal</span>
              </li>
            </ul>
          </div>

          <div className="border rounded-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold">Hydration</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Drink at least 64oz (2L) water daily</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Sip water throughout the day, not large amounts at once</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Consider electrolytes if experiencing diarrhea</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Avoid sugary drinks and excessive caffeine</span>
              </li>
            </ul>
          </div>

          <div className="border rounded-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Moon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold">Timing Tips</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Consider evening injections to sleep through initial nausea</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Inject before a lighter eating day if possible</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Don't increase dose before important events</span>
              </li>
            </ul>
          </div>

          <div className="border rounded-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold">Lifestyle</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Light walking can help with nausea</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Avoid lying down immediately after eating</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Get adequate sleep (7-9 hours)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Serious Side Effects */}
        <h2>Rare but Serious Side Effects</h2>

        <div className="not-prose my-6 p-4 rounded-lg border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
            <h3 className="font-semibold text-red-800 dark:text-red-200">
              Seek Medical Attention For:
            </h3>
          </div>
          <div className="space-y-3">
            {rareButSerious.map((item, index) => (
              <div key={index} className="flex items-start gap-3 text-sm">
                <span className="font-medium text-red-800 dark:text-red-200 min-w-[120px]">
                  {item.name}:
                </span>
                <span className="text-red-700 dark:text-red-300">{item.warning}</span>
              </div>
            ))}
          </div>
        </div>

        <p>
          These serious side effects are rare but require immediate medical attention. The vast 
          majority of semaglutide users experience only the common GI side effects that improve 
          with time.
        </p>

        {/* When to Slow Down */}
        <h2>When to Stay at Your Current Dose</h2>
        <p>
          You don't have to increase your dose on schedule. Consider staying at your current dose if:
        </p>

        <ul>
          <li>Nausea hasn't improved after 4 weeks at the current dose</li>
          <li>You're experiencing frequent vomiting (more than once per week)</li>
          <li>You're losing weight steadily and feeling good</li>
          <li>Side effects are significantly impacting your daily life</li>
        </ul>

        <p>
          The goal is sustainable weight loss, not racing to the highest dose. Many people achieve 
          excellent results at 1.0mg without ever needing higher doses.
        </p>

        {/* Related Content */}
        <h2>Related Guides</h2>
      </article>

      <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
        <Link 
          to="/guides/semaglutide-dosing"
          className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
        >
          <Clock className="w-5 h-5 text-primary" />
          <div>
            <p className="font-medium">Semaglutide Dosing Guide</p>
            <p className="text-sm text-muted-foreground">Titration schedule and calculator</p>
          </div>
          <ArrowRight className="w-4 h-4 ml-auto" />
        </Link>
        <Link 
          to="/guides/semaglutide-complete-guide"
          className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
        >
          <Activity className="w-5 h-5 text-primary" />
          <div>
            <p className="font-medium">Complete Semaglutide Guide</p>
            <p className="text-sm text-muted-foreground">How it works, research, and results</p>
          </div>
          <ArrowRight className="w-4 h-4 ml-auto" />
        </Link>
      </div>

      {/* FAQ Section */}
      <GuideFAQ items={faqs} />

      {/* CTA */}
      <GuideCTA />
    </GuideLayout>
  );
}
