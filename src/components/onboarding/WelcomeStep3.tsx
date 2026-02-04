import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { SuppliesStatus } from "./WelcomeModal";

interface WelcomeStep3Props {
  suppliesStatus: SuppliesStatus;
  onComplete: () => void;
}

const suppliesChecklist = [
  { name: "Peptide vial(s)", specification: "As recommended in your course" },
  { name: "Bacteriostatic water", specification: "30ml vial with 0.9% benzyl alcohol" },
  { name: "Insulin syringes", specification: "1ml, 29-31 gauge, 1/2 inch" },
  { name: "Alcohol swabs", specification: "70% isopropyl prep pads" },
  { name: "Sharps container", specification: "For safe needle disposal" },
];

export function WelcomeStep3({ suppliesStatus, onComplete }: WelcomeStep3Props) {
  const [copied, setCopied] = useState(false);

  const handleCopyChecklist = () => {
    const text = suppliesChecklist
      .map(item => `☐ ${item.name} - ${item.specification}`)
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Checklist copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  if (suppliesStatus === 'have_them') {
    return (
      <div className="p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-bold mb-4 text-center">Perfect!</h2>
          <p className="text-muted-foreground text-center mb-6">
            Here's what happens next:
          </p>
          
          <div className="space-y-4 mb-8">
            {[
              { label: "TODAY", description: "Day 0: Welcome & understanding your plan" },
              { label: "DAYS 1-3", description: "Learning about your peptide & preparing" },
              { label: "DAY 4", description: "Reconstitution (I'll walk you through it)" },
              { label: "DAY 5", description: "Your first injection 💉", highlight: true },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex gap-4 p-3 rounded-lg ${item.highlight ? 'bg-primary/10 border border-primary/20' : 'bg-muted/50'}`}
              >
                <span className="text-xs font-bold text-primary w-20 flex-shrink-0">{item.label}</span>
                <span className="text-sm">{item.description}</span>
              </motion.div>
            ))}
          </div>
          
          <p className="text-sm text-muted-foreground text-center mb-6">
            One lesson per day. Never overwhelming.
          </p>
          
          <Button size="lg" onClick={onComplete} className="w-full">
            Start Day 0
          </Button>
        </motion.div>
      </div>
    );
  }

  if (suppliesStatus === 'this_week') {
    return (
      <div className="p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-bold mb-4 text-center">Perfect timing!</h2>
          <p className="text-muted-foreground text-center mb-6">
            While you wait, let's get you prepared:
          </p>
          
          <div className="space-y-4 mb-8">
            {[
              { label: "TODAY", description: "Day 0: Understanding your course" },
              { label: "TOMORROW", description: "Day 1: Deep dive into your peptide" },
              { label: "WHEN SUPPLIES ARRIVE", description: "Come back and we'll start reconstitution" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4 p-3 rounded-lg bg-muted/50"
              >
                <span className="text-xs font-bold text-primary w-32 flex-shrink-0">{item.label}</span>
                <span className="text-sm">{item.description}</span>
              </motion.div>
            ))}
          </div>
          
          <p className="text-sm text-muted-foreground text-center mb-6">
            I'll send you a reminder in 3 days to check in.
          </p>
          
          <Button size="lg" onClick={onComplete} className="w-full">
            Start Day 0
          </Button>
        </motion.div>
      </div>
    );
  }

  // need_to_order
  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-xl font-bold mb-4 text-center">No problem!</h2>
        <p className="text-muted-foreground text-center mb-6">
          Here's what you need:
        </p>
        
        <div className="rounded-xl border border-border bg-card p-4 mb-6">
          <h3 className="font-medium mb-3">Your Supplies Checklist</h3>
          <div className="space-y-3">
            {suppliesChecklist.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-3"
              >
                <div className="w-5 h-5 rounded border border-border flex items-center justify-center mt-0.5 flex-shrink-0">
                  <Check className="w-3 h-3 text-primary opacity-0" />
                </div>
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.specification}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground text-center mb-6">
          While you order, start with Days 0-2 (preparation).
          When supplies arrive, pick up at Day 3.
        </p>
        
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={handleCopyChecklist}
            className="flex-1"
          >
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? "Copied!" : "Copy Checklist"}
          </Button>
          <Button size="lg" onClick={onComplete} className="flex-1">
            Start Day 0
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
