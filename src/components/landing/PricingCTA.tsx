import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, Lock, Shield, RefreshCw } from "lucide-react";
import { PillButton } from "./PillButton";

const features = [
  "AI Research Coach with 500+ studies",
  "45+ peptide database with FDA status",
  "Personalized protocol builder",
  "Daily plan and progress tracking",
  "Doctor conversation scripts",
  "30+ research guides",
  "Lifetime access to all updates",
];

const comparisons = [
  { item: "Peptide clinic consultation", price: "$200-500" },
  { item: "Medical provider peptide program", price: "$499-3,000" },
  { item: "Hours of Reddit research", price: "Free but unreliable" },
  { item: "Peptide Playbook", price: "$67 for everything", highlight: true },
];

// Glow pulse component for the pricing card
function GlowPulse() {
  return (
    <motion.div
      className="absolute inset-0 rounded-3xl"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0.3, 0.5, 0.3],
        scale: [1, 1.02, 1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
        filter: "blur(40px)",
        zIndex: -1,
      }}
    />
  );
}

export function PricingCTA() {
  return (
    <section id="pricing" className="py-32 md:py-40 bg-secondary/50">
      <div className="container px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Heading + Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              One Payment.
              <br />
              Lifetime Access.
              <br />
              No Subscriptions.
            </h2>
            
            {/* Price comparison box */}
            <div className="bg-card border border-border rounded-2xl p-6 mt-8">
              <h3 className="font-semibold mb-4 text-foreground">What you'd pay elsewhere:</h3>
              <ul className="space-y-3">
                {comparisons.map((item, index) => (
                  <li 
                    key={index} 
                    className={`flex justify-between items-center ${
                      item.highlight ? "text-primary font-semibold" : "text-muted-foreground"
                    }`}
                  >
                    <span>{item.item}</span>
                    <span className={item.highlight ? "text-primary" : ""}>{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right - Pricing card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Glow effect behind the card */}
            <GlowPulse />
            
            <div className="bg-card border border-border rounded-3xl p-8 md:p-12 relative overflow-hidden">
              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl text-muted-foreground line-through">$99</span>
                  <span className="text-6xl md:text-7xl font-bold">$67</span>
                </div>
                <p className="mt-2 text-muted-foreground">
                  One-time payment. Lifetime access.
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-10">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link to="/quiz" className="block">
                <PillButton 
                  variant="dark" 
                  size="lg" 
                  className="w-full justify-center"
                  icon={<span>→</span>}
                >
                  Get Your Full Blueprint — $67
                </PillButton>
              </Link>
              
              <p className="mt-4 text-sm text-muted-foreground text-center">
                30-day money-back guarantee. No questions asked.
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap justify-center gap-4 mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Lock className="w-3.5 h-3.5" />
                  <span>256-bit SSL</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Powered by Stripe</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>30-day refund</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-muted-foreground mt-16"
        >
          Questions? Email{" "}
          <a href="mailto:support@peptideplaybook.org" className="text-primary hover:underline">
            support@peptideplaybook.org
          </a>
        </motion.p>
      </div>
    </section>
  );
}
