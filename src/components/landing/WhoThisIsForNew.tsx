import { motion } from "framer-motion";
import { Beaker, Dumbbell, Clock, Search } from "lucide-react";

const personas = [
  {
    icon: Beaker,
    title: "The Biohacker",
    description: "You've heard about BPC-157 and Semaglutide but don't know where to start. You want research, not Reddit threads.",
  },
  {
    icon: Dumbbell,
    title: "The Athlete",
    description: "You want to recover faster, build more muscle, and optimize performance, but safely and with real science behind it.",
  },
  {
    icon: Clock,
    title: "The Anti-Aging Explorer",
    description: "You're interested in longevity peptides like Epithalon and GHK-Cu but confused by conflicting information.",
  },
  {
    icon: Search,
    title: "The Overwhelmed Researcher",
    description: "You've spent 20+ hours reading forums, watching YouTube, and you still don't feel confident. This ends that.",
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
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function WhoThisIsForNew() {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Built For People Who Are Tired of Bad Peptide Info
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            If any of these sound like you, you're in the right place.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {personas.map((persona, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div className="bg-card border border-border rounded-2xl p-6 h-full hover:border-muted-foreground/30 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <persona.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{persona.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {persona.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
