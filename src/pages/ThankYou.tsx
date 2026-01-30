import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Download, MessageSquare, ArrowRight, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/seo/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";

const nextSteps = [
  {
    icon: Download,
    title: "Check your email",
    description: "Your download link and login details are on the way",
  },
  {
    icon: Download,
    title: "Download the PDF",
    description: "Get the complete guide for offline access",
  },
  {
    icon: MessageSquare,
    title: "Use the AI Assistant",
    description: "Ask questions anytime about peptide research",
  },
];

type VerificationState = "loading" | "success" | "error" | "no_session";

export default function ThankYou() {
  const location = useLocation();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [verificationState, setVerificationState] = useState<VerificationState>("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get("session_id");

  const verifyPayment = async () => {
    if (!sessionId) {
      setVerificationState("no_session");
      return;
    }

    if (!user) {
      setErrorMessage("Please log in to verify your payment.");
      setVerificationState("error");
      return;
    }

    setVerificationState("loading");
    setErrorMessage("");

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setErrorMessage("Please log in to verify your payment.");
        setVerificationState("error");
        return;
      }

      const response = await supabase.functions.invoke("verify-payment", {
        body: { session_id: sessionId },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      const result = response.data;

      if (result.verified) {
        // Invalidate profile query to refresh tier status
        await queryClient.invalidateQueries({ queryKey: ["profile"] });
        setVerificationState("success");
      } else {
        const reasons: Record<string, string> = {
          not_paid: "Payment has not been completed yet. Please complete payment and try again.",
          user_mismatch: "This payment session doesn't match your account.",
          no_session: "Invalid payment session.",
        };
        setErrorMessage(reasons[result.reason] || "Payment verification failed.");
        setVerificationState("error");
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to verify payment. Please try again."
      );
      setVerificationState("error");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [sessionId, user]);

  // Loading state
  if (verificationState === "loading") {
    return (
      <>
        <SEOHead
          title="Verifying Payment | Peptide Playbook"
          description="Verifying your purchase..."
          canonical="/thank-you"
          noIndex
        />
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-semibold mb-2">Verifying Your Payment</h1>
            <p className="text-muted-foreground">Please wait while we confirm your purchase...</p>
          </motion.div>
        </div>
      </>
    );
  }

  // Error state
  if (verificationState === "error") {
    return (
      <>
        <SEOHead
          title="Verification Issue | Peptide Playbook"
          description="There was an issue verifying your payment."
          canonical="/thank-you"
          noIndex
        />
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full text-center"
          >
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            
            <h1 className="text-2xl font-semibold mb-3">Verification Issue</h1>
            <p className="text-muted-foreground mb-6">{errorMessage}</p>

            <div className="space-y-3">
              <Button onClick={verifyPayment} className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              If the issue persists, please contact support with your payment confirmation email.
            </p>
          </motion.div>
        </div>
      </>
    );
  }

  // No session (direct visit without payment)
  if (verificationState === "no_session") {
    return (
      <>
        <SEOHead
          title="Thank You | Peptide Playbook"
          description="Thank you for your interest in Peptide Playbook."
          canonical="/thank-you"
          noIndex
        />
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full text-center"
          >
            <h1 className="text-2xl font-semibold mb-3">Looking for Something?</h1>
            <p className="text-muted-foreground mb-6">
              It looks like you arrived here without a payment session.
            </p>
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link to="/pricing">View Pricing</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  // Success state
  return (
    <>
      <SEOHead
        title="Thank You | Peptide Playbook"
        description="Thank you for your purchase. Access your Peptide Playbook now."
        canonical="/thank-you"
        noIndex
      />
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full text-center"
        >
          {/* Success icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-8"
          >
            <Check className="w-10 h-10 text-success" />
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            You're In!
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for purchasing the Peptide Playbook.
          </p>

          {/* Next steps */}
          <div className="glass-card-subtle p-6 mb-8 text-left">
            <h2 className="font-semibold mb-4">What happens next:</h2>
            <div className="space-y-4">
              {nextSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{step.title}</p>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <Button asChild size="lg" className="btn-primary-clean h-12 px-8 mb-4">
            <Link to="/dashboard">
              Start Exploring
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>

          <p className="text-sm text-muted-foreground mb-8">
            Need help? Reply to your confirmation email and we'll get back to you within 24 hours.
          </p>

          {/* Disclaimer */}
          <div className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-4">
            <strong>Remember:</strong> This is educational information, not medical advice. Always discuss health decisions with a qualified healthcare provider.
          </div>
        </motion.div>
      </div>
    </>
  );
}
