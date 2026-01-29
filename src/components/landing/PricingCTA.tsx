import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  "80+ page research guide",
  "Interactive peptide database (41 peptides)",
  "AI research assistant",
  "Doctor conversation scripts",
  "Source evaluation checklist",
  "Monthly research digest",
  "Lifetime access + updates",
];

const featureVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" as const }
  },
};

export function PricingCTA() {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-secondary/30 relative section-gradient-top">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Get Complete Access
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to understand peptides — one price, lifetime access.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-md mx-auto"
        >
          <div className="glass-card p-8 shadow-glow glow-border">
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-5xl font-bold text-gradient">$67</span>
              <span className="text-muted-foreground ml-2">one-time</span>
            </motion.div>

            <motion.ul 
              className="space-y-4 mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.06, delayChildren: 0.3 }}
            >
              {features.map((feature, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-center gap-3"
                  variants={featureVariants}
                >
                  <motion.div 
                    className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0"
                    whileHover={{ scale: 1.2 }}
                  >
                    <Check className="w-3 h-3 text-success" />
                  </motion.div>
                  <span className="text-foreground">{feature}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button asChild size="lg" className="w-full btn-primary-clean h-12 text-base">
                <Link to="/signup">Get Full Access</Link>
              </Button>
            </motion.div>

            <motion.div 
              className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Shield className="w-4 h-4 text-success" />
              <span>30-day money-back guarantee. No questions asked.</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          Questions? Email{" "}
          <a href="mailto:support@peptideplaybook.com" className="text-primary hover:underline">
            support@peptideplaybook.com
          </a>
        </motion.p>
      </div>
    </section>
  );
}
