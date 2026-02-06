import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PillButton } from "./PillButton";
import { ChatPreviewCard, CoursePreviewCard, DigestPreviewCard } from "./HeroProductCards";
import { Check } from "lucide-react";

const trustItems = [
  "500+ Studies",
  "45+ Peptides",
  "FDA Status Tracked",
  "30-Day Money Back",
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="container px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left column - Typography */}
          <div>
            {/* Headline */}
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Your Personal Peptide Research Assistant
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-6 text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed"
            >
              An AI-powered platform that answers your peptide questions with real research. Not Reddit threads, not bro-science. 500+ studies. 45+ peptides. Protocols built for your goals.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <a
                href="#demo"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('demo')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                }}
              >
                <PillButton 
                  variant="dark" 
                  size="lg"
                  icon={<span>→</span>}
                >
                  Try the AI Free
                </PillButton>
              </a>
              <a
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('features')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                }}
              >
                <PillButton variant="outline" size="lg">
                  See What's Inside
                </PillButton>
              </a>
            </motion.div>

            {/* Trust Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-8 flex flex-wrap gap-x-6 gap-y-2"
            >
              {trustItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>
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
