import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Mail, Lock, User, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { PromoCodeInput } from "@/components/auth/PromoCodeInput";
import { Logo } from "@/components/brand/Logo";
import { getTrackingData, clearTrackingData } from "@/lib/trackingCapture";
import { FloatingOrbs } from "@/components/landing/FloatingOrbs";
import { GridPattern } from "@/components/landing/GridPattern";
import { LogoPattern } from "@/components/brand/LogoPattern";

const steps = [
  { id: 1, title: "Email" },
  { id: 2, title: "Account" },
];

export default function Signup() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialPromoCode = searchParams.get("code") || "";
  const redirect = searchParams.get("redirect") || "/checkout";
  
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
      // Persist promo code to localStorage BEFORE signup so it's available after redirect
      if (validPromoCode) {
        localStorage.setItem("pending_promo_code", validPromoCode);
        localStorage.setItem("pending_promo_type", promoCodeType || "");
      }

      const { data: signUpData, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
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
          const { error: referralError } = await supabase
            .from("referrals")
            .update({ referred_id: signUpData.user.id })
            .eq("referral_code", referralCode)
            .is("referred_id", null);
          
          if (!referralError) {
            localStorage.removeItem("referral_code");
          }
        } catch (refError) {
          console.error("Failed to link referral:", refError);
        }
      }

      // Write tracking data to profile
      if (signUpData.user) {
        const tracking = getTrackingData();
        if (tracking.landing_page || tracking.utm_source || tracking.referrer_url) {
          await supabase
            .from("profiles")
            .update(tracking as any)
            .eq("user_id", signUpData.user.id);
          clearTrackingData();
        }
      }

      // Set fresh signup flag to skip tier loading on checkout
      localStorage.setItem("fresh_signup", "true");
      
      // User is now logged in (auto-confirm enabled), redirect to checkout
      navigate(redirect);
    } catch (error: any) {
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

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background animations */}
      <FloatingOrbs variant="subtle" />
      <GridPattern variant="dots" />
      <div className="absolute inset-0 gradient-mesh-bg" />
      <LogoPattern />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex">
        {/* Left side - Form */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-16 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="flex justify-center mb-8"
            >
              <Link to="/">
                <Logo size="lg" />
              </Link>
            </motion.div>

            {/* Glass card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-8 shadow-glow"
            >
              {/* Progress steps */}
              <div className="flex items-center justify-center gap-2 mb-8">
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
                  <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center">
                    Create your account
                  </h1>
                  <p className="text-muted-foreground mb-8 text-center">
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
                          className="pl-10 h-12 bg-background/50"
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" size="lg" className="w-full h-12 btn-primary-glow">
                      Continue
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </form>

                  <p className="mt-6 text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline font-medium">
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

                  <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center">
                    Create your account
                  </h1>
                  <p className="text-muted-foreground mb-8 text-center">
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
                          className="pl-10 h-12 bg-background/50"
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
                          className="pl-10 h-12 bg-background/50"
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
                      className="w-full h-12 btn-primary-glow"
                      disabled={!agreeTerms || isLoading}
                    >
                      {isLoading ? "Creating account..." : "Create account"}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </form>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Right side - Visual */}
        <div className="hidden lg:flex flex-1 bg-gradient-primary items-center justify-center p-16">
          <div className="max-w-md text-center text-primary-foreground">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-3">
                Everything peptides, one place
              </h2>
              <div 
                className="h-1 w-full rounded-full animate-shimmer"
                style={{
                  background: "linear-gradient(90deg, hsl(45, 80%, 50%), hsl(25, 90%, 55%), hsl(350, 80%, 55%), hsl(270, 70%, 55%), hsl(210, 80%, 55%), hsl(160, 70%, 45%), hsl(45, 80%, 50%), hsl(25, 90%, 55%), hsl(350, 80%, 55%))",
                  backgroundSize: "200% 100%"
                }}
              />
            </div>
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
    </div>
  );
}
