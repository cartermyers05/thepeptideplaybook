import { motion } from "framer-motion";
import { GridPattern } from "./GridPattern";

interface Step {
  number: string;
  title: string;
  description: string;
  details: string[];
}

const steps: Step[] = [
  {
    number: "01",
    title: "Tell Us Your Goal",
    description: "Pick what you want: burn fat, build muscle, recover faster, or slow aging. Takes 60 seconds.",
    details: [
      "6 focused goal tracks to choose from",
      "Quick quiz to understand your experience level",
      "No overwhelm. Just clarity on where to start",
    ],
  },
  {
    number: "02",
    title: "We Build Your Plan",
    description: "You get a custom plan with the right peptides for your goal. Based on real research, not random forums.",
    details: [
      "Peptides chosen specifically for your goal",
      "Dosing based on published research, explained simply",
      "42-84 day program created just for you",
    ],
  },
  {
    number: "03",
    title: "Learn How to Do It Safely",
    description: "Step-by-step guides show you exactly how to mix and use peptides. No guessing.",
    details: [
      "Visual guides for mixing your first vial",
      "Clear instructions for where and how to inject",
      "Supply checklist so you know what to order",
    ],
  },
  {
    number: "04",
    title: "Follow Along Day by Day",
    description: "One lesson a day. Never overwhelming. Just what you need to know today.",
    details: [
      "Lessons unlock one at a time (8-week program)",
      "Guidance based on where you are in your cycle",
      "Simple action items to keep you on track",
    ],
  },
  {
    number: "05",
    title: "Ask Questions Anytime",
    description: "Stuck? Ask the AI coach anything. It knows 500+ studies and your specific plan.",
    details: [
      "Daily check-ins to track progress",
      "Streak tracking and milestone celebrations",
      "24/7 AI coach for questions anytime",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background grid pattern */}
      <GridPattern variant="dots" className="opacity-50" />
      
      <div className="container px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            How It
            <br />
            Works
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16 md:space-y-24"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="grid md:grid-cols-12 gap-6 md:gap-12 items-start"
            >
              {/* Step number */}
              <div className="md:col-span-2">
                <span className="text-6xl md:text-7xl font-bold text-muted-foreground/30">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div className="md:col-span-10 md:border-t border-border pt-0 md:pt-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  {step.title}
                </h3>
                <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-6">
                  {step.description}
                </p>
                
                {/* Detail bullets */}
                <div className="space-y-2">
                  {step.details.map((detail, detailIndex) => (
                    <div 
                      key={detailIndex} 
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <span className="mt-2 h-1 w-1 rounded-full bg-muted-foreground/40 shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
