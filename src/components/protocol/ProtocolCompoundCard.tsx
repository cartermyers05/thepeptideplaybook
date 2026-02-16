import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Brain, AlertTriangle, Thermometer } from "lucide-react";
import { cn } from "@/lib/utils";
import { Compound } from "@/hooks/useUserProtocol";

function normalizeCategoryLabel(raw?: string): { label: string; color: string } {
  if (!raw) return { label: "General", color: "#9CA3AF" };
  const t = raw.toLowerCase();
  if (t.includes("weight") || t.includes("fat") || t.includes("metabolic")) return { label: "Weight Loss", color: "#F97316" };
  if (t.includes("skin") || t.includes("acne") || t.includes("collagen") || t.includes("aesthetic")) return { label: "Skin", color: "#FB7185" };
  if (t.includes("recovery") || t.includes("healing") || t.includes("injury") || t.includes("tendon")) return { label: "Recovery", color: "#A78BFA" };
  if (t.includes("muscle") || t.includes("performance") || t.includes("growth hormone") || t.includes("gh")) return { label: "Performance", color: "#22C55E" };
  if (t.includes("longevity") || t.includes("aging") || t.includes("anti-aging")) return { label: "Longevity", color: "#3B82F6" };
  if (t.includes("cognitive") || t.includes("brain")) return { label: "Cognitive", color: "#06B6D4" };
  return { label: "General", color: "#9CA3AF" };
}

interface Props {
  compound: Compound;
  index: number;
}

export function ProtocolCompoundCard({ compound, index }: Props) {
  const { label, color } = normalizeCategoryLabel(compound.category || compound.description);
  const hasDetails = compound.mechanism || compound.side_effects || compound.storage;
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.08, duration: 0.4 }}
      className="rounded-2xl p-4 relative overflow-hidden"
      style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8EAED", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
    >
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ backgroundColor: color }} />

      <div className="pl-3">
        {/* Header: name + badge */}
        <div className="flex items-center gap-2 mb-1.5">
          <span className="font-semibold text-[15px]" style={{ color: "#0A0A0A", fontFamily: "Outfit, sans-serif" }}>
            {compound.name}
          </span>
          <span
            className="text-[11px] px-2 py-0.5 rounded-full font-medium"
            style={{ backgroundColor: `${color}12`, color, border: `1px solid ${color}20` }}
          >
            {label}
          </span>
        </div>

        {/* Description */}
        {compound.description && (
          <p className="text-sm mb-2" style={{ color: "#4B5563" }}>{compound.description}</p>
        )}

        {/* Dose / Frequency / Route */}
        <div className="space-y-0.5">
          <p className="text-sm font-bold" style={{ color: "#0A0A0A" }}>{compound.dose}</p>
          <p className="text-xs" style={{ color: "#6B7280" }}>{compound.frequency}</p>
          <span className="inline-block text-[11px] px-2 py-0.5 rounded-full mt-1" style={{ backgroundColor: "#F3F4F6", color: "#6B7280" }}>
            {compound.route}
          </span>
        </div>

        {compound.timing && (
          <p className="text-xs mt-1" style={{ color: "#9CA3AF" }}>{compound.timing}</p>
        )}

        {compound.rationale && (
          <p className="text-sm mt-2 italic" style={{ color: "#6B7280" }}>
            <strong style={{ color: "#0A0A0A", fontStyle: "normal" }}>Why chosen:</strong> {compound.rationale}
          </p>
        )}

        {/* Expandable details */}
        {hasDetails && (
          <>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-1 mt-3 text-xs font-medium transition-colors"
              style={{ color: "#9CA3AF" }}
            >
              {showDetails ? "Hide details" : "More details"}
              <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", showDetails && "rotate-180")} />
            </button>

            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 space-y-2"
              >
                {compound.mechanism && (
                  <div className="p-3 rounded-lg" style={{ backgroundColor: "rgba(59,130,246,0.05)", borderLeft: "3px solid #3B82F6" }}>
                    <p className="text-xs font-semibold mb-1 flex items-center gap-1.5" style={{ color: "#3B82F6" }}>
                      <Brain className="w-3.5 h-3.5" /> How it works
                    </p>
                    <p className="text-sm" style={{ color: "#4B5563" }}>{compound.mechanism}</p>
                  </div>
                )}
                {compound.side_effects && (
                  <div className="p-3 rounded-lg" style={{ backgroundColor: "rgba(245,158,11,0.05)", borderLeft: "3px solid #F59E0B" }}>
                    <p className="text-xs font-semibold mb-1 flex items-center gap-1.5" style={{ color: "#D97706" }}>
                      <AlertTriangle className="w-3.5 h-3.5" /> Side effects
                    </p>
                    <p className="text-sm" style={{ color: "#4B5563" }}>{compound.side_effects}</p>
                  </div>
                )}
                {compound.storage && (
                  <div className="p-3 rounded-lg" style={{ backgroundColor: "rgba(34,197,94,0.05)", borderLeft: "3px solid #22C55E" }}>
                    <p className="text-xs font-semibold mb-1 flex items-center gap-1.5" style={{ color: "#16A34A" }}>
                      <Thermometer className="w-3.5 h-3.5" /> Storage & handling
                    </p>
                    <p className="text-sm" style={{ color: "#4B5563" }}>{compound.storage}</p>
                  </div>
                )}
              </motion.div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
