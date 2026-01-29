import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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
          className="max-w-3xl mx-auto"
          style={{ y }}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-10"
          >
            Why Peptide Research Is So Hard to Navigate
          </motion.h2>

          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <motion.p variants={itemVariants}>
              Let's be honest about what's happening:
            </motion.p>

            <motion.p variants={itemVariants}>
              TikTok is full of 23-year-olds who bought peptides once and now think 
              they're experts. Reddit threads contradict each other every three comments. 
              The "research" people cite is usually one rat study from 2007.
            </motion.p>

            <motion.p variants={itemVariants}>
              Meanwhile, the FDA just put half of the most popular peptides on the 
              Category 2 list. Your doctor either doesn't know what you're talking about 
              or dismisses you completely. And if you try to do your own research, you 
              end up with 47 browser tabs open and more confused than when you started.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-foreground font-medium text-center pt-4 text-xl"
            >
              You don't need another influencer's opinion. You need actual information 
              you can trust.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
