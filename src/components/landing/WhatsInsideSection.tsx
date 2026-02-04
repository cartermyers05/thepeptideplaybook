import { motion } from "framer-motion";

const features = [
  {
    title: "Personalized Peptide Selection",
    description: "Based on your goal, not generic recommendations. AI analyzes your specific situation.",
    gradient: "linear-gradient(135deg, hsl(173 55% 50%) 0%, hsl(180 60% 40%) 100%)",
  },
  {
    title: "Research-Based Dosing",
    description: "What studies have found, clearly explained. No guesswork, just science.",
    gradient: "linear-gradient(145deg, hsl(200 50% 50%) 0%, hsl(220 55% 45%) 100%)",
  },
  {
    title: "8-Week Day-by-Day Program",
    description: "Lessons unlock daily so you never feel overwhelmed. Pace yourself perfectly.",
    gradient: "linear-gradient(155deg, hsl(260 45% 55%) 0%, hsl(280 50% 45%) 100%)",
  },
  {
    title: "Reconstitution Walkthrough",
    description: "Step-by-step guide to mixing your peptides. Visual instructions included.",
    gradient: "linear-gradient(165deg, hsl(340 45% 55%) 0%, hsl(320 50% 45%) 100%)",
  },
  {
    title: "Injection Guide",
    description: "First-timer friendly, covers everything. From needle selection to technique.",
    gradient: "linear-gradient(135deg, hsl(30 60% 50%) 0%, hsl(15 55% 45%) 100%)",
  },
  {
    title: "24/7 AI Coach Access",
    description: "Ask questions anytime, get instant answers. Your personal peptide expert.",
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
    <section id="curriculum" className="py-32 md:py-40 bg-secondary/50">
      <div className="container px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            What You
            <br />
            <span className="text-primary">Get</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            Everything you need to confidently complete your first peptide cycle.
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
              <div className="relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
                {/* Gradient bar at top */}
                <div 
                  className="h-2"
                  style={{ background: feature.gradient }}
                />
                
                {/* Content */}
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
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
