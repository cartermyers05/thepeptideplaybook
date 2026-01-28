import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const problems = [
  "TikTok \"experts\" recommending dosages with zero medical training",
  "Reddit threads full of contradictory advice and bro science",
  "No clear explanation of what's actually FDA-approved vs. illegal",
  "Impossible to know which sources to trust",
  "Doctors who dismiss peptides entirely or know less than you do",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

export function ProblemSection() {
  return (
    <section className="py-24 md:py-32 bg-[#FAFBFC] relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: "-3s" }} />
      </div>
      
      <div className="container px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-semibold tracking-tight mb-8 text-center"
          >
            The Peptide Information Problem
          </motion.h2>
          
          <motion.ul className="space-y-4 mb-8">
            {problems.map((problem, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                className="flex items-start gap-3"
              >
                <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground leading-relaxed">{problem}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
