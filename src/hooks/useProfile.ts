import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { Tables } from "@/integrations/supabase/types";

type Profile = Tables<"profiles">;

export function useProfile() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user!.id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
    staleTime: 30 * 1000, // 30 seconds - prevents excessive refetching
  });
}

export function useUpdateProfile() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: Partial<Profile>) => {
      const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("user_id", user!.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onMutate: async (updates) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["profile", user?.id] });
      
      // Snapshot the previous value
      const previousProfile = queryClient.getQueryData<Profile>(["profile", user?.id]);
      
      // Optimistically update to the new value
      queryClient.setQueryData<Profile | null>(["profile", user?.id], (old) => 
        old ? { ...old, ...updates } : null
      );
      
      return { previousProfile };
    },
    onError: (_err, _updates, context) => {
      // Rollback on error
      if (context?.previousProfile) {
        queryClient.setQueryData(["profile", user?.id], context.previousProfile);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
    },
  });
}

export function useIncrementQuestionsAsked() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // First get current value
      const { data: profile } = await supabase
        .from("profiles")
        .select("questions_asked, last_active_at, current_streak")
        .eq("user_id", user!.id)
        .single();

      const currentQuestions = profile?.questions_asked || 0;
      const lastActive = profile?.last_active_at ? new Date(profile.last_active_at) : null;
      const now = new Date();
      
      // Calculate streak
      let newStreak = profile?.current_streak || 0;
      if (lastActive) {
        const hoursSinceActive = (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60);
        if (hoursSinceActive > 48) {
          // Streak broken - more than 48 hours since last activity
          newStreak = 1;
        } else if (hoursSinceActive > 24) {
          // New day - increment streak
          newStreak += 1;
        }
        // If less than 24 hours, keep same streak
      } else {
        newStreak = 1;
      }

      const { error } = await supabase
        .from("profiles")
        .update({ 
          questions_asked: currentQuestions + 1,
          last_active_at: now.toISOString(),
          current_streak: newStreak,
        })
        .eq("user_id", user!.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
    },
  });
}
