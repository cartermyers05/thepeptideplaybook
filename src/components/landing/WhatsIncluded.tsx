import { motion } from "framer-motion";
import { BookOpen, Scale, Stethoscope, Bot } from "lucide-react";

const inclusions = [
  {
    icon: BookOpen,
    title: "Complete Peptide Breakdown",
    points: [
      "What each popular peptide does",
      "Current research status (animal vs human studies)",
      "Regulatory classification",
    ],
  },
  {
    icon: Scale,
    title: "FDA & Legal Guide",
    points: [
      "What's approved vs research-only",
      "Why 'research chemical' labels don't protect you",
      "State-by-state considerations",
    ],
  },
  {
    icon: Stethoscope,
    title: "Doctor Conversation Guide",
    points: [
      "Exactly what questions to ask",
      "How to bring up peptides professionally",
      "Red flags to watch for",
    ],
  },
  {
    icon: Bot,
    title: "AI Assistant Access",
    points: [
      "Get answers to your peptide questions 24/7",
      "Educational information at your fingertips",
      "Note: Educational only, not medical advice",
    ],
  },
];

export function WhatsIncluded() {
  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What's Inside the <span className="text-gradient">Playbook</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four comprehensive sections to give you complete peptide clarity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {inclusions.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="glass-card p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <ul className="space-y-2">
                    {item.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-0.5">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
