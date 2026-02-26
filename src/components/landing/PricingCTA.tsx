import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, Lock, Shield, RefreshCw } from "lucide-react";
import { PillButton } from "./PillButton";
import { useRef, useEffect, useState } from "react";

const features = [
  "Personalized AI-built protocol",
  "24/7 AI research coach with dosing calculator",
  "Daily compound tracker with streaks",
  "Diet & training optimization",
  "Week-by-week timeline",
  "FDA regulatory tracker",
  "Lifetime access + all future updates",
];

const comparisons = [
  { item: "Clinic consultations", price: "$300-500" },
  { item: "Trial and error with wrong peptides", price: "$200-400" },
  { item: "Hours of Reddit rabbit holes", price: "Priceless (in a bad way)" },
  { item: "Peptide Playbook", price: "$67 once. Forever.", highlight: true },
];

function AnimatedPrice() {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = 67;
    const duration = 1200;
    const stepTime = duration / end;
    const timer = setInterval(() => {
      start++;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [isInView]);

  return <span ref={ref}>${count}</span>;
}

function GlowPulse() {
  return (
    <motion.div
      className="absolute inset-0 rounded-3xl"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.03, 1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.2) 0%, transparent 70%)",
        filter: "blur(50px)",
        zIndex: -1,
      }}
    />
  );
}

export function PricingCTA() {
  return (
    <section id="pricing" className="py-32 md:py-40 bg-secondary/50">
      <div className="container px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Heading + Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              One Payment.
              <br />
              Lifetime Access.
              <br />
              No Subscriptions.
            </h2>
            
            {/* Price comparison box */}
            <div className="bg-card border border-border rounded-2xl p-6 mt-8 overflow-hidden">
              <h3 className="font-semibold mb-4 text-foreground">What you'd spend figuring this out on your own:</h3>
              <ul className="space-y-3">
                {comparisons.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className={`flex justify-between items-center ${
                      item.highlight ? "text-primary font-semibold" : "text-muted-foreground"
                    }`}
                  >
                    <span>{item.item}</span>
                    <span className={item.highlight ? "text-primary" : ""}>{item.price}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right - Pricing card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <GlowPulse />
            
            <div className="bg-card border border-border rounded-3xl p-8 md:p-12 relative overflow-hidden">
              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl text-muted-foreground line-through">$99</span>
                  <span className="text-6xl md:text-7xl font-bold"><AnimatedPrice /></span>
                </div>
                <p className="mt-2 text-muted-foreground">
                  One-time payment. Lifetime access.
                </p>
                <p className="mt-1 text-xs text-primary font-medium">
                  Launch pricing — increases soon
                </p>
              </div>

              {/* Features with cascade pop */}
              <ul className="space-y-4 mb-10">
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.3 + index * 0.08,
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                  >
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA */}
              <Link to="/signup" className="block">
                <PillButton 
                  variant="dark" 
                  size="lg" 
                  className="w-full justify-center"
                  icon={<span>→</span>}
                >
                  Get Instant Access — $67
                </PillButton>
              </Link>
              
              <p className="mt-4 text-sm text-muted-foreground text-center">
                30-day money-back guarantee. No questions asked.
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap justify-center gap-4 mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-3.5 h-3.5" />
                  <span>30-day money-back guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Instant access</span>
                </div>
              </div>
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
          <a href="mailto:support@peptideplaybook.org" className="text-primary hover:underline">
            support@peptideplaybook.org
          </a>
        </motion.p>
      </div>
    </section>
  );
}
