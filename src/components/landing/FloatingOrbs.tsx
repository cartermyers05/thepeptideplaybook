import { motion } from "framer-motion";
import { useMemo } from "react";

interface FloatingOrbsProps {
  variant?: "hero" | "subtle" | "rich";
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
}

interface AuroraGradient {
  id: number;
  position: string;
  size: string;
  color: string;
  blur: string;
  delay: number;
}

interface LightBeam {
  id: number;
  angle: number;
  position: string;
  opacity: number;
  delay: number;
}

// Generate random particles
function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 2,
    opacity: 0.1 + Math.random() * 0.3,
    delay: Math.random() * 5,
    duration: 15 + Math.random() * 20,
  }));
}

// Floating particles component
function Particles({ count, variant }: { count: number; variant: string }) {
  const particles = useMemo(() => generateParticles(count), [count]);
  
  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            opacity: variant === "subtle" ? particle.opacity * 0.5 : particle.opacity,
          }}
          animate={{
            y: [0, -30, -60, -30, 0],
            x: [0, 10, -5, 15, 0],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity, particle.opacity * 0.7, particle.opacity],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

// Aurora gradient shapes
function AuroraGradients({ variant }: { variant: string }) {
  const gradients: Record<string, AuroraGradient[]> = {
    hero: [
      { id: 1, position: "-top-32 -right-20", size: "w-[600px] h-[300px]", color: "from-primary/10 via-purple-500/5 to-transparent", blur: "blur-[80px]", delay: 0 },
      { id: 2, position: "-bottom-40 -left-32", size: "w-[500px] h-[250px]", color: "from-blue-500/8 via-primary/5 to-transparent", blur: "blur-[100px]", delay: 2 },
      { id: 3, position: "top-1/3 left-1/4", size: "w-[400px] h-[200px]", color: "from-pink-500/6 via-primary/4 to-transparent", blur: "blur-[70px]", delay: 4 },
    ],
    rich: [
      { id: 1, position: "-top-40 -right-32", size: "w-[700px] h-[350px]", color: "from-primary/12 via-purple-600/8 to-transparent", blur: "blur-[100px]", delay: 0 },
      { id: 2, position: "-bottom-48 -left-40", size: "w-[600px] h-[300px]", color: "from-blue-600/10 via-primary/6 to-transparent", blur: "blur-[120px]", delay: 1.5 },
      { id: 3, position: "top-1/4 left-1/3", size: "w-[450px] h-[220px]", color: "from-pink-600/8 via-purple-500/5 to-transparent", blur: "blur-[80px]", delay: 3 },
      { id: 4, position: "bottom-1/3 right-1/4", size: "w-[350px] h-[180px]", color: "from-indigo-500/6 via-primary/4 to-transparent", blur: "blur-[60px]", delay: 4.5 },
    ],
    subtle: [
      { id: 1, position: "-top-20 -right-16", size: "w-[400px] h-[200px]", color: "from-primary/6 via-purple-500/3 to-transparent", blur: "blur-[60px]", delay: 0 },
      { id: 2, position: "-bottom-24 -left-20", size: "w-[350px] h-[180px]", color: "from-blue-500/4 via-primary/3 to-transparent", blur: "blur-[70px]", delay: 3 },
    ],
  };

  const auroraShapes = gradients[variant] || gradients.hero;

  return (
    <>
      {auroraShapes.map((aurora) => (
        <motion.div
          key={aurora.id}
          className={`absolute ${aurora.position} ${aurora.size} ${aurora.blur} rounded-[100%] bg-gradient-to-br ${aurora.color}`}
          style={{ transform: "rotate(-15deg)" }}
          animate={{
            scale: [1, 1.1, 0.95, 1.05, 1],
            x: [0, 20, -10, 15, 0],
            y: [0, -15, 10, -5, 0],
            rotate: [-15, -10, -20, -12, -15],
          }}
          transition={{
            duration: 20 + aurora.delay * 2,
            delay: aurora.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

// Diagonal light beams
function LightBeams({ variant }: { variant: string }) {
  const beams: Record<string, LightBeam[]> = {
    hero: [
      { id: 1, angle: 45, position: "top-0 right-1/4", opacity: 0.04, delay: 0 },
      { id: 2, angle: 55, position: "top-1/4 left-1/3", opacity: 0.03, delay: 3 },
    ],
    rich: [
      { id: 1, angle: 45, position: "top-0 right-1/4", opacity: 0.05, delay: 0 },
      { id: 2, angle: 55, position: "top-1/4 left-1/3", opacity: 0.04, delay: 2 },
      { id: 3, angle: 40, position: "bottom-1/4 right-1/3", opacity: 0.03, delay: 4 },
    ],
    subtle: [
      { id: 1, angle: 50, position: "top-0 right-1/3", opacity: 0.02, delay: 0 },
    ],
  };

  const lightBeams = beams[variant] || beams.hero;

  return (
    <>
      {lightBeams.map((beam) => (
        <motion.div
          key={beam.id}
          className={`absolute ${beam.position} w-[2px] h-[400px] origin-top`}
          style={{
            background: `linear-gradient(180deg, hsl(var(--primary) / ${beam.opacity}), transparent 80%)`,
            transform: `rotate(${beam.angle}deg)`,
          }}
          animate={{
            opacity: [beam.opacity, beam.opacity * 2, beam.opacity],
            scaleY: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            delay: beam.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

export function FloatingOrbs({ variant = "hero" }: FloatingOrbsProps) {
  const particleCount = variant === "hero" ? 35 : variant === "rich" ? 45 : 20;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Aurora gradient shapes */}
      <AuroraGradients variant={variant} />
      
      {/* Floating micro-particles */}
      <Particles count={particleCount} variant={variant} />
      
      {/* Diagonal light beams */}
      <LightBeams variant={variant} />
      
      {/* Animated glow pulse for hero */}
      {variant === "hero" && (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-[100%]"
          style={{
            background: "radial-gradient(ellipse, hsl(var(--primary) / 0.03) 0%, transparent 60%)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  );
}
