import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  angle: number;
  distance: number;
  size: number;
  duration: number;
  delay: number;
}

interface ClickBurstProps {
  x: number;
  y: number;
  id: number;
  onComplete: (id: number) => void;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    angle: (360 / count) * i + Math.random() * 30 - 15,
    distance: 80 + Math.random() * 120,
    size: 3 + Math.random() * 5,
    duration: 0.5 + Math.random() * 0.4,
    delay: Math.random() * 0.05,
  }));
}

export function ClickBurst({ x, y, id, onComplete }: ClickBurstProps) {
  const [particles] = useState(() => generateParticles(12));

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete(id);
    }, 1000);
    return () => clearTimeout(timer);
  }, [id, onComplete]);

  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{ left: x, top: y }}
    >
      {/* Central flash */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/40"
        initial={{ width: 0, height: 0, opacity: 1 }}
        animate={{ width: 60, height: 60, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* Ripple ring */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/30"
        initial={{ width: 0, height: 0, opacity: 1 }}
        animate={{ width: 200, height: 200, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Particles */}
      {particles.map((particle) => {
        const radians = (particle.angle * Math.PI) / 180;
        const endX = Math.cos(radians) * particle.distance;
        const endY = Math.sin(radians) * particle.distance;

        return (
          <motion.div
            key={particle.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
            style={{
              width: particle.size,
              height: particle.size,
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: endX,
              y: endY,
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>
  );
}

interface ClickBurstManagerProps {
  children: React.ReactNode;
}

interface Burst {
  id: number;
  x: number;
  y: number;
}

export function ClickBurstManager({ children }: ClickBurstManagerProps) {
  const [bursts, setBursts] = useState<Burst[]>([]);
  const [nextId, setNextId] = useState(0);

  const handleClick = (e: React.MouseEvent) => {
    // Limit to 3 active bursts
    if (bursts.length >= 3) return;

    setBursts((prev) => [...prev, { id: nextId, x: e.clientX, y: e.clientY }]);
    setNextId((prev) => prev + 1);
  };

  const handleComplete = (id: number) => {
    setBursts((prev) => prev.filter((burst) => burst.id !== id));
  };

  return (
    <div onClick={handleClick} className="contents">
      {children}
      <AnimatePresence>
        {bursts.map((burst) => (
          <ClickBurst
            key={burst.id}
            id={burst.id}
            x={burst.x}
            y={burst.y}
            onComplete={handleComplete}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
