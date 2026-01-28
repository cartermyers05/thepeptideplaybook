import { motion } from "framer-motion";
import { BookOpen, Scale, Stethoscope, ShieldAlert } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Peptide Breakdown",
    description: "Clear explanations of the 15 most popular peptides — what they do, what the research says, and what we still don't know.",
  },
  {
    icon: Scale,
    title: "Legal Clarity",
    description: "Understand FDA classifications, what 'research only' actually means, and what could get you in trouble.",
  },
  {
    icon: Stethoscope,
    title: "Doctor Conversation Guide",
    description: "Exactly what to say (and what not to say) when talking to your healthcare provider about peptides.",
  },
  {
    icon: ShieldAlert,
    title: "Red Flag Checklist",
    description: "How to spot sketchy sources, evaluate quality, and avoid wasting money on questionable products.",
  },
];

export function WhatsIncluded() {
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            What you'll learn
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: "0 8px 30px rgba(139, 92, 246, 0.12)" 
                }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.4 }}
                className="glass-card-subtle p-6 cursor-pointer group"
              >
                <motion.div 
                  className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Icon className="w-5 h-5 text-primary transition-transform group-hover:scale-110" />
                </motion.div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
