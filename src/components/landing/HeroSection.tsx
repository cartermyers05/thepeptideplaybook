import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PillButton } from "./PillButton";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

// Abstract 3D molecular visual card component
function VisualCard({ 
  className, 
  gradient,
  delay = 0 
}: { 
  className?: string; 
  gradient: string;
  delay?: number;
}) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      className={`relative overflow-hidden rounded-3xl ${className}`}
      style={{
        background: gradient,
      }}
    >
      {/* Abstract molecular shapes */}
      <div className="absolute inset-0">
        {/* Central sphere */}
        <div 
          className="absolute w-32 h-32 rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)",
            top: "30%",
            left: "40%",
            filter: "blur(20px)",
          }}
        />
        {/* Floating orbs */}
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute w-16 h-16 rounded-full opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 60%)",
            top: "20%",
            right: "25%",
          }}
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            x: [0, -15, 0],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1 
          }}
          className="absolute w-24 h-24 rounded-full opacity-25"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.7) 0%, transparent 60%)",
            bottom: "25%",
            left: "20%",
          }}
        />
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <line x1="30%" y1="35%" x2="60%" y2="50%" stroke="white" strokeWidth="1" />
          <line x1="60%" y1="50%" x2="75%" y2="30%" stroke="white" strokeWidth="1" />
          <line x1="40%" y1="60%" x2="60%" y2="50%" stroke="white" strokeWidth="1" />
        </svg>
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="container px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left column - Typography */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]"
            >
              Your
              <br />
              Peptide
              <br />
              <span className="text-primary">Journey</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-8 text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed"
            >
              The first AI-powered peptide course. Personalized protocols, 
              day-by-day guidance through your first cycle.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link to="/quiz">
                <PillButton 
                  variant="dark" 
                  size="lg"
                  icon={<span>→</span>}
                >
                  Start Your Course
                </PillButton>
              </Link>
              <a
                href="#how-it-works"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('how-it-works')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                }}
              >
                <PillButton variant="outline" size="lg">
                  See How It Works
                </PillButton>
              </a>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-sm text-muted-foreground"
            >
              $99 one-time · Lifetime access · 30-day guarantee
            </motion.p>
          </motion.div>

          {/* Right column - Visual cards grid */}
          <div className="relative grid grid-cols-2 gap-4 lg:gap-6">
            {/* Large card - top right */}
            <VisualCard 
              className="col-span-2 h-64 md:h-80"
              gradient="linear-gradient(135deg, hsl(173 60% 45%) 0%, hsl(173 70% 35%) 50%, hsl(180 50% 30%) 100%)"
              delay={0.3}
            />
            
            {/* Two smaller cards */}
            <VisualCard 
              className="h-48 md:h-56"
              gradient="linear-gradient(145deg, hsl(200 50% 55%) 0%, hsl(210 60% 40%) 100%)"
              delay={0.5}
            />
            <VisualCard 
              className="h-48 md:h-56"
              gradient="linear-gradient(155deg, hsl(260 40% 55%) 0%, hsl(280 50% 40%) 100%)"
              delay={0.7}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
