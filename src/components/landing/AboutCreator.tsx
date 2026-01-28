import { motion } from "framer-motion";

export function AboutCreator() {
  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Who Made <span className="text-gradient">This?</span>
            </h2>
            
            {/* Avatar placeholder */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-primary/60 mx-auto mb-6" />
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
              After spending months navigating confusing peptide information online, 
              I realized there was no single, trustworthy resource that explained 
              everything clearly. So I created one — backed by real research, 
              written for real people.
            </p>
            
            {/* Credibility markers */}
            <div className="flex flex-wrap justify-center gap-4">
              <div className="glass-card px-5 py-3">
                <span className="text-sm font-medium">100+ Research Papers Reviewed</span>
              </div>
              <div className="glass-card px-5 py-3">
                <span className="text-sm font-medium">1000s of Hours of Research</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
