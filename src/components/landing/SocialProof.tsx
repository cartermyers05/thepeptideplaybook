import { motion } from "framer-motion";

export function SocialProof() {
  return (
    <section id="about" className="py-24 md:py-32 bg-[#FAFBFC]">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8">
            Why this exists
          </h2>
          
          <div className="text-lg text-muted-foreground leading-relaxed space-y-6 text-left">
            <p>
              I spent months going down the peptide rabbit hole — TikTok videos, Reddit threads, 
              sketchy forums. The more I researched, the more I realized most advice was unreliable 
              at best, dangerous at worst.
            </p>
            
            <p>
              This guide is the resource I wish existed when I started. It's not medical advice. 
              It won't tell you what to take. But it will help you understand what's actually 
              going on — so you can make informed decisions with real professionals.
            </p>
          </div>
          
          <div className="mt-10 pt-10 border-t border-border">
            <p className="text-sm text-muted-foreground">
              200+ hours of research • 100+ sources reviewed
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
