import { motion } from "framer-motion";

const reasons = [
  "You've seen peptides on TikTok and want real answers",
  "Your doctor doesn't know much about peptides yet",
  "You want research, not someone selling you something",
  "You're researching for yourself or a family member",
];

export function WhoThisIsForNew() {
  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
            Peptide Playbook is for you if...
          </h2>
          
          <ul className="space-y-4 text-left max-w-md mx-auto">
            {reasons.map((reason, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <span className="text-primary mt-1">•</span>
                <span className="text-muted-foreground">{reason}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
