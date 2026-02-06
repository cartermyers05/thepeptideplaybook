import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ClipboardList, Sparkles, MessageCircle } from "lucide-react";
import { PillButton } from "./PillButton";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Take the Quiz",
    description: "Answer 5 quick questions about your goals, experience, and health priorities.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Get Your Protocol",
    description: "Our AI builds a personalized peptide protocol based on your answers and 500+ research studies.",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Ask Anything",
    description: "Have questions? The AI coach is available 24/7 to answer with real citations, not generic advice.",
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
            From Confused to Confident in 3 Steps
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting started with peptides doesn't have to be complicated.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector line (hidden on mobile, shown on desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-[2px] bg-border" />
              )}
              
              <div className="text-center">
                {/* Step number badge */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg mb-6">
                  {step.number}
                </div>
                
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-card border border-border mx-auto flex items-center justify-center mb-6">
                  <step.icon className="w-8 h-8 text-foreground" />
                </div>
                
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
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link to="/quiz">
            <PillButton variant="dark" size="lg" icon={<span>→</span>}>
              Start Your Free Quiz
            </PillButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
