import { useState, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useCheckout() {
  const [isLoading, setIsLoading] = useState(false);
  const redirectingRef = useRef(false);
  const isProcessingRef = useRef(false);
  const { toast } = useToast();

  const startCheckout = useCallback(async () => {
    if (isProcessingRef.current || redirectingRef.current) return;
    isProcessingRef.current = true;
    setIsLoading(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Please sign in",
          description: "You need to be signed in to make a purchase.",
          variant: "destructive",
        });
        isProcessingRef.current = false;
        setIsLoading(false);
        return;
      }

      const response = await supabase.functions.invoke("create-checkout", {
        body: {
          successUrl: `${window.location.origin}/thank-you`,
          cancelUrl: `${window.location.origin}/pricing`,
        },
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
        console.error("Checkout error:", error);
        toast({
          title: "Checkout failed",
          description: error instanceof Error ? error.message : "Something went wrong",
          variant: "destructive",
        });
        isProcessingRef.current = false;
        setIsLoading(false);
      }
    }
  }, [toast]);

  return {
    startCheckout,
    isLoading,
  };
}
