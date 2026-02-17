import { motion } from "framer-motion";
import { Beaker, Dumbbell, Clock, Search } from "lucide-react";

const personas = [
  {
    icon: Beaker,
    title: "New to Peptides",
    description: "You've heard about BPC-157 or Semaglutide but don't know where to start.",
  },
  {
    icon: Search,
    title: "Deep in the Rabbit Hole",
    description: "You've spent hours on Reddit and YouTube and still don't feel confident.",
  },
  {
    icon: Dumbbell,
    title: "Athletes & Recovery-Focused",
    description: "You want to recover faster and perform better with science behind your decisions.",
  },
  {
    icon: Clock,
    title: "Anti-Aging & Longevity",
    description: "You're exploring peptides like Epithalon and GHK-Cu and want to separate hype from evidence.",
  },
];

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
            Built For People Who Want Real Answers
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {personas.map((persona, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.5, ease: "easeOut" }}
              className="group"
            >
              <div className="bg-card border border-border rounded-2xl p-6 h-full hover:border-muted-foreground/30 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0"
                    initial={{ rotate: 180, opacity: 0 }}
                    whileInView={{ rotate: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.12 + 0.2, type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <persona.icon className="w-6 h-6 text-primary" />
                  </motion.div>
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
        </div>
      </div>
    </section>
  );
}
