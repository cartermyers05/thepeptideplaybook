import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

export interface InteractiveStep {
  id: string;
  title: string;
  content: string;
  tips?: string[];
  warnings?: string[];
  confirmText: string;
}

interface InteractiveGuideProps {
  guideId: string;
  title: string;
  steps: InteractiveStep[];
  onComplete?: () => void;
  completedColor?: string;
}

const STORAGE_PREFIX = "peptide_playbook_guide_";

export function InteractiveGuide({
  guideId,
  title,
  steps,
  onComplete,
  completedColor = "bg-green-100 border-green-200",
}: InteractiveGuideProps) {
  const storageKey = `${STORAGE_PREFIX}${guideId}`;
  
  // Load saved state from localStorage
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(completedSteps));
    
    // Check if all steps completed
    const allComplete = steps.every((step) => completedSteps[step.id]);
    if (allComplete && Object.keys(completedSteps).length === steps.length) {
      onComplete?.();
    }
  }, [completedSteps, steps, storageKey, onComplete]);

  const toggleStep = (stepId: string) => {
    setCompletedSteps((prev) => {
      const newState = { ...prev, [stepId]: !prev[stepId] };
      
      // Show encouraging toast on completion
      if (newState[stepId]) {
        const completedCount = Object.values(newState).filter(Boolean).length;
        if (completedCount === steps.length) {
          toast.success(`${title} complete! 🎉`);
        } else if (completedCount === 1) {
          toast.success("Great start! Keep going.");
        }
      }
      
      return newState;
    });
  };

  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const progress = (completedCount / steps.length) * 100;
  const isAllComplete = completedCount === steps.length;

  const handleReset = () => {
    setCompletedSteps({});
    toast.info("Progress reset");
  };

  return (
    <div className="space-y-4">
      {/* Progress header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">
            {completedCount} of {steps.length} steps
          </span>
          {isAllComplete && (
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
              Complete!
            </span>
          )}
        </div>
        {completedCount > 0 && (
          <button
            onClick={handleReset}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            Reset
          </button>
        )}
      </div>
      
      <Progress value={progress} className="h-1.5" />

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step, index) => {
          const isCompleted = completedSteps[step.id];
          const previousCompleted = index === 0 || completedSteps[steps[index - 1].id];
          const isLocked = !previousCompleted && !isCompleted;

          return (
            <div
              key={step.id}
              className={cn(
                "rounded-xl border p-4 transition-all",
                isCompleted
                  ? completedColor
                  : isLocked
                  ? "bg-gray-50 border-gray-200 opacity-60"
                  : "bg-white border-gray-200 hover:border-gray-300"
              )}
            >
              <div className="flex gap-3">
                {/* Step number / checkbox */}
                <div className="flex-shrink-0 pt-0.5">
                  {isCompleted ? (
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <div
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                        isLocked
                          ? "bg-gray-200 text-gray-400"
                          : "bg-gray-900 text-white"
                      )}
                    >
                      {index + 1}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-2">
                  <p
                    className={cn(
                      "font-medium text-sm",
                      isCompleted ? "text-green-800" : "text-gray-900"
                    )}
                  >
                    {step.title}
                  </p>
                  
                  {!isCompleted && !isLocked && (
                    <>
                      <p className="text-sm text-gray-600">{step.content}</p>
                      
                      {step.tips && step.tips.length > 0 && (
                        <div className="bg-blue-50 rounded-lg p-3 text-xs text-blue-700">
                          <p className="font-medium mb-1">💡 Tips:</p>
                          <ul className="space-y-0.5">
                            {step.tips.map((tip, i) => (
                              <li key={i}>• {tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {step.warnings && step.warnings.length > 0 && (
                        <div className="bg-amber-50 rounded-lg p-3 text-xs text-amber-700">
                          <p className="font-medium mb-1">⚠️ Important:</p>
                          <ul className="space-y-0.5">
                            {step.warnings.map((warning, i) => (
                              <li key={i}>• {warning}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  )}

                  {/* Confirmation checkbox */}
                  {!isLocked && (
                    <label className="flex items-center gap-2 cursor-pointer group mt-2">
                      <Checkbox
                        checked={isCompleted}
                        onCheckedChange={() => toggleStep(step.id)}
                        className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                      />
                      <span
                        className={cn(
                          "text-xs",
                          isCompleted
                            ? "text-green-700 line-through"
                            : "text-gray-500 group-hover:text-gray-700"
                        )}
                      >
                        {step.confirmText}
                      </span>
                    </label>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}