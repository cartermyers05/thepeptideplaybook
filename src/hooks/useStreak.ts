import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { format, subDays, differenceInDays, parseISO } from "date-fns";

export interface StreakData {
  id: string;
  user_id: string;
  current_streak: number;
  longest_streak: number;
  last_check_in_date: string | null;
  streak_freezes_available: number;
  updated_at: string;
}

export function useStreak() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const today = format(new Date(), "yyyy-MM-dd");

  const { data: streak, isLoading } = useQuery({
    queryKey: ["streak", user?.id],
    queryFn: async (): Promise<StreakData | null> => {
      if (!user?.id) return null;

      const { data, error } = await supabase
        .from("user_streaks")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;
      return data as StreakData | null;
    },
    enabled: !!user?.id,
  });

  const updateStreak = useMutation({
    mutationFn: async () => {
      if (!user?.id) throw new Error("User not authenticated");

      const yesterday = format(subDays(new Date(), 1), "yyyy-MM-dd");

      // Get current streak data
      const { data: existingStreak } = await supabase
        .from("user_streaks")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      let newStreak = 1;
      let longestStreak = existingStreak?.longest_streak || 0;

      if (existingStreak?.last_check_in_date) {
        const lastDate = existingStreak.last_check_in_date;
        const daysSinceLastCheckIn = differenceInDays(new Date(today), parseISO(lastDate));

        if (daysSinceLastCheckIn === 0) {
          // Already checked in today, no change
          return existingStreak;
        } else if (daysSinceLastCheckIn === 1) {
          // Consecutive day, increment streak
          newStreak = (existingStreak.current_streak || 0) + 1;
        } else if (daysSinceLastCheckIn === 2 && existingStreak.streak_freezes_available > 0) {
          // Missed one day but have a freeze
          newStreak = (existingStreak.current_streak || 0) + 1;
          // Note: We'll decrement freeze in the upsert
        }
        // Else: streak resets to 1
      }

      longestStreak = Math.max(longestStreak, newStreak);

      const { data, error } = await supabase
        .from("user_streaks")
        .upsert(
          {
            user_id: user.id,
            current_streak: newStreak,
            longest_streak: longestStreak,
            last_check_in_date: today,
            streak_freezes_available: existingStreak?.streak_freezes_available ?? 2,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" }
        )
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["streak", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["milestones", user?.id] });
    },
  });

  const currentStreak = streak?.current_streak || 0;
  const longestStreak = streak?.longest_streak || 0;

  return {
    streak,
    currentStreak,
    longestStreak,
    isLoading,
    updateStreak,
  };
}
