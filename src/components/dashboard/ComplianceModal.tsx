import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
      console.log("Cannot accept:", { user: !!user, allChecked });
      return;
    }

    console.log("Attempting to save acceptance for user:", user.id);

    const { data: updateData, error: updateError } = await supabase
      .from("profiles")
      .update({ terms_accepted_at: new Date().toISOString() })
      .eq("user_id", user.id)
      .select();

    console.log("Update result:", { updateData, updateError });

    if (!updateError && (!updateData || updateData.length === 0)) {
      console.log("No profile found, creating one...");
      const { error: insertError } = await supabase
        .from("profiles")
        .insert({ 
          user_id: user.id, 
          terms_accepted_at: new Date().toISOString() 
        });

      if (insertError) {
        console.error("Error creating profile:", insertError);
        toast.error("Failed to save. Please try again.");
        return;
      }
    } else if (updateError) {
      console.error("Error saving acceptance:", updateError);
      toast.error("Failed to save. Please try again.");
      return;
    }

    console.log("Success! Closing modal...");
    setOpen(false);
    onAccept();
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md [&>button]:hidden glass-panel border-0 flex flex-col max-h-[85vh] !overflow-visible">
        {/* Background ambient effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
          <motion.div 
            className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/10 blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div 
            className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-primary/8 blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 min-h-0 overflow-y-auto relative z-10">
          <DialogHeader>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <DialogTitle className="text-xl">Before You Begin</DialogTitle>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <DialogDescription className="text-base pt-2">
                PeptideGPT is an educational research tool that provides information based on published scientific literature.
              </DialogDescription>
            </motion.div>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-muted-foreground font-medium"
            >
              By continuing, you acknowledge:
            </motion.p>

            <div className="space-y-3">
              {checkboxItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
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

        {/* Fixed button at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="pt-4 border-t border-border/20 relative z-10 flex-shrink-0"
        >
          <Button
            onClick={handleAccept}
            disabled={!allChecked}
            className={`w-full bg-gradient-primary hover:opacity-90 transition-all ${
              allChecked ? "glow-primary" : ""
            }`}
          >
            I Understand – Continue
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
