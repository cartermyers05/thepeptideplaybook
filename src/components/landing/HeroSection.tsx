import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PillButton } from "./PillButton";
import { ChatPreviewCard, CoursePreviewCard, DigestPreviewCard } from "./HeroProductCards";

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="container px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left column - Typography */}
          <div>
            {/* Headline - big bold letters */}
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.2]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="block text-foreground">Your</span>
               <span className="block text-foreground">AI Peptide</span>
              <span className="block text-foreground">Journey</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-8 text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed"
            >
              The first AI powered peptide course personalized towards what goals you want to hit. From protocols to day by day guidance through your first cycle.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
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
              transition={{ delay: 1.0, duration: 0.6 }}
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
