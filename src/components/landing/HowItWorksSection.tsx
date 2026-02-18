import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ClipboardList, Sparkles, MessageCircle } from "lucide-react";
import { PillButton } from "./PillButton";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Tell Us Your Goal",
    description: "Fat loss, muscle growth, recovery, anti-aging — pick your goal and tell us your experience level. Takes 60 seconds.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Get Your Personalized Protocol",
    description: "Our AI matches you with the right compounds, doses, timing, and schedule — all backed by published research.",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Follow Your Blueprint",
    description: "Daily compound tracker, AI coach for questions, diet and training tips personalized to your stack, and week-by-week timeline of what to expect.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-secondary/30">
      <div className="container px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            How It Works
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
          {/* SVG connecting lines (desktop only) */}
          <svg className="hidden md:block absolute top-16 left-0 w-full h-4 pointer-events-none" viewBox="0 0 900 16" preserveAspectRatio="none">
            <motion.line
              x1="180" y1="8" x2="420" y2="8"
              stroke="hsl(var(--border))"
              strokeWidth="2"
              strokeDasharray="240"
              strokeDashoffset="240"
              initial={{ strokeDashoffset: 240 }}
              whileInView={{ strokeDashoffset: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
            />
            <motion.line
              x1="480" y1="8" x2="720" y2="8"
              stroke="hsl(var(--border))"
              strokeWidth="2"
              strokeDasharray="240"
              strokeDashoffset="240"
              initial={{ strokeDashoffset: 240 }}
              whileInView={{ strokeDashoffset: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
            />
          </svg>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="relative"
            >
              <div className="text-center">
                {/* Step number badge with spring bounce */}
                <motion.div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg mb-6"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.2 + 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  }}
                >
                  {step.number}
                </motion.div>
                
                {/* Icon with rotate-in */}
                <motion.div
                  className="w-16 h-16 rounded-2xl bg-card border border-border mx-auto flex items-center justify-center mb-6"
                  initial={{ opacity: 0, rotate: -15 }}
                  whileInView={{ opacity: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.2, duration: 0.4, ease: "easeOut" }}
                >
                  <step.icon className="w-8 h-8 text-foreground" />
                </motion.div>
                
                {/* Content */}
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link to="/signup">
            <PillButton variant="dark" size="lg" icon={<span>→</span>}>
              Get Your Protocol — $67
            </PillButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
