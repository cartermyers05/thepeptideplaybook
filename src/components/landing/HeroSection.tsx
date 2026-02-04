import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PillButton } from "./PillButton";
import { ChatPreviewCard, CoursePreviewCard, DigestPreviewCard } from "./HeroProductCards";

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

const lineVariants = {
  hidden: { opacity: 0, x: -30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { 
      delay: i * 0.15, 
      duration: 0.6, 
      ease: "easeOut" as const 
    },
  }),
};

// Shimmer animation for the gradient text effect
const shimmerVariants = {
  initial: { backgroundPosition: "-200% 0" },
  animate: { 
    backgroundPosition: "200% 0",
    transition: {
      duration: 3,
      ease: "easeInOut" as const,
      repeat: Infinity,
      repeatDelay: 2,
    }
  }
};

// Floating animation that starts after entrance
const floatingVariants = {
  initial: { y: 0 },
  float: {
    y: [-2, 2, -2],
    transition: {
      duration: 4,
      ease: "easeInOut" as const,
      repeat: Infinity,
      delay: 1.5, // Wait for entrance animation
    }
  }
};

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
            <motion.div
              variants={floatingVariants}
              initial="initial"
              animate="float"
            >
              <motion.h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.span variants={lineVariants} custom={0} className="block">
                  Your
                </motion.span>
                <motion.span 
                  variants={lineVariants} 
                  custom={1} 
                  className="block relative"
                >
                  {/* Base text */}
                  <span className="relative">
                    AI Peptide
                    {/* Shimmer overlay */}
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent bg-[length:200%_100%] bg-clip-text"
                      variants={shimmerVariants}
                      initial="initial"
                      animate="animate"
                      style={{ 
                        WebkitBackgroundClip: "text",
                        mixBlendMode: "overlay"
                      }}
                      aria-hidden="true"
                    />
                  </span>
                </motion.span>
                <motion.span 
                  variants={lineVariants} 
                  custom={2} 
                  className="block"
                >
                  Journey
                </motion.span>
              </motion.h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="mt-8 text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed"
            >
              The first AI powered peptide course personalized towards what goals you want to hit. From protocols to day by day guidance through your first cycle.
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
              $67 one-time · Lifetime access · 30-day guarantee
            </motion.p>
          </motion.div>

          {/* Right column - Product showcase cards */}
          <div className="relative grid grid-cols-2 gap-4 lg:gap-6">
            {/* AI Chat - spans full width */}
            <ChatPreviewCard className="col-span-2 h-64 md:h-72" delay={0.3} />
            
            {/* Course personalization */}
            <CoursePreviewCard className="h-52 md:h-60" delay={0.5} />
            
            {/* Newsletter digest */}
            <DigestPreviewCard className="h-52 md:h-60" delay={0.7} />
          </div>
        </div>
      </div>
    </section>
  );
}
