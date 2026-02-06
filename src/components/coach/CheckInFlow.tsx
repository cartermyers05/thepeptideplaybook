import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useCheckIn, CheckInData } from "@/hooks/useCheckIn";
import { useMilestones } from "@/hooks/useMilestones";
import { useProtocol } from "@/hooks/useProtocol";
import { Check, Loader2, PartyPopper, Pill } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Step = "injection" | "adherence" | "energy" | "mood" | "sleep" | "side_effects" | "weight" | "notes" | "complete";

const SIDE_EFFECTS = [
  "None",
  "Fatigue",
  "Headache",
  "Nausea",
  "Injection site reaction",
  "Dizziness",
  "Appetite changes",
  "Sleep issues",
];

const EMOJI_SCALE = ["😫", "😕", "😐", "🙂", "😄"];

interface CheckInFlowProps {
  onComplete?: () => void;
}

interface ExtendedCheckInData extends Partial<CheckInData> {
  adherence?: "yes" | "partial" | "no";
  routine_changes?: string;
  weight_kg?: number;
}

export function CheckInFlow({ onComplete }: CheckInFlowProps) {
  const { protocol } = useProtocol();
  const { hasCheckedInToday, submitCheckIn } = useCheckIn();
  const { awardMilestone, hasMilestone } = useMilestones();

  const [step, setStep] = useState<Step>("injection");
  const [data, setData] = useState<ExtendedCheckInData>({
    side_effects: [],
    adherence: "yes",
  });

  // Check if protocol is fat-loss related (show weight tracking)
  const isFatLossProtocol = protocol?.goal?.toLowerCase().includes("fat") || 
    protocol?.goal?.toLowerCase().includes("weight") ||
    protocol?.goal?.toLowerCase().includes("lose");

  const handleComplete = async () => {
    if (!data.injection_done || !data.energy_level || !data.mood || !data.sleep_quality) {
      return;
    }

    try {
      await submitCheckIn.mutateAsync({
        protocolId: protocol?.id,
        data: {
          injection_done: data.injection_done,
          energy_level: data.energy_level,
          mood: data.mood,
          sleep_quality: data.sleep_quality,
          side_effects: data.side_effects || [],
          notes: data.notes,
          adherence: data.adherence,
          routine_changes: data.routine_changes,
          weight_kg: data.weight_kg,
        },
      });

      // Check for first check-in milestone
      if (!hasMilestone("first_checkin")) {
        await awardMilestone.mutateAsync("first_checkin");
      }

      setStep("complete");
      toast.success("Check-in complete!");
      onComplete?.();
    } catch (error) {
      toast.error("Failed to save check-in");
    }
  };

  if (hasCheckedInToday) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center py-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Already Checked In Today!</h2>
            <p className="text-muted-foreground">
              Great job! You've logged today's check-in. See you tomorrow.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (step === "complete") {
    return (
      <Card>
        <CardContent className="pt-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center text-center py-8"
          >
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <PartyPopper className="w-16 h-16 text-primary mb-4" />
            </motion.div>
            <h2 className="text-2xl font-semibold mb-2">Check-In Complete!</h2>
            <p className="text-muted-foreground">
              You're building great habits. Keep it up!
            </p>
          </motion.div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        {/* Protocol Context Banner */}
        {protocol && protocol.status === "active" && (
          <div className="mb-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-2 mb-1">
              <Pill className="w-4 h-4 text-primary" />
              <p className="text-sm font-medium text-foreground">{protocol.protocol_name}</p>
            </div>
            <p className="text-xs text-muted-foreground">
              Week {protocol.current_week} of {protocol.cycle_length_weeks} • {protocol.peptides.map(p => p.name).join(', ')}
            </p>
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === "injection" && (
            <StepWrapper key="injection">
              <h2 className="text-xl font-semibold text-center mb-2">
                Did you complete today's injection?
              </h2>
              <p className="text-muted-foreground text-center mb-6">
                Log your daily peptide administration
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant={data.injection_done === "yes" ? "default" : "outline"}
                  className="flex-1 h-14 text-lg"
                  onClick={() => {
                    setData({ ...data, injection_done: "yes" });
                    setStep("adherence");
                  }}
                >
                  ✓ Yes
                </Button>
                <Button
                  variant={data.injection_done === "not_yet" ? "default" : "outline"}
                  className="flex-1 h-14 text-lg"
                  onClick={() => {
                    setData({ ...data, injection_done: "not_yet" });
                    setStep("adherence");
                  }}
                >
                  ⏳ Not Yet
                </Button>
                <Button
                  variant={data.injection_done === "skipped" ? "default" : "outline"}
                  className="flex-1 h-14 text-lg"
                  onClick={() => {
                    setData({ ...data, injection_done: "skipped" });
                    setStep("adherence");
                  }}
                >
                  ✗ Skipped
                </Button>
              </div>
            </StepWrapper>
          )}

          {step === "adherence" && (
            <StepWrapper key="adherence">
              <h2 className="text-xl font-semibold text-center mb-2">
                Did you follow your protocol dosing?
              </h2>
              <p className="text-muted-foreground text-center mb-6">
                Track how closely you followed the plan
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <Button
                  variant={data.adherence === "yes" ? "default" : "outline"}
                  className="flex-1 h-14 text-lg"
                  onClick={() => {
                    setData({ ...data, adherence: "yes" });
                    setStep("energy");
                  }}
                >
                  ✓ Fully
                </Button>
                <Button
                  variant={data.adherence === "partial" ? "default" : "outline"}
                  className="flex-1 h-14 text-lg"
                  onClick={() => {
                    setData({ ...data, adherence: "partial" });
                    setStep("energy");
                  }}
                >
                  ◐ Partially
                </Button>
                <Button
                  variant={data.adherence === "no" ? "default" : "outline"}
                  className="flex-1 h-14 text-lg"
                  onClick={() => {
                    setData({ ...data, adherence: "no" });
                    setStep("energy");
                  }}
                >
                  ✗ No
                </Button>
              </div>
            </StepWrapper>
          )}

          {step === "energy" && (
            <StepWrapper key="energy">
              <h2 className="text-xl font-semibold text-center mb-2">
                How's your energy today?
              </h2>
              <EmojiScale
                value={data.energy_level}
                onChange={(val) => {
                  setData({ ...data, energy_level: val });
                  setStep("mood");
                }}
              />
            </StepWrapper>
          )}

          {step === "mood" && (
            <StepWrapper key="mood">
              <h2 className="text-xl font-semibold text-center mb-2">
                How's your mood?
              </h2>
              <EmojiScale
                value={data.mood}
                onChange={(val) => {
                  setData({ ...data, mood: val });
                  setStep("sleep");
                }}
              />
            </StepWrapper>
          )}

          {step === "sleep" && (
            <StepWrapper key="sleep">
              <h2 className="text-xl font-semibold text-center mb-2">
                How was your sleep?
              </h2>
              <EmojiScale
                value={data.sleep_quality}
                onChange={(val) => {
                  setData({ ...data, sleep_quality: val });
                  setStep("side_effects");
                }}
              />
            </StepWrapper>
          )}

          {step === "side_effects" && (
            <StepWrapper key="side_effects">
              <h2 className="text-xl font-semibold text-center mb-2">
                Any side effects?
              </h2>
              <p className="text-muted-foreground text-center mb-6">
                Select all that apply
              </p>
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {SIDE_EFFECTS.map((effect) => (
                  <Button
                    key={effect}
                    variant={data.side_effects?.includes(effect) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      const current = data.side_effects || [];
                      if (effect === "None") {
                        setData({ ...data, side_effects: ["None"] });
                      } else {
                        const filtered = current.filter((e) => e !== "None");
                        setData({
                          ...data,
                          side_effects: filtered.includes(effect)
                            ? filtered.filter((e) => e !== effect)
                            : [...filtered, effect],
                        });
                      }
                    }}
                  >
                    {effect}
                  </Button>
                ))}
              </div>
              <Button
                className="w-full"
                onClick={() => setStep(isFatLossProtocol ? "weight" : "notes")}
                disabled={!data.side_effects?.length}
              >
                Continue
              </Button>
            </StepWrapper>
          )}

          {step === "weight" && (
            <StepWrapper key="weight">
              <h2 className="text-xl font-semibold text-center mb-2">
                Track your weight
              </h2>
              <p className="text-muted-foreground text-center mb-6">
                Optional - helps track progress over time
              </p>
              <div className="flex items-center gap-3 mb-6">
                <Input
                  type="number"
                  placeholder="Weight in kg"
                  value={data.weight_kg || ""}
                  onChange={(e) => setData({ ...data, weight_kg: e.target.value ? parseFloat(e.target.value) : undefined })}
                  className="text-center text-lg"
                  step="0.1"
                />
                <span className="text-muted-foreground">kg</span>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep("notes")}
                >
                  Skip
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => setStep("notes")}
                >
                  Continue
                </Button>
              </div>
            </StepWrapper>
          )}

          {step === "notes" && (
            <StepWrapper key="notes">
              <h2 className="text-xl font-semibold text-center mb-2">
                Any notes for today?
              </h2>
              <p className="text-muted-foreground text-center mb-6">
                Optional - track anything else you noticed
              </p>
              <Textarea
                placeholder="How you're feeling, observations, questions..."
                value={data.notes || ""}
                onChange={(e) => setData({ ...data, notes: e.target.value })}
                className="mb-4 min-h-[100px]"
              />
              <Button
                className="w-full"
                onClick={handleComplete}
                disabled={submitCheckIn.isPending}
              >
                {submitCheckIn.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                Complete Check-In
              </Button>
            </StepWrapper>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

function StepWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="py-4"
    >
      {children}
    </motion.div>
  );
}

function EmojiScale({
  value,
  onChange,
}: {
  value?: number;
  onChange: (val: number) => void;
}) {
  return (
    <div className="flex justify-center gap-4 py-6">
      {EMOJI_SCALE.map((emoji, index) => (
        <button
          key={index}
          onClick={() => onChange(index + 1)}
          className={cn(
            "text-4xl transition-transform hover:scale-125",
            value === index + 1 ? "scale-125 opacity-100" : "opacity-60 hover:opacity-100"
          )}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
