import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, ChevronRight, Loader2, Flame, Dumbbell, Heart, Clock, Brain, HelpCircle } from "lucide-react";
import { SEOHead } from "@/components/seo/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

type Goal = "fat_loss" | "muscle_recovery" | "injury_recovery" | "anti_aging" | "cognitive" | "general_wellness";
type Experience = "beginner" | "some_experience" | "experienced";
type Timeline = "ready_now" | "soon" | "researching";
type Fear = "reconstitution" | "dosing" | "injections" | "side_effects" | "nothing";

interface QuizState {
  goal: Goal | null;
  experience: Experience | null;
  fear: Fear | null;
  timeline: Timeline | null;
  email: string;
  newsletter: boolean;
}

const goals: { value: Goal; label: string; description: string; icon: React.ElementType }[] = [
  { value: "fat_loss", label: "Burn Fat", description: "Optimize metabolism and body composition", icon: Flame },
  { value: "muscle_recovery", label: "Build Muscle", description: "Accelerate recovery and growth", icon: Dumbbell },
  { value: "injury_recovery", label: "Heal Faster", description: "Recover from injury or surgery", icon: Heart },
  { value: "anti_aging", label: "Slow Aging", description: "Longevity, skin, vitality", icon: Clock },
  { value: "cognitive", label: "Sharpen Mind", description: "Focus, memory, clarity", icon: Brain },
  { value: "general_wellness", label: "Not Sure Yet", description: "Show me the options", icon: HelpCircle },
];

const experienceLevels: { value: Experience; label: string; description: string }[] = [
  { value: "beginner", label: "Never", description: "This will be my first time" },
  { value: "some_experience", label: "Once or twice", description: "I've experimented but I'm not confident" },
  { value: "experienced", label: "Multiple cycles", description: "I know the basics, looking to optimize" },
];

const fears: { value: Fear; label: string; description: string }[] = [
  { value: "reconstitution", label: "Messing up reconstitution", description: "I don't want to waste expensive peptides" },
  { value: "dosing", label: "Getting the dose wrong", description: "I'm scared of taking too much or too little" },
  { value: "injections", label: "The injection itself", description: "Needles make me nervous" },
  { value: "side_effects", label: "Side effects", description: "I don't know what's normal" },
  { value: "nothing", label: "Nothing. I just need a protocol", description: "Give me the plan, I'll execute" },
];

const timelines: { value: Timeline; label: string; description: string }[] = [
  { value: "ready_now", label: "This week", description: "I have supplies or I'm ordering now" },
  { value: "soon", label: "This month", description: "Soon, still preparing" },
  { value: "researching", label: "Just researching", description: "Not ready yet, want to learn first" },
];

export default function Quiz() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(0); // 0 = intro
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [state, setState] = useState<QuizState>({
    goal: null,
    experience: null,
    fear: null,
    timeline: null,
    email: user?.email || "",
    newsletter: true,
  });

  const totalSteps = 5;

  const canProceed = () => {
    switch (step) {
      case 0: return true; // intro
      case 1: return state.goal !== null;
      case 2: return state.experience !== null;
      case 3: return state.fear !== null;
      case 4: return state.timeline !== null;
      case 5: return state.email.includes("@");
      default: return false;
    }
  };

  const handleSubmit = async () => {
    if (!canProceed()) return;
    
    setIsSubmitting(true);
    
    // Store in localStorage FIRST
    const quizData = {
      goal: state.goal,
      experience: state.experience,
      fear: state.fear,
      timeline: state.timeline,
      email: state.email,
    };
    localStorage.setItem("quizResponse", JSON.stringify(quizData));
    
    try {
      const { data, error } = await supabase
        .from("quiz_responses")
        .insert({
          user_id: user?.id || null,
          primary_goal: state.goal!,
          experience_level: state.experience!,
          main_concerns: [state.fear!],
          timeline: state.timeline!,
          email: state.email,
          newsletter_opt_in: state.newsletter,
        })
        .select()
        .single();

      if (!error && data) {
        localStorage.setItem("quizResponse", JSON.stringify({
          ...quizData,
          id: data.id,
        }));
      }
    } catch (error) {
      console.error("Error saving quiz to database:", error);
    }
    
    setIsSubmitting(false);
    navigate("/quiz/results");
  };

  const nextStep = () => {
    if (step === 5) {
      handleSubmit();
    } else if (canProceed()) {
      setStep(s => s + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(s => s - 1);
  };

  // Auto-advance for selection steps
  const handleGoalSelect = (goal: Goal) => {
    setState(s => ({ ...s, goal }));
    setTimeout(() => setStep(2), 300);
  };

  const handleExperienceSelect = (experience: Experience) => {
    setState(s => ({ ...s, experience }));
    setTimeout(() => setStep(3), 300);
  };

  const handleFearSelect = (fear: Fear) => {
    setState(s => ({ ...s, fear }));
    setTimeout(() => setStep(4), 300);
  };

  const handleTimelineSelect = (timeline: Timeline) => {
    setState(s => ({ ...s, timeline }));
    setTimeout(() => setStep(5), 300);
  };

  return (
    <>
      <SEOHead 
        title="Build Your Peptide Course | Peptide Playbook"
        description="Answer 5 quick questions and get a personalized peptide course tailored to your goals."
        canonical="/quiz"
      />
      <div className="min-h-screen bg-background flex flex-col">
        {/* Progress Bar */}
        {step > 0 && (
          <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
            <div className="container px-4 py-4">
              <div className="flex items-center justify-between mb-2">
                <button 
                  onClick={() => step === 1 ? setStep(0) : prevStep()}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  ← Back
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
        )}

        {/* Content */}
        <main className={cn("flex-1 flex items-center", step > 0 ? "pt-24 pb-24" : "")}>
          <div className="container px-4 max-w-2xl mx-auto w-full">
            <AnimatePresence mode="wait">
              {/* Step 0: Intro */}
              {step === 0 && (
                <StepContainer key="intro">
                  <div className="text-center py-12">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-6xl mb-6"
                    >
                      🧬
                    </motion.div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Let's build your peptide course</h1>
                    <p className="text-lg text-muted-foreground mb-8">
                      5 quick questions. Takes 90 seconds.<br />
                      Your personalized protocol is on the other side.
                    </p>
                    <Button size="lg" onClick={nextStep} className="btn-primary-clean h-12 px-8 text-base">
                      Let's Go
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </StepContainer>
              )}

              {/* Step 1: Goal */}
              {step === 1 && (
                <StepContainer key="goal">
                  <h1 className="text-2xl md:text-3xl font-semibold text-center mb-2">What's your #1 goal?</h1>
                  <p className="text-muted-foreground text-center mb-8">Select the one that matters most right now.</p>
                  <div className="grid gap-3">
                    {goals.map(goal => {
                      const Icon = goal.icon;
                      return (
                        <OptionCard
                          key={goal.value}
                          selected={state.goal === goal.value}
                          onClick={() => handleGoalSelect(goal.value)}
                        >
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{goal.label}</p>
                            <p className="text-sm text-muted-foreground">{goal.description}</p>
                          </div>
                        </OptionCard>
                      );
                    })}
                  </div>
                </StepContainer>
              )}

              {/* Step 2: Experience */}
              {step === 2 && (
                <StepContainer key="experience">
                  <h1 className="text-2xl md:text-3xl font-semibold text-center mb-2">Have you used peptides before?</h1>
                  <p className="text-muted-foreground text-center mb-8">This helps us tailor your course to your level.</p>
                  <div className="grid gap-3">
                    {experienceLevels.map(exp => (
                      <OptionCard
                        key={exp.value}
                        selected={state.experience === exp.value}
                        onClick={() => handleExperienceSelect(exp.value)}
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

              {/* Step 3: Fear */}
              {step === 3 && (
                <StepContainer key="fear">
                  <h1 className="text-2xl md:text-3xl font-semibold text-center mb-2">What worries you most about starting?</h1>
                  <p className="text-muted-foreground text-center mb-8">Pick the ONE biggest concern. Your course will address it.</p>
                  <div className="grid gap-3">
                    {fears.map(fear => (
                      <OptionCard
                        key={fear.value}
                        selected={state.fear === fear.value}
                        onClick={() => handleFearSelect(fear.value)}
                      >
                        <div>
                          <p className="font-medium">{fear.label}</p>
                          <p className="text-sm text-muted-foreground">{fear.description}</p>
                        </div>
                      </OptionCard>
                    ))}
                  </div>
                </StepContainer>
              )}

              {/* Step 4: Timeline */}
              {step === 4 && (
                <StepContainer key="timeline">
                  <h1 className="text-2xl md:text-3xl font-semibold text-center mb-2">When do you want to start?</h1>
                  <p className="text-muted-foreground text-center mb-8">This helps us prioritize what to show you first.</p>
                  <div className="grid gap-3">
                    {timelines.map(tl => (
                      <OptionCard
                        key={tl.value}
                        selected={state.timeline === tl.value}
                        onClick={() => handleTimelineSelect(tl.value)}
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
                    <span className="text-5xl mb-4 block">🎉</span>
                    <h1 className="text-2xl md:text-3xl font-semibold mb-2">Your course is ready!</h1>
                    <p className="text-muted-foreground">Enter your email to see your personalized protocol.</p>
                  </div>
                  
                  {/* Protocol Preview Teaser */}
                  <div className="bg-secondary/50 rounded-xl p-4 mb-6 border">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Your Protocol Preview</p>
                    <p className="font-semibold">
                      {state.goal === "fat_loss" && "Fat Loss Protocol"}
                      {state.goal === "muscle_recovery" && "Muscle & Recovery Protocol"}
                      {state.goal === "injury_recovery" && "Injury Recovery Protocol"}
                      {state.goal === "anti_aging" && "Anti-Aging & Longevity Protocol"}
                      {state.goal === "cognitive" && "Cognitive Enhancement Protocol"}
                      {state.goal === "general_wellness" && "Beginner Protocol"}
                    </p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {state.experience === "beginner" ? "Beginner-friendly" : state.experience === "some_experience" ? "Intermediate" : "Advanced"}
                      </span>
                      <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                        Dosing: ••••••
                      </span>
                    </div>
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
                        Send me weekly peptide research (free)
                      </label>
                    </div>
                    <Button 
                      onClick={handleSubmit} 
                      disabled={!state.email.includes("@") || isSubmitting}
                      className="w-full h-12 btn-primary-clean"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "See My Protocol"
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      We'll never spam you. Unsubscribe anytime.
                    </p>
                  </div>
                </StepContainer>
              )}
            </AnimatePresence>
          </div>
        </main>

        {/* Navigation (only for email step) */}
        {step === 5 && (
          <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t">
            <div className="container px-4 py-4 max-w-2xl mx-auto">
              <div className="flex items-center justify-start">
                <Button
                  variant="ghost"
                  onClick={prevStep}
                  className="gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </Button>
              </div>
            </div>
          </div>
        )}
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
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={cn(
        "w-full p-4 rounded-xl border text-left transition-all flex items-center",
        selected 
          ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
          : "border-border hover:border-primary/40 hover:bg-secondary/50",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {children}
    </motion.button>
  );
}
