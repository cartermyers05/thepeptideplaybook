import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const features = [
  "Personalized peptide protocol",
  "Daily AI Coach guidance",
  "Step-by-step reconstitution guides",
  "Progress tracking & streaks",
  "24/7 AI chat support",
  "Research updates & alerts",
];

const plans = [
  {
    name: "Monthly",
    price: "$29",
    period: "/month",
    description: "Full access, cancel anytime",
    popular: false,
  },
  {
    name: "Annual",
    price: "$249",
    period: "/year",
    description: "2 months free ($20.75/mo)",
    popular: true,
  },
];

const featureVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" as const }
  },
};

export function PricingCTA() {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-secondary/30 relative section-gradient-top">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium text-primary tracking-wide uppercase mb-6">
            AI-Powered Coaching
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Start Your Guided Peptide Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get a personalized protocol and daily AI coaching to guide you every step of the way.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12"
        >
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`content-card p-6 relative ${
                plan.popular ? "border-primary/40 ring-2 ring-primary/20" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    Best Value
                  </span>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Features List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto mb-8"
        >
          <motion.ul 
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.06, delayChildren: 0.2 }}
          >
            {features.map((feature, index) => (
              <motion.li 
                key={index} 
                className="flex items-center gap-2"
                variants={featureVariants}
              >
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/quiz">
            <Button size="lg" className="btn-primary-clean h-12 px-8 text-base group">
              Get Your Free Protocol
              <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            Free protocol • No credit card required • Cancel anytime
          </p>
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
