import { motion } from "framer-motion";
import { AlertCircle, Scale, ShieldX, MessageCircleQuestion, type LucideIcon } from "lucide-react";

interface Problem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const problems: Problem[] = [
  {
    icon: AlertCircle,
    title: "Conflicting Information",
    description: "Different sources give contradictory information about peptide research",
  },
  {
    icon: Scale,
    title: "Legal Uncertainty",
    description: "Unclear what's FDA-approved versus research-only compounds",
  },
  {
    icon: ShieldX,
    title: "Quality Concerns",
    description: "Difficulty verifying the legitimacy of information sources",
  },
  {
    icon: MessageCircleQuestion,
    title: "Unanswered Questions",
    description: "Not knowing what questions to ask your healthcare provider",
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
            Finding reliable, well-organized peptide research information 
            shouldn't be this difficult.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="glass-card p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{problem.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {problem.description}
                </p>
              </motion.div>
            );
          })}
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
