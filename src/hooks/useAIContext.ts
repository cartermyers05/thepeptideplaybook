import { useAuth } from "@/hooks/useAuth";
import { useUserProtocol } from "@/hooks/useUserProtocol";
import { useRecentLogs } from "@/hooks/useDailyLog";
import { useProfile } from "@/hooks/useProfile";
import { useQuizResponse } from "@/hooks/useQuizResponse";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

export function useAIContext() {
  const { user } = useAuth();
  const { protocol } = useUserProtocol();
  const { data: recentLogs } = useRecentLogs(7);
  const { data: profile } = useProfile();
  const { data: quizResponse } = useQuizResponse();
  const location = useLocation();

  const { data: userProfile } = useQuery({
    queryKey: ["user-profile-ai", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data } = await (supabase as any)
        .from("user_profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      return data;
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
  });

  return {
    profile: userProfile,
    activeProtocol: protocol || null,
    recentLogs: recentLogs || [],
    quizResponse: quizResponse || null,
    currentPage: location.pathname,
    userTier: profile?.tier || "free",
    isReady: !!user,
  };
}
