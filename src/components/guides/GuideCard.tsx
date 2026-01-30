import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface GuideCardProps {
  title: string;
  description: string;
  href: string;
  index?: number;
}

export function GuideCard({ title, description, href, index = 0 }: GuideCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={href} className="block group">
        <div className="glass-card p-6 h-full transition-all duration-300 hover:shadow-glow">
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
            {description}
          </p>
          <div className="flex items-center text-primary text-sm font-medium">
            <span>Read Guide</span>
            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
