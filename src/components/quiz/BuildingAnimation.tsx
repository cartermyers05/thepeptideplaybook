import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { ExtractedValues } from "@/hooks/useQuizChat";

interface BuildingAnimationProps {
  extractedValues: ExtractedValues;
  getGoalLabel: (goal: string | null) => string | null;
  getExperienceLabel: (exp: string | null) => string | null;
  getConcernLabel: (concern: string | null) => string | null;
  getTimelineLabel: (timeline: string | null) => string | null;
  onComplete: (email: string, newsletter: boolean) => void;
  isSubmitting: boolean;
}

const buildingSteps = [
  "Analyzing your goals...",
  "Selecting optimal peptides...",
  "Creating your 8-week program...",
  "Personalizing lessons..."
];

export function BuildingAnimation({
  extractedValues,
  getGoalLabel,
  getExperienceLabel,
  getConcernLabel,
  getTimelineLabel,
  onComplete,
  isSubmitting
}: BuildingAnimationProps) {
  const [phase, setPhase] = useState<'building' | 'email'>('building');
  const [currentBuildStep, setCurrentBuildStep] = useState(0);
  const [email, setEmail] = useState('');
  const [newsletter, setNewsletter] = useState(true);

  useEffect(() => {
    if (phase === 'building') {
      const interval = setInterval(() => {
        setCurrentBuildStep(prev => {
          if (prev >= buildingSteps.length - 1) {
            clearInterval(interval);
            setTimeout(() => setPhase('email'), 500);
            return prev;
          }
          return prev + 1;
        });
      }, 800);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const goalLabel = getGoalLabel(extractedValues.goal);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      onComplete(email, newsletter);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      <AnimatePresence mode="wait">
        {phase === 'building' && (
          <motion.div
            key="building"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-10 w-full max-w-lg"
          >
            <div>
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                className="text-6xl md:text-7xl mb-6"
              >
                🧬
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Building Your Course...
              </h2>
            </div>

            {/* Extracted values summary */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-secondary/50 backdrop-blur-sm rounded-2xl p-6 text-left space-y-3 border border-border/50"
            >
              {extractedValues.goal && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-foreground flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-background" />
                  </div>
                  <span className="text-muted-foreground">Goal:</span>
                  <span className="font-medium">{goalLabel}</span>
                </motion.div>
              )}
              {extractedValues.experience && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-foreground flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-background" />
                  </div>
                  <span className="text-muted-foreground">Experience:</span>
                  <span className="font-medium">{getExperienceLabel(extractedValues.experience)}</span>
                </motion.div>
              )}
              {extractedValues.concern && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-foreground flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-background" />
                  </div>
                  <span className="text-muted-foreground">Addressing:</span>
                  <span className="font-medium">{getConcernLabel(extractedValues.concern)}</span>
                </motion.div>
              )}
              {extractedValues.timeline && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-foreground flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-background" />
                  </div>
                  <span className="text-muted-foreground">Timeline:</span>
                  <span className="font-medium">{getTimelineLabel(extractedValues.timeline)}</span>
                </motion.div>
              )}
            </motion.div>

            {/* Building progress */}
            <div className="space-y-3">
              {buildingSteps.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: index <= currentBuildStep ? 1 : 0.3 
                  }}
                  className="flex items-center justify-center gap-3"
                >
                  {index < currentBuildStep ? (
                    <Check className="w-5 h-5 text-foreground" />
                  ) : index === currentBuildStep ? (
                    <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                  ) : (
                    <div className="w-5 h-5" />
                  )}
                  <span className={index <= currentBuildStep ? "text-foreground" : "text-muted-foreground"}>
                    {step}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {phase === 'email' && (
          <motion.div
            key="email"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8 w-full max-w-md"
          >
            <div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-6xl md:text-7xl mb-6"
              >
                🎉
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                Your {goalLabel} Course is Ready!
              </h2>
              <p className="text-muted-foreground">
                8 weeks · Personalized protocol · Step-by-step guides
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 text-center text-lg bg-background border-border/50"
                autoFocus
              />
              
              <div className="flex items-center justify-center gap-2">
                <Checkbox
                  id="newsletter"
                  checked={newsletter}
                  onCheckedChange={(checked) => setNewsletter(checked as boolean)}
                />
                <label htmlFor="newsletter" className="text-sm text-muted-foreground cursor-pointer">
                  Send me weekly peptide research
                </label>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={!email.includes('@') || isSubmitting}
                className="w-full h-14 text-lg"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "See My Course →"
                )}
              </Button>

              <p className="text-xs text-muted-foreground">
                We'll never spam you. Unsubscribe anytime.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
