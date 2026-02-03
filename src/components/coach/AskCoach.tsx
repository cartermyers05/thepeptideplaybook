import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Loader2, Bot, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useProtocol } from "@/hooks/useProtocol";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function AskCoach() {
  const { protocol } = useProtocol();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi! I'm your AI Coach. I'm here to answer any questions about your peptide protocol, dosing, timing, or anything else you're curious about. What can I help you with today?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("coach", {
        body: {
          message: userMessage,
          protocol: protocol
            ? {
                name: protocol.protocol_name,
                peptides: protocol.peptides,
                currentDay: protocol.current_day,
                currentWeek: protocol.current_week,
                cycleLength: protocol.cycle_length_weeks,
              }
            : null,
        },
      });

      if (error) throw error;

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response || "I'm sorry, I couldn't process that. Please try again." },
      ]);
    } catch (error) {
      console.error("Coach error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="flex flex-col h-[500px]">
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className="bg-primary/10">
                      <Bot className="w-4 h-4 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-4 py-2",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  {message.role === "assistant" ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm">{message.content}</p>
                  )}
                </div>
                {message.role === "user" && (
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className="bg-secondary">
                      <User className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary/10">
                    <Bot className="w-4 h-4 text-primary" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg px-4 py-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Textarea
              placeholder="Ask me anything about peptides..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-[44px] max-h-[120px] resize-none"
              rows={1}
            />
            <Button onClick={handleSend} disabled={isLoading || !input.trim()} size="icon" className="flex-shrink-0">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
