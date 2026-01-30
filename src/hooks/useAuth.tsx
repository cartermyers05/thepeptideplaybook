import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Backup payment verification for users who may have had verification fail on thank-you page
  const verifyPaymentStatus = useCallback(async (userId: string) => {
    try {
      // First check if user has a stripe_customer_id but isn't a member
      const { data: profile } = await supabase
        .from("profiles")
        .select("stripe_customer_id, tier")
        .eq("user_id", userId)
        .maybeSingle();

      // Only run backup verification if user has a stripe customer but isn't a member
      if (profile?.stripe_customer_id && profile.tier !== "member") {
        console.log("[Auth] Running backup payment verification");
        
        const { data: sessionData } = await supabase.auth.getSession();
        if (!sessionData.session) return;

        // Call verify-payment with no session_id to trigger backup check
        await supabase.functions.invoke("verify-payment", {
          body: { session_id: null },
        });
      }
    } catch (error) {
      // Silent fail - this is a backup check
      console.error("[Auth] Backup payment verification error:", error);
    }
  }, []);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);

        // Run backup payment verification on login/signup
        if ((event === "SIGNED_IN" || event === "TOKEN_REFRESHED") && session?.user) {
          // Use setTimeout to avoid blocking the auth state update
          setTimeout(() => {
            verifyPaymentStatus(session.user.id);
          }, 100);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);

      // Also run backup verification on initial load if user is logged in
      if (session?.user) {
        setTimeout(() => {
          verifyPaymentStatus(session.user.id);
        }, 100);
      }
    });

    return () => subscription.unsubscribe();
  }, [verifyPaymentStatus]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
