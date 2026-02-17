import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, ListChecks, BarChart3, Lock } from "lucide-react";

const itemVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const jakarta = "'Plus Jakarta Sans', sans-serif";
const mono = "'IBM Plex Mono', 'JetBrains Mono', ui-monospace, monospace";

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
          style={{
            fontFamily: jakarta,
            fontWeight: 800,
            fontSize: 32,
            color: "#EBEBF0",
            letterSpacing: "-0.035em",
          }}
          className="text-[28px] md:text-[32px]"
        >
          Hey {firstName}
        </h1>
        <p className="mt-1" style={{ fontSize: 15, fontWeight: 500, color: "#8A8A9A" }}>
          Your protocol starts here.
        </p>
      </motion.div>

      {/* Hero CTA Card */}
      <motion.div
        variants={itemVariants}
        className="rounded-[24px] relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #111114 0%, #16131E 50%, #131118 100%)",
          border: "1px solid rgba(255,255,255,0.06)",
          padding: "36px 32px",
        }}
      >
        {/* Decorative hexagons */}
        <div className="hidden md:block absolute pointer-events-none" style={{ right: -20, bottom: -30 }}>
          <svg width={240} height={240} viewBox="0 0 100 100" style={{ transform: "rotate(12deg)" }}>
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
            style={{ position: "absolute", right: 40, bottom: 60, transform: "rotate(-8deg)" }}
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
            style={{
              fontFamily: mono,
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#F97316",
            }}
          >
            PROTOCOL ENGINE
          </span>

          <h2
            className="mt-3 text-[28px] md:text-[36px]"
            style={{
              fontFamily: jakarta,
              fontWeight: 800,
              color: "#EBEBF0",
              letterSpacing: "-0.035em",
              lineHeight: 1.15,
            }}
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

          <p
            className="mt-3 max-w-[500px]"
            style={{ fontSize: 15, color: "#8A8A9A", lineHeight: 1.6 }}
          >
            Our AI asks about your goals, body, and experience — then builds your exact stack with
            compounds, doses, schedule, and safety guidelines.
          </p>

          <button
            onClick={() => navigate("/dashboard/coach")}
            className="mt-7 inline-flex items-center gap-2 rounded-[14px] font-bold text-[15px] text-white transition-all duration-200 hover:-translate-y-px active:translate-y-0"
            style={{
              fontFamily: jakarta,
              background: "linear-gradient(135deg, #F97316, #EA580C)",
              height: 52,
              padding: "0 32px",
              boxShadow: "0 4px 24px rgba(249,115,22,0.25), 0 1px 3px rgba(0,0,0,0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 6px 32px rgba(249,115,22,0.35), 0 1px 3px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 4px 24px rgba(249,115,22,0.25), 0 1px 3px rgba(0,0,0,0.3)";
            }}
          >
            Build My Protocol
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="mt-2.5" style={{ fontFamily: mono, fontSize: 12, color: "#4A4A5A" }}>
            Takes about 3 minutes
          </p>
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
            className="relative rounded-[16px] p-5 transition-all duration-200 hover:opacity-70 hover:border-[rgba(255,255,255,0.1)]"
            style={{
              backgroundColor: "#111114",
              border: "1px solid rgba(255,255,255,0.05)",
              opacity: 0.5,
            }}
          >
            <Lock
              className="absolute top-4 right-4"
              style={{ width: 12, height: 12, color: "#4A4A5A", opacity: 0.4 }}
            />
            <div
              className="w-8 h-8 rounded-[10px] flex items-center justify-center mb-3.5"
              style={{ backgroundColor: "#19191E" }}
            >
              <card.icon className="w-4 h-4" style={{ color: card.color }} />
            </div>
            <p
              className="font-bold text-[14px] mb-0.5"
              style={{ color: "#EBEBF0", fontFamily: jakarta }}
            >
              {card.label}
            </p>
            <p className="text-[12px]" style={{ color: "#4A4A5A", fontWeight: 500 }}>
              {card.desc}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Trust Strip */}
      <motion.div variants={itemVariants} className="text-center mt-9 mb-8">
        <p
          style={{
            fontFamily: mono,
            fontSize: 11,
            color: "#4A4A5A",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          500+ STUDIES{" "}
          <span style={{ color: "rgba(249,115,22,0.3)" }}>·</span> ZERO BRO SCIENCE{" "}
          <span style={{ color: "rgba(249,115,22,0.3)" }}>·</span> YOUR DATA STAYS PRIVATE
        </p>
      </motion.div>
    </>
  );
}
