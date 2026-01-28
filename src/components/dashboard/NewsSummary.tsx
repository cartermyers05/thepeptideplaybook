import { motion } from "framer-motion";
import { FileText } from "lucide-react";

interface NewsSummaryProps {
  summary: string;
}

export function NewsSummary({ summary }: NewsSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-8 p-6 bg-primary/5 rounded-xl border border-primary/20"
    >
      <h2 className="font-semibold mb-3 flex items-center gap-2">
        <FileText className="w-5 h-5 text-primary" />
        Summary
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        {summary}
      </p>
    </motion.div>
  );
}
