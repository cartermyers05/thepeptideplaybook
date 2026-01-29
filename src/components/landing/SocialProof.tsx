import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Bot, Quote } from "lucide-react";

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

const testimonials = [
  {
    quote: "It's like having a peptide researcher in my pocket. I finally understand what I'm reading.",
    author: "Mike R.",
    context: "Fitness enthusiast",
  },
  {
    quote: "I showed my doctor the AI's sources and research summaries. He was genuinely impressed.",
    author: "Sarah K.",
    context: "Health-conscious professional",
  },
  {
    quote: "Finally, answers based on actual studies instead of Reddit threads and TikTok speculation.",
    author: "James T.",
    context: "Biohacker",
  },
];

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
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="container px-4">
        {/* Testimonials */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-5xl mx-auto mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Bot className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">What Users Say</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Trusted by Peptide Researchers
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-card p-6 relative"
                whileHover={{ y: -4 }}
              >
                <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
                <p className="text-foreground leading-relaxed mb-4">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-medium text-sm">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.context}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why this exists */}
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
            Why I Built This AI
          </motion.h2>
          
          <div className="text-lg text-muted-foreground leading-relaxed space-y-6 text-left">
            <motion.p variants={itemVariants}>
              I spent months going down the peptide rabbit hole. TikTok videos, Reddit threads, 
              sketchy forums. The more I researched, the more I realized most advice was unreliable 
              at best, dangerous at worst.
            </motion.p>
            
            <motion.p variants={itemVariants}>
              <strong className="text-foreground">Peptide Playbook AI</strong> is the research assistant 
              I wish existed when I started. It's trained on peer-reviewed literature, knows FDA 
              classifications, and can compare peptides instantly. It won't tell you what to take—but 
              it will help you understand what's actually going on.
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
                <CountUp end={500} />+
              </p>
              <p className="text-sm text-muted-foreground">studies reviewed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-foreground">
                <CountUp end={41} />
              </p>
              <p className="text-sm text-muted-foreground">peptides covered</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
