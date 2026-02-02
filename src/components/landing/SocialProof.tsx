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

const stats = [
  {
    value: 15,
    suffix: "",
    label: "Research Guides",
  },
  {
    value: 47,
    suffix: "",
    label: "TikTok Myths Exposed",
  },
  {
    value: 200,
    suffix: "+",
    label: "Studies Cited",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function SocialProof() {
  return (
    <section id="about" className="py-16 md:py-20 bg-secondary/30 border-y border-border/50">
      <div className="container px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
              Built on Real Research, Not Reddit
            </h2>
            <p className="text-muted-foreground">
              Every answer is backed by peer-reviewed studies and FDA data
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-3 gap-6 md:gap-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                {/* Accent line instead of icon */}
                <div className="w-8 h-0.5 bg-primary/60 mx-auto mb-4" />
                <p className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                  <CountUp end={stat.value} />
                  {stat.suffix}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
