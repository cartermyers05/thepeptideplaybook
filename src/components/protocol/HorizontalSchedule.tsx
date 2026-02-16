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
  const todayDayIndex = days.indexOf(todayName);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-sm font-semibold text-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>
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
              className="flex-shrink-0 rounded-xl p-3 text-center space-y-1.5 bg-card border transition-all duration-200"
              style={{
                minWidth: 72,
                borderColor: isToday ? "transparent" : "hsl(var(--border))",
                backgroundImage: isToday
                  ? "linear-gradient(hsl(var(--card)), hsl(var(--card))), linear-gradient(135deg, #F97316, #FB7185, #A78BFA)"
                  : undefined,
                backgroundOrigin: isToday ? "border-box" : undefined,
                backgroundClip: isToday ? "padding-box, border-box" : undefined,
                borderWidth: isToday ? 1.5 : 1,
              }}
            >
              <p className={`text-xs font-semibold ${isToday ? "text-foreground" : "text-muted-foreground"}`}>
                {day.slice(0, 3)}
              </p>
              {compounds.length > 0 ? (
                compounds.map((name) => (
                  <div key={name} className="flex items-center gap-1 justify-center">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: normalizeCategoryColor(name) }} />
                    <span className="text-[10px] font-medium truncate text-muted-foreground" style={{ maxWidth: 50 }}>
                      {name.length > 7 ? name.slice(0, 6) + "…" : name}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-[10px] text-muted-foreground/50">Rest</p>
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
