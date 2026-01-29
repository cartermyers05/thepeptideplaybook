import { motion } from "framer-motion";

interface FloatingOrbsProps {
  variant?: "hero" | "subtle";
}

export function FloatingOrbs({ variant = "hero" }: FloatingOrbsProps) {
  const orbs = variant === "hero" 
    ? [
        { size: "w-96 h-96", position: "-top-48 -right-24", color: "from-primary/20 to-transparent", delay: 0 },
        { size: "w-80 h-80", position: "-bottom-40 -left-20", color: "from-primary/15 to-transparent", delay: 2 },
        { size: "w-64 h-64", position: "top-1/4 left-1/4", color: "from-primary/10 to-transparent", delay: 4 },
      ]
    : [
        { size: "w-64 h-64", position: "-top-32 -right-16", color: "from-primary/10 to-transparent", delay: 0 },
        { size: "w-48 h-48", position: "-bottom-24 -left-12", color: "from-primary/8 to-transparent", delay: 3 },
      ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute ${orb.size} ${orb.position} rounded-full bg-gradient-radial ${orb.color} blur-3xl`}
          style={{ 
            background: `radial-gradient(circle, hsl(var(--primary) / ${variant === "hero" ? 0.15 : 0.08}) 0%, transparent 70%)` 
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 12,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
