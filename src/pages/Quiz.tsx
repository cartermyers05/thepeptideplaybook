import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { SEOHead } from "@/components/seo/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

type Goal = "fat_loss" | "muscle_recovery" | "injury_recovery" | "anti_aging" | "cognitive" | "general_wellness";
type Experience = "beginner" | "some_experience" | "experienced";
type Timeline = "ready_now" | "soon" | "researching";
type Concern = "reconstitution" | "dosing" | "side_effects" | "sourcing" | "stacking" | "injections";

interface QuizState {
  goal: Goal | null;
  experience: Experience | null;
  concerns: Concern[];
  timeline: Timeline | null;
  email: string;
  newsletter: boolean;
}

const goals: { value: Goal; label: string; description: string; icon: string }[] = [
  { value: "fat_loss", label: "Fat Loss", description: "Optimize body composition and metabolism", icon: "🔥" },
  { value: "muscle_recovery", label: "Muscle & Recovery", description: "Build muscle, recover faster from training", icon: "💪" },
  { value: "injury_recovery", label: "Injury Recovery", description: "Heal from injuries, reduce inflammation", icon: "🩹" },
  { value: "anti_aging", label: "Anti-Aging & Longevity", description: "Slow aging, improve skin, increase vitality", icon: "✨" },
  { value: "cognitive", label: "Cognitive Enhancement", description: "Sharpen focus, memory, mental clarity", icon: "🧠" },
  { value: "general_wellness", label: "General Wellness", description: "Overall health optimization", icon: "🌿" },
];

const experienceLevels: { value: Experience; label: string; description: string }[] = [
  { value: "beginner", label: "Complete Beginner", description: "I've never used peptides before" },
  { value: "some_experience", label: "Some Experience", description: "I've tried 1-2 peptides in the past" },
  { value: "experienced", label: "Experienced", description: "I've run multiple peptide cycles" },
];

const concerns: { value: Concern; label: string; description: string }[] = [
  { value: "reconstitution", label: "Reconstitution", description: "Mixing the peptides correctly" },
  { value: "dosing", label: "Dosing", description: "Getting the right amount" },
  { value: "side_effects", label: "Side Effects", description: "Knowing what's normal vs concerning" },
  { value: "sourcing", label: "Sourcing", description: "Finding quality peptides" },
  { value: "stacking", label: "Stacking", description: "Combining multiple peptides safely" },
  { value: "injections", label: "Injections", description: "The actual injection process" },
];

const timelines: { value: Timeline; label: string; description: string }[] = [
  { value: "ready_now", label: "Ready Now", description: "I have supplies or I'm ordering this week" },
  { value: "soon", label: "Soon", description: "Within the next month" },
  { value: "researching", label: "Researching", description: "Just learning for now" },
];

export default function Quiz() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [state, setState] = useState<QuizState>({
    goal: null,
    experience: null,
    concerns: [],
    timeline: null,
    email: user?.email || "",
    newsletter: true,
  });

  const totalSteps = 5;

  const canProceed = () => {
    switch (step) {
      case 1: return state.goal !== null;
      case 2: return state.experience !== null;
      case 3: return state.concerns.length > 0;
      case 4: return state.timeline !== null;
      case 5: return state.email.includes("@");
      default: return false;
    }
  };

  const handleConcernToggle = (concern: Concern) => {
    setState(prev => ({
      ...prev,
      concerns: prev.concerns.includes(concern)
        ? prev.concerns.filter(c => c !== concern)
        : prev.concerns.length < 3
          ? [...prev.concerns, concern]
          : prev.concerns
    }));
  };

  const handleSubmit = async () => {
    if (!canProceed()) return;
    
    setIsSubmitting(true);
    try {
      // Save quiz response
      const { data, error } = await supabase
        .from("quiz_responses")
        .insert({
          user_id: user?.id || null,
          primary_goal: state.goal!,
          experience_level: state.experience!,
          main_concerns: state.concerns,
          timeline: state.timeline!,
          email: state.email,
          newsletter_opt_in: state.newsletter,
        })
        .select()
        .single();

      if (error) throw error;

      // Store in localStorage for results page
      localStorage.setItem("quizResponse", JSON.stringify({
        id: data.id,
        goal: state.goal,
        experience: state.experience,
        concerns: state.concerns,
        timeline: state.timeline,
      }));

      navigate("/quiz/results");
    } catch (error) {
      console.error("Error saving quiz:", error);
      // Still navigate - we can retry later
      navigate("/quiz/results");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (step === 5) {
      handleSubmit();
    } else if (canProceed()) {
      setStep(s => s + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(s => s - 1);
  };

  return (
    <>
      <SEOHead 
        title="Get Your Free Peptide Protocol | Peptide Playbook"
        description="Answer 5 quick questions and get a personalized peptide protocol tailored to your goals."
        canonical="/quiz"
      />
      <div className="min-h-screen bg-background flex flex-col">
        {/* Progress Bar */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
          <div className="container px-4 py-4">
            <div className="flex items-center justify-between mb-2">
              <button 
                onClick={() => navigate("/")}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                ← Back to home
              </button>
              <span className="text-sm text-muted-foreground">Step {step} of {totalSteps}</span>
            </div>
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(step / totalSteps) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 pt-24 pb-24">
          <div className="container px-4 max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              {/* Step 1: Goal */}
              {step === 1 && (
                <StepContainer key="goal">
                  <h1 className="text-2xl md:text-3xl font-semibold text-center mb-2">What's your primary goal?</h1>
                  <p className="text-muted-foreground text-center mb-8">Select the one that matters most to you right now.</p>
                  <div className="grid gap-3">
                    {goals.map(goal => (
                      <OptionCard
                        key={goal.value}
                        selected={state.goal === goal.value}
                        onClick={() => setState(s => ({ ...s, goal: goal.value }))}
                      >
                        <span className="text-2xl mr-3">{goal.icon}</span>
                        <div>
                          <p className="font-medium">{goal.label}</p>
                          <p className="text-sm text-muted-foreground">{goal.description}</p>
                        </div>
                      </OptionCard>
                    ))}
                  </div>
                </StepContainer>
              )}

              {/* Step 2: Experience */}
              {step === 2 && (
                <StepContainer key="experience">
                  <h1 className="text-2xl md:text-3xl font-semibold text-center mb-2">What's your experience with peptides?</h1>
                  <p className="text-muted-foreground text-center mb-8">This helps us tailor your protocol to your level.</p>
                  <div className="grid gap-3">
                    {experienceLevels.map(exp => (
                      <OptionCard
                        key={exp.value}
                        selected={state.experience === exp.value}
                        onClick={() => setState(s => ({ ...s, experience: exp.value }))}
                      >
                        <div>
                          <p className="font-medium">{exp.label}</p>
                          <p className="text-sm text-muted-foreground">{exp.description}</p>
                        </div>
                      </OptionCard>
                    ))}
                  </div>
                </StepContainer>
              )}

              {/* Step 3: Concerns */}
              {step === 3 && (
                <StepContainer key="concerns">
                  <h1 className="text-2xl md:text-3xl font-semibold text-center mb-2">What concerns you most about starting?</h1>
                  <p className="text-muted-foreground text-center mb-8">Select up to 3 concerns. Your AI Coach will address these.</p>
                  <div className="grid gap-3">
                    {concerns.map(concern => (
                      <OptionCard
                        key={concern.value}
                        selected={state.concerns.includes(concern.value)}
                        onClick={() => handleConcernToggle(concern.value)}
                        disabled={!state.concerns.includes(concern.value) && state.concerns.length >= 3}
                      >
                        <div>
                          <p className="font-medium">{concern.label}</p>
                          <p className="text-sm text-muted-foreground">{concern.description}</p>
                        </div>
                        {state.concerns.includes(concern.value) && (
                          <span className="ml-auto text-primary">✓</span>
                        )}
                      </OptionCard>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground text-center mt-4">
                    {state.concerns.length}/3 selected
                  </p>
                </StepContainer>
              )}

              {/* Step 4: Timeline */}
              {step === 4 && (
                <StepContainer key="timeline">
                  <h1 className="text-2xl md:text-3xl font-semibold text-center mb-2">When are you looking to start?</h1>
                  <p className="text-muted-foreground text-center mb-8">This helps us prioritize what to show you first.</p>
                  <div className="grid gap-3">
                    {timelines.map(tl => (
                      <OptionCard
                        key={tl.value}
                        selected={state.timeline === tl.value}
                        onClick={() => setState(s => ({ ...s, timeline: tl.value }))}
                      >
                        <div>
                          <p className="font-medium">{tl.label}</p>
                          <p className="text-sm text-muted-foreground">{tl.description}</p>
                        </div>
                      </OptionCard>
                    ))}
                  </div>
                </StepContainer>
              )}

              {/* Step 5: Email */}
              {step === 5 && (
                <StepContainer key="email">
                  <div className="text-center mb-8">
                    <span className="text-4xl mb-4 block">🎉</span>
                    <h1 className="text-2xl md:text-3xl font-semibold mb-2">Your personalized protocol is ready!</h1>
                    <p className="text-muted-foreground">Enter your email to see your recommended peptides and dosing schedule.</p>
                  </div>
                  <div className="max-w-sm mx-auto space-y-4">
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={state.email}
                      onChange={e => setState(s => ({ ...s, email: e.target.value }))}
                      className="h-12 text-center text-lg"
                    />
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id="newsletter" 
                        checked={state.newsletter}
                        onCheckedChange={(checked) => setState(s => ({ ...s, newsletter: checked as boolean }))}
                      />
                      <label htmlFor="newsletter" className="text-sm text-muted-foreground cursor-pointer">
                        Send me weekly peptide research updates (free)
                      </label>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      We'll never spam you. Unsubscribe anytime.
                    </p>
                  </div>
                </StepContainer>
              )}
            </AnimatePresence>
          </div>
        </main>

        {/* Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t">
          <div className="container px-4 py-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-between gap-4">
              <Button
                variant="ghost"
                onClick={prevStep}
                disabled={step === 1}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
              <Button
                onClick={nextStep}
                disabled={!canProceed() || isSubmitting}
                className="gap-2 min-w-[140px]"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : step === 5 ? (
                  "See My Protocol"
                ) : (
                  <>
                    Continue
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function StepContainer({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

function OptionCard({ 
  children, 
  selected, 
  onClick, 
  disabled 
}: { 
  children: React.ReactNode; 
  selected: boolean; 
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full p-4 rounded-xl border text-left transition-all flex items-center",
        selected 
          ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
          : "border-border hover:border-primary/40 hover:bg-secondary/50",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {children}
    </button>
  );
}
