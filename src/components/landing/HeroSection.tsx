import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PillButton } from "./PillButton";
import { ChatPreviewCard, CoursePreviewCard, DigestPreviewCard } from "./HeroProductCards";
import { Check } from "lucide-react";

const trustItems = [
"500+ Studies Analyzed",
"45+ Peptides Covered",
"Updated February 2026",
"30-Day Money-Back Guarantee"];


const headlineWords = ["The AI-Powered", "Peptide Guide", "Built From", "500+ Studies."];

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Drifting gradient orb */}
      <motion.div
        className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
          filter: "blur(80px)"
        }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 15, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />


      <div className="container px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left column - Typography */}
          <div>
            {/* Headline - word by word */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1]">
              {headlineWords.map((word, i) =>
              <motion.span
                key={i}
                className="inline-block mr-[0.3em]"
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.15 * i, duration: 0.5, ease: "easeOut" }}>

                  {word}
                </motion.span>
              )}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mt-6 text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">Ask anything... Get research backed answers matched to your goals and not TikTok opinions
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="mt-8 flex flex-wrap gap-4">

              <Link to="/signup">
                <PillButton
                  variant="dark"
                  size="lg"
                  icon={<span>→</span>}>

                  Get Your Protocol — $67
                </PillButton>
              </Link>
              <a
                href="#demo"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('demo')?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}>

                <PillButton variant="outline" size="lg">
                  See a Sample Answer
                </PillButton>
              </a>
            </motion.div>

            

            {/* Trust Bar - spring stagger */}
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {trustItems.map((item, index) =>
              <motion.div
                key={index}
                className="flex items-center gap-2 text-sm text-muted-foreground"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 1.3 + index * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}>

                  <Check className="w-4 h-4 text-primary" />
                  <span>{item}</span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right column - Product showcase cards with float */}
          <motion.div
            className="relative grid grid-cols-2 gap-4 lg:gap-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}>

            <motion.div
              className="col-span-2"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>

              <ChatPreviewCard className="h-64 md:h-72" delay={0.3} />
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}>

              <CoursePreviewCard className="h-52 md:h-60" delay={0.5} />
            </motion.div>
            
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}>

              <DigestPreviewCard className="h-52 md:h-60" delay={0.7} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>);

}