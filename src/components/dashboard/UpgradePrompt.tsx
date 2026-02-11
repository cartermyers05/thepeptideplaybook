import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface UpgradePromptProps {
  feature: string;
}

export function UpgradePrompt({ feature }: UpgradePromptProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6">
        <Lock className="w-8 h-8 text-muted-foreground" />
      </div>
      
      <h2 className="text-2xl font-semibold mb-2">
        {feature} Requires Full Access
      </h2>
      
      <p className="text-muted-foreground max-w-md mb-4">
        Get your full blueprint with {feature.toLowerCase()} and all other features.
      </p>
      
      <p className="text-sm text-primary font-medium mb-6">
        Early access: $67 <span className="line-through opacity-60 text-muted-foreground">$99</span>
      </p>
      
      <Button asChild size="lg" className="btn-primary-clean">
        <Link to="/checkout">
          Get Your Full Blueprint — $67
        </Link>
      </Button>
    </div>
  );
}
