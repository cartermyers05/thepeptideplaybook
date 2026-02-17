import { motion } from "framer-motion";
import { User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/Logo";

interface QuizMessageProps {
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
  isLatest?: boolean;
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 py-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"
          style={{ animationDelay: `${i * 150}ms`, animationDuration: '0.6s' }}
        />
      ))}
    </div>
  );
}

export function QuizMessage({ role, content, isStreaming, isLatest }: QuizMessageProps) {
  const isAssistant = role === 'assistant';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex gap-4 max-w-[85%]",
        isAssistant ? "mr-auto" : "ml-auto flex-row-reverse"
      )}
    >
      {isAssistant && (
        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
          <Logo showText={false} size="md" />
        </div>
      )}
      
      <div
        className={cn(
          "rounded-2xl px-5 py-4",
          isAssistant 
            ? "bg-secondary text-foreground rounded-tl-sm" 
            : "bg-foreground text-background rounded-tr-sm"
        )}
      >
        {isAssistant && isStreaming && !content ? (
          <TypingDots />
        ) : (
          <p className="text-base leading-relaxed whitespace-pre-wrap">{content}</p>
        )}
        {isAssistant && isStreaming && content && (
          <span className="inline-block w-0.5 h-4 bg-primary animate-pulse ml-0.5 align-middle rounded-full" />
        )}
      </div>

      {!isAssistant && (
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarFallback className="bg-muted text-muted-foreground">
            <User className="w-5 h-5" />
          </AvatarFallback>
        </Avatar>
      )}
    </motion.div>
  );
}
