import { motion } from "framer-motion";
import { Check, Shield, Lock, CreditCard } from "lucide-react";
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
    <section id="pricing" className="py-20 md:py-28">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Your <span className="text-primary">Research Journey</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Try PeptideGPT risk-free. Full access for just $1 for your first week.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          <div className="card-clean overflow-hidden">
            {/* Popular badge */}
            <div className="bg-primary text-primary-foreground text-center py-2.5 text-sm font-medium">
              Most Popular Choice
            </div>

            <div className="p-6">
              {/* Pricing */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-xl text-muted-foreground line-through">$49</span>
                  <span className="text-4xl font-bold">$20</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Start with a <span className="font-medium text-primary">$1 trial for 7 days</span>
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
              <Button asChild size="lg" className="w-full h-11 text-base">
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
