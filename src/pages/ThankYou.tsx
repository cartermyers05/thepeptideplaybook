import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { SEOHead } from "@/components/seo/SEOHead";
import { useQueryClient } from "@tanstack/react-query";

type VerificationState = "verifying" | "success" | "error" | "no_session";

export default function ThankYou() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [verificationState, setVerificationState] = useState<VerificationState>("verifying");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const sessionId = searchParams.get("session_id");

  const verifyPayment = async () => {
    if (!sessionId) {
      setVerificationState("no_session");
      return;
    }

    if (!user) {
      // Wait for auth to load
      return;
    }

    setVerificationState("verifying");
    setErrorMessage("");

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        setVerificationState("error");
        setErrorMessage("Please log in to verify your purchase.");
        return;
      }

      const { data, error } = await supabase.functions.invoke("verify-payment", {
        body: { session_id: sessionId },
      });

      if (error) {
        console.error("Verification error:", error);
        setVerificationState("error");
        setErrorMessage("Failed to verify payment. Please contact support.");
        return;
      }

      if (data.verified) {
        // Invalidate profile query to refresh tier status
        await queryClient.invalidateQueries({ queryKey: ["profile"] });
        setVerificationState("success");
        
        // Auto-redirect to welcome flow after short delay
        setTimeout(() => {
          navigate("/welcome", { replace: true });
        }, 2000);
      } else {
        const reasons: Record<string, string> = {
          not_paid: "Payment not completed. Please try again.",
          user_mismatch: "This payment session doesn't match your account.",
          no_session: "Invalid payment session.",
        };
        setVerificationState("error");
        setErrorMessage(reasons[data.reason] || "Could not verify your purchase. Please contact support.");
      }
    } catch (err) {
      console.error("Verification failed:", err);
      setVerificationState("error");
      setErrorMessage("An unexpected error occurred.");
    }
  };

  useEffect(() => {
    if (user) {
      verifyPayment();
    }
  }, [sessionId, user]);

  // No session (direct visit without payment)
  if (verificationState === "no_session") {
    return (
      <>
        <SEOHead 
          title="Thank You | Peptide Playbook"
          description="Thank you for your interest."
          canonical="/thank-you"
          noIndex
        />
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full text-center"
          >
            <h1 className="text-2xl font-bold mb-3">Looking for Something?</h1>
            <p className="text-muted-foreground mb-6">
              It looks like you arrived here without a payment session.
            </p>
            <div className="space-y-3">
              <Button onClick={() => navigate("/")} className="w-full">
                Go to Homepage
              </Button>
              <Button onClick={() => navigate("/dashboard")} variant="outline" className="w-full">
                Go to Dashboard
              </Button>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead 
        title="Thank You | Peptide Playbook"
        description="Thank you for your purchase."
        canonical="/thank-you"
        noIndex
      />
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          {verificationState === "verifying" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <Loader2 className="w-16 h-16 mx-auto text-primary animate-spin" />
              <h1 className="text-2xl font-bold">Verifying Your Purchase...</h1>
              <p className="text-muted-foreground">
                Please wait while we confirm your payment.
              </p>
            </motion.div>
          )}

          {verificationState === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-20 h-20 mx-auto rounded-full bg-green-500/10 flex items-center justify-center"
              >
                <CheckCircle className="w-12 h-12 text-green-500" />
              </motion.div>
              <h1 className="text-2xl font-bold">Payment Confirmed!</h1>
              <p className="text-muted-foreground">
                Redirecting you to get started...
              </p>
              <Loader2 className="w-6 h-6 mx-auto text-muted-foreground animate-spin" />
            </motion.div>
          )}

          {verificationState === "error" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="w-12 h-12 text-destructive" />
              </div>
              <h1 className="text-2xl font-bold">Verification Issue</h1>
              <p className="text-muted-foreground">{errorMessage}</p>
              <div className="space-y-3 pt-2">
                <Button onClick={verifyPayment} className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Button onClick={() => navigate("/dashboard")} variant="outline" className="w-full">
                  Go to Dashboard
                </Button>
              </div>
              <p className="text-sm text-muted-foreground pt-4">
                If the issue persists, please contact support.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
