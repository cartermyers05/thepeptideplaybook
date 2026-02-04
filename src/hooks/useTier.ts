import { useProfile } from "@/hooks/useProfile";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export type Tier = "free" | "monthly" | "annual";

interface SubscriptionStatus {
  subscribed: boolean;
  plan: string | null;
  subscription_end: string | null;
}

export function useTier() {
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { user } = useAuth();
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus | null>(null);
  const [isCheckingSubscription, setIsCheckingSubscription] = useState(false);

  const checkSubscription = useCallback(async () => {
    if (!user) return;
    
    setIsCheckingSubscription(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        setIsCheckingSubscription(false);
        return;
      }

      const response = await supabase.functions.invoke("check-subscription", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (response.data && !response.error) {
        setSubscriptionStatus(response.data);
      }
    } catch (error) {
      console.error("Error checking subscription:", error);
    } finally {
      setIsCheckingSubscription(false);
    }
  }, [user]);

  // Check subscription on mount and when user changes
  useEffect(() => {
    if (user) {
      checkSubscription();
    }
  }, [user, checkSubscription]);

  // Determine tier from profile or subscription status
  const rawTier = profile?.tier || "free";
  
  // Check if user has active subscription
  const isSubscribed = subscriptionStatus?.subscribed || false;
  const subscriptionPlan = subscriptionStatus?.plan;
  
  // Determine effective tier
  let currentTier: Tier = "free";
  if (isSubscribed && subscriptionPlan) {
    currentTier = subscriptionPlan as Tier;
  } else if (rawTier === "monthly" || rawTier === "annual" || rawTier === "insider" || rawTier === "member") {
    // Legacy paid users (one-time $67 purchase) - treat as annual
    currentTier = "annual";
  }

  // User is paid if they have any paid tier
  const isPaid = currentTier !== "free";

  return {
    tier: currentTier,
    isLoading: profileLoading || isCheckingSubscription,
    isPaid,
    subscriptionEnd: subscriptionStatus?.subscription_end || null,
    refreshSubscription: checkSubscription,
  };
}
