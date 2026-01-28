import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function CountUp({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function SocialProof() {
  return (
    <section id="about" className="py-24 md:py-32 bg-[#FAFBFC]">
      <div className="container px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-semibold tracking-tight mb-8"
          >
            Why this exists
          </motion.h2>
          
          <div className="text-lg text-muted-foreground leading-relaxed space-y-6 text-left">
            <motion.p variants={itemVariants}>
              I spent months going down the peptide rabbit hole — TikTok videos, Reddit threads, 
              sketchy forums. The more I researched, the more I realized most advice was unreliable 
              at best, dangerous at worst.
            </motion.p>
            
            <motion.p variants={itemVariants}>
              This guide is the resource I wish existed when I started. It's not medical advice. 
              It won't tell you what to take. But it will help you understand what's actually 
              going on — so you can make informed decisions with real professionals.
            </motion.p>
          </div>
          
          <motion.div 
            variants={itemVariants}
            className="mt-10 pt-10 border-t border-border flex justify-center gap-8"
          >
            <div className="text-center">
              <p className="text-2xl font-semibold text-foreground">
                <CountUp end={200} />+
              </p>
              <p className="text-sm text-muted-foreground">hours of research</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-foreground">
                <CountUp end={100} />+
              </p>
              <p className="text-sm text-muted-foreground">sources reviewed</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
