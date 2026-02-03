import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Lock, Flame, Calendar, MessageSquare, ChartLine } from "lucide-react";
import { SEOHead } from "@/components/seo/SEOHead";
import { useAuth } from "@/hooks/useAuth";
import { useTier } from "@/hooks/useTier";

interface QuizResponse {
  id: string;
  goal: string;
  experience: string;
  concerns: string[];
  timeline: string;
}

interface Protocol {
  name: string;
  duration: string;
  peptides: { name: string; purpose: string; dosage: string; frequency: string }[];
}

const protocolMap: Record<string, Protocol> = {
  fat_loss: {
    name: "Fat Loss Protocol",
    duration: "8 weeks",
    peptides: [
      { name: "Semaglutide", purpose: "Appetite regulation & metabolic optimization", dosage: "0.25mg → 2.4mg", frequency: "Once weekly" },
      { name: "BPC-157", purpose: "Gut health & metabolic support", dosage: "250mcg", frequency: "Once daily" },
    ],
  },
  muscle_recovery: {
    name: "Performance Stack",
    duration: "8 weeks",
    peptides: [
      { name: "BPC-157", purpose: "Tissue repair & recovery acceleration", dosage: "250mcg", frequency: "Twice daily" },
      { name: "TB-500", purpose: "Muscle healing & flexibility", dosage: "2.5mg", frequency: "Twice weekly" },
    ],
  },
  injury_recovery: {
    name: "Healing Focus Protocol",
    duration: "6 weeks",
    peptides: [
      { name: "BPC-157", purpose: "Accelerated tissue repair", dosage: "250-500mcg", frequency: "Twice daily" },
      { name: "TB-500", purpose: "Systemic healing & inflammation reduction", dosage: "2.5mg", frequency: "Twice weekly" },
    ],
  },
  anti_aging: {
    name: "Longevity Stack",
    duration: "12 weeks",
    peptides: [
      { name: "Epithalon", purpose: "Telomere support & cellular longevity", dosage: "5mg", frequency: "Daily (20-day cycles)" },
      { name: "GHK-Cu", purpose: "Skin rejuvenation & collagen synthesis", dosage: "1-2mg", frequency: "Once daily" },
    ],
  },
  cognitive: {
    name: "Nootropic Stack",
    duration: "8 weeks",
    peptides: [
      { name: "Semax", purpose: "Cognitive enhancement & neuroprotection", dosage: "200-600mcg", frequency: "Once daily (nasal)" },
      { name: "Selank", purpose: "Anxiety reduction & mental clarity", dosage: "250-500mcg", frequency: "Once daily (nasal)" },
    ],
  },
  general_wellness: {
    name: "Beginner Safe Protocol",
    duration: "6 weeks",
    peptides: [
      { name: "BPC-157", purpose: "Overall healing & gut health optimization", dosage: "250mcg", frequency: "Once daily" },
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

export default function QuizResults() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isPaid } = useTier();
  const [quizData, setQuizData] = useState<QuizResponse | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("quizResponse");
    if (stored) {
      setQuizData(JSON.parse(stored));
    } else {
      navigate("/quiz");
    }
  }, [navigate]);

  if (!quizData) return null;

  const protocol = protocolMap[quizData.goal] || protocolMap.general_wellness;
  const showFull = user && isPaid;

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
              Your Personalized Protocol
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold mb-2">
              {protocol.name}
            </h1>
            <p className="text-muted-foreground">
              Optimized for {goalLabels[quizData.goal]} • {protocol.duration}
            </p>
          </motion.div>

          {/* Protocol Card */}
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
                  <p className="text-sm text-muted-foreground">Based on your goals and experience level</p>
                </div>
                <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {protocol.peptides.length} peptides
                </span>
              </div>
            </div>

            <div className="divide-y">
              {protocol.peptides.map((peptide, i) => (
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
                        <p className="font-medium">{peptide.dosage}</p>
                      </div>
                      <div className="bg-secondary/50 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Frequency</p>
                        <p className="font-medium">{peptide.frequency}</p>
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
                        <Lock className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* What's Included */}
          {!showFull && (
            <motion.div 
              className="bg-card border rounded-2xl p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-semibold text-lg mb-4">Unlock your full protocol with Peptide Playbook</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { icon: Check, text: "Complete dosing schedule with exact amounts" },
                  { icon: MessageSquare, text: "Day-by-day AI coaching through your first week" },
                  { icon: Check, text: "Step-by-step reconstitution walkthrough" },
                  { icon: Calendar, text: "Daily check-ins to track progress" },
                  { icon: MessageSquare, text: "24/7 AI chat for questions" },
                  { icon: ChartLine, text: "Progress tracking with streaks" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <item.icon className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
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
                  <Button size="lg" className="h-12 px-8 gap-2">
                    <Flame className="w-4 h-4" />
                    Start My Protocol
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground mt-3">
                  Your AI Coach is ready to guide you
                </p>
              </>
            ) : (
              <>
                <Link to="/signup">
                  <Button size="lg" className="h-12 px-8">
                    Start Your Journey – $29/mo
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground mt-3">
                  Cancel anytime • 14-day money-back guarantee
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline">
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
