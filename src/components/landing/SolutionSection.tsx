import { motion } from "framer-motion";
import { BookOpen, Scale, Stethoscope, AlertTriangle, Bot, FileCheck } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Complete Peptide Breakdown",
    description: "What each peptide does, research status, and evidence quality for every compound.",
  },
  {
    icon: Scale,
    title: "FDA & Legal Guide",
    description: "Clear classification: FDA-approved, research-only, or unregulated. No guessing.",
  },
  {
    icon: Stethoscope,
    title: "Doctor Conversation Guide",
    description: "Exactly what questions to ask your healthcare provider and how to frame them.",
  },
  {
    icon: AlertTriangle,
    title: "Red Flags to Avoid",
    description: "Warning signs for sketchy sources, dangerous claims, and misleading marketing.",
  },
  {
    icon: FileCheck,
    title: "Research Summaries",
    description: "Plain-English explanations of what studies actually show vs. what influencers claim.",
  },
  {
    icon: Bot,
    title: "AI Research Assistant",
    description: "Bonus: Ask questions and get research-backed answers (educational only, with disclaimers).",
  },
];

export function SolutionSection() {
  return (
    <section id="demo" className="py-20 md:py-28">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Peptide Playbook Gives You{" "}
            <span className="text-gradient">Clarity</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to understand peptides, make informed decisions, 
            and have productive conversations with healthcare providers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="glass-card p-6 hover-lift"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Educational disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto bg-secondary/50 rounded-lg px-6 py-4">
            ⚠️ <span className="font-medium">Important:</span> Peptide Playbook is an educational resource only. 
            It does not provide medical advice, dosing recommendations, or treatment guidance. 
            Always consult a licensed healthcare provider.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
