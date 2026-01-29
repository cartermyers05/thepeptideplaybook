import { MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface InlineAICTAProps {
  articleTitle?: string;
  variant?: "default" | "compact" | "floating";
}

export function InlineAICTA({ articleTitle, variant = "default" }: InlineAICTAProps) {
  const ctaText = articleTitle 
    ? `Have more questions about ${articleTitle}?` 
    : "Have more questions?";

  if (variant === "compact") {
    return (
      <div className="inline-flex items-center gap-2 p-3 bg-muted/50 rounded-lg border border-border">
        <MessageCircle className="w-4 h-4 text-primary" />
        <span className="text-sm text-muted-foreground">Need help?</span>
        <Link to="/login">
          <Button size="sm" variant="ghost" className="text-primary">
            Ask our AI <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </Link>
      </div>
    );
  }

  if (variant === "floating") {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Link to="/login">
          <Button 
            size="lg" 
            className="rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Ask the AI
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="my-8 p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-primary" />
        </div>
        
        <div className="flex-grow text-center md:text-left">
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {ctaText}
          </h3>
          <p className="text-sm text-muted-foreground">
            Get instant, personalized answers from our AI-powered peptide expert.
          </p>
        </div>
        
        <Link to="/login" className="flex-shrink-0">
          <Button size="lg" className="whitespace-nowrap">
            Ask the AI
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
