import { motion } from "framer-motion";
import { Check, Shield, Lock, CreditCard, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  "Unlimited peptide questions",
  "Research-backed answers with citations",
  "Dosing and protocol recommendations",
  "Safety warnings and contraindications",
  "Save and organize your research",
  "Priority response times",
  "New features as they launch",
  "Cancel anytime",
];

const trustBadges = [
  { icon: Shield, label: "SSL Secured" },
  { icon: Lock, label: "256-bit Encryption" },
  { icon: CreditCard, label: "Stripe Payments" },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-32">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Your <span className="text-gradient">Research Journey</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Try PeptideGPT risk-free. Full access for just $1 for your first week.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto"
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-primary rounded-3xl opacity-20 blur-xl" />
            <div className="relative bg-card rounded-2xl border border-border overflow-hidden shadow-elevated">
              {/* Popular badge */}
              <div className="bg-gradient-primary text-primary-foreground text-center py-2 text-sm font-medium">
                <Zap className="w-4 h-4 inline mr-1" />
                Most Popular Choice
              </div>

              <div className="p-8">
                {/* Pricing */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-2xl text-muted-foreground line-through">$49</span>
                    <span className="text-5xl font-bold">$20</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Start with a <span className="font-semibold text-primary">$1 trial for 7 days</span>
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-success" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button asChild size="lg" className="w-full h-12 text-base glow-primary">
                  <Link to="/signup">
                    Start 7-Day Trial for $1
                  </Link>
                </Button>

                {/* Money back guarantee */}
                <p className="text-center text-xs text-muted-foreground mt-4">
                  30-day money-back guarantee • Cancel anytime
                </p>
              </div>

              {/* Trust badges */}
              <div className="border-t border-border px-8 py-4 bg-secondary/30">
                <div className="flex items-center justify-center gap-6">
                  {trustBadges.map((badge) => (
                    <div key={badge.label} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <badge.icon className="w-4 h-4" />
                      <span>{badge.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
