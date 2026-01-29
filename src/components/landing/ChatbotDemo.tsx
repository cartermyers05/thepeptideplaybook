import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const DEMO_QUESTIONS = [
  "What peptides are actually FDA approved?",
  "Are peptides safe to use?",
  "What's the best peptide for fat loss?",
  "How do I know if a peptide source is legit?",
];

const STORAGE_KEY = "demo-question-used";

export function ChatbotDemo() {
  const [hasUsedQuestion, setHasUsedQuestion] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const responseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const used = localStorage.getItem(STORAGE_KEY) === "true";
    setHasUsedQuestion(used);
    if (used) {
      setShowPaywall(true);
    }
  }, []);

  useEffect(() => {
    if (response && responseRef.current) {
      responseRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [response]);

  const handleQuestionClick = async (question: string) => {
    if (hasUsedQuestion) {
      setShowPaywall(true);
      return;
    }

    setSelectedQuestion(question);
    setIsLoading(true);
    setResponse("");

    try {
      const res = await supabase.functions.invoke("chat", {
        body: { messages: [{ role: "user", content: question }] },
      });

      if (res.error) throw res.error;

      const reader = res.data.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content || "";
              fullContent += content;
              setResponse(fullContent);
            } catch {
              // Skip invalid JSON
            }
          }
        }
      }

      localStorage.setItem(STORAGE_KEY, "true");
      setHasUsedQuestion(true);
      setShowPaywall(true);
    } catch (error) {
      console.error("Demo chat error:", error);
      setResponse("Sorry, something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="demo" className="py-20 md:py-28 relative">
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Bot className="w-4 h-4" />
            Live Demo
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            See What Peptide Playbook AI Can Do
          </h2>
          <p className="text-muted-foreground text-lg">
            Ask one question free. Pick a topic below.
          </p>
        </motion.div>

        {/* Question Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8"
        >
          {DEMO_QUESTIONS.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuestionClick(question)}
              disabled={isLoading}
              className={`p-4 text-left rounded-xl border transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed ${
                selectedQuestion === question
                  ? "bg-primary/10 border-primary"
                  : "bg-muted/50 border-border hover:border-primary/50 hover:bg-primary/5"
              }`}
            >
              <span className="text-sm font-medium">{question}</span>
            </button>
          ))}
        </motion.div>

        {/* Chat Interface */}
        {(selectedQuestion || showPaywall) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-6 mb-6"
          >
            {selectedQuestion && (
              <>
                {/* User Message */}
                <div className="flex justify-end mb-4">
                  <div className="max-w-[85%] bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-2.5">
                    <p className="text-sm">{selectedQuestion}</p>
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex justify-start">
                  <div className="max-w-[85%] bg-muted rounded-2xl rounded-bl-sm px-4 py-2.5">
                    {isLoading && !response ? (
                      <div className="flex gap-1 py-1">
                        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    ) : (
                      <div ref={responseRef} className="prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown>{response || "..."}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Paywall */}
            {showPaywall && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 p-6 rounded-xl bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-1">Want to keep exploring?</h4>
                    <p className="text-muted-foreground text-sm mb-4">
                      Unlock unlimited questions + the complete guide
                    </p>
                    <Link to="/signup" className="relative z-10 inline-block">
                      <Button className="btn-primary-clean">
                        Get Full Access — $67
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Disclaimer */}
        <p className="text-center text-xs text-muted-foreground">
          Educational information only. Not medical advice.
        </p>
      </div>
    </section>
  );
}
