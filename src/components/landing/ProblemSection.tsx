import { motion } from "framer-motion";

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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
          className="max-w-2xl mx-auto text-center"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-semibold tracking-tight mb-8"
          >
            The peptide space is confusing
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg text-muted-foreground leading-relaxed mb-8"
          >
            TikTok creators with no credentials are telling millions of people what to inject. 
            Dosing advice is inconsistent. Legal status is unclear. And most people have no idea 
            what questions to ask their doctor — or if they even should.
          </motion.p>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg font-medium"
          >
            We built this guide to fix that.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
