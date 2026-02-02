import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";

const DEMO_CONVERSATIONS = [
  {
    question: "What peptides are FDA approved?",
    answer: `Several peptides have full FDA approval:

• **Semaglutide** (Ozempic, Wegovy) — Diabetes & weight management

• **Tirzepatide** (Mounjaro, Zepbound) — Dual GIP/GLP-1 agonist

• **Tesamorelin** (Egrifta) — HIV lipodystrophy

Most peptides like BPC-157 and TB-500 remain **research-only**.`,
  },
  {
    question: "Is BPC-157 safe to use?",
    answer: `BPC-157 shows a strong safety profile in studies:

• **No reported toxicity** in animal models at high doses

• **Well-tolerated** in preliminary human trials

• **Not FDA approved** — still considered research-only

Always consult a physician before use.`,
  },
  {
    question: "Best peptide for recovery?",
    answer: `For recovery, researchers commonly study:

• **BPC-157** — Gut-derived, promotes tissue healing

• **TB-500** — Thymosin beta-4, supports regeneration

• **GHK-Cu** — Copper peptide for skin & wound repair

Stacking protocols vary by injury type.`,
  },
];

type Phase = "typing-question" | "thinking" | "typing-answer" | "holding" | "fading";

export function HeroDemo() {
  const [conversationIndex, setConversationIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing-question");
  const [displayedQuestion, setDisplayedQuestion] = useState("");
  const [displayedAnswer, setDisplayedAnswer] = useState("");

  const currentConversation = DEMO_CONVERSATIONS[conversationIndex];

  // Type question character by character
  const typeQuestion = useCallback(() => {
    const question = currentConversation.question;
    let index = 0;

    const typeNext = () => {
      if (index < question.length) {
        setDisplayedQuestion(question.slice(0, index + 1));
        index++;
        window.setTimeout(typeNext, 30 + Math.random() * 20);
      } else {
        // Question complete, pause then show thinking
        window.setTimeout(() => setPhase("thinking"), 400);
      }
    };

    typeNext();
  }, [currentConversation.question]);

  // Type answer character by character
  const typeAnswer = useCallback(() => {
    const answer = currentConversation.answer;
    let index = 0;

    const typeNext = () => {
      if (index < answer.length) {
        setDisplayedAnswer(answer.slice(0, index + 1));
        index++;
        window.setTimeout(typeNext, 12 + Math.random() * 15);
      } else {
        // Answer complete, hold for reading
        window.setTimeout(() => setPhase("holding"), 100);
      }
    };

    typeNext();
  }, [currentConversation.answer]);

  // Phase controller
  useEffect(() => {
    let timeoutId: number;

    switch (phase) {
      case "typing-question":
        setDisplayedQuestion("");
        setDisplayedAnswer("");
        typeQuestion();
        break;

      case "thinking":
        timeoutId = window.setTimeout(() => setPhase("typing-answer"), 800);
        break;

      case "typing-answer":
        typeAnswer();
        break;

      case "holding":
        timeoutId = window.setTimeout(() => setPhase("fading"), 2500);
        break;

      case "fading":
        timeoutId = window.setTimeout(() => {
          setConversationIndex((prev) => (prev + 1) % DEMO_CONVERSATIONS.length);
          setPhase("typing-question");
        }, 600);
        break;
    }

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [phase, typeQuestion, typeAnswer]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="glass-card rounded-2xl p-5 border border-border/50"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
        <motion.div 
          className="w-9 h-9 rounded-full bg-primary flex items-center justify-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs font-bold text-primary-foreground">PP</span>
        </motion.div>
        <div>
          <p className="font-medium text-sm">Peptide Playbook AI</p>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <p className="text-xs text-muted-foreground">Ready to help</p>
          </div>
        </div>
      </div>

      {/* Question bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`question-${conversationIndex}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: phase === "fading" ? 0 : 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="flex justify-end mb-4"
        >
          <div className="max-w-[85%] bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-2.5">
            <p className="text-sm">
              {displayedQuestion}
              {phase === "typing-question" && (
                <span className="inline-block w-0.5 h-4 bg-primary-foreground/70 animate-pulse ml-0.5" />
              )}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* AI Response */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`answer-${conversationIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "fading" ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex gap-3"
        >
          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-[8px] font-bold text-primary-foreground">PP</span>
          </div>
          <div className="flex-1 min-h-[180px]">
            {(phase === "thinking" || phase === "typing-question") && phase !== "typing-question" ? (
              <div className="flex gap-1 py-2">
                <span
                  className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            ) : phase === "typing-question" ? (
              <div className="h-[160px]" />
            ) : (
              <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed">
                  <ReactMarkdown>{displayedAnswer}</ReactMarkdown>
                  {phase === "typing-answer" && (
                    <span className="inline-block w-2 h-4 bg-primary/70 animate-pulse ml-0.5" />
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Fake Input Field */}
      <div className="flex items-center gap-2 bg-muted/50 rounded-xl px-3 py-2.5 mt-4">
        <input
          type="text"
          placeholder="Ask about any peptide..."
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          disabled
        />
        <Send className="w-4 h-4 text-muted-foreground" />
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-1.5 mt-4 pt-3 border-t border-border/30">
        {DEMO_CONVERSATIONS.map((_, index) => (
          <motion.div
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
              index === conversationIndex ? "bg-primary" : "bg-muted-foreground/30"
            }`}
            animate={{
              scale: index === conversationIndex ? 1.2 : 1,
            }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </div>
    </motion.div>
  );
}
