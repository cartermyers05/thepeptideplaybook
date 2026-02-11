import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MessageCircle, Database, Target, Calendar, Stethoscope, BookOpen } from "lucide-react";
import { PillButton } from "./PillButton";

const features = [
  {
    icon: MessageCircle,
    title: "AI Research Coach",
    description: "Ask any peptide question and get research-backed answers with study citations. Available 24/7.",
    gradient: "linear-gradient(135deg, hsl(173 55% 50%) 0%, hsl(180 60% 40%) 100%)",
  },
  {
    icon: Database,
    title: "45+ Peptide Database",
    description: "Every peptide with mechanisms, dosing research, safety profiles, and live FDA status.",
    gradient: "linear-gradient(145deg, hsl(200 50% 50%) 0%, hsl(220 55% 45%) 100%)",
  },
  {
    icon: Target,
    title: "Custom Protocols",
    description: "Tell the AI your goals and experience. Get a personalized protocol built in 60 seconds.",
    gradient: "linear-gradient(155deg, hsl(260 45% 55%) 0%, hsl(280 50% 45%) 100%)",
  },
  {
    icon: Calendar,
    title: "Daily Plan & Tracking",
    description: "See exactly what to take today, mark doses complete, and track your progress week by week.",
    gradient: "linear-gradient(165deg, hsl(340 45% 55%) 0%, hsl(320 50% 45%) 100%)",
  },
  {
    icon: Stethoscope,
    title: "Doctor Scripts",
    description: "Pre-written conversation guides so you can talk to your provider about peptides confidently.",
    gradient: "linear-gradient(135deg, hsl(30 60% 50%) 0%, hsl(15 55% 45%) 100%)",
  },
  {
    icon: BookOpen,
    title: "30+ Research Guides",
    description: "In-depth breakdowns of peptide science in plain English. Beginner to advanced.",
    gradient: "linear-gradient(145deg, hsl(142 50% 45%) 0%, hsl(160 55% 40%) 100%)",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function WhatsInsideSection() {
  return (
    <section id="features" className="py-20 md:py-28 bg-secondary/50">
      <div className="container px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Everything Inside The Peptide Playbook
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            All of this. One payment. Lifetime access.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              {/* Card with gradient top bar */}
              <div className="relative bg-card rounded-2xl overflow-hidden border border-border hover:border-muted-foreground/30 transition-all duration-300 hover:shadow-xl h-full">
                {/* Gradient bar at top */}
                <div 
                  className="h-2"
                  style={{ background: feature.gradient }}
                />
                
                {/* Content */}
                <div className="p-8">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-foreground transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

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
              Get Your Full Blueprint — $67
            </PillButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
