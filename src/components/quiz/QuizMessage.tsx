import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import { TypewriterMessage } from "@/components/dashboard/TypewriterMessage";

interface QuizMessageProps {
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
  isLatest?: boolean;
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
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarFallback className="bg-muted text-foreground text-xs font-bold">
            PP
          </AvatarFallback>
        </Avatar>
      )}
      
      <div
        className={cn(
          "rounded-2xl px-5 py-4",
          isAssistant 
            ? "bg-secondary text-foreground rounded-tl-sm" 
            : "bg-foreground text-background rounded-tr-sm"
        )}
      >
        {isAssistant && isLatest && isStreaming ? (
          <TypewriterMessage content={content} isStreaming={isStreaming} />
        ) : (
          <p className="text-base leading-relaxed whitespace-pre-wrap">{content}</p>
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
