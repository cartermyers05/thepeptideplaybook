import { motion } from "framer-motion";
import { Target, ListChecks, MessageCircle } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Personalized Protocol",
    points: [
      "Answer 5 questions about your goals",
      "Get a complete protocol: peptides, dosing, timing, cycle length",
      "Not generic advice. Built for YOU",
    ],
  },
  {
    icon: ListChecks,
    title: "Step-by-Step Guidance",
    points: [
      "Day-by-day instructions through your cycle",
      "Reconstitution walkthrough with checkpoints",
      "Injection guide for complete beginners",
    ],
  },
  {
    icon: MessageCircle,
    title: "AI Coach On Call",
    points: [
      "Ask questions anytime, get instant answers",
      "Trained on 500+ peptide studies",
      "Like having an expert in your pocket",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const }
  },
};

export function CourseFeatures() {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium text-primary tracking-wide uppercase mb-4">
            What You Get
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Your Personal Peptide Course
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-card border rounded-2xl p-6 hover:border-muted-foreground/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <ul className="space-y-3">
                {feature.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
