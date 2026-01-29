import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function BlogCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-12 p-8 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20"
    >
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-8 h-8 text-primary" />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-semibold mb-2">
            Want the complete breakdown of all peptides?
          </h3>
          <p className="text-muted-foreground mb-4 md:mb-0">
            Get the Peptide Playbook, the research-based guide covering BPC-157, semaglutide, TB-500, and more. Know what's FDA-approved, what's experimental, and what to ask your doctor.
          </p>
        </div>

        <Button asChild size="lg" className="btn-primary-clean flex-shrink-0">
          <Link to="/signup">
            Get the Peptide Playbook
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}
