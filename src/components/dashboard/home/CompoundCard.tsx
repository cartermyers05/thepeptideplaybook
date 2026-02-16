import { motion } from "framer-motion";
import { Check, Clock } from "lucide-react";
import type { Compound } from "@/hooks/useUserProtocol";

const categoryColors: Record<string, string> = {
  "weight-loss": "#10B981",
  "fat_loss": "#10B981",
  recovery: "#3B82F6",
  healing: "#3B82F6",
  performance: "#F97316",
  gh: "#F97316",
  skin: "#8B5CF6",
  longevity: "#3B82F6",
  cognitive: "#F59E0B",
};

function getCategoryColor(category?: string) {
  return categoryColors[category || ""] || "#6B7280";
}

function getCategoryLabel(category?: string) {
  const labels: Record<string, string> = {
    "weight-loss": "fat loss",
    fat_loss: "fat loss",
    recovery: "healing",
    healing: "healing",
    performance: "performance",
    gh: "growth",
    skin: "skin",
    longevity: "longevity",
    cognitive: "cognitive",
  };
  return labels[category || ""] || category || "";
}

interface CompoundCardProps {
  compound: Compound;
  checked: boolean;
  allDone: boolean;
  onToggle: () => void;
}

export function CompoundCard({ compound, checked, allDone, onToggle }: CompoundCardProps) {
  const catColor = getCategoryColor(compound.category);
  const catLabel = getCategoryLabel(compound.category);

  return (
    <button
      onClick={onToggle}
      className="w-full bg-white rounded-2xl flex items-stretch text-left transition-all duration-200 hover:shadow-md overflow-hidden"
      style={{
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        backgroundColor: allDone ? "rgba(16,185,129,0.03)" : "#FFFFFF",
      }}
    >
      {/* Category Color Strip */}
      <div className="w-1 flex-shrink-0 rounded-l-2xl" style={{ backgroundColor: catColor }} />

      <div className="flex-1 p-5 flex items-start gap-4">
        <div className="flex-1 min-w-0">
          {/* Name + Badge */}
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <p
              className="font-bold text-[17px] transition-all duration-200"
              style={{
                color: checked ? "#9CA3AF" : "#111827",
                textDecoration: checked ? "line-through" : "none",
              }}
            >
              {compound.name}
            </p>
            {catLabel && (
              <span
                className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold"
                style={{
                  color: catColor,
                  backgroundColor: `${catColor}15`,
                }}
              >
                {catLabel}
              </span>
            )}
          </div>

          {/* Dose + Route */}
          <p className="text-[15px] mb-0.5">
            <span className="font-bold" style={{ color: "#F97316" }}>{compound.dose}</span>
            <span style={{ color: "#6B7280" }}> · {compound.route}</span>
          </p>

          {/* Timing */}
          <p className="flex items-center gap-1 text-[13px]" style={{ color: "#9CA3AF" }}>
            <Clock className="w-3 h-3" />
            {compound.timing}
          </p>
        </div>

        {/* Circular Checkbox */}
        <motion.div
          className="w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 cursor-pointer transition-colors duration-200"
          style={{
            borderColor: checked ? "#10B981" : "#E5E7EB",
            backgroundColor: checked ? "#10B981" : "transparent",
          }}
          animate={checked ? { scale: [1, 1.15, 1] } : { scale: 1 }}
          transition={{ duration: 0.25 }}
        >
          {checked && <Check className="w-4 h-4 text-white" />}
        </motion.div>
      </div>
    </button>
  );
}
