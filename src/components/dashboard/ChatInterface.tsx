import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  Send,
  AlertTriangle,
  Scale,
  Shield,
  Activity,
  Brain,
  Moon,
  Dumbbell,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { TypewriterMessage } from "./TypewriterMessage";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useIncrementQuestionsAsked, useProfile } from "@/hooks/useProfile";
import { useToast } from "@/hooks/use-toast";
import { AIDisclaimerModal } from "@/components/chat/AIDisclaimerModal";
import { AnimatedLogo } from "@/components/brand/AnimatedLogo";
import { Logo } from "@/components/brand/Logo";
import { useQuizResponse } from "@/hooks/useQuizResponse";
import { getGoalLabel } from "@/lib/quizPersonalization";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const questionCategories = [
  { icon: Scale, label: "Compare" },
  { icon: Shield, label: "FDA Status" },
  { icon: Activity, label: "Recovery" },
  { icon: Dumbbell, label: "Performance" },
  { icon: Moon, label: "Weight Loss" },
  { icon: Brain, label: "Safety" },
];

// Goal-personalized starter prompts
const goalStarterPrompts: Record<string, string[]> = {
  weight_loss: [
    "What's the difference between semaglutide and tirzepatide?",
    "What side effects should I watch for with GLP-1 medications?",
    "How do I talk to my doctor about starting semaglutide?",
    "What does the research say about long-term GLP-1 use?",
  ],
  recovery: [
    "Is BPC-157 safe to combine with anti-inflammatories?",
    "What's the recommended BPC-157 protocol for tendon injury?",
    "How does TB-500 compare to BPC-157 for recovery?",
    "What should I tell my doctor about BPC-157?",
  ],
  longevity: [
    "What's the evidence for GHK-Cu in anti-aging?",
    "How does Epitalon affect telomere length?",
    "What's the safest way to start with longevity peptides?",
    "Are there long-term safety concerns with GHK-Cu?",
  ],
  performance: [
    "How does CJC-1295/Ipamorelin boost growth hormone?",
    "What blood work should I get before starting?",
    "Can I combine growth hormone peptides with BPC-157?",
    "What are the side effects of CJC-1295?",
  ],
  general: [
    "What are the most well-researched peptides right now?",
    "Which peptide has the best safety profile for beginners?",
    "How do I bring up peptides with a skeptical doctor?",
    "What's the difference between FDA-approved and research peptides?",
  ],
};

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-3 py-2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: "#9CA3AF" }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const isSubmittingRef = useRef(false);
  const navigate = useNavigate();
  
  const { user } = useAuth();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: quizResponse } = useQuizResponse();
  const queryClient = useQueryClient();
  const incrementQuestions = useIncrementQuestionsAsked();
  const { toast } = useToast();

  const starterPrompts = quizResponse
    ? (goalStarterPrompts[quizResponse.primary_goal] || goalStarterPrompts.general)
    : goalStarterPrompts.general;

  const lastMessageContent = messages[messages.length - 1]?.content;
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, lastMessageContent]);

  const handleNewChat = () => {
    setMessages([]);
    setSelectedCategory(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !user || isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    const userMessageContent = input.trim();
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userMessageContent,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    let assistantContent = "";
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        throw new Error("Not authenticated");
      }

      const allMessages = [...messages, userMessage];

      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            messages: allMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
          signal: abortController.signal,
        }
      );

      if (!response.ok) {
        let errorMsg = "Failed to get response";
        try {
          const errBody = await response.json();
          errorMsg = errBody.error || errorMsg;
        } catch {}
        if (response.status === 429) {
          toast({ title: "Rate limited", description: "Too many requests. Please wait a moment and try again.", variant: "destructive" });
        } else if (response.status === 402) {
          toast({ title: "Upgrade required", description: errorMsg, variant: "destructive" });
        } else {
          toast({ title: "Error", description: errorMsg, variant: "destructive" });
        }
        throw new Error(errorMsg);
      }

      const protocolCreated = response.headers.get("X-Protocol-Created") === "true";

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          textBuffer += decoder.decode(value, { stream: true });

          let newlineIndex: number;
          while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
            let line = textBuffer.slice(0, newlineIndex);
            textBuffer = textBuffer.slice(newlineIndex + 1);

            if (line.endsWith("\r")) line = line.slice(0, -1);
            if (line.startsWith(":") || line.trim() === "") continue;
            if (!line.startsWith("data: ")) continue;

            const jsonStr = line.slice(6).trim();
            if (jsonStr === "[DONE]") break;

            try {
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                assistantContent += content;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMessage.id
                      ? { ...m, content: assistantContent }
                      : m
                  )
                );
              }
            } catch {
              textBuffer = line + "\n" + textBuffer;
              break;
            }
          }
        }
      }

      if (protocolCreated) {
        console.log("Protocol was created, invalidating queries");
        queryClient.invalidateQueries({ queryKey: ["protocol", user?.id] });
        queryClient.invalidateQueries({ queryKey: ["user-protocol", user?.id] });
        toast({
          title: "✅ Protocol Created",
          description: "Your personalized protocol is ready. View it now →",
          action: (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/dashboard/protocol")}
              className="whitespace-nowrap"
            >
              View Protocol
            </Button>
          ),
        });
      }

      try {
        await incrementQuestions.mutateAsync();
      } catch (error) {
        console.error("Failed to increment questions:", error);
      }

    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessage.id
            ? { ...m, content: "Sorry, I encountered an error. Please try again." }
            : m
        )
      );
    } finally {
      setIsLoading(false);
      isSubmittingRef.current = false;
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    if (!question.trim() || isLoading || !user || isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setSelectedCategory(null);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: question.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    let assistantContent = "";
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);

    (async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.access_token) throw new Error("Not authenticated");

        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.access_token}`,
            },
            body: JSON.stringify({
              messages: [{ role: "user", content: question.trim() }],
            }),
            signal: abortController.signal,
          }
        );

        if (!response.ok) {
          let errorMsg = "Failed to get response";
          try { const errBody = await response.json(); errorMsg = errBody.error || errorMsg; } catch {}
          toast({ title: "Error", description: errorMsg, variant: "destructive" });
          throw new Error(errorMsg);
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let textBuffer = "";

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            textBuffer += decoder.decode(value, { stream: true });
            let newlineIndex: number;
            while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
              let line = textBuffer.slice(0, newlineIndex);
              textBuffer = textBuffer.slice(newlineIndex + 1);
              if (line.endsWith("\r")) line = line.slice(0, -1);
              if (line.startsWith(":") || line.trim() === "") continue;
              if (!line.startsWith("data: ")) continue;
              const jsonStr = line.slice(6).trim();
              if (jsonStr === "[DONE]") break;
              try {
                const parsed = JSON.parse(jsonStr);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  assistantContent += content;
                  setMessages((prev) =>
                    prev.map((m) => m.id === assistantMessage.id ? { ...m, content: assistantContent } : m)
                  );
                }
              } catch {
                textBuffer = line + "\n" + textBuffer;
                break;
              }
            }
          }
        }

        try { await incrementQuestions.mutateAsync(); } catch {}
      } catch (error) {
        console.error("Chat error:", error);
        setMessages((prev) =>
          prev.map((m) => m.id === assistantMessage.id ? { ...m, content: "Sorry, I encountered an error. Please try again." } : m)
        );
      } finally {
        setIsLoading(false);
        isSubmittingRef.current = false;
      }
    })();
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* AI Disclaimer Modal */}
      {!profileLoading && !profile?.ai_disclaimer_accepted_at && (
        <AIDisclaimerModal onAccepted={() => {}} />
      )}

      {/* Header with New Chat button when in a conversation */}
      {messages.length > 0 && (
        <div className="flex items-center justify-between px-4 py-2 bg-white" style={{ borderBottom: "1px solid #E5E7EB" }}>
          <div className="flex items-center gap-2">
            <Logo showText={false} size="sm" />
            <span className="text-sm font-medium" style={{ color: "#6B7280" }}>
              New Chat
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNewChat}
            className="gap-2 rounded-full"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </Button>
        </div>
      )}

      {/* Chat area */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="max-w-3xl mx-auto px-4 py-8">
            {messages.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="py-8"
              >
                {/* Minimal header */}
                <div className="mb-8">
                  <span
                    className="text-[11px] font-mono uppercase tracking-[2px] font-semibold bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(135deg, #F97316, #FB7185, #A78BFA)" }}
                  >
                    AI RESEARCH COACH
                  </span>
                  <p className="text-[15px] mt-1" style={{ color: "#6B7280" }}>
                    Ask anything about peptides. Every answer cites research.
                  </p>
                </div>

                {/* Topic pills - horizontal scrollable */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {questionCategories.map((cat, index) => (
                    <motion.button
                      key={cat.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + index * 0.03 }}
                      onClick={() => setSelectedCategory(selectedCategory === index ? null : index)}
                      className={cn(
                        "inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition-all",
                        selectedCategory === index
                          ? "border"
                          : "bg-white border border-[#E5E7EB] hover:border-[#8B5CF6]/30"
                      )}
                      style={
                        selectedCategory === index
                          ? { backgroundColor: "#F3E8FF", borderColor: "#8B5CF6", color: "#8B5CF6" }
                          : { color: "#6B7280" }
                      }
                    >
                      {cat.label}
                    </motion.button>
                  ))}
                </div>

                {/* Starter prompts - 2x2 grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {starterPrompts.map((question, index) => (
                    <motion.button
                      key={question}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      whileHover={{ y: -2, boxShadow: "0 8px 16px -4px rgba(0,0,0,0.08)" }}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="p-4 text-left rounded-2xl bg-white transition-all hover:border-[#8B5CF6]/30"
                      style={{
                        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                        border: "1px solid #E5E7EB",
                      }}
                    >
                      <p className="text-sm" style={{ color: "#374151" }}>
                        {question}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "flex",
                        message.role === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] px-4 py-3",
                          message.role === "user"
                            ? "rounded-2xl rounded-br-md text-white"
                            : "rounded-2xl rounded-bl-md border"
                        )}
                        style={
                          message.role === "user"
                            ? { backgroundColor: "#111827" }
                            : { backgroundColor: "#F9FAFB", borderColor: "#E5E7EB" }
                        }
                      >
                        {message.role === "assistant" && (
                          <>
                            {/* Pre-response disclaimer */}
                            <div className="mb-2 pb-2 -mx-4 -mt-3 px-4 pt-2 rounded-t-2xl" style={{ backgroundColor: "rgba(245,158,11,0.05)", borderBottom: "1px solid rgba(245,158,11,0.15)" }}>
                              <div className="flex items-center gap-1.5">
                                <AlertTriangle className="w-3 h-3" style={{ color: "#F59E0B" }} />
                                <p className="text-xs" style={{ color: "#92400E" }}>
                                  Educational information only. Not medical advice.
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mb-2 pb-2" style={{ borderBottom: "1px solid #E5E7EB" }}>
                              <Logo showText={false} size="sm" />
                              <span className="text-xs font-medium" style={{ color: "#6B7280" }}>Peptide Playbook AI</span>
                            </div>
                          </>
                        )}
                        <div className="prose prose-sm max-w-none" style={{ color: message.role === "user" ? "#FFFFFF" : "#374151" }}>
                          {message.role === "assistant" ? (
                            <TypewriterMessage
                              content={message.content}
                              isStreaming={isLoading && message === messages[messages.length - 1]}
                            />
                          ) : (
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          )}
                        </div>
                        {message.role === "assistant" && message.content && !isLoading && (
                          <div className="flex items-start gap-1.5 text-xs mt-3 pt-2" style={{ borderTop: "1px solid #E5E7EB", color: "#6B7280" }}>
                            <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" />
                            <p>This information is for educational purposes only. Most peptides are NOT FDA-approved for human use. Always consult a licensed healthcare provider.</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Input area */}
      <div className="bg-white" style={{ borderTop: "1px solid #E5E7EB" }}>
        <div className="max-w-3xl mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about any peptide — dosing, safety, research..."
              className="w-full min-h-[52px] max-h-32 pr-12 resize-none rounded-2xl px-4 py-3.5 text-[16px] outline-none transition-all"
              style={{
                backgroundColor: "#F9FAFB",
                border: "1px solid #E5E7EB",
                color: "#374151",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#F97316")}
              onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-3 bottom-3 h-9 w-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-30"
              style={{ backgroundColor: "#F97316", color: "#FFFFFF" }}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
