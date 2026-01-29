import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FloatingOrbs } from "./FloatingOrbs";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
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

export function SolutionSection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <FloatingOrbs variant="rich" />
      
      {/* Gradient spotlight */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px]"
          style={{
            background: "radial-gradient(ellipse at center, hsl(263 70% 42% / 0.08) 0%, transparent 60%)",
          }}
        />
      </div>
      
      {/* Decorative shapes */}
      <motion.div
        className="absolute -left-20 top-1/4 w-40 h-40 rounded-full"
        style={{ background: "linear-gradient(135deg, hsl(263 70% 42% / 0.1), transparent)" }}
        animate={{ y: [0, 20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-16 bottom-1/3 w-32 h-32 rounded-full"
        style={{ background: "linear-gradient(135deg, hsl(280 70% 50% / 0.08), transparent)" }}
        animate={{ y: [0, -15, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="container px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-semibold tracking-tight mb-10"
          >
            What If You Actually <span className="text-gradient">Understood</span> Peptides?
          </motion.h2>

          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed text-left md:text-center mb-10">
            <motion.p variants={itemVariants}>
              Imagine knowing exactly what the research says about BPC-157, semaglutide, 
              or any peptide you're curious about — not what some guy on Reddit thinks, 
              but what the actual studies show.
            </motion.p>

            <motion.p variants={itemVariants}>
              Imagine walking into your doctor's office with specific questions instead 
              of vague curiosity. Imagine knowing exactly what red flags to look for 
              before you buy anything.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-foreground font-semibold text-xl"
            >
              That's what Peptide Playbook gives you.
            </motion.p>

            <motion.p variants={itemVariants}>
              It's not medical advice. It's not telling you what to take. It's giving you 
              the education you need to stop guessing and start understanding — so you 
              can make informed decisions with your healthcare provider.
            </motion.p>
          </div>

          <motion.div variants={itemVariants}>
            <Button asChild size="lg" className="btn-primary-clean h-12 px-8 text-base">
              <a href="#pricing">Get Full Access — $67</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
