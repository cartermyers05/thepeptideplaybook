import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Send,
  ThumbsUp,
  ThumbsDown,
  BookmarkPlus,
  Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { useAuth } from "@/hooks/useAuth";
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

const suggestedQuestions = [
  "What's the best peptide for recovery?",
  "How do I dose BPC-157 safely?",
  "Which peptides stack well together?",
  "What are the side effects of TB-500?",
];

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
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
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
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
              <div className="text-center py-16">
                {/* Animated logo with glow */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-8 pulse-glow">
                  <Sparkles className="w-10 h-10 text-primary-foreground" />
                </div>
                <h2 className="text-3xl font-bold mb-3 text-gradient">
                  Welcome to PeptideGPT
                </h2>
                <p className="text-muted-foreground mb-10 max-w-md mx-auto">
                  Your AI research assistant for evidence-based peptide information
                </p>

                {/* Suggested questions - 2x2 grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
                  {suggestedQuestions.map((question) => (
                    <button
                      key={question}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="p-4 text-left rounded-xl glass-card card-hover border border-border/50 group"
                    >
                      <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {question}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      "flex",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-4 py-3",
                        message.role === "user"
                          ? "bg-gradient-primary text-primary-foreground rounded-br-md"
                          : "glass-card rounded-bl-md"
                      )}
                    >
                      {message.role === "assistant" && (
                        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border/30">
                          <div className="w-6 h-6 rounded-lg bg-gradient-primary flex items-center justify-center">
                            <Sparkles className="w-3 h-3 text-primary-foreground" />
                          </div>
                          <span className="text-xs font-medium text-muted-foreground">PeptideGPT</span>
                        </div>
                      )}
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        {message.role === "assistant" ? (
                          <div className="text-sm">
                            <ReactMarkdown>{message.content}</ReactMarkdown>
                          </div>
                        ) : (
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        )}
                        {isLoading &&
                          message.role === "assistant" &&
                          message === messages[messages.length - 1] && (
                            <span className="typing-cursor" />
                          )}
                      </div>
                      {message.role === "assistant" && message.content && !isLoading && (
                        <>
                          <p className="text-xs text-muted-foreground mt-3 pt-2 border-t border-border/30 italic">
                            For research purposes only. Consult a healthcare provider.
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 px-2 hover-glow"
                              onClick={() => handleFeedback(message, true)}
                            >
                              <ThumbsUp className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 px-2 hover-glow"
                              onClick={() => handleFeedback(message, false)}
                            >
                              <ThumbsDown className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className={cn("h-8 px-2 hover-glow", message.isSaved && "text-primary")}
                              onClick={() => handleToggleSave(message)}
                              disabled={!message.dbId}
                            >
                              {message.isSaved ? (
                                <Bookmark className="w-4 h-4 fill-current" />
                              ) : (
                                <BookmarkPlus className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Floating input area */}
      <div className="p-4 lg:p-6">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="relative glass-card p-2 rounded-2xl">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Ask a research question about peptides..."
              className="min-h-[56px] max-h-[200px] pr-14 resize-none bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-4 bottom-4 rounded-xl bg-gradient-primary hover:opacity-90 transition-opacity glow-primary"
              disabled={!input.trim() || isLoading}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-3 flex items-center justify-center gap-2">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 rounded bg-secondary text-xs font-mono">Enter</kbd>
            <span>to send • PeptideGPT provides research information only</span>
          </p>
        </form>
      </div>
    </div>
  );
}
