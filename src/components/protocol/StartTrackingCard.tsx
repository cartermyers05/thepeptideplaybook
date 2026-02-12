import { useState } from "react";
import { useStartTracking, useResumeTracking } from "@/hooks/useProtocolProgress";

interface StartTrackingCardProps {
  templateId: string;
  peptideSlug: string;
  goalSlug: string;
  pausedProgressId?: string | null;
}

export function StartTrackingCard({
  templateId,
  peptideSlug,
  goalSlug,
  pausedProgressId,
}: StartTrackingCardProps) {
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const startTracking = useStartTracking();
  const resumeTracking = useResumeTracking();

  const isPaused = !!pausedProgressId;

  const handleStart = () => {
    if (isPaused && pausedProgressId) {
      resumeTracking.mutate(pausedProgressId);
    } else {
      startTracking.mutate({
        protocol_template_id: templateId,
        peptide_slug: peptideSlug,
        goal_slug: goalSlug,
        start_date: startDate,
      });
    }
  };

  const isLoading = startTracking.isPending || resumeTracking.isPending;

  return (
    <div
      className="rounded-xl mb-6"
      style={{
        background: "#111827",
        border: "1px solid #1E293B",
        borderRadius: 12,
        padding: 24,
        textAlign: "center",
      }}
    >
      <h3
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 18,
          fontWeight: 600,
          color: "#F1F5F9",
          marginBottom: 8,
        }}
      >
        {isPaused ? "Resume Tracking Your Protocol" : "Start Tracking Your Protocol"}
      </h3>

      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          color: "#94A3B8",
          maxWidth: 400,
          margin: "0 auto 20px",
        }}
      >
        {isPaused
          ? "Your tracking is paused. Resume to continue getting personalized weekly guidance."
          : "Set your start date and get personalized weekly guidance, dose reminders, and progress tracking."}
      </p>

      {!isPaused && (
        <div className="mb-5 flex flex-col items-center">
          <label
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              color: "#94A3B8",
              display: "block",
              marginBottom: 8,
            }}
          >
            When did you start (or plan to start)?
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{
              background: "#1a1a2e",
              border: "1px solid #1E293B",
              borderRadius: 10,
              padding: "12px 16px",
              color: "#F1F5F9",
              fontSize: 16,
              fontFamily: "'DM Sans', sans-serif",
              width: "100%",
              maxWidth: 280,
              minHeight: 48,
              outline: "none",
            }}
          />
        </div>
      )}

      <button
        onClick={handleStart}
        disabled={isLoading}
        style={{
          background: isLoading ? "#05c49a" : "#06D6A0",
          color: "#0a0a0f",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
          fontSize: 16,
          borderRadius: 10,
          padding: "14px 32px",
          minHeight: 48,
          cursor: isLoading ? "not-allowed" : "pointer",
          border: "none",
          opacity: isLoading ? 0.7 : 1,
          width: "100%",
          maxWidth: 280,
        }}
        onMouseEnter={(e) => {
          if (!isLoading) (e.currentTarget.style.background = "#05c49a");
        }}
        onMouseLeave={(e) => {
          if (!isLoading) (e.currentTarget.style.background = "#06D6A0");
        }}
      >
        {isLoading ? "..." : isPaused ? "Resume Tracking" : "Start Tracking"}
      </button>
    </div>
  );
}
