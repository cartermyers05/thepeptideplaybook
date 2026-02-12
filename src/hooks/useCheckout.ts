import { useState, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useCheckout() {
  const [isLoading, setIsLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const redirectingRef = useRef(false);
  const isProcessingRef = useRef(false);
  const { toast } = useToast();

  const startCheckout = useCallback(async () => {
    if (redirectingRef.current) return;
    if (isProcessingRef.current && isLoading) return;

    isProcessingRef.current = true;
    setIsLoading(true);
    setCheckoutError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        const msg = "You need to be signed in to purchase.";
        setCheckoutError(msg);
        toast({ title: "Please sign in", description: msg, variant: "destructive" });
        isProcessingRef.current = false;
        setIsLoading(false);
        return;
      }

      const quizGoal = localStorage.getItem("selectedCourseGoal") || "beginner";

      const response = await supabase.functions.invoke("create-checkout", {
        body: { quizGoal },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      const { url } = response.data;

      if (url) {
        redirectingRef.current = true;
        window.location.href = url;
        return;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      if (!redirectingRef.current) {
        const msg = error instanceof Error ? error.message : "Something went wrong";
        console.error("Checkout error:", error);
        setCheckoutError(msg);
        toast({ title: "Checkout failed", description: msg, variant: "destructive" });
        isProcessingRef.current = false;
        setIsLoading(false);
      }
    }
  }, [toast, isLoading]);

  const openCustomerPortal = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        toast({
          title: "Please sign in",
          description: "You need to be signed in to manage your subscription.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const response = await supabase.functions.invoke("customer-portal");

      if (response.error) {
        throw new Error(response.error.message);
      }

      const { url } = response.data;

      if (url) {
        window.location.href = url;
      } else {
        throw new Error("No portal URL returned");
      }
    } catch (error) {
      console.error("Portal error:", error);
      toast({
        title: "Error opening subscription management",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  }, [toast]);

  return {
    startCheckout,
    openCustomerPortal,
    isLoading,
    checkoutError,
  };
}
