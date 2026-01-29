import { useProfile } from "@/hooks/useProfile";

export type Tier = "free" | "starter" | "pro" | "insider";

const TIER_HIERARCHY: Record<Tier, number> = {
  free: 0,
  starter: 1,
  pro: 2,
  insider: 3,
};

export function useTier() {
  const { data: profile, isLoading } = useProfile();

  const currentTier = (profile?.tier as Tier) || "free";

  const hasAccess = (requiredTier: Tier): boolean => {
    return TIER_HIERARCHY[currentTier] >= TIER_HIERARCHY[requiredTier];
  };

  const canAccessDatabase = hasAccess("pro");
  const canAccessChat = hasAccess("pro");
  const canAccessDigest = hasAccess("pro");
  const canAccessCommunity = hasAccess("insider");
  const canAccessGuide = hasAccess("starter");

  return {
    tier: currentTier,
    isLoading,
    hasAccess,
    canAccessDatabase,
    canAccessChat,
    canAccessDigest,
    canAccessCommunity,
    canAccessGuide,
    isPaid: currentTier !== "free",
  };
}
