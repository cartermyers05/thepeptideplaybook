import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  delay: number;
  size: number;
}

function FloatingParticles() {
  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 1.5,
      size: 4 + Math.random() * 6,
    }))
  );

  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            bottom: 0,
            width: p.size,
            height: p.size,
            backgroundColor: `rgba(16,185,129,${0.3 + Math.random() * 0.4})`,
          }}
          initial={{ y: 0, opacity: 0.8 }}
          animate={{ y: -120, opacity: 0 }}
          transition={{
            duration: 2,
            delay: p.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

interface CompletionBannerProps {
  dayNumber: number;
}

export function CompletionBanner({ dayNumber }: CompletionBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="mt-4 rounded-2xl p-6 text-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #ECFDF5, #D1FAE5)" }}
    >
      <FloatingParticles />
      <p className="text-[32px] mb-1">🎉</p>
      <p className="text-xl font-bold" style={{ color: "#10B981" }}>
        Day {dayNumber} Complete
      </p>
      <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
        Keep it up. Consistency is everything.
      </p>
    </motion.div>
  );
}
