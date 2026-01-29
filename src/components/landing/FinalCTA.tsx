import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCheckout } from "@/hooks/useCheckout";
import { useAuth } from "@/hooks/useAuth";

export function FinalCTA() {
  const { startCheckout, isLoading } = useCheckout();
  const { user } = useAuth();

  const handleCheckout = () => {
    if (!user) {
      window.location.href = "/signup?redirect=/checkout";
      return;
    }
    startCheckout();
  };

  return (
    <section className="py-24 md:py-32 bg-[#FAFBFC]">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Ready to Actually Understand Peptides?
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Get the complete guide, database, AI assistant, and everything else — all for one price.
          </p>

          {/* Price display */}
          <div className="inline-flex items-baseline gap-1 mb-8">
            <span className="text-5xl font-bold">$67</span>
            <span className="text-muted-foreground">one-time</span>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-4">
            <Button 
              onClick={handleCheckout}
              disabled={isLoading}
              size="lg" 
              className="btn-primary-clean h-12 px-8"
            >
              {isLoading ? "Loading..." : "Get Full Access — $67"}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>

            <p className="text-sm text-muted-foreground">
              One-time payment • Lifetime access • 30-day money-back guarantee
            </p>
          </div>

          {/* Social proof */}
          <p className="text-muted-foreground mt-10">
            Join 4,200+ members who stopped guessing about peptides
          </p>
        </motion.div>
      </div>
    </section>
  );
}
