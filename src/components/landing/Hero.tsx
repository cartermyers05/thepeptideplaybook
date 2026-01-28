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
            Navigate Peptide Research{" "}
            <span className="text-gradient">with Confidence</span>
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            An educational resource covering what peptides are, how they're studied, 
            their regulatory status, and questions to discuss with your healthcare provider.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            <Button asChild size="lg" className="btn-primary-glow h-14 px-10 text-lg">
              <Link to="/signup">
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>

          {/* Simple tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 text-sm text-muted-foreground"
          >
            Educational peptide research guide
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
