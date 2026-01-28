import { motion } from "framer-motion";
import { ArrowRight, Play, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
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
            Stop Taking Peptide Advice From{" "}
            <span className="text-gradient">19-Year-Olds on TikTok</span>
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6"
          >
            The 20-minute safety guide that replaces 40 hours of confusing research. 
            Know exactly what's safe, what's legal, and what questions to ask your doctor.
          </motion.p>

          {/* Specificity badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8"
          >
            <Star className="w-4 h-4 fill-primary" />
            <span className="text-sm font-medium">Covers the 15 most popular peptides</span>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="mb-4"
          >
            <Button asChild size="lg" className="btn-primary-glow h-14 px-10 text-lg">
              <Link to="/signup">
                Get Protected for $47
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>

          {/* Trust badges below CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-10"
          >
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-success" />
              <span>30-day money-back guarantee</span>
            </div>
            <span className="text-border">•</span>
            <span>Instant access</span>
          </motion.div>

          {/* Video placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="glass-card aspect-video flex items-center justify-center cursor-pointer group">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center transition-transform group-hover:scale-110">
                <Play className="w-8 h-8 text-primary fill-primary" />
              </div>
              <span className="absolute bottom-4 text-sm text-muted-foreground">
                Watch: Why TikTok peptide advice is dangerous
              </span>
            </div>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center justify-center gap-2"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-background flex items-center justify-center text-xs"
                >
                  👤
                </div>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              Join <span className="font-semibold text-foreground">500+</span> people who stopped guessing
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
