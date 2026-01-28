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
      <div className="min-h-screen bg-background flex flex-col mesh-gradient">
        {/* Ambient background orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl orb-1" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-primary/3 blur-3xl orb-2" />
        </div>

        {/* Compliance Modal */}
        <ComplianceModal onAccept={() => setComplianceAccepted(true)} />

        {/* Header with floating tabs */}
        <DashboardHeader activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Disclaimer Banner */}
        <DisclaimerBanner />

        {/* Main content */}
        <main className="flex-1 flex flex-col relative">
          <AnimatePresence mode="wait">
            {activeTab === "news" ? (
              <motion.div
                key="news"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ 
                  duration: 0.3, 
                  ease: [0.4, 0, 0.2, 1]
                }}
                className="flex-1"
              >
                <ScrollArea className="h-[calc(100vh-140px)]">
                  <NewsFeed />
                </ScrollArea>
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ 
                  duration: 0.3, 
                  ease: [0.4, 0, 0.2, 1]
                }}
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
