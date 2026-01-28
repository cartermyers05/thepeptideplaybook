import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import DisclaimerBanner from "@/components/dashboard/DisclaimerBanner";
import ComplianceModal from "@/components/dashboard/ComplianceModal";
import NewsFeed from "@/components/dashboard/NewsFeed";
import ChatInterface from "@/components/dashboard/ChatInterface";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function Chat() {
  const [activeTab, setActiveTab] = useState<"news" | "chat">("news");
  const [complianceAccepted, setComplianceAccepted] = useState(false);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background flex flex-col">
        {/* Compliance Modal */}
        <ComplianceModal onAccept={() => setComplianceAccepted(true)} />

        {/* Header with floating tabs */}
        <DashboardHeader activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Disclaimer Banner */}
        <DisclaimerBanner />

        {/* Main content */}
        <main className="flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            {activeTab === "news" ? (
              <motion.div
                key="news"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex-1"
              >
                <ScrollArea className="h-[calc(100vh-140px)]">
                  <NewsFeed />
                </ScrollArea>
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex-1 h-[calc(100vh-140px)]"
              >
                <ChatInterface />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </TooltipProvider>
  );
}
