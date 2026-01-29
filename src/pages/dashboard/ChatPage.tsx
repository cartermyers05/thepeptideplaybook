import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useTier } from "@/hooks/useTier";
import { UpgradePrompt } from "@/components/dashboard/UpgradePrompt";
import ChatInterface from "@/components/dashboard/ChatInterface";
import ComplianceModal from "@/components/dashboard/ComplianceModal";

export default function ChatPage() {
  const { canAccessChat } = useTier();

  if (!canAccessChat) {
    return (
      <DashboardLayout>
        <UpgradePrompt requiredTier="pro" feature="AI Research Assistant" />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ComplianceModal onAccept={() => {}} />
      <div className="h-[calc(100vh-6rem)]">
        <ChatInterface />
      </div>
    </DashboardLayout>
  );
}
