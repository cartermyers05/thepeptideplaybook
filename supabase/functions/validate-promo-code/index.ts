import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { checkRateLimit, getClientIP } from "../_shared/rateLimiter.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  console.log(`[VALIDATE-PROMO-CODE] ${step}`, details ? JSON.stringify(details) : "");
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    // Rate limiting: 10 attempts per 5 minutes per IP
    const clientIP = getClientIP(req);
    const rateLimit = checkRateLimit(`validate-promo:${clientIP}`, 10, 300);
    
    if (!rateLimit.allowed) {
      logStep("Rate limit exceeded", { clientIP, resetIn: rateLimit.resetIn });
      return new Response(
        JSON.stringify({ valid: false, error: "Too many validation attempts. Please try again later." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 429 }
      );
    }

    const { code } = await req.json();
    
    if (!code || typeof code !== "string") {
      logStep("Invalid code provided");
      return new Response(
        JSON.stringify({ valid: false, error: "Promo code is required" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const normalizedCode = code.trim().toUpperCase();
    logStep("Validating code", { code: normalizedCode });

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Fetch the promo code
    const { data: promoCode, error: fetchError } = await supabase
      .from("promo_codes")
      .select("*")
      .eq("code", normalizedCode)
      .eq("is_active", true)
      .maybeSingle();

    if (fetchError) {
      logStep("Database error", { error: fetchError.message });
      return new Response(
        JSON.stringify({ valid: false, error: "Failed to validate code" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    if (!promoCode) {
      logStep("Code not found or inactive", { code: normalizedCode });
      return new Response(
        JSON.stringify({ valid: false, error: "Invalid promo code" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }

    // Check if expired
    if (promoCode.expires_at && new Date(promoCode.expires_at) < new Date()) {
      logStep("Code expired", { code: normalizedCode, expires_at: promoCode.expires_at });
      return new Response(
        JSON.stringify({ valid: false, error: "This promo code has expired" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }

    // Check if max uses reached
    if (promoCode.max_uses !== null && promoCode.times_used >= promoCode.max_uses) {
      logStep("Code max uses reached", { code: normalizedCode, max_uses: promoCode.max_uses, times_used: promoCode.times_used });
      return new Response(
        JSON.stringify({ valid: false, error: "This promo code has reached its usage limit" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }

    logStep("Code is valid", { code: normalizedCode, type: promoCode.type });
    return new Response(
      JSON.stringify({ 
        valid: true, 
        type: promoCode.type,
        message: promoCode.type === "free_access" ? "VIP Access" : "Valid code"
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(
      JSON.stringify({ valid: false, error: "An error occurred" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
