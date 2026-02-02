import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useTier } from "@/hooks/useTier";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading: authLoading, isRedeemingPromoCode } = useAuth();
  const { isPaid, isLoading: tierLoading } = useTier();
  const location = useLocation();

  // Show loading while checking auth, tier, or redeeming promo code
  if (authLoading || tierLoading || isRedeemingPromoCode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse-soft">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary" />
        </div>
      </div>
    );
  }

  // Not logged in → go to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Not paid → go to checkout
  if (!isPaid) {
    return <Navigate to="/checkout" replace />;
  }

  return <>{children}</>;
}
