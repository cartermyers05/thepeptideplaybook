import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  console.log(`[REDEEM-PROMO-CODE] ${step}`, details ? JSON.stringify(details) : "");
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Authenticate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      logStep("No authorization header");
      return new Response(
        JSON.stringify({ success: false, error: "Unauthorized" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !userData.user) {
      logStep("Authentication failed", { error: userError?.message });
      return new Response(
        JSON.stringify({ success: false, error: "Unauthorized" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 401 }
      );
    }

    const userId = userData.user.id;
    logStep("User authenticated", { userId });

    const { code } = await req.json();
    
    if (!code || typeof code !== "string") {
      logStep("Invalid code provided");
      return new Response(
        JSON.stringify({ success: false, error: "Promo code is required" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const normalizedCode = code.trim().toUpperCase();
    logStep("Redeeming code", { code: normalizedCode, userId });

    // Use service role for database operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Check if user already redeemed a code
    const { data: existingRedemption } = await supabaseAdmin
      .from("promo_code_redemptions")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle();

    if (existingRedemption) {
      logStep("User already redeemed a code", { userId });
      return new Response(
        JSON.stringify({ success: false, error: "You have already used a promo code" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Fetch and validate the promo code
    const { data: promoCode, error: fetchError } = await supabaseAdmin
      .from("promo_codes")
      .select("*")
      .eq("code", normalizedCode)
      .eq("is_active", true)
      .maybeSingle();

    if (fetchError || !promoCode) {
      logStep("Code not found", { code: normalizedCode });
      return new Response(
        JSON.stringify({ success: false, error: "Invalid promo code" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Check if expired
    if (promoCode.expires_at && new Date(promoCode.expires_at) < new Date()) {
      logStep("Code expired", { code: normalizedCode });
      return new Response(
        JSON.stringify({ success: false, error: "This promo code has expired" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Check if max uses reached
    if (promoCode.max_uses !== null && promoCode.times_used >= promoCode.max_uses) {
      logStep("Code max uses reached", { code: normalizedCode });
      return new Response(
        JSON.stringify({ success: false, error: "This promo code has reached its usage limit" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Record the redemption
    const { error: redemptionError } = await supabaseAdmin
      .from("promo_code_redemptions")
      .insert({
        promo_code_id: promoCode.id,
        user_id: userId,
      });

    if (redemptionError) {
      logStep("Failed to record redemption", { error: redemptionError.message });
      return new Response(
        JSON.stringify({ success: false, error: "Failed to redeem code" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    // Increment times_used
    const { error: updateError } = await supabaseAdmin
      .from("promo_codes")
      .update({ times_used: promoCode.times_used + 1 })
      .eq("id", promoCode.id);

    if (updateError) {
      logStep("Failed to update times_used", { error: updateError.message });
      // Don't fail the request, redemption was recorded
    }

    // If free_access type, upgrade user to member
    if (promoCode.type === "free_access") {
      const { error: profileError } = await supabaseAdmin
        .from("profiles")
        .update({ 
          tier: "member",
          subscription_status: "active"
        })
        .eq("user_id", userId);

      if (profileError) {
        logStep("Failed to update profile tier", { error: profileError.message });
        return new Response(
          JSON.stringify({ success: false, error: "Failed to upgrade account" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
        );
      }

      logStep("User upgraded to member", { userId });
    }

    logStep("Code redeemed successfully", { code: normalizedCode, userId, type: promoCode.type });
    return new Response(
      JSON.stringify({ 
        success: true, 
        type: promoCode.type,
        message: "Promo code redeemed successfully!"
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(
      JSON.stringify({ success: false, error: "An error occurred" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
