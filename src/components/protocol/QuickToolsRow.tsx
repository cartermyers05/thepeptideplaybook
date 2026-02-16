import { useState } from "react";
import { motion } from "framer-motion";
import { Beaker, Syringe, Stethoscope, Copy, Check } from "lucide-react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { ReconCalculator } from "./ReconCalculator";
import { InjectionSiteGuide } from "./InjectionSiteGuide";
import { Compound, DoctorScript } from "@/hooks/useUserProtocol";
import { toast } from "sonner";

interface Props {
  compounds: Compound[];
  doctorScript?: DoctorScript | null;
}

export function QuickToolsRow({ compounds, doctorScript }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="grid grid-cols-3 gap-3"
    >
      {/* Mixing Calculator */}
      <Drawer>
        <DrawerTrigger asChild>
          <ToolCard icon={<Beaker className="w-5 h-5" />} label="Mixing Calculator" color="#3B82F6" />
        </DrawerTrigger>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader>
            <DrawerTitle style={{ fontFamily: "Outfit, sans-serif" }}>Mixing Calculator</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6 overflow-y-auto">
            <ReconCalculator compounds={compounds} />
          </div>
        </DrawerContent>
      </Drawer>

      {/* Injection Guide */}
      <Drawer>
        <DrawerTrigger asChild>
          <ToolCard icon={<Syringe className="w-5 h-5" />} label="Injection Guide" color="#22C55E" />
        </DrawerTrigger>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader>
            <DrawerTitle style={{ fontFamily: "Outfit, sans-serif" }}>Injection Site Guide</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6 overflow-y-auto">
            <InjectionSiteGuide />
          </div>
        </DrawerContent>
      </Drawer>

      {/* Doctor Script */}
      {doctorScript ? (
        <Drawer>
          <DrawerTrigger asChild>
            <ToolCard icon={<Stethoscope className="w-5 h-5" />} label="Doctor Script" color="#A78BFA" />
          </DrawerTrigger>
          <DrawerContent className="max-h-[85vh]">
            <DrawerHeader>
              <DrawerTitle style={{ fontFamily: "Outfit, sans-serif" }}>Doctor Conversation Script</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-6 overflow-y-auto">
              <DoctorScriptContent script={doctorScript} />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <ToolCard icon={<Stethoscope className="w-5 h-5" />} label="Doctor Script" color="#9CA3AF" disabled />
      )}
    </motion.div>
  );
}

// Tool card button
import React from "react";

const ToolCard = React.forwardRef<HTMLButtonElement, {
  icon: React.ReactNode;
  label: string;
  color: string;
  disabled?: boolean;
  onClick?: () => void;
}>(({ icon, label, color, disabled, onClick, ...props }, ref) => (
  <button
    ref={ref}
    onClick={onClick}
    disabled={disabled}
    className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40"
    style={{
      backgroundColor: "#FFFFFF",
      border: "1px solid #E8EAED",
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    }}
    {...props}
  >
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center"
      style={{ backgroundColor: `${color}10`, color }}
    >
      {icon}
    </div>
    <span className="text-[11px] font-medium text-center leading-tight" style={{ color: "#4B5563" }}>
      {label}
    </span>
  </button>
));
ToolCard.displayName = "ToolCard";

// Doctor script content inside drawer
function DoctorScriptContent({ script }: { script: DoctorScript }) {
  const [copied, setCopied] = useState(false);

  const fullScript = [
    `Opening: "${script.opening_line}"`,
    "",
    "Studies to reference:",
    ...(script.studies_to_reference || []).map((s, i) => `${i + 1}. ${s.title} (${s.journal}, ${s.year}) — ${s.key_finding}`),
    "",
    "Questions to ask your doctor:",
    ...(script.questions_to_ask || []).map((q, i) => `${i + 1}. ${q}`),
  ].join("\n");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullScript);
    setCopied(true);
    toast.success("Script copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm" style={{ color: "#4B5563" }}>A personalized script for your healthcare provider</p>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:opacity-80"
          style={{ backgroundColor: "#F3F4F6", color: "#4B5563" }}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied!" : "Copy Script"}
        </button>
      </div>

      <div className="rounded-xl p-4" style={{ backgroundColor: "rgba(59,130,246,0.05)", border: "1px solid rgba(59,130,246,0.12)" }}>
        <p className="text-xs font-semibold mb-1" style={{ color: "#3B82F6" }}>Opening Line</p>
        <p className="text-sm italic" style={{ color: "#4B5563" }}>"{script.opening_line}"</p>
      </div>

      {script.studies_to_reference?.length > 0 && (
        <div>
          <p className="text-xs font-semibold mb-2" style={{ color: "#9CA3AF" }}>Studies to Reference</p>
          <div className="space-y-2">
            {script.studies_to_reference.map((study, i) => (
              <div key={i} className="rounded-lg p-3" style={{ backgroundColor: "#FAFAFA", border: "1px solid #E8EAED" }}>
                <p className="text-sm font-medium" style={{ color: "#0A0A0A" }}>{study.title}</p>
                <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{study.journal}, {study.year}</p>
                <p className="text-sm mt-1" style={{ color: "#4B5563" }}>{study.key_finding}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {script.questions_to_ask?.length > 0 && (
        <div>
          <p className="text-xs font-semibold mb-2" style={{ color: "#9CA3AF" }}>Questions to Ask</p>
          <div className="space-y-1.5">
            {script.questions_to_ask.map((q, i) => (
              <div key={i} className="flex gap-2 items-start">
                <span className="text-xs font-mono flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: "#F3F4F6", color: "#4B5563" }}>
                  {i + 1}
                </span>
                <p className="text-sm" style={{ color: "#4B5563" }}>{q}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
