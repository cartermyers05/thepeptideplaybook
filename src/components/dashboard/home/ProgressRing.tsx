import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { cn } from "@/lib/utils";

const mono = "'IBM Plex Mono', 'JetBrains Mono', ui-monospace, monospace";

interface ProgressRingProps {
  percent: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  progressColor?: string;
  animated?: boolean;
  showLabel?: boolean;
}

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
  const gradientId = useRef(`ring-grad-${Math.random().toString(36).slice(2, 8)}`).current;

  const motionPercent = useMotionValue(0);
  const strokeDashoffset = useTransform(
    motionPercent,
    (v) => circumference - (v / 100) * circumference
  );

  useEffect(() => {
    if (animated) {
      animate(motionPercent, percent, { duration: 1.2, ease: "easeOut" });
    } else {
      motionPercent.set(percent);
    }
  }, [percent, animated, motionPercent]);

  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
        style={{ filter: "drop-shadow(0 0 8px rgba(249,115,22,0.15))" }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
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
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset }}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex items-baseline">
            <span style={{ fontFamily: mono, fontWeight: 700, fontSize: size >= 100 ? 28 : 22, color: "#EBEBF0" }}>
              {Math.round(percent)}
            </span>
            <span style={{ fontFamily: mono, fontSize: 14, color: "#4A4A5A" }}>%</span>
          </div>
          <span
            style={{
              fontFamily: mono,
              fontSize: 10,
              color: "#4A4A5A",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            complete
          </span>
        </div>
      )}
    </div>
  );
}
