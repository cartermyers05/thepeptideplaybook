import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Clock, ArrowRight } from "lucide-react";
import { FloatingOrbs } from "./FloatingOrbs";
import { GridPattern } from "./GridPattern";
import { Link } from "react-router-dom";
const trustItems = [{
  icon: Shield,
  text: "30-Day Money-Back Guarantee"
}, {
  icon: Zap,
  text: "Instant Access"
}, {
  icon: Clock,
  text: "No Subscription"
}];
const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const
    }
  }
};
export function HeroSection() {
  return <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 gradient-mesh-bg grain-overlay overflow-hidden">
      <FloatingOrbs variant="hero" />
      <GridPattern variant="dots" />
      
      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Centered content */}
          <motion.div className="text-center" variants={containerVariants} initial="hidden" animate="visible">
            {/* Headline */}
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] mb-6">
              Ask Anything About Peptides
              <motion.span className="block text-gradient mt-2" initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.5,
              duration: 0.5
            }}>
                Get Research Backed Answers
              </motion.span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">Your 24/7 AI research assistant that knows 41+ peptides, their FDA status, mechanisms, and the latest studies. No more TikToks or Reddit speculation. Just ask.</motion.p>

            {/* Stats row */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="text-center">
                <p className="text-2xl font-bold text-gradient">41+</p>
                <p className="text-xs text-muted-foreground">Peptides</p>
              </div>
              <div className="h-10 w-px bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-gradient">500+</p>
                <p className="text-xs text-muted-foreground">Studies Referenced</p>
              </div>
              <div className="h-10 w-px bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-gradient">24/7</p>
                <p className="text-xs text-muted-foreground">Instant Answers</p>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="btn-primary-clean h-12 px-8 text-base group">
                <Link to="/pricing">
                  Get Full Access - $67
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base hover-lift border-border/60 bg-background/50 backdrop-blur-sm">
                <a href="#ai-demo">See It In Action</a>
              </Button>
            </motion.div>

            {/* Trust signals */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-6">
              {trustItems.map((item, index) => <motion.div key={index} className="flex items-center gap-2 text-sm text-muted-foreground group" whileHover={{
              scale: 1.02
            }} transition={{
              type: "spring",
              stiffness: 300
            }}>
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span>{item.text}</span>
                </motion.div>)}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>;
}