import { useState } from "react";
import { Calculator, Droplets, FlaskConical, Syringe, ArrowRight, Info, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ToolLayout } from "@/components/guides/ToolLayout";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { SITE_URL } from "@/lib/seo";

const faqs = [
  {
    question: "How do I calculate peptide dosing?",
    answer: "To calculate peptide dosing, use this formula: (desired dose in mg ÷ total vial size in mg) × amount of water added in ml × 100 = units to draw on an insulin syringe. For example, for a 0.5mg dose from a 5mg vial reconstituted with 2ml of water: (0.5 ÷ 5) × 2 × 100 = 20 units."
  },
  {
    question: "How much bacteriostatic water should I add to peptides?",
    answer: "The standard recommendation is 1-2ml of bacteriostatic water per vial. Adding 2ml makes the math easier for most peptides. More water means smaller, more precise doses but larger injection volumes. Less water means concentrated doses but requires more precise measurement."
  },
  {
    question: "What is a unit on an insulin syringe?",
    answer: "An insulin syringe is marked in 'units' where 100 units equals 1ml. A standard U-100 insulin syringe holds 1ml total. When you draw 50 units, you're drawing 0.5ml. The marking system makes it easy to measure precise small volumes for peptide injections."
  },
  {
    question: "Why does the water amount affect my dosing?",
    answer: "The water amount determines the concentration of your peptide solution. More water means lower concentration (more units needed per dose). Less water means higher concentration (fewer units per dose). This calculator does the math for any water amount you choose."
  },
  {
    question: "Can I use this calculator for any peptide?",
    answer: "Yes, this calculator works for any peptide regardless of type. The formula is universal - just enter your specific vial size and the amount of water you added. Common peptides include BPC-157, semaglutide, TB-500, and many others."
  }
];

const commonPresets = [
  { name: "BPC-157 (5mg vial)", vialSize: 5, doses: [0.25, 0.5, 1.0] },
  { name: "Semaglutide (5mg vial)", vialSize: 5, doses: [0.25, 0.5, 1.0] },
  { name: "TB-500 (5mg vial)", vialSize: 5, doses: [2.0, 2.5, 5.0] },
  { name: "TB-500 (10mg vial)", vialSize: 10, doses: [2.0, 2.5, 5.0] },
];

export default function PeptideCalculator() {
  const [vialSizeMg, setVialSizeMg] = useState(5);
  const [waterMl, setWaterMl] = useState(2);
  const [customDose, setCustomDose] = useState(0.5);
  const [selectedPreset, setSelectedPreset] = useState<typeof commonPresets[0] | null>(null);

  // Formula: (dose_mg / vial_mg) * water_ml * 100 = units
  const calculateUnits = (doseMg: number) => {
    if (vialSizeMg <= 0 || waterMl <= 0) return 0;
    return Math.round((doseMg / vialSizeMg) * waterMl * 100);
  };

  const concentration = vialSizeMg > 0 && waterMl > 0 
    ? (vialSizeMg / waterMl).toFixed(2) 
    : "0";

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Calculate Peptide Dosing",
    description: "Step-by-step guide to calculate the correct units to draw on an insulin syringe for any peptide dose.",
    totalTime: "PT2M",
    tool: [
      { "@type": "HowToTool", name: "Insulin syringe (U-100)" },
      { "@type": "HowToTool", name: "Peptide Dosing Calculator" }
    ],
    supply: [
      { "@type": "HowToSupply", name: "Reconstituted peptide vial" }
    ],
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Enter your vial size",
        text: "Input the total milligrams (mg) of peptide in your vial. This is typically printed on the vial label. Common sizes are 5mg and 10mg."
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Enter the water amount",
        text: "Input how many milliliters (ml) of bacteriostatic water you added during reconstitution. The standard is 2ml, but 1ml or other amounts work too."
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Read your units to draw",
        text: "The calculator shows how many units to draw on your insulin syringe for various doses. For example, if it shows 20 units for 0.5mg, draw to the 20 mark on your syringe."
      }
    ]
  };

  return (
    <ToolLayout
      title="Free Peptide Dosing Calculator"
      description="Calculate exactly how many units to draw on your insulin syringe for any peptide dose. Free tool with step-by-step instructions for BPC-157, semaglutide, TB-500 and more."
      slug="peptide-calculator"
      howToSchema={howToSchema}
    >
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Free Peptide Dosing Calculator
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Calculate exactly how many units to draw on your insulin syringe. 
          Works with any peptide—BPC-157, semaglutide, TB-500, and more.
        </p>
      </div>

      {/* Calculator Card */}
      <div className="bg-card rounded-2xl border shadow-sm overflow-hidden mb-10">
        <div className="h-1 bg-gradient-to-r from-emerald-400 to-emerald-600" />
        
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Calculator className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Dosing Calculator</h2>
              <p className="text-sm text-muted-foreground">Enter your vial details below</p>
            </div>
          </div>

          {/* Presets */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-2 block">Quick Presets</Label>
            <div className="flex flex-wrap gap-2">
              {commonPresets.map((preset) => (
                <Button
                  key={preset.name}
                  variant={selectedPreset?.name === preset.name ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectedPreset(preset);
                    setVialSizeMg(preset.vialSize);
                  }}
                >
                  {preset.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                <FlaskConical className="w-4 h-4" />
                Vial Size (mg)
              </Label>
              <Input
                type="number"
                value={vialSizeMg}
                onChange={(e) => {
                  setVialSizeMg(Number(e.target.value));
                  setSelectedPreset(null);
                }}
                className="h-12 text-lg"
                min={0.1}
                step={0.5}
              />
              <p className="text-xs text-muted-foreground mt-1">Total mg in your peptide vial</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                <Droplets className="w-4 h-4" />
                Bacteriostatic Water Added (ml)
              </Label>
              <Input
                type="number"
                value={waterMl}
                onChange={(e) => setWaterMl(Number(e.target.value))}
                className="h-12 text-lg"
                min={0.1}
                step={0.5}
              />
              <p className="text-xs text-muted-foreground mt-1">Amount of BAC water you added</p>
            </div>
          </div>

          {/* Concentration Display */}
          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground">
              Your concentration: <span className="font-semibold text-foreground">{concentration} mg/ml</span>
            </p>
          </div>

          {/* Results */}
          <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900">
            <div className="flex items-center gap-2 mb-4">
              <Syringe className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-emerald-900 dark:text-emerald-100">Units to Draw</h3>
            </div>
            
            <div className="space-y-3">
              {(selectedPreset?.doses || [0.25, 0.5, 1.0]).map((dose) => (
                <div
                  key={dose}
                  className="flex justify-between items-center py-2 border-b border-emerald-200/50 last:border-0"
                >
                  <span className="font-medium">{dose}mg dose</span>
                  <span className="text-emerald-700 dark:text-emerald-300 font-bold text-lg">
                    {calculateUnits(dose)} units
                  </span>
                </div>
              ))}
            </div>

            {/* Custom dose calculator */}
            <div className="mt-4 pt-4 border-t border-emerald-200">
              <Label className="text-sm text-emerald-700 dark:text-emerald-300 mb-2 block">
                Custom Dose
              </Label>
              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  value={customDose}
                  onChange={(e) => setCustomDose(Number(e.target.value))}
                  className="w-24 h-10"
                  min={0.01}
                  step={0.01}
                />
                <span className="text-sm">mg =</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-300 text-lg">
                  {calculateUnits(customDose)} units
                </span>
              </div>
            </div>
          </div>

          {/* Formula explanation */}
          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 mt-0.5 text-muted-foreground" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">The Formula:</p>
                <code className="bg-muted px-2 py-1 rounded text-xs">
                  (dose ÷ vial size) × water amount × 100 = units
                </code>
                <p className="mt-2">
                  Example: For 0.5mg from a 5mg vial with 2ml water: (0.5 ÷ 5) × 2 × 100 = <strong>20 units</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <section className="prose prose-gray dark:prose-invert max-w-none mb-10">
        <h2>How to Use This Peptide Calculator</h2>
        <p>
          Calculating peptide doses correctly is essential for safe and effective use. 
          This free calculator takes the guesswork out of the math, showing you exactly 
          how many units to draw on your insulin syringe.
        </p>

        <h3>Step 1: Know Your Vial Size</h3>
        <p>
          Check the label on your peptide vial for the total milligrams (mg). Common sizes 
          include 5mg and 10mg vials. This is the total amount of peptide in the vial 
          before reconstitution.
        </p>

        <h3>Step 2: Track Your Water Amount</h3>
        <p>
          When you reconstitute your peptide, note how much bacteriostatic water you add. 
          The standard recommendation is 2ml, which makes the math convenient. However, 
          1ml or other amounts work fine—just enter the actual amount you used.
        </p>

        <h3>Step 3: Read Your Units</h3>
        <p>
          The calculator converts your desired dose into units for a U-100 insulin syringe. 
          For example, if it shows "20 units" for your dose, draw the plunger to the 20 mark 
          on your syringe.
        </p>

        <h3>Understanding Concentration</h3>
        <p>
          Adding more water creates a more diluted solution (lower mg/ml concentration). 
          This means you'll draw more units for the same dose, but it can be easier to 
          measure small doses precisely. Adding less water creates a more concentrated 
          solution, requiring fewer units but more precision.
        </p>
      </section>

      {/* FAQ Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Guides */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Related Guides</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link 
            to="/guides/how-to-reconstitute-peptides"
            className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <BookOpen className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium">How to Reconstitute Peptides</p>
              <p className="text-sm text-muted-foreground">Step-by-step guide to mixing your peptides</p>
            </div>
            <ArrowRight className="w-4 h-4 ml-auto" />
          </Link>
          <Link 
            to="/guides/peptide-injection-sites"
            className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <Syringe className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium">Peptide Injection Sites</p>
              <p className="text-sm text-muted-foreground">Best sites for subcutaneous injection</p>
            </div>
            <ArrowRight className="w-4 h-4 ml-auto" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="glass-card-subtle p-8 text-center rounded-2xl">
        <h2 className="text-2xl font-bold mb-3">Ready to Start Your Peptide Journey?</h2>
        <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
          Get a personalized peptide course with built-in dosing calculator, step-by-step guides, and AI coaching.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/quiz">
            <Button className="btn-primary-clean gap-2">
              Take the Free Quiz
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/guides">
            <Button variant="outline">
              Explore All Guides
            </Button>
          </Link>
        </div>
      </section>
    </ToolLayout>
  );
}
