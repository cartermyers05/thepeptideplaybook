import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useCheckout } from "@/hooks/useCheckout";
import { useAuth } from "@/hooks/useAuth";
import { useTier } from "@/hooks/useTier";
import { Shield, CreditCard, RefreshCcw, Check, ArrowRight } from "lucide-react";
import { PromoCodeInput } from "@/components/auth/PromoCodeInput";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function Checkout() {
  const { startCheckout, isLoading } = useCheckout();
  const { user, isLoading: authLoading, isRedeemingPromoCode } = useAuth();
  const { isPaid, isLoading: tierLoading } = useTier();
  const navigate = useNavigate();
  const hasStartedRef = useRef(false);
  const [promoApplied, setPromoApplied] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handlePromoSuccess = async (code: string, type: string) => {
    if (type === "free_access") {
      setIsRedeeming(true);
      try {
        const { data, error } = await supabase.functions.invoke("redeem-promo-code", {
          body: { code },
        });

        if (error) {
          toast({
            title: "Error",
            description: "Failed to redeem promo code",
            variant: "destructive",
          });
          return;
        }

        if (data?.success) {
          setPromoApplied(true);
          // Invalidate tier cache so useTier refetches
          queryClient.invalidateQueries({ queryKey: ["profile"] });
          toast({
            title: "VIP Access Activated!",
            description: "Redirecting to dashboard...",
          });
          setTimeout(() => navigate("/dashboard"), 1500);
        } else {
          toast({
            title: "Error",
            description: data?.error || "Failed to redeem promo code",
            variant: "destructive",
          });
        }
      } catch {
        toast({
          title: "Error",
          description: "Failed to redeem promo code",
          variant: "destructive",
        });
      } finally {
        setIsRedeeming(false);
      }
    }
  };

  useEffect(() => {
    // Billing disabled - redirect authenticated users straight to dashboard
    if (authLoading) return;
    
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [authLoading, user, navigate]);

  // Show loading while checking auth, tier, or redeeming promo
  if (authLoading || tierLoading || isRedeemingPromoCode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 rounded-lg bg-primary animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">
            {isRedeemingPromoCode ? "Applying promo code..." : "Preparing checkout..."}
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signup?redirect=/checkout" replace />;
  }

  // If already paid, this will be handled by the useEffect redirect
  if (isPaid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 rounded-lg bg-primary animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  // Show promo applied success state
  if (promoApplied) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-success" />
          </div>
          <h2 className="text-xl font-semibold mb-2">VIP Access Activated!</h2>
          <p className="text-muted-foreground mb-6">Redirecting to dashboard...</p>
          <Button onClick={() => navigate("/dashboard")} className="w-full">
            Go to Dashboard
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-sm px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold mb-1">Free Access</h1>
          <p className="text-sm text-muted-foreground">No payment required</p>
        </div>

        {/* Promo code section */}
        <div className="mb-6 text-left">
          <PromoCodeInput
            onValidCode={handlePromoSuccess}
            onInvalidCode={() => {}}
            disabled={isLoading || isRedeeming}
          />
        </div>

        {/* Loading state */}
        {(isLoading || isRedeeming) && (
          <div className="mb-6">
            <div className="w-8 h-8 rounded-lg bg-primary animate-pulse mx-auto mb-4" />
            <p className="text-muted-foreground text-sm">
              {isRedeeming ? "Activating VIP access..." : "Redirecting to secure checkout..."}
            </p>
          </div>
        )}
        
        {/* Trust elements */}
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5" />
            <span>256-bit SSL</span>
          </div>
          <div className="flex items-center gap-1">
            <CreditCard className="w-3.5 h-3.5" />
            <span>Stripe</span>
          </div>
          <div className="flex items-center gap-1">
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>30-day refund</span>
          </div>
        </div>
      </div>
    </div>
  );
}
