import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const benefits = [
  "100+ research papers reviewed",
  "FDA status for every peptide",
  "Doctor-ready questions",
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle dot grid background */}
      <div className="absolute inset-0 dot-grid" />
      
      {/* Gradient wash */}
      <div className="absolute inset-0 gradient-wash opacity-50" />

      {/* Abstract blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 blob-bg animate-orb-float" />
      <div 
        className="absolute bottom-20 right-10 w-96 h-96 blob-bg animate-orb-float" 
        style={{ animationDelay: '-4s' }} 
      />

      <div className="container relative z-10 px-4 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 rounded-full border border-primary/20 bg-primary/5"
          >
            <BookOpen className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">
              The Complete Peptide Education Guide
            </span>
          </motion.div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Finally Understand Peptides{" "}
            <span className="text-gradient">Without the TikTok Confusion</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            The complete guide to peptides: what they are, how they work, what the research actually says, and how to have informed conversations with your doctor.
          </p>

          {/* Benefits list */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-10"
          >
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-primary" />
                </div>
                {benefit}
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button asChild size="lg" className="h-14 px-10 text-lg glow-primary">
              <Link to="/signup">
                Get the Playbook — $67
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
              <a href="#demo">See What's Inside</a>
            </Button>
          </motion.div>

          {/* Trust indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full bg-primary/20 ring-2 ring-background"
                  />
                ))}
              </div>
              <span>2,847+ readers</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border" />
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="w-4 h-4 text-amber-500 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
              <span className="ml-1">4.9/5 rating</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border" />
            <span>Instant digital access</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
