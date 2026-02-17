import { motion } from "framer-motion";
import { Check } from "lucide-react";

const heading = "'Outfit', sans-serif";

interface CompletionBannerProps {
  dayNumber: number;
}

/* Mini confetti particles */
function ConfettiParticles() {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    x: Math.random() * 200 - 100,
    y: -(Math.random() * 60 + 20),
    rotate: Math.random() * 360,
    color: ["#F97316", "#FB7185", "#A78BFA", "#34D399"][i % 4],
    delay: i * 0.05,
    size: Math.random() * 4 + 3,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            left: "50%",
            top: "50%",
          }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
          animate={{ opacity: 0, x: p.x, y: p.y, scale: 0.3, rotate: p.rotate }}
          transition={{ duration: 0.8, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export function CompletionBanner({ dayNumber }: CompletionBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, type: "spring" }}
      className="mt-3 rounded-[16px] px-5 py-4 flex items-center gap-3.5 relative overflow-hidden"
      style={{
        backgroundColor: "rgba(52,211,153,0.06)",
        border: "1px solid rgba(52,211,153,0.15)",
      }}
    >
      <ConfettiParticles />
      <motion.div
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 relative z-10"
        style={{ backgroundColor: "#34D399" }}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Check className="w-4 h-4 text-white" />
      </motion.div>
      <div className="relative z-10">
        <p className="text-[15px] font-bold text-foreground" style={{ fontFamily: heading }}>
          Day {dayNumber} Complete
        </p>
        <p className="text-[13px] text-muted-foreground">
          Consistency builds results. See you tomorrow.
        </p>
      </div>
    </motion.div>
  );
}
