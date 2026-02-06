import { motion } from "framer-motion";
import { BookOpen, MessageCircle, FlaskConical } from "lucide-react";

const stats = [
  {
    icon: BookOpen,
    value: "500+",
    label: "Studies Analyzed",
  },
  {
    icon: MessageCircle,
    value: "45+",
    label: "Peptides Covered",
  },
  {
    icon: FlaskConical,
    value: "Feb 2026",
    label: "Last Updated",
  },
];

export function StatsBar() {
  return (
    <section className="py-8 md:py-12 bg-secondary/50">
      <div className="container px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 md:gap-16"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center gap-3 text-center sm:text-left"
            >
              <stat.icon className="w-5 h-5 text-muted-foreground" />
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-foreground">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
