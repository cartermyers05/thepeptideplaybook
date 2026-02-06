import { motion } from "framer-motion";

const features = [
  {
    title: "Which Peptides Are Right for Me?",
    description: "Tell us your goal. We'll show you the best options based on real research, not random forums.",
    gradient: "linear-gradient(135deg, hsl(173 55% 50%) 0%, hsl(180 60% 40%) 100%)",
  },
  {
    title: "How Much Should I Take?",
    description: "Get dosing info from actual studies. Clear numbers, not guesswork.",
    gradient: "linear-gradient(145deg, hsl(200 50% 50%) 0%, hsl(220 55% 45%) 100%)",
  },
  {
    title: "What Do I Do Each Day?",
    description: "One lesson a day for 8 weeks. Never overwhelming. Just what you need today.",
    gradient: "linear-gradient(155deg, hsl(260 45% 55%) 0%, hsl(280 50% 45%) 100%)",
  },
  {
    title: "How Do I Mix It?",
    description: "Step-by-step guide to reconstitution. Pictures included. Impossible to mess up.",
    gradient: "linear-gradient(165deg, hsl(340 45% 55%) 0%, hsl(320 50% 45%) 100%)",
  },
  {
    title: "How Do I Actually Use It?",
    description: "Complete injection guide for beginners. Where, how, and when explained simply.",
    gradient: "linear-gradient(135deg, hsl(30 60% 50%) 0%, hsl(15 55% 45%) 100%)",
  },
  {
    title: "What If I Have Questions?",
    description: "Ask the AI coach anything, anytime. It knows 500+ studies and your specific plan.",
    gradient: "linear-gradient(145deg, hsl(142 50% 45%) 0%, hsl(160 55% 40%) 100%)",
  },
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function WhatsInsideSection() {
  return (
    <section id="curriculum" className="py-20 md:py-28 bg-secondary/50">
      <div className="container px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            What's
            <br />
            Inside?
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            Everything you need to start your first peptide cycle with confidence.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              {/* Card with gradient top bar */}
              <div className="relative bg-card rounded-2xl overflow-hidden border border-border hover:border-muted-foreground/30 transition-all duration-300 hover:shadow-xl">
                {/* Gradient bar at top */}
                <div 
                  className="h-2"
                  style={{ background: feature.gradient }}
                />
                
                {/* Content */}
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-foreground transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
