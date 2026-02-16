import { useState, useMemo } from "react";
import { Compound } from "@/hooks/useUserProtocol";

const VIAL_SIZES = [2, 5, 10, 15, 20];
const BAC_WATER = [0.5, 1, 2, 3];

interface Props {
  compounds?: Compound[];
}

export function ReconCalculator({ compounds = [] }: Props) {
  const [vialMg, setVialMg] = useState(5);
  const [bacWaterMl, setBacWaterMl] = useState(1);
  const [doseMcg, setDoseMcg] = useState(250);
  const [customDose, setCustomDose] = useState("");

  const doseOptions = useMemo(() => {
    const opts: { label: string; value: number }[] = [];
    for (const c of compounds) {
      const match = c.dose?.match(/(\d+)\s*mcg/i);
      if (match) {
        opts.push({ label: `${match[1]}mcg (${c.name})`, value: parseInt(match[1]) });
      }
    }
    if (opts.length === 0) {
      opts.push({ label: "250mcg", value: 250 });
      opts.push({ label: "100mcg", value: 100 });
    }
    opts.push({ label: "Custom", value: -1 });
    return opts;
  }, [compounds]);

  const effectiveDose = doseMcg === -1 ? (parseInt(customDose) || 0) : doseMcg;
  const concentration = bacWaterMl > 0 ? (vialMg * 1000) / bacWaterMl : 0;
  const drawUnits = concentration > 0 ? Math.round((effectiveDose / concentration) * 100 * 10) / 10 : 0;

  const selectStyles: React.CSSProperties = {
    backgroundColor: "#FFFFFF",
    borderColor: "#E8EAED",
    color: "#0A0A0A",
    minHeight: 48,
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: "#9CA3AF" }}>Vial Size</label>
          <select
            value={vialMg}
            onChange={(e) => setVialMg(Number(e.target.value))}
            className="w-full rounded-xl border px-4 py-3 text-[16px] focus:outline-none focus:ring-2 focus:ring-ring"
            style={selectStyles}
          >
            {VIAL_SIZES.map((s) => (
              <option key={s} value={s}>{s}mg</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: "#9CA3AF" }}>BAC Water to Add</label>
          <select
            value={bacWaterMl}
            onChange={(e) => setBacWaterMl(Number(e.target.value))}
            className="w-full rounded-xl border px-4 py-3 text-[16px] focus:outline-none focus:ring-2 focus:ring-ring"
            style={selectStyles}
          >
            {BAC_WATER.map((w) => (
              <option key={w} value={w}>{w}mL</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: "#9CA3AF" }}>Your Dose</label>
          <select
            value={doseMcg}
            onChange={(e) => setDoseMcg(Number(e.target.value))}
            className="w-full rounded-xl border px-4 py-3 text-[16px] focus:outline-none focus:ring-2 focus:ring-ring"
            style={selectStyles}
          >
            {doseOptions.map((o) => (
              <option key={o.label} value={o.value}>{o.label}</option>
            ))}
          </select>
          {doseMcg === -1 && (
            <input
              type="number"
              value={customDose}
              onChange={(e) => setCustomDose(e.target.value)}
              placeholder="Enter mcg"
              className="w-full mt-2 rounded-xl border px-4 py-3 text-[16px] focus:outline-none focus:ring-2 focus:ring-ring"
              style={selectStyles}
            />
          )}
        </div>
      </div>

      {/* Results */}
      <div className="rounded-xl p-4" style={{ backgroundColor: "rgba(249,115,22,0.05)", border: "1px solid rgba(249,115,22,0.15)" }}>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs" style={{ color: "#9CA3AF" }}>Concentration</p>
            <p className="text-lg font-bold" style={{ color: "#0A0A0A", fontFamily: "JetBrains Mono, monospace" }}>
              {concentration.toLocaleString()} mcg/mL
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs" style={{ color: "#9CA3AF" }}>Draw to</p>
            <p className="text-lg font-bold" style={{ color: "#F97316", fontFamily: "JetBrains Mono, monospace" }}>
              {drawUnits} units
            </p>
          </div>
        </div>
        <p className="text-xs mt-2" style={{ color: "#9CA3AF" }}>
          on a standard 1mL / 100-unit insulin syringe
        </p>
      </div>

      {/* Steps */}
      <div>
        <h4 className="text-sm font-semibold mb-2" style={{ color: "#0A0A0A", fontFamily: "Outfit, sans-serif" }}>Steps</h4>
        <ol className="space-y-2 text-sm" style={{ color: "#4B5563" }}>
          {[
            `Clean both vial tops with an alcohol swab.`,
            `Draw ${bacWaterMl}mL of bacteriostatic water into your syringe.`,
            `Insert the needle into the peptide vial at an angle.`,
            `Push the water slowly down the SIDE of the vial — never spray directly onto the powder.`,
            `Remove the needle. Let the vial sit for 5 minutes to dissolve. Swirl gently — never shake.`,
            `Label the vial with today's date and the concentration. Store in refrigerator.`,
          ].map((step, i) => (
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
      </div>
    </div>
  );
}
