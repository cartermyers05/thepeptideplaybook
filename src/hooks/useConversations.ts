import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface ConversationWithPreview {
  id: string;
  title: string | null;
  created_at: string;
  updated_at: string;
  preview: string | null;
  message_count: number;
}

export function useConversations() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["conversations", user?.id],
    queryFn: async (): Promise<ConversationWithPreview[]> => {
      // Get conversations
      const { data: conversations, error } = await supabase
        .from("conversations")
        .select("*")
        .eq("user_id", user!.id)
        .order("updated_at", { ascending: false });

      if (error) throw error;
      if (!conversations) return [];

      // Get message counts and previews for each conversation
      const conversationsWithDetails = await Promise.all(
        conversations.map(async (conv) => {
          // Get message count
          const { count } = await supabase
            .from("messages")
            .select("*", { count: "exact", head: true })
            .eq("conversation_id", conv.id);

          // Get first assistant message as preview
          const { data: firstMessage } = await supabase
            .from("messages")
            .select("content")
            .eq("conversation_id", conv.id)
            .eq("role", "assistant")
            .order("created_at", { ascending: true })
            .limit(1)
            .maybeSingle();

          return {
            id: conv.id,
            title: conv.title,
            created_at: conv.created_at,
            updated_at: conv.updated_at,
            preview: firstMessage?.content?.slice(0, 150) || null,
            message_count: count || 0,
          };
        })
      );

      return conversationsWithDetails;
    },
    enabled: !!user?.id,
  });
}

export function useCreateConversation() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (title?: string) => {
      const { data, error } = await supabase
        .from("conversations")
        .insert({
          user_id: user!.id,
          title: title || null,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations", user?.id] });
    },
  });
}

export function useDeleteConversation() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (conversationId: string) => {
      const { error } = await supabase
        .from("conversations")
        .delete()
        .eq("id", conversationId)
        .eq("user_id", user!.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations", user?.id] });
    },
  });
}

export function useUpdateConversationTitle() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ conversationId, title }: { conversationId: string; title: string }) => {
      const { error } = await supabase
        .from("conversations")
        .update({ title })
        .eq("id", conversationId)
        .eq("user_id", user!.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations", user?.id] });
    },
  });
}
