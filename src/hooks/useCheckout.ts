import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type CheckoutTier = "starter" | "pro" | "insider" | "monthly" | "annual";

export function useCheckout() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const startCheckout = async (tier: CheckoutTier) => {
    setIsLoading(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Please sign in",
          description: "You need to be signed in to make a purchase.",
          variant: "destructive",
        });
        return;
      }

      const response = await supabase.functions.invoke("create-checkout", {
        body: {
          tier,
          successUrl: `${window.location.origin}/thank-you`,
          cancelUrl: `${window.location.origin}/pricing`,
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      const { url } = response.data;
      
      if (url) {
        window.location.href = url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    startCheckout,
    isLoading,
  };
}
