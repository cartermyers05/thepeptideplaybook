import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { useState, useEffect } from "react";

const chatExamples = [
  {
    question: "What's the difference between BPC-157 and TB-500?",
    answer: "Great question. Both are peptides studied for tissue repair, but they work differently. **BPC-157** primarily targets the digestive system and local tissue healing, while **TB-500** focuses on systemic tissue repair and cell migration...",
    capability: "Compare peptides",
  },
  {
    question: "Is semaglutide FDA approved?",
    answer: "Yes, **semaglutide is FDA-approved** under brand names Ozempic, Wegovy, and Rybelsus. It's approved for Type 2 diabetes and chronic weight management. However, compounded versions are NOT FDA-approved...",
    capability: "FDA status checks",
  },
  {
    question: "What does the research say about MK-677 for sleep?",
    answer: "Studies show MK-677 can improve sleep quality. A notable 1997 study in *Neuroendocrinology* found it **increased REM sleep by 50%** and improved sleep duration in older adults. However, it may also cause...",
    capability: "Research summaries",
  },
  {
    question: "What peptides help with injury recovery?",
    answer: "Several peptides are studied for recovery: **BPC-157** (tendon/ligament), **TB-500** (muscle/systemic), **GHK-Cu** (skin/wound healing). Research quality varies. BPC-157 has the most animal studies...",
    capability: "Category guidance",
  },
  {
    question: "Are peptides legal to buy online?",
    answer: "It's complicated. **FDA-approved peptides** (insulin, semaglutide) require prescriptions. Research peptides sold 'not for human consumption' exist in a gray area. Buying for personal use is technically...",
    capability: "Legal clarity",
  },
];

export function AIAssistant() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % chatExamples.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentExample = chatExamples[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        rotateX: 2, 
        rotateY: -2,
        transition: { duration: 0.3 }
      }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="content-card p-5 border-primary/20"
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
    >
      {/* Chat header with initials avatar */}
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
            <span className="text-xs font-semibold text-primary-foreground">PP</span>
          </div>
          <div>
            <p className="font-medium text-sm">Peptide Playbook AI</p>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <p className="text-xs text-muted-foreground">Ready to help</p>
            </div>
          </div>
        </div>
        {/* Capability badge - text only */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="px-2.5 py-1 rounded-full bg-primary/10 text-xs text-primary font-medium"
        >
          {currentExample.capability}
        </motion.div>
      </div>

      {/* Chat messages */}
      <div className="space-y-3 mb-5 min-h-[160px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            {/* User message */}
            <div className="flex justify-end">
              <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-3 py-2 max-w-[85%]">
                <p className="text-xs">{currentExample.question}</p>
              </div>
            </div>

            {/* Assistant message */}
            <div className="flex justify-start">
              <div className="bg-muted rounded-2xl rounded-bl-sm px-3 py-2.5 max-w-[90%]">
                <p className="text-xs text-foreground leading-relaxed whitespace-pre-line">
                  {currentExample.answer}
                  <span className="typing-cursor" />
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Input field */}
      <div className="flex items-center gap-2 bg-muted/50 rounded-xl px-3 py-2.5">
        <input
          type="text"
          placeholder="Ask about any peptide..."
          className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
          disabled
        />
        <Send className="w-3.5 h-3.5 text-muted-foreground" />
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-1.5 mt-4">
        {chatExamples.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-1.5 h-1.5 rounded-full transition-colors cursor-pointer ${
              idx === currentIndex ? "bg-primary" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            animate={idx === currentIndex ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </motion.div>
  );
}
