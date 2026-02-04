import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Mail, Lock, User, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { PromoCodeInput } from "@/components/auth/PromoCodeInput";
import { Logo } from "@/components/brand/Logo";

const steps = [
  { id: 1, title: "Email" },
  { id: 2, title: "Account" },
  { id: 3, title: "Welcome" },
];

export default function Signup() {
  const [searchParams] = useSearchParams();
  const initialPromoCode = searchParams.get("code") || "";
  const redirect = searchParams.get("redirect") || "/checkout";
  
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [validPromoCode, setValidPromoCode] = useState<string | null>(null);
  const [promoCodeType, setPromoCodeType] = useState<string | null>(null);
  const { toast } = useToast();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStep(2);
    }
  };

  const handleAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !password || !agreeTerms) return;

    setIsLoading(true);
    try {
      // Persist promo code to localStorage BEFORE signup so it survives email confirmation
      if (validPromoCode) {
        localStorage.setItem("pending_promo_code", validPromoCode);
        localStorage.setItem("pending_promo_type", promoCodeType || "");
      }

      // Store intended redirect in localStorage for after email confirmation
      localStorage.setItem("post_signup_redirect", redirect);

      const { data: signUpData, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}${redirect}`,
          data: {
            full_name: name,
          },
        },
      });

      if (error) throw error;

      // After successful signup, check for referral code and link it
      const referralCode = localStorage.getItem("referral_code");
      if (referralCode && signUpData.user) {
        try {
          // Find the referral entry with this code and update with the new user's ID
          const { error: referralError } = await supabase
            .from("referrals")
            .update({ referred_id: signUpData.user.id })
            .eq("referral_code", referralCode)
            .is("referred_id", null);
          
          if (!referralError) {
            // Clear the referral code from localStorage after successful linking
            localStorage.removeItem("referral_code");
          }
        } catch (refError) {
          // Don't block signup if referral linking fails
          console.error("Failed to link referral:", refError);
        }
      }

      setStep(3);
    } catch (error: any) {
      // Clear localStorage on signup failure
      localStorage.removeItem("pending_promo_code");
      localStorage.removeItem("pending_promo_type");
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsResending(true);
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
        options: {
          emailRedirectTo: `${window.location.origin}${redirect}`,
        },
      });

      if (error) throw error;

      toast({
        title: "Email sent!",
        description: "Check your inbox for the confirmation link.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to resend email",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <div className="max-w-md w-full mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-12">
            <Logo size="sm" />
          </Link>

          {/* Progress steps */}
          <div className="flex items-center gap-2 mb-8">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    step > s.id
                      ? "bg-success text-success-foreground"
                      : step === s.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {step > s.id ? <Check className="w-4 h-4" /> : s.id}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`w-12 h-0.5 mx-2 transition-colors ${
                      step > s.id ? "bg-success" : "bg-secondary"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Email */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Create your account
              </h1>
              <p className="text-muted-foreground mb-8">
                Get instant access to peptide research
              </p>

              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full h-12">
                  Continue
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Log in
                </Link>
              </p>
            </motion.div>
          )}

          {/* Step 2: Account details */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Create your account
              </h1>
              <p className="text-muted-foreground mb-8">
                Just a few more details
              </p>

              <form onSubmit={handleAccountSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-12"
                      minLength={8}
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    At least 8 characters
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={agreeTerms}
                    onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <PromoCodeInput
                  initialCode={initialPromoCode}
                  onValidCode={(code, type) => {
                    setValidPromoCode(code);
                    setPromoCodeType(type);
                  }}
                  onInvalidCode={() => {
                    setValidPromoCode(null);
                    setPromoCodeType(null);
                  }}
                  disabled={isLoading}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12"
                  disabled={!agreeTerms || isLoading}
                >
                  {isLoading ? "Creating account..." : "Create account"}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </motion.div>
          )}

          {/* Step 3: Check Email */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-primary" />
              </div>

              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Check your email
              </h1>
              <p className="text-muted-foreground mb-4">
                We sent a confirmation link to
              </p>
              <p className="font-medium text-foreground mb-6">{email}</p>
              <p className="text-sm text-muted-foreground mb-8">
                Click the link in the email to verify your account.
                {validPromoCode && promoCodeType === "free_access" 
                  ? " You'll get full access after confirming."
                  : " You'll be redirected to checkout after confirming."
                }
              </p>

              <div className="space-y-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full h-12"
                  onClick={handleResendEmail}
                  disabled={isResending}
                >
                  {isResending ? (
                    <>
                      <RefreshCw className="mr-2 w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 w-4 h-4" />
                      Resend confirmation email
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground">
                  Didn't receive it? Check your spam folder or{" "}
                  <button
                    onClick={() => setStep(1)}
                    className="text-primary hover:underline"
                  >
                    try a different email
                  </button>
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Right side - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-primary items-center justify-center p-16">
        <div className="max-w-md text-center text-primary-foreground">
          <h2 className="text-3xl font-bold mb-4">
            Everything peptides, one place
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            Get instant access to research-backed peptide answers with citations.
          </p>
          <div className="space-y-4">
            {[
              "Research-backed peptide answers",
              "40+ peptide database",
              "AI-powered research assistant",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Check className="w-3 h-3" />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
