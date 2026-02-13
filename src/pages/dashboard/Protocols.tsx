import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useActiveProtocolProgress } from "@/hooks/useActiveProtocolProgress";
import { weeklyBriefs, isDoseChangeWeek } from "@/data/weeklyBriefs";
import { Check, Lock, ChevronDown, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/* ───── Week Navigation Pills ───── */
function WeekNav({ currentWeek, selectedWeek, onSelect }: {
  currentWeek: number;
  selectedWeek: number;
  onSelect: (w: number) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    const pill = scrollRef.current.children[currentWeek - 1] as HTMLElement | undefined;
    if (pill) {
      pill.scrollIntoView({ inline: "center", behavior: "smooth", block: "nearest" });
    }
  }, [currentWeek]);

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto pb-2 no-scrollbar"
      style={{ scrollbarWidth: "none" }}
    >
      {Array.from({ length: 20 }, (_, i) => i + 1).map((w) => {
        const isCurrent = w === selectedWeek;
        const isCompleted = w < currentWeek;
        const isFuture = w > currentWeek;
        const hasDoseChange = isDoseChangeWeek(w);

        return (
          <button
            key={w}
            disabled={isFuture}
            onClick={() => !isFuture && onSelect(w)}
            className={cn(
              "relative shrink-0 h-9 px-3.5 rounded-full text-[13px] font-medium transition-all",
              isCurrent && "text-white font-semibold shadow-sm",
              isCompleted && "border cursor-pointer",
              isFuture && "cursor-default"
            )}
            style={{
              backgroundColor: isCurrent
                ? "#F97316"
                : isCompleted
                ? "rgba(16,185,129,0.12)"
                : "#F5F5F5",
              borderColor: isCompleted ? "rgba(16,185,129,0.25)" : undefined,
              color: isCurrent
                ? "#FFFFFF"
                : isCompleted
                ? "#10B981"
                : "#D1D5DB",
              minWidth: 44,
              minHeight: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            W{w}
            {hasDoseChange && (
              <span
                className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full"
                style={{ backgroundColor: "#F59E0B" }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ───── Content Renderer ───── */
function BriefContent({ week, isCurrent }: { week: number; isCurrent: boolean }) {
  const brief = weeklyBriefs[week];
  if (!brief) return null;

  const renderTextWithBullets = (text: string) => {
    const lines = text.split("\n");
    const elements: React.ReactNode[] = [];
    let insetItems: string[] = [];

    const flushInset = () => {
      if (insetItems.length > 0) {
        elements.push(
          <div
            key={`inset-${elements.length}`}
            className="rounded-xl p-4 my-3 space-y-2"
            style={{ backgroundColor: "#F9F9F9" }}
          >
            {insetItems.map((item, idx) => (
              <div key={idx} className="flex gap-2 items-start text-[15px] leading-relaxed" style={{ color: "#374151" }}>
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#F97316" }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        );
        insetItems = [];
      }
    };

    lines.forEach((line, i) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("•")) {
        insetItems.push(trimmed.replace(/^•\s*/, ""));
      } else {
        flushInset();
        if (trimmed === "") {
          elements.push(<div key={i} className="h-3" />);
        } else {
          elements.push(
            <p key={i} className="text-[15px] leading-[1.7]" style={{ color: "#374151" }}>
              {trimmed}
            </p>
          );
        }
      }
    });
    flushInset();
    return elements;
  };

  const bgColor = isCurrent ? "#FFF7ED" : "#FFFFFF";
  const shadow = isCurrent
    ? "0 4px 12px rgba(249,115,22,0.08)"
    : "0 1px 3px rgba(0,0,0,0.08)";

  return (
    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: bgColor, boxShadow: shadow }}>
      {/* Header */}
      <div className="p-5 md:p-8">
        <div className="flex items-start justify-between gap-3 mb-1">
          <div>
            <span className="font-mono text-xs font-semibold tracking-wider" style={{ color: "#F97316", letterSpacing: "0.05em" }}>
              WEEK {week}
            </span>
            <p className="text-[13px] mt-0.5" style={{ color: "#6B7280" }}>{brief.phaseName}</p>
            <h2 className="text-2xl md:text-[32px] font-bold mt-1" style={{ color: "#111827" }}>
              {brief.title}
            </h2>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <span
              className="px-3 py-1 rounded-full font-mono text-[13px]"
              style={{
                backgroundColor: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(16,185,129,0.25)",
                color: "#10B981",
              }}
            >
              {brief.dose}
            </span>
            {brief.doseChange && (
              <span
                className="px-2.5 py-0.5 rounded-full text-[12px]"
                style={{
                  backgroundColor: "rgba(245,158,11,0.08)",
                  border: "1px solid rgba(245,158,11,0.25)",
                  color: "#F59E0B",
                }}
              >
                ⚠️ Dose increase
              </span>
            )}
          </div>
        </div>

        {/* Dose alert banner */}
        {brief.doseChange && brief.doseAlertMessage && (
          <div
            className="rounded-xl p-3.5 mt-4 flex items-start gap-3"
            style={{
              backgroundColor: "#FEF3C7",
              border: "1px solid rgba(245,158,11,0.25)",
            }}
          >
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "#92400E" }} />
            <p className="text-[14px] leading-relaxed" style={{ color: "#92400E" }}>
              {brief.doseAlertMessage}
            </p>
          </div>
        )}
      </div>

      {/* Blocks */}
      <div className="px-5 md:px-8 pb-6 md:pb-8 space-y-0">
        {/* Block 1 */}
        <div className="py-6" style={{ borderTop: "1px solid #E5E7EB" }}>
          <h3 className="flex items-center gap-2 font-bold text-[17px] mb-3" style={{ color: "#111827" }}>
            🎯 What to Expect This Week
          </h3>
          <div className="space-y-0">{renderTextWithBullets(brief.whatToExpect)}</div>
        </div>

        {/* Block 2 */}
        <div className="py-6" style={{ borderTop: "1px solid #E5E7EB" }}>
          <h3 className="flex items-center gap-2 font-bold text-[17px] mb-3" style={{ color: "#111827" }}>
            🥗 Your Nutrition This Week
          </h3>
          <div className="space-y-0">{renderTextWithBullets(brief.nutrition)}</div>
        </div>

        {/* Block 3 */}
        <div className="py-6" style={{ borderTop: "1px solid #E5E7EB" }}>
          <h3 className="flex items-center gap-2 font-bold text-[17px] mb-3" style={{ color: "#111827" }}>
            💪 Your Movement This Week
          </h3>
          <div className="space-y-0">{renderTextWithBullets(brief.movement)}</div>
        </div>

        {/* Block 4 - Progress */}
        <div className="py-6" style={{ borderTop: "1px solid #E5E7EB" }}>
          <h3 className="flex items-center gap-2 font-bold text-[17px] mb-4" style={{ color: "#111827" }}>
            📊 Progress Check
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {brief.progressStats.map((stat, i) => (
              <div
                key={i}
                className="rounded-xl p-4 text-center"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}
              >
                <div className="text-[28px] font-bold" style={{ color: "#F97316" }}>{stat.value}</div>
                <div className="text-[12px] mt-1" style={{ color: "#6B7280" }}>{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="text-[14px] italic mt-4" style={{ color: "#6B7280" }}>
            {brief.progressNote}
          </p>
        </div>

        {/* Block 5 - Safety */}
        <div className="py-6" style={{ borderTop: "1px solid #E5E7EB" }}>
          <h3 className="flex items-center gap-2 font-bold text-[17px] mb-4" style={{ color: "#111827" }}>
            🚨 When to Be Concerned
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl p-4" style={{ borderLeft: "4px solid #10B981", backgroundColor: "#F9F9F9" }}>
              <p className="text-[13px] font-semibold mb-3" style={{ color: "#10B981" }}>Normal (keep going)</p>
              <div className="space-y-2">
                {brief.normalSymptoms.map((s, i) => (
                  <div key={i} className="flex items-start gap-2 text-[14px]" style={{ color: "#374151" }}>
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#10B981" }} />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl p-4" style={{ borderLeft: "4px solid #EF4444", backgroundColor: "#F9F9F9" }}>
              <p className="text-[13px] font-semibold mb-3" style={{ color: "#EF4444" }}>Contact your doctor</p>
              <div className="space-y-2">
                {brief.warningSymptoms.map((s, i) => (
                  <div key={i} className="flex items-start gap-2 text-[14px]" style={{ color: "#374151" }}>
                    <XCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#EF4444" }} />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───── Previous Week Card ───── */
function PreviousWeekCard({ week, isExpanded, onToggle }: {
  week: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const brief = weeklyBriefs[week];
  if (!brief) return null;

  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full rounded-xl p-4 flex items-center gap-3 transition-colors"
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E5E7EB",
          minHeight: 44,
        }}
      >
        <Check className="w-5 h-5 shrink-0" style={{ color: "#10B981" }} />
        <span className="flex-1 text-left text-[15px]" style={{ color: "#374151" }}>
          Week {week}: {brief.title}
        </span>
        <span className="font-mono text-[12px] shrink-0" style={{ color: "#6B7280" }}>
          {brief.dose}
        </span>
        <ChevronDown
          className={cn("w-4 h-4 shrink-0 transition-transform", isExpanded && "rotate-180")}
          style={{ color: "#9CA3AF" }}
        />
      </button>
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-2"
        >
          <BriefContent week={week} isCurrent={false} />
        </motion.div>
      )}
    </div>
  );
}

/* ───── Main Page ───── */
export default function Protocols() {
  const navigate = useNavigate();
  const { currentWeek, isLoading } = useActiveProtocolProgress();
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [expandedPrev, setExpandedPrev] = useState<number | null>(null);

  useEffect(() => {
    if (currentWeek) setSelectedWeek(currentWeek);
  }, [currentWeek]);

  const handleWeekSelect = useCallback((w: number) => {
    if (!currentWeek) return;
    setSelectedWeek(w);
    if (w < currentWeek) {
      setExpandedPrev(w);
      // Scroll to previous weeks section
      setTimeout(() => {
        document.getElementById(`prev-week-${w}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      setExpandedPrev(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentWeek]);

  // Redirect if no active protocol
  useEffect(() => {
    if (!isLoading && currentWeek === null) {
      navigate("/dashboard", { replace: true });
    }
  }, [isLoading, currentWeek, navigate]);

  if (isLoading || currentWeek === null) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-20">
          <div className="animate-pulse space-y-4 w-full max-w-[900px]">
            <div className="h-10 rounded-full w-full" style={{ backgroundColor: "#E5E7EB" }} />
            <div className="h-64 rounded-2xl w-full" style={{ backgroundColor: "#E5E7EB" }} />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const activeWeek = selectedWeek ?? currentWeek;
  const previousWeeks = Array.from({ length: currentWeek - 1 }, (_, i) => currentWeek - 1 - i);
  const upcomingWeeks = Array.from(
    { length: Math.min(3, 20 - currentWeek) },
    (_, i) => currentWeek + 1 + i
  );

  return (
    <DashboardLayout>
      <div className="max-w-[900px] mx-auto py-4 md:py-8 space-y-8">
        {/* Week Navigation */}
        <WeekNav currentWeek={currentWeek} selectedWeek={activeWeek} onSelect={handleWeekSelect} />

        {/* Current Week Hero Brief */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <BriefContent week={currentWeek} isCurrent={true} />
        </motion.div>

        {/* Previous Weeks */}
        {previousWeeks.length > 0 && (
          <div className="space-y-3">
            <div style={{ borderTop: "1px solid #E5E7EB" }} className="pt-6">
              <h2 className="text-[18px] font-bold" style={{ color: "#111827" }}>Previous Weeks</h2>
            </div>
            {previousWeeks.map((w) => (
              <div key={w} id={`prev-week-${w}`}>
                <PreviousWeekCard
                  week={w}
                  isExpanded={expandedPrev === w}
                  onToggle={() => setExpandedPrev(expandedPrev === w ? null : w)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Coming Up */}
        {upcomingWeeks.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-[18px] font-bold" style={{ color: "#111827" }}>Coming Up</h2>
            {upcomingWeeks.map((w) => {
              const brief = weeklyBriefs[w];
              if (!brief) return null;
              return (
                <div
                  key={w}
                  className="rounded-xl p-4 flex items-center gap-3"
                  style={{
                    backgroundColor: "#F9F9F9",
                    border: "1px dashed #E5E7EB",
                  }}
                >
                  <Lock className="w-5 h-5 shrink-0" style={{ color: "#D1D5DB" }} />
                  <span className="flex-1 text-[15px]" style={{ color: "#D1D5DB" }}>
                    Week {w}: {brief.title}
                  </span>
                  <span className="font-mono text-[12px] shrink-0" style={{ color: "#D1D5DB" }}>
                    {brief.dose}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Disclaimer */}
        <div className="text-xs text-center py-6" style={{ color: "#9CA3AF", borderTop: "1px solid #E5E7EB" }}>
          <p>For educational purposes only. Not medical advice. Always consult a healthcare provider before using any peptides.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
