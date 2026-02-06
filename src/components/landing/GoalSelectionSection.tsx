import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Flame, Dumbbell, Heart, Clock, Brain, Compass, Sparkles } from "lucide-react";
import { FloatingOrbs } from "./FloatingOrbs";

const goals = [
  {
    id: "fat-loss",
    icon: Flame,
    title: "Burn Fat",
    description: "Speed up your metabolism",
    gradient: "linear-gradient(135deg, hsl(25 90% 55%) 0%, hsl(15 85% 45%) 100%)",
  },
  {
    id: "muscle",
    icon: Dumbbell,
    title: "Build Muscle",
    description: "Recover faster, grow more",
    gradient: "linear-gradient(135deg, hsl(210 80% 55%) 0%, hsl(220 75% 45%) 100%)",
  },
  {
    id: "recovery",
    icon: Heart,
    title: "Heal Faster",
    description: "Recover from injuries",
    gradient: "linear-gradient(135deg, hsl(350 80% 55%) 0%, hsl(340 75% 45%) 100%)",
  },
  {
    id: "anti-aging",
    icon: Clock,
    title: "Slow Aging",
    description: "Feel younger, live better",
    gradient: "linear-gradient(135deg, hsl(270 70% 55%) 0%, hsl(280 65% 45%) 100%)",
  },
  {
    id: "cognitive",
    icon: Brain,
    title: "Sharpen Mind",
    description: "Better focus and memory",
    gradient: "linear-gradient(135deg, hsl(160 70% 45%) 0%, hsl(170 65% 35%) 100%)",
  },
  {
    id: "aesthetics",
    icon: Sparkles,
    title: "Look Better",
    description: "Improve skin and hair",
    gradient: "linear-gradient(135deg, hsl(330 70% 55%) 0%, hsl(350 65% 45%) 100%)",
  },
  {
    id: "beginner",
    icon: Compass,
    title: "Complete Beginner",
    description: "Not sure yet, start here",
    gradient: "linear-gradient(135deg, hsl(45 80% 50%) 0%, hsl(35 75% 40%) 100%)",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function GoalSelectionSection() {
  return (
    <section id="goals" className="relative py-32 md:py-40 overflow-hidden">
      {/* Background floating orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingOrbs variant="subtle" />
      </div>
      
      <div className="container px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            What's Your
            <br />
            Goal?
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            Pick what matters most. We'll show you exactly what's in your plan.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {goals.map((goal) => (
            <motion.div key={goal.id} variants={itemVariants}>
              <Link
                to={`/quiz?goal=${goal.id}`}
                className="block group"
              >
                <div className="relative overflow-hidden rounded-2xl border border-border bg-card hover:border-transparent transition-all duration-300 hover:shadow-2xl">
                  {/* Gradient background on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: goal.gradient }}
                  />
                  
                  {/* Content */}
                  <div className="relative p-8 md:p-10">
                    <div className="mb-6">
                      <goal.icon className="w-10 h-10 text-foreground group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-white transition-colors duration-300">
                      {goal.title}
                    </h3>
                    <p className="text-muted-foreground group-hover:text-white/80 transition-colors duration-300">
                      {goal.description}
                    </p>
                    
                    {/* Arrow indicator */}
                    <div className="mt-6 flex items-center gap-2 text-sm font-medium text-muted-foreground group-hover:text-white transition-colors duration-300">
                      <span>See Your Plan</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
