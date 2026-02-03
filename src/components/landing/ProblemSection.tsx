import { motion } from "framer-motion";
import { DollarSign, Users, UserX } from "lucide-react";

const problems = [
  {
    icon: DollarSign,
    title: "They charge $2,000 for information that's free online",
    description: "The same research is available to everyone. You just don't have time to read 500+ studies.",
  },
  {
    icon: Users,
    title: "They give everyone the same generic protocol",
    description: "Your goals, experience, and concerns are unique. Cookie-cutter plans don't work.",
  },
  {
    icon: UserX,
    title: "They teach you, then abandon you",
    description: "Watch 10 hours of videos alone, then figure it out yourself when you have questions at 2am.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const }
  },
};

export function ProblemSection() {
  return (
    <section id="problem" className="py-20 md:py-28 bg-secondary/30">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Peptide courses are a scam. Here's why.
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12"
        >
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-card border rounded-2xl p-6 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                <problem.icon className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="font-semibold mb-2">{problem.title}</h3>
              <p className="text-sm text-muted-foreground">{problem.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="text-lg text-foreground">
            You don't need another course. You need a guide that knows YOUR goals, walks you through every step, and answers your questions at 2am when you're nervous about your first injection.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
