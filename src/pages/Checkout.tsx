import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useCheckout } from "@/hooks/useCheckout";
import { useAuth } from "@/hooks/useAuth";
import { useTier } from "@/hooks/useTier";
import { Check, ArrowRight, FlaskConical, ShieldCheck, RefreshCw, Lock } from "lucide-react";
import { PromoCodeInput } from "@/components/auth/PromoCodeInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function Checkout() {
  const { startCheckout, isLoading, checkoutError } = useCheckout();
  const { user, isLoading: authLoading, isRedeemingPromoCode } = useAuth();
  const { isPaid, isLoading: tierLoading } = useTier();
  const navigate = useNavigate();
  const hasStartedRef = useRef(false);
  const [promoApplied, setPromoApplied] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Check if user just signed up - skip tier loading for fresh signups
  const isFreshSignup = useRef(localStorage.getItem("fresh_signup") === "true");
  
  // Clear fresh signup flag on mount
  useEffect(() => {
    if (isFreshSignup.current) {
      localStorage.removeItem("fresh_signup");
    }
  }, []);
  
  // Add timeout fallback - show checkout after 5 seconds even if still loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingTimeout(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

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
            description: "Let's build your personalized blueprint...",
          });
          setTimeout(() => navigate("/quiz"), 1500);
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
    // If user is authenticated, already paid, and not processing promo
    if (authLoading || tierLoading || isRedeemingPromoCode) return;
    
    // Already paid → go to dashboard
    if (user && isPaid) {
      navigate("/dashboard", { replace: true });
      return;
    }
    // User sees checkout page and must click button to proceed to Stripe
  }, [authLoading, tierLoading, user, isPaid, isRedeemingPromoCode, navigate]);

  // Determine if we should show loading - skip for fresh signups or after timeout
  const shouldShowLoading = !isFreshSignup.current && !loadingTimeout && (authLoading || tierLoading || isRedeemingPromoCode);
  
  // Show loading while checking auth, tier, or redeeming promo
  if (shouldShowLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 animate-pulse mx-auto mb-4" />
          <h2 className="text-lg font-medium mb-2">Getting things ready...</h2>
          <p className="text-sm text-muted-foreground">
            {isRedeemingPromoCode ? "Applying promo code..." : "Preparing your checkout..."}
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
          <p className="text-muted-foreground mb-6">Let's personalize your blueprint...</p>
          <Button onClick={() => navigate("/quiz")} className="w-full">
            Build My Blueprint
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center bg-background pt-16 pb-16">
      <div className="text-center max-w-md px-4">
        {/* Header */}
        <div className="mb-6">
          <p className="text-xs text-primary font-medium mb-1">Early Access Pricing</p>
          <h1 className="text-xl font-semibold mb-1">Complete Your Purchase</h1>
          <p className="text-sm text-muted-foreground">
            One-time payment: <span className="line-through opacity-60">$99</span> $67
          </p>
        </div>

        {/* Pay button as fallback */}
        {!isLoading && !isRedeeming && (
          <div className="mb-6">
            <Button 
              size="lg" 
              className="w-full btn-primary-clean h-12"
              onClick={() => startCheckout()}
            >
              Get Your Full Blueprint — $67
            </Button>
            {checkoutError && (
              <p className="text-destructive text-sm mt-2">{checkoutError}</p>
            )}
          </div>
        )}

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
        
        {/* Trust elements - text only with dot separators */}
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <span>256-bit SSL</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
          <span>Powered by Stripe</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
          <span>30-day refund</span>
        </div>

        {/* Trust Cards */}
        <div className="mt-10 space-y-3 text-left">
          {[
            { icon: FlaskConical, title: "Research-Backed", desc: "Every recommendation cites peer-reviewed studies with evidence ratings. Not opinions. Evidence." },
            { icon: ShieldCheck, title: "We Don't Sell Peptides", desc: "Zero financial incentive to push any product. We're education-only, which means completely unbiased." },
            { icon: RefreshCw, title: "30-Day Guarantee", desc: "Not helpful? Full refund, no questions asked. Email support@peptideplaybook.org." },
          ].map((card) => (
            <Card key={card.title}>
              <CardContent className="flex items-start gap-3 p-4">
                <card.icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-sm">{card.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{card.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Checkout FAQ */}
        <div className="mt-10 text-left">
          <h2 className="text-lg font-semibold mb-4">Common Questions</h2>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {[
              { q: "Can I find this information for free?", a: "You can find peptide information everywhere. That's the problem. One source says BPC-157 is safe, another says it's dangerous. We organize 500+ peer-reviewed studies, match them to YOUR goal, and give you a clear protocol with confidence ratings. That's what $67 buys: clarity instead of 10 more hours of confusion." },
              { q: "Is this just a PDF?", a: "No. You get a personalized blueprint, an AI research coach you can ask unlimited questions (every answer cites studies), an interactive peptide comparison tool, a doctor conversation script, and a legal guide that updates as regulations change. It's a living toolkit." },
              { q: "How do I know this isn't biased?", a: "We don't sell peptides, earn vendor commissions, or accept clinic sponsorships. Our only revenue is from the blueprint. Every recommendation includes its evidence rating so you can see the strength of the research yourself." },
              { q: "What if it doesn't help me?", a: "Full refund within 30 days, no questions asked. Email support@peptideplaybook.org and we process it immediately." },
              { q: "When do I get access?", a: "Instantly. Your blueprint, AI coach, and all tools are available the moment your payment processes. No waiting." },
            ].map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="glass-card-subtle px-5 border-none">
                <AccordionTrigger className="text-left text-sm font-medium py-3 hover:no-underline">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-xs pb-3">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Second CTA */}
        <div className="mt-10 mb-4">
          <Button
            size="lg"
            className="w-full btn-primary-clean h-12"
            onClick={() => startCheckout()}
            disabled={isLoading || isRedeeming}
          >
            Get My Blueprint: $67
          </Button>
          <p className="text-xs text-muted-foreground mt-3">One-time payment. Lifetime access. Instant delivery.</p>
        </div>
      </div>
    </div>
  );
}
