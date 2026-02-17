import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, ListChecks, BarChart3, Lock } from "lucide-react";

const itemVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5 } },
};

const mono = "'IBM Plex Mono', 'JetBrains Mono', ui-monospace, monospace";
const heading = "'Plus Jakarta Sans', sans-serif";

interface NoProtocolStateProps {
  firstName: string;
}

export function NoProtocolState({ firstName }: NoProtocolStateProps) {
  const navigate = useNavigate();

  return (
    <>
      {/* Greeting */}
      <motion.div variants={itemVariants} className="mb-8 px-1">
        <h1
          className="text-[28px] md:text-[32px] font-extrabold"
          style={{ color: "#EBEBF0", letterSpacing: "-0.035em", fontFamily: heading }}
        >
          Hey {firstName}
        </h1>
        <p className="mt-1 text-[15px] font-medium" style={{ color: "#8A8A9A" }}>
          Your protocol starts here.
        </p>
      </motion.div>

      {/* Hero CTA Card */}
      <motion.div variants={itemVariants}>
        <div
          className="rounded-[24px] p-8 md:p-9 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #111114 0%, #16131E 50%, #131118 100%)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Decorative hexagons */}
          <div className="hidden md:block absolute pointer-events-none" style={{ right: 20, bottom: 10 }}>
            <svg width={240} height={240} viewBox="0 0 100 100" style={{ transform: "rotate(12deg)", opacity: 1 }}>
              <polygon
                points="50,0 100,25 100,75 50,100 0,75 0,25"
                fill="none"
                stroke="url(#hex-grad-1)"
                strokeWidth={1.5}
              />
              <defs>
                <linearGradient id="hex-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(249,115,22,0.12)" />
                  <stop offset="100%" stopColor="rgba(167,139,250,0.08)" />
                </linearGradient>
              </defs>
            </svg>
            <svg
              width={120}
              height={120}
              viewBox="0 0 100 100"
              style={{ position: "absolute", right: 60, bottom: 40, transform: "rotate(-8deg)" }}
            >
              <polygon
                points="50,0 100,25 100,75 50,100 0,75 0,25"
                fill="none"
                stroke="rgba(251,113,133,0.06)"
                strokeWidth={1.5}
              />
            </svg>
          </div>

          <div className="relative z-10 md:max-w-[65%]">
            <span
              className="inline-block text-[11px] font-semibold uppercase mb-4"
              style={{ color: "#F97316", letterSpacing: "0.1em", fontFamily: mono }}
            >
              PROTOCOL ENGINE
            </span>

            <h2
              className="text-[26px] md:text-[36px] font-extrabold mb-3"
              style={{ color: "#EBEBF0", letterSpacing: "-0.035em", lineHeight: 1.15, fontFamily: heading }}
            >
              Build your{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #F97316, #FB7185, #A78BFA)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                personalized
              </span>{" "}
              peptide protocol
            </h2>

            <p className="text-[15px] leading-relaxed mb-7 max-w-[500px]" style={{ color: "#8A8A9A", lineHeight: 1.6 }}>
              Our AI asks about your goals, body, and experience — then builds your exact stack with compounds, doses, schedule, and safety guidelines.
            </p>

            <button
              onClick={() => navigate("/dashboard/coach")}
              className="inline-flex items-center gap-2 px-8 font-bold text-[15px] text-white rounded-[14px] transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #F97316, #EA580C)",
                height: 52,
                boxShadow: "0 4px 24px rgba(249,115,22,0.25), 0 1px 3px rgba(0,0,0,0.3)",
                fontFamily: heading,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 6px 32px rgba(249,115,22,0.35), 0 1px 3px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(249,115,22,0.25), 0 1px 3px rgba(0,0,0,0.3)";
              }}
            >
              Build My Protocol
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="mt-2.5 text-xs" style={{ color: "#4A4A5A", fontFamily: mono }}>
              Takes about 3 minutes
            </p>
          </div>
        </div>
      </motion.div>

      {/* Feature Preview Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-6">
        {[
          { icon: MessageCircle, label: "AI Coach", desc: "24/7 peptide guidance", color: "#F97316" },
          { icon: ListChecks, label: "Daily Protocol", desc: "Your exact daily stack", color: "#FB7185" },
          { icon: BarChart3, label: "Progress", desc: "Track your transformation", color: "#A78BFA" },
        ].map((card) => (
          <div
            key={card.label}
            className="relative rounded-[16px] p-5 transition-all duration-200 hover:opacity-70"
            style={{
              backgroundColor: "#111114",
              border: "1px solid rgba(255,255,255,0.05)",
              opacity: 0.5,
            }}
          >
            <Lock
              className="absolute top-3.5 right-3.5 w-3 h-3"
              style={{ color: "#4A4A5A", opacity: 0.4 }}
            />
            <div
              className="w-8 h-8 rounded-[10px] flex items-center justify-center mb-3.5"
              style={{ backgroundColor: "#19191E" }}
            >
              <card.icon className="w-4 h-4" style={{ color: card.color }} />
            </div>
            <p className="font-bold text-sm" style={{ color: "#EBEBF0", fontFamily: heading }}>
              {card.label}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#4A4A5A" }}>
              {card.desc}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Trust Strip */}
      <motion.div variants={itemVariants} className="text-center mt-9 mb-6">
        <p className="text-[11px] uppercase" style={{ color: "#4A4A5A", letterSpacing: "0.06em", fontFamily: mono }}>
          500+ STUDIES{" "}
          <span style={{ color: "rgba(249,115,22,0.3)" }}>·</span>{" "}
          ZERO BRO SCIENCE{" "}
          <span style={{ color: "rgba(249,115,22,0.3)" }}>·</span>{" "}
          YOUR DATA STAYS PRIVATE
        </p>
      </motion.div>
    </>
  );
}
