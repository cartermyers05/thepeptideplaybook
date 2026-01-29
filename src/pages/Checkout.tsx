import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useCheckout } from "@/hooks/useCheckout";
import { useAuth } from "@/hooks/useAuth";
import { Shield, CreditCard, RefreshCcw } from "lucide-react";

export default function Checkout() {
  const { startCheckout, isLoading } = useCheckout();
  const { user, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user) {
      startCheckout();
    }
  }, [authLoading, user]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 rounded-lg bg-primary animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Redirecting to checkout...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signup?redirect=/checkout" replace />;
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
