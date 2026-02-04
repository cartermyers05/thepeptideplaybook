import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { PillButton } from "./PillButton";

const features = [
  "Personalized protocol for your goals",
  "Step-by-step reconstitution guide",
  "Complete injection walkthrough",
  "Daily guidance through your cycle",
  "24/7 AI coach access",
  "Progress tracking",
  "Lifetime access",
];

export function PricingCTA() {
  return (
    <section id="pricing" className="py-32 md:py-40 bg-secondary/50">
      <div className="container px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              One Price.
              <br />
              <span className="text-primary">Everything</span>
              <br />
              Included.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              No hidden fees. No monthly subscriptions. Pay once, get lifetime access 
              to your personalized peptide course.
            </p>
          </motion.div>

          {/* Right - Pricing card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-card border border-border rounded-3xl p-8 md:p-12 relative overflow-hidden">
              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl md:text-7xl font-bold">$99</span>
                  <span className="text-muted-foreground text-lg">one-time</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  30-day money-back guarantee
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
                  Start My Course
                </PillButton>
              </Link>
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
          <a href="mailto:support@peptideplaybook.com" className="text-primary hover:underline">
            support@peptideplaybook.com
          </a>
        </motion.p>
      </div>
    </section>
  );
}
