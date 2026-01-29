import { motion } from "framer-motion";

const steps = [
  {
    step: "1",
    title: "Get Instant Access",
    description: "Complete your purchase and create your account. Takes 2 minutes.",
  },
  {
    step: "2",
    title: "Start With the Guide",
    description: "Read through the sections relevant to you. Use the database to look up specific peptides.",
  },
  {
    step: "3",
    title: "Talk to Your Doctor",
    description: "Use the scripts and your new knowledge to have real conversations about what's right for you.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Three Steps to Actually Understanding Peptides
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground text-xl font-semibold flex items-center justify-center mx-auto mb-5">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
