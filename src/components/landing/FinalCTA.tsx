import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PillButton } from "./PillButton";

export function FinalCTA() {
  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Guarantee section */}
          <div className="mb-12 p-8 bg-card border border-border rounded-2xl">
            <h3 className="text-xl font-semibold mb-4">Not sure yet? No risk.</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Try Peptide Playbook for 30 days. If it's not the clearest peptide resource you've ever used, 
              email us and we'll refund every penny. No questions asked.
            </p>
            <Link to="/quiz">
              <PillButton variant="dark" size="lg" icon={<span>→</span>}>
                Get Full Access — $67
              </PillButton>
            </Link>
          </div>

          {/* Final message */}
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Still have questions?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            That's exactly why we built this.
          </p>
          <Link to="/quiz">
            <PillButton size="lg" className="btn-primary-clean h-12 px-8 text-base group">
              Get Full Access — $67
              <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
            </PillButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
