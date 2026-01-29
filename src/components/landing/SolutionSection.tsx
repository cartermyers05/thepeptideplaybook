import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function SolutionSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-10">
            What If You Actually Understood Peptides?
          </h2>

          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed text-left md:text-center mb-10">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Imagine knowing exactly what the research says about BPC-157, semaglutide, 
              or any peptide you're curious about — not what some guy on Reddit thinks, 
              but what the actual studies show.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Imagine walking into your doctor's office with specific questions instead 
              of vague curiosity. Imagine knowing exactly what red flags to look for 
              before you buy anything.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-foreground font-medium"
            >
              That's what Peptide Playbook gives you.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              It's not medical advice. It's not telling you what to take. It's giving you 
              the education you need to stop guessing and start understanding — so you 
              can make informed decisions with your healthcare provider.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button asChild size="lg" className="btn-primary-clean h-12 px-8 text-base">
              <a href="#pricing">Get Full Access — $67</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
