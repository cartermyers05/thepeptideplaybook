import { motion } from "framer-motion";
import { Check, Clock } from "lucide-react";
import type { Compound } from "@/hooks/useUserProtocol";

const jakarta = "'Plus Jakarta Sans', sans-serif";
const mono = "'IBM Plex Mono', 'JetBrains Mono', ui-monospace, monospace";

const categoryColors: Record<string, string> = {
  "weight-loss": "#FBBF24",
  fat_loss: "#34D399",
  recovery: "#60A5FA",
  healing: "#60A5FA",
  performance: "#F97316",
  gh: "#F97316",
  gh_secretagogue: "#F97316",
  skin: "#FB7185",
  longevity: "#60A5FA",
  cognitive: "#A78BFA",
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
      className="w-full rounded-[16px] flex items-stretch text-left transition-all duration-200 hover:-translate-y-px overflow-hidden"
      style={{
        backgroundColor: "#111114",
        border: checked
          ? "1px solid rgba(52,211,153,0.15)"
          : "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Category accent bar */}
      <div
        className="w-[3px] flex-shrink-0"
        style={{ backgroundColor: catColor, marginTop: 12, marginBottom: 12, borderRadius: "0 2px 2px 0" }}
      />

      <div className="flex-1 py-4 px-5 flex items-center gap-4">
        <div
          className="flex-1 min-w-0 transition-opacity duration-200"
          style={{ opacity: checked ? 0.4 : 1 }}
        >
          <p
            className="font-bold text-[15px]"
            style={{ fontFamily: jakarta, color: "#EBEBF0" }}
          >
            {compound.name}
          </p>
          <p className="text-[13px] mt-0.5">
            <span style={{ fontFamily: mono, fontWeight: 600, color: catColor }}>
              {compound.dose}
            </span>
            <span style={{ color: "#8A8A9A" }}> · {compound.route}</span>
          </p>
          <p className="flex items-center gap-1 text-xs mt-1" style={{ fontFamily: mono, color: "#4A4A5A" }}>
            <Clock className="w-3 h-3" />
            {compound.timing}
          </p>
        </div>

        {/* Circular checkbox */}
        <motion.div
          className="w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 cursor-pointer transition-colors duration-200"
          style={{
            borderColor: checked ? "#34D399" : "rgba(255,255,255,0.12)",
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
