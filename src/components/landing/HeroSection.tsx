import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { HeroDemo } from "./HeroDemo";
import { Link } from "react-router-dom";

const trustItems = [
  "4,200+ researchers",
  "30-day guarantee",
  "$67 one-time",
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
              Stop Guessing.
              <motion.span
                className="block text-gradient mt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Start Understanding.
              </motion.span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Get instant answers on BPC-157, Semaglutide, and 41+ peptides. No more Reddit rabbit holes. Your AI research assistant is ready.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <Link to="/signup">
                <Button size="lg" className="btn-primary-clean h-12 px-8 text-base group w-full sm:w-auto">
                  Get Full Access
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 text-base hover-lift border-border/60 bg-background/50 backdrop-blur-sm w-full sm:w-auto"
                onClick={() => {
                  document.getElementById('demo')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
              >
                Watch Demo
              </Button>
            </motion.div>

            {/* Trust signals - text only with dot separators */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 text-sm text-muted-foreground"
            >
              {trustItems.map((item, index) => (
                <span key={index} className="flex items-center gap-4">
                  {index > 0 && <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />}
                  <span>{item}</span>
                </span>
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
