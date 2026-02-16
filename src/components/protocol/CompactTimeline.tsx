import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";

interface Props {
  expectations: { week: number; description: string }[];
  currentWeek: number;
}

export function CompactTimeline({ expectations, currentWeek }: Props) {
  const [expanded, setExpanded] = useState(false);

  const visible = expanded
    ? expectations
    : expectations.filter((item) => Math.abs(item.week - currentWeek) <= 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>
          Timeline
        </h3>
        {expectations.length > 3 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs flex items-center gap-1 font-medium transition-colors text-muted-foreground hover:text-foreground"
          >
            {expanded ? "Show less" : "Show all"}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>
      <div className="space-y-2.5">
        {visible.map((item) => {
          const isCurrent = item.week === currentWeek;
          const isPast = item.week < currentWeek;
          return (
            <div key={item.week} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono flex-shrink-0"
                  style={{
                    background: isCurrent
                      ? "linear-gradient(135deg, #F97316, #FB7185, #A78BFA)"
                      : isPast ? "#22C55E" : "transparent",
                    border: isCurrent ? "none" : `2px solid ${isPast ? "#22C55E" : "hsl(var(--border))"}`,
                    color: isCurrent || isPast ? "white" : "hsl(var(--muted-foreground))",
                  }}
                >
                  {isPast ? <Check className="w-3.5 h-3.5" /> : item.week}
                </div>
                <div className="w-0.5 flex-1 mt-1 bg-border" />
              </div>
              <p
                className={`text-sm pb-3 ${isCurrent ? "text-foreground font-semibold" : "text-muted-foreground"}`}
              >
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
