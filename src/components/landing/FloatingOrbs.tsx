import { motion } from "framer-motion";

interface FloatingOrbsProps {
  variant?: "hero" | "subtle" | "rich";
}

interface OrbConfig {
  size: string;
  position: string;
  color: string;
  delay: number;
  blur?: string;
}

export function FloatingOrbs({ variant = "hero" }: FloatingOrbsProps) {
  const orbConfigs: Record<string, OrbConfig[]> = {
    hero: [
      { size: "w-[500px] h-[500px]", position: "-top-40 -right-32", color: "hsl(263 70% 42% / 0.2)", delay: 0, blur: "blur-[100px]" },
      { size: "w-[400px] h-[400px]", position: "-bottom-32 -left-20", color: "hsl(263 70% 50% / 0.15)", delay: 2, blur: "blur-[80px]" },
      { size: "w-[300px] h-[300px]", position: "top-1/3 left-1/4", color: "hsl(280 70% 50% / 0.12)", delay: 4, blur: "blur-[60px]" },
      { size: "w-[200px] h-[200px]", position: "bottom-1/4 right-1/3", color: "hsl(250 70% 55% / 0.1)", delay: 3, blur: "blur-[50px]" },
      { size: "w-[150px] h-[150px]", position: "top-1/2 right-1/4", color: "hsl(290 60% 50% / 0.08)", delay: 5, blur: "blur-[40px]" },
    ],
    rich: [
      { size: "w-[600px] h-[600px]", position: "-top-48 -right-40", color: "hsl(263 70% 42% / 0.25)", delay: 0, blur: "blur-[120px]" },
      { size: "w-[500px] h-[500px]", position: "-bottom-40 -left-32", color: "hsl(263 70% 50% / 0.2)", delay: 1.5, blur: "blur-[100px]" },
      { size: "w-[350px] h-[350px]", position: "top-1/4 left-1/3", color: "hsl(280 70% 50% / 0.15)", delay: 3, blur: "blur-[70px]" },
      { size: "w-[250px] h-[250px]", position: "bottom-1/3 right-1/4", color: "hsl(250 70% 55% / 0.12)", delay: 2.5, blur: "blur-[60px]" },
      { size: "w-[180px] h-[180px]", position: "top-1/2 right-1/3", color: "hsl(290 60% 50% / 0.1)", delay: 4, blur: "blur-[45px]" },
      { size: "w-[120px] h-[120px]", position: "bottom-1/4 left-1/4", color: "hsl(270 65% 55% / 0.08)", delay: 5.5, blur: "blur-[35px]" },
    ],
    subtle: [
      { size: "w-[300px] h-[300px]", position: "-top-32 -right-20", color: "hsl(263 70% 42% / 0.1)", delay: 0, blur: "blur-[60px]" },
      { size: "w-[250px] h-[250px]", position: "-bottom-24 -left-16", color: "hsl(263 70% 50% / 0.08)", delay: 3, blur: "blur-[50px]" },
      { size: "w-[150px] h-[150px]", position: "top-1/3 right-1/4", color: "hsl(280 70% 50% / 0.06)", delay: 4.5, blur: "blur-[40px]" },
    ],
  };

  const orbs = orbConfigs[variant] || orbConfigs.hero;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute ${orb.size} ${orb.position} rounded-full ${orb.blur || 'blur-3xl'}`}
          style={{ 
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)` 
          }}
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -30, 25, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 15 + index * 2,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Animated glow ring for hero variant */}
      {variant === "hero" && (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, transparent 40%, hsl(263 70% 42% / 0.05) 50%, transparent 60%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  );
}
