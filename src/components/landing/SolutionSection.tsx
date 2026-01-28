import { motion } from "framer-motion";
import { Check } from "lucide-react";

const benefits = [
  {
    title: "Research Status",
    description: "Know exactly what each peptide does and its current research status",
  },
  {
    title: "Legal Clarity",
    description: "Understand FDA regulations and what's actually legal",
  },
  {
    title: "Doctor Ready",
    description: "Get the questions to ask your doctor for an informed conversation",
  },
];

export function SolutionSection() {
  return (
    <section id="demo" className="py-20 md:py-28 relative overflow-hidden">
      {/* Subtle gradient glow */}
      <div className="gradient-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50" />

      <div className="container px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Peptide Playbook Gives You{" "}
            <span className="text-gradient">Clarity</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to understand peptides — organized, researched, 
            and written for real people.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="glass-card p-6 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {benefit.description}
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
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto bg-secondary/50 rounded-xl px-6 py-4">
            ⚠️ <span className="font-medium">Important:</span> Peptide Playbook is an educational resource only. 
            It does not provide medical advice, dosing recommendations, or treatment guidance. 
            Always consult a licensed healthcare provider.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
