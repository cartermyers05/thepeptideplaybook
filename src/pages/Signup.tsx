import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Sparkles, Mail, Lock, User, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { id: 1, title: "Email" },
  { id: 2, title: "Account" },
  { id: 3, title: "Welcome" },
];

export default function Signup() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

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
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: {
            full_name: name,
          },
        },
      });

      if (error) throw error;
      setStep(3);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <div className="max-w-md w-full mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">PeptideGPT</span>
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

          {/* Step 3: Welcome */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-success" />
              </div>

              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Welcome to PeptideGPT!
              </h1>
              <p className="text-muted-foreground mb-8">
                Your account is ready. Let's ask your first peptide question.
              </p>

              <Button size="lg" className="w-full h-12" onClick={handleContinue}>
                Start Exploring
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Right side - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-primary items-center justify-center p-16">
        <div className="max-w-md text-center text-primary-foreground">
          <h2 className="text-3xl font-bold mb-4">
            Join 2,847+ researchers
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
