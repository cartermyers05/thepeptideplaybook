import { motion } from "framer-motion";

export function ProblemSection() {
  return (
    <section id="problem" className="py-20 md:py-28">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-10">
            You're Not Confused Because You're Stupid.{" "}
            <span className="block mt-2">You're Confused Because the Information Is a Mess.</span>
          </h2>

          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Let's be honest about what's happening:
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              TikTok is full of 23-year-olds who bought peptides once and now think 
              they're experts. Reddit threads contradict each other every three comments. 
              The "research" people cite is usually one rat study from 2007.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Meanwhile, the FDA just put half of the most popular peptides on the 
              Category 2 list. Your doctor either doesn't know what you're talking about 
              or dismisses you completely. And if you try to do your own research, you 
              end up with 47 browser tabs open and more confused than when you started.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-foreground font-medium text-center pt-4"
            >
              You don't need another influencer's opinion. You need actual information 
              you can trust.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
