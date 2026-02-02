import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { text: "Unlimited AI conversations", highlight: true },
  { text: "AI trained on 41+ peptides", highlight: true },
  { text: "Interactive peptide database", highlight: false },
  { text: "Real-time research updates", highlight: false },
  { text: "Source evaluation checklist", highlight: false },
  { text: "Lifetime access + updates", highlight: false },
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
            AI-Powered Research
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Get Your AI Research Assistant
          </h2>
          <p className="text-lg text-muted-foreground">
            Ask anything about peptides. Get instant, research-backed answers.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-md mx-auto"
        >
          <div className="content-card p-8 border-primary/20">
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl font-bold text-gradient">$67</span>
                <span className="text-xl text-muted-foreground line-through">$197</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">One-time payment. Lifetime access.</p>
            </motion.div>

            <motion.ul 
              className="space-y-3 mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.06, delayChildren: 0.3 }}
            >
              {features.map((feature, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-center gap-3"
                  variants={featureVariants}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span className={feature.highlight ? "font-medium text-foreground" : "text-foreground"}>
                    {feature.text}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            <Link to="/signup" className="w-full relative z-10 block">
              <Button size="lg" className="w-full btn-primary-clean h-12 text-base group">
                Get Full Access
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <motion.p 
              className="text-center text-sm text-muted-foreground mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              30-day money-back guarantee. Start researching in 30 seconds.
            </motion.p>
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
