import { motion } from "framer-motion";
import { Clock, AlertTriangle, FileQuestion, CalendarX } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "Hours Wasted",
    description: "Endless scrolling through forums, Reddit threads, and outdated articles hunting for answers.",
  },
  {
    icon: AlertTriangle,
    title: "Conflicting Info",
    description: "Different sources say different things. Who do you trust when health is on the line?",
  },
  {
    icon: FileQuestion,
    title: "No Citations",
    description: "Bro science without sources. No way to verify claims or check the actual research.",
  },
  {
    icon: CalendarX,
    title: "Outdated Sources",
    description: "Studies from years ago. New research published constantly but hard to find.",
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
  visible: { opacity: 1, y: 0 },
};

export function ProblemSection() {
  return (
    <section className="py-20 md:py-32 bg-secondary/30">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Peptide Research is{" "}
            <span className="text-destructive">Broken</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            You're not alone. Every peptide researcher faces these frustrations daily.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {problems.map((problem) => (
            <motion.div
              key={problem.title}
              variants={itemVariants}
              className="group relative bg-card rounded-xl p-6 border border-border hover:border-destructive/30 transition-colors shadow-soft"
            >
              <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4 group-hover:bg-destructive/20 transition-colors">
                <problem.icon className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{problem.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
