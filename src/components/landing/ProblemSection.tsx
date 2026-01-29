import { motion } from "framer-motion";

const paragraphs = [
  "TikTok \"experts\" promise miracle results. Reddit threads contradict each other. Telegram groups push sketchy sources. Your doctor either dismisses peptides entirely or knows less than you do.",
  "Meanwhile, you're left piecing together information from people who are either selling something, guessing, or both.",
  "The FDA keeps changing the rules. Compounding pharmacies keep getting shut down. And you have no idea what's actually safe, legal, or backed by real research.",
  "You don't need another guru. You need a clear, research-based foundation that separates what we actually know from what people are making up.",
];

export function ProblemSection() {
  return (
    <section id="problem" className="py-20 bg-white">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-4">
            THE PROBLEM
          </p>
          
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8">
            You're Not Confused Because You're Dumb. You're Confused Because Everyone's Lying to You.
          </h2>
          
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            {paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
