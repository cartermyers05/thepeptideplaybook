import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Sparkles, Download, Printer, AlertTriangle } from "lucide-react";
import { useProtocol } from "@/hooks/useProtocol";
import { useProfile } from "@/hooks/useProfile";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const GOALS = [
  { id: "fat_loss", label: "Fat Loss", description: "Metabolic optimization & appetite control" },
  { id: "muscle_recovery", label: "Muscle & Recovery", description: "Enhanced repair & performance" },
  { id: "injury_recovery", label: "Injury Recovery", description: "Accelerated tissue healing" },
  { id: "anti_aging", label: "Anti-Aging", description: "Longevity & cellular health" },
  { id: "cognitive", label: "Cognitive Enhancement", description: "Focus, memory & neuroprotection" },
  { id: "general_wellness", label: "General Wellness", description: "Overall health optimization" },
];

const EXPERIENCE_LEVELS = [
  { id: "beginner", label: "Beginner", description: "New to peptides, need guidance" },
  { id: "intermediate", label: "Intermediate", description: "Some experience, comfortable with basics" },
  { id: "advanced", label: "Advanced", description: "Experienced, looking for optimization" },
];

const CONSTRAINTS = [
  { id: "no_injections", label: "Prefer no injections", description: "Oral or nasal options only" },
  { id: "budget", label: "Budget conscious", description: "Keep costs reasonable" },
  { id: "minimal_compounds", label: "Minimal compounds", description: "Start with 1-2 peptides max" },
  { id: "travel_friendly", label: "Travel friendly", description: "Easy storage & transport" },
];

export default function Protocols() {
  const [step, setStep] = useState(1);
  const [primaryGoal, setPrimaryGoal] = useState<string>("");
  const [secondaryGoals, setSecondaryGoals] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState<string>("");
  const [constraints, setConstraints] = useState<string[]>([]);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const { protocol, createProtocol, startProtocol } = useProtocol();
  const { data: profile } = useProfile();

  const totalSteps = 5;
  const progressPercent = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSecondaryGoalToggle = (goalId: string) => {
    if (goalId === primaryGoal) return;
    setSecondaryGoals(prev =>
      prev.includes(goalId) ? prev.filter(g => g !== goalId) : [...prev, goalId]
    );
  };

  const handleConstraintToggle = (constraintId: string) => {
    setConstraints(prev =>
      prev.includes(constraintId) ? prev.filter(c => c !== constraintId) : [...prev, constraintId]
    );
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      await createProtocol.mutateAsync(primaryGoal);
      setStep(5);
    } catch (error) {
      console.error("Error generating protocol:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStartProtocol = async () => {
    if (protocol?.id) {
      await startProtocol.mutateAsync(protocol.id);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return !!primaryGoal;
      case 2: return true; // Secondary goals are optional
      case 3: return !!experienceLevel;
      case 4: return true; // Constraints are optional
      default: return false;
    }
  };

  // If user already has an active protocol, show it
  if (protocol && protocol.status !== "not_started" && step === 1) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Your Protocol</h1>
            <p className="text-muted-foreground">Currently active protocol</p>
          </div>

          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground">{protocol.protocol_name}</CardTitle>
                  <CardDescription>
                    Week {protocol.current_week} of {protocol.cycle_length_weeks} • Day {protocol.current_day}
                  </CardDescription>
                </div>
                <Badge variant={protocol.status === "active" ? "default" : "secondary"}>
                  {protocol.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {protocol.peptides.map((peptide, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{peptide.name}</h3>
                    <Badge variant="outline">{peptide.frequency}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{peptide.purpose}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><span className="text-muted-foreground">Dosage:</span> {peptide.dosage}</div>
                    <div><span className="text-muted-foreground">Timing:</span> {peptide.timing}</div>
                    {peptide.site && <div className="col-span-2"><span className="text-muted-foreground">Site:</span> {peptide.site}</div>}
                  </div>
                </div>
              ))}

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Create New Protocol
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* First-use disclaimer modal */}
      <Dialog open={showDisclaimer && !disclaimerAccepted} onOpenChange={setShowDisclaimer}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              Important Disclaimer
            </DialogTitle>
            <DialogDescription className="text-left pt-4 space-y-4">
              <p>
                The Protocol Builder provides <strong>educational information only</strong> and is not medical advice.
              </p>
              <p>
                Peptides are research compounds. Their safety and efficacy for human use has not been established by the FDA for most applications.
              </p>
              <p>
                Always consult with a qualified healthcare provider before using any peptides or supplements.
              </p>
              <div className="flex items-start gap-3 pt-2">
                <Checkbox
                  id="disclaimer"
                  checked={disclaimerAccepted}
                  onCheckedChange={(checked) => setDisclaimerAccepted(!!checked)}
                />
                <label htmlFor="disclaimer" className="text-sm cursor-pointer">
                  I understand this is for educational purposes only and I will consult a healthcare provider before using any peptides.
                </label>
              </div>
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => setShowDisclaimer(false)}
            disabled={!disclaimerAccepted}
            className="w-full"
          >
            Continue to Protocol Builder
          </Button>
        </DialogContent>
      </Dialog>

      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Protocol Builder</h1>
          <p className="text-muted-foreground">Create your personalized peptide protocol</p>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round(progressPercent)}% complete</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        {/* Step Content */}
        <Card className="border-border bg-card">
          <CardContent className="pt-6">
            {/* Step 1: Primary Goal */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">What's your primary goal?</h2>
                  <p className="text-sm text-muted-foreground">Select the main outcome you want to achieve</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {GOALS.map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => setPrimaryGoal(goal.id)}
                      className={cn(
                        "p-4 rounded-lg border text-left transition-all",
                        primaryGoal === goal.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      )}
                    >
                      <h3 className="font-medium text-foreground">{goal.label}</h3>
                      <p className="text-sm text-muted-foreground">{goal.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Secondary Goals */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Any secondary goals?</h2>
                  <p className="text-sm text-muted-foreground">Select additional benefits you'd like (optional)</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {GOALS.filter(g => g.id !== primaryGoal).map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => handleSecondaryGoalToggle(goal.id)}
                      className={cn(
                        "p-4 rounded-lg border text-left transition-all",
                        secondaryGoals.includes(goal.id)
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      )}
                    >
                      <h3 className="font-medium text-foreground">{goal.label}</h3>
                      <p className="text-sm text-muted-foreground">{goal.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Experience Level */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">What's your experience level?</h2>
                  <p className="text-sm text-muted-foreground">This helps us tailor recommendations</p>
                </div>
                <div className="grid gap-3">
                  {EXPERIENCE_LEVELS.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => setExperienceLevel(level.id)}
                      className={cn(
                        "p-4 rounded-lg border text-left transition-all",
                        experienceLevel === level.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      )}
                    >
                      <h3 className="font-medium text-foreground">{level.label}</h3>
                      <p className="text-sm text-muted-foreground">{level.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Constraints */}
            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Any constraints or preferences?</h2>
                  <p className="text-sm text-muted-foreground">Select any that apply (optional)</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {CONSTRAINTS.map((constraint) => (
                    <button
                      key={constraint.id}
                      onClick={() => handleConstraintToggle(constraint.id)}
                      className={cn(
                        "p-4 rounded-lg border text-left transition-all",
                        constraints.includes(constraint.id)
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      )}
                    >
                      <h3 className="font-medium text-foreground">{constraint.label}</h3>
                      <p className="text-sm text-muted-foreground">{constraint.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Generated Protocol */}
            {step === 5 && protocol && (
              <div className="space-y-6">
                <div className="text-center pb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">Your Protocol is Ready</h2>
                  <p className="text-sm text-muted-foreground">Based on your goals and preferences</p>
                </div>

                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <h3 className="font-semibold text-foreground mb-1">{protocol.protocol_name}</h3>
                  <p className="text-sm text-muted-foreground">{protocol.cycle_length_weeks} week cycle</p>
                </div>

                {protocol.peptides.map((peptide, index) => (
                  <div key={index} className="p-4 rounded-lg bg-muted/50 border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-foreground">{peptide.name}</h3>
                      <Badge variant="outline">{peptide.frequency}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{peptide.purpose}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-muted-foreground">Dosage:</span> {peptide.dosage}</div>
                      <div><span className="text-muted-foreground">Timing:</span> {peptide.timing}</div>
                      {peptide.site && <div className="col-span-2"><span className="text-muted-foreground">Site:</span> {peptide.site}</div>}
                    </div>
                  </div>
                ))}

                <div className="p-4 rounded-lg bg-muted border border-border">
                  <p className="text-sm text-muted-foreground">
                    <AlertTriangle className="w-4 h-4 inline mr-1" />
                    <strong>Disclaimer:</strong> This protocol is for educational purposes only. Consult a healthcare provider before using any peptides.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={handleStartProtocol} className="flex-1">
                    Start This Protocol
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Printer className="w-4 h-4 mr-2" />
                    Print
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        {step < 5 && (
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            {step < 4 ? (
              <Button onClick={handleNext} disabled={!canProceed()}>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleGenerate} disabled={isGenerating || !canProceed()}>
                {isGenerating ? (
                  <>Generating...</>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Protocol
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
