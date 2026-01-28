import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
import { toast } from "sonner";

interface ComplianceModalProps {
  onAccept: () => void;
}

const checkboxItems = [
  { id: "notMedical", label: "This is not medical advice" },
  { id: "consultProfessionals", label: "I will consult healthcare professionals before any use" },
  { id: "notFdaApproved", label: "I understand peptides may not be FDA-approved for human use" },
  { id: "educationalOnly", label: "I am using this for educational/research purposes" },
];

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

      const { data, error } = await supabase
        .from("profiles")
        .select("terms_accepted_at")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Error checking compliance:", error);
      }

      if (!data?.terms_accepted_at) {
        setOpen(true);
      }
    };

    checkCompliance();
  }, [user]);

  const allChecked = Object.values(checks).every(Boolean);

  const handleAccept = async () => {
    if (!user || !allChecked) {
      return;
    }

    const { data: updateData, error: updateError } = await supabase
      .from("profiles")
      .update({ terms_accepted_at: new Date().toISOString() })
      .eq("user_id", user.id)
      .select();

    if (!updateError && (!updateData || updateData.length === 0)) {
      const { error: insertError } = await supabase
        .from("profiles")
        .insert({ 
          user_id: user.id, 
          terms_accepted_at: new Date().toISOString() 
        });

      if (insertError) {
        toast.error("Failed to save. Please try again.");
        return;
      }
    } else if (updateError) {
      toast.error("Failed to save. Please try again.");
      return;
    }

    setOpen(false);
    onAccept();
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md [&>button]:hidden border border-border bg-card flex flex-col max-h-[85vh] !overflow-visible rounded-xl">
        {/* Scrollable content */}
        <div className="flex-1 min-h-0 overflow-y-auto">
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
              {checkboxItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <Checkbox
                    id={item.id}
                    checked={checks[item.id as keyof typeof checks]}
                    onCheckedChange={(checked) =>
                      setChecks((prev) => ({ ...prev, [item.id]: !!checked }))
                    }
                    className="mt-0.5"
                  />
                  <Label htmlFor={item.id} className="text-sm leading-tight cursor-pointer">
                    {item.label}
                  </Label>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Fixed button */}
        <div className="pt-4 border-t border-border flex-shrink-0">
          <Button
            onClick={handleAccept}
            disabled={!allChecked}
            className="w-full"
          >
            I Understand – Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
