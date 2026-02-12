import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Lock, Flame, Mail } from "lucide-react";
import { SEOHead } from "@/components/seo/SEOHead";
import { useAuth } from "@/hooks/useAuth";
import { useTier } from "@/hooks/useTier";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface QuizResponse {
  id?: string;
  goal: string;
  experience: string;
  fear: string;
  timeline: string;
}

interface Protocol {
  name: string;
  duration: string;
  peptides: { name: string; purpose: string }[];
}

const protocolMap: Record<string, Protocol> = {
  fat_loss: {
    name: "Fat Loss Protocol",
    duration: "8 weeks",
    peptides: [
      { name: "Semaglutide", purpose: "Appetite regulation & metabolic optimization" },
    ],
  },
  muscle_recovery: {
    name: "Muscle & Recovery Protocol",
    duration: "8 weeks",
    peptides: [
      { name: "BPC-157", purpose: "Tissue repair & recovery acceleration" },
      { name: "TB-500", purpose: "Muscle healing & flexibility" },
    ],
  },
  injury_recovery: {
    name: "Injury Recovery Protocol",
    duration: "6 weeks",
    peptides: [
      { name: "BPC-157", purpose: "Accelerated tissue repair" },
      { name: "TB-500", purpose: "Systemic healing & inflammation reduction" },
    ],
  },
  anti_aging: {
    name: "Anti-Aging & Longevity Protocol",
    duration: "12 weeks",
    peptides: [
      { name: "Epithalon", purpose: "Telomere support & cellular longevity" },
      { name: "GHK-Cu", purpose: "Skin rejuvenation & collagen synthesis" },
    ],
  },
  cognitive: {
    name: "Cognitive Enhancement Protocol",
    duration: "8 weeks",
    peptides: [
      { name: "Semax", purpose: "Cognitive enhancement & neuroprotection" },
      { name: "Selank", purpose: "Anxiety reduction & mental clarity" },
    ],
  },
  general_wellness: {
    name: "Beginner Protocol",
    duration: "6 weeks",
    peptides: [
      { name: "BPC-157", purpose: "Overall healing & gut health optimization" },
    ],
  },
};

const goalLabels: Record<string, string> = {
  fat_loss: "Fat Loss",
  muscle_recovery: "Muscle & Recovery",
  injury_recovery: "Injury Recovery",
  anti_aging: "Anti-Aging",
  cognitive: "Cognitive Enhancement",
  general_wellness: "General Wellness",
};

const experienceLabels: Record<string, string> = {
  beginner: "Complete Beginner",
  some_experience: "Some Experience",
  experienced: "Experienced",
};

const fearLabels: Record<string, string> = {
  reconstitution: "Reconstitution",
  dosing: "Dosing",
  injections: "Injections",
  side_effects: "Side Effects",
  nothing: "Ready to Start",
};

const whatsIncluded = [
  "Your complete protocol with exact dosing",
  "Step-by-step reconstitution walkthrough",
  "Injection guide for beginners",
  "Day-by-day guidance through your cycle",
  "24/7 AI coach for questions",
  "Progress tracking with streaks",
];

const valueStack = [
  { item: "Personalized protocol", value: "$299", note: "(clinics charge $299+ for generic plans)" },
  { item: "Reconstitution masterclass", value: "$49", note: "(courses charge $49)" },
  { item: "24/7 AI coaching", value: "∞", note: "(priceless)" },
];

export default function QuizResults() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isPaid } = useTier();
  const [quizData, setQuizData] = useState<QuizResponse | null>(null);
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("quizResponse");
    if (stored) {
      setQuizData(JSON.parse(stored));
    } else {
      navigate("/quiz");
    }
    // Check if email already captured
    if (localStorage.getItem("quiz_email")) {
      setEmailCaptured(true);
    }
  }, [navigate]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmittingEmail(true);
    try {
      const { error } = await supabase.from("leads").insert({
        email: email.trim(),
        source: "quiz_results",
      });
      if (error) {
        console.error("Failed to save lead:", error);
        toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
        setIsSubmittingEmail(false);
        return;
      }
      localStorage.setItem("quiz_email", email.trim());
      setEmailCaptured(true);

      // Send quiz results email in the background
      const currentProtocol = protocolMap[quizData?.goal || ""] || protocolMap.general_wellness;
      supabase.functions.invoke("send-quiz-results-email", {
        body: {
          email: email.trim(),
          goal: quizData?.goal || "general_wellness",
          protocolName: currentProtocol.name,
          peptides: currentProtocol.peptides,
        },
      }).catch((err) => console.error("Failed to send quiz email:", err));
    } catch (err) {
      console.error("Failed to save email:", err);
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  if (!quizData) return null;

  const protocol = protocolMap[quizData.goal] || protocolMap.general_wellness;
  const showFull = user && isPaid;

  // Email gate overlay
  if (!emailCaptured && !showFull) {
    return (
      <>
        <SEOHead 
          title="Your Blueprint Is Ready | Peptide Playbook"
          description="Enter your email to see your personalized peptide protocol."
          canonical="/quiz/results"
        />
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full text-center"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Your Blueprint Is Ready
            </h1>
            <p className="text-muted-foreground mb-8">
              Enter your email to see your personalized peptide match
            </p>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <Input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 text-base"
              />
              <Button
                type="submit"
                size="lg"
                className="w-full h-12 btn-primary-clean"
                disabled={isSubmittingEmail}
              >
                {isSubmittingEmail ? "Loading..." : "See My Results"}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-4">
              No spam. Just your results.
            </p>
          </motion.div>
        </div>
      </>
    );
  }

  // Determine CTA destination
  const ctaDestination = user ? "/checkout" : "/signup";

  return (
    <>
      <SEOHead 
        title="Your Personalized Protocol | Peptide Playbook"
        description="View your personalized peptide protocol based on your goals and experience level."
        canonical="/quiz/results"
      />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b">
          <div className="container px-4 py-4 flex items-center justify-between">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              ← Back to home
            </Link>
            {!user && (
              <Link to="/login">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
            )}
          </div>
        </div>

        <main className="container px-4 py-12 max-w-3xl mx-auto">
          {/* Protocol Header */}
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-sm font-medium text-primary uppercase tracking-wide mb-3">
              Your Peptide Blueprint
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              {protocol.name}
            </h1>
            <p className="text-muted-foreground">
              Built for {experienceLabels[quizData.experience]} · Addressing {fearLabels[quizData.fear]}
            </p>
          </motion.div>

          {/* Protocol Preview Card */}
          <motion.div 
            className="bg-card border rounded-2xl overflow-hidden mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="p-6 border-b bg-secondary/30">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-lg">Recommended Peptides</h2>
                  <p className="text-sm text-muted-foreground">{protocol.duration} cycle</p>
                </div>
                <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {protocol.peptides.length} peptide{protocol.peptides.length > 1 ? "s" : ""}
                </span>
              </div>
            </div>

            <div className="divide-y">
              {protocol.peptides.map((peptide) => (
                <div key={peptide.name} className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{peptide.name}</h3>
                      <p className="text-sm text-muted-foreground">{peptide.purpose}</p>
                    </div>
                  </div>
                  
                  {showFull ? (
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-secondary/50 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Dosage</p>
                        <p className="font-medium">250mcg</p>
                      </div>
                      <div className="bg-secondary/50 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Frequency</p>
                        <p className="font-medium">Once daily</p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative mt-4">
                      <div className="grid grid-cols-2 gap-4 blur-sm pointer-events-none select-none">
                        <div className="bg-secondary/50 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Dosage</p>
                          <p className="font-medium">████████</p>
                        </div>
                        <div className="bg-secondary/50 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Frequency</p>
                          <p className="font-medium">████████</p>
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm border">
                          <Lock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Unlock with your Blueprint</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* What's Included */}
          {!showFull && (
            <>
              <motion.div 
                className="bg-card border rounded-2xl p-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="font-semibold text-lg mb-4">What's Included</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {whatsIncluded.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Value Stack */}
              <motion.div 
                className="bg-secondary/30 border rounded-2xl p-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <h3 className="font-semibold text-lg mb-4">What you're getting:</h3>
                <div className="space-y-3 mb-4">
                  {valueStack.map((v, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm">{v.item} <span className="text-muted-foreground">{v.note}</span></span>
                      <span className="font-semibold">{v.value}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 flex items-center justify-between">
                  <span className="font-medium">Total value:</span>
                  <span className="font-bold text-lg">$500+</span>
                </div>
                <div className="flex items-center justify-between text-primary mt-2">
                  <span className="font-medium">Your price:</span>
                  <span className="font-bold text-xl">$67</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Early access pricing. Going to $99 soon.
                </p>
              </motion.div>
            </>
          )}

          {/* CTA */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {showFull ? (
              <>
                <Link to="/dashboard">
                  <Button size="lg" className="h-12 px-8 gap-2 btn-primary-clean">
                    <Flame className="w-4 h-4" />
                    Start My Blueprint
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground mt-3">
                  Your AI Coach is ready to guide you
                </p>
              </>
            ) : (
              <>
                <Link to={ctaDestination}>
                  <Button size="lg" className="h-14 px-10 text-lg btn-primary-clean">
                    Get Your Full Blueprint — $67
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground mt-4">
                  One-time payment · Lifetime access
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  30-day money-back guarantee
                </p>
                <p className="text-sm text-muted-foreground mt-6">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    Log in
                  </Link>
                </p>
              </>
            )}
          </motion.div>
        </main>

        {/* Footer Disclaimer */}
        <footer className="border-t mt-12">
          <div className="container px-4 py-6 max-w-3xl mx-auto">
            <p className="text-xs text-muted-foreground text-center">
              Peptide Playbook provides educational information based on published research. 
              This is not medical advice. Consult a healthcare professional before starting any protocol.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
