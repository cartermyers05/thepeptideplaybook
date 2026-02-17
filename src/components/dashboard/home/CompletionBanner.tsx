import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface CompletionBannerProps {
  dayNumber: number;
}

export function CompletionBanner({ dayNumber }: CompletionBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="mt-3 rounded-[14px] px-5 py-4 flex items-center gap-3"
      style={{ backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0" }}
    >
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: "linear-gradient(135deg, #34D399, #2DD4BF)" }}
      >
        <Check className="w-3.5 h-3.5 text-white" />
      </div>
      <div>
        <p className="text-base font-semibold" style={{ color: "#0A0A0A" }}>
          Day {dayNumber} complete
        </p>
        <p className="text-[13px]" style={{ color: "#4B5563" }}>
          Nice work. Back tomorrow.
        </p>
      </div>
    </motion.div>
  );
}
