import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dna, Check, PartyPopper, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { ExtractedValues } from "@/hooks/useQuizChat";

interface BuildingAnimationProps {
  extractedValues: ExtractedValues;
  getGoalLabel: (goal: string | null) => string | null;
  getExperienceLabel: (exp: string | null) => string | null;
  getConcernLabel: (concern: string | null) => string | null;
  getReadinessLabel: (readiness: string | null) => string | null;
  onComplete: () => void;
  isSubmitting?: boolean;
}

const buildSteps = [
  { id: 1, label: "Analyzing your goals...", duration: 1500 },
  { id: 2, label: "Selecting optimal peptides...", duration: 1800 },
  { id: 3, label: "Building your blueprint...", duration: 2000 },
  { id: 4, label: "Personalizing your schedule...", duration: 1500 },
];

export function BuildingAnimation({
  extractedValues,
  getGoalLabel,
  getExperienceLabel,
  getConcernLabel,
  getReadinessLabel,
  onComplete,
  isSubmitting = false,
}: BuildingAnimationProps) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Run through building steps
  useEffect(() => {
    if (currentStep < buildSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, buildSteps[currentStep].duration);
      return () => clearTimeout(timer);
    } else if (currentStep === buildSteps.length && !isComplete && !hasError) {
      // All steps done - mark complete and trigger save
      setIsComplete(true);
      try {
        onComplete();
      } catch (error) {
        console.error('Error in onComplete:', error);
        setHasError(true);
        toast.error('Failed to create your blueprint. Please try again.');
      }
    }
  }, [currentStep, isComplete, hasError, onComplete]);

  // After complete + save done, redirect to course preview
  useEffect(() => {
    if (isComplete && !isSubmitting && !hasError) {
      const timer = setTimeout(() => {
        // Store goal in localStorage for results page
        localStorage.setItem('selectedCourseGoal', extractedValues.goal || 'beginner');
        navigate('/quiz/results', { replace: true });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isComplete, isSubmitting, hasError, navigate, extractedValues.goal]);

  const progress = Math.min((currentStep / buildSteps.length) * 100, 100);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center"
      >
        {/* Icon */}
        <div className="mb-8">
          <AnimatePresence mode="wait">
            {hasError ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto"
              >
                <AlertCircle className="w-10 h-10 md:w-12 md:h-12 text-destructive" />
              </motion.div>
            ) : !isComplete ? (
              <motion.div
                key="building"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Dna className="w-10 h-10 md:w-12 md:h-12 text-primary" />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto"
              >
                <PartyPopper className="w-10 h-10 md:w-12 md:h-12 text-green-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          {hasError 
            ? "Something went wrong" 
            : isComplete 
              ? "Your Blueprint is Ready!" 
              : "Building Your Blueprint..."}
        </h1>
        <p className="text-muted-foreground mb-8">
          {hasError
            ? "We couldn't save your blueprint. Please try the quiz again."
            : isComplete 
              ? "Taking you to see your personalized program..." 
              : "Personalizing your 8-week peptide program"}
        </p>
        
        {hasError && (
          <button
            onClick={() => navigate("/quiz", { replace: true })}
            className="mb-6 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        )}

        {/* Progress bar */}
        <div className="h-2 bg-secondary rounded-full overflow-hidden mb-6">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Steps */}
        <div className="space-y-3 text-left">
          {buildSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ 
                opacity: index <= currentStep ? 1 : 0.4,
                x: 0 
              }}
              transition={{ delay: index * 0.2, duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                index < currentStep 
                  ? "bg-green-500/20 text-green-500" 
                  : index === currentStep 
                    ? "bg-primary/20 text-primary" 
                    : "bg-muted text-muted-foreground"
              }`}>
                {index < currentStep ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="text-xs font-medium">{index + 1}</span>
                )}
              </div>
              <span className={`text-sm ${
                index <= currentStep ? "text-foreground" : "text-muted-foreground"
              }`}>
                {step.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Extracted values summary */}
        {extractedValues.goal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-4 bg-muted/50 rounded-xl text-left"
          >
            <p className="text-sm text-muted-foreground mb-2">Your personalization:</p>
            <div className="flex flex-wrap gap-2">
              {extractedValues.goal && (
                <span className="px-3 py-1 bg-background rounded-full text-sm">
                  {getGoalLabel(extractedValues.goal)}
                </span>
              )}
              {extractedValues.experience && (
                <span className="px-3 py-1 bg-background rounded-full text-sm">
                  {getExperienceLabel(extractedValues.experience)}
                </span>
              )}
              {extractedValues.concern && extractedValues.concern !== 'nothing' && (
                <span className="px-3 py-1 bg-background rounded-full text-sm">
                  {getConcernLabel(extractedValues.concern)}
                </span>
              )}
              {extractedValues.readiness && (
                <span className="px-3 py-1 bg-background rounded-full text-sm">
                  {getReadinessLabel(extractedValues.readiness)}
                </span>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
