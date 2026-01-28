import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container px-4">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center max-w-6xl mx-auto">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-[3.25rem] font-semibold tracking-tight leading-[1.1] mb-6">
              Stop Taking Peptide Advice From 19-Year-Olds on TikTok
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              A research-backed guide to understanding peptides — what they do, 
              what's legal, and what to ask your doctor.
            </p>

            <div className="space-y-4">
              <Button asChild size="lg" className="btn-primary-clean h-12 px-8 text-base">
                <Link to="/signup">
                  Start Learning — $67
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>

              <p className="text-sm text-muted-foreground">
                Instant access • 30-day guarantee
              </p>
            </div>
          </motion.div>

          {/* Visual - Abstract molecules/pills */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-square max-w-md mx-auto relative">
              {/* Abstract floating elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Large central circle */}
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-sm" />
              </div>
              
              {/* Floating molecules */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-8 right-8 w-16 h-16 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20"
              />
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/3 left-4 w-12 h-12 rounded-full bg-primary/15 backdrop-blur-sm border border-primary/20"
              />
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-16 right-12 w-20 h-20 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20"
              />
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 left-16 w-10 h-10 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30"
              />
              
              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="glass-card-subtle p-8 text-center">
                  <p className="text-4xl font-semibold text-primary mb-2">15</p>
                  <p className="text-sm text-muted-foreground">Peptides covered</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
