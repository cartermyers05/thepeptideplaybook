import { motion } from "framer-motion";
import { Target, FlaskConical, Calendar, Beaker, Syringe, MessageCircle } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Personalized Peptide Selection",
    description: "Based on your goal, not generic recommendations",
  },
  {
    icon: FlaskConical,
    title: "Research-Based Dosing",
    description: "What studies have found, clearly explained",
  },
  {
    icon: Calendar,
    title: "8-Week Day-by-Day Program",
    description: "Lessons unlock daily, never feel overwhelmed",
  },
  {
    icon: Beaker,
    title: "Reconstitution Walkthrough",
    description: "Step-by-step guide to mixing your peptides",
  },
  {
    icon: Syringe,
    title: "Injection Guide",
    description: "First-timer friendly, covers everything",
  },
  {
    icon: MessageCircle,
    title: "AI Coach Access",
    description: "Ask questions anytime, get instant answers",
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function WhatsInsideSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            What You Get
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to confidently complete your first peptide cycle
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-6 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
