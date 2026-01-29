import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { SEOHead } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
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

const subscriptions = [
  {
    id: "monthly",
    name: "Monthly",
    price: 29,
    period: "month",
    features: ["Peptide Database", "AI Assistant", "Research Digest", "Community Access"],
  },
  {
    id: "annual",
    name: "Annual",
    price: 247,
    period: "year",
    savings: "Save $101/year",
    features: ["Peptide Database", "AI Assistant", "Research Digest", "Community Access"],
  },
];

export default function Pricing() {
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
    <>
      <SEOHead
        title="Pricing — Peptide Playbook"
        description="Choose your level of peptide education access. One-time purchase or subscription options available with 30-day money-back guarantee."
      />
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-24 pb-20">
          <div className="container px-4 max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-4">
                PRICING
              </p>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
                Choose Your Level of Access
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                All plans include a 30-day money-back guarantee. No questions asked.
              </p>
            </div>

            {/* One-time tiers */}
            <div className="grid md:grid-cols-3 gap-6 mb-20">
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`relative rounded-xl border p-8 ${
                    tier.popular
                      ? "border-primary border-2 scale-105 shadow-lg z-10"
                      : "border-border"
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
                </div>
              ))}
            </div>

            {/* Subscription options */}
            <div className="text-center mb-12">
              <h2 className="text-2xl font-semibold mb-2">Prefer Monthly Access?</h2>
              <p className="text-muted-foreground">
                Get database, AI assistant, digest, and community for one low price
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {subscriptions.map((sub) => (
                <div key={sub.id} className="rounded-xl border border-border p-6">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{sub.name}</h3>
                      {sub.savings && (
                        <span className="text-xs text-primary font-medium">{sub.savings}</span>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-bold">${sub.price}</span>
                      <span className="text-muted-foreground">/{sub.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {sub.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleCheckout(sub.id)}
                    disabled={isLoading}
                    variant="outline"
                    className="w-full"
                  >
                    Start {sub.name} Subscription
                  </Button>
                </div>
              ))}
            </div>

            {/* Guarantee */}
            <div className="text-center mt-16 p-8 bg-muted/50 rounded-xl max-w-2xl mx-auto">
              <h3 className="font-semibold mb-2">30-Day Money-Back Guarantee</h3>
              <p className="text-sm text-muted-foreground">
                Not satisfied? Email us within 30 days for a full refund. No questions asked.
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
