import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, ClipboardList, TrendingUp, Lock, BookOpen, Shield, LockKeyhole } from "lucide-react";

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

interface NoProtocolStateProps {
  firstName: string;
}

export function NoProtocolState({ firstName }: NoProtocolStateProps) {
  const navigate = useNavigate();

  return (
    <>
      {/* Greeting */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-[28px] font-bold tracking-tight" style={{ color: "#111827" }}>
          Hey {firstName} 👋
        </h1>
        <p className="mt-1 text-base" style={{ color: "#6B7280" }}>
          Ready to build your first protocol?
        </p>
      </motion.div>

      {/* Hero CTA Card */}
      <motion.div
        variants={itemVariants}
        className="rounded-[20px] p-8 md:p-10 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #FFF7ED 0%, #FEF3C7 100%)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          minHeight: 200,
        }}
      >
        <div className="flex items-start">
          <div className="flex-1 relative z-10">
            {/* AI Badge */}
            <span
              className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest mb-4"
              style={{ color: "#F97316", backgroundColor: "rgba(249,115,22,0.08)" }}
            >
              AI-Powered
            </span>

            <h2 className="text-2xl font-bold tracking-tight mb-3" style={{ color: "#111827" }}>
              Your Personal Peptide Protocol
            </h2>
            <p className="text-[15px] leading-relaxed mb-6 max-w-[420px]" style={{ color: "#374151" }}>
              Answer a few questions about your goals, body, and experience. Our AI builds you an exact protocol: compounds, doses, schedule, everything.
            </p>

            <button
              onClick={() => navigate("/dashboard/coach")}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-base text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
              style={{ backgroundColor: "#111827", minHeight: 52 }}
            >
              Build My Protocol
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="mt-3 text-[13px]" style={{ color: "#9CA3AF" }}>
              Takes about 3 minutes
            </p>
          </div>

          {/* Decorative Stack Illustration - desktop only */}
          <div className="hidden md:flex items-center justify-center w-[40%] relative" style={{ minHeight: 180 }}>
            <div
              className="absolute rounded-2xl"
              style={{
                width: 120, height: 80,
                backgroundColor: "rgba(249,115,22,0.15)",
                transform: "rotate(-8deg) translate(10px, -20px)",
              }}
            />
            <div
              className="absolute rounded-2xl"
              style={{
                width: 120, height: 80,
                backgroundColor: "rgba(139,92,246,0.10)",
                transform: "rotate(4deg) translate(-5px, 5px)",
              }}
            />
            <div
              className="absolute rounded-2xl"
              style={{
                width: 120, height: 80,
                backgroundColor: "rgba(16,185,129,0.10)",
                transform: "rotate(-2deg) translate(15px, 25px)",
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Feature Preview Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        {[
          { icon: MessageCircle, label: "AI Coach", desc: "Ask anything about peptides, 24/7", color: "#F97316" },
          { icon: ClipboardList, label: "Daily Actions", desc: "See exactly what to do each day", color: "#8B5CF6" },
          { icon: TrendingUp, label: "Progress Tracking", desc: "Track results with weekly check-ins", color: "#10B981" },
        ].map((card) => (
          <div
            key={card.label}
            className="relative bg-white rounded-2xl p-6 opacity-70"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
          >
            <Lock className="absolute top-4 right-4 w-3.5 h-3.5" style={{ color: "#9CA3AF" }} />
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center mb-3"
              style={{ backgroundColor: card.color }}
            >
              <card.icon className="w-5 h-5 text-white" />
            </div>
            <p className="font-bold text-base mb-1" style={{ color: "#111827" }}>{card.label}</p>
            <p className="text-sm" style={{ color: "#6B7280" }}>{card.desc}</p>
            <p className="text-[11px] mt-3" style={{ color: "#9CA3AF" }}>Available after protocol</p>
          </div>
        ))}
      </motion.div>

      {/* Trust Strip */}
      <motion.div
        variants={itemVariants}
        className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-10 py-4"
      >
        {[
          { icon: BookOpen, text: "Built on 500+ studies" },
          { icon: Shield, text: "No bro science" },
          { icon: LockKeyhole, text: "Your data stays private" },
        ].map((item) => (
          <span key={item.text} className="flex items-center gap-1.5 text-[13px]" style={{ color: "#9CA3AF" }}>
            <item.icon className="w-3.5 h-3.5" />
            {item.text}
          </span>
        ))}
      </motion.div>
    </>
  );
}
