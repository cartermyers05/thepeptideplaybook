import { useState } from "react";
import { Calculator, Droplets, FlaskConical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DosingCalculatorProps {
  defaultVialSize?: number;
  defaultWaterMl?: number;
  doseTiers?: number[];
}

export function DosingCalculator({
  defaultVialSize = 5,
  defaultWaterMl = 2,
  doseTiers = [0.25, 0.5, 1.0],
}: DosingCalculatorProps) {
  const [vialSizeMg, setVialSizeMg] = useState(defaultVialSize);
  const [waterMl, setWaterMl] = useState(defaultWaterMl);

  // Formula: (dose_mg / vial_mg) * water_ml * 100 = units
  const calculateUnits = (doseMg: number) => {
    if (vialSizeMg <= 0 || waterMl <= 0) return 0;
    return Math.round((doseMg / vialSizeMg) * waterMl * 100);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Green gradient top bar */}
      <div className="h-1 bg-gradient-to-r from-emerald-300 to-emerald-500" />
      
      <div className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-semibold text-black">Dosing Calculator</h3>
            <p className="text-xs text-gray-500">Calculate units to draw</p>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label className="text-xs text-gray-500 mb-1 flex items-center gap-1">
              <FlaskConical className="w-3 h-3" />
              Vial Size (mg)
            </Label>
            <Input
              type="number"
              value={vialSizeMg}
              onChange={(e) => setVialSizeMg(Number(e.target.value))}
              className="h-9"
              min={0.1}
              step={0.5}
            />
          </div>
          <div>
            <Label className="text-xs text-gray-500 mb-1 flex items-center gap-1">
              <Droplets className="w-3 h-3" />
              Water Added (ml)
            </Label>
            <Input
              type="number"
              value={waterMl}
              onChange={(e) => setWaterMl(Number(e.target.value))}
              className="h-9"
              min={0.1}
              step={0.5}
            />
          </div>
        </div>

        {/* Results */}
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
          <p className="text-xs font-medium text-emerald-700 mb-3">Units to Draw</p>
          <div className="space-y-2">
            {doseTiers.map((dose) => (
              <div
                key={dose}
                className="flex justify-between items-center text-sm"
              >
                <span className="font-medium text-black">{dose}mg</span>
                <span className="text-emerald-700 font-bold">
                  {calculateUnits(dose)} units
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Formula explanation */}
        <p className="text-xs text-gray-400 mt-3 text-center">
          Formula: (dose ÷ vial) × water × 100
        </p>
      </div>
    </div>
  );
}
