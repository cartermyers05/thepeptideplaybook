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

    // Authenticate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header provided");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !userData.user) {
      throw new Error("Invalid user token");
    }
    
    const user = userData.user;
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Get session_id from request body
    const { session_id } = await req.json();
    
    if (!session_id) {
      // No session_id means this is a backup check - verify via customer payments
      logStep("No session_id, checking existing payments");
      
      const { data: profile } = await supabase
        .from("profiles")
        .select("stripe_customer_id, tier")
        .eq("user_id", user.id)
        .single();
      
      if (!profile?.stripe_customer_id) {
        logStep("No Stripe customer found");
        return new Response(JSON.stringify({ 
          verified: false, 
          reason: "no_customer" 
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }

      // Already a member, no need to verify
      if (profile.tier === "member") {
        logStep("User already a member");
        return new Response(JSON.stringify({ 
          verified: true, 
          already_member: true 
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }

      // Check Stripe for successful payments
      const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
      
      const paymentIntents = await stripe.paymentIntents.list({
        customer: profile.stripe_customer_id,
        limit: 10,
      });

      const successfulPayment = paymentIntents.data.find(
        (pi: Stripe.PaymentIntent) => pi.status === "succeeded" && pi.metadata?.tier === "member"
      );

      if (successfulPayment) {
        logStep("Found successful payment, updating tier", { paymentId: successfulPayment.id });
        
        // Check if purchase already recorded
        const { data: existingPurchase } = await supabase
          .from("purchases")
          .select("id")
          .eq("stripe_payment_id", successfulPayment.id)
          .maybeSingle();

        if (!existingPurchase) {
          // Update profile tier
          await supabase
            .from("profiles")
            .update({ tier: "member" })
            .eq("user_id", user.id);

          // Record purchase
          await supabase.from("purchases").insert({
            user_id: user.id,
            tier: "member",
            amount: successfulPayment.amount,
            stripe_payment_id: successfulPayment.id,
          });
        }

        return new Response(JSON.stringify({ verified: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }

      logStep("No successful member payment found");
      return new Response(JSON.stringify({ 
        verified: false, 
        reason: "no_payment" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Verify specific checkout session
    logStep("Verifying checkout session", { session_id });
    
    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    const session = await stripe.checkout.sessions.retrieve(session_id);

    logStep("Session retrieved", { 
      payment_status: session.payment_status,
      metadata_user_id: session.metadata?.user_id,
      metadata_goal: session.metadata?.goal
    });

    // Verify payment was successful
    if (session.payment_status !== "paid") {
      logStep("Payment not completed");
      return new Response(JSON.stringify({ 
        verified: false, 
        reason: "not_paid",
        payment_status: session.payment_status 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Verify the session belongs to this user
    if (session.metadata?.user_id !== user.id) {
      logStep("User ID mismatch", { 
        session_user: session.metadata?.user_id, 
        auth_user: user.id 
      });
      return new Response(JSON.stringify({ 
        verified: false, 
        reason: "user_mismatch" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Check if purchase already recorded (idempotency)
    const paymentIntentId = session.payment_intent as string;
    const { data: existingPurchase } = await supabase
      .from("purchases")
      .select("id")
      .eq("stripe_payment_id", paymentIntentId)
      .maybeSingle();

    if (existingPurchase) {
      logStep("Purchase already recorded, skipping insert");
      return new Response(JSON.stringify({ 
        verified: true, 
        already_processed: true 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Get goal from session metadata
    const goal = session.metadata?.goal || 'beginner';
    logStep("Creating user course", { goal });

    // Get course template for this goal
    const { data: template } = await supabase
      .from("course_templates")
      .select("*")
      .eq("goal", goal)
      .single();

    // Create user_courses record
    const courseData = {
      user_id: user.id,
      goal: goal,
      title: template?.title || `${goal.replace('_', ' ')} Course`,
      duration_days: template?.duration_days || 56,
      lessons: template?.lessons || {},
      peptides: template?.peptides || {},
      template_id: template?.id || null,
      status: 'pending_quiz', // Will be set to 'active' after quiz completion
      purchased_at: new Date().toISOString(),
    };

    const { error: courseError } = await supabase
      .from("user_courses")
      .insert(courseData);

    if (courseError) {
      logStep("Error creating user course", { error: courseError.message });
      // Don't throw - continue with other operations
    } else {
      logStep("User course created successfully");
    }

    // Update profile tier to member
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ tier: "member" })
      .eq("user_id", user.id);

    if (updateError) {
      logStep("Error updating profile", { error: updateError.message });
      throw new Error("Failed to update profile tier");
    }

    logStep("Profile tier updated to member");

    // Record purchase with goal
    const { error: purchaseError } = await supabase.from("purchases").insert({
      user_id: user.id,
      tier: "member",
      amount: session.amount_total || 0,
      stripe_payment_id: paymentIntentId,
      course_goal: goal,
    });

    if (purchaseError) {
      logStep("Error recording purchase", { error: purchaseError.message });
      // Don't throw - tier was updated successfully
    } else {
      logStep("Purchase recorded");
    }

    // Check if this user was referred and mark the referral as completed
    try {
      const { data: referralData, error: referralFetchError } = await supabase
        .from("referrals")
        .select("id, status")
        .eq("referred_id", user.id)
        .eq("status", "pending")
        .maybeSingle();

      if (!referralFetchError && referralData) {
        const { error: referralUpdateError } = await supabase
          .from("referrals")
          .update({ 
            status: "completed",
            reward_applied: true 
          })
          .eq("id", referralData.id);

        if (referralUpdateError) {
          logStep("Error updating referral", { error: referralUpdateError.message });
        } else {
          logStep("Referral marked as completed", { referralId: referralData.id });
        }
      }
    } catch (refError) {
      logStep("Error processing referral completion", { error: String(refError) });
      // Don't throw - this is a non-critical operation
    }

    return new Response(JSON.stringify({ verified: true, goal }), {
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
