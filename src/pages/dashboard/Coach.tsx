import { useSearchParams } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useTier } from "@/hooks/useTier";
import { UpgradePrompt } from "@/components/dashboard/UpgradePrompt";
import ChatInterface from "@/components/dashboard/ChatInterface";
import ComplianceModal from "@/components/dashboard/ComplianceModal";

export default function Coach() {
  const { isPaid } = useTier();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const conversationId = searchParams.get("conversation");

  const handleConversationChange = (newConversationId: string | null) => {
    if (newConversationId) {
      setSearchParams({ conversation: newConversationId });
    } else {
      setSearchParams({});
    }
  };

  if (!isPaid) {
    return (
      <DashboardLayout>
        <UpgradePrompt feature="Peptide Playbook AI" />
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
