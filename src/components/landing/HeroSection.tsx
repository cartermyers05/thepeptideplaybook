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

// Enhanced line variants with blur-to-sharp reveal
const enhancedLineVariants = {
  hidden: { opacity: 0, x: -50, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { 
      delay: i * 0.25, 
      duration: 0.6, 
      ease: [0.25, 0.46, 0.45, 0.94] as const
    },
  }),
};

// Letter-by-letter stagger for "AI Peptide"
const letterContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.3,
    }
  }
};

const letterVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: "easeOut" as const }
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
      delay: 1.5,
    }
  }
};

// Rainbow gradient colors from brand logo
const rainbowGradient = "linear-gradient(90deg, hsl(45, 80%, 50%), hsl(25, 90%, 55%), hsl(350, 80%, 55%), hsl(270, 70%, 55%), hsl(210, 80%, 55%), hsl(160, 70%, 45%), hsl(45, 80%, 50%))";

export function HeroSection() {
  const aiPeptideText = "AI Peptide";
  
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
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1]"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* "Your" - slides in from left with blur */}
                <motion.span 
                  variants={enhancedLineVariants} 
                  custom={0} 
                  className="block"
                >
                  Your
                </motion.span>
                
                {/* "AI Peptide" - rainbow gradient with letter stagger */}
                <motion.span 
                  variants={letterContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="block relative whitespace-nowrap"
                >
                  <motion.span
                    className="inline-block bg-clip-text text-transparent"
                    style={{
                      backgroundImage: rainbowGradient,
                      backgroundSize: "200% 100%",
                    }}
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
                    }}
                    transition={{
                      duration: 4,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                  >
                    {aiPeptideText.split("").map((char, index) => (
                      <motion.span
                        key={index}
                        variants={letterVariants}
                        className="inline-block"
                        style={{ 
                          whiteSpace: char === " " ? "pre" : "normal",
                        }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </motion.span>
                  
                  {/* Subtle glow effect behind the text */}
                  <motion.span
                    className="absolute inset-0 bg-clip-text text-transparent pointer-events-none select-none"
                    style={{
                      backgroundImage: rainbowGradient,
                      backgroundSize: "200% 100%",
                      filter: "blur(20px)",
                      opacity: 0,
                    }}
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                      backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
                    }}
                    transition={{
                      opacity: {
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Infinity,
                        delay: 1.5,
                      },
                      backgroundPosition: {
                        duration: 4,
                        ease: "linear",
                        repeat: Infinity,
                      },
                    }}
                    aria-hidden="true"
                  >
                    {aiPeptideText}
                  </motion.span>
                </motion.span>
                
                {/* "Journey" - slides in from left (completing the statement) */}
                <motion.span 
                  variants={enhancedLineVariants} 
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
