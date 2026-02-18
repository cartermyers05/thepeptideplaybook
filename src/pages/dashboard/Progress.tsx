import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useUserProtocol } from "@/hooks/useUserProtocol";
import { useAllLogs, useUpsertDailyLog, DailyLog } from "@/hooks/useDailyLog";
import { useProgressStats } from "@/hooks/useProgressData";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Camera, Check, ChevronDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { format } from "date-fns";

export default function Progress() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { protocol, isLoading: loadingProtocol, currentWeek } = useUserProtocol();
  const { data: allLogs = [], isLoading: loadingLogs } = useAllLogs(protocol?.id);
  const stats = useProgressStats(allLogs, protocol || null);
  const upsertLog = useUpsertDailyLog();

  if (loadingProtocol || loadingLogs) {
    return (
      <DashboardLayout>
        <div className="space-y-6 py-6">
          <Skeleton className="h-24 w-full rounded-2xl" />
          <Skeleton className="h-48 w-full rounded-2xl" />
        </div>
      </DashboardLayout>
    );
  }

  if (!protocol) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <h1 className="text-2xl font-bold mb-2" style={{ color: "#111827" }}>No Active Protocol</h1>
          <p className="mb-6" style={{ color: "#6B7280" }}>Build one with your AI coach.</p>
          <button
            onClick={() => navigate("/dashboard/coach")}
            className="px-8 py-3 rounded-full text-white font-semibold hover:opacity-90"
            style={{ backgroundColor: "#F97316", minHeight: 48 }}
          >
            Build My Protocol <ArrowRight className="w-4 h-4 inline ml-1" />
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="py-4 md:py-6 space-y-6">
        <h1 className="text-xl font-bold" style={{ color: "#111827" }}>Progress</h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Days Logged" value={`${stats.daysLogged}`} color="#F97316" />
          <StatCard label="Compliance" value={`${stats.compliancePercent}%`} color="#10B981" />
          <StatCard label="Current Week" value={`${currentWeek || 0}`} color="#8B5CF6" />
        </div>

        {/* Weekly Check-In */}
        <CheckInSection
          hasCheckedIn={stats.hasCheckedInThisWeek}
          checkIn={stats.thisWeekCheckIn || null}
          protocolId={protocol.id}
          upsertLog={upsertLog}
        />

        {/* Photo Upload */}
        <PhotoSection protocolId={protocol.id} userId={user?.id} />

        {/* Weight Trend */}
        {stats.weightData.length >= 2 && (
          <ChartCard title="Weight Trend" data={stats.weightData} color="#F97316" unit="lbs" />
        )}

        {/* Weight Log Input */}
        <WeightInput protocolId={protocol.id} upsertLog={upsertLog} />

        {/* Energy Trend */}
        {stats.energyData.length >= 2 ? (
          <ChartCard title="Energy Over Time" data={stats.energyData} color="#F59E0B" unit="/10" yDomain={[1, 10]} />
        ) : (
          <div className="bg-white rounded-2xl p-5 text-center" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <p className="text-sm" style={{ color: "#9CA3AF" }}>
              Complete weekly check-ins to see your energy trend.
            </p>
          </div>
        )}

        {/* Log History */}
        <LogHistory logs={allLogs} />

        <div style={{ height: 80 }} />
      </div>
    </DashboardLayout>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-white rounded-2xl p-4 text-center" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
      <p className="text-2xl font-bold font-mono" style={{ color }}>{value}</p>
      <p className="text-xs mt-1" style={{ color: "#9CA3AF" }}>{label}</p>
    </div>
  );
}

function CheckInSection({ hasCheckedIn, checkIn, protocolId, upsertLog }: {
  hasCheckedIn: boolean;
  checkIn: DailyLog | null;
  protocolId: string;
  upsertLog: ReturnType<typeof useUpsertDailyLog>;
}) {
  const [expanded, setExpanded] = useState(false);
  const [energy, setEnergy] = useState<number | null>(null);
  const [siteReaction, setSiteReaction] = useState("none");
  const [giIssues, setGiIssues] = useState("none");
  const [otherSymptoms, setOtherSymptoms] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    upsertLog.mutate({
      protocol_id: protocolId,
      energy_rating: energy || undefined,
      injection_site_reaction: siteReaction,
      gi_issues: giIssues,
      other_symptoms: otherSymptoms || undefined,
    }, {
      onSuccess: () => {
        setSaved(true);
        setExpanded(false);
      },
    });
  };

  if (hasCheckedIn || saved) {
    return (
      <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <div className="flex items-center gap-2">
          <Check className="w-5 h-5" style={{ color: "#10B981" }} />
          <p className="font-semibold" style={{ color: "#10B981" }}>This week's check-in complete</p>
        </div>
        {checkIn && (
          <p className="text-sm mt-2" style={{ color: "#6B7280" }}>
            Energy: {checkIn.energy_rating}/10 · Sites: {checkIn.injection_site_reaction || "none"} · GI: {checkIn.gi_issues || "none"}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
      <div className="p-5">
        <h3 className="font-semibold" style={{ color: "#111827" }}>Time for your weekly check-in</h3>
        <p className="text-sm mt-1" style={{ color: "#6B7280" }}>Track how your body is responding.</p>
        {!expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="mt-3 px-6 py-2.5 rounded-full text-white font-medium text-sm hover:opacity-90"
            style={{ backgroundColor: "#F97316", minHeight: 44 }}
          >
            Start Check-In
          </button>
        )}
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-5">
              {/* Energy */}
              <div>
                <p className="text-sm font-medium mb-2" style={{ color: "#374151" }}>Rate your energy this week</p>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      onClick={() => setEnergy(n)}
                      className="w-10 h-10 rounded-lg border text-sm font-mono transition-all"
                      style={{
                        backgroundColor: energy === n ? "#F97316" : "white",
                        borderColor: energy === n ? "#F97316" : "#E5E7EB",
                        color: energy === n ? "white" : "#6B7280",
                      }}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Site Reaction */}
              <PillToggle
                label="Injection site reactions?"
                options={["none", "mild", "significant"]}
                labels={["None", "Mild redness", "Significant"]}
                value={siteReaction}
                onChange={setSiteReaction}
              />

              {/* GI Issues */}
              <PillToggle
                label="Any GI issues?"
                options={["none", "mild", "significant"]}
                labels={["None", "Mild nausea", "Significant"]}
                value={giIssues}
                onChange={setGiIssues}
              />

              {/* Notes */}
              <div>
                <p className="text-sm font-medium mb-2" style={{ color: "#374151" }}>Anything else to report?</p>
                <input
                  value={otherSymptoms}
                  onChange={(e) => setOtherSymptoms(e.target.value)}
                  placeholder="Side effects, questions, notes..."
                  className="w-full rounded-xl border px-4 py-3 text-[16px] focus:outline-none focus:ring-2 focus:ring-ring"
                  style={{ borderColor: "#E5E7EB", color: "#111827" }}
                />
              </div>

              <button
                onClick={handleSave}
                disabled={upsertLog.isPending}
                className="w-full px-6 py-3 rounded-full text-white font-semibold hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: "#10B981", minHeight: 48 }}
              >
                {upsertLog.isPending ? "Saving..." : "Save Check-In"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PillToggle({ label, options, labels, value, onChange }: {
  label: string;
  options: string[];
  labels: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="text-sm font-medium mb-2" style={{ color: "#374151" }}>{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt, i) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className="px-4 py-2.5 rounded-full text-sm font-medium border transition-all"
            style={{
              backgroundColor: value === opt ? "rgba(249,115,22,0.1)" : "white",
              borderColor: value === opt ? "#F97316" : "#E5E7EB",
              color: value === opt ? "#F97316" : "#6B7280",
              minHeight: 44,
            }}
          >
            {labels[i]}
          </button>
        ))}
      </div>
    </div>
  );
}

function PhotoSection({ protocolId, userId }: { protocolId: string; userId?: string }) {
  const frontRef = useRef<HTMLInputElement>(null);
  const sideRef = useRef<HTMLInputElement>(null);
  const upsertLog = useUpsertDailyLog();

  const handleUpload = async (file: File, side: "front" | "side") => {
    if (!userId) return;
    const path = `${userId}/${new Date().toISOString().split("T")[0]}-${side}.jpg`;
    const { error } = await supabase.storage.from("progress-photos").upload(path, file, { upsert: true });
    if (error) { console.error("Upload error:", error); return; }
    // Store the storage path (not a public URL) since the bucket is private
    upsertLog.mutate({
      protocol_id: protocolId,
      ...(side === "front" ? { photo_front_url: path } : { photo_side_url: path }),
    });
  };

  return (
    <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
      <h3 className="font-semibold mb-3" style={{ color: "#111827" }}>Progress Photos</h3>
      <div className="grid grid-cols-2 gap-3">
        {["Front", "Side"].map((label) => {
          const ref = label === "Front" ? frontRef : sideRef;
          return (
            <button
              key={label}
              onClick={() => ref.current?.click()}
              className="rounded-xl border-2 border-dashed p-6 flex flex-col items-center gap-2 hover:border-orange-300 transition-colors"
              style={{ borderColor: "#E5E7EB", minHeight: 100 }}
            >
              <Camera className="w-6 h-6" style={{ color: "#9CA3AF" }} />
              <span className="text-sm" style={{ color: "#6B7280" }}>{label}</span>
              <span className="text-xs" style={{ color: "#9CA3AF" }}>Tap to upload</span>
            </button>
          );
        })}
      </div>
      <p className="text-xs mt-3 text-center" style={{ color: "#9CA3AF" }}>
        Upload photos each week to track your transformation.
      </p>
      <input ref={frontRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], "front")} />
      <input ref={sideRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], "side")} />
    </div>
  );
}

function WeightInput({ protocolId, upsertLog }: { protocolId: string; upsertLog: ReturnType<typeof useUpsertDailyLog> }) {
  const [weight, setWeight] = useState("");

  const handleLog = () => {
    const w = parseFloat(weight);
    if (!w) return;
    upsertLog.mutate({ protocol_id: protocolId, weight_lbs: w }, {
      onSuccess: () => setWeight(""),
    });
  };

  return (
    <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
      <h3 className="font-semibold mb-3" style={{ color: "#111827" }}>Log Weight</h3>
      <div className="flex gap-2">
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Today"
          className="flex-1 rounded-xl border px-4 py-3 text-[16px] focus:outline-none focus:ring-2 focus:ring-ring"
          style={{ borderColor: "#E5E7EB" }}
        />
        <button
          onClick={handleLog}
          className="px-5 py-3 rounded-xl text-white font-medium hover:opacity-90"
          style={{ backgroundColor: "#F97316", minHeight: 48 }}
        >
          Log
        </button>
      </div>
    </div>
  );
}

function ChartCard({ title, data, color, unit, yDomain }: {
  title: string;
  data: { date: string; value: number }[];
  color: string;
  unit: string;
  yDomain?: [number, number];
}) {
  return (
    <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
      <h3 className="font-semibold mb-3" style={{ color: "#111827" }}>{title}</h3>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data}>
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: "#9CA3AF" }}
            tickFormatter={(d) => format(new Date(d), "M/d")}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#9CA3AF" }}
            domain={yDomain}
            width={35}
          />
          <Tooltip
            formatter={(v: number) => [`${v}${unit}`, title]}
            labelFormatter={(d) => format(new Date(d as string), "MMM d")}
          />
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={{ r: 3, fill: color }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function LogHistory({ logs }: { logs: DailyLog[] }) {
  const [showAll, setShowAll] = useState(false);
  const sorted = [...logs].reverse();
  const displayed = showAll ? sorted : sorted.slice(0, 10);

  if (displayed.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
      <h3 className="font-semibold mb-3" style={{ color: "#111827" }}>History</h3>
      <div className="space-y-2">
        {displayed.map((log) => {
          const actions = log.actions_completed || {};
          const total = Object.keys(actions).length;
          const done = Object.values(actions).filter(Boolean).length;
          return (
            <div key={log.id} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: "#F3F4F6" }}>
              <span className="text-sm" style={{ color: "#374151" }}>
                {format(new Date(log.log_date), "EEE, MMM d")}
              </span>
              <div className="flex items-center gap-3 text-xs" style={{ color: "#6B7280" }}>
                {total > 0 && <span>{done}/{total} done</span>}
                {log.energy_rating && <span>⚡ {log.energy_rating}</span>}
                {log.injection_site_reaction && log.injection_site_reaction !== "none" && <span>⚠</span>}
              </div>
            </div>
          );
        })}
      </div>
      {sorted.length > 10 && !showAll && (
        <button onClick={() => setShowAll(true)} className="mt-3 text-sm font-medium" style={{ color: "#F97316" }}>
          Load more
        </button>
      )}
    </div>
  );
}
