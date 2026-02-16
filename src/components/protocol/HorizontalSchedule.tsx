import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Props {
  schedule: Record<string, string[]>;
}

function normalizeCategoryColor(name: string): string {
  const t = name.toLowerCase();
  if (t.includes("bpc")) return "#A78BFA";
  if (t.includes("tb")) return "#A78BFA";
  if (t.includes("sema") || t.includes("tirz")) return "#F97316";
  if (t.includes("ghk")) return "#FB7185";
  if (t.includes("ipamorelin") || t.includes("cjc")) return "#22C55E";
  return "#3B82F6";
}

export function HorizontalSchedule({ schedule }: Props) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const todayIndex = new Date().getDay();
  const todayName = dayNames[todayIndex];
  // Map Monday=0..Sunday=6 for ordering
  const todayDayIndex = days.indexOf(todayName);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-sm font-semibold" style={{ color: "#0A0A0A", fontFamily: "Outfit, sans-serif" }}>
          Weekly Schedule
        </h3>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
        {days.map((day, i) => {
          const compounds = schedule[day] || [];
          const isToday = day === todayName;
          const isPast = i < todayDayIndex;

          return (
            <div
              key={day}
              className="flex-shrink-0 rounded-xl p-3 text-center space-y-1.5"
              style={{
                minWidth: 72,
                backgroundColor: isToday ? "rgba(167,139,250,0.06)" : "#FAFAFA",
                border: isToday ? "1px solid rgba(167,139,250,0.2)" : "1px solid #F3F4F6",
              }}
            >
              <p className="text-xs font-semibold" style={{ color: isToday ? "#7C3AED" : "#4B5563" }}>
                {day.slice(0, 3)}
              </p>
              {compounds.length > 0 ? (
                compounds.map((name) => (
                  <div key={name} className="flex items-center gap-1 justify-center">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: normalizeCategoryColor(name) }} />
                    <span className="text-[10px] font-medium truncate" style={{ color: "#4B5563", maxWidth: 50 }}>
                      {name.length > 7 ? name.slice(0, 6) + "…" : name}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-[10px]" style={{ color: "#D1D5DB" }}>Rest</p>
              )}
              {isPast && (
                <Check className="w-3 h-3 mx-auto" style={{ color: "#22C55E" }} />
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
