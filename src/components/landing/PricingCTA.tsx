import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Shield, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { text: "Unlimited AI conversations", highlight: true },
  { text: "AI trained on 41+ peptides", highlight: true },
  { text: "Interactive peptide database", highlight: false },
  { text: "Real-time research updates", highlight: false },
  { text: "Source evaluation checklist", highlight: false },
  { text: "Lifetime access + updates", highlight: false },
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Research</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Get Your AI Research Assistant
          </h2>
          <p className="text-lg text-muted-foreground">
            Ask anything about peptides. Get instant, research-backed answers.
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
              <p className="text-sm text-muted-foreground mt-2">Lifetime access. No subscriptions.</p>
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
                    className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                      feature.highlight ? "bg-primary/20" : "bg-success/10"
                    }`}
                    whileHover={{ scale: 1.2 }}
                  >
                    {feature.highlight ? (
                      <Sparkles className="w-3 h-3 text-primary" />
                    ) : (
                      <Check className="w-3 h-3 text-success" />
                    )}
                  </motion.div>
                  <span className={`${feature.highlight ? "font-medium text-foreground" : "text-foreground"}`}>
                    {feature.text}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            <Link to="/signup" className="w-full relative z-10 block">
              <Button size="lg" className="w-full btn-primary-clean h-12 text-base">
                <Sparkles className="w-4 h-4 mr-2" />
                Get AI Access Now
              </Button>
            </Link>

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

            {/* Payment Method Icons */}
            <motion.div 
              className="flex items-center justify-center gap-3 mt-4 pt-4 border-t border-border/50"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <span className="text-xs text-muted-foreground">Secure payment via</span>
              <div className="flex items-center gap-2">
                <div className="bg-muted/50 rounded px-2 py-1 text-xs font-medium text-muted-foreground">Visa</div>
                <div className="bg-muted/50 rounded px-2 py-1 text-xs font-medium text-muted-foreground">Mastercard</div>
                <div className="bg-muted/50 rounded px-2 py-1 text-xs font-medium text-muted-foreground">Amex</div>
                <div className="bg-muted/50 rounded px-2 py-1 text-xs font-medium text-muted-foreground">Stripe</div>
              </div>
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
