import { useSearchParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useTier } from "@/hooks/useTier";
import { UpgradePrompt } from "@/components/dashboard/UpgradePrompt";
import ChatInterface from "@/components/dashboard/ChatInterface";
import ComplianceModal from "@/components/dashboard/ComplianceModal";

export default function ChatPage() {
  const { isPaid } = useTier();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const conversationId = searchParams.get("conversation");

  const handleConversationChange = (newConversationId: string | null) => {
    if (newConversationId) {
      setSearchParams({ conversation: newConversationId });
    } else {
      // Clear the query param for new chat
      setSearchParams({});
    }
  };

  if (!isPaid) {
    return (
      <DashboardLayout>
        <UpgradePrompt feature="AI Research Assistant" />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ComplianceModal onAccept={() => {}} />
      <div className="h-[calc(100vh-6rem)]">
        <ChatInterface 
          initialConversationId={conversationId}
          onConversationChange={handleConversationChange}
        />
      </div>
    </DashboardLayout>
  );
}
