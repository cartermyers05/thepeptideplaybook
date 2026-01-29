import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useCheckout } from "@/hooks/useCheckout";
import { useAuth } from "@/hooks/useAuth";

const validTiers = ["starter", "pro", "insider", "monthly", "annual"];

export default function Checkout() {
  const { tier } = useParams<{ tier: string }>();
  const { startCheckout, isLoading } = useCheckout();
  const { user, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user && tier && validTiers.includes(tier)) {
      startCheckout(tier as any);
    }
  }, [authLoading, user, tier]);

  if (!tier || !validTiers.includes(tier)) {
    return <Navigate to="/pricing" replace />;
  }

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
    return <Navigate to={`/signup?redirect=/checkout/${tier}`} replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-8 h-8 rounded-lg bg-primary animate-pulse mx-auto mb-4" />
        <p className="text-muted-foreground">Redirecting to checkout...</p>
      </div>
    </div>
  );
}
