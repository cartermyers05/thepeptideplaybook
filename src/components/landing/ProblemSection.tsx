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

export function ProblemSection() {
  return (
    <section className="py-20 md:py-28 bg-secondary/50">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Peptide Research is{" "}
            <span className="text-destructive">Broken</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            You're not alone. Every peptide researcher faces these frustrations daily.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="group card-clean p-6 hover-lift"
            >
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                <problem.icon className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="text-base font-semibold mb-2">{problem.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
