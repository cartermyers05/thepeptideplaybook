import { SEOHead } from "@/components/seo/SEOHead";
import { ConversationalQuiz } from "@/components/quiz/ConversationalQuiz";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

export default function Quiz() {
  return (
    <>
      <SEOHead 
        title="Free Peptide Quiz — Find Your Personalized Protocol | Peptide Playbook"
        description="Answer 5 questions and get matched to the right peptide protocol for your goal. Takes 2 minutes."
        canonical="/quiz"
      />
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Subtle dot grid background */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--muted-foreground) / 0.3) 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }}
        />
        
        {/* Header */}
        <header className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
          <div className="max-w-4xl mx-auto flex items-center justify-between h-14 px-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <div className="flex items-center gap-3">
              <Logo showText={false} size="sm" />
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="pt-14 min-h-screen flex flex-col relative z-10">
          <ConversationalQuiz />
        </main>
      </div>
    </>
  );
}
