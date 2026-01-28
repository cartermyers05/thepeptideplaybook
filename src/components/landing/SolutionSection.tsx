import { motion } from "framer-motion";
import { Zap, BookOpen, Scale, Stethoscope, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function SolutionSection() {
  return (
    <section id="demo" className="py-20 md:py-28 relative overflow-hidden">
      {/* Subtle gradient glow */}
      <div className="gradient-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50" />

      <div className="container px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Peptide Playbook: Your{" "}
            <span className="text-gradient">20-Minute Safety Briefing</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to understand peptides — without the guesswork, 
            the TikTok bros, or the 40-hour research rabbit hole.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {/* Card 1: Not a course */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="glass-card p-6"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">
              Not a course. Not a community. Just clarity.
            </h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                A focused, no-fluff guide you can read in one sitting
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                Written in plain English, not bro-science
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                Based on 200+ hours of research so you don't have to
              </li>
            </ul>
          </motion.div>

          {/* Card 2: 3-Step Framework */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="glass-card p-6"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">The 3-Step Framework</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  1
                </div>
                <span className="text-muted-foreground">
                  Understand what each peptide actually does (and doesn't do)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  2
                </div>
                <span className="text-muted-foreground">
                  Know what's legal, what's sketchy, and what's dangerous
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  3
                </div>
                <span className="text-muted-foreground">
                  Walk into your doctor's office with the right questions
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button asChild size="lg" className="btn-primary-glow h-14 px-10 text-lg">
            <Link to="/signup">
              Get the Safety Guide — $47
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </motion.div>

        {/* Educational disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto bg-secondary/50 rounded-xl px-6 py-4">
            ⚠️ <span className="font-medium">Important:</span> Peptide Playbook is an educational resource only. 
            It does not provide medical advice, dosing recommendations, or treatment guidance. 
            Always consult a licensed healthcare provider.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
