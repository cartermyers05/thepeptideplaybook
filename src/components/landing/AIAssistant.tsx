import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send } from "lucide-react";
import { useState, useEffect } from "react";

const chatExamples = [
  {
    question: "What's the difference between BPC-157 and TB-500?",
    answer: "Great question. Both are peptides studied for tissue repair, but they work differently. BPC-157 primarily targets the digestive system and local tissue..."
  },
  {
    question: "Is semaglutide legal to buy online?",
    answer: "Semaglutide is FDA-approved but requires a prescription. Buying without a prescription is illegal and risky. Legitimate sources require..."
  },
  {
    question: "What does the research say about MK-677 for sleep?",
    answer: "Studies show MK-677 can increase REM sleep and overall sleep quality. A 2-month study found improved sleep duration in elderly subjects..."
  },
];

export function AIAssistant() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % chatExamples.length);
    }, 4000);
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
      className="glass-card p-5 shadow-glow"
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
    >
      {/* Chat header */}
      <div className="flex items-center gap-3 mb-5 pb-3 border-b border-border/50">
        <motion.div 
          className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Bot className="w-4 h-4 text-primary" />
        </motion.div>
        <div>
          <p className="font-medium text-sm">Peptide Assistant</p>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
        </div>
      </div>

      {/* Chat messages */}
      <div className="space-y-3 mb-5 min-h-[140px]">
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
                <p className="text-xs text-foreground leading-relaxed">
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
          placeholder="Ask a question..."
          className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
          disabled
        />
        <Send className="w-3.5 h-3.5 text-muted-foreground" />
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-1.5 mt-4">
        {chatExamples.map((_, idx) => (
          <motion.div
            key={idx}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              idx === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
            }`}
            animate={idx === currentIndex ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </motion.div>
  );
}
