import { motion } from "framer-motion";

interface Step {
  number: string;
  title: string;
  description: string;
  details: string[];
}

const steps: Step[] = [
  {
    number: "01",
    title: "Pick Your Goal",
    description: "Choose from fat loss, muscle building, recovery, anti-aging, or cognitive enhancement. Your selection shapes everything that follows.",
    details: [
      "6 focused goal tracks, each with curated peptide protocols",
      "60-second quiz to understand your experience level",
      "No overwhelm. Just clarity on where to start",
    ],
  },
  {
    number: "02",
    title: "AI Builds Your Course",
    description: "In seconds, your personalized program is generated with specific peptides, research-backed dosing, and a day-by-day curriculum tailored to your goal.",
    details: [
      "Peptides selected specifically for your goal (not generic recommendations)",
      "Dosing based on published research, clearly explained",
      "42-84 day structured program generated instantly",
    ],
  },
  {
    number: "03",
    title: "Learn the Fundamentals",
    description: "Before you inject anything, master the essentials. Step-by-step walkthroughs for reconstitution, injection technique, and supply preparation.",
    details: [
      "Video-style guides for mixing your first vial",
      "Injection site maps and needle selection guidance",
      "Supply checklist so you know exactly what to order",
    ],
  },
  {
    number: "04",
    title: "Follow Daily Lessons",
    description: "Each day, a new lesson unlocks. No information overload. Just what you need to know today, delivered in bite-sized format.",
    details: [
      "Lessons unlock one day at a time (8-week program)",
      "Contextual guidance based on where you are in your cycle",
      "Action items to keep you on track",
    ],
  },
  {
    number: "05",
    title: "Track & Improve",
    description: "Build streaks, hit milestones, and ask your AI coach anything along the way. Watch your progress unfold day by day.",
    details: [
      "Daily check-ins to log progress",
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
    <section id="how-it-works" className="py-32 md:py-40">
      <div className="container px-4 md:px-8">
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
                      <span className="mt-2 h-1 w-1 rounded-full bg-primary/60 shrink-0" />
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
