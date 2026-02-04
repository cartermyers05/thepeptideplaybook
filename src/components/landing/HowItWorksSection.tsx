import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Pick Your Goal",
    description: "Fat loss, muscle, recovery, anti-aging, or cognitive enhancement. Choose what matters to you.",
  },
  {
    number: "02",
    title: "AI Builds Your Course",
    description: "In 60 seconds, get a personalized program with specific peptides, research-based dosing, and daily lessons.",
  },
  {
    number: "03",
    title: "Follow the Guide",
    description: "Day-by-day lessons walk you through everything. From mixing your first vial to your last injection.",
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

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-32 md:py-40">
      <div className="container px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            How It
            <br />
            <span className="text-primary">Works</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16 md:space-y-24"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="grid md:grid-cols-12 gap-6 md:gap-12 items-start"
            >
              {/* Step number */}
              <div className="md:col-span-2">
                <span className="text-6xl md:text-7xl font-bold text-muted-foreground/30">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div className="md:col-span-10 md:border-t border-border pt-0 md:pt-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  {step.title}
                </h3>
                <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
