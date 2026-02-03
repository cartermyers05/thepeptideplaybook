import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Ready to stop researching and start doing?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Your personalized peptide course is 5 questions away.
          </p>
          <Link to="/quiz">
            <Button size="lg" className="btn-primary-clean h-12 px-8 text-base group">
              Build My Course (Free)
              <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
