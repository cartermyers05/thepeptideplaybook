import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, AlertTriangle, CheckCircle2, Clock, Calendar, Info } from "lucide-react";
import { format, parseISO, isPast } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFDATimeline, type FDATimelineEvent } from "@/hooks/useFDATimeline";

const mono = "'JetBrains Mono', ui-monospace, monospace";
const heading = "'Outfit', sans-serif";

const eventStyles: Record<string, { color: string; bg: string; icon: typeof CheckCircle2 }> = {
  approved: { color: "#34D399", bg: "rgba(52,211,153,0.1)", icon: CheckCircle2 },
  banned: { color: "#FB7185", bg: "rgba(251,113,133,0.1)", icon: AlertTriangle },
  under_review: { color: "#F59E0B", bg: "rgba(245,158,11,0.1)", icon: Clock },
  hearing: { color: "#60A5FA", bg: "rgba(96,165,250,0.1)", icon: Calendar },
  expected_decision: { color: "#818CF8", bg: "rgba(129,140,248,0.1)", icon: Calendar },
};

function TimelineNode({ event, index }: { event: FDATimelineEvent; index: number }) {
  const style = eventStyles[event.event_type] || eventStyles.under_review;
  const Icon = style.icon;
  const isProjected = event.status === "projected";
  const eventDate = parseISO(event.event_date);
  const isFuture = !isPast(eventDate);

  return (
    <motion.div
      className="relative flex gap-3 pb-6 last:pb-0"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 relative"
          style={{ backgroundColor: style.bg }}
        >
          <Icon className="w-3.5 h-3.5" style={{ color: style.color }} />
          {isProjected && (
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: `2px solid ${style.color}`,
                animation: "fdaPulse 2s ease-in-out infinite",
                opacity: 0.4,
              }}
            />
          )}
        </div>
        <div className="w-[1.5px] flex-1 min-h-[16px]" style={{ backgroundColor: "rgba(0,0,0,0.06)" }} />
      </div>

      {/* Content */}
      <div className="flex-1 pt-0.5 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded"
            style={{ backgroundColor: style.bg, color: style.color, fontFamily: mono }}
          >
            {event.peptide_name}
          </span>
          {isProjected && (
            <span className="text-[9px] font-medium text-muted-foreground px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "rgba(0,0,0,0.04)", fontFamily: mono }}>
              Projected
            </span>
          )}
        </div>
        <p className="text-sm font-semibold text-foreground mt-1 leading-snug" style={{ fontFamily: heading }}>
          {event.title}
        </p>
        {event.description && (
          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
            {event.description}
          </p>
        )}
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-[10px] text-muted-foreground" style={{ fontFamily: mono }}>
            {format(eventDate, "MMM d, yyyy")}
          </span>
          {event.source_url && (
            <a
              href={event.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-[10px] font-medium hover:underline"
              style={{ color: style.color, fontFamily: mono }}
            >
              Source <ExternalLink className="w-2.5 h-2.5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function FDATimelineCard() {
  const { data: events = [], isLoading } = useFDATimeline();

  if (isLoading) {
    return (
      <div
        className="rounded-[20px] bg-white overflow-hidden"
        style={{
          boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.06)",
          border: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div className="p-5">
          <div className="h-4 w-40 bg-muted rounded animate-pulse mb-4" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-24 bg-muted rounded animate-pulse" />
                  <div className="h-4 w-full bg-muted rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (events.length === 0) return null;

  // Split into past & upcoming
  const now = new Date();
  const past = events.filter((e) => isPast(parseISO(e.event_date)));
  const upcoming = events.filter((e) => !isPast(parseISO(e.event_date)));

  return (
    <div
      className="rounded-[20px] bg-white overflow-hidden"
      style={{
        boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.06)",
        border: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <div className="px-5 pt-4 pb-2 flex items-baseline justify-between">
        <div className="flex items-center gap-1.5 group relative">
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground" style={{ fontFamily: mono }}>
            FDA Regulatory Timeline
          </h2>
          <div className="relative">
            <Info className="w-3 h-3 text-muted-foreground cursor-help" />
            <div className="absolute left-1/2 -translate-x-1/2 top-5 z-50 w-56 p-2.5 rounded-xl bg-white text-[11px] text-muted-foreground leading-relaxed opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity shadow-lg border border-gray-100" style={{ fontFamily: mono }}>
              We track FDA, PCAC, and regulatory developments that may affect your protocol compounds. Updated monthly.
            </div>
          </div>
        </div>
        {upcoming.length > 0 && (
          <span
            className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(96,165,250,0.1)",
              color: "#60A5FA",
              fontFamily: mono,
              animation: "fdaPulse 2s ease-in-out infinite",
            }}
          >
            {upcoming.length} upcoming
          </span>
        )}
      </div>
      <ScrollArea className="px-5 pb-4" style={{ maxHeight: 420 }}>
        {upcoming.length > 0 && (
          <div className="mb-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2" style={{ fontFamily: mono }}>
              Upcoming
            </p>
            {upcoming.map((event, i) => (
              <TimelineNode key={event.id} event={event} index={i} />
            ))}
          </div>
        )}
        {past.length > 0 && (
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2" style={{ fontFamily: mono }}>
              History
            </p>
            {[...past].reverse().map((event, i) => (
              <TimelineNode key={event.id} event={event} index={i + upcoming.length} />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
