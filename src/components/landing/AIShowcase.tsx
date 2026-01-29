import { motion, AnimatePresence } from "framer-motion";
import { Bot, Sparkles, ArrowRight, MessageSquare, Scale, FileText, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const capabilities = [
  {
    icon: Scale,
    title: "Compare Peptides",
    description: "Side-by-side analysis of any two peptides",
    example: '"BPC-157 vs TB-500 for recovery?"',
  },
  {
    icon: Shield,
    title: "FDA Status Checks",
    description: "Instant classification and legal status",
    example: '"Is semaglutide FDA approved?"',
  },
  {
    icon: FileText,
    title: "Research Summaries",
    description: "Key findings from peer-reviewed studies",
    example: '"What does research say about MK-677?"',
  },
  {
    icon: MessageSquare,
    title: "Any Question",
    description: "Ask anything about mechanisms, safety, or use",
    example: '"What peptides help with sleep?"',
  },
];

const demoConversation = {
  question: "Is BPC-157 FDA approved?",
  answer: `**Short answer:** No, BPC-157 is NOT FDA approved.

**Current status:**
• Research-only peptide
• No human clinical trials completed
• Sold as "research chemical" in the US
• Not approved for any medical use

**What the research shows:**
BPC-157 has shown promise in animal studies for:
- Tendon and ligament healing
- Gut health and ulcer repair
- Neuroprotective effects

However, human studies are lacking, and quality/purity of sources is unregulated.

**Key takeaway:** While animal research is promising, there's no FDA pathway currently. If considering, discuss with a healthcare provider.`,
};

export function AIShowcase() {
  const [isTyping, setIsTyping] = useState(false);
  const [displayedAnswer, setDisplayedAnswer] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;

    setIsTyping(true);
    let currentIndex = 0;
    const fullAnswer = demoConversation.answer;

    const interval = setInterval(() => {
      if (currentIndex < fullAnswer.length) {
        setDisplayedAnswer(fullAnswer.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [hasStarted]);

  return (
    <section id="ai-demo" className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="container px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">See the AI in Action</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Ask Anything. Get Instant Answers.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch how the AI handles real peptide research questions with citations, 
            FDA status, and actionable insights.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-8 items-start">
          {/* Capabilities sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            <p className="text-sm font-medium text-muted-foreground mb-4">AI Capabilities</p>
            {capabilities.map((cap, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-4 group hover:border-primary/30 transition-colors cursor-default"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <cap.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1">{cap.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{cap.description}</p>
                    <p className="text-xs text-primary font-medium">{cap.example}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Demo chat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="glass-card shadow-glow glow-border overflow-hidden">
              {/* Chat header */}
              <div className="flex items-center gap-3 p-4 border-b border-border/50">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Peptide Playbook AI</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span className="text-xs text-muted-foreground">Live Demo</span>
                  </div>
                </div>
              </div>

              {/* Chat content */}
              <div className="p-4 min-h-[400px] max-h-[500px] overflow-y-auto">
                {!hasStarted ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-[350px] text-center"
                  >
                    <Bot className="w-12 h-12 text-primary/30 mb-4" />
                    <p className="text-muted-foreground mb-4">Click below to see a demo response</p>
                    <Button
                      onClick={() => setHasStarted(true)}
                      className="btn-primary-clean"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Run Demo
                    </Button>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {/* User message */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-end"
                    >
                      <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[80%]">
                        <p className="text-sm">{demoConversation.question}</p>
                      </div>
                    </motion.div>

                    {/* AI response */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex justify-start"
                    >
                      <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3 max-w-[90%]">
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <AnimatePresence>
                            {displayedAnswer.split('\n').map((line, i) => (
                              <p key={i} className="text-sm leading-relaxed mb-2">
                                {line.startsWith('**') ? (
                                  <strong>{line.replace(/\*\*/g, '')}</strong>
                                ) : line.startsWith('•') || line.startsWith('-') ? (
                                  <span className="block pl-4">{line}</span>
                                ) : (
                                  line
                                )}
                              </p>
                            ))}
                          </AnimatePresence>
                          {isTyping && (
                            <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1" />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>

              {/* Input preview */}
              <div className="p-4 border-t border-border/50 bg-muted/30">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Ask your own question..."
                    disabled
                    className="flex-1 bg-background rounded-lg px-4 py-2.5 text-sm outline-none border border-border/50"
                  />
                  <Button disabled size="sm" variant="ghost">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* CTA below demo */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-center"
            >
              <Button asChild size="lg" className="btn-primary-clean group">
                <Link to="/signup">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Try It Free
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground mt-3">
                No credit card required • Get instant access
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
