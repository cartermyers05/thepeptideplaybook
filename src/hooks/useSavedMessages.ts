import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface SavedMessage {
  id: string;
  content: string;
  created_at: string;
  conversation_id: string;
  question: string | null;
}

export function useSavedMessages() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["saved-messages", user?.id],
    queryFn: async (): Promise<SavedMessage[]> => {
      // Get saved assistant messages
      const { data: messages, error } = await supabase
        .from("messages")
        .select("id, content, created_at, conversation_id")
        .eq("user_id", user!.id)
        .eq("role", "assistant")
        .eq("is_saved", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (!messages) return [];

      // For each message, get the preceding user message (question)
      const messagesWithQuestions = await Promise.all(
        messages.map(async (msg) => {
          const { data: userMessage } = await supabase
            .from("messages")
            .select("content")
            .eq("conversation_id", msg.conversation_id)
            .eq("role", "user")
            .lt("created_at", msg.created_at)
            .order("created_at", { ascending: false })
            .limit(1)
            .maybeSingle();

          return {
            ...msg,
            question: userMessage?.content || null,
          };
        })
      );

      return messagesWithQuestions;
    },
    enabled: !!user?.id,
  });
}

export function useToggleSaveMessage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ messageId, isSaved }: { messageId: string; isSaved: boolean }) => {
      const { error } = await supabase
        .from("messages")
        .update({ is_saved: isSaved })
        .eq("id", messageId)
        .eq("user_id", user!.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-messages", user?.id] });
    },
  });
}
