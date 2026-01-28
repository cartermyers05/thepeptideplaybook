import { motion } from "framer-motion";
import { ArrowRight, Shield, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const included = [
  "Complete 15-peptide breakdown",
  "Legal reality check guide",
  "Doctor conversation scripts",
  "Red flag checklist",
  "AI assistant access",
  "Future updates included",
];

export function FinalCTA() {
  return (
    <section id="pricing" className="py-20 md:py-32 relative overflow-hidden">
      {/* Large gradient glow behind card */}
      <div className="gradient-glow gradient-glow-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      
      {/* Abstract blobs */}
      <div className="blob-bg absolute top-10 left-10 w-64 h-64 animate-orb-float opacity-20" />
      <div 
        className="blob-bg absolute bottom-10 right-10 w-80 h-80 animate-orb-float opacity-20" 
        style={{ animationDelay: '-4s' }} 
      />

      <div className="container px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto"
        >
          <div className="glass-card p-8 md:p-10 text-center">
            {/* Urgency reminder */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <span className="text-sm font-medium">🚀 Launch price ends soon</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Get Peptide Clarity in 20 Minutes
            </h2>
            <p className="text-muted-foreground mb-6">
              One-time payment • Instant access • Lifetime updates
            </p>
            
            {/* Price display with anchoring */}
            <div className="mb-8">
              <span className="text-2xl text-muted-foreground line-through mr-3">$197</span>
              <span className="text-5xl md:text-6xl font-bold">$47</span>
            </div>
            
            {/* Bullet recap */}
            <ul className="text-left space-y-3 mb-8 max-w-sm mx-auto">
              {included.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-success" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            
            <Button asChild size="lg" className="btn-primary-glow w-full h-14 text-lg mb-6">
              <Link to="/signup">
                Get Protected for $47
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            
            {/* Guarantee badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success mb-4">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">30-Day Money-Back Guarantee</span>
            </div>
            
            <p className="text-xs text-muted-foreground">
              Instant access. No subscription. Educational information only.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
