import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PartyPopper, Package, Clock, ShoppingCart, ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/seo/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type Step = 1 | 2 | 3;
type SuppliesStatus = "have_them" | "this_week" | "need_to_order";

export default function Welcome() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [step, setStep] = useState<Step>(1);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSuppliesChoice = async (status: SuppliesStatus) => {
    if (!user) return;
    
    setIsUpdating(true);
    try {
      // Update the user's course with supplies status
      const { error } = await supabase
        .from("user_courses")
        .update({ 
          supplies_status: status,
          status: status === "have_them" ? "active" : "waiting_supplies",
          started_at: status === "have_them" ? new Date().toISOString() : null,
        })
        .eq("user_id", user.id);

      if (error) throw error;

      // Invalidate course queries
      queryClient.invalidateQueries({ queryKey: ["user-course"] });
      queryClient.invalidateQueries({ queryKey: ["course"] });

      setStep(3);
    } catch (err) {
      console.error("Error updating supplies status:", err);
      toast.error("Failed to save your choice. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleGoToDashboard = () => {
    navigate("/dashboard", { replace: true });
  };

  return (
    <>
      <SEOHead
        title="Welcome | Peptide Playbook"
        description="Welcome to your personalized peptide course."
        canonical="/welcome"
        noIndex
      />
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-lg w-full">
          <AnimatePresence mode="wait">
            {/* Step 1: Celebration */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6"
                >
                  <PartyPopper className="w-12 h-12 text-primary" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h1 className="text-3xl md:text-4xl font-bold mb-3">
                    You're In! 🎉
                  </h1>
                  <p className="text-lg text-muted-foreground mb-8">
                    Your personalized peptide course is ready. Let's get you set up for success.
                  </p>

                  <div className="flex justify-center gap-2 mb-8">
                    {[1, 2, 3].map((s) => (
                      <div
                        key={s}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          s === step ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>

                  <Button size="lg" onClick={() => setStep(2)} className="px-12">
                    Let's Go
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              </motion.div>
            )}

            {/* Step 2: Supplies Check */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-20 h-20 mx-auto rounded-full bg-secondary flex items-center justify-center mb-6"
                >
                  <Package className="w-10 h-10 text-foreground" />
                </motion.div>

                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                  Do you have your supplies?
                </h2>
                <p className="text-muted-foreground mb-8">
                  This helps us personalize when your course starts
                </p>

                <div className="flex justify-center gap-2 mb-8">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        s === step ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => handleSuppliesChoice("have_them")}
                    disabled={isUpdating}
                    className="w-full p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors text-left flex items-center gap-4 disabled:opacity-50"
                  >
                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <p className="font-semibold">I have them</p>
                      <p className="text-sm text-muted-foreground">Ready to start Day 0</p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleSuppliesChoice("this_week")}
                    disabled={isUpdating}
                    className="w-full p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors text-left flex items-center gap-4 disabled:opacity-50"
                  >
                    <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                      <p className="font-semibold">Arriving this week</p>
                      <p className="text-sm text-muted-foreground">I'll wait for delivery</p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleSuppliesChoice("need_to_order")}
                    disabled={isUpdating}
                    className="w-full p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors text-left flex items-center gap-4 disabled:opacity-50"
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <ShoppingCart className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-semibold">Still need to order</p>
                      <p className="text-sm text-muted-foreground">Show me the supplies checklist</p>
                    </div>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: What's Next */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6"
                >
                  <Sparkles className="w-10 h-10 text-primary" />
                </motion.div>

                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                  Here's What's Next
                </h2>
                <p className="text-muted-foreground mb-8">
                  Your dashboard is ready with everything you need
                </p>

                <div className="flex justify-center gap-2 mb-8">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        s === step ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>

                <div className="bg-card border border-border rounded-2xl p-6 mb-8 text-left space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Review your personalized protocol</p>
                      <p className="text-sm text-muted-foreground">See your recommended peptides and schedule</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Start Day 0 when ready</p>
                      <p className="text-sm text-muted-foreground">Begin with preparation and setup</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Ask your AI coach anytime</p>
                      <p className="text-sm text-muted-foreground">Get instant answers to your questions</p>
                    </div>
                  </div>
                </div>

                <Button size="lg" onClick={handleGoToDashboard} className="px-12 w-full sm:w-auto">
                  Go to My Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
