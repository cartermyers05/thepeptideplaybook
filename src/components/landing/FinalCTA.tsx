import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function FinalCTA() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-primary opacity-5" />
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.1) 0%, transparent 70%)`,
        }}
      />

      {/* Abstract blobs */}
      <div className="absolute top-10 left-20 w-64 h-64 blob-bg animate-orb-float opacity-10" />
      <div 
        className="absolute bottom-10 right-20 w-80 h-80 blob-bg animate-orb-float opacity-10" 
        style={{ animationDelay: '-4s' }} 
      />

      <div className="container px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-primary/10 border border-primary/20">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Join 2,847+ readers
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Finally{" "}
            <span className="text-gradient">Understand Peptides?</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Stop scrolling through confusing TikToks and sketchy forums. 
            Get the complete, research-backed guide to peptides today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="h-14 px-10 text-lg glow-primary">
              <Link to="/signup">
                Get the Playbook — $67
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            One-time purchase • Instant access • 30-day money-back guarantee
          </p>
        </motion.div>
      </div>
    </section>
  );
}
