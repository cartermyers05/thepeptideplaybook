import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Brain, AlertTriangle, Thermometer } from "lucide-react";
import { cn } from "@/lib/utils";
import { Compound } from "@/hooks/useUserProtocol";
import { getCompoundIntel, CompoundIntel } from "@/lib/compoundIntelligence";

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
  const intel = getCompoundIntel(compound.name);
  const hasLegacyDetails = compound.mechanism || compound.side_effects || compound.storage;
  const [showDetails, setShowDetails] = useState(false);
  const [showIntel, setShowIntel] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.08, duration: 0.4 }}
      className="rounded-2xl p-4 relative overflow-hidden bg-card border border-border hover:shadow-xl hover:border-muted-foreground/30 transition-all duration-300"
    >
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ backgroundColor: color }} />

      <div className="pl-3">
        {/* Header: name + badge */}
        <div className="flex items-center gap-2 mb-1.5">
          <span className="font-semibold text-[15px] text-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>
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
          <p className="text-sm mb-2 text-muted-foreground">{compound.description}</p>
        )}

        {/* Dose / Frequency / Route */}
        <div className="space-y-0.5">
          <p className="text-sm font-bold text-foreground">{compound.dose}</p>
          <p className="text-xs text-muted-foreground">{compound.frequency}</p>
          <span className="inline-block text-[11px] px-2 py-0.5 rounded-full mt-1 bg-secondary text-muted-foreground">
            {compound.route}
          </span>
        </div>

        {compound.timing && (
          <p className="text-xs mt-1 text-muted-foreground">{compound.timing}</p>
        )}

        {compound.rationale && (
          <p className="text-sm mt-2 italic text-muted-foreground">
            <strong className="text-foreground not-italic">Why chosen:</strong> {compound.rationale}
          </p>
        )}

        {/* ── Intelligence Map Expansion ── */}
        {intel && (
          <>
            <button
              onClick={() => setShowIntel(!showIntel)}
              className="w-full flex items-center gap-1.5 mt-3 py-2 text-xs font-medium transition-colors cursor-pointer"
              style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "#06D6A0" }}
            >
              {showIntel ? "Show less ▴" : "Learn more ▾"}
            </button>

            <AnimatePresence>
              {showIntel && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <IntelSection title="How It Works" text={intel.mechanism} />
                  <IntelDivider />
                  <IntelSection title="What to Expect (Timeline)" text={intel.timeline} />
                  <IntelDivider />
                  <IntelSection title="Diet Tips" text={intel.dietTips} />
                  <IntelDivider />
                  <IntelSection title="Exercise Tips" text={intel.exerciseTips} />
                  <IntelDivider />
                  <IntelSection title="Managing Side Effects" text={intel.sideEffects} />
                  <IntelDivider />
                  <IntelSection title="Storage & Handling" text={intel.storageNotes} />
                  <IntelDivider />
                  {/* Pro Tip Box */}
                  <div
                    className="mt-3 mb-1"
                    style={{
                      background: "rgba(6, 214, 160, 0.06)",
                      border: "1px solid rgba(6, 214, 160, 0.12)",
                      borderRadius: 10,
                      padding: 14,
                    }}
                  >
                    <p
                      className="mb-1.5"
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: 11,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        color: "#06D6A0",
                        letterSpacing: "0.08em",
                      }}
                    >
                      PRO TIP
                    </p>
                    <p className="text-[13px] leading-relaxed text-muted-foreground">{intel.proTip}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* ── Legacy Details Fallback (only if no intel match) ── */}
        {!intel && hasLegacyDetails && (
          <>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-1 mt-3 text-xs font-medium transition-colors text-muted-foreground hover:text-foreground"
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
                  <div className="p-3 rounded-lg bg-secondary/50 border-l-[3px]" style={{ borderLeftColor: "#3B82F6" }}>
                    <p className="text-xs font-semibold mb-1 flex items-center gap-1.5" style={{ color: "#3B82F6" }}>
                      <Brain className="w-3.5 h-3.5" /> How it works
                    </p>
                    <p className="text-sm text-muted-foreground">{compound.mechanism}</p>
                  </div>
                )}
                {compound.side_effects && (
                  <div className="p-3 rounded-lg bg-secondary/50 border-l-[3px]" style={{ borderLeftColor: "#F59E0B" }}>
                    <p className="text-xs font-semibold mb-1 flex items-center gap-1.5" style={{ color: "#D97706" }}>
                      <AlertTriangle className="w-3.5 h-3.5" /> Side effects
                    </p>
                    <p className="text-sm text-muted-foreground">{compound.side_effects}</p>
                  </div>
                )}
                {compound.storage && (
                  <div className="p-3 rounded-lg bg-secondary/50 border-l-[3px]" style={{ borderLeftColor: "#22C55E" }}>
                    <p className="text-xs font-semibold mb-1 flex items-center gap-1.5" style={{ color: "#16A34A" }}>
                      <Thermometer className="w-3.5 h-3.5" /> Storage & handling
                    </p>
                    <p className="text-sm text-muted-foreground">{compound.storage}</p>
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

function IntelSection({ title, text }: { title: string; text: string }) {
  return (
    <div className="mt-4">
      <h4 className="text-sm font-semibold mb-1.5 text-foreground" style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 600 }}>
        {title}
      </h4>
      <p className="text-[13px] leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}

function IntelDivider() {
  return <div className="my-3 border-t border-border" />;
}
