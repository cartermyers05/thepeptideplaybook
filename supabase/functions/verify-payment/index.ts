import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[VERIFY-PAYMENT] ${step}${detailsStr}`);
};

/** Update profile tier and verify it actually persisted */
async function updateAndVerifyTier(
  supabase: ReturnType<typeof createClient>,
  userId: string,
): Promise<{ success: boolean; error?: string }> {
  // Attempt update
  const { error: updateError } = await supabase
    .from("profiles")
    .update({ tier: "member" })
    .eq("user_id", userId);

  if (updateError) {
    logStep("Profile update failed", { error: updateError.message, code: updateError.code });
    return { success: false, error: updateError.message };
  }

  // Verify the update actually stuck
  const { data: verify, error: verifyError } = await supabase
    .from("profiles")
    .select("tier")
    .eq("user_id", userId)
    .single();

  if (verifyError || verify?.tier !== "member") {
    logStep("Profile update did NOT persist", { readBack: verify?.tier, error: verifyError?.message });
    return { success: false, error: `Tier read-back mismatch: got ${verify?.tier}` };
  }

  logStep("Profile tier verified as member");
  return { success: true };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!stripeKey || !supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing required environment variables");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Auth is OPTIONAL — user may have lost session after payment
    const authHeader = req.headers.get("Authorization");
    let user: { id: string; email?: string } | null = null;

    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const { data: userData, error: userError } = await supabase.auth.getUser(token);
      if (!userError && userData.user) {
        user = userData.user;
        logStep("User authenticated", { userId: user.id, email: user.email });
      } else {
        logStep("Auth header present but invalid, proceeding without user");
      }
    } else {
      logStep("No auth header, proceeding as unauthenticated");
    }

    // Get session_id from request body
    const { session_id } = await req.json();

    if (!session_id) {
      // No session_id — backup check requires auth
      if (!user) {
        return new Response(JSON.stringify({ verified: false, reason: "no_session" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }

      logStep("No session_id, checking existing payments");

      const { data: profile } = await supabase
        .from("profiles")
        .select("stripe_customer_id, tier")
        .eq("user_id", user.id)
        .single();

      if (!profile?.stripe_customer_id) {
        return new Response(JSON.stringify({ verified: false, reason: "no_customer" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }

      if (profile.tier === "member") {
        return new Response(JSON.stringify({ verified: true, already_member: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }

      const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
      const paymentIntents = await stripe.paymentIntents.list({
        customer: profile.stripe_customer_id,
        limit: 10,
      });

      const successfulPayment = paymentIntents.data.find(
        (pi: Stripe.PaymentIntent) => pi.status === "succeeded" && pi.metadata?.tier === "member"
      );

      if (successfulPayment) {
        logStep("Found successful payment", { paymentId: successfulPayment.id });

        const { data: existingPurchase } = await supabase
          .from("purchases")
          .select("id")
          .eq("stripe_payment_id", successfulPayment.id)
          .maybeSingle();

        if (!existingPurchase) {
          const tierResult = await updateAndVerifyTier(supabase, user.id);
          await supabase.from("purchases").insert({
            user_id: user.id,
            tier: "member",
            amount: successfulPayment.amount,
            stripe_payment_id: successfulPayment.id,
          });

          if (!tierResult.success) {
            return new Response(JSON.stringify({ verified: true, tier_update_failed: true, error: tierResult.error }), {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 200,
            });
          }
        }

        return new Response(JSON.stringify({ verified: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }

      return new Response(JSON.stringify({ verified: false, reason: "no_payment" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // ── Verify specific checkout session ──
    logStep("Verifying checkout session", { session_id });

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    const session = await stripe.checkout.sessions.retrieve(session_id);

    logStep("Session retrieved", {
      payment_status: session.payment_status,
      customer_email: session.customer_email,
      metadata_user_id: session.metadata?.user_id,
      metadata_quiz_goal: session.metadata?.quiz_goal,
    });

    if (session.payment_status !== "paid") {
      return new Response(JSON.stringify({
        verified: false,
        reason: "not_paid",
        payment_status: session.payment_status,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // If authenticated, verify user_id matches session metadata
    if (user && session.metadata?.user_id && session.metadata.user_id !== user.id) {
      logStep("User ID mismatch", { session_user: session.metadata.user_id, auth_user: user.id });
      return new Response(JSON.stringify({ verified: false, reason: "user_mismatch" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Idempotency: check if purchase already recorded
    const paymentIntentId = session.payment_intent as string;
    const { data: existingPurchase } = await supabase
      .from("purchases")
      .select("id")
      .eq("stripe_payment_id", paymentIntentId)
      .maybeSingle();

    if (existingPurchase) {
      logStep("Purchase already recorded, skipping insert");

      // Even if purchase exists, make sure tier is correct (auto-heal)
      if (user) {
        const { data: profileCheck } = await supabase
          .from("profiles")
          .select("tier")
          .eq("user_id", user.id)
          .single();

        if (profileCheck && profileCheck.tier !== "member") {
          logStep("Auto-healing tier on already-processed purchase");
          await updateAndVerifyTier(supabase, user.id);
        }
      }

      return new Response(JSON.stringify({
        verified: true,
        already_processed: true,
        email: session.customer_email,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // If no authenticated user, try to find by email from Stripe session
    if (!user && session.customer_email) {
      const { data: users } = await supabase.auth.admin.listUsers();
      const found = users?.users?.find(u => u.email === session.customer_email);
      if (found) {
        user = { id: found.id, email: found.email };
        logStep("Found user by email", { userId: user.id });
      }
    }

    // Use quiz_goal from metadata (matches create-checkout)
    const goal = session.metadata?.quiz_goal || 'beginner';
    logStep("Creating user course", { goal });

    let tierUpdateFailed = false;

    // Only do user-specific operations if we have a user
    if (user) {
      // Get course template for this goal
      const { data: template } = await supabase
        .from("course_templates")
        .select("*")
        .eq("goal", goal)
        .single();

      const courseData = {
        user_id: user.id,
        goal: goal,
        title: template?.title || `${goal.replace('_', ' ')} Course`,
        duration_days: template?.duration_days || 56,
        lessons: template?.lessons || {},
        peptides: template?.peptides || {},
        template_id: template?.id || null,
        status: 'not_started',
        purchased_at: new Date().toISOString(),
      };

      const { error: courseError } = await supabase.from("user_courses").insert(courseData);
      if (courseError) {
        logStep("Error creating user course", { error: courseError.message });
      } else {
        logStep("User course created successfully");
      }

      // Update profile tier with verification
      const tierResult = await updateAndVerifyTier(supabase, user.id);
      if (!tierResult.success) {
        logStep("CRITICAL: Tier update failed after purchase", { error: tierResult.error });
        // Retry once
        logStep("Retrying tier update...");
        const retryResult = await updateAndVerifyTier(supabase, user.id);
        if (!retryResult.success) {
          logStep("CRITICAL: Tier update retry also failed", { error: retryResult.error });
          tierUpdateFailed = true;
        }
      }

      // Record purchase
      const { error: purchaseError } = await supabase.from("purchases").insert({
        user_id: user.id,
        tier: "member",
        amount: session.amount_total || 0,
        stripe_payment_id: paymentIntentId,
        course_goal: goal,
      });

      if (purchaseError) {
        logStep("Error recording purchase", { error: purchaseError.message });
      } else {
        logStep("Purchase recorded");
      }

      // Check referral completion
      try {
        const { data: referralData, error: referralFetchError } = await supabase
          .from("referrals")
          .select("id, status")
          .eq("referred_id", user.id)
          .eq("status", "pending")
          .maybeSingle();

        if (!referralFetchError && referralData) {
          await supabase
            .from("referrals")
            .update({ status: "completed", reward_applied: true })
            .eq("id", referralData.id);
          logStep("Referral marked as completed", { referralId: referralData.id });
        }
      } catch (refError) {
        logStep("Error processing referral", { error: String(refError) });
      }
    } else {
      logStep("No user found, skipping user-specific operations");
    }

    return new Response(JSON.stringify({
      verified: true,
      goal,
      email: session.customer_email,
      tier_update_failed: tierUpdateFailed,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
