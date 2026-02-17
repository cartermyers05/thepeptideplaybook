import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface Compound {
  name: string;
  description?: string;
  dose: string;
  frequency: string;
  timing: string;
  route: string;
  category?: string;
  side_effects?: string;
  storage?: string;
  rationale?: string;
  mechanism?: string;
}

export interface DoctorScript {
  opening_line: string;
  studies_to_reference: { title: string; journal: string; year: string; key_finding: string }[];
  questions_to_ask: string[];
}

export interface UserProtocol {
  id: string;
  user_id: string;
  created_at: string;
  cycle_number: number;
  protocol_name: string;
  status: string;
  start_date: string | null;
  end_date: string | null;
  cycle_length_weeks: number;
  compounds: Compound[];
  schedule: Record<string, string[]>;
  risk_assessment: string | null;
  weekly_expectations: { week: number; description: string }[] | null;
  ai_generation_context: string | null;
  doctor_script: DoctorScript | null;
  supplies_status: string;
}

export function useUserProtocol() {
  const { user } = useAuth();

  const { data: protocol, isLoading } = useQuery({
    queryKey: ["user-protocol", user?.id],
    queryFn: async (): Promise<UserProtocol | null> => {
      const { data, error } = await (supabase as any)
        .from("user_protocols")
        .select("*")
        .eq("user_id", user!.id)
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data as UserProtocol | null;
    },
    enabled: !!user?.id,
  });

  // Compute current week from start_date
  const currentWeek = protocol?.start_date
    ? Math.max(1, Math.floor((Date.now() - new Date(protocol.start_date + "T00:00:00").getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1)
    : null;

  const daysElapsed = protocol?.start_date
    ? Math.max(0, Math.floor((Date.now() - new Date(protocol.start_date + "T00:00:00").getTime()) / (24 * 60 * 60 * 1000)))
    : 0;

  const totalDays = protocol ? protocol.cycle_length_weeks * 7 : 0;
  const daysRemaining = Math.max(0, totalDays - daysElapsed);
  const progressPercent = totalDays > 0 ? Math.min(100, Math.round((daysElapsed / totalDays) * 100)) : 0;

  // Get today's scheduled compounds
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const todayName = dayNames[new Date().getDay()];
  const todayCompounds: Compound[] = [];

  if (protocol?.schedule && protocol.compounds) {
    const scheduledNames = (protocol.schedule as Record<string, string[]>)[todayName] || [];
    for (const name of scheduledNames) {
      const compound = protocol.compounds.find((c: Compound) => c.name === name);
      if (compound) todayCompounds.push(compound);
    }
  }

  return {
    protocol,
    isLoading,
    currentWeek,
    daysElapsed,
    daysRemaining,
    totalDays,
    progressPercent,
    todayCompounds,
    todayName,
  };
}
