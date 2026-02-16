import { CheckCircle2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AIQualityBadgeProps {
  className?: string;
}

export function AIQualityBadge({ className = "" }: AIQualityBadgeProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full cursor-default ${className}`}
            style={{
              backgroundColor: "hsl(var(--accent) / 0.15)",
              color: "hsl(var(--accent-foreground))",
            }}
          >
            <CheckCircle2 className="w-3 h-3" style={{ color: "#22C55E" }} />
            AI-verified
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[240px] text-center">
          <p className="text-xs">
            This response was checked for scientific accuracy and safety compliance.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
