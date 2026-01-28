import { motion } from "framer-motion";
import { Check, Shield, Lock, CreditCard, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  "Complete peptide breakdown (50+ peptides)",
  "FDA & legal classification guide",
  "Research status for every compound",
  "Questions to ask your doctor",
  "Red flags & warning signs",
  "Plain-English research summaries",
  "Bonus: AI research assistant access",
  "Lifetime access & free updates",
];

const trustBadges = [
  { icon: Shield, label: "SSL Secured" },
  { icon: Lock, label: "256-bit Encryption" },
  { icon: CreditCard, label: "Stripe Payments" },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-28">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get <span className="text-gradient">Instant Access</span> Today
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            One-time purchase. No subscription. Lifetime access to the complete guide.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          <div className="glass-card overflow-hidden">
            {/* Popular badge */}
            <div className="bg-primary text-primary-foreground text-center py-2.5 text-sm font-medium flex items-center justify-center gap-2">
              <BookOpen className="w-4 h-4" />
              Peptide Playbook
            </div>

            <div className="p-6">
              {/* Pricing */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-5xl font-bold">$67</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  One-time purchase • <span className="font-medium text-primary">Instant access</span>
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-2.5 mb-6">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <div className="w-4 h-4 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-success" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button asChild size="lg" className="w-full h-12 text-base glow-primary">
                <Link to="/signup">
                  Get the Playbook — $67
                </Link>
              </Button>

              {/* Money back guarantee */}
              <p className="text-center text-xs text-muted-foreground mt-4">
                30-day money-back guarantee • No subscription required
              </p>
            </div>

            {/* Trust badges */}
            <div className="border-t border-border px-6 py-3 bg-secondary/30">
              <div className="flex items-center justify-center gap-5">
                {trustBadges.map((badge) => (
                  <div key={badge.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <badge.icon className="w-3.5 h-3.5" />
                    <span>{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
