import { motion } from "framer-motion";

interface Props {
  percentage: number;
  currentWeek: number;
  totalWeeks: number;
}

export function ProtocolProgressRing({ percentage, currentWeek, totalWeeks }: Props) {
  const size = 140;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      className="relative shrink-0"
      style={{
        width: size,
        height: size,
        filter: "drop-shadow(0 4px 20px rgba(249,115,22,0.25))",
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="50%" stopColor="#FB7185" />
            <stop offset="100%" stopColor="#A78BFA" />
          </linearGradient>
          <linearGradient id="ring-fill-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="50%" stopColor="#FB7185" />
            <stop offset="100%" stopColor="#A78BFA" />
          </linearGradient>
        </defs>
        {/* Filled gradient background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 2}
          fill="url(#ring-fill-gradient)"
          opacity={0.12}
        />
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth={strokeWidth}
        />
        {/* Animated progress arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#ring-gradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (circumference * percentage) / 100 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>
          {currentWeek}
        </span>
        <span className="text-xs text-muted-foreground">
          of {totalWeeks}
        </span>
      </div>
    </div>
  );
}
