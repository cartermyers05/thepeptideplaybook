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
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-[400px] flex flex-col items-center justify-center px-4"
    >
      <AnimatePresence mode="wait">
        {phase === 'building' && (
          <motion.div
            key="building"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-8 w-full max-w-md"
          >
            <div>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-5xl mb-4"
              >
                🧬
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">Building Your Course...</h2>
            </div>

            {/* Extracted values summary */}
            <div className="bg-secondary/50 rounded-xl p-4 text-left space-y-2">
              {extractedValues.goal && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Goal:</span>
                  <span className="font-medium">{goalLabel}</span>
                </motion.div>
              )}
              {extractedValues.experience && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Experience:</span>
                  <span className="font-medium">{getExperienceLabel(extractedValues.experience)}</span>
                </motion.div>
              )}
              {extractedValues.concern && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Addressing:</span>
                  <span className="font-medium">{getConcernLabel(extractedValues.concern)}</span>
                </motion.div>
              )}
              {extractedValues.timeline && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Timeline:</span>
                  <span className="font-medium">{getTimelineLabel(extractedValues.timeline)}</span>
                </motion.div>
              )}
            </div>

            {/* Building progress */}
            <div className="space-y-2">
              {buildingSteps.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: index <= currentBuildStep ? 1 : 0.3 
                  }}
                  className="flex items-center justify-center gap-2 text-sm"
                >
                  {index < currentBuildStep ? (
                    <Check className="w-4 h-4 text-primary" />
                  ) : index === currentBuildStep ? (
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  ) : (
                    <div className="w-4 h-4" />
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
            className="text-center space-y-6 w-full max-w-md"
          >
            <div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-5xl mb-4"
              >
                🎉
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">Your {goalLabel} Course is Ready!</h2>
              <p className="text-muted-foreground text-sm">
                8 weeks · Personalized protocol · Beginner-friendly · Step-by-step guides
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 text-center text-lg"
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
                disabled={!email.includes('@') || isSubmitting}
                className="w-full h-12"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
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
    </motion.div>
  );
}
