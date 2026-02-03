import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, ChevronRight, RotateCcw, PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMilestones } from "@/hooks/useMilestones";
import { toast } from "sonner";

const STEPS = [
  {
    title: "Gather Supplies",
    description: "You'll need your peptide vial, bacteriostatic water, alcohol swabs, and a syringe.",
    checklist: ["Peptide vial", "Bacteriostatic water", "Alcohol swabs", "Syringe (1ml insulin syringe)"],
  },
  {
    title: "Wash Your Hands",
    description: "Thoroughly wash your hands with soap and water for at least 20 seconds.",
    tip: "This is crucial to prevent contamination.",
  },
  {
    title: "Clean the Vials",
    description: "Use an alcohol swab to clean the rubber stoppers on both the peptide vial and bacteriostatic water.",
    tip: "Let them air dry for 30 seconds before proceeding.",
  },
  {
    title: "Calculate Water Amount",
    description: "Determine how much bacteriostatic water to add based on your desired concentration.",
    tip: "Common: 2ml water into 5mg peptide = 250mcg per 0.1ml. Use a peptide calculator if unsure.",
  },
  {
    title: "Draw the Water",
    description: "Draw the calculated amount of bacteriostatic water into your syringe.",
    tip: "Pull back the plunger, then push out any air bubbles.",
  },
  {
    title: "Add Water to Peptide",
    description: "Insert the needle into the peptide vial at an angle. Let the water run down the side of the vial SLOWLY.",
    warning: "Never spray directly onto the powder - this can damage the peptide!",
  },
  {
    title: "Let It Dissolve",
    description: "Allow the peptide to dissolve naturally. You can gently roll the vial between your palms.",
    warning: "Never shake the vial - this can denature the peptide!",
  },
  {
    title: "Storage",
    description: "Store the reconstituted peptide in the refrigerator. Most peptides are stable for 4-6 weeks once mixed.",
    tip: "Label the vial with the date and concentration.",
  },
];

export function ReconGuide() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const { awardMilestone, hasMilestone } = useMilestones();

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const handleComplete = async () => {
    setCompleted(true);
    if (!hasMilestone("first_recon")) {
      await awardMilestone.mutateAsync("first_recon");
      toast.success("Achievement unlocked: First Reconstitution! 🎉");
    }
  };

  const handleNext = () => {
    if (currentStep === STEPS.length - 1) {
      handleComplete();
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
            <h2 className="text-2xl font-semibold mb-2">Reconstitution Complete!</h2>
            <p className="text-muted-foreground mb-6">
              Great job! Your peptide is now ready to use. Store it in the refrigerator.
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
