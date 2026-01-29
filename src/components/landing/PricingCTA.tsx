import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  "80+ page research guide",
  "Interactive peptide database (41 peptides)",
  "AI research assistant",
  "Doctor conversation scripts",
  "Source evaluation checklist",
  "Monthly research digest",
  "Lifetime access + updates",
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
            Get Complete Access
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to understand peptides — one price, lifetime access.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          <div className="bg-card border border-border rounded-2xl p-8 shadow-elevated">
            <div className="text-center mb-8">
              <span className="text-5xl font-bold">$67</span>
              <span className="text-muted-foreground ml-2">one-time</span>
            </div>

            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-success" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button asChild size="lg" className="w-full btn-primary-clean h-12 text-base">
              <Link to="/signup">Get Full Access</Link>
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-4">
              30-day money-back guarantee. No questions asked.
            </p>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
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
