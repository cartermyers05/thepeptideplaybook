import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { extractKeyPoints, sanitizeNewsContent } from "@/lib/contentSanitizer";
import { Badge } from "@/components/ui/badge";

interface NewsSummaryProps {
  summary: string;
}

export function NewsSummary({ summary }: NewsSummaryProps) {
  const keyPoints = extractKeyPoints(summary);
  const cleanedSummary = sanitizeNewsContent(summary);
  
  // If we have distinct key points, show as bullets; otherwise show as paragraph
  const showAsBullets = keyPoints.length >= 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-8 relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-primary/5"
    >
      {/* Gradient accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/60 to-primary/30" />
      
      <div className="p-6 pl-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-0.5 bg-primary/60" />
          <h2 className="font-semibold text-lg">Key Takeaways</h2>
          <Badge variant="outline" className="text-xs bg-primary/5 border-primary/20 text-primary">
            AI Summary
          </Badge>
        </div>
        
        {showAsBullets ? (
          <ul className="space-y-3 ml-1">
            {keyPoints.map((point, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-muted-foreground leading-relaxed">{point}</span>
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground leading-relaxed ml-1">
            {cleanedSummary}
          </p>
        )}
      </div>
    </motion.div>
  );
}
