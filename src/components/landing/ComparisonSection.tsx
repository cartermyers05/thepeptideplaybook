import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const comparisonData = [
  { 
    feature: "Price", 
    competitor: "$299 - $1,999", 
    us: "$29/month",
    usHighlight: true,
  },
  { 
    feature: "Personalization", 
    competitor: "Generic protocols", 
    us: "Built for YOUR goals",
    usHighlight: true,
  },
  { 
    feature: "Support", 
    competitor: "Watch videos alone", 
    us: "AI coach 24/7",
    usHighlight: true,
  },
  { 
    feature: "Updates", 
    competitor: "Static content", 
    us: "Always current",
    usHighlight: false,
  },
  { 
    feature: "Format", 
    competitor: "10+ hours of video", 
    us: "Bite-sized daily guidance",
    usHighlight: false,
  },
  { 
    feature: "Refund", 
    competitor: "\"No refunds\"", 
    us: "Cancel anytime",
    usHighlight: true,
  },
];

export function ComparisonSection() {
  return (
    <section id="comparison" className="py-20 md:py-28">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Why pay $2,000 when you can pay $29?
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-card border rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 bg-secondary/50 border-b">
              <div className="p-4 text-sm font-medium text-muted-foreground">Feature</div>
              <div className="p-4 text-sm font-medium text-muted-foreground text-center border-l">Other Courses</div>
              <div className="p-4 text-sm font-medium text-primary text-center border-l bg-primary/5">Peptide Playbook</div>
            </div>

            {/* Rows */}
            {comparisonData.map((row, index) => (
              <div 
                key={index} 
                className={`grid grid-cols-3 ${index !== comparisonData.length - 1 ? 'border-b' : ''}`}
              >
                <div className="p-4 text-sm font-medium">{row.feature}</div>
                <div className="p-4 text-sm text-muted-foreground text-center border-l flex items-center justify-center gap-2">
                  <X className="w-4 h-4 text-destructive/60" />
                  <span>{row.competitor}</span>
                </div>
                <div className={`p-4 text-sm text-center border-l flex items-center justify-center gap-2 ${row.usHighlight ? 'bg-primary/5 font-medium' : ''}`}>
                  <Check className="w-4 h-4 text-primary" />
                  <span>{row.us}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
