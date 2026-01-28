import { motion } from "framer-motion";
import { AlertTriangle, ShieldAlert, HelpCircle, Stethoscope } from "lucide-react";

const problems = [
  {
    icon: AlertTriangle,
    title: "Conflicting Dosing Advice",
    description: "One influencer says this, another says that. Impossible to know what's accurate or dangerous.",
  },
  {
    icon: ShieldAlert,
    title: "Sketchy Sources",
    description: "Anonymous forum posts and unverified claims. No way to tell what's real science vs. bro-science.",
  },
  {
    icon: HelpCircle,
    title: "Legal Confusion",
    description: "No idea what's FDA-approved, what's research-only, or what's completely unregulated.",
  },
  {
    icon: Stethoscope,
    title: "Doctor Conversations",
    description: "You want to ask your doctor but don't know what questions to ask or how to start.",
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
            You've Seen Peptides on{" "}
            <span className="text-destructive">TikTok</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            But the information is confusing, contradictory, and sometimes dangerous. 
            You're not alone in feeling overwhelmed.
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
              className="group glass-card p-6 hover-lift"
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
