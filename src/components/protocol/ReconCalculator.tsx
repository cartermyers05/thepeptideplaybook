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

  // Build dose options from compounds
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

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Vial Size */}
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: "#6B7280" }}>Vial Size</label>
          <select
            value={vialMg}
            onChange={(e) => setVialMg(Number(e.target.value))}
            className="w-full rounded-xl border px-4 py-3 text-[16px] bg-white focus:outline-none focus:ring-2 focus:ring-ring"
            style={{ borderColor: "#E5E7EB", minHeight: 48 }}
          >
            {VIAL_SIZES.map((s) => (
              <option key={s} value={s}>{s}mg</option>
            ))}
          </select>
        </div>

        {/* BAC Water */}
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: "#6B7280" }}>BAC Water to Add</label>
          <select
            value={bacWaterMl}
            onChange={(e) => setBacWaterMl(Number(e.target.value))}
            className="w-full rounded-xl border px-4 py-3 text-[16px] bg-white focus:outline-none focus:ring-2 focus:ring-ring"
            style={{ borderColor: "#E5E7EB", minHeight: 48 }}
          >
            {BAC_WATER.map((w) => (
              <option key={w} value={w}>{w}mL</option>
            ))}
          </select>
        </div>

        {/* Dose */}
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: "#6B7280" }}>Your Dose</label>
          <select
            value={doseMcg}
            onChange={(e) => setDoseMcg(Number(e.target.value))}
            className="w-full rounded-xl border px-4 py-3 text-[16px] bg-white focus:outline-none focus:ring-2 focus:ring-ring"
            style={{ borderColor: "#E5E7EB", minHeight: 48 }}
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
              className="w-full mt-2 rounded-xl border px-4 py-3 text-[16px] bg-white focus:outline-none focus:ring-2 focus:ring-ring"
              style={{ borderColor: "#E5E7EB" }}
            />
          )}
        </div>
      </div>

      {/* Results */}
      <div className="rounded-xl p-4" style={{ backgroundColor: "#FFF7ED" }}>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs" style={{ color: "#6B7280" }}>Concentration</p>
            <p className="text-lg font-bold font-mono" style={{ color: "#111827" }}>
              {concentration.toLocaleString()} mcg/mL
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs" style={{ color: "#6B7280" }}>Draw to</p>
            <p className="text-lg font-bold font-mono" style={{ color: "#F97316" }}>
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
        <h4 className="text-sm font-semibold mb-2" style={{ color: "#111827" }}>Steps</h4>
        <ol className="space-y-2 text-sm" style={{ color: "#374151" }}>
          <li>1. Clean both vial tops with an alcohol swab.</li>
          <li>2. Draw {bacWaterMl}mL of bacteriostatic water into your syringe.</li>
          <li>3. Insert the needle into the peptide vial at an angle.</li>
          <li>4. Push the water slowly down the SIDE of the vial — never spray directly onto the powder.</li>
          <li>5. Remove the needle. Let the vial sit for 5 minutes to dissolve. Swirl gently — never shake.</li>
          <li>6. Label the vial with today's date and the concentration. Store in refrigerator.</li>
        </ol>
      </div>
    </div>
  );
}
