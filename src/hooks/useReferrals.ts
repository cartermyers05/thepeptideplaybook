import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface ReferralStats {
  referralCode: string;
  pending: number;
  completed: number;
  monthsEarned: number;
}

export function useReferrals() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["referrals", user?.id],
    queryFn: async (): Promise<ReferralStats | null> => {
      // Get the user's referral record (they should have one as referrer)
      const { data: referrals, error } = await supabase
        .from("referrals")
        .select("*")
        .eq("referrer_id", user!.id);

      if (error) throw error;

      // If no referral code exists yet, return null so we can create one
      if (!referrals || referrals.length === 0) {
        return null;
      }

      // All referrals should have the same code for this user
      const referralCode = referrals[0].referral_code;

      // Count pending (no referred_id yet - these are unused codes)
      // Actually, pending means created but referred user hasn't subscribed
      const pending = referrals.filter(
        (r) => r.referred_id && r.status === "pending"
      ).length;

      // Count completed (referred user subscribed)
      const completed = referrals.filter(
        (r) => r.status === "completed"
      ).length;

      // Count months earned (rewards applied)
      const monthsEarned = referrals.filter(
        (r) => r.reward_applied === true
      ).length;

      return {
        referralCode,
        pending,
        completed,
        monthsEarned,
      };
    },
    enabled: !!user?.id,
  });
}

export function useCreateReferralCode() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Generate a unique referral code using the database function
      const { data: code, error: codeError } = await supabase.rpc(
        "generate_referral_code"
      );

      if (codeError) throw codeError;

      // Create the referral record
      const { data, error } = await supabase
        .from("referrals")
        .insert({
          referrer_id: user!.id,
          referral_code: code,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["referrals", user?.id] });
    },
  });
}
