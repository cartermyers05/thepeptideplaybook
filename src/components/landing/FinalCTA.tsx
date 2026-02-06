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
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            You've Already Spent Hours Researching Peptides.
            <br />
            <span className="text-muted-foreground">Let's Make It Count.</span>
          </h2>
          
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Get instant access to research-backed protocols, an AI that actually knows peptides, and the confidence to make informed decisions.
          </p>

          <Link to="/quiz">
            <PillButton 
              variant="dark" 
              size="lg" 
              className="h-14 px-10 text-lg"
              icon={<span>→</span>}
            >
              Get The Peptide Playbook — $67
            </PillButton>
          </Link>
          
          <p className="mt-6 text-sm text-muted-foreground">
            30-day money-back guarantee · Lifetime access · No subscription
          </p>
        </motion.div>
      </div>
    </section>
  );
}
