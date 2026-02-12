import { useState, useEffect } from "react";
import {
  useCurrentWeekCheckin,
  useLastLoggedWeight,
  useSubmitCheckin,
} from "@/hooks/useProtocolCheckins";

const SYMPTOM_OPTIONS = [
  { emoji: "😊", label: "None", bg: "rgba(34,197,94,0.15)", border: "rgba(34,197,94,0.3)" },
  { emoji: "🙂", label: "Mild", bg: "rgba(132,204,22,0.15)", border: "rgba(132,204,22,0.3)" },
  { emoji: "😐", label: "Moderate", bg: "rgba(234,179,8,0.15)", border: "rgba(234,179,8,0.3)" },
  { emoji: "😣", label: "Rough", bg: "rgba(249,115,22,0.15)", border: "rgba(249,115,22,0.3)" },
  { emoji: "😰", label: "Severe", bg: "rgba(239,68,68,0.15)", border: "rgba(239,68,68,0.3)" },
];

const ENERGY_OPTIONS = [
  { emoji: "⚡", label: "Great", bg: "rgba(34,197,94,0.15)", border: "rgba(34,197,94,0.3)" },
  { emoji: "🔋", label: "Good", bg: "rgba(132,204,22,0.15)", border: "rgba(132,204,22,0.3)" },
  { emoji: "😴", label: "Okay", bg: "rgba(234,179,8,0.15)", border: "rgba(234,179,8,0.3)" },
  { emoji: "🪫", label: "Low", bg: "rgba(249,115,22,0.15)", border: "rgba(249,115,22,0.3)" },
  { emoji: "💤", label: "Drained", bg: "rgba(239,68,68,0.15)", border: "rgba(239,68,68,0.3)" },
];

interface WeeklyCheckinCardProps {
  progressId: string;
  currentWeek: number;
}

export function WeeklyCheckinCard({ progressId, currentWeek }: WeeklyCheckinCardProps) {
  const { data: checkin, isLoading } = useCurrentWeekCheckin(progressId, currentWeek);
  const { data: lastWeight } = useLastLoggedWeight(progressId);
  const submitCheckin = useSubmitCheckin();

  const [editing, setEditing] = useState(false);
  const [weight, setWeight] = useState("");
  const [symptom, setSymptom] = useState<number | null>(null);
  const [energy, setEnergy] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (editing && checkin) {
      setWeight(checkin.weight_lbs?.toString() || "");
      setSymptom(checkin.symptom_rating);
      setEnergy(checkin.energy_rating);
      setNotes(checkin.notes || "");
    }
  }, [editing, checkin]);

  const handleSubmit = async () => {
    await submitCheckin.mutateAsync({
      id: editing ? checkin?.id : undefined,
      protocol_progress_id: progressId,
      week_number: currentWeek,
      weight_lbs: weight ? parseFloat(weight) : null,
      symptom_rating: symptom,
      energy_rating: energy,
      notes: notes || null,
    });
    setShowSuccess(true);
    setEditing(false);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  if (isLoading) return null;

  const isLogged = !!checkin && !editing;

  if (isLogged && !showSuccess) {
    return (
      <div
        className="rounded-xl mb-4"
        style={{ background: "#111827", border: "1px solid #1E293B", borderRadius: 12, padding: 20 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#06D6A0" }}>
            Week {currentWeek} logged ✓
          </span>
        </div>
        <div className="flex flex-wrap gap-4" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#CBD5E1" }}>
          {checkin.weight_lbs && <span>{checkin.weight_lbs} lbs</span>}
          {checkin.symptom_rating && <span>{SYMPTOM_OPTIONS[checkin.symptom_rating - 1]?.emoji} {SYMPTOM_OPTIONS[checkin.symptom_rating - 1]?.label}</span>}
          {checkin.energy_rating && <span>{ENERGY_OPTIONS[checkin.energy_rating - 1]?.emoji} {ENERGY_OPTIONS[checkin.energy_rating - 1]?.label}</span>}
          {checkin.notes && <span className="basis-full" style={{ color: "#94A3B8" }}>{checkin.notes}</span>}
        </div>
        <button
          onClick={() => setEditing(true)}
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#64748B", background: "none", border: "none", cursor: "pointer", padding: 0, marginTop: 12 }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#94A3B8")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#64748B")}
        >
          Edit this entry
        </button>
      </div>
    );
  }

  // Form state
  return (
    <div
      className="rounded-xl mb-4"
      style={{ background: "#111827", border: "1px solid #1E293B", borderRadius: 12, padding: 20 }}
    >
      <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, color: "#F1F5F9", marginBottom: 4 }}>
        Week {currentWeek} Check-in
      </h3>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#64748B", marginBottom: 20 }}>
        Quick update — takes 30 seconds
      </p>

      {/* Weight */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-2">
          <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#94A3B8" }}>Weight (lbs)</label>
          <span style={{ fontSize: 11, color: "#64748B" }}>optional</span>
        </div>
        <input
          type="number"
          inputMode="decimal"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder={lastWeight ? String(lastWeight) : "lbs"}
          style={{
            background: "#1a1a2e", border: "1px solid #1E293B", borderRadius: 10,
            padding: "12px 16px", fontSize: 16, color: "#F1F5F9",
            fontFamily: "'JetBrains Mono', monospace", width: "100%", maxWidth: 160, minHeight: 48,
            outline: "none",
          }}
        />
      </div>

      {/* Symptoms */}
      <div className="mb-5">
        <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#94A3B8", display: "block", marginBottom: 8 }}>
          How are side effects?
        </label>
        <div className="flex gap-2">
          {SYMPTOM_OPTIONS.map((opt, i) => {
            const val = i + 1;
            const selected = symptom === val;
            return (
              <button
                key={val}
                onClick={() => setSymptom(selected ? null : val)}
                className="flex flex-col items-center justify-center"
                style={{
                  minWidth: 56, minHeight: 56, borderRadius: 12, cursor: "pointer",
                  background: selected ? opt.bg : "#1a1a2e",
                  border: `1px solid ${selected ? opt.border : "#1E293B"}`,
                  flex: "1 1 0",
                }}
              >
                <span style={{ fontSize: 24, lineHeight: 1 }}>{opt.emoji}</span>
                <span style={{ fontSize: 11, color: "#94A3B8", marginTop: 4, fontFamily: "'DM Sans', sans-serif" }}>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Energy */}
      <div className="mb-5">
        <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#94A3B8", display: "block", marginBottom: 8 }}>
          Energy level?
        </label>
        <div className="flex gap-2">
          {ENERGY_OPTIONS.map((opt, i) => {
            const val = i + 1;
            const selected = energy === val;
            return (
              <button
                key={val}
                onClick={() => setEnergy(selected ? null : val)}
                className="flex flex-col items-center justify-center"
                style={{
                  minWidth: 56, minHeight: 56, borderRadius: 12, cursor: "pointer",
                  background: selected ? opt.bg : "#1a1a2e",
                  border: `1px solid ${selected ? opt.border : "#1E293B"}`,
                  flex: "1 1 0",
                }}
              >
                <span style={{ fontSize: 24, lineHeight: 1 }}>{opt.emoji}</span>
                <span style={{ fontSize: 11, color: "#94A3B8", marginTop: 4, fontFamily: "'DM Sans', sans-serif" }}>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Notes */}
      <div className="mb-5">
        <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#94A3B8", display: "block", marginBottom: 8 }}>
          Anything worth noting?
        </label>
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Food changes, sleep, mood, etc."
          style={{
            background: "#1a1a2e", border: "1px solid #1E293B", borderRadius: 10,
            padding: "12px 16px", fontSize: 16, color: "#F1F5F9",
            fontFamily: "'DM Sans', sans-serif", width: "100%", minHeight: 48,
            outline: "none",
          }}
        />
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={submitCheckin.isPending}
        style={{
          background: showSuccess ? "transparent" : "#06D6A0",
          color: showSuccess ? "#06D6A0" : "#0a0a0f",
          fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 16,
          borderRadius: 10, padding: "14px 24px", minHeight: 48, width: "100%",
          border: showSuccess ? "1px solid #06D6A0" : "none", cursor: "pointer",
        }}
      >
        {showSuccess ? "✓ Logged!" : submitCheckin.isPending ? "Saving..." : editing ? "Update Check-in" : "Log Check-in"}
      </button>
    </div>
  );
}
