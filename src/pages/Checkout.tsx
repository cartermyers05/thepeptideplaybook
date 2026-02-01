import { useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useCheckout } from "@/hooks/useCheckout";
import { useAuth } from "@/hooks/useAuth";
import { useTier } from "@/hooks/useTier";
import { Shield, CreditCard, RefreshCcw } from "lucide-react";

export default function Checkout() {
  const { startCheckout, isLoading } = useCheckout();
  const { user, isLoading: authLoading, isRedeemingPromoCode } = useAuth();
  const { isPaid, isLoading: tierLoading } = useTier();
  const navigate = useNavigate();
  const hasStartedRef = useRef(false);

  useEffect(() => {
    // Wait for all loading states to resolve
    if (authLoading || tierLoading || isRedeemingPromoCode) return;
    
    // If user is already paid (promo code redeemed), redirect to dashboard
    if (isPaid) {
      navigate("/dashboard", { replace: true });
      return;
    }

    // Start checkout only once
    if (user && !hasStartedRef.current) {
      hasStartedRef.current = true;
      startCheckout();
    }
  }, [authLoading, tierLoading, isRedeemingPromoCode, user, isPaid, navigate, startCheckout]);

  // Show loading while checking auth, tier, or redeeming promo
  if (authLoading || tierLoading || isRedeemingPromoCode || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 rounded-lg bg-primary animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">
            {isRedeemingPromoCode ? "Applying promo code..." : "Redirecting to checkout..."}
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-sm">
        <div className="w-8 h-8 rounded-lg bg-primary animate-pulse mx-auto mb-4" />
        <p className="text-muted-foreground mb-6">Redirecting to secure checkout...</p>
        
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
