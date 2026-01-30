import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Clock, ArrowRight } from "lucide-react";
import { FloatingOrbs } from "./FloatingOrbs";
import { GridPattern } from "./GridPattern";
import { HeroDemo } from "./HeroDemo";
import { Link } from "react-router-dom";

const trustItems = [
  { icon: Shield, text: "30-Day Guarantee" },
  { icon: Zap, text: "Instant Access" },
  { icon: Clock, text: "No Subscription" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function HeroSection() {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 gradient-mesh-bg grain-overlay overflow-hidden">
      <FloatingOrbs variant="hero" />
      <GridPattern variant="dots" />

      <div className="container px-4 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center max-w-6xl mx-auto">
          {/* Left column - Content */}
          <motion.div
            className="text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] mb-6"
            >
              Ask Anything About Peptides
              <motion.span
                className="block text-gradient mt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Get Research Backed Answers
              </motion.span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Your 24/7 AI research assistant that knows 41+ peptides, their FDA status, mechanisms, and the latest studies.
            </motion.p>

            {/* Stats row */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8"
            >
              <div className="text-center lg:text-left">
                <p className="text-2xl font-bold text-gradient">41+</p>
                <p className="text-xs text-muted-foreground">Peptides</p>
              </div>
              <div className="h-10 w-px bg-border" />
              <div className="text-center lg:text-left">
                <p className="text-2xl font-bold text-gradient">500+</p>
                <p className="text-xs text-muted-foreground">Studies</p>
              </div>
              <div className="h-10 w-px bg-border" />
              <div className="text-center lg:text-left">
                <p className="text-2xl font-bold text-gradient">24/7</p>
                <p className="text-xs text-muted-foreground">Instant</p>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <Button asChild size="lg" className="btn-primary-clean h-12 px-8 text-base group">
                <Link to="/pricing">
                  Get Full Access - $67
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 px-8 text-base hover-lift border-border/60 bg-background/50 backdrop-blur-sm"
              >
                <a href="#demo">See More Examples</a>
              </Button>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-4"
            >
              {trustItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-3 h-3 text-primary" />
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column - Demo */}
          <div className="mt-12 lg:mt-0">
            <HeroDemo />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}