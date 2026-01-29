import { motion } from "framer-motion";

interface GridPatternProps {
  variant?: "dots" | "lines";
  className?: string;
}

export function GridPattern({ variant = "dots", className = "" }: GridPatternProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {variant === "dots" ? (
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, hsl(var(--primary) / 0.15) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "32px 32px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ) : (
        <svg
          className="absolute inset-0 w-full h-full"
          style={{
            maskImage: "radial-gradient(ellipse 70% 50% at 50% 50%, black, transparent)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 50% at 50% 50%, black, transparent)",
          }}
        >
          <defs>
            <pattern
              id="grid-lines"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="hsl(var(--primary) / 0.08)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-lines)" />
        </svg>
      )}
    </div>
  );
}
