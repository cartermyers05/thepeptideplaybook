import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import type { Tier } from "@/hooks/useTier";

interface UpgradePromptProps {
  requiredTier: Tier;
  feature: string;
}

const TIER_LABELS: Record<Tier, string> = {
  free: "Free",
  starter: "Starter",
  pro: "Pro",
  insider: "Insider",
};

export function UpgradePrompt({ requiredTier, feature }: UpgradePromptProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6">
        <Lock className="w-8 h-8 text-muted-foreground" />
      </div>
      
      <h2 className="text-2xl font-semibold mb-2">
        {feature} Requires {TIER_LABELS[requiredTier]}
      </h2>
      
      <p className="text-muted-foreground max-w-md mb-8">
        Upgrade to {TIER_LABELS[requiredTier]} or higher to unlock {feature.toLowerCase()} and all its features.
      </p>
      
      <Button asChild size="lg" className="btn-primary-clean">
        <Link to="/pricing">
          View Pricing Options
        </Link>
      </Button>
    </div>
  );
}
