import { useProfile } from "@/hooks/useProfile";

export type Tier = "free" | "member";

export function useTier() {
  const { data: profile, isLoading } = useProfile();

  // Treat any paid tier (starter, pro, insider, member) as "member"
  const rawTier = profile?.tier || "free";
  const currentTier: Tier = rawTier === "free" ? "free" : "member";

  // User is paid if tier is anything other than "free" or null
  const isPaid = rawTier !== "free" && rawTier !== null && rawTier !== undefined;

  return {
    tier: currentTier,
    isLoading,
    isPaid,
  };
}
