import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useUserProtocol, Compound } from "@/hooks/useUserProtocol";
import { Skeleton } from "@/components/ui/skeleton";
import { FlaskConical, ArrowRight, AlertTriangle, Shield } from "lucide-react";
import { ProtocolProgressRing } from "@/components/protocol/ProtocolProgressRing";
import { ProtocolThisWeekCard } from "@/components/protocol/ProtocolThisWeekCard";
import { QuickToolsRow } from "@/components/protocol/QuickToolsRow";
import { HorizontalSchedule } from "@/components/protocol/HorizontalSchedule";
import { CompactTimeline } from "@/components/protocol/CompactTimeline";
import { ProtocolCompoundCard } from "@/components/protocol/ProtocolCompoundCard";
import { StackSynergyCard } from "@/components/protocol/StackSynergyCard";

export default function Protocol() {
  const navigate = useNavigate();
  const { protocol, isLoading, currentWeek, daysElapsed, daysRemaining, progressPercent, todayCompounds, todayName } = useUserProtocol();

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6 py-6">
          <Skeleton className="h-40 w-full rounded-2xl bg-secondary" />
          <Skeleton className="h-48 w-full rounded-2xl bg-secondary" />
        </div>
      </DashboardLayout>
    );
  }

  if (!protocol) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <FlaskConical className="w-16 h-16 mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-2 text-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>No Active Protocol</h1>
          <p className="mb-6 max-w-md text-muted-foreground">
            Chat with your AI coach to build a personalized protocol.
          </p>
          <button
            onClick={() => navigate("/dashboard/coach")}
            className="px-8 py-3 rounded-full font-semibold transition-all hover:opacity-90 bg-foreground text-background"
            style={{ minHeight: 48 }}
          >
            Build My Protocol <ArrowRight className="w-4 h-4 inline ml-1" />
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="py-4 md:py-6 space-y-5">
        {/* ── 1. Animated Hero with Progress Ring ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl p-5 md:p-6 relative overflow-hidden bg-card border border-border"
        >
          <div className="flex items-center gap-5">
            <ProtocolProgressRing
              percentage={progressPercent}
              currentWeek={currentWeek || 1}
              totalWeeks={protocol.cycle_length_weeks}
            />

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium"
                  style={{
                    backgroundColor: protocol.status === "active" ? "rgba(34,197,94,0.1)" : "rgba(245,158,11,0.1)",
                    color: protocol.status === "active" ? "#22C55E" : "#F59E0B",
                    border: `1px solid ${protocol.status === "active" ? "rgba(34,197,94,0.2)" : "rgba(245,158,11,0.2)"}`,
                  }}
                >
                  {protocol.status === "active" && (
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#22C55E" }} />
                  )}
                  {protocol.status === "active" ? "Active" : protocol.status}
                </span>
                <span className="text-xs text-muted-foreground">Cycle {protocol.cycle_number}</span>
              </div>
              <h1
                className="text-lg md:text-xl font-bold tracking-tight truncate text-foreground"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {protocol.protocol_name}
              </h1>

              <div className="flex flex-wrap gap-1.5 mt-2.5">
                <StatPill label="Day" value={String(daysElapsed)} />
                <StatPill label="Left" value={`${daysRemaining}d`} />
                <StatPill label="Done" value={`${progressPercent}%`} accent />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── 2. This Week Spotlight ── */}
        <ProtocolThisWeekCard
          currentWeek={currentWeek || 1}
          weeklyExpectations={protocol.weekly_expectations as { week: number; description: string }[] | null}
          todayCompounds={todayCompounds}
          todayName={todayName}
        />

        {/* ── 3. Your Stack (Always Visible) ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>
            <FlaskConical className="w-4 h-4" style={{ color: "#F97316" }} />
            Your Stack
          </h3>
          {(protocol.compounds as Compound[]).length > 1 && (
            <StackSynergyCard compounds={protocol.compounds as Compound[]} />
          )}
          <div className="space-y-3">
            {(protocol.compounds as Compound[]).map((compound, i) => (
              <ProtocolCompoundCard key={i} compound={compound} index={i} />
            ))}
          </div>
        </motion.div>

        {/* ── 4. Quick Tools ── */}
        <QuickToolsRow
          compounds={protocol.compounds as Compound[]}
          doctorScript={protocol.doctor_script}
        />

        {/* ── 5. Horizontal Schedule ── */}
        <HorizontalSchedule schedule={protocol.schedule as Record<string, string[]>} />

        {/* ── 6. Compact Timeline ── */}
        {protocol.weekly_expectations && (
          <CompactTimeline
            expectations={protocol.weekly_expectations as { week: number; description: string }[]}
            currentWeek={currentWeek || 1}
          />
        )}

        {/* ── 7. Safety Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="space-y-3"
        >
          {protocol.risk_assessment && (
            <div className="rounded-xl p-4 bg-card border border-border border-l-[3px]" style={{ borderLeftColor: "#F59E0B" }}>
              <p className="font-semibold text-sm mb-1.5 flex items-center gap-2" style={{ color: "#D97706" }}>
                <AlertTriangle className="w-4 h-4" /> Risk Assessment
              </p>
              <p className="text-sm text-muted-foreground">{protocol.risk_assessment}</p>
            </div>
          )}
          <div className="rounded-xl p-4 bg-card border border-border border-l-[3px]" style={{ borderLeftColor: "#EF4444" }}>
            <p className="font-semibold text-xs mb-1 flex items-center gap-1.5" style={{ color: "#DC2626" }}>
              <Shield className="w-3.5 h-3.5" /> When to stop
            </p>
            <p className="text-xs text-muted-foreground">
              Stop all compounds and contact a healthcare provider if you experience: severe allergic reaction, chest pain, severe headache with vision changes, signs of infection at injection site, or any medical emergency.
            </p>
          </div>
        </motion.div>

        {/* ── 8. Bottom CTAs ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.4 }}
          className="space-y-3 pt-2"
        >
          <button
            onClick={() => navigate("/dashboard/coach")}
            className="w-full px-8 py-3 rounded-full font-semibold text-[15px] transition-all hover:opacity-90 bg-foreground text-background"
            style={{ minHeight: 48 }}
          >
            Ask Coach About This Protocol
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full px-8 py-3 rounded-full font-semibold text-[15px] transition-all hover:opacity-80 bg-card border border-border text-muted-foreground"
            style={{ minHeight: 48 }}
          >
            Back to Dashboard
          </button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

function StatPill({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className={`px-2.5 py-1 rounded-full flex items-center gap-1 border ${
        accent ? "border-border" : "border-border bg-secondary"
      }`}
      style={accent ? { background: "linear-gradient(135deg, rgba(249,115,22,0.06), rgba(167,139,250,0.06))" } : undefined}
    >
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="text-xs font-bold text-foreground" style={{ fontFamily: "JetBrains Mono, monospace" }}>
        {value}
      </span>
    </div>
  );
}

