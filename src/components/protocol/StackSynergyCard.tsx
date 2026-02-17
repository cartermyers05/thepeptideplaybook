import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { getStackSynergyText } from "@/lib/compoundIntelligence";
import { Compound } from "@/hooks/useUserProtocol";

interface Props {
  compounds: Compound[];
}

export function StackSynergyCard({ compounds }: Props) {
  const names = compounds.map((c) => c.name);
  const text = getStackSynergyText(names);
  if (!text) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="rounded-2xl p-4 relative overflow-hidden bg-card border border-border mb-3"
      style={{ borderLeft: "3px solid #06D6A0" }}
    >
      <p
        className="text-sm font-semibold mb-2 flex items-center gap-2 text-foreground"
        style={{ fontFamily: "Outfit, sans-serif" }}
      >
        <Sparkles className="w-4 h-4" style={{ color: "#06D6A0" }} />
        Why This Stack Works
      </p>
      {text.split("\n\n").map((paragraph, i) => (
        <p key={i} className="text-[13px] leading-relaxed text-muted-foreground" style={{ marginTop: i > 0 ? 8 : 0 }}>
          {paragraph}
        </p>
      ))}
    </motion.div>
  );
}
