import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface ChatMessage {
  id: string;
  user_id: string;
  course_id: string | null;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export function useChatMessages(courseId?: string) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch chat messages
  const { data: messages, isLoading } = useQuery({
    queryKey: ["chat-messages", user?.id, courseId],
    queryFn: async () => {
      if (!user?.id) return [];
      
      let query = supabase
        .from("chat_messages")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

      if (courseId) {
        query = query.eq("course_id", courseId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as ChatMessage[];
    },
    enabled: !!user?.id,
  });

  // Add a message
  const addMessage = useMutation({
    mutationFn: async ({ 
      content, 
      role 
    }: { 
      content: string; 
      role: 'user' | 'assistant';
    }) => {
      if (!user?.id) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("chat_messages")
        .insert({
          user_id: user.id,
          course_id: courseId || null,
          role,
          content,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat-messages", user?.id, courseId] });
    },
    onError: (error) => {
      console.error("Failed to save message:", error);
    },
  });

  // Clear chat history
  const clearChat = useMutation({
    mutationFn: async () => {
      if (!user?.id) throw new Error("User not authenticated");

      let query = supabase
        .from("chat_messages")
        .delete()
        .eq("user_id", user.id);

      if (courseId) {
        query = query.eq("course_id", courseId);
      }

      const { error } = await query;
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat-messages", user?.id, courseId] });
      toast.success("Chat cleared");
    },
  });

  return {
    messages: messages ?? [],
    isLoading,
    addMessage,
    clearChat,
  };
}
