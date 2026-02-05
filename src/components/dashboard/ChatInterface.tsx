import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Send,
  ThumbsUp,
  ThumbsDown,
  BookmarkPlus,
  Bookmark,
  AlertTriangle,
  Scale,
  Shield,
  Activity,
  Brain,
  Moon,
  Dumbbell,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { TypewriterMessage } from "./TypewriterMessage";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useCreateConversation, useUpdateConversationTitle } from "@/hooks/useConversations";
import { useSaveMessage, useUpdateMessage } from "@/hooks/useMessages";
import { useIncrementQuestionsAsked } from "@/hooks/useProfile";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  dbId?: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isSaved?: boolean;
}

const questionCategories = [
  {
    icon: Scale,
    label: "Compare",
    questions: [
      "What's the difference between BPC-157 and TB-500?",
      "Compare semaglutide vs tirzepatide for weight loss",
    ],
    color: "text-blue-500",
  },
  {
    icon: Shield,
    label: "FDA Status",
    questions: [
      "Is semaglutide FDA approved?",
      "Which peptides are actually FDA approved?",
    ],
    color: "text-green-500",
  },
  {
    icon: Activity,
    label: "Recovery",
    questions: [
      "Build me a recovery protocol for a knee injury",
      "What does research say about BPC-157 for healing?",
    ],
    color: "text-orange-500",
  },
  {
    icon: Dumbbell,
    label: "Performance",
    questions: [
      "What are growth hormone secretagogues?",
      "What's the research on MK-677?",
    ],
    color: "text-purple-500",
  },
  {
    icon: Moon,
    label: "Sleep",
    questions: [
      "Does MK-677 affect sleep quality?",
      "What peptides are studied for sleep?",
    ],
    color: "text-indigo-500",
  },
  {
    icon: Brain,
    label: "Cognitive",
    questions: [
      "What are nootropic peptides?",
      "What does research say about Semax and Selank?",
    ],
    color: "text-pink-500",
  },
];

// Actionable sample questions for empty state
const sampleQuestions = [
  "Build me a recovery protocol for a knee injury",
  "What's the difference between BPC-157 and TB-500?",
  "I'm new to peptides — where do I start?",
  "Help me understand reconstitution for a 5mg vial",
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-3 py-2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}

// Breathing/pulse animation for the avatar
function PulsingAvatar() {
  return (
    <motion.div 
      className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6 relative"
      animate={{ 
        boxShadow: [
          "0 0 0 0 rgba(0, 0, 0, 0.1)",
          "0 0 0 8px rgba(0, 0, 0, 0.05)",
          "0 0 0 0 rgba(0, 0, 0, 0.1)"
        ]
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.span 
        className="text-xl font-bold text-primary-foreground"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        PP
      </motion.span>
    </motion.div>
  );
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  
  const { user } = useAuth();
  const createConversation = useCreateConversation();
  const updateConversationTitle = useUpdateConversationTitle();
  const saveMessage = useSaveMessage();
  const updateMessage = useUpdateMessage();
  const incrementQuestions = useIncrementQuestionsAsked();
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !user) return;

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

    let activeConversationId = conversationId;

    if (!activeConversationId) {
      try {
        const title = userMessageContent.slice(0, 50) + (userMessageContent.length > 50 ? "..." : "");
        const newConversation = await createConversation.mutateAsync(title);
        activeConversationId = newConversation.id;
        setConversationId(newConversation.id);
      } catch (error) {
        console.error("Failed to create conversation:", error);
      }
    }

    let userDbId: string | undefined;
    if (activeConversationId) {
      try {
        const savedUserMessage = await saveMessage.mutateAsync({
          conversationId: activeConversationId,
          role: "user",
          content: userMessageContent,
        });
        userDbId = savedUserMessage.id;
        setMessages((prev) =>
          prev.map((m) => (m.id === userMessage.id ? { ...m, dbId: userDbId } : m))
        );
      } catch (error) {
        console.error("Failed to save user message:", error);
      }
    }

    let assistantContent = "";
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);

    try {
      // Get user's auth token
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        throw new Error("Not authenticated");
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            messages: [...messages, userMessage].map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get response");
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

      if (activeConversationId && assistantContent) {
        try {
          const savedAssistantMessage = await saveMessage.mutateAsync({
            conversationId: activeConversationId,
            role: "assistant",
            content: assistantContent,
          });
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMessage.id ? { ...m, dbId: savedAssistantMessage.id } : m
            )
          );
        } catch (error) {
          console.error("Failed to save assistant message:", error);
        }
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
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    setSelectedCategory(null);
    textareaRef.current?.focus();
  };

  const handleToggleSave = async (message: Message) => {
    if (!message.dbId) return;
    
    const newSavedState = !message.isSaved;
    try {
      await updateMessage.mutateAsync({
        messageId: message.dbId,
        updates: { is_saved: newSavedState },
      });
      setMessages((prev) =>
        prev.map((m) => (m.id === message.id ? { ...m, isSaved: newSavedState } : m))
      );
      toast({
        title: newSavedState ? "Saved" : "Removed from saved",
        description: newSavedState 
          ? "Answer saved for quick access later." 
          : "Answer removed from saved.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to save message.",
        variant: "destructive",
      });
    }
  };

  const handleFeedback = async (message: Message, helpful: boolean) => {
    if (!message.dbId) return;
    
    try {
      await updateMessage.mutateAsync({
        messageId: message.dbId,
        updates: { helpful },
      });
      toast({
        title: "Thanks for your feedback!",
        description: "This helps us improve our responses.",
      });
    } catch {
      // Silent fail for feedback
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Chat area */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full" ref={scrollRef}>
          <div className="max-w-3xl mx-auto px-4 py-8">
            {messages.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center py-8"
              >
                {/* Pulsing Logo */}
                <PulsingAvatar />

                <h2 className="text-2xl font-bold mb-2">
                  Peptide Playbook AI
                </h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Your AI research assistant for evidence-based peptide information. Ask anything.
                </p>

                {/* Protocol Builder CTA */}
                <Button
                  onClick={() => navigate("/dashboard/protocols")}
                  className="mb-8 gap-2"
                  variant="outline"
                >
                  <Sparkles className="w-4 h-4" />
                  Build a Custom Protocol
                </Button>

                {/* Category chips */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {questionCategories.map((cat, index) => (
                    <motion.button
                      key={cat.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      onClick={() => setSelectedCategory(selectedCategory === index ? null : index)}
                      className={cn(
                        "inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all",
                        selectedCategory === index
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/30 hover:bg-accent"
                      )}
                    >
                      <cat.icon className={cn("w-4 h-4", cat.color)} />
                      <span className="text-sm font-medium">{cat.label}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Questions grid */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedCategory ?? "default"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg mx-auto"
                  >
                    {(selectedCategory !== null
                      ? questionCategories[selectedCategory].questions
                      : sampleQuestions
                    ).map((question, index) => (
                      <motion.button
                        key={question}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSuggestedQuestion(question)}
                        className="p-3 text-left rounded-lg border border-border bg-card hover:border-primary/30 hover:bg-accent transition-colors group"
                      >
                        <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {question}
                        </p>
                      </motion.button>
                    ))}
                  </motion.div>
                </AnimatePresence>
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
                          "max-w-[85%] rounded-xl px-4 py-3",
                          message.role === "user"
                            ? "bg-primary text-primary-foreground rounded-br-sm"
                            : "bg-card border border-border rounded-bl-sm"
                        )}
                      >
                        {message.role === "assistant" && (
                          <>
                            {/* Pre-response disclaimer */}
                            <div className="mb-2 pb-2 border-b border-amber-500/20 bg-amber-500/5 -mx-4 -mt-3 px-4 pt-2 rounded-t-xl">
                              <div className="flex items-center gap-1.5">
                                <AlertTriangle className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                                <p className="text-xs text-amber-600 dark:text-amber-400">
                                  Educational information only. Not medical advice.
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border">
                              <div className="w-5 h-5 rounded-md bg-primary flex items-center justify-center">
                                <span className="text-[8px] font-bold text-primary-foreground">PP</span>
                              </div>
                              <span className="text-xs font-medium text-muted-foreground">Peptide Playbook AI</span>
                            </div>
                          </>
                        )}
                        <div className="prose prose-sm dark:prose-invert max-w-none">
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
                          <>
                            <div className="flex items-start gap-1.5 text-xs text-muted-foreground mt-3 pt-2 border-t border-border">
                              <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" />
                              <p>This information is for educational purposes only. Most peptides are NOT FDA-approved for human use. Always consult a licensed healthcare provider.</p>
                            </div>
                            <div className="flex items-center gap-1 mt-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 px-2"
                                onClick={() => handleFeedback(message, true)}
                              >
                                <ThumbsUp className="w-3.5 h-3.5" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 px-2"
                                onClick={() => handleFeedback(message, false)}
                              >
                                <ThumbsDown className="w-3.5 h-3.5" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className={cn("h-7 px-2", message.isSaved && "text-primary")}
                                onClick={() => handleToggleSave(message)}
                                disabled={!message.dbId}
                              >
                                {message.isSaved ? (
                                  <Bookmark className="w-3.5 h-3.5 fill-current" />
                                ) : (
                                  <BookmarkPlus className="w-3.5 h-3.5" />
                                )}
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Input area */}
      <div className="border-t border-border bg-background">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="relative">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything — protocols, dosing, comparisons, research..."
              className="min-h-[52px] max-h-32 pr-12 resize-none rounded-xl border-border"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 bottom-2 h-8 w-8 rounded-lg"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
