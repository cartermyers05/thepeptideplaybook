import { motion } from "framer-motion";
import { Check, Clock } from "lucide-react";
import type { Compound } from "@/hooks/useUserProtocol";

const categoryColors: Record<string, string> = {
  "weight-loss": "#22C55E",
  fat_loss: "#22C55E",
  recovery: "#3B82F6",
  healing: "#3B82F6",
  performance: "#F97316",
  gh: "#F97316",
  skin: "#FB7185",
  longevity: "#3B82F6",
  cognitive: "#A78BFA",
};

function getCategoryColor(category?: string) {
  return categoryColors[category || ""] || "#9CA3AF";
}

interface CompoundCardProps {
  compound: Compound;
  checked: boolean;
  allDone: boolean;
  onToggle: () => void;
}

export function CompoundCard({ compound, checked, allDone, onToggle }: CompoundCardProps) {
  const catColor = getCategoryColor(compound.category);

  return (
    <button
      onClick={onToggle}
      className="w-full bg-white rounded-[14px] flex items-stretch text-left transition-all duration-200 hover:border-[#9CA3AF] overflow-hidden"
      style={{ border: "1px solid #E8EAED" }}
    >
      {/* Category Color Strip */}
      <div className="w-[3px] flex-shrink-0" style={{ backgroundColor: catColor }} />

      <div className="flex-1 py-4 px-5 flex items-center gap-4">
        <div className="flex-1 min-w-0">
          <p
            className="font-semibold text-base transition-opacity duration-200"
            style={{ color: "#0A0A0A", opacity: checked ? 0.5 : 1 }}
          >
            {compound.name}
          </p>
          <p className="text-sm mt-0.5">
            <span
              className="font-semibold"
              style={{ color: "#F97316", fontFamily: "JetBrains Mono, ui-monospace, monospace" }}
            >
              {compound.dose}
            </span>
            <span style={{ color: "#9CA3AF" }}> · {compound.route}</span>
          </p>
          <p className="flex items-center gap-1 text-xs mt-1" style={{ color: "#D1D5DB" }}>
            <Clock className="w-3 h-3" />
            {compound.timing}
          </p>
        </div>

        {/* Circular Checkbox */}
        <motion.div
          className="w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 cursor-pointer transition-colors duration-200"
          style={{
            borderColor: checked ? "#22C55E" : "#D1D5DB",
            backgroundColor: checked ? "#22C55E" : "transparent",
          }}
          animate={checked ? { scale: [1, 1.08, 1] } : { scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {checked && <Check className="w-3.5 h-3.5 text-white" />}
        </motion.div>
      </div>
    </button>
  );
}
