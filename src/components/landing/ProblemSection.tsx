import { motion } from "framer-motion";

export function ProblemSection() {
  return (
    <section className="py-24 md:py-32 bg-[#FAFBFC]">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8">
            The peptide space is confusing
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            TikTok creators with no credentials are telling millions of people what to inject. 
            Dosing advice is inconsistent. Legal status is unclear. And most people have no idea 
            what questions to ask their doctor — or if they even should.
          </p>
          
          <p className="text-lg font-medium">
            We built this guide to fix that.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
