import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckInFlow } from "@/components/coach/CheckInFlow";
import { ReconGuide } from "@/components/coach/ReconGuide";
import { InjectionGuide } from "@/components/coach/InjectionGuide";
import { AskCoach } from "@/components/coach/AskCoach";
import { ClipboardCheck, Beaker, Syringe, MessageCircle } from "lucide-react";
import { useProtocol } from "@/hooks/useProtocol";
import { useStreak } from "@/hooks/useStreak";

export default function Coach() {
  const [activeTab, setActiveTab] = useState("check-in");
  const { protocol } = useProtocol();
  const { currentStreak } = useStreak();

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* Header with status */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl font-semibold">AI Coach</h1>
            <p className="text-muted-foreground">
              Your personal guide through your peptide journey
            </p>
          </div>
          {protocol?.status === "active" && (
            <div className="flex items-center gap-3 text-sm">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                🔥 {currentStreak}-day streak
              </span>
              <span className="text-muted-foreground">
                Day {protocol.current_day} of {protocol.cycle_length_weeks * 7}
              </span>
            </div>
          )}
        </div>

        {/* Tab Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-auto">
            <TabsTrigger value="check-in" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 py-2">
              <ClipboardCheck className="w-4 h-4" />
              <span className="text-xs md:text-sm">Check-In</span>
            </TabsTrigger>
            <TabsTrigger value="reconstitution" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 py-2">
              <Beaker className="w-4 h-4" />
              <span className="text-xs md:text-sm">Reconstitution</span>
            </TabsTrigger>
            <TabsTrigger value="injection" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 py-2">
              <Syringe className="w-4 h-4" />
              <span className="text-xs md:text-sm">Injection</span>
            </TabsTrigger>
            <TabsTrigger value="ask" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 py-2">
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs md:text-sm">Ask Coach</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="check-in" className="mt-0">
              <CheckInFlow />
            </TabsContent>
            <TabsContent value="reconstitution" className="mt-0">
              <ReconGuide />
            </TabsContent>
            <TabsContent value="injection" className="mt-0">
              <InjectionGuide />
            </TabsContent>
            <TabsContent value="ask" className="mt-0">
              <AskCoach />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
