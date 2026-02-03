import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, ChevronRight, RotateCcw, PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    title: "Gather Supplies",
    description: "Prepare everything you need before starting.",
    checklist: [
      "Reconstituted peptide vial",
      "Insulin syringe (29-31 gauge)",
      "Alcohol swabs",
      "Sharps container",
    ],
  },
  {
    title: "Clean Injection Site",
    description: "Choose your injection site and clean it with an alcohol swab.",
    tip: "Common subcutaneous sites: belly (2 inches from navel), front of thigh, back of arm. Rotate sites to prevent tissue buildup.",
  },
  {
    title: "Draw Your Dose",
    description: "Clean the vial stopper with alcohol. Draw air equal to your dose into the syringe, inject into vial, then draw your peptide dose.",
    tip: "Drawing air first makes it easier to draw the liquid. Most doses are between 0.1ml - 0.5ml.",
  },
  {
    title: "Remove Air Bubbles",
    description: "Hold the syringe with the needle pointing up. Flick the barrel gently to move bubbles to the top, then push the plunger slightly to expel them.",
    tip: "Small bubbles are harmless for subcutaneous injections, but removing them ensures accurate dosing.",
  },
  {
    title: "Prepare for Injection",
    description: "Pinch a fold of skin at your cleaned injection site with your non-dominant hand.",
    tip: "Pinching lifts the subcutaneous fat layer away from muscle, ensuring the peptide goes where it should.",
  },
  {
    title: "Insert & Inject",
    description: "Insert the needle at a 45-90° angle into the pinched skin fold. Push the plunger slowly and steadily to inject the peptide.",
    warning: "Go slow! Rushing can cause discomfort. The injection should take about 5-10 seconds.",
  },
  {
    title: "Finish Up",
    description: "Withdraw the needle, release the skin fold, and apply gentle pressure with a clean alcohol swab if needed.",
    checklist: [
      "Dispose of syringe in sharps container",
      "Return peptide vial to refrigerator",
      "Log your injection in today's check-in",
    ],
  },
];

export function InjectionGuide() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const handleNext = () => {
    if (currentStep === STEPS.length - 1) {
      setCompleted(true);
    } else {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setCompleted(false);
  };

  if (completed) {
    return (
      <Card>
        <CardContent className="pt-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center text-center py-8"
          >
            <PartyPopper className="w-16 h-16 text-primary mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Injection Complete!</h2>
            <p className="text-muted-foreground mb-6">
              Great job! Don't forget to log this in your daily check-in.
            </p>
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Start Over
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    );
  }

  const step = STEPS[currentStep];

  return (
    <Card>
      <CardContent className="pt-6">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Step {currentStep + 1} of {STEPS.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step indicators */}
        <div className="flex justify-center gap-2 mb-6">
          {STEPS.map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-3 h-3 rounded-full transition-colors",
                index < currentStep
                  ? "bg-primary"
                  : index === currentStep
                  ? "bg-primary ring-2 ring-primary/30"
                  : "bg-muted"
              )}
            />
          ))}
        </div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-semibold text-center">{step.title}</h2>
          <p className="text-muted-foreground text-center">{step.description}</p>

          {step.checklist && (
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              {step.checklist.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <div className="w-5 h-5 rounded border border-border flex items-center justify-center">
                    <Check className="w-3 h-3 text-muted-foreground" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          )}

          {step.tip && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <p className="text-sm">
                <span className="font-medium">💡 Tip:</span> {step.tip}
              </p>
            </div>
          )}

          {step.warning && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <p className="text-sm">
                <span className="font-medium">⚠️ Important:</span> {step.warning}
              </p>
            </div>
          )}
        </motion.div>

        {/* Navigation */}
        <div className="flex gap-3 mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentStep((s) => s - 1)}
            disabled={currentStep === 0}
            className="flex-1"
          >
            Back
          </Button>
          <Button onClick={handleNext} className="flex-1">
            {currentStep === STEPS.length - 1 ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Done
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
