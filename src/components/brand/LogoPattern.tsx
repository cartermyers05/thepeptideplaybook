import { useMemo } from "react";
import { motion } from "framer-motion";
import { AnimatedLogo } from "./AnimatedLogo";

interface LogoInstance {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  opacity: number;
  driftX: number;
  driftY: number;
  duration: number;
}

// Seeded pseudo-random for deterministic positions
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function LogoPattern() {
  const logos = useMemo<LogoInstance[]>(() => {
    return Array.from({ length: 14 }, (_, i) => {
      const r = (s: number) => seededRandom(i * 7 + s);
      return {
        id: i,
        x: r(1) * 90 + 5,
        y: r(2) * 85 + 5,
        size: 24 + r(3) * 40,
        rotation: r(4) * 360,
        opacity: 0.03 + r(5) * 0.05,
        driftX: (r(6) - 0.5) * 30,
        driftY: (r(7) - 0.5) * 20,
        duration: 15 + r(8) * 15,
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {logos.map((logo) => (
        <motion.div
          key={logo.id}
          className="absolute"
          style={{
            left: `${logo.x}%`,
            top: `${logo.y}%`,
            rotate: logo.rotation,
            opacity: logo.opacity,
          }}
          animate={{
            x: [0, logo.driftX, 0],
            y: [0, logo.driftY, 0],
          }}
          transition={{
            duration: logo.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <AnimatedLogo size={logo.size} animate={false} />
        </motion.div>
      ))}
    </div>
  );
}
