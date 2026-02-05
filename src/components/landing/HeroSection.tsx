import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PillButton } from "./PillButton";
import { ChatPreviewCard, CoursePreviewCard, DigestPreviewCard } from "./HeroProductCards";

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

// Rainbow gradient colors from brand logo
const rainbowGradient = "linear-gradient(90deg, hsl(45, 80%, 50%), hsl(25, 90%, 55%), hsl(350, 80%, 55%), hsl(270, 70%, 55%), hsl(210, 80%, 55%), hsl(160, 70%, 45%), hsl(45, 80%, 50%))";

// Typewriter word configuration
const words = [
  { text: "Your", delay: 0 },
  { text: "AI Peptide", delay: 0.6, hasUnderline: true },
  { text: "Journey", delay: 1.6 },
];

// Blinking cursor component
function TypewriterCursor({ show }: { show: boolean }) {
  return (
    <motion.span
      className="inline-block w-[3px] h-[0.85em] bg-foreground ml-0.5 align-middle rounded-sm"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: show ? [1, 1, 0, 0] : 0,
      }}
      transition={{
        duration: 0.8,
        repeat: show ? Infinity : 0,
      }}
    />
  );
}

// Typewriter word component
function TypewriterWord({ 
  text, 
  delay, 
  hasUnderline,
  onComplete,
  showCursor,
}: { 
  text: string; 
  delay: number;
  hasUnderline?: boolean;
  onComplete?: () => void;
  showCursor: boolean;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showUnderline, setShowUnderline] = useState(false);
  
  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsTyping(true);
      let index = 0;
      
      const typeInterval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          if (hasUnderline) {
            setTimeout(() => setShowUnderline(true), 100);
          }
          if (onComplete) {
            setTimeout(onComplete, 50);
          }
        }
      }, 60);
      
      return () => clearInterval(typeInterval);
    }, delay * 1000);
    
    return () => clearTimeout(startTimeout);
  }, [text, delay, hasUnderline, onComplete]);
  
  return (
    <span className="block relative">
      <span className="text-foreground">
        {displayedText}
        {(isTyping || showCursor) && <TypewriterCursor show={showCursor} />}
      </span>
      
      {/* Rainbow underline for "AI Peptide" */}
      {hasUnderline && (
        <motion.div
          className="absolute -bottom-1 left-0 h-1.5 rounded-full"
          style={{
            background: rainbowGradient,
            backgroundSize: "200% 100%",
            transformOrigin: "left",
            width: "100%",
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={showUnderline ? { 
            scaleX: 1, 
            opacity: 1,
            backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
          } : {}}
          transition={{
            scaleX: { duration: 0.5, ease: "easeOut" },
            opacity: { duration: 0.3 },
            backgroundPosition: { duration: 4, ease: "linear", repeat: Infinity, delay: 0.5 },
          }}
        />
      )}
    </span>
  );
}

export function HeroSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [allWordsComplete, setAllWordsComplete] = useState(false);
  
  const handleWordComplete = (index: number) => {
    if (index < words.length - 1) {
      setCurrentWordIndex(index + 1);
    } else {
      setAllWordsComplete(true);
    }
  };

  return (
    <section className="relative min-h-screen pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="container px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left column - Typography */}
          <div>
            {/* Headline with typewriter effect */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.2]">
              {words.map((word, index) => (
                <TypewriterWord
                  key={word.text}
                  text={word.text}
                  delay={word.delay}
                  hasUnderline={word.hasUnderline}
                  onComplete={() => handleWordComplete(index)}
                  showCursor={currentWordIndex === index && !allWordsComplete}
                />
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.6 }}
              className="mt-8 text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed"
            >
              The first AI powered peptide course personalized towards what goals you want to hit. From protocols to day by day guidance through your first cycle.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6, duration: 0.6 }}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.6 }}
              className="mt-6 text-sm text-muted-foreground"
            >
              $67 one-time · Lifetime access · 30-day guarantee
            </motion.p>
          </div>

          {/* Right column - Product showcase cards */}
          <motion.div 
            className="relative grid grid-cols-2 gap-4 lg:gap-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {/* AI Chat - spans full width */}
            <ChatPreviewCard className="col-span-2 h-64 md:h-72" delay={0.3} />
            
            {/* Course personalization */}
            <CoursePreviewCard className="h-52 md:h-60" delay={0.5} />
            
            {/* Newsletter digest */}
            <DigestPreviewCard className="h-52 md:h-60" delay={0.7} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
