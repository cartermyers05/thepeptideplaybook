import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const painPoints = [
  "TikTok \"experts\" who bought one peptide once",
  "Reddit threads that contradict every 3 comments",
  "47 browser tabs and more confusion than when you started",
  "Doctors who dismiss you or don't know what you're talking about",
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
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const }
  },
};

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section id="problem" ref={sectionRef} className="py-20 md:py-28 relative overflow-hidden">
      {/* Accent line */}
      <motion.div 
        className="absolute left-0 top-1/4 w-1 h-32 bg-gradient-to-b from-primary/50 to-transparent rounded-full hidden md:block"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ originY: 0 }}
      />

      <div className="container px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-2xl mx-auto text-center"
          style={{ y }}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-semibold tracking-tight mb-4"
          >
            You've Tried to Research Peptides Before
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground mb-10">
            Sound familiar?
          </motion.p>

          <motion.div 
            variants={containerVariants}
            className="space-y-4 text-left max-w-lg mx-auto mb-10"
          >
            {painPoints.map((point, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 border border-border/50"
              >
                <span className="text-destructive/70 font-semibold flex-shrink-0 tabular-nums">
                  {index + 1}.
                </span>
                <span className="text-foreground">{point}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-foreground font-medium text-xl"
          >
            You don't need more opinions. You need a research assistant that actually knows the science.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
