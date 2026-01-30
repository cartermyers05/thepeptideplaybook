import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";

const DEMO_QUESTION = "What peptides are FDA approved?";

const DEMO_RESPONSE = `Several peptides have full FDA approval:

✅ **Semaglutide** (Ozempic, Wegovy) - Diabetes & weight management

✅ **Tirzepatide** (Mounjaro, Zepbound) - Dual GIP/GLP-1 agonist

✅ **Tesamorelin** (Egrifta) - HIV lipodystrophy

Most peptides like BPC-157 and TB-500 remain **research-only** with no FDA approval for human use.`;

export function HeroDemo() {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const startDelay = window.setTimeout(() => {
      setHasStarted(true);
      setIsTyping(true);
    }, 1500);
    return () => window.clearTimeout(startDelay);
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let index = 0;
    let timeoutId: number;

    const typeNextChar = () => {
      if (index < DEMO_RESPONSE.length) {
        setDisplayedText(DEMO_RESPONSE.slice(0, index + 1));
        index++;
        const delay = 15 + Math.random() * 25;
        timeoutId = window.setTimeout(typeNextChar, delay);
      } else {
        setIsTyping(false);
      }
    };

    typeNextChar();
    return () => window.clearTimeout(timeoutId);
  }, [hasStarted]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="glass-card rounded-2xl p-5 border border-border/50"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/50">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Bot className="w-4 h-4 text-primary" />
        </div>
        <span className="text-sm font-medium text-muted-foreground">Peptide Playbook AI</span>
      </div>

      {/* Question bubble */}
      <div className="flex justify-end mb-4">
        <div className="max-w-[85%] bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-2.5">
          <p className="text-sm">{DEMO_QUESTION}</p>
        </div>
      </div>

      {/* AI Response */}
      <div className="flex gap-3">
        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Bot className="w-3.5 h-3.5 text-primary" />
        </div>
        <div className="flex-1 min-h-[180px]">
          {!hasStarted ? (
            <div className="flex gap-1 py-2">
              <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed">
              <ReactMarkdown>{displayedText}</ReactMarkdown>
              {isTyping && (
                <span className="inline-block w-2 h-4 bg-primary/70 animate-pulse ml-0.5" />
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
