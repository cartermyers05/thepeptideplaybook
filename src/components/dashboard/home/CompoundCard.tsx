import { motion } from "framer-motion";
import { Check, Clock } from "lucide-react";
import type { Compound } from "@/hooks/useUserProtocol";

const mono = "'JetBrains Mono', ui-monospace, monospace";
const heading = "'Outfit', sans-serif";

const compoundVariants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.4, delay: i * 0.06 },
  }),
};
const categoryColors: Record<string, string> = {
  "weight-loss": "#34D399",
  fat_loss: "#34D399",
  recovery: "#60A5FA",
  healing: "#60A5FA",
  performance: "#F97316",
  gh: "#F97316",
  gh_secretagogue: "#F97316",
  skin: "#FB7185",
  longevity: "#60A5FA",
  cognitive: "#A78BFA",
  weight_loss: "#FBBF24",
};

function getCategoryColor(category?: string) {
  return categoryColors[category || ""] || "#9CA3AF";
}

interface CompoundCardProps {
  compound: Compound;
  checked: boolean;
  allDone: boolean;
  onToggle: () => void;
  index?: number;
}

export function CompoundCard({ compound, checked, onToggle, index = 0 }: CompoundCardProps) {
  const catColor = getCategoryColor(compound.category);

  return (
    <motion.button
      variants={compoundVariants}
      custom={index}
      initial="hidden"
      animate="visible"
      onClick={onToggle}
      whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="w-full rounded-[16px] flex items-stretch text-left transition-all duration-200 overflow-hidden group bg-white border border-border"
    >
      {/* Category accent bar */}
      <div
        className="w-[3px] flex-shrink-0 my-3 ml-0 rounded-r-full transition-all duration-300"
        style={{
          backgroundColor: catColor,
          boxShadow: checked ? "none" : `0 0 8px ${catColor}40`,
        }}
      />

      <div className="flex-1 py-4 pl-3.5 pr-4 flex items-center gap-4">
        <div className="flex-1 min-w-0" style={{ opacity: checked ? 0.45 : 1, transition: "opacity 200ms" }}>
          <p className="font-bold text-[15px] text-foreground" style={{ fontFamily: heading }}>
            {compound.name}
          </p>
          <p className="text-[13px] mt-0.5">
            <span style={{ color: catColor, fontFamily: mono, fontWeight: 600 }}>
              {compound.dose}
            </span>
            <span className="text-muted-foreground"> · {compound.route}</span>
          </p>
          {compound.rationale && (
            <p className="text-[12px] mt-1 text-muted-foreground leading-snug line-clamp-1">
              {compound.rationale}
            </p>
          )}
          <p className="flex items-center gap-1 text-xs mt-1 text-muted-foreground" style={{ fontFamily: mono }}>
            <Clock className="w-3 h-3" />
            {compound.timing}
          </p>
        </div>

        {/* Circular checkbox */}
        <motion.div
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            border: checked ? "none" : "2px solid hsl(0 0% 85%)",
            backgroundColor: checked ? "#34D399" : "transparent",
            boxShadow: checked ? "0 0 12px rgba(52,211,153,0.3)" : "none",
          }}
          animate={checked ? { scale: [1, 1.15, 1] } : { scale: 1 }}
          transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {checked && <Check className="w-3.5 h-3.5 text-white" />}
        </motion.div>
      </div>
    </motion.button>
  );
}
