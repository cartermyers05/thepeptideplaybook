import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressRingProps {
  percent: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  animated?: boolean;
  showLabel?: boolean;
}

const mono = "'JetBrains Mono', ui-monospace, monospace";

export function ProgressRing({
  percent,
  size = 100,
  strokeWidth = 6,
  className,
  animated = true,
  showLabel = true,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = useMotionValue(0);
  const strokeDashoffset = useTransform(progress, (v) => circumference - (v / 100) * circumference);
  const displayPercent = useTransform(progress, (v) => Math.round(v));

  useEffect(() => {
    if (animated) {
      animate(progress, percent, { duration: 1.2, ease: "easeOut" });
    } else {
      progress.set(percent);
    }
  }, [percent, animated, progress]);

  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
        style={{ filter: "drop-shadow(0 0 6px rgba(249,115,22,0.12))" }}
      >
        <defs>
          <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="50%" stopColor="#FB7185" />
            <stop offset="100%" stopColor="#A78BFA" />
          </linearGradient>
        </defs>
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(0 0% 92%)"
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#ring-gradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset }}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex items-baseline">
            <PercentDisplay displayPercent={displayPercent} size={size} />
            <span style={{ fontFamily: mono, fontSize: size > 90 ? 14 : 11, color: "#9CA3AF", marginLeft: 1 }}>%</span>
          </div>
          <span
            style={{
              fontFamily: mono,
              fontSize: 10,
              color: "#9CA3AF",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginTop: 2,
            }}
          >
            complete
          </span>
        </div>
      )}
    </div>
  );
}

/* Fix: separate component to properly subscribe to motion value */
function PercentDisplay({ displayPercent, size }: { displayPercent: any; size: number }) {
  useEffect(() => {
    // Force initial render
  }, []);

  return (
    <span
      ref={(el) => {
        if (!el) return;
        // Set initial value
        el.textContent = String(Math.round(displayPercent.get()));
        // Subscribe to changes
        const unsub = displayPercent.on("change", (v: number) => {
          el.textContent = String(v);
        });
        (el as any).__unsub = unsub;
      }}
      style={{ fontFamily: mono, fontWeight: 700, fontSize: size > 90 ? 28 : 22, color: "#0A0A0A" }}
    />
  );
}
