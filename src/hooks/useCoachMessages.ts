import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface CoachMessage {
  id: string;
  user_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
  context_type: string | null;
}

export function useCoachMessages() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["coach-messages", user?.id],
    queryFn: async (): Promise<CoachMessage[]> => {
      const { data, error } = await (supabase as any)
        .from("coach_messages")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return (data || []) as CoachMessage[];
    },
    enabled: !!user?.id,
  });
}

export function useSendCoachMessage() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (params: {
      role: "user" | "assistant";
      content: string;
      context_type?: string;
    }) => {
      const { error } = await (supabase as any)
        .from("coach_messages")
        .insert({
          user_id: user!.id,
          role: params.role,
          content: params.content,
          context_type: params.context_type || null,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coach-messages"] });
    },
  });
}
