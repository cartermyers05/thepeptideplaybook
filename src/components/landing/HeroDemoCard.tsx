import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";

const DEMO_RESPONSE = `Several peptides have full FDA approval:

✅ **Semaglutide** (Ozempic, Wegovy) - For diabetes & weight management

✅ **Tirzepatide** (Mounjaro, Zepbound) - Dual GIP/GLP-1 agonist

✅ **Tesamorelin** (Egrifta) - For HIV lipodystrophy

Most other peptides like BPC-157 and TB-500 are **research-only** with no FDA approval for human use.

*Always verify current FDA status before making decisions.*`;

export function HeroDemoCard() {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  // Start typing after 1.5s delay
  useEffect(() => {
    const startDelay = setTimeout(() => {
      setHasStarted(true);
      setIsTyping(true);
    }, 1500);
    
    return () => clearTimeout(startDelay);
  }, []);

  // Typing animation
  useEffect(() => {
    if (!hasStarted) return;

    let index = 0;
    
    const typeNextChar = () => {
      if (index < DEMO_RESPONSE.length) {
        setDisplayedText(DEMO_RESPONSE.slice(0, index + 1));
        index++;
        // Random delay for realistic typing (15-40ms)
        const delay = 15 + Math.random() * 25;
        timeoutRef.current = window.setTimeout(typeNextChar, delay);
      } else {
        setIsTyping(false);
      }
    };
    
    typeNextChar();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [hasStarted]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-card max-w-xl mx-auto p-5 rounded-2xl"
    >
      {/* Question bubble */}
      <div className="flex justify-end mb-4">
        <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-2.5 text-sm font-medium">
          What peptides are FDA approved?
        </div>
      </div>

      {/* AI Response */}
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-primary" />
        </div>
        <div className="flex-1 min-h-[120px]">
          {!hasStarted ? (
            <div className="flex gap-1 py-2">
              <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none text-sm text-foreground/90">
              <ReactMarkdown>{displayedText}</ReactMarkdown>
              {isTyping && (
                <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-pulse" />
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
