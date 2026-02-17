import { motion } from "framer-motion";
import { Check, Clock } from "lucide-react";
import type { Compound } from "@/hooks/useUserProtocol";

const mono = "'IBM Plex Mono', 'JetBrains Mono', ui-monospace, monospace";
const heading = "'Plus Jakarta Sans', sans-serif";

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
  return categoryColors[category || ""] || "#8A8A9A";
}

interface CompoundCardProps {
  compound: Compound;
  checked: boolean;
  allDone: boolean;
  onToggle: () => void;
}

export function CompoundCard({ compound, checked, onToggle }: CompoundCardProps) {
  const catColor = getCategoryColor(compound.category);

  return (
    <button
      onClick={onToggle}
      className="w-full rounded-[16px] flex items-stretch text-left transition-all duration-200 overflow-hidden group"
      style={{
        backgroundColor: "#111114",
        border: checked ? "1px solid rgba(52,211,153,0.15)" : "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Category accent bar */}
      <div
        className="w-[3px] flex-shrink-0 my-3 ml-0 rounded-r-full"
        style={{ backgroundColor: catColor }}
      />

      <div className="flex-1 py-4 pl-3.5 pr-4 flex items-center gap-4">
        <div className="flex-1 min-w-0" style={{ opacity: checked ? 0.4 : 1, transition: "opacity 200ms" }}>
          <p
            className="font-bold text-[15px]"
            style={{ color: "#EBEBF0", fontFamily: heading }}
          >
            {compound.name}
          </p>
          <p className="text-[13px] mt-0.5">
            <span style={{ color: catColor, fontFamily: mono, fontWeight: 600 }}>
              {compound.dose}
            </span>
            <span style={{ color: "#8A8A9A" }}> · {compound.route}</span>
          </p>
          <p className="flex items-center gap-1 text-xs mt-1" style={{ color: "#4A4A5A", fontFamily: mono }}>
            <Clock className="w-3 h-3" />
            {compound.timing}
          </p>
        </div>

        {/* Circular checkbox */}
        <motion.div
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            border: checked ? "none" : "2px solid rgba(255,255,255,0.12)",
            backgroundColor: checked ? "#34D399" : "transparent",
            boxShadow: checked ? "0 0 12px rgba(52,211,153,0.3)" : "none",
          }}
          animate={checked ? { scale: [1, 1.15, 1] } : { scale: 1 }}
          transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {checked && <Check className="w-3.5 h-3.5 text-white" />}
        </motion.div>
      </div>
    </button>
  );
}
