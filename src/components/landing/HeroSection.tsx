import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      <div className="container px-4 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            ✨ AI-Powered • Personalized • Day-by-Day
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            The First AI-Powered
            <span className="block text-primary mt-2">Peptide Course</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Not a generic course. Not a chatbot. A complete program built around 
            <strong className="text-foreground"> YOUR </strong> goal — with day-by-day 
            guidance through your first cycle.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="h-12 px-8 text-base"
              onClick={() => {
                document.getElementById('goals')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            >
              Pick Your Goal
              <span className="ml-2">→</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base"
              onClick={() => {
                document.getElementById('how-it-works')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            >
              See How It Works
            </Button>
          </motion.div>

          {/* Price callout */}
          <motion.p
            variants={itemVariants}
            className="mt-8 text-sm text-muted-foreground"
          >
            $99 one-time • Lifetime access • 30-day money-back guarantee
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
