import { ArrowRight, Calculator, AlertCircle, Check, Calendar, TrendingUp, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GuideLayout } from "@/components/guides/GuideLayout";
import { QuickAnswerBox } from "@/components/guides/QuickAnswerBox";
import { GuideFAQ } from "@/components/guides/GuideFAQ";
import { GuideCTA } from "@/components/guides/GuideCTA";
import { DosingCalculator } from "@/components/dashboard/DosingCalculator";
import { SITE_URL } from "@/lib/seo";

const faqs = [
  {
    question: "How many units is 0.25mg of semaglutide?",
    answer: "For a 5mg vial reconstituted with 2ml of bacteriostatic water: 0.25mg = 10 units. For the same vial with 1ml of water: 0.25mg = 5 units. The calculation is: (desired dose ÷ vial size) × water amount × 100 = units."
  },
  {
    question: "What happens if I miss a semaglutide dose?",
    answer: "If you miss a dose by less than 5 days: Take it as soon as you remember, then resume your regular schedule. If more than 5 days have passed: Skip the missed dose and take your next dose on the regularly scheduled day. Do not double up doses."
  },
  {
    question: "Can I take semaglutide twice a week?",
    answer: "Semaglutide is designed for once-weekly dosing. Its half-life is approximately 7 days, which maintains stable blood levels with weekly administration. Taking it twice weekly could lead to higher blood concentrations and increased side effects without additional benefit."
  },
  {
    question: "How long does it take for semaglutide to work?",
    answer: "Most people notice reduced appetite within the first 1-2 weeks. Weight loss typically begins during weeks 2-4. The medication reaches steady-state blood levels after about 4-5 weeks of consistent dosing. Maximum effects are usually seen after titrating to the full maintenance dose."
  },
  {
    question: "Should I inject semaglutide in the morning or at night?",
    answer: "Semaglutide can be injected at any time of day, with or without meals. The key is consistency—choose a time that you can stick to each week. Some people prefer mornings for routine consistency; others prefer evenings if they experience nausea, so they can sleep through it."
  },
  {
    question: "What if I need to delay my dose by a few days?",
    answer: "If you need to delay by 1-2 days, that's generally fine—just adjust your future doses to the new day. If the delay would exceed 5 days from your last dose, skip that week's dose entirely and resume on your next scheduled day. Always aim for consistent weekly dosing."
  },
  {
    question: "Can I change my injection day?",
    answer: "Yes, you can change your injection day. Ensure at least 48 hours have passed since your last dose before taking the new dose. Then continue weekly from that new day. For example, if you switch from Monday to Friday, wait at least 2 days before your Friday dose."
  }
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Semaglutide Dosing Guide: Complete Titration Schedule & Calculator (2026)",
  description: "Complete semaglutide dosing guide with titration schedule, dose calculator, and what to do if you miss a dose. Research-based protocols for weight loss.",
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

const titrationSchedule = [
  { weeks: "1-4", dose: "0.25 mg", units5mg2ml: 10, purpose: "Tolerance building" },
  { weeks: "5-8", dose: "0.5 mg", units5mg2ml: 20, purpose: "Appetite reduction begins" },
  { weeks: "9-12", dose: "1.0 mg", units5mg2ml: 40, purpose: "Full therapeutic effect" },
  { weeks: "13-16", dose: "1.7 mg", units5mg2ml: 68, purpose: "Enhanced weight loss (optional)" },
  { weeks: "17+", dose: "2.4 mg", units5mg2ml: 96, purpose: "Maximum dose (Wegovy)" },
];

export default function SemaglutideDosing() {
  return (
    <GuideLayout
      title="Semaglutide Dosing Guide: Complete Titration Schedule & Calculator (2026)"
      description="Complete semaglutide dosing guide with titration schedule, dose calculator, and what to do if you miss a dose. Research-based protocols for weight loss."
      slug="semaglutide-dosing"
      articleSchema={articleSchema}
      faqSchema={faqSchema}
    >
      {/* Quick Answer */}
      <QuickAnswerBox 
        answer="Semaglutide dosing starts at 0.25mg weekly for 4 weeks, then increases to 0.5mg, 1.0mg, and optionally higher doses. For a 5mg vial with 2ml water: 0.25mg = 10 units, 0.5mg = 20 units, 1.0mg = 40 units."
        readTime="6 min read"
        lastUpdated="January 2026"
      />

      <article className="prose prose-gray dark:prose-invert max-w-none">
        <h1>Semaglutide Dosing Guide: Complete Titration Schedule</h1>
        
        <p className="lead">
          Semaglutide is dosed once weekly and requires gradual titration (dose increases) to minimize 
          side effects. This guide covers the standard dosing protocol, how to calculate units for 
          injection, and what to do if you miss a dose.
        </p>

        {/* Why Titration Matters */}
        <h2>Why Gradual Dose Increases Matter</h2>
        <p>
          Semaglutide affects your digestive system in ways that can cause nausea, especially early on. 
          Starting at a low dose gives your body time to adapt. The standard protocol increases your 
          dose every 4 weeks until you reach your target dose.
        </p>

        <div className="not-prose my-6 p-4 rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div className="text-sm text-amber-800 dark:text-amber-200">
              <strong>Key Point:</strong> Do not skip the titration period. Starting at higher doses 
              significantly increases the risk of nausea, vomiting, and other GI side effects that 
              may cause you to discontinue treatment.
            </div>
          </div>
        </div>

        {/* Titration Schedule Table */}
        <h2>Standard Titration Schedule</h2>

        <div className="not-prose my-6 overflow-x-auto">
          <table className="w-full text-sm border rounded-lg overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-3 font-semibold">Weeks</th>
                <th className="text-left p-3 font-semibold">Weekly Dose</th>
                <th className="text-left p-3 font-semibold">Units (5mg/2ml)</th>
                <th className="text-left p-3 font-semibold">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {titrationSchedule.map((row, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3 font-medium">{row.weeks}</td>
                  <td className="p-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {row.dose}
                    </span>
                  </td>
                  <td className="p-3 font-mono">{row.units5mg2ml} units</td>
                  <td className="p-3 text-muted-foreground">{row.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>
          <strong>Note:</strong> The units shown assume a 5mg vial reconstituted with 2ml of 
          bacteriostatic water. Different water amounts will change the units needed—use the 
          calculator below for your specific setup.
        </p>

        {/* Dosing Calculator */}
        <h2>Calculate Your Dose</h2>
        <p>
          Enter your vial size and water amount to see exactly how many units to draw for each dose level:
        </p>

        <div className="not-prose my-6">
          <DosingCalculator 
            defaultVialSize={5} 
            defaultWaterMl={2} 
            doseTiers={[0.25, 0.5, 1.0]} 
          />
        </div>

        <div className="not-prose my-4">
          <Link 
            to="/tools/peptide-calculator"
            className="inline-flex items-center gap-2 text-primary hover:underline text-sm"
          >
            <Calculator className="w-4 h-4" />
            Open full calculator with custom dose input →
          </Link>
        </div>

        {/* When to Inject */}
        <h2>When to Inject</h2>

        <div className="not-prose grid md:grid-cols-3 gap-4 my-6">
          <div className="border rounded-lg p-4 text-center">
            <Calendar className="w-8 h-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold mb-1">Same Day Weekly</h3>
            <p className="text-sm text-muted-foreground">Choose one day and stick to it</p>
          </div>
          <div className="border rounded-lg p-4 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold mb-1">Any Time of Day</h3>
            <p className="text-sm text-muted-foreground">Morning or evening—your choice</p>
          </div>
          <div className="border rounded-lg p-4 text-center">
            <Scale className="w-8 h-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold mb-1">With or Without Food</h3>
            <p className="text-sm text-muted-foreground">Meals don't affect absorption</p>
          </div>
        </div>

        {/* Missed Dose Protocol */}
        <h2>What to Do If You Miss a Dose</h2>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          <div className="border border-primary/30 rounded-lg p-4 bg-primary/5">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Check className="w-5 h-5 text-primary" />
              Less Than 5 Days Late
            </h3>
            <ul className="space-y-2 text-sm">
              <li>Take the dose as soon as you remember</li>
              <li>Resume your regular schedule next week</li>
              <li>Your next dose should be at least 48 hours later</li>
            </ul>
          </div>
          
          <div className="border border-muted-foreground/30 rounded-lg p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-muted-foreground" />
              More Than 5 Days Late
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Skip the missed dose entirely</li>
              <li>Take your next dose on your regular day</li>
              <li>Do not take double doses</li>
            </ul>
          </div>
        </div>

        {/* Dose Progression Tips */}
        <h2>Tips for Successful Dose Progression</h2>

        <h3>Listen to Your Body</h3>
        <p>
          If you're experiencing significant nausea at your current dose, it's okay to stay at that 
          dose for an extra 1-2 weeks before increasing. The goal is to find a sustainable dose that 
          reduces appetite without making you feel constantly sick.
        </p>

        <h3>Track Your Injection Days</h3>
        <p>
          Set a recurring weekly reminder on your phone. Consistency matters more than the specific 
          day or time. Many people find that morning injections work well for routine building.
        </p>

        <h3>Don't Chase Higher Doses</h3>
        <p>
          More is not always better. If 1.0mg is suppressing your appetite effectively and you're 
          losing weight steadily, there may be no need to increase to 1.7mg or 2.4mg. Higher doses 
          mean more potential side effects.
        </p>

        {/* Related Content */}
        <h2>Related Guides</h2>
      </article>

      <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
        <Link 
          to="/guides/semaglutide-side-effects"
          className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
        >
          <AlertCircle className="w-5 h-5 text-primary" />
          <div>
            <p className="font-medium">Semaglutide Side Effects</p>
            <p className="text-sm text-muted-foreground">How to manage nausea and other effects</p>
          </div>
          <ArrowRight className="w-4 h-4 ml-auto" />
        </Link>
        <Link 
          to="/guides/semaglutide-complete-guide"
          className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
        >
          <TrendingUp className="w-5 h-5 text-primary" />
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
