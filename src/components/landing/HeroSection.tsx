import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Clock } from "lucide-react";

const trustItems = [
  { icon: Shield, text: "30-Day Money-Back Guarantee" },
  { icon: Zap, text: "Instant Access" },
  { icon: Clock, text: "No Subscription" },
];

export function HeroSection() {
  return (
    <section className="pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-xs font-medium text-muted-foreground bg-secondary px-3 py-1.5 rounded-full mb-6">
              Updated January 2026
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] mb-6"
          >
            Everything You Need to Know About Peptides
            <span className="block text-primary mt-2">— Without the TikTok BS</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            An 80-page research guide, interactive database, and AI assistant that explains 
            what the science actually says — so you can have real conversations with your 
            doctor instead of guessing.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button asChild size="lg" className="btn-primary-clean h-12 px-8 text-base">
              <a href="#pricing">Get Full Access — $67</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
              <a href="#product">See What's Inside</a>
            </Button>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 md:gap-10"
          >
            {trustItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <item.icon className="w-4 h-4 text-primary" />
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
