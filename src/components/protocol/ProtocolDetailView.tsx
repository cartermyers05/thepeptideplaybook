import { Protocol } from "@/hooks/useProtocol";
import { EvidenceRating } from "./EvidenceRating";
import { Download, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ProtocolDetailViewProps {
  protocol: Protocol;
  onBack: () => void;
}

const sections = [
  { id: "section-1", num: 1, title: "Why This Peptide For You" },
  { id: "section-2", num: 2, title: "Your Protocol (Week-by-Week)" },
  { id: "section-3", num: 3, title: "What to Expect (Timeline)" },
  { id: "section-4", num: 4, title: "Side Effects — What's Normal vs. What's Not" },
  { id: "section-5", num: 5, title: "Doctor Conversation Script" },
  { id: "section-6", num: 6, title: "Legal Status & Access" },
  { id: "section-7", num: 7, title: "What the Research Shows" },
  { id: "section-8", num: 8, title: "Alternatives If This Isn't Right" },
];

function getSectionContent(sectionId: string, protocol: Protocol): string {
  if (sectionId === "section-1") {
    return "You selected fat loss as your primary goal, and you mentioned you're concerned about safety. That's exactly why semaglutide is your top match. It's the most studied weight-loss peptide in history — not by a little, by a lot. We're talking 14,000+ participants across multiple Phase 3 trials, FDA approval, and real-world data from millions of prescriptions. You're not guinea-pigging anything here.";
  }
  const section = sections.find((s) => s.id === sectionId);
  return `[Content for this section will be loaded from the database. Section: ${section?.title}]`;
}

export function ProtocolDetailView({ protocol, onBack }: ProtocolDetailViewProps) {
  const primaryPeptide = protocol.peptides?.[0]?.name || "Peptide";

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
        {/* Row 1: Name + Peptide badge */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
          <h1
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              color: "#F1F5F9",
            }}
            className="text-2xl"
          >
            {protocol.protocol_name}
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
            {primaryPeptide}
          </span>
        </div>

        {/* Row 2: Evidence Rating */}
        <div className="mb-4">
          <EvidenceRating level={4} description="Strong — Multiple large-scale Phase 3 RCTs" />
        </div>

        {/* Row 3: Metadata */}
        <div className="mb-4 flex flex-wrap items-center gap-1" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#64748B" }}>
          <span>Last updated: February 2026</span>
          <span className="mx-1">·</span>
          <span>Based on peer-reviewed research · Not medical advice</span>
        </div>

        {/* Row 4: Download button */}
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

      {/* 8-Section Accordion */}
      <div
        className="rounded-2xl p-5 md:p-8"
        style={{ background: "#111827", border: "1px solid #1E293B" }}
      >
        <Accordion type="multiple" defaultValue={["section-1"]}>
          {sections.map((section) => (
            <AccordionItem
              key={section.id}
              value={section.id}
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
                    {section.num}
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
                  className="pl-4 md:pl-11"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: "#CBD5E1",
                    paddingTop: 0,
                    paddingBottom: 24,
                  }}
                >
                  {getSectionContent(section.id, protocol)}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
