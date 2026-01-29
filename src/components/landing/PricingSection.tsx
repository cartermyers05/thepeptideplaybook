import { motion } from "framer-motion";
import { Check, Shield, CreditCard, RefreshCcw, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCheckout } from "@/hooks/useCheckout";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

const features = [
  "The Complete 80+ Page Guide",
  "Interactive Peptide Database (41 peptides)",
  "AI Research Assistant (24/7)",
  "Doctor Conversation Scripts (5 templates)",
  "Source Evaluation Checklist",
  "Monthly Research Digest",
  "Lifetime Updates",
  "Email Support",
];

export function PricingSection() {
  const { startCheckout, isLoading } = useCheckout();
  const { user } = useAuth();

  const handleCheckout = () => {
    if (!user) {
      window.location.href = "/signup?redirect=/checkout";
      return;
    }
    startCheckout();
  };

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-4">
            SIMPLE PRICING
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">
            One Price. Full Access. No Upsells.
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Everything you need to understand peptides — the guide, database, AI assistant, scripts, and more.
          </p>
        </motion.div>

        {/* Single Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          <div className="rounded-2xl border-2 border-primary shadow-lg bg-white overflow-hidden">
            {/* Header */}
            <div className="bg-primary/5 p-6 text-center border-b border-primary/10">
              <p className="text-sm font-medium text-primary mb-2">Full Access</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold">$67</span>
                <span className="text-muted-foreground">one-time</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">No subscriptions. No hidden fees.</p>
            </div>

            {/* Features */}
            <div className="p-6">
              <p className="text-sm font-medium mb-4">Everything included:</p>
              <ul className="space-y-3 mb-6">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                onClick={handleCheckout}
                disabled={isLoading}
                size="lg"
                className="w-full btn-primary-clean h-12"
              >
                {isLoading ? "Loading..." : "Get Instant Access"}
              </Button>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <RefreshCcw className="w-3.5 h-3.5" />
                  30-day refund
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" />
                  Instant access
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Lifetime updates
                </div>
              </div>
            </div>
          </div>

          {/* Social proof */}
          <p className="text-center text-muted-foreground text-sm mt-6">
            Join 4,200+ members who stopped guessing about peptides
          </p>
        </motion.div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            <span>Stripe Payments</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCcw className="w-4 h-4" />
            <span>30-Day Refund</span>
          </div>
        </div>
      </div>
    </section>
  );
}
