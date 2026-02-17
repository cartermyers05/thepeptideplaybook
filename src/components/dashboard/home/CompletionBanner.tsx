import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface CompletionBannerProps {
  dayNumber: number;
}

export function CompletionBanner({ dayNumber }: CompletionBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, type: "spring" }}
      className="mt-3 rounded-[16px] px-5 py-4 flex items-center gap-3.5"
      style={{
        backgroundColor: "rgba(52,211,153,0.08)",
        border: "1px solid rgba(52,211,153,0.12)",
      }}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: "#34D399" }}
      >
        <Check className="w-4 h-4 text-white" />
      </div>
      <div>
        <p className="text-[15px] font-bold" style={{ color: "#EBEBF0", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Day {dayNumber} Complete
        </p>
        <p className="text-[13px]" style={{ color: "#8A8A9A" }}>
          Consistency builds results. See you tomorrow.
        </p>
      </div>
    </motion.div>
  );
}
