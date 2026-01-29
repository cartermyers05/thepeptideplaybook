import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const tiers = [
  {
    name: "Starter",
    price: 67,
    description: "Guide + Scripts + Checklist",
    popular: false,
  },
  {
    name: "Pro",
    price: 197,
    description: "+ Database + AI + Digest",
    popular: true,
  },
  {
    name: "Insider",
    price: 497,
    description: "+ Community + 1:1 Call",
    popular: false,
  },
];

export function FinalCTA() {
  return (
    <section className="py-24 md:py-32 bg-[#FAFBFC]">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Ready to Finally Understand Peptides?
          </h2>
          <p className="text-muted-foreground mb-12 text-lg">
            Join 4,200+ members who stopped guessing and started learning.
          </p>

          {/* Tier summary cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-xl p-6 text-center ${
                  tier.popular
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "bg-white border border-border"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-white text-primary text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <Star className="w-3 h-3" /> MOST POPULAR
                    </span>
                  </div>
                )}
                <p className={`text-sm font-medium mb-1 ${tier.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {tier.name}
                </p>
                <p className="text-3xl font-bold mb-2">${tier.price}</p>
                <p className={`text-sm ${tier.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {tier.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button asChild size="lg" className="btn-primary-clean h-12 px-8">
              <Link to="/pricing">
                View Full Pricing
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8">
              <Link to="/free-guide">
                Get Free Guide First
              </Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            30-day money-back guarantee • Instant access • No questions asked
          </p>
        </motion.div>
      </div>
    </section>
  );
}
