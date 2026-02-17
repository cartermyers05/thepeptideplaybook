import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useTypewriter } from "@/hooks/useTypewriter";
import ReactMarkdown from "react-markdown";
import { PillButton } from "./PillButton";
import { ArrowRight, MessageCircle } from "lucide-react";

const demoQuestions = [
  {
    id: "weight-loss",
    question: "What's the best peptide protocol for fat loss?",
    answer: `The two most researched options are **Semaglutide** (Ozempic/Wegovy) and **Tirzepatide** (Mounjaro/Zepbound). Both are FDA-approved.

Here's what the studies show:

- **Semaglutide:** 14.9% body weight loss over 68 weeks (STEP 1 trial)
- **Tirzepatide:** Up to 22.5% body weight loss (SURMOUNT-1 trial)

For non-prescription options, **AOD-9604** targets fat-specific metabolism without the side effects of full HGH. It's TGA-approved in Australia but not FDA-approved in the US.

⚠️ **Important:** Both Semaglutide and Tirzepatide require a prescription and medical supervision.

📚 Based on published clinical trials (NEJM 2021, NEJM 2022)`,
  },
  {
    id: "bpc-157-safety",
    question: "Is BPC-157 safe? What are the side effects?",
    answer: `Here's what we know from the research:

**What studies show:**
- BPC-157 has been studied in animals for 20+ years with a strong safety profile
- No serious adverse events reported at standard research doses
- Naturally derived from a protein found in human gastric juice

**What we DON'T know:**
- No large-scale human clinical trials have been completed
- Long-term safety data in humans is limited
- It's not FDA-approved for any medical use

**Common reported side effects:** Mild nausea, dizziness, and injection site irritation. Generally described as well-tolerated.

**Bottom line:** Animal research is promising, but human data is limited. Talk to your doctor before using any research peptide.

📚 Based on preclinical research literature`,
  },
  {
    id: "reconstitution",
    question: "How do I reconstitute a 5mg vial?",
    answer: `It's simpler than it sounds. Here's the quick version:

**What you need:** Bacteriostatic water, insulin syringe, alcohol swabs, peptide vial

**The 4 key steps:**
1. Clean both vial tops with alcohol
2. Draw your BAC water into the syringe
3. Inject into the peptide vial. Aim at the glass wall, NOT the powder
4. Let it dissolve naturally. Never shake it.

**The math:** 5mg vial + 2mL BAC water = 2.5mg/mL
Want 1mg? Draw 0.4mL (40 units on your syringe)

**#1 mistake people make:** Shooting water directly onto the powder. This causes foaming and can damage the peptide.

📚 Based on USP pharmaceutical compounding guidelines`,
  },
  {
    id: "muscle-growth",
    question: "What peptides improve skin quality?",
    answer: `The most researched options for muscle and body composition:

| Peptide | How It Works | Research Level |
|---------|--------------|----------------|
| CJC-1295 + Ipamorelin | Boosts natural growth hormone | Moderate |
| MK-677 | Oral GH booster, increased IGF-1 40-60% | Strong |
| BPC-157 | Accelerates recovery and tissue repair | Moderate |
| TB-500 | Promotes muscle fiber regeneration | Moderate |
| Tesamorelin | FDA-approved GH stimulator | Strong |

**Most popular combo:** CJC-1295 + Ipamorelin taken before bed on an empty stomach.

⚠️ None of these are FDA-approved for muscle building. Tesamorelin is only approved for HIV lipodystrophy.

📚 Based on published endocrinology research`,
  },
  {
    id: "legality",
    question: "Can I stack CJC-1295 with Ipamorelin?",
    answer: `It depends on the peptide:

**✅ FDA-Approved (legal with prescription):**
- Semaglutide (Ozempic, Wegovy)
- Tirzepatide (Mounjaro, Zepbound)
- Tesamorelin (Egrifta)

**⚠️ Legal to purchase as "research chemicals" but NOT FDA-approved for human use:**
- BPC-157, TB-500, CJC-1295, Ipamorelin, GHK-Cu, AOD-9604

**❌ Banned in competition:**
- Most peptides are prohibited by WADA/USADA for competitive athletes

**The key distinction:** Buying research peptides isn't illegal, but they're not approved for human medical use. The FDA has been increasing oversight of peptide sellers since 2023.

📚 Based on FDA.gov regulatory filings and WADA prohibited list`,
  },
  {
    id: "tb500-vs-bpc157",
    question: "What should I eat to maximize my peptide results?",
    answer: `They're the two most popular recovery peptides, but they work completely differently:

| | TB-500 | BPC-157 |
|---|--------|---------|
| **Source** | Found in all human cells | Found in stomach acid |
| **How it works** | Moves repair cells TO the injury | Builds new blood vessels AT the injury |
| **Best for** | Heart, tendons, corneal healing | Gut, tendons, ligaments, muscle |
| **Taken how** | Injection only | Injection OR oral |
| **Dose** | 2-5mg, 2x/week | 250-500mcg, 1-2x/day |
| **Stack them?** | Yes, different mechanisms | Yes, commonly combined |

Many research protocols use both together because they attack tissue repair from two different angles.

📚 Based on published research (Nature 2004, J Invest Dermatol 1999)`,
  },
];

function TypingAnswer({ content }: { content: string }) {
  const { displayedText, isTyping } = useTypewriter(content, {
    speed: 8,
    enabled: true,
    catchUpThreshold: 100,
  });

  return (
    <div className="prose prose-sm prose-invert max-w-none">
      <ReactMarkdown
        components={{
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full text-sm border border-border rounded-lg overflow-hidden">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-secondary/50">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="px-3 py-2 text-left font-medium text-foreground border-b border-border">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 text-muted-foreground border-b border-border/50">
              {children}
            </td>
          ),
          p: ({ children }) => (
            <p className="text-muted-foreground mb-3 leading-relaxed">{children}</p>
          ),
          strong: ({ children }) => (
            <strong className="text-foreground font-semibold">{children}</strong>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-3">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-5 space-y-1 text-muted-foreground mb-3">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        }}
      >
        {displayedText}
      </ReactMarkdown>
      {isTyping && (
        <span className="inline-block w-0.5 h-4 bg-primary animate-pulse ml-0.5 align-middle rounded-full" />
      )}
    </div>
  );
}

export function GuidedDemo() {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());

  const selectedQ = demoQuestions.find((q) => q.id === selectedQuestion);
  const availableQuestions = demoQuestions.filter((q) => !answeredQuestions.has(q.id));

  const handleSelectQuestion = (id: string) => {
    setSelectedQuestion(id);
    setAnsweredQuestions((prev) => new Set([...prev, id]));
  };

  const handleAskAnother = () => {
    setSelectedQuestion(null);
  };

  const handleReset = () => {
    setSelectedQuestion(null);
    setAnsweredQuestions(new Set());
  };

  return (
    <section id="demo" className="py-20 md:py-28 bg-secondary/30">
      <div className="container px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center mb-4">
            See It In Action
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-8">
            Pick a question. Watch the AI answer it in real time.
          </p>

          <AnimatePresence mode="wait">
            {!selectedQuestion ? (
              <motion.div
                key="questions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4"
              >
                {(answeredQuestions.size > 0 ? availableQuestions : demoQuestions).map((q) => (
                  <button
                    key={q.id}
                    onClick={() => handleSelectQuestion(q.id)}
                    className="text-left p-4 md:p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-card/80 transition-all duration-200 group"
                  >
                    <span className="text-foreground font-medium group-hover:text-primary transition-colors">
                      {q.question}
                    </span>
                  </button>
                ))}
                {answeredQuestions.size > 0 && availableQuestions.length === 0 && (
                  <button
                    onClick={handleReset}
                    className="col-span-full text-center p-4 rounded-xl border border-dashed border-border hover:border-primary/50 transition-colors text-muted-foreground hover:text-foreground"
                  >
                    Reset and try again
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="answer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* User question bubble */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] bg-primary text-primary-foreground rounded-2xl rounded-br-md px-5 py-3">
                    <p className="font-medium">{selectedQ?.question}</p>
                  </div>
                </div>

                {/* AI answer bubble */}
                <div className="flex justify-start">
                  <div className="max-w-[95%] bg-card border border-border rounded-2xl rounded-bl-md px-5 py-4">
                    <TypingAnswer content={selectedQ?.answer || ""} />
                  </div>
                </div>

                {/* CTA section */}
                <div className="text-center pt-6 border-t border-border mt-8">
                  <p className="text-muted-foreground mb-4">
                    This is 1 of 10,000+ questions Peptide Playbook can answer.
                  </p>
                  <Link to="/signup">
                    <PillButton variant="dark" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                      Get Started
                    </PillButton>
                  </Link>
                  
                  {availableQuestions.length > 0 && (
                    <button
                      onClick={handleAskAnother}
                      className="mt-6 text-sm text-primary hover:underline inline-flex items-center gap-1"
                    >
                      Ask another question
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
