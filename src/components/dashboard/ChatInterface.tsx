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
  dbId?: string; // Database ID for saved messages
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

    // Create conversation if this is the first message
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

    // Save user message to database
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

      // Save assistant message to database
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

      // Increment questions asked count
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
          <div className="max-w-3xl mx-auto px-4 py-6">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  Welcome to PeptideGPT
                </h2>
                <p className="text-muted-foreground mb-8">
                  Ask any research question about peptides and get evidence-based answers
                </p>

                {/* Suggested questions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
                  {suggestedQuestions.map((question) => (
                    <button
                      key={question}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="p-4 text-left rounded-xl bg-secondary hover:bg-secondary/80 border border-border transition-colors"
                    >
                      <p className="text-sm">{question}</p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-4 py-3",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-secondary rounded-bl-md"
                      )}
                    >
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
                              className="h-8 px-2"
                              onClick={() => handleFeedback(message, true)}
                            >
                              <ThumbsUp className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 px-2"
                              onClick={() => handleFeedback(message, false)}
                            >
                              <ThumbsDown className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className={cn("h-8 px-2", message.isSaved && "text-primary")}
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

      {/* Input area */}
      <div className="border-t border-border p-4 lg:p-6">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="relative">
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
              className="min-h-[56px] max-h-[200px] pr-14 resize-none"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 bottom-2"
              disabled={!input.trim() || isLoading}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            PeptideGPT provides research information only. Always verify with healthcare professionals.
          </p>
        </form>
      </div>
    </div>
  );
}
