import { useState } from "react";

const SITES = [
  { id: "left-abdomen", label: "Left Abdomen", cx: 42, cy: 48, instructions: "2 inches left of the navel. Pinch skin firmly." },
  { id: "right-abdomen", label: "Right Abdomen", cx: 58, cy: 48, instructions: "2 inches right of the navel. Pinch skin firmly." },
  { id: "left-thigh", label: "Left Thigh", cx: 40, cy: 72, instructions: "Front or outer thigh, middle third between knee and hip." },
  { id: "right-thigh", label: "Right Thigh", cx: 60, cy: 72, instructions: "Front or outer thigh, middle third between knee and hip." },
  { id: "left-deltoid", label: "Left Deltoid", cx: 28, cy: 30, instructions: "Upper outer arm, 2-3 finger widths below shoulder bone." },
  { id: "right-deltoid", label: "Right Deltoid", cx: 72, cy: 30, instructions: "Upper outer arm, 2-3 finger widths below shoulder bone." },
];

const INJECTION_STEPS = [
  "Pinch 1-2 inches of skin between your fingers.",
  "Insert the needle at a 45° angle.",
  "Push the plunger slowly and steadily.",
  "Remove the needle and apply gentle pressure with a cotton ball.",
];

export function InjectionSiteGuide() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedSite = SITES.find((s) => s.id === selected);

  return (
    <div className="space-y-4">
      {/* Body outline SVG */}
      <div className="relative mx-auto" style={{ maxWidth: 280 }}>
        <svg viewBox="0 0 100 100" className="w-full">
          {/* Simple body silhouette */}
          <ellipse cx="50" cy="14" rx="8" ry="10" fill="none" stroke="#4B5563" strokeWidth="1.5" />
          <line x1="50" y1="24" x2="50" y2="55" stroke="#4B5563" strokeWidth="1.5" />
          <line x1="50" y1="30" x2="28" y2="38" stroke="#4B5563" strokeWidth="1.5" />
          <line x1="50" y1="30" x2="72" y2="38" stroke="#4B5563" strokeWidth="1.5" />
          <line x1="50" y1="55" x2="38" y2="85" stroke="#4B5563" strokeWidth="1.5" />
          <line x1="50" y1="55" x2="62" y2="85" stroke="#4B5563" strokeWidth="1.5" />

          {/* Hotspots */}
          {SITES.map((site) => (
            <circle
              key={site.id}
              cx={site.cx}
              cy={site.cy}
              r="4"
              fill={selected === site.id ? "rgba(249,115,22,0.2)" : "transparent"}
              stroke="#F97316"
              strokeWidth="1.5"
              className="cursor-pointer"
              onClick={() => setSelected(selected === site.id ? null : site.id)}
            />
          ))}
        </svg>
      </div>

      {/* Instructions */}
      {selectedSite ? (
        <div className="rounded-xl p-4" style={{ backgroundColor: "#FAFAFA", border: "1px solid #E8EAED" }}>
          <p className="font-semibold text-[15px] mb-2" style={{ color: "#0A0A0A", fontFamily: "Outfit, sans-serif" }}>
            {selectedSite.label}
          </p>
          <p className="text-sm mb-3" style={{ color: "#4B5563" }}>
            {selectedSite.instructions}
          </p>
          <ol className="space-y-1.5 text-sm" style={{ color: "#4B5563" }}>
            {INJECTION_STEPS.map((step, i) => (
              <li key={i} className="flex gap-2 items-start">
                <span
                  className="text-xs font-mono flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                  style={{ backgroundColor: "rgba(249,115,22,0.1)", color: "#F97316" }}
                >
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <p className="text-xs italic mt-3" style={{ color: "#9CA3AF" }}>
            Rotate injection sites to avoid tissue buildup. Don't use the same spot within 7 days.
          </p>
        </div>
      ) : (
        <p className="text-center text-sm" style={{ color: "#9CA3AF" }}>
          Tap a site to see injection instructions
        </p>
      )}
    </div>
  );
}
