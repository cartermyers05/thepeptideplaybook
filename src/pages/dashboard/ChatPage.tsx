import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useTier } from "@/hooks/useTier";
import { UpgradePrompt } from "@/components/dashboard/UpgradePrompt";
import ChatInterface from "@/components/dashboard/ChatInterface";

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
      <div className="h-[calc(100vh-6rem)]">
        <ChatInterface />
      </div>
    </DashboardLayout>
  );
}
