import { createContext, useContext, useEffect, useState, ReactNode, useCallback, useRef } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isRedeemingPromoCode: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  isRedeemingPromoCode: false,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRedeemingPromoCode, setIsRedeemingPromoCode] = useState(false);
  const redemptionAttemptedRef = useRef(false);
  const queryClient = useQueryClient();

  // Redeem pending promo code from localStorage (saved during signup)
  // Returns true if redemption was successful, false otherwise
  const redeemPendingPromoCode = useCallback(async (): Promise<boolean> => {
    const pendingCode = localStorage.getItem("pending_promo_code");
    if (!pendingCode) return false;

    // Prevent duplicate redemption attempts
    if (redemptionAttemptedRef.current) return false;
    redemptionAttemptedRef.current = true;

    console.log("[Auth] Found pending promo code, attempting redemption");
    setIsRedeemingPromoCode(true);

    try {
      const { data, error } = await supabase.functions.invoke("redeem-promo-code", {
        body: { code: pendingCode },
      });

      if (error || !data?.success) {
        console.error("[Auth] Promo code redemption failed:", error || data?.error);
        return false;
      } else {
        console.log("[Auth] Promo code redeemed successfully");
        // Invalidate profile cache so useTier reflects the updated tier
        await queryClient.invalidateQueries({ queryKey: ["profile"] });
        // Wait for the profile to refetch
        await queryClient.refetchQueries({ queryKey: ["profile"] });
        return true;
      }
    } catch (err) {
      console.error("[Auth] Error redeeming promo code:", err);
      return false;
    } finally {
      // Always clear localStorage regardless of success/failure
      localStorage.removeItem("pending_promo_code");
      localStorage.removeItem("pending_promo_type");
      setIsRedeemingPromoCode(false);
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
          // Check for pending promo code - await it before proceeding
          const hasPendingPromo = localStorage.getItem("pending_promo_code");
          if (hasPendingPromo) {
            redeemPendingPromoCode().then(() => {
              verifyPaymentStatus(session.user.id);
            });
          } else {
            verifyPaymentStatus(session.user.id);
          }
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      // Check for pending promo code on initial load
      if (session?.user) {
        const hasPendingPromo = localStorage.getItem("pending_promo_code");
        if (hasPendingPromo) {
          redeemPendingPromoCode().then(() => {
            setIsLoading(false);
            verifyPaymentStatus(session.user.id);
          });
        } else {
          setIsLoading(false);
          verifyPaymentStatus(session.user.id);
        }
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [verifyPaymentStatus, redeemPendingPromoCode]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, isLoading, isRedeemingPromoCode, signOut }}>
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
