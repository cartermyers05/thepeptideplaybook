import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const logStep = (step: string, details?: unknown) => {
  console.log(`[CHECK-SUBSCRIPTION] ${step}`, details ? JSON.stringify(details) : "");
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) throw new Error("No authorization header provided");

    const token = authHeader.replace("Bearer ", "");

    // Use getClaims to validate JWT locally (no HTTP call = no DNS issues)
    const anonClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: claimsData, error: claimsError } = await anonClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) throw new Error(`Authentication error: ${claimsError?.message || "Invalid token"}`);

    const userId = claimsData.claims.sub as string;
    const email = claimsData.claims.email as string;
    if (!userId || !email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId, email });

    // 1. Check profile tier first — one-time buyers have tier = "member" set by verify-payment
    const { data: profile } = await supabaseClient
      .from("profiles")
      .select("tier, stripe_customer_id, subscription_status")
      .eq("user_id", userId)
      .maybeSingle();

    const profileTier = profile?.tier;
    logStep("Profile tier check", { profileTier });

    const paidTiers = ["member", "insider", "monthly", "annual"];

    // AUTO-HEAL: If profile is free but user has a purchase, fix the tier
    if (!profileTier || !paidTiers.includes(profileTier)) {
      const { data: healPurchases } = await supabaseClient
        .from("purchases")
        .select("id, tier")
        .eq("user_id", userId)
        .limit(1);

      if (healPurchases && healPurchases.length > 0) {
        const healTier = healPurchases[0].tier || "member";
        logStep("AUTO-HEAL: Purchase found but tier is free, fixing", { from: profileTier, to: healTier });
        await supabaseClient
          .from("profiles")
          .update({ tier: healTier, subscription_status: "active" })
          .eq("user_id", userId);

        return new Response(JSON.stringify({
          subscribed: true,
          plan: healTier,
          subscription_end: null,
          subscription_id: null,
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }
    }

    // If profile tier indicates a paid user, check purchases to confirm
    if (profileTier && paidTiers.includes(profileTier)) {
      // Verify there's a purchase record (prevents manual tier manipulation)
      const { data: purchases } = await supabaseClient
        .from("purchases")
        .select("id")
        .eq("user_id", userId)
        .limit(1);

      if (purchases && purchases.length > 0) {
        logStep("One-time purchase confirmed, returning paid status", { tier: profileTier });
        return new Response(JSON.stringify({
          subscribed: true,
          plan: profileTier,
          subscription_end: null,
          subscription_id: null,
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }
      logStep("Tier is paid but no purchase record found, checking Stripe");
    }

    // 2. Check Stripe for active subscriptions (future-proofing for recurring plans)
    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    
    const customers = await stripe.customers.list({ email, limit: 1 });
    
    if (customers.data.length === 0) {
      logStep("No Stripe customer found");
      // Don't reset tier — user may have been granted access via promo code
      return new Response(JSON.stringify({ subscribed: false, plan: null, subscription_end: null }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const customerId = customers.data[0].id;
    logStep("Found Stripe customer", { customerId });

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 1,
    });

    const hasActiveSub = subscriptions.data.length > 0;
    let subscriptionEnd: string | null = null;
    let subscriptionId: string | null = null;

    if (hasActiveSub) {
      const subscription = subscriptions.data[0];
      subscriptionEnd = new Date(subscription.current_period_end * 1000).toISOString();
      subscriptionId = subscription.id;
      
      logStep("Active subscription found", { subscriptionId, endDate: subscriptionEnd });

      await supabaseClient
        .from("profiles")
        .update({ 
          tier: "member",
          subscription_status: "active",
          stripe_customer_id: customerId,
          stripe_subscription_id: subscriptionId
        })
        .eq("user_id", userId);

      return new Response(JSON.stringify({
        subscribed: true,
        plan: "member",
        subscription_end: subscriptionEnd,
        subscription_id: subscriptionId,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // 3. No active subscription — check for one-time payment via Stripe sessions
    logStep("No active subscription, checking for one-time payments");

    // Also check purchases table as a fallback
    const { data: purchases } = await supabaseClient
      .from("purchases")
      .select("id")
      .eq("user_id", userId)
      .limit(1);

    if (purchases && purchases.length > 0) {
      logStep("Found purchase record — user has lifetime access");
      // Ensure profile tier is correct
      await supabaseClient
        .from("profiles")
        .update({ tier: "member", subscription_status: "active" })
        .eq("user_id", userId);

      return new Response(JSON.stringify({
        subscribed: true,
        plan: "member",
        subscription_end: null,
        subscription_id: null,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // No subscription AND no purchase — user is genuinely free
    logStep("No subscription or purchase found — free tier");
    // Only set to free if currently not in a paid tier (avoid race conditions)
    if (!profileTier || !paidTiers.includes(profileTier)) {
      await supabaseClient
        .from("profiles")
        .update({ subscription_status: "inactive" })
        .eq("user_id", userId);
    }

    return new Response(JSON.stringify({
      subscribed: false,
      plan: null,
      subscription_end: null,
      subscription_id: null,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
