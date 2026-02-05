import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useUpdateProfile } from "@/hooks/useProfile";
import { useToast } from "@/hooks/use-toast";

interface AIDisclaimerModalProps {
  onAccepted: () => void;
}

export function AIDisclaimerModal({ onAccepted }: AIDisclaimerModalProps) {
  const [isChecked, setIsChecked] = useState(false);
  const updateProfile = useUpdateProfile();
  const { toast } = useToast();

  const handleContinue = async () => {
    if (!isChecked) return;

    try {
      await updateProfile.mutateAsync({
        ai_disclaimer_accepted_at: new Date().toISOString(),
      });
      onAccepted();
    } catch (error) {
      console.error("Failed to save disclaimer acceptance:", error);
      toast({
        title: "Error",
        description: "Failed to save. Please try again.",
        variant: "destructive",
      });
      // Keep modal open on failure - don't call onAccepted()
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-lg" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Before you continue
          </DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <div className="space-y-4 pt-2">
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-foreground">•</span>
                <span>This tool provides educational information based on published peptide research</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground">•</span>
                <span>Nothing here constitutes medical advice, diagnosis, or treatment recommendations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground">•</span>
                <span>Always consult a licensed healthcare provider before making health decisions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground">•</span>
                <span>By continuing, you acknowledge you understand these terms</span>
              </li>
            </ul>

            <div className="flex items-start gap-3 pt-2">
              <Checkbox
                id="ai-disclaimer"
                checked={isChecked}
                onCheckedChange={(checked) => setIsChecked(!!checked)}
              />
              <label 
                htmlFor="ai-disclaimer" 
                className="text-sm cursor-pointer text-foreground font-medium"
              >
                I understand
              </label>
            </div>

            <Button
              onClick={handleContinue}
              disabled={!isChecked || updateProfile.isPending}
              className="w-full"
            >
              {updateProfile.isPending ? "Saving..." : "Continue"}
            </Button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
