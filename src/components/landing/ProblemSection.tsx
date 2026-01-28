import { motion } from "framer-motion";
import { AlertTriangle, Skull, DollarSign, Stethoscope, type LucideIcon } from "lucide-react";

interface Problem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const problems: Problem[] = [
  {
    icon: AlertTriangle,
    title: "Blind Trust in Beginners",
    description: "Dosing advice from people who've been using peptides for 3 weeks",
  },
  {
    icon: Skull,
    title: "Legal Blindspots",
    description: "Zero mention of what's FDA-approved vs. what could land you in legal trouble",
  },
  {
    icon: DollarSign,
    title: "Money Down the Drain",
    description: "Wasted hundreds on 'research chemicals' with no quality guarantees",
  },
  {
    icon: Stethoscope,
    title: "Doctor Disconnection",
    description: "No idea what to tell your doctor — or if you even should",
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
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            TikTok Peptide Advice is a{" "}
            <span className="text-destructive">Disaster Waiting to Happen</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Right now, thousands of people are injecting compounds they found from random TikTok creators. 
            No credentials. No research. No idea what's legal.
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
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{problem.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {problem.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <p className="text-lg font-semibold text-destructive">
            One wrong decision could cost you your health, your money, or worse.
          </p>
          <p className="text-muted-foreground">
            There's a smarter way to navigate this.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
