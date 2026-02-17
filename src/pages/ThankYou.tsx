import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, AlertCircle, RefreshCw, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { SEOHead } from "@/components/seo/SEOHead";
import { useQueryClient } from "@tanstack/react-query";
import { getTrackingData } from "@/lib/trackingCapture";

type VerificationState = "verifying" | "success" | "error" | "no_session" | "needs_password";

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

export default function ThankYou() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [verificationState, setVerificationState] = useState<VerificationState>("verifying");
  const [errorMessage, setErrorMessage] = useState("");
  const [stripeEmail, setStripeEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const retryCount = useRef(0);

  const sessionId = searchParams.get("session_id");

  const verifyPayment = useCallback(async () => {
    if (!sessionId) {
      setVerificationState("no_session");
      return;
    }

    setVerificationState("verifying");
    setErrorMessage("");

    try {
      const tracking = getTrackingData();
      const { data, error } = await supabase.functions.invoke("verify-payment", {
        body: { session_id: sessionId, tracking },
      });

      if (error) {
        console.error("Verification error:", error);
        // Auto-retry on network/function errors
        if (retryCount.current < MAX_RETRIES) {
          retryCount.current += 1;
          console.log(`Auto-retrying verification (${retryCount.current}/${MAX_RETRIES})...`);
          setTimeout(verifyPayment, RETRY_DELAY_MS);
          return;
        }
        setVerificationState("error");
        setErrorMessage("Failed to verify payment. Please contact support.");
        return;
      }

      if (data.verified) {
        await queryClient.invalidateQueries({ queryKey: ["profile"] });
        
        if (data.email) setStripeEmail(data.email);

        // If tier update failed on backend, warn but still proceed
        if (data.tier_update_failed) {
          console.warn("Tier update failed on backend — check-subscription will auto-heal on dashboard load");
        }

        if (user) {
          setVerificationState("success");
          setTimeout(() => navigate("/welcome/onboarding", { replace: true }), 5000);
        } else {
          setStripeEmail(data.email || "");
          setVerificationState("needs_password");
        }
      } else {
        // Auto-retry for transient failures
        if (retryCount.current < MAX_RETRIES && data.reason !== "user_mismatch") {
          retryCount.current += 1;
          console.log(`Auto-retrying verification (${retryCount.current}/${MAX_RETRIES}), reason: ${data.reason}`);
          setTimeout(verifyPayment, RETRY_DELAY_MS);
          return;
        }

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
      if (retryCount.current < MAX_RETRIES) {
        retryCount.current += 1;
        setTimeout(verifyPayment, RETRY_DELAY_MS);
        return;
      }
      setVerificationState("error");
      setErrorMessage("An unexpected error occurred.");
    }
  }, [sessionId, user, navigate, queryClient]);

  useEffect(() => {
    if (sessionId) {
      verifyPayment();
    } else {
      setVerificationState("no_session");
    }
  }, [sessionId]);

  // Re-verify WITH session_id when user logs in after setting password
  useEffect(() => {
    if (user && verificationState === "needs_password" && sessionId) {
      retryCount.current = 0; // Reset retries for post-login verification
      verifyPayment();
    }
  }, [user]);

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordError("");

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: stripeEmail,
        password,
      });

      if (!signInError) {
        return; // useAuth will pick up session, useEffect above will re-verify
      }

      const { error: updateError } = await supabase.auth.updateUser({ password });
      
      if (updateError) {
        const { error: signUpError } = await supabase.auth.signUp({
          email: stripeEmail,
          password,
        });

        if (signUpError) {
          setPasswordError(signUpError.message);
        }
      }
    } catch (err) {
      setPasswordError("An unexpected error occurred. Please try again.");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleManualRetry = () => {
    retryCount.current = 0;
    verifyPayment();
  };

  if (verificationState === "no_session") {
    return (
      <>
        <SEOHead title="Thank You | Peptide Playbook" description="Thank you for your interest." canonical="/thank-you" noIndex />
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full text-center">
            <h1 className="text-2xl font-bold mb-3">Looking for Something?</h1>
            <p className="text-muted-foreground mb-6">It looks like you arrived here without a payment session.</p>
            <div className="space-y-3">
              <Button onClick={() => navigate("/")} className="w-full">Go to Homepage</Button>
              <Button onClick={() => navigate("/dashboard")} variant="outline" className="w-full">Go to Dashboard</Button>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead title="Thank You | Peptide Playbook" description="Thank you for your purchase." canonical="/thank-you" noIndex />
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          {verificationState === "verifying" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <Loader2 className="w-16 h-16 mx-auto text-primary animate-spin" />
              <h1 className="text-2xl font-bold">Verifying Your Purchase...</h1>
              <p className="text-muted-foreground">Please wait while we confirm your payment.</p>
            </motion.div>
          )}

          {verificationState === "success" && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }} className="w-20 h-20 mx-auto rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </motion.div>
              <h1 className="text-2xl font-bold">Welcome to Peptide Playbook!</h1>
              <p className="text-muted-foreground">Your personalized blueprint is ready.</p>
              <Button onClick={() => navigate("/welcome/onboarding", { replace: true })} className="w-full">
                Set Up My Blueprint <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-sm text-muted-foreground">Redirecting automatically...</p>
              <Loader2 className="w-5 h-5 mx-auto text-muted-foreground animate-spin" />
            </motion.div>
          )}

          {verificationState === "needs_password" && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }} className="w-20 h-20 mx-auto rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </motion.div>
              <h1 className="text-2xl font-bold">Welcome to Peptide Playbook!</h1>
              <p className="text-muted-foreground">Your personalized blueprint is ready.</p>
              <p className="text-muted-foreground text-sm">Set your password to access your dashboard.</p>

              <form onSubmit={handleSetPassword} className="space-y-3 text-left">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={stripeEmail} disabled className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="password">Choose a Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    required
                    minLength={6}
                    className="mt-1"
                  />
                </div>
                {passwordError && <p className="text-destructive text-sm">{passwordError}</p>}
                <Button type="submit" className="w-full" disabled={passwordLoading || password.length < 6}>
                  {passwordLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  Set Password & Go to Dashboard
                </Button>
              </form>
            </motion.div>
          )}

          {verificationState === "error" && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="w-12 h-12 text-destructive" />
              </div>
              <h1 className="text-2xl font-bold">Verification Issue</h1>
              <p className="text-muted-foreground">{errorMessage}</p>
              <div className="space-y-3 pt-2">
                <Button onClick={handleManualRetry} className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />Try Again
                </Button>
                <Button onClick={() => navigate("/dashboard")} variant="outline" className="w-full">Go to Dashboard</Button>
              </div>
              <p className="text-sm text-muted-foreground pt-4">If the issue persists, please contact support.</p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
