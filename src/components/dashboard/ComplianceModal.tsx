import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface ComplianceModalProps {
  onAccept: () => void;
}

export default function ComplianceModal({ onAccept }: ComplianceModalProps) {
  const [open, setOpen] = useState(false);
  const [checks, setChecks] = useState({
    notMedical: false,
    consultProfessionals: false,
    notFdaApproved: false,
    educationalOnly: false,
  });
  const { user } = useAuth();

  useEffect(() => {
    const checkCompliance = async () => {
      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("terms_accepted_at")
        .eq("user_id", user.id)
        .single();

      if (!data?.terms_accepted_at) {
        setOpen(true);
      }
    };

    checkCompliance();
  }, [user]);

  const allChecked = Object.values(checks).every(Boolean);

  const handleAccept = async () => {
    if (!user || !allChecked) return;

    await supabase
      .from("profiles")
      .update({ terms_accepted_at: new Date().toISOString() })
      .eq("user_id", user.id);

    setOpen(false);
    onAccept();
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="text-xl">Before You Begin</DialogTitle>
          <DialogDescription className="text-base pt-2">
            PeptideGPT is an educational research tool that provides information based on published scientific literature.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground font-medium">
            By continuing, you acknowledge:
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Checkbox
                id="notMedical"
                checked={checks.notMedical}
                onCheckedChange={(checked) =>
                  setChecks((prev) => ({ ...prev, notMedical: !!checked }))
                }
              />
              <Label htmlFor="notMedical" className="text-sm leading-tight cursor-pointer">
                This is not medical advice
              </Label>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="consultProfessionals"
                checked={checks.consultProfessionals}
                onCheckedChange={(checked) =>
                  setChecks((prev) => ({ ...prev, consultProfessionals: !!checked }))
                }
              />
              <Label htmlFor="consultProfessionals" className="text-sm leading-tight cursor-pointer">
                I will consult healthcare professionals before any use
              </Label>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="notFdaApproved"
                checked={checks.notFdaApproved}
                onCheckedChange={(checked) =>
                  setChecks((prev) => ({ ...prev, notFdaApproved: !!checked }))
                }
              />
              <Label htmlFor="notFdaApproved" className="text-sm leading-tight cursor-pointer">
                I understand peptides may not be FDA-approved for human use
              </Label>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="educationalOnly"
                checked={checks.educationalOnly}
                onCheckedChange={(checked) =>
                  setChecks((prev) => ({ ...prev, educationalOnly: !!checked }))
                }
              />
              <Label htmlFor="educationalOnly" className="text-sm leading-tight cursor-pointer">
                I am using this for educational/research purposes
              </Label>
            </div>
          </div>
        </div>

        <Button
          onClick={handleAccept}
          disabled={!allChecked}
          className="w-full"
        >
          I Understand – Continue
        </Button>
      </DialogContent>
    </Dialog>
  );
}
