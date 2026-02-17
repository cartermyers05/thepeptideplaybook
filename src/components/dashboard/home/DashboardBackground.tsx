import { useMemo } from "react";

const ORB_COUNT = 3;
const PARTICLE_COUNT = 20;

const orbConfigs = [
  { color: "rgba(99,102,241,0.06)", size: 320, x: "15%", y: "10%", duration: "18s", delay: "0s" },
  { color: "rgba(52,211,153,0.05)", size: 260, x: "75%", y: "40%", duration: "22s", delay: "-6s" },
  { color: "rgba(167,139,250,0.05)", size: 280, x: "50%", y: "70%", duration: "20s", delay: "-12s" },
];

export function DashboardBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 2,
        duration: 12 + Math.random() * 10,
        delay: -(Math.random() * 20),
        opacity: 0.15 + Math.random() * 0.15,
      })),
    []
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {/* Gradient orbs */}
      {orbConfigs.map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: "blur(60px)",
            willChange: "transform",
            animation: `dashOrb ${orb.duration} ease-in-out infinite ${orb.delay}`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* Breathing glow */}
      <div
        className="absolute left-1/2 top-[20%] -translate-x-1/2 w-[500px] h-[300px] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(99,102,241,0.04) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "dashBreathe 6s ease-in-out infinite",
          willChange: "opacity",
        }}
      />

      {/* Micro particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            backgroundColor: `rgba(99,102,241,${p.opacity})`,
            willChange: "transform",
            animation: `dashParticle ${p.duration}s ease-in-out infinite ${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
