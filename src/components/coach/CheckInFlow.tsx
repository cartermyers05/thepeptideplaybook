import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useCheckIn, CheckInData } from "@/hooks/useCheckIn";
import { useStreak } from "@/hooks/useStreak";
import { useMilestones } from "@/hooks/useMilestones";
import { useProtocol } from "@/hooks/useProtocol";
import { Check, Loader2, PartyPopper, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Step = "injection" | "energy" | "mood" | "sleep" | "side_effects" | "notes" | "complete";

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

export function CheckInFlow({ onComplete }: CheckInFlowProps) {
  const { protocol } = useProtocol();
  const { hasCheckedInToday, submitCheckIn, todayCheckIn } = useCheckIn();
  const { updateStreak, currentStreak } = useStreak();
  const { awardMilestone, hasMilestone } = useMilestones();

  const [step, setStep] = useState<Step>("injection");
  const [data, setData] = useState<Partial<CheckInData>>({
    side_effects: [],
  });

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
        },
      });

      // Update streak
      await updateStreak.mutateAsync();

      // Check for first check-in milestone
      if (!hasMilestone("first_checkin")) {
        await awardMilestone.mutateAsync("first_checkin");
      }

      // Check streak milestones
      const newStreak = currentStreak + 1;
      if (newStreak >= 7 && !hasMilestone("streak_7")) {
        await awardMilestone.mutateAsync("streak_7");
      }
      if (newStreak >= 14 && !hasMilestone("streak_14")) {
        await awardMilestone.mutateAsync("streak_14");
      }
      if (newStreak >= 30 && !hasMilestone("streak_30")) {
        await awardMilestone.mutateAsync("streak_30");
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
            <p className="text-muted-foreground mb-4">
              Great job! You've logged today's check-in. Come back tomorrow to continue your streak.
            </p>
            <div className="flex items-center gap-2 text-lg">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="font-medium">{currentStreak}-day streak</span>
            </div>
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
            <p className="text-muted-foreground mb-4">
              You're building great habits. Keep it up!
            </p>
            <div className="flex items-center gap-2 text-2xl font-bold text-primary">
              <Flame className="w-6 h-6 text-orange-500" />
              <span>{currentStreak + 1}-day streak</span>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
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
                    setStep("energy");
                  }}
                >
                  ✓ Yes
                </Button>
                <Button
                  variant={data.injection_done === "not_yet" ? "default" : "outline"}
                  className="flex-1 h-14 text-lg"
                  onClick={() => {
                    setData({ ...data, injection_done: "not_yet" });
                    setStep("energy");
                  }}
                >
                  ⏳ Not Yet
                </Button>
                <Button
                  variant={data.injection_done === "skipped" ? "default" : "outline"}
                  className="flex-1 h-14 text-lg"
                  onClick={() => {
                    setData({ ...data, injection_done: "skipped" });
                    setStep("energy");
                  }}
                >
                  ✗ Skipped
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
                onClick={() => setStep("notes")}
                disabled={!data.side_effects?.length}
              >
                Continue
              </Button>
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
