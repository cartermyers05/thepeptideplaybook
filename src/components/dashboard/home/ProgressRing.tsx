import { useEffect, useRef } from "react";
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

const mono = "'IBM Plex Mono', 'JetBrains Mono', ui-monospace, monospace";

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
  const textRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    if (animated) {
      animate(progress, percent, { duration: 1.2, ease: "easeOut" });
    } else {
      progress.set(percent);
    }
  }, [percent, animated, progress]);

  // Update text content reactively
  useEffect(() => {
    const unsubscribe = displayPercent.on("change", (v) => {
      if (textRef.current) textRef.current.textContent = String(v);
    });
    return unsubscribe;
  }, [displayPercent]);

  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
        style={{ filter: "drop-shadow(0 0 8px rgba(249,115,22,0.15))" }}
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
          stroke="#19191E"
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
            <svg width={0} height={0} className="absolute">
              <text ref={textRef} />
            </svg>
            <span
              ref={(el) => {
                if (el) {
                  const unsub = displayPercent.on("change", (v) => {
                    el.textContent = String(v);
                  });
                  // Store cleanup - will be called on unmount via effect
                  (el as any).__unsub = unsub;
                }
              }}
              style={{ fontFamily: mono, fontWeight: 700, fontSize: size > 90 ? 28 : 22, color: "#EBEBF0" }}
            />
            <span style={{ fontFamily: mono, fontSize: size > 90 ? 14 : 11, color: "#4A4A5A", marginLeft: 1 }}>%</span>
          </div>
          <span
            style={{
              fontFamily: mono,
              fontSize: 10,
              color: "#4A4A5A",
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
