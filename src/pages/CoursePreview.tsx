import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Lock, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCourseTemplate, useCourse } from "@/hooks/useCourse";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

const buildingSteps = [
  "Analyzing your goal...",
  "Selecting optimal peptides...",
  "Creating your 8-week program...",
  "Personalizing lessons...",
];

export default function CoursePreview() {
  const { goal } = useParams<{ goal: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { template, isLoading: templateLoading } = useCourseTemplate(goal || "");
  const { hasPurchasedCourse, courseLoading } = useCourse();
  
  const [isBuilding, setIsBuilding] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Animate building steps
  useEffect(() => {
    if (templateLoading) return;
    
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= buildingSteps.length - 1) {
          clearInterval(interval);
          setTimeout(() => setIsBuilding(false), 500);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [templateLoading]);

  const handleCheckout = async () => {
    if (!user) {
      navigate(`/login?redirect=/course/${goal}`);
      return;
    }

    setIsCheckingOut(true);
    
    // Open blank tab IMMEDIATELY (before any async) to avoid popup blocker
    const checkoutWindow = window.open('about:blank', '_blank');

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        throw new Error("No active session - please log in again");
      }

      const response = await supabase.functions.invoke("create-checkout", {
        body: { goal },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      console.log("Checkout response:", response);

      // Handle edge function errors
      if (response.error) {
        let errorMsg = "Checkout failed";
        if (response.error.context) {
          try {
            const errorData = await response.error.context.json();
            errorMsg = errorData.error || errorMsg;
          } catch {
            errorMsg = response.error.message || errorMsg;
          }
        } else {
          errorMsg = response.error.message || errorMsg;
        }
        throw new Error(errorMsg);
      }
      
      // Handle successful response
      if (response.data?.url && checkoutWindow) {
        checkoutWindow.location.href = response.data.url;
        toast.info("Checkout opened in new tab");
        setIsCheckingOut(false);
      } else if (!checkoutWindow) {
        toast.error("Popup blocked - please allow popups for this site");
        setIsCheckingOut(false);
      } else {
        // Handle case where tab opened but no URL returned
        checkoutWindow.close();
        console.error("No checkout URL in response:", response.data);
        toast.error("Failed to create checkout session");
        setIsCheckingOut(false);
      }
    } catch (error: unknown) {
      checkoutWindow?.close();
      const errorMessage = error instanceof Error ? error.message : "Failed to start checkout";
      console.error("Checkout error:", errorMessage);
      toast.error(errorMessage);
      setIsCheckingOut(false);
    }
  };

  // Only show "Go to Dashboard" if user is authenticated AND has purchased
  const isPurchased = user && goal && hasPurchasedCourse(goal.replace('-', '_'));

  if (templateLoading || courseLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Course not found</h1>
        <Link to="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    );
  }

  const weekCount = Math.ceil(template.duration_days / 7);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20">
        <div className="container px-4 py-12 max-w-3xl mx-auto">
          {/* Back link */}
          <Link 
            to="/#goals" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to goals
          </Link>

          <AnimatePresence mode="wait">
            {isBuilding ? (
              <motion.div
                key="building"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <div className="mb-8">
                  <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">
                    Building your personalized course...
                  </h2>
                </div>

                <div className="max-w-sm mx-auto space-y-3">
                  {buildingSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: index <= currentStep ? 1 : 0.3,
                        x: 0 
                      }}
                      transition={{ delay: index * 0.2, duration: 0.3 }}
                      className="flex items-center gap-3 text-left"
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        index < currentStep 
                          ? 'bg-primary text-primary-foreground' 
                          : index === currentStep 
                            ? 'bg-primary/20 text-primary'
                            : 'bg-muted text-muted-foreground'
                      }`}>
                        {index < currentStep ? (
                          <Check className="w-4 h-4" />
                        ) : index === currentStep ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-current" />
                        )}
                      </div>
                      <span className={index <= currentStep ? 'text-foreground' : 'text-muted-foreground'}>
                        {step}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Course title */}
                <div className="text-center mb-10">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
                  >
                    <Check className="w-4 h-4" />
                    Course Ready
                  </motion.div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    Your {template.title}
                  </h1>
                  <p className="text-muted-foreground">
                    {template.description}
                  </p>
                </div>

                {/* What's included */}
                <div className="rounded-2xl border border-border bg-card p-6 mb-8">
                  <h2 className="text-lg font-semibold mb-4">What's inside:</h2>
                  <div className="grid gap-3">
                    {[
                      `${weekCount}-week guided program (${template.duration_days} days)`,
                      `Peptides researched for ${template.title.toLowerCase().replace(' course', '')}`,
                      "Research-based dosing information",
                      "Step-by-step reconstitution guide",
                      "First injection walkthrough",
                      "Daily lessons + progress tracking",
                      "AI coach access for questions",
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Peptides preview */}
                <div className="rounded-2xl border border-border bg-card p-6 mb-8">
                  <h2 className="text-lg font-semibold mb-4">Your peptides:</h2>
                  <div className="space-y-3">
                    {template.peptides.map((peptide, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                        <div>
                          <span className="font-medium">{peptide.name}</span>
                          <span className="text-muted-foreground"> — {peptide.purpose}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Locked dosing hint */}
                  <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="w-4 h-4" />
                    Full dosing research and schedule available after purchase
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                  {isPurchased ? (
                    <Link to="/dashboard">
                      <Button size="lg" className="w-full sm:w-auto px-12 h-14 text-lg">
                        Go to Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Button 
                        size="lg" 
                        className="w-full sm:w-auto px-12 h-14 text-lg"
                        onClick={handleCheckout}
                        disabled={isCheckingOut}
                      >
                        {isCheckingOut ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Get Your Course — $67"
                        )}
                      </Button>
                      <p className="mt-4 text-sm text-muted-foreground">
                        <span className="text-primary font-medium">Early access pricing.</span> Going to $99 soon.
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        One-time purchase. Lifetime access. 30-day money-back guarantee.
                      </p>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </>
  );
}
