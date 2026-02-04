import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, Mail, ArrowRight } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

// Typing dots animation component
function TypingDots() {
  return (
    <span className="inline-flex gap-0.5 ml-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1 h-1 rounded-full bg-muted-foreground"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </span>
  );
}

// AI Chatbot Preview Card
export function ChatPreviewCard({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className={cn(
        "relative overflow-hidden rounded-3xl bg-card/95 backdrop-blur border border-border shadow-xl cursor-default",
        className
      )}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
            <span className="text-[10px] font-bold text-primary-foreground">PP</span>
          </div>
          <span className="text-sm font-medium">Peptide Playbook AI</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        </div>
      </div>

      {/* Chat content */}
      <div className="p-4 space-y-3">
        {/* User message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.3, duration: 0.4 }}
          className="flex justify-end"
        >
          <div className="bg-primary text-primary-foreground text-xs px-3 py-2 rounded-xl rounded-br-sm max-w-[80%]">
            What's the best peptide for recovery?
          </div>
        </motion.div>

        {/* AI response with typing */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.6, duration: 0.4 }}
          className="flex gap-2"
        >
          <div className="w-5 h-5 rounded-md bg-primary flex-shrink-0 flex items-center justify-center">
            <span className="text-[8px] font-bold text-primary-foreground">PP</span>
          </div>
          <div className="bg-muted rounded-xl rounded-bl-sm px-3 py-2 text-xs leading-relaxed">
            Based on research, <span className="font-semibold">BPC-157</span> and{" "}
            <span className="font-semibold">TB-500</span> show the most promise for tissue repair
            <TypingDots />
          </div>
        </motion.div>
      </div>

      {/* Category chips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.9 }}
        className="absolute bottom-3 left-4 flex gap-1.5"
      >
        {["Recovery", "Compare", "FDA Status"].map((chip) => (
          <span
            key={chip}
            className="text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary font-medium"
          >
            {chip}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}

// Course Personalization Preview Card
export function CoursePreviewCard({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const goals = [
    { label: "Burn Fat", selected: true },
    { label: "Build Muscle", selected: false },
    { label: "Heal Faster", selected: false },
  ];

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className={cn(
        "relative overflow-hidden rounded-3xl bg-card/95 backdrop-blur border border-border shadow-xl p-4 cursor-default",
        className
      )}
    >
      <p className="text-xs font-semibold text-muted-foreground mb-3">Your Goal</p>

      <div className="space-y-2 mb-4">
        {goals.map((goal, i) => (
          <motion.div
            key={goal.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.2 + i * 0.1 }}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors",
              goal.selected
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            {goal.selected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: delay + 0.5, type: "spring" }}
              >
                <Check className="w-3 h-3" />
              </motion.div>
            )}
            <span>{goal.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Progress section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.6 }}
        className="space-y-2"
      >
        <p className="text-[10px] text-muted-foreground">Building your course...</p>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "65%" }}
            transition={{ delay: delay + 0.8, duration: 1.5, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

// Newsletter Digest Preview Card
export function DigestPreviewCard({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const highlights = [
    "New BPC-157 study shows enhanced...",
    "FDA updates guidance on peptide...",
    "Semaglutide weight loss data...",
    "TB-500 muscle repair research...",
  ];

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className={cn(
        "relative overflow-hidden rounded-3xl bg-card/95 backdrop-blur border border-border shadow-xl p-4 cursor-default",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
          <Mail className="w-3 h-3 text-primary" />
        </div>
        <span className="text-xs font-semibold">Weekly Digest</span>
      </div>

      <p className="text-[10px] text-muted-foreground mb-2">This Week's Research</p>

      {/* Scrolling highlights */}
      <div className="h-16 overflow-hidden relative">
        <motion.div
          animate={{ y: [0, -64, -64, 0] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.4, 0.6, 1],
          }}
          className="space-y-1.5"
        >
          {highlights.map((highlight, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.2 + i * 0.1 }}
              className="text-[11px] text-foreground leading-relaxed"
            >
              • {highlight}
            </motion.p>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.6 }}
        className="flex items-center justify-between mt-3 pt-2 border-t border-border"
      >
        <span className="text-[10px] text-muted-foreground">12 Sources</span>
        <span className="text-[10px] text-primary font-medium flex items-center gap-1">
          Read <ArrowRight className="w-2.5 h-2.5" />
        </span>
      </motion.div>
    </motion.div>
  );
}
