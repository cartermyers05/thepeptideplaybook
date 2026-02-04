import { motion } from "framer-motion";

export function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      className="flex items-center justify-center gap-4 py-8"
    >
      <span className="text-muted-foreground text-lg">+</span>
      <span className="text-muted-foreground text-lg">+</span>
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
        Scroll to Explore
      </span>
      <span className="text-muted-foreground text-lg">+</span>
      <span className="text-muted-foreground text-lg">+</span>
    </motion.div>
  );
}
