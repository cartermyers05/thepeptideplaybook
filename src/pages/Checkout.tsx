import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useCheckout } from "@/hooks/useCheckout";
import { useAuth } from "@/hooks/useAuth";
import { useTier } from "@/hooks/useTier";
import { ArrowLeft, Lock, ShieldCheck, Loader2 } from "lucide-react";
import { PromoCodeInput } from "@/components/auth/PromoCodeInput";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { SEOHead } from "@/components/seo/SEOHead";

const BULLET_ITEMS = [
  "AI Research Coach — Ask any peptide question and get a cited answer in seconds. Includes a built-in dosing calculator: tell it your vial size and it does the reconstitution math for you.",
  "41+ peptide profiles with evidence ratings",
  "Doctor conversation scripts",
  "2026 legal status guide",
  "Lifetime access including future updates",
];

export default function Checkout() {
  const { startCheckout, isLoading, checkoutError } = useCheckout();
  const { user, isLoading: authLoading, isRedeemingPromoCode } = useAuth();
  const { isPaid, isLoading: tierLoading } = useTier();
  const navigate = useNavigate();
  const [promoApplied, setPromoApplied] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const isFreshSignup = useRef(localStorage.getItem("fresh_signup") === "true");

  useEffect(() => {
    if (isFreshSignup.current) localStorage.removeItem("fresh_signup");
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoadingTimeout(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handlePromoSuccess = async (code: string, type: string) => {
    if (type === "free_access") {
      setIsRedeeming(true);
      try {
        const { data, error } = await supabase.functions.invoke("redeem-promo-code", { body: { code } });
        if (error) { toast({ title: "Error", description: "Failed to redeem promo code", variant: "destructive" }); return; }
        if (data?.success) {
          setPromoApplied(true);
          queryClient.invalidateQueries({ queryKey: ["profile"] });
          toast({ title: "VIP Access Activated!", description: "Let's build your personalized blueprint..." });
          setTimeout(() => navigate("/welcome/onboarding"), 1500);
        } else {
          toast({ title: "Error", description: data?.error || "Failed to redeem promo code", variant: "destructive" });
        }
      } catch {
        toast({ title: "Error", description: "Failed to redeem promo code", variant: "destructive" });
      } finally {
        setIsRedeeming(false);
      }
    }
  };

  useEffect(() => {
    if (authLoading || tierLoading || isRedeemingPromoCode) return;
    if (user && isPaid) { navigate("/dashboard", { replace: true }); }
  }, [authLoading, tierLoading, user, isPaid, isRedeemingPromoCode, navigate]);

  const shouldShowLoading = !isFreshSignup.current && !loadingTimeout && (authLoading || tierLoading || isRedeemingPromoCode);

  if (shouldShowLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">{isRedeemingPromoCode ? "Applying promo code..." : "Preparing checkout..."}</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/signup?redirect=/checkout" replace />;
  if (isPaid) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Redirecting to dashboard...</p>
      </div>
    </div>
  );

  if (promoApplied) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-sm">
          <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">VIP Access Activated!</h2>
          <p className="text-muted-foreground mb-6">Let's personalize your blueprint...</p>
          <Button onClick={() => navigate("/welcome/onboarding")} className="w-full">Build My Blueprint</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead title="Checkout — Peptide Playbook" description="Complete your purchase." canonical="/checkout" noIndex />
      <div className="min-h-screen bg-background flex justify-center pt-10 pb-16 px-4">
        <div className="max-w-[480px] w-full">
          {/* Back */}
          <Link to="/sales" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>

          {/* Badge */}
          <div className="text-center mt-4">
            <span className="text-primary text-[11px] uppercase tracking-[1.5px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              PEPTIDE PLAYBOOK
            </span>
          </div>

          {/* Order summary */}
          <div className="bg-card border border-border rounded-xl p-6 mt-8">
            <h2 className="text-lg font-bold mb-4">Your Peptide Blueprint</h2>
            <ul className="space-y-3">
              {BULLET_ITEMS.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="border-t border-border my-4" />
            <div className="flex items-center justify-between">
              <span className="text-base">Total:</span>
              <span className="text-[22px] font-bold">$67.00</span>
            </div>
            <p className="text-muted-foreground/60 text-[13px] mt-1">One-time payment. No subscription.</p>
          </div>

          {/* Promo code */}
          <div className="mt-6">
            <PromoCodeInput onValidCode={handlePromoSuccess} onInvalidCode={() => {}} disabled={isLoading || isRedeeming} />
          </div>

          {/* CTA */}
          <Button
            className="w-full mt-6 bg-primary text-primary-foreground font-bold text-lg min-h-[56px] rounded-xl"
            onClick={() => startCheckout()}
            disabled={isLoading || isRedeeming}
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Complete Purchase"}
          </Button>
          {checkoutError && <p className="text-destructive text-sm mt-2 text-center">{checkoutError}</p>}

          {/* Trust signals */}
          <div className="mt-5 space-y-2 text-center">
            <p className="text-muted-foreground/60 text-[13px] flex items-center justify-center gap-1.5">
              <Lock className="w-3.5 h-3.5" /> Secured by Stripe
            </p>
            <p className="text-muted-foreground/60 text-[13px] flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> 30-day money-back guarantee
            </p>
            <p className="text-muted-foreground/60 text-[13px]">Questions? support@peptideplaybook.org</p>
          </div>

          {/* Login link */}
          <p className="text-center mt-8">
            <Link to="/login" className="text-primary text-sm hover:underline">
              Already have access? Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
