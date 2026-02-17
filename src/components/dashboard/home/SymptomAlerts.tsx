import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, Activity, Scale } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { DailyLog } from "@/hooks/useDailyLog";

const mono = "'JetBrains Mono', ui-monospace, monospace";

interface SymptomAlert {
  id: string;
  icon: typeof AlertTriangle;
  message: string;
  linkTo?: string;
  linkText?: string;
}

function detectAlerts(logs: DailyLog[]): SymptomAlert[] {
  if (logs.length < 3) return []; // Need enough data

  const alerts: SymptomAlert[] = [];
  const recent14 = logs.slice(-14);

  // Injection site reactions
  const siteReactions = recent14.filter(l => l.injection_site_reaction && l.injection_site_reaction !== "none").length;
  if (siteReactions >= 3) {
    alerts.push({
      id: "injection-site",
      icon: AlertTriangle,
      message: `You've reported injection site reactions ${siteReactions} times in the last 2 weeks. Try rotating to a different site.`,
      linkTo: "/guides/peptide-injection-sites",
      linkText: "View injection site guide →",
    });
  }

  // GI issues pattern
  const giIssues = recent14.filter(l => l.gi_issues && l.gi_issues !== "none").length;
  if (giIssues >= 3) {
    alerts.push({
      id: "gi-issues",
      icon: Activity,
      message: `GI issues reported on ${giIssues} of your last ${recent14.length} logging days. Taking peptides with food or splitting doses may help.`,
    });
  }

  // Weight plateau (14+ days, < 0.5 lb change)
  const weightLogs = recent14.filter(l => l.weight_lbs != null);
  if (weightLogs.length >= 4) {
    const first = weightLogs[0].weight_lbs!;
    const last = weightLogs[weightLogs.length - 1].weight_lbs!;
    if (Math.abs(last - first) < 0.5) {
      alerts.push({
        id: "weight-plateau",
        icon: Scale,
        message: "Weight has been stable for 2+ weeks — this is normal and often temporary. Plateaus are common before the next phase of change.",
      });
    }
  }

  // Energy dips on missed days
  const recent7 = logs.slice(-7);
  const missedDaysEnergy = recent7.filter(l => {
    const actions = l.actions_completed || {};
    const missed = Object.values(actions).some(v => !v);
    return missed && l.energy_rating != null && l.energy_rating < 5;
  });
  if (missedDaysEnergy.length >= 2) {
    alerts.push({
      id: "energy-compliance",
      icon: Activity,
      message: "Energy dipped below 5 on days with missed doses. Consistent timing may help maintain steadier levels.",
    });
  }

  return alerts;
}

interface Props {
  allLogs: DailyLog[];
}

export function SymptomAlerts({ allLogs }: Props) {
  const navigate = useNavigate();
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const alerts = useMemo(() => detectAlerts(allLogs), [allLogs]);
  const visibleAlerts = alerts.filter(a => !dismissed.has(a.id));

  if (visibleAlerts.length === 0) return null;

  return (
    <div className="space-y-2">
      <AnimatePresence>
        {visibleAlerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-[16px] overflow-hidden bg-white"
            style={{
              boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
              border: "1px solid rgba(251,191,36,0.15)",
              background: "linear-gradient(135deg, rgba(251,191,36,0.04), rgba(251,113,133,0.03))",
            }}
          >
            <div className="p-3 flex items-start gap-2.5">
              <alert.icon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#FBBF24" }} />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-foreground leading-relaxed">{alert.message}</p>
                {alert.linkTo && (
                  <button
                    onClick={() => navigate(alert.linkTo!)}
                    className="text-[11px] font-medium mt-1 hover:underline"
                    style={{ color: "#F97316", fontFamily: mono }}
                  >
                    {alert.linkText}
                  </button>
                )}
              </div>
              <button
                onClick={() => setDismissed(prev => new Set([...prev, alert.id]))}
                className="p-1 rounded-full hover:bg-muted/50 transition-colors flex-shrink-0"
              >
                <X className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
