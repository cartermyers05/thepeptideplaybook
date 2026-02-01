import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();

  // Redeem pending promo code from localStorage (saved during signup)
  const redeemPendingPromoCode = useCallback(async () => {
    const pendingCode = localStorage.getItem("pending_promo_code");
    if (!pendingCode) return;

    console.log("[Auth] Found pending promo code, attempting redemption");

    try {
      const { data, error } = await supabase.functions.invoke("redeem-promo-code", {
        body: { code: pendingCode },
      });

      if (error || !data?.success) {
        console.error("[Auth] Promo code redemption failed:", error || data?.error);
      } else {
        console.log("[Auth] Promo code redeemed successfully");
        // Invalidate profile cache so useTier reflects the updated tier
        queryClient.invalidateQueries({ queryKey: ["profile"] });
      }
    } catch (err) {
      console.error("[Auth] Error redeeming promo code:", err);
    } finally {
      // Always clear localStorage regardless of success/failure
      localStorage.removeItem("pending_promo_code");
      localStorage.removeItem("pending_promo_type");
    }
  }, [queryClient]);

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

        // Run promo code redemption and backup payment verification on login/signup
        if ((event === "SIGNED_IN" || event === "TOKEN_REFRESHED") && session?.user) {
          // Use setTimeout to avoid blocking the auth state update
          setTimeout(() => {
            // First try to redeem any pending promo code
            redeemPendingPromoCode();
            // Then run backup payment verification
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

      // Also run promo code redemption and backup verification on initial load if user is logged in
      if (session?.user) {
        setTimeout(() => {
          redeemPendingPromoCode();
          verifyPaymentStatus(session.user.id);
        }, 100);
      }
    });

    return () => subscription.unsubscribe();
  }, [verifyPaymentStatus, redeemPendingPromoCode]);

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
