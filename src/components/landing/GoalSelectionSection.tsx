import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Flame, Dumbbell, Heart, Clock, Brain, Compass } from "lucide-react";

const goals = [
  {
    id: "fat-loss",
    icon: Flame,
    title: "Burn Fat",
    description: "Optimize metabolism and body composition",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    id: "muscle",
    icon: Dumbbell,
    title: "Build Muscle",
    description: "Accelerate recovery and growth",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    id: "recovery",
    icon: Heart,
    title: "Heal Faster",
    description: "Recover from injury",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    id: "anti-aging",
    icon: Clock,
    title: "Slow Aging",
    description: "Longevity and vitality",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    id: "cognitive",
    icon: Brain,
    title: "Sharpen Mind",
    description: "Focus, memory, clarity",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    id: "beginner",
    icon: Compass,
    title: "Complete Beginner",
    description: "Not sure yet, start simple",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
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
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

export function GoalSelectionSection() {
  return (
    <section id="goals" className="py-20 md:py-28 bg-muted/30">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Pick Your Goal
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose what matters most to you, and we'll build your personalized course
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto"
        >
          {goals.map((goal) => (
            <motion.div key={goal.id} variants={itemVariants}>
              <Link
                to={`/course/${goal.id}`}
                className="block p-6 rounded-xl bg-background border-2 border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-200 group"
              >
                <div className={`w-14 h-14 mb-4 rounded-xl ${goal.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <goal.icon className={`w-7 h-7 ${goal.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                  {goal.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {goal.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
