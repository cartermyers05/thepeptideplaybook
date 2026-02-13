import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { computeCurrentWeek, type ProtocolProgress } from "@/hooks/useProtocolProgress";

export function useActiveProtocolProgress() {
  const { user } = useAuth();

  const query = useQuery({
    queryKey: ["active-protocol-progress", user?.id],
    queryFn: async (): Promise<ProtocolProgress | null> => {
      const { data, error } = await (supabase as any)
        .from("protocol_progress")
        .select("*")
        .eq("user_id", user!.id)
        .eq("status", "active")
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data as ProtocolProgress | null;
    },
    enabled: !!user?.id,
  });

  const progress = query.data ?? null;
  const currentWeek = progress ? Math.min(Math.max(computeCurrentWeek(progress.start_date), 1), 20) : null;

  return {
    ...query,
    progress,
    currentWeek,
  };
}
