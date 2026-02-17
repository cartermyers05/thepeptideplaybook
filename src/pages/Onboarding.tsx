import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Dumbbell, Heart, Clock, Brain, Compass, Syringe, AlertTriangle, Scale, DollarSign, ThumbsUp, ChevronRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useQuizResponse } from "@/hooks/useQuizResponse";
import { supabase } from "@/integrations/supabase/client";
import { SEOHead } from "@/components/seo/SEOHead";

type Step = "goal" | "experience" | "concerns" | "timeline";

const goals = [
  { id: "fat_loss", icon: Flame, label: "Burn Fat", desc: "Speed up metabolism" },
  { id: "muscle_growth", icon: Dumbbell, label: "Build Muscle", desc: "Recover faster, grow more" },
  { id: "injury_recovery", icon: Heart, label: "Heal Faster", desc: "Recover from injuries" },
  { id: "anti_aging", icon: Clock, label: "Slow Aging", desc: "Feel younger, live better" },
  { id: "cognitive", icon: Brain, label: "Sharpen Mind", desc: "Better focus and memory" },
  { id: "not_sure", icon: Compass, label: "Not Sure Yet", desc: "Help me figure it out" },
];

const experienceLevels = [
  { id: "beginner", label: "Never Used Peptides", desc: "Completely new to this" },
  { id: "some_research", label: "Some Research", desc: "I've read about them" },
  { id: "experienced", label: "Experienced", desc: "I've used peptides before" },
];

const concerns = [
  { id: "injections", icon: Syringe, label: "Injections" },
  { id: "side_effects", icon: AlertTriangle, label: "Side Effects" },
  { id: "legal_status", icon: Scale, label: "Legal Status" },
  { id: "cost", icon: DollarSign, label: "Cost" },
  { id: "nothing", icon: ThumbsUp, label: "Nothing, I'm Ready" },
];

const timelines = [
  { id: "asap", label: "As Soon as Possible" },
  { id: "1_month", label: "Within a Month" },
  { id: "researching", label: "Still Researching" },
];

const steps: Step[] = ["goal", "experience", "concerns", "timeline"];

const stepTitles: Record<Step, string> = {
  goal: "What's your main goal?",
  experience: "What's your experience level?",
  concerns: "What's your biggest concern?",
  timeline: "When do you want to start?",
};

export default function Onboarding() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: existingResponse, isLoading } = useQuizResponse();

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    primary_goal: "",
    experience_level: "",
    main_concerns: [] as string[],
    timeline: "",
  });
  const [saving, setSaving] = useState(false);

  // Skip if already completed onboarding
  useEffect(() => {
    if (!isLoading && existingResponse) {
      navigate("/dashboard", { replace: true });
    }
  }, [isLoading, existingResponse, navigate]);

  const handleSelect = async (key: string, value: string) => {
    const updated = { ...answers };

    if (key === "main_concerns") {
      if (value === "nothing") {
        updated.main_concerns = ["nothing"];
      } else {
        const filtered = updated.main_concerns.filter(c => c !== "nothing");
        if (filtered.includes(value)) {
          updated.main_concerns = filtered.filter(c => c !== value);
        } else {
          updated.main_concerns = [...filtered, value];
        }
      }
    } else {
      (updated as any)[key] = value;
    }

    setAnswers(updated);

    // Auto-advance for single-select steps
    if (key !== "main_concerns") {
      await advanceOrSave(updated, currentStep);
    }
  };

  const handleConcernsContinue = async () => {
    if (answers.main_concerns.length === 0) return;
    await advanceOrSave(answers, currentStep);
  };

  const advanceOrSave = async (data: typeof answers, stepIdx: number) => {
    if (stepIdx < steps.length - 1) {
      setCurrentStep(stepIdx + 1);
    } else {
      // Final step — save
      setSaving(true);
      try {
        const { error } = await supabase.from("quiz_responses").insert({
          user_id: user?.id,
          primary_goal: data.primary_goal,
          experience_level: data.experience_level,
          main_concerns: data.main_concerns.length > 0 ? data.main_concerns : ["nothing"],
          timeline: data.timeline,
        });

        if (error) {
          console.error("Error saving onboarding:", error);
        }

        navigate("/dashboard/my-plan?updated=true", { replace: true });
      } catch (err) {
        console.error("Save error:", err);
        navigate("/dashboard", { replace: true });
      }
    }
  };

  const step = steps[currentStep];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 rounded-lg bg-primary animate-pulse" />
      </div>
    );
  }

  if (saving) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 animate-pulse mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Building Your Blueprint...</h2>
          <p className="text-muted-foreground text-sm">This only takes a moment.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <SEOHead title="Set Up Your Blueprint | Peptide Playbook" description="Personalize your peptide blueprint." canonical="/welcome/onboarding" noIndex />
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        {/* Progress dots */}
        <div className="flex gap-2 mb-8">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i <= currentStep ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-lg"
          >
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
              {stepTitles[step]}
            </h1>

            {step === "goal" && (
              <div className="grid grid-cols-2 gap-3">
                {goals.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => handleSelect("primary_goal", g.id)}
                    className={`flex flex-col items-center gap-2 p-5 rounded-xl border transition-all ${
                      answers.primary_goal === g.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 bg-card"
                    }`}
                  >
                    <g.icon className="w-7 h-7 text-foreground" />
                    <span className="font-medium text-sm">{g.label}</span>
                    <span className="text-xs text-muted-foreground">{g.desc}</span>
                  </button>
                ))}
              </div>
            )}

            {step === "experience" && (
              <div className="space-y-3">
                {experienceLevels.map((e) => (
                  <button
                    key={e.id}
                    onClick={() => handleSelect("experience_level", e.id)}
                    className={`w-full text-left p-5 rounded-xl border transition-all ${
                      answers.experience_level === e.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 bg-card"
                    }`}
                  >
                    <p className="font-medium">{e.label}</p>
                    <p className="text-sm text-muted-foreground">{e.desc}</p>
                  </button>
                ))}
              </div>
            )}

            {step === "concerns" && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  {concerns.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleSelect("main_concerns", c.id)}
                      className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                        answers.main_concerns.includes(c.id)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50 bg-card"
                      }`}
                    >
                      <c.icon className="w-5 h-5 text-foreground" />
                      <span className="font-medium text-sm">{c.label}</span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleConcernsContinue}
                  disabled={answers.main_concerns.length === 0}
                  className="mt-6 w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-primary text-primary-foreground font-medium disabled:opacity-40 transition-opacity"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            {step === "timeline" && (
              <div className="space-y-3">
                {timelines.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleSelect("timeline", t.id)}
                    className={`w-full text-left p-5 rounded-xl border transition-all ${
                      answers.timeline === t.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 bg-card"
                    }`}
                  >
                    <p className="font-medium">{t.label}</p>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
