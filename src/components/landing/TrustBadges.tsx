import { motion } from "framer-motion";
import { FlaskConical, Lock, RefreshCw, Smartphone } from "lucide-react";

const badges = [
  {
    icon: FlaskConical,
    text: "Based on peer-reviewed research",
  },
  {
    icon: Lock,
    text: "Secure checkout via Stripe",
  },
  {
    icon: RefreshCw,
    text: "30-day money-back guarantee",
  },
  {
    icon: Smartphone,
    text: "Access on any device",
  },
];

export function TrustBadges() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
      className="flex flex-wrap justify-center gap-4 md:gap-6 mt-8"
    >
      {badges.map((badge, index) => (
        <div
          key={index}
          className="flex items-center gap-2 text-xs text-muted-foreground"
        >
          <badge.icon className="w-3.5 h-3.5" />
          <span>{badge.text}</span>
        </div>
      ))}
    </motion.div>
  );
}
