import { motion } from "framer-motion";

const mono = "'JetBrains Mono', ui-monospace, monospace";
const heading = "'Outfit', sans-serif";

interface RestDayCardProps {
  nextDay: string | null;
}

export function RestDayCard({ nextDay }: RestDayCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-[16px] p-8 text-center border-2 border-dashed relative overflow-hidden"
      style={{
        borderColor: "hsl(0 0% 88%)",
        background: "radial-gradient(ellipse at 50% 30%, rgba(96,165,250,0.04), transparent 70%)",
      }}
    >
      {/* Animated dashed border effect */}
      <motion.div
        className="absolute inset-0 rounded-[16px] pointer-events-none"
        style={{
          border: "2px dashed transparent",
          backgroundImage: "linear-gradient(transparent, transparent), linear-gradient(90deg, rgba(96,165,250,0.15), rgba(167,139,250,0.15))",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <p className="text-xl font-bold text-foreground" style={{ fontFamily: heading }}>
        Rest Day
      </p>
      <p className="text-sm mt-1.5 text-muted-foreground">
        No compounds scheduled today.
      </p>
      {nextDay && (
        <p className="text-xs mt-3 text-muted-foreground" style={{ fontFamily: mono }}>
          Next scheduled: {nextDay}
        </p>
      )}
    </motion.div>
  );
}
