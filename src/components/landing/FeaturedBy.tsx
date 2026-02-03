import { motion } from "framer-motion";

const RESEARCH_SOURCES = [
  { name: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/" },
  { name: "FDA.gov", url: "https://www.fda.gov/" },
  { name: "ClinicalTrials.gov", url: "https://clinicaltrials.gov/" },
  { name: "WADA", url: "https://www.wada-ama.org/" },
];

export function FeaturedBy() {
  return (
    <section className="py-10 border-y border-border/50 bg-muted/30">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-6">
            Research sourced from
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 md:gap-x-12">
            {RESEARCH_SOURCES.map((source, index) => (
              <motion.a
                key={source.name}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="text-sm font-medium text-muted-foreground/80 hover:text-primary transition-colors duration-200 hover:underline underline-offset-4"
              >
                {source.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
