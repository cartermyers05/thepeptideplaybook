import { motion } from "framer-motion";
import { Lightbulb, Check } from "lucide-react";

interface KeyTakeawaysProps {
  takeaways: string[];
}

export function KeyTakeaways({ takeaways }: KeyTakeawaysProps) {
  if (!takeaways || takeaways.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-8 p-6 bg-primary/5 rounded-xl border border-primary/20"
    >
      <h2 className="font-semibold mb-4 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-primary" />
        Key Takeaways
      </h2>
      
      <ul className="space-y-3">
        {takeaways.map((takeaway, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-muted-foreground">{takeaway}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
