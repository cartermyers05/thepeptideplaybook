import { Check, AlertTriangle, Droplets, FlaskConical, Syringe, ArrowRight, Clock, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GuideLayout } from "@/components/guides/GuideLayout";
import { QuickAnswerBox } from "@/components/guides/QuickAnswerBox";
import { GuideFAQ } from "@/components/guides/GuideFAQ";
import { GuideCTA } from "@/components/guides/GuideCTA";
import { HowToSchema } from "@/components/seo/HowToSchema";
import { DosingCalculator } from "@/components/dashboard/DosingCalculator";
import { SITE_URL } from "@/lib/seo";

const faqs = [
  {
    question: "How much bacteriostatic water should I add to peptides?",
    answer: "The standard recommendation is 1-2ml of bacteriostatic water per vial. Adding 2ml is common because it makes dosing calculations easier. The amount you add affects concentration, not effectiveness—just use the same amount when calculating your doses."
  },
  {
    question: "Can I use sterile water instead of bacteriostatic water?",
    answer: "Bacteriostatic water is strongly preferred because it contains 0.9% benzyl alcohol, which prevents bacterial growth. Sterile water lacks preservatives, meaning your reconstituted peptide must be used within 24-48 hours and is more susceptible to contamination. Bacteriostatic water allows storage for 3-4 weeks when refrigerated."
  },
  {
    question: "How long do reconstituted peptides last?",
    answer: "When reconstituted with bacteriostatic water and stored in the refrigerator (2-8°C / 36-46°F), most peptides remain stable for 3-4 weeks. Keep the vial upright, avoid freezing, and never leave at room temperature for extended periods. Some peptides like semaglutide may last longer—check specific guidelines."
  },
  {
    question: "Why is my reconstituted peptide cloudy?",
    answer: "A cloudy or milky appearance usually indicates protein aggregation or contamination. Do not use cloudy peptide solutions. This can happen from: adding water too forcefully, shaking the vial vigorously, temperature extremes, or contamination. Always add water slowly along the vial wall and swirl gently."
  },
  {
    question: "Do I need to refrigerate peptides before reconstitution?",
    answer: "Lyophilized (freeze-dried) peptides are generally stable at room temperature for short periods but should be refrigerated for long-term storage. After reconstitution, they must be refrigerated immediately. Never freeze reconstituted peptides as this can damage the protein structure."
  },
  {
    question: "What happens if I add too much or too little water?",
    answer: "The amount of water doesn't affect the peptide's effectiveness—it only changes the concentration. More water = more diluted (larger volume per dose). Less water = more concentrated (smaller volume per dose). Just ensure your dosing calculations account for the actual water amount you used."
  }
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Reconstitute Peptides: Complete Step-by-Step Guide (2026)",
  description: "Learn exactly how to reconstitute peptides safely with bacteriostatic water. Step-by-step guide with photos, calculator, common mistakes, and storage instructions.",
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

const howToSteps = [
  {
    name: "Gather Your Supplies",
    text: "You'll need: the lyophilized peptide vial, bacteriostatic water, an alcohol swab, and an insulin syringe (typically 1ml/100 units). Ensure everything is at room temperature and your workspace is clean."
  },
  {
    name: "Clean the Vial Tops",
    text: "Use alcohol swabs to thoroughly clean the rubber stopper on both the peptide vial and the bacteriostatic water vial. Let the alcohol dry completely (about 30 seconds) before proceeding."
  },
  {
    name: "Draw the Bacteriostatic Water",
    text: "Insert the syringe into the bacteriostatic water vial, invert it, and draw your desired amount (typically 1-2ml). Pull back slowly to avoid bubbles. 2ml is recommended for easier dose calculations."
  },
  {
    name: "Add Water to Peptide Vial",
    text: "Insert the needle into the peptide vial at an angle, aiming at the glass wall—not directly at the powder. Slowly release the water, letting it trickle down the side of the vial. This prevents damaging the peptide."
  },
  {
    name: "Allow to Dissolve",
    text: "Let the vial sit for 1-2 minutes. Then gently swirl (don't shake!) in a circular motion until completely dissolved. The solution should be clear. Cloudiness indicates a problem—do not use."
  },
  {
    name: "Label and Store",
    text: "Write the reconstitution date, peptide name, and concentration on the vial. Store immediately in the refrigerator (2-8°C / 36-46°F). Use within 3-4 weeks."
  }
];

export default function ReconstitutionGuide() {
  return (
    <GuideLayout
      title="How to Reconstitute Peptides: Complete Step-by-Step Guide (2026)"
      description="Learn exactly how to reconstitute peptides safely with bacteriostatic water. Step-by-step guide with photos, calculator, common mistakes, and storage instructions."
      slug="how-to-reconstitute-peptides"
      articleSchema={articleSchema}
      faqSchema={faqSchema}
    >
      <HowToSchema
        name="How to Reconstitute Peptides"
        description="Step-by-step guide to safely reconstitute lyophilized peptides with bacteriostatic water for subcutaneous injection."
        steps={howToSteps}
        totalTime="PT10M"
        supply={["Lyophilized peptide vial", "Bacteriostatic water", "Alcohol swabs"]}
        tool={["Insulin syringe (1ml/U-100)", "Refrigerator for storage"]}
      />

      {/* Quick Answer */}
      <QuickAnswerBox 
        answer="To reconstitute peptides: add 1-2ml of bacteriostatic water slowly along the vial wall, let sit for 1-2 minutes, then gently swirl until dissolved. Never shake. Store refrigerated for up to 3-4 weeks."
        readTime="8 min read"
        lastUpdated="January 2026"
      />

      <article className="prose prose-gray dark:prose-invert max-w-none">
        {/* Hero Section */}
        <h1>How to Reconstitute Peptides: Complete Step-by-Step Guide</h1>
        
        <p className="lead">
          Reconstitution is the process of adding water to your freeze-dried (lyophilized) peptide powder 
          to create an injectable solution. Done correctly, it takes about 5 minutes and your peptide 
          will remain stable for 3-4 weeks. Here's exactly how to do it.
        </p>

        {/* What You'll Need */}
        <h2>What You'll Need</h2>
        
        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              Required Supplies
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 mt-0.5" />
                <span>Lyophilized peptide vial</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 mt-0.5" />
                <span>Bacteriostatic water (BAC water)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 mt-0.5" />
                <span>Insulin syringes (U-100, 1ml)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 mt-0.5" />
                <span>Alcohol swabs</span>
              </li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-4 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900">
            <h3 className="font-semibold mb-3 flex items-center gap-2 text-amber-800 dark:text-amber-200">
              <AlertTriangle className="w-5 h-5" />
              Important Notes
            </h3>
            <ul className="space-y-2 text-sm text-amber-800 dark:text-amber-200">
              <li>Use bacteriostatic water, not sterile water</li>
              <li>Never shake the vial—only gentle swirling</li>
              <li>Aim water at vial wall, not powder</li>
              <li>Clear solution only—discard if cloudy</li>
            </ul>
          </div>
        </div>

        {/* Step by Step */}
        <h2>Step-by-Step Reconstitution Process</h2>

        <div className="not-prose space-y-6 my-6">
          {howToSteps.map((step, index) => (
            <div key={index} className="flex gap-4 p-4 border rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-bold">
                {index + 1}
              </div>
              <div>
                <h3 className="font-semibold mb-1">{step.name}</h3>
                <p className="text-muted-foreground text-sm">{step.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Common Mistakes */}
        <h2>Common Mistakes to Avoid</h2>
        
        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          <div className="border border-red-200 dark:border-red-900 rounded-lg p-4 bg-red-50 dark:bg-red-950/20">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">❌ Don't Do This</h4>
            <ul className="space-y-2 text-sm text-red-800 dark:text-red-300">
              <li>Spraying water directly onto the powder</li>
              <li>Shaking the vial vigorously</li>
              <li>Using sterile water for long-term storage</li>
              <li>Leaving reconstituted peptide at room temp</li>
              <li>Freezing reconstituted solution</li>
              <li>Reusing syringes</li>
            </ul>
          </div>
          
          <div className="border border-emerald-200 dark:border-emerald-900 rounded-lg p-4 bg-emerald-50 dark:bg-emerald-950/20">
            <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">✓ Do This Instead</h4>
            <ul className="space-y-2 text-sm text-emerald-800 dark:text-emerald-300">
              <li>Let water trickle down the vial wall</li>
              <li>Gently swirl in circular motion</li>
              <li>Use bacteriostatic water (has preservative)</li>
              <li>Refrigerate immediately after mixing</li>
              <li>Keep at 2-8°C (36-46°F)</li>
              <li>Use new syringe for each injection</li>
            </ul>
          </div>
        </div>

        {/* Dosing Calculator */}
        <h2>Calculate Your Dose</h2>
        <p>
          Once your peptide is reconstituted, use this calculator to determine how many units 
          to draw on your insulin syringe for your desired dose:
        </p>

        <div className="not-prose my-6">
          <DosingCalculator />
        </div>

        <p>
          <Link to="/tools/peptide-calculator" className="text-primary hover:underline">
            Open the full peptide calculator →
          </Link>
        </p>

        {/* Storage */}
        <h2>Storage Guidelines</h2>
        
        <div className="not-prose my-6">
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-semibold">State</th>
                  <th className="text-left p-3 font-semibold">Storage</th>
                  <th className="text-left p-3 font-semibold">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3">Lyophilized (powder)</td>
                  <td className="p-3">Refrigerator or room temp</td>
                  <td className="p-3">Months to years</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3">Reconstituted (w/ BAC water)</td>
                  <td className="p-3">Refrigerator (2-8°C)</td>
                  <td className="p-3">3-4 weeks</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3">Reconstituted (w/ sterile water)</td>
                  <td className="p-3">Refrigerator (2-8°C)</td>
                  <td className="p-3">24-48 hours</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Troubleshooting */}
        <h2>Troubleshooting</h2>

        <h3>Solution is cloudy or has particles</h3>
        <p>
          This indicates protein aggregation or contamination. <strong>Do not use.</strong> This can happen 
          from adding water too forcefully, shaking, temperature extremes, or contamination. Start fresh 
          with a new vial.
        </p>

        <h3>Powder won't dissolve</h3>
        <p>
          Some peptides take longer to dissolve. Let it sit for 5-10 minutes, then gently swirl again. 
          You can also roll the vial between your palms to gently warm it. Never shake or add heat directly.
        </p>

        <h3>Bubbles in the solution</h3>
        <p>
          Small bubbles are normal and will rise to the surface. When drawing your dose, avoid drawing 
          the bubbles. Let the vial sit for a minute to let bubbles settle before drawing.
        </p>

        {/* Next Steps */}
        <h2>Next Steps</h2>
        <p>
          Once your peptide is reconstituted, you're ready to administer it. For injection guidance, 
          see our complete guide on injection sites and technique:
        </p>

        <div className="not-prose my-6">
          <Link 
            to="/guides/peptide-injection-sites"
            className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <Syringe className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium">Peptide Injection Sites Guide</p>
              <p className="text-sm text-muted-foreground">Best sites for subcutaneous injection</p>
            </div>
            <ArrowRight className="w-4 h-4 ml-auto" />
          </Link>
        </div>
      </article>

      {/* FAQ Section */}
      <GuideFAQ items={faqs} />

      {/* CTA */}
      <GuideCTA />
    </GuideLayout>
  );
}
