import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { WelcomeStep1 } from "./WelcomeStep1";
import { WelcomeStep2 } from "./WelcomeStep2";
import { WelcomeStep3 } from "./WelcomeStep3";
import { useCourse } from "@/hooks/useCourse";

interface WelcomeModalProps {
  open: boolean;
  onComplete: () => void;
  courseTitle: string;
  durationWeeks: number;
}

export type SuppliesStatus = 'have_them' | 'this_week' | 'need_to_order';

export function WelcomeModal({ open, onComplete, courseTitle, durationWeeks }: WelcomeModalProps) {
  const [step, setStep] = useState(1);
  const [suppliesStatus, setSuppliesStatus] = useState<SuppliesStatus | null>(null);
  const { userCourse, updateCourseStatus } = useCourse();

  const handleStep1Complete = () => {
    setStep(2);
  };

  const handleStep2Complete = async (status: SuppliesStatus) => {
    setSuppliesStatus(status);
    
    // Update course status in database
    if (userCourse) {
      const newStatus = status === 'have_them' ? 'active' : 'waiting_supplies';
      await updateCourseStatus.mutateAsync({
        courseId: userCourse.id,
        status: newStatus as 'not_started' | 'waiting_supplies' | 'active' | 'completed',
        suppliesStatus: status,
        startedAt: status === 'have_them' ? new Date().toISOString() : undefined,
      });
    }
    
    setStep(3);
  };

  const handleStep3Complete = () => {
    onComplete();
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-lg p-0 gap-0 overflow-hidden" onPointerDownOutside={(e) => e.preventDefault()}>
        {step === 1 && (
          <WelcomeStep1
            courseTitle={courseTitle}
            durationWeeks={durationWeeks}
            onContinue={handleStep1Complete}
          />
        )}
        {step === 2 && (
          <WelcomeStep2 onSelect={handleStep2Complete} />
        )}
        {step === 3 && suppliesStatus && (
          <WelcomeStep3
            suppliesStatus={suppliesStatus}
            onComplete={handleStep3Complete}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
