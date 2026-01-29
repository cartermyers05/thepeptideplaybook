import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Bot, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";
import { useTier } from "@/hooks/useTier";
import { cn } from "@/lib/utils";

interface WelcomeBannerProps {
  onStartChat?: () => void;
}

export default function WelcomeBanner({ onStartChat }: WelcomeBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const { data: profile } = useProfile();
  const { isPaid } = useTier();

  const firstName = profile?.full_name?.split(" ")[0] || "there";
  const questionsAsked = profile?.questions_asked || 0;

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-4 md:p-5 mb-4"
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        {/* Close button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-3 right-3 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Icon */}
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Bot className="w-5 h-5 text-primary" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold mb-0.5">
              Hey {firstName}! 👋
            </h2>
            <p className="text-sm text-muted-foreground">
              Your AI peptide researcher is ready. Ask anything about mechanisms, research, or safety.
            </p>
          </div>

          {/* Stats (desktop only) */}
          {isPaid && (
            <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
              <div className="text-center">
                <p className="text-lg font-semibold">{questionsAsked}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Questions</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <p className="text-lg font-semibold">41+</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Peptides</p>
              </div>
            </div>
          )}

          {/* CTA for free users */}
          {!isPaid && (
            <Button 
              size="sm" 
              className="flex-shrink-0 shadow-lg shadow-primary/20"
              asChild
            >
              <a href="/checkout">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                Unlock Full Access
              </a>
            </Button>
          )}
        </div>

        {/* Mobile stats */}
        {isPaid && (
          <div className="lg:hidden flex items-center gap-4 mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm"><strong>{questionsAsked}</strong> questions asked</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm"><strong>41+</strong> peptides</span>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
