import { useProfile } from "@/hooks/useProfile";

export type Tier = "free" | "member";

export function useTier() {
  const { data: profile, isLoading } = useProfile();

  // Treat any paid tier (starter, pro, insider, member) as "member"
  const rawTier = profile?.tier || "free";
  const currentTier: Tier = rawTier === "free" ? "free" : "member";

  // Free access for everyone - billing disabled
  const isPaid = true;

  return {
    tier: currentTier,
    isLoading,
    isPaid,
  };
}
