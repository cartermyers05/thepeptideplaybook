import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface ConversationMessage {
  id: string;
  conversation_id: string;
  user_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
  is_saved: boolean | null;
  helpful: boolean | null;
}

export function useConversationMessages(conversationId: string | null) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["conversation-messages", conversationId],
    queryFn: async () => {
      if (!conversationId || !user?.id) return [];

      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data as ConversationMessage[];
    },
    enabled: !!conversationId && !!user?.id,
  });
}
