import { Protocol } from "@/hooks/useProtocol";
import { useProtocolTemplate } from "@/hooks/useProtocolTemplate";
import {
  useProtocolProgress,
  useWeeklyContent,
  useNextMilestone,
  usePauseTracking,
  computeCurrentWeek,
} from "@/hooks/useProtocolProgress";
import { EvidenceRating } from "./EvidenceRating";
import { ProtocolProgressHeader } from "./ProtocolProgressHeader";
import { ThisWeekCard } from "./ThisWeekCard";
import { StartTrackingCard } from "./StartTrackingCard";
import { Download, ArrowLeft } from "lucide-react";
import { WeeklyCheckinCard } from "./WeeklyCheckinCard";
import { CheckinHistory } from "./CheckinHistory";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import ReactMarkdown from "react-markdown";

interface ProtocolDetailViewProps {
  protocol: Protocol;
  onBack: () => void;
}

export function ProtocolDetailView({ protocol, onBack }: ProtocolDetailViewProps) {
  const peptideSlug = (protocol.peptides?.[0]?.name || "").toLowerCase().trim();
  const goalSlug = (protocol.goal || "").replace(/_/g, "-");

  const { data: template, isLoading } = useProtocolTemplate(peptideSlug, goalSlug);

  const { data: progress, isLoading: progressLoading } = useProtocolProgress(
    template?.id,
    peptideSlug,
    goalSlug
  );

  const currentWeek = progress?.status === "active" ? computeCurrentWeek(progress.start_date) : 0;

  const { data: weeklyContent } = useWeeklyContent(peptideSlug, currentWeek);
  const { data: nextMilestoneText } = useNextMilestone(peptideSlug, currentWeek);
  const pauseTracking = usePauseTracking();

  const displayName = template?.peptide_display_name || protocol.peptides?.[0]?.name || "Peptide";
  const protocolName = template?.protocol_name || protocol.protocol_name;
  const evidenceLevel = template?.evidence_level || 4;
  const evidenceDesc = template?.evidence_description || "Strong — Multiple large-scale Phase 3 RCTs";
  const lastUpdated = template?.last_updated || "February 2026";
  const sections = template?.sections || [];

  const defaultOpen = sections
    .filter((s) => s.default_open)
    .map((s) => `section-${s.section_number}`);

  const isActive = progress?.status === "active";
  const isPaused = progress?.status === "paused";

  if (isLoading) {
    return (
      <div className="min-h-screen px-4 md:px-0" style={{ background: "#0a0a0f" }}>
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 transition-colors"
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#64748B" }}
        >
          <ArrowLeft className="w-4 h-4" /> Back to protocols
        </button>
        <div className="rounded-2xl p-5 md:p-8 mb-6" style={{ background: "#111827", border: "1px solid #1E293B" }}>
          <Skeleton className="h-8 w-64 mb-4" style={{ background: "#1E293B" }} />
          <Skeleton className="h-4 w-48 mb-4" style={{ background: "#1E293B" }} />
          <Skeleton className="h-3 w-72 mb-4" style={{ background: "#1E293B" }} />
        </div>
        <div className="rounded-2xl p-5 md:p-8" style={{ background: "#111827", border: "1px solid #1E293B" }}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-12 w-full mb-3" style={{ background: "#1E293B" }} />
          ))}
        </div>
      </div>
    );
  }

  if (!template && !isLoading) {
    return (
      <div className="min-h-screen px-4 md:px-0" style={{ background: "#0a0a0f" }}>
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 transition-colors"
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#64748B" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#F1F5F9")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#64748B")}
        >
          <ArrowLeft className="w-4 h-4" /> Back to protocols
        </button>
        <div
          className="rounded-2xl p-8 flex items-center justify-center"
          style={{ background: "#111827", border: "1px solid #1E293B", minHeight: 200 }}
        >
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#94A3B8", textAlign: "center" }}>
            Your protocol content is being prepared. Check back soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 md:px-0" style={{ background: "#0a0a0f" }}>
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-6 transition-colors"
        style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#64748B" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#F1F5F9")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#64748B")}
      >
        <ArrowLeft className="w-4 h-4" /> Back to protocols
      </button>

      {/* Header card */}
      <div
        className="rounded-2xl p-5 md:p-8 mb-6"
        style={{ background: "#111827", border: "1px solid #1E293B" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
          <h1
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#F1F5F9" }}
            className="text-2xl"
          >
            {protocolName}
          </h1>
          <span
            className="rounded-full self-start sm:self-auto"
            style={{
              background: "rgba(6,214,160,0.1)",
              color: "#06D6A0",
              border: "1px solid rgba(6,214,160,0.2)",
              padding: "4px 12px",
              fontSize: 14,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {displayName}
          </span>
        </div>

        <div className="mb-4">
          <EvidenceRating level={evidenceLevel} description={evidenceDesc} />
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-1" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#64748B" }}>
          <span>Last updated: {lastUpdated}</span>
          <span className="mx-1">·</span>
          <span>Based on peer-reviewed research · Not medical advice</span>
        </div>

        <div className="flex justify-end">
          <button
            className="flex items-center gap-2 transition-colors w-full sm:w-auto justify-center sm:justify-start"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              color: "#94A3B8",
              background: "transparent",
              border: "1px solid #1E293B",
              borderRadius: 10,
              padding: "8px 16px",
              minHeight: 44,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#06D6A0";
              e.currentTarget.style.color = "#06D6A0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#1E293B";
              e.currentTarget.style.color = "#94A3B8";
            }}
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>

      {/* Tracking section */}
      {!progressLoading && isActive && weeklyContent && (
        <>
          <ProtocolProgressHeader
            currentWeek={currentWeek}
            weeklyContent={weeklyContent}
            nextMilestoneText={nextMilestoneText || ""}
          />
          <ThisWeekCard weeklyContent={weeklyContent} />
          <WeeklyCheckinCard progressId={progress!.id} currentWeek={currentWeek} />
          <CheckinHistory progressId={progress!.id} />
          <button
            onClick={() => progress && pauseTracking.mutate(progress.id)}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              color: "#64748B",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              marginBottom: 16,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#94A3B8")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#64748B")}
          >
            Pause tracking
          </button>
        </>
      )}

      {!progressLoading && !isActive && template && (
        <StartTrackingCard
          templateId={template.id}
          peptideSlug={peptideSlug}
          goalSlug={goalSlug}
          pausedProgressId={isPaused ? progress?.id : null}
        />
      )}

      {/* Accordion sections */}
      <div
        className="rounded-2xl p-5 md:p-8"
        style={{ background: "#111827", border: "1px solid #1E293B" }}
      >
        <Accordion type="multiple" defaultValue={defaultOpen}>
          {sections.map((section) => (
            <AccordionItem
              key={section.section_number}
              value={`section-${section.section_number}`}
              className="border-b"
              style={{ borderColor: "#1E293B" }}
            >
              <AccordionTrigger
                className="hover:no-underline py-5 min-h-[48px]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center rounded-full shrink-0"
                    style={{
                      width: 32,
                      height: 32,
                      background: "rgba(6,214,160,0.1)",
                      color: "#06D6A0",
                      fontSize: 14,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {section.section_number}
                  </div>
                  <span
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      color: "#F1F5F9",
                      textAlign: "left",
                    }}
                  >
                    {section.title}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div
                  className="pl-4 md:pl-11 prose prose-invert max-w-none"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: "#CBD5E1",
                    paddingTop: 0,
                    paddingBottom: 24,
                  }}
                >
                  <ReactMarkdown>{section.content}</ReactMarkdown>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
