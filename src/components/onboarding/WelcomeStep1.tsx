import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface WelcomeStep1Props {
  courseTitle: string;
  durationWeeks: number;
  onContinue: () => void;
}

export function WelcomeStep1({ courseTitle, durationWeeks, onContinue }: WelcomeStep1Props) {
  return (
    <div className="p-8 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="mb-6"
      >
        <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
          <Sparkles className="w-10 h-10 text-primary" />
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-3">
          Your {courseTitle} is Ready! 🎉
        </h2>
        
        <p className="text-muted-foreground mb-6">
          You just took a step most people are too afraid to take.
          Over the next {durationWeeks} weeks, I'll guide you through everything.
        </p>
        
        <p className="text-lg font-medium mb-8">
          You're not doing this alone.
        </p>
        
        <Button size="lg" onClick={onContinue} className="w-full">
          Let's Go
        </Button>
      </motion.div>
    </div>
  );
}
