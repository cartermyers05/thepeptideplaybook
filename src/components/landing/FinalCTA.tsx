import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const included = [
  "Complete peptide guide",
  "Legal & FDA breakdown",
  "Doctor conversation scripts",
  "AI assistant access",
  "Lifetime updates",
];

export function FinalCTA() {
  return (
    <section id="pricing" className="py-24 md:py-32 bg-[#FAFBFC]">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <div className="glass-card-subtle p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">Peptide Playbook</h3>
            <p className="text-4xl font-semibold mb-1">$67</p>
            <p className="text-sm text-muted-foreground mb-8">One-time purchase</p>
            
            <ul className="text-left space-y-3 mb-8">
              {included.map((item) => (
                <li key={item} className="text-sm text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>
            
            <Button asChild size="lg" className="btn-primary-clean w-full h-12 text-base mb-4">
              <Link to="/signup">
                Get Instant Access
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            
            <p className="text-sm text-muted-foreground">
              30-day money-back guarantee
            </p>
          </div>
        </motion.div>

        {/* Final headline CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-center mt-16"
        >
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">
            Ready to cut through the noise?
          </h2>
          <Button asChild size="lg" className="btn-primary-clean h-12 px-8 text-base">
            <Link to="/signup">
              Get the Guide — $67
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Instant access • 30-day guarantee
          </p>
        </motion.div>
      </div>
    </section>
  );
}
