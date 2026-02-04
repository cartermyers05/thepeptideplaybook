import { motion } from "framer-motion";

interface AnimatedLogoProps {
  size?: number;
  className?: string;
}

export function AnimatedLogo({ size = 40, className }: AnimatedLogoProps) {
  const gradientId = `animated-rainbow-${size}`;
  const fillId = `animated-fill-${size}`;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      animate={{ rotate: 360 }}
      transition={{ 
        duration: 20, 
        repeat: Infinity, 
        ease: "linear" 
      }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(45, 80%, 50%)" />
          <stop offset="20%" stopColor="hsl(25, 90%, 55%)" />
          <stop offset="40%" stopColor="hsl(350, 80%, 55%)" />
          <stop offset="60%" stopColor="hsl(270, 70%, 55%)" />
          <stop offset="80%" stopColor="hsl(210, 80%, 55%)" />
          <stop offset="100%" stopColor="hsl(160, 70%, 45%)" />
        </linearGradient>
        <radialGradient id={fillId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(45, 80%, 50%)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="hsl(270, 70%, 55%)" stopOpacity="0.05" />
        </radialGradient>
      </defs>

      {/* Hexagon */}
      <path
        d="M16 2L28 9V23L16 30L4 23V9L16 2Z"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        fill={`url(#${fillId})`}
      />

      {/* Center node with pulse */}
      <motion.circle
        cx="16"
        cy="16"
        r="3"
        fill={`url(#${gradientId})`}
        animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Connection lines */}
      <path
        d="M16 16L16 7M16 16L23 20M16 16L9 20"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Outer nodes with staggered glow */}
      <motion.circle
        cx="16" cy="7" r="2"
        fill="hsl(45, 80%, 50%)"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
      />
      <motion.circle
        cx="23" cy="20" r="2"
        fill="hsl(270, 70%, 55%)"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      />
      <motion.circle
        cx="9" cy="20" r="2"
        fill="hsl(160, 70%, 45%)"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
      />
    </motion.svg>
  );
}
