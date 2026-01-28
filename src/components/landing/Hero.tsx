import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient glow behind content */}
      <div className="gradient-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      
      {/* Abstract blobs */}
      <div className="blob-bg absolute top-20 -left-40 w-[500px] h-[500px] animate-orb-float" />
      <div 
        className="blob-bg absolute -bottom-20 -right-40 w-[600px] h-[600px] animate-orb-float" 
        style={{ animationDelay: '-4s' }} 
      />

      {/* Subtle dot grid */}
      <div className="absolute inset-0 dot-grid opacity-50" />

      <div className="container relative z-10 px-4 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Finally Understand Peptides —{" "}
            <span className="text-gradient">Without the TikTok Confusion</span>
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            The complete guide to peptides for people who want clarity, not chaos. 
            Know what's real, what's legal, and what to ask your doctor.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            <Button asChild size="lg" className="btn-primary-glow h-14 px-10 text-lg">
              <Link to="/signup">
                Get Instant Access — $67
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/60 ring-2 ring-background"
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                Trusted by <span className="font-medium text-foreground">500+</span> people navigating peptides
              </span>
            </div>
            
            <div className="hidden sm:block w-px h-5 bg-border" />
            
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="w-4 h-4 text-amber-500 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
              <span className="ml-1.5 text-sm text-muted-foreground">4.9/5 rating</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
