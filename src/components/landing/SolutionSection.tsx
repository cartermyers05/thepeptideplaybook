import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, BookOpen, Shield, Beaker } from "lucide-react";
import { Button } from "@/components/ui/button";

const demoConversation = {
  question: "What's the optimal BPC-157 dosage for tendon repair?",
  answer: `Based on current research, here's what we know about BPC-157 dosing for tendon repair:

**Recommended Dosage Range:**
- **250-500 mcg** per injection, 1-2 times daily
- Total daily dose: **250-1000 mcg**

**Administration:**
- Subcutaneous injection near the injury site shows best results in studies
- Duration: Typically 4-6 weeks for tendon injuries

**Research Citations:**
1. Sikiric et al. (2018) - "BPC 157's Effect on Healing" - *Journal of Orthopaedic Research*
2. Chang et al. (2021) - "Pentadecapeptide Healing Properties" - *Peptides*

⚠️ **Important:** Always consult with a healthcare provider before starting any peptide protocol.`,
};

const features = [
  {
    icon: Sparkles,
    title: "Smart AI",
    description: "Trained on thousands of studies",
  },
  {
    icon: BookOpen,
    title: "Research Citations",
    description: "Every answer backed by sources",
  },
  {
    icon: Beaker,
    title: "Protocol Guidance",
    description: "Dosing and timing recommendations",
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "Warnings and contraindications",
  },
];

export function SolutionSection() {
  const [showAnswer, setShowAnswer] = useState(false);
  const [displayedAnswer, setDisplayedAnswer] = useState("");
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    if (showAnswer && !hasPlayed) {
      setHasPlayed(true);
      let index = 0;
      const interval = setInterval(() => {
        if (index < demoConversation.answer.length) {
          setDisplayedAnswer(demoConversation.answer.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 8);
      return () => clearInterval(interval);
    }
  }, [showAnswer, hasPlayed]);

  return (
    <section id="demo" className="py-20 md:py-32">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get Answers in <span className="text-gradient">Seconds</span>, Not Hours
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ask anything about peptides. Get research-backed answers with citations instantly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-primary rounded-2xl opacity-10 blur-xl" />
              <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-elevated">
                {/* Chat header */}
                <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-secondary/30">
                  <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">PeptideGPT</p>
                    <p className="text-xs text-muted-foreground">Always here to help</p>
                  </div>
                </div>

                {/* Chat messages */}
                <div className="p-6 space-y-6 min-h-[400px] max-h-[500px] overflow-y-auto">
                  {/* User message */}
                  <div className="flex justify-end">
                    <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-3 max-w-[80%]">
                      <p className="text-sm">{demoConversation.question}</p>
                    </div>
                  </div>

                  {/* AI response */}
                  <AnimatePresence>
                    {showAnswer && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3 max-w-[90%]">
                          <div className="prose prose-sm dark:prose-invert max-w-none">
                            <pre className="whitespace-pre-wrap font-sans text-sm text-foreground bg-transparent p-0 m-0 overflow-visible">
                              {displayedAnswer}
                              {displayedAnswer.length < demoConversation.answer.length && (
                                <span className="typing-cursor" />
                              )}
                            </pre>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Input area */}
                <div className="px-6 py-4 border-t border-border">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-secondary rounded-lg px-4 py-3">
                      <p className="text-sm text-muted-foreground">
                        {showAnswer ? "Ask another question..." : "Click to see the answer →"}
                      </p>
                    </div>
                    <Button
                      onClick={() => setShowAnswer(true)}
                      disabled={showAnswer}
                      className="shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Features list */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Your Personal Peptide Research Assistant
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Built on the latest AI technology and trained on thousands of peer-reviewed 
                studies, PeptideGPT gives you instant access to research-backed answers 
                you can trust.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="p-4 rounded-xl bg-secondary/50 border border-border"
                >
                  <feature.icon className="w-5 h-5 text-primary mb-3" />
                  <h4 className="font-semibold text-sm mb-1">{feature.title}</h4>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
