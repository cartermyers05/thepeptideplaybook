import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCheckout } from "@/hooks/useCheckout";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

const tiers = [
  {
    id: "starter",
    name: "Starter",
    price: 67,
    description: "Essential peptide education",
    features: [
      "Complete PDF Guide (80+ pages)",
      "Source Evaluation Checklist",
      "Doctor Conversation Scripts",
      "Lifetime updates to guide",
    ],
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 197,
    description: "Full research toolkit",
    features: [
      "Everything in Starter",
      "Interactive Peptide Database",
      "AI Research Assistant",
      "Monthly Research Digest (12 months)",
      "Email support",
    ],
    popular: true,
  },
  {
    id: "insider",
    name: "Insider",
    price: 497,
    description: "Complete access + community",
    features: [
      "Everything in Pro",
      "Private Community Access",
      "1:1 Strategy Call (30 min)",
      "Priority email support",
      "Early access to new features",
      "Lifetime digest access",
    ],
    popular: false,
  },
];

export function PricingSection() {
  const { startCheckout, isLoading } = useCheckout();
  const { user } = useAuth();

  const handleCheckout = (tierId: string) => {
    if (!user) {
      window.location.href = `/signup?redirect=/checkout/${tierId}`;
      return;
    }
    startCheckout(tierId as any);
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
            PRICING
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">
            Choose Your Level of Access
          </h2>
          <p className="text-muted-foreground">
            All plans include a 30-day money-back guarantee. No questions asked.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-xl border p-8 ${
                tier.popular
                  ? "border-primary border-2 scale-105 shadow-lg z-10 bg-white"
                  : "border-border bg-white"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" /> MOST POPULAR
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-sm uppercase tracking-wide text-muted-foreground mb-2">
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold">${tier.price}</span>
                  <span className="text-muted-foreground">one-time</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{tier.description}</p>
              </div>

              <div className="border-t border-border pt-6 mb-6">
                <ul className="space-y-3">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                onClick={() => handleCheckout(tier.id)}
                disabled={isLoading}
                className={`w-full ${
                  tier.popular
                    ? "btn-primary-clean"
                    : "bg-background border border-border text-foreground hover:bg-muted"
                }`}
              >
                Get {tier.name} Access
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-2">Prefer monthly access?</p>
          <Link to="/pricing" className="text-primary hover:underline">
            View subscription options →
          </Link>
        </div>
      </div>
    </section>
  );
}
