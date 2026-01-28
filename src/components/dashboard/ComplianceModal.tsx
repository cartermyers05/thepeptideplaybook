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
import { AlertTriangle } from "lucide-react";

interface ComplianceModalProps {
  onAccept: () => void;
}

const checkboxItems = [
  { id: "notMedical", label: "This is NOT medical advice and cannot replace a healthcare provider" },
  { id: "noDosing", label: "I will NOT rely on this tool for dosing, treatment, or self-experimentation" },
  { id: "consultProfessionals", label: "I MUST consult a licensed healthcare professional before any peptide use" },
  { id: "notFdaApproved", label: "Most peptides discussed are NOT FDA-approved for human use" },
  { id: "educationalOnly", label: "I am using this strictly for educational/research purposes" },
  { id: "ageConfirmation", label: "I am 18 years of age or older" },
];

export default function ComplianceModal({ onAccept }: ComplianceModalProps) {
  const [open, setOpen] = useState(false);
  const [checks, setChecks] = useState({
    notMedical: false,
    noDosing: false,
    consultProfessionals: false,
    notFdaApproved: false,
    educationalOnly: false,
    ageConfirmation: false,
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

          {/* Legal Warning Box */}
          <div className="mt-4 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-amber-700 dark:text-amber-500 mb-2">
                  IMPORTANT LEGAL NOTICE
                </p>
                <ul className="space-y-1.5 text-foreground/80">
                  <li>• This is NOT medical advice</li>
                  <li>• Most peptides discussed are NOT FDA-approved for human use</li>
                  <li>• I cannot provide dosing, sourcing, or treatment recommendations</li>
                  <li>• Always consult a licensed healthcare provider</li>
                </ul>
              </div>
            </div>
          </div>

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
