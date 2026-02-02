import { motion } from "framer-motion";
import { useEffect, useState, useRef, ReactNode } from "react";
import { FloatingOrbs } from "./FloatingOrbs";
import { GridPattern } from "./GridPattern";

interface InteractiveBackgroundProps {
  children: ReactNode;
  variant?: "hero" | "subtle" | "rich";
  className?: string;
}

function ScanningLine() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Start first scan after 5 seconds, then every 30 seconds
    const initialDelay = setTimeout(() => {
      setIsActive(true);
    }, 5000);

    const interval = setInterval(() => {
      setIsActive(true);
    }, 30000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  if (!isActive) return null;

  return (
    <motion.div
      className="fixed left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent pointer-events-none z-10"
      initial={{ top: 0, opacity: 0 }}
      animate={{ top: "100vh", opacity: [0, 1, 1, 0] }}
      transition={{ duration: 8, ease: "linear" }}
      onAnimationComplete={() => setIsActive(false)}
    />
  );
}

function EnergyPulse() {
  const [pulses, setPulses] = useState<{ id: number }[]>([]);
  const nextIdRef = useRef(0);

  useEffect(() => {
    const createPulse = () => {
      const id = nextIdRef.current++;
      setPulses((prev) => [...prev.slice(-2), { id }]);
    };

    // Start with one pulse after 2 seconds
    const initialTimeout = setTimeout(createPulse, 2000);

    // Then create pulses every 8 seconds
    const interval = setInterval(createPulse, 8000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {pulses.map((pulse) => (
        <motion.div
          key={pulse.id}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10 pointer-events-none"
          initial={{ width: 0, height: 0, opacity: 0.5 }}
          animate={{ width: 1500, height: 1500, opacity: 0 }}
          transition={{ duration: 6, ease: "easeOut" }}
          onAnimationComplete={() => {
            setPulses((prev) => prev.filter((p) => p.id !== pulse.id));
          }}
        />
      ))}
    </>
  );
}

export function InteractiveBackground({
  children,
  variant = "hero",
  className = "",
}: InteractiveBackgroundProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Background layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingOrbs variant={variant} />
        <GridPattern variant="dots" />
        <EnergyPulse />
      </div>

      {/* Scanning line */}
      <ScanningLine />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
