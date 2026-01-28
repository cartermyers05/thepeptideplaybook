import { motion } from "framer-motion";

const problems = [
  {
    emoji: "🤯",
    title: "Conflicting Advice",
    description: "Conflicting dosing advice from random TikTok creators",
  },
  {
    emoji: "⚠️",
    title: "Legal Confusion",
    description: "No idea what's actually legal vs. what could get you in trouble",
  },
  {
    emoji: "💸",
    title: "Wasted Money",
    description: "Wasted money on sketchy sources with zero quality guarantees",
  },
  {
    emoji: "🏥",
    title: "Doctor Questions",
    description: "Don't know what questions to ask your doctor — or if you even can",
  },
];

export function ProblemSection() {
  return (
    <section className="py-20 md:py-28 bg-secondary/50">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Peptide Information is a <span className="text-destructive">Mess</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            You've seen peptides everywhere on TikTok. But the information is confusing, 
            contradictory, and sometimes dangerous.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="glass-card p-6"
            >
              <div className="text-4xl mb-4">{problem.emoji}</div>
              <h3 className="text-lg font-semibold mb-2">{problem.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-lg font-medium text-foreground"
        >
          You deserve clarity, not confusion.
        </motion.p>
      </div>
    </section>
  );
}
