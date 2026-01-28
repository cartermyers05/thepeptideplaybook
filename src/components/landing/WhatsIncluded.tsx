import { motion } from "framer-motion";
import { BookOpen, Scale, Stethoscope, ShieldAlert, Bot } from "lucide-react";

const inclusions = [
  {
    icon: BookOpen,
    title: "The Complete Peptide Breakdown",
    points: [
      "The 15 most popular peptides explained in plain English",
      "What each one does, current research status, and real risks",
      "Which ones have actual human studies vs. just Reddit hype",
    ],
  },
  {
    icon: Scale,
    title: "The Legal Reality Check",
    points: [
      "FDA-approved vs. 'research only' — what it actually means",
      "Why 'for research purposes' labels don't protect you",
      "What could happen if you get caught with the wrong stuff",
    ],
  },
  {
    icon: Stethoscope,
    title: "The Doctor Conversation Script",
    points: [
      "Exactly what to say (and not say) to your doctor",
      "How to bring up peptides without sounding like a TikTok bro",
      "Questions that get real answers, not dismissals",
    ],
  },
  {
    icon: ShieldAlert,
    title: "The Red Flag Checklist",
    points: [
      "How to spot sketchy sources before you waste money",
      "Quality indicators that actually matter",
      "When to walk away",
    ],
  },
  {
    icon: Bot,
    title: "AI Assistant Access (Bonus)",
    points: [
      "Get your peptide questions answered 24/7",
      "Educational info at your fingertips",
      "Note: Educational only, not medical advice",
    ],
  },
];

export function WhatsIncluded() {
  return (
    <section id="features" className="py-20 md:py-28 bg-secondary/30">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Here's Exactly What <span className="text-gradient">You Get</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Five comprehensive sections to give you complete peptide clarity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
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
                  <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
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

        {/* Value stack */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-lg">
            <span className="text-muted-foreground">Total value: </span>
            <span className="line-through text-muted-foreground">$197</span>
            <span className="mx-2">→</span>
            <span className="font-bold text-xl text-gradient">Yours today for $47</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
