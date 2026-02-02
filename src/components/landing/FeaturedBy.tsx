import { motion } from "framer-motion";

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
            Research trusted by health-conscious individuals
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {/* Placeholder logos - these would be real partner/press logos */}
            <div className="h-6 w-20 bg-muted-foreground/15 rounded" />
            <div className="h-6 w-28 bg-muted-foreground/15 rounded" />
            <div className="h-6 w-24 bg-muted-foreground/15 rounded" />
            <div className="h-6 w-20 bg-muted-foreground/15 rounded hidden md:block" />
          </div>
          
          <p className="text-xs text-muted-foreground mt-4 opacity-60">
            Press features coming soon
          </p>
        </motion.div>
      </div>
    </section>
  );
}
