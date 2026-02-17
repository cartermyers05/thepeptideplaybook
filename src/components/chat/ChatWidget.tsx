import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatWidgetProps {
  onClose: () => void;
}

const MAX_MESSAGES = 10;
const COOLDOWN_MS = 2000;
const SESSION_KEY = "peptide-chat-messages";

const WELCOME_MESSAGE = `Hey! I'm your Peptide Playbook research assistant.

**I can help you:**
• Compare any peptides side-by-side
• Check FDA approval status instantly
• Understand mechanisms and research
• Separate real science from TikTok hype

Ask me anything about peptides.`;

const EXAMPLE_QUESTIONS = [
  "What's the difference between BPC-157 and TB-500?",
  "Is semaglutide FDA approved?",
  "What peptides are studied for recovery?",
];

export function ChatWidget({ onClose }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME_MESSAGE }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastSendTime, setLastSendTime] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load message count from session storage
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) {
      setMessageCount(parseInt(stored, 10));
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const canSend = () => {
    const now = Date.now();
    if (messageCount >= MAX_MESSAGES) return false;
    if (now - lastSendTime < COOLDOWN_MS) return false;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !canSend()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLastSendTime(Date.now());
    setIsLoading(true);

    // Update message count
    const newCount = messageCount + 1;
    setMessageCount(newCount);
    sessionStorage.setItem(SESSION_KEY, newCount.toString());

    try {
      const response = await supabase.functions.invoke("chat", {
        body: {
          messages: [
            ...messages.filter(m => m.role !== "assistant" || m.content !== WELCOME_MESSAGE),
            { role: "user", content: userMessage }
          ],
        },
      });

      if (response.error) throw response.error;

      // Handle streaming response
      const reader = response.data.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

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

              setMessages((prev) => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                  role: "assistant",
                  content: fullContent,
                };
                return newMessages;
              });
            } catch {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const remainingMessages = MAX_MESSAGES - messageCount;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[520px] max-h-[70vh] bg-background rounded-xl border shadow-xl flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <span className="text-sm font-bold text-primary-foreground">PP</span>
          </div>
          <div>
            <p className="font-medium text-sm">Peptide Assistant</p>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-muted-foreground">AI</span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-sm"
                  : "bg-muted rounded-bl-sm"
              }`}
            >
              {message.role === "assistant" ? (
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown>{message.content || "..."}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-sm">{message.content}</p>
              )}
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-2.5">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Rate limit warning */}
      {remainingMessages <= 5 && remainingMessages > 0 && (
        <div className="px-4 pb-2">
          <div className="flex items-center gap-2 text-xs text-warning">
            <AlertCircle className="w-3 h-3" />
            <span>{remainingMessages} messages remaining</span>
          </div>
        </div>
      )}

      {remainingMessages <= 0 && (
        <div className="px-4 pb-2">
          <div className="bg-primary/10 rounded-lg p-3 text-center">
            <p className="text-xs text-foreground font-medium mb-2">
              Want unlimited AI conversations?
            </p>
            <a 
              href="/signup" 
              className="text-xs text-primary hover:underline font-medium"
            >
              Get Your Blueprint →
            </a>
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about peptides..."
            disabled={isLoading || remainingMessages <= 0}
            className="flex-1 bg-muted/50 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading || !canSend()}
            className="flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>

      {/* Footer disclaimer */}
      <div className="px-4 pb-3">
        <p className="text-[10px] text-muted-foreground text-center">
          Educational information only. Not medical advice.
        </p>
      </div>
    </motion.div>
  );
}
