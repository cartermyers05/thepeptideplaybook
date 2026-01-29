import { motion } from "framer-motion";

const steps = [
  {
    step: "1",
    title: "Get Instant Access",
    description: "Complete your purchase and create your account. Takes 2 minutes.",
  },
  {
    step: "2",
    title: "Explore the Database",
    description: "Browse 41+ peptides with research status, mechanisms, and safety info at your fingertips.",
  },
  {
    step: "3",
    title: "Ask the AI Assistant",
    description: "Get instant, research-backed answers to your peptide questions anytime.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const }
  },
};

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Three Steps to Actually Understanding Peptides
          </h2>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Connecting line - desktop only */}
          <div className="hidden md:block absolute top-7 left-[calc(16.67%+28px)] right-[calc(16.67%+28px)] h-0.5 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30" />
          
          {steps.map((item, index) => (
            <motion.div
              key={index}
              variants={stepVariants}
              className="text-center relative z-10"
            >
              <motion.div 
                className="w-14 h-14 rounded-full bg-primary text-primary-foreground text-xl font-semibold flex items-center justify-center mx-auto mb-5 shadow-glow"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {item.step}
              </motion.div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
