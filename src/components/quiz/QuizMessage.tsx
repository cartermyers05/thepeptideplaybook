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
        "flex gap-3 max-w-[85%]",
        isAssistant ? "mr-auto" : "ml-auto flex-row-reverse"
      )}
    >
      {isAssistant && (
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarFallback className="bg-muted text-foreground text-[10px] font-bold">
            PP
          </AvatarFallback>
        </Avatar>
      )}
      
      <div
        className={cn(
          "rounded-2xl px-4 py-3",
          isAssistant 
            ? "bg-secondary text-foreground rounded-tl-sm" 
            : "bg-foreground text-background rounded-tr-sm"
        )}
      >
        {isAssistant && isLatest && isStreaming ? (
          <TypewriterMessage content={content} isStreaming={isStreaming} />
        ) : (
          <p className="text-sm whitespace-pre-wrap">{content}</p>
        )}
      </div>

      {!isAssistant && (
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarFallback className="bg-muted text-muted-foreground">
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </motion.div>
  );
}
