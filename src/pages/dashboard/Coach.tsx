import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useTier } from "@/hooks/useTier";
import { UpgradePrompt } from "@/components/dashboard/UpgradePrompt";
import { useCoachMessages, useSendCoachMessage } from "@/hooks/useCoachMessages";
import { useAIContext } from "@/hooks/useAIContext";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, ArrowUp, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useQueryClient } from "@tanstack/react-query";
import { AIQualityBadge } from "@/components/dashboard/AIQualityBadge";

const WELCOME_MESSAGE = `Hey — I'm your Peptide Playbook coach. I'll build you a personalized protocol based on your goals, body, and experience level.

Quick heads up: I'm an AI trained on published peptide research. Everything I share is educational, not medical advice. If you have a healthcare provider, loop them in.

Ready? Let's start with the basics. What's your primary goal with peptides?`;

export default function Coach() {
  const { isPaid } = useTier();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const aiContext = useAIContext();

  const { data: messages = [], isLoading: loadingMessages } = useCoachMessages();
  const sendMessage = useSendCoachMessage();

  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hasInsertedWelcome = useRef(false);

  // Auto-insert welcome message on first visit
  useEffect(() => {
    if (!loadingMessages && messages.length === 0 && !hasInsertedWelcome.current && user) {
      hasInsertedWelcome.current = true;
      sendMessage.mutate({ role: "assistant", content: WELCOME_MESSAGE, context_type: "onboarding" });
    }
  }, [loadingMessages, messages.length, user]);

  // Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingContent]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [input]);

  if (!isPaid) {
    return (
      <DashboardLayout>
        <UpgradePrompt feature="Peptide Playbook AI" />
      </DashboardLayout>
    );
  }

  const handleSend = async () => {
    const msg = input.trim();
    if (!msg || isStreaming) return;

    setInput("");
    setIsStreaming(true);
    setStreamingContent("");

    // Save user message
    sendMessage.mutate({ role: "user", content: msg });

    try {
      // Build history (last 20)
      const history = messages.slice(-20).map((m) => ({ role: m.role, content: m.content }));
      history.push({ role: "user", content: msg });

      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) throw new Error("Not authenticated");

      // Stream via fetch + SSE
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/peptide-coach`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            message: msg,
            history,
            profile: aiContext.profile,
            active_protocol: aiContext.activeProtocol,
            recent_logs: aiContext.recentLogs,
          }),
        }
      );

      if (!response.ok) {
        const err = await response.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(err.error || `Error ${response.status}`);
      }

      // Parse SSE stream
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let fullContent = "";

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
                fullContent += content;
                setStreamingContent(fullContent);
              }
            } catch {
              textBuffer = line + "\n" + textBuffer;
              break;
            }
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullContent += content;
              setStreamingContent(fullContent);
            }
          } catch { /* ignore */ }
        }
      }

      setStreamingContent("");
      setIsStreaming(false);

      const responseText = fullContent || "I'm having trouble connecting right now. Try again in a moment.";

      // Save assistant message
      sendMessage.mutate({ role: "assistant", content: responseText });

      // Protocol detection
      if (responseText.includes("YOUR PROTOCOL:") || responseText.startsWith("🎯")) {
        if (user) {
          await (supabase as any)
            .from("user_profiles")
            .update({ onboarding_complete: true })
            .eq("user_id", user.id);
        }
        queryClient.invalidateQueries({ queryKey: ["user-protocol"] });
      }
    } catch (err) {
      console.error("Coach error:", err);
      setIsStreaming(false);
      setStreamingContent("");
      sendMessage.mutate({
        role: "assistant",
        content: "I'm having trouble connecting right now. Try again in a moment.",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col" style={{ height: "calc(100vh - 10rem)" }}>
        {/* Top bar */}
        <div className="flex items-center gap-3 py-3 border-b" style={{ borderColor: "#E5E7EB" }}>
          <button onClick={() => navigate("/dashboard")} className="p-2 rounded-lg hover:bg-secondary">
            <ArrowLeft className="w-5 h-5" style={{ color: "#6B7280" }} />
          </button>
          <h1 className="text-lg font-bold" style={{ color: "#111827" }}>AI Coach</h1>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {loadingMessages ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin" style={{ color: "#9CA3AF" }} />
            </div>
          ) : (
            messages.map((msg) => (
              <MessageBubble key={msg.id} role={msg.role} content={msg.content} />
            ))
          )}

          {isStreaming && (
            <div className="flex justify-start">
              <div
                className="rounded-2xl rounded-bl px-4 py-3 max-w-[85%]"
                style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}
              >
                {streamingContent ? (
                  <div className="prose prose-sm max-w-none" style={{ color: "#374151" }}>
                    <ReactMarkdown>{streamingContent}</ReactMarkdown>
                  </div>
                ) : (
                  <div className="flex gap-1.5 py-1">
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: "#9CA3AF", animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: "#9CA3AF", animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: "#9CA3AF", animationDelay: "300ms" }} />
                  </div>
                )}
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input bar */}
        <div className="border-t py-3 flex gap-2 items-end" style={{ borderColor: "#E5E7EB" }}>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about your protocol..."
            rows={1}
            className="flex-1 resize-none rounded-xl border px-4 py-3 text-[16px] focus:outline-none focus:ring-2 focus:ring-ring"
            style={{
              backgroundColor: "#F9FAFB",
              borderColor: "#E5E7EB",
              color: "#111827",
              maxHeight: 120,
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isStreaming}
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-opacity disabled:opacity-40"
            style={{ backgroundColor: "#F97316" }}
          >
            <ArrowUp className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

function MessageBubble({ role, content }: { role: string; content: string }) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className="px-4 py-3 max-w-[85%]"
        style={{
          backgroundColor: isUser ? "#F3F4F6" : "#FFFFFF",
          border: isUser ? "none" : "1px solid #E5E7EB",
          borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
          color: "#374151",
          fontSize: 15,
        }}
      >
        {isUser ? (
          <p style={{ whiteSpace: "pre-wrap" }}>{content}</p>
        ) : (
          <div>
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
            <div className="mt-2 flex justify-end">
              <AIQualityBadge />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
