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
            You've Already Been Researching.
            <br />
            <span className="text-muted-foreground">Let This Do the Heavy Lifting.</span>
          </h2>
          
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Research-backed answers. Personalized protocols. One payment. Lifetime access.
          </p>

          <Link to="/quiz">
            <PillButton 
              variant="dark" 
              size="lg" 
              className="h-14 px-10 text-lg"
              icon={<span>→</span>}
            >
              Get Your Full Blueprint — $67
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
