import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const features = [
  "Personalized protocol for your goals",
  "Step-by-step reconstitution guide",
  "Injection walkthrough",
  "Daily guidance through your cycle",
  "24/7 AI coach access",
  "Progress tracking",
  "Cancel anytime",
];

export function PricingCTA() {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-secondary/30">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            One price. Everything included.
          </h2>
        </motion.div>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <div className="bg-card border-2 border-primary/30 rounded-2xl p-8 relative shadow-xl">
            {/* Price */}
            <div className="text-center mb-6">
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="text-5xl font-bold">$29</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Or save 29% with annual ($249/year)
              </p>
            </div>

            {/* Features List */}
            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link to="/quiz" className="block">
              <Button size="lg" className="w-full btn-primary-clean h-12 text-base group">
                Start My Course
                <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
              </Button>
            </Link>

            <p className="text-xs text-muted-foreground text-center mt-4">
              30-day money-back guarantee. No questions asked.
            </p>
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
