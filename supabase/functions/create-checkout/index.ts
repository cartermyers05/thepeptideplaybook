import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: unknown) => {
  console.log(`[CREATE-CHECKOUT] ${step}`, details ? JSON.stringify(details) : "");
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");
    
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Supabase configuration missing");
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      throw new Error("Invalid user token");
    }
    logStep("User authenticated", { userId: user.id, email: user.email });

    const body = await req.json();
    const { goal } = body;
    
    if (!goal) {
      throw new Error("Goal is required");
    }

    // Get course template to get title
    const { data: template } = await supabase
      .from("course_templates")
      .select("title")
      .eq("goal", goal.replace('-', '_'))
      .single();

    const courseTitle = template?.title || `${goal} Course`;
    logStep("Course selected", { goal, courseTitle });

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2025-08-27.basil",
    });

    // Check if user already has a Stripe customer
    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .single();

    let customerId = profile?.stripe_customer_id;

    if (!customerId) {
      logStep("Creating new Stripe customer");
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          supabase_user_id: user.id,
        },
      });
      customerId = customer.id;

      await supabase
        .from("profiles")
        .update({ stripe_customer_id: customerId })
        .eq("user_id", user.id);
      
      logStep("Stripe customer created", { customerId });
    } else {
      logStep("Using existing Stripe customer", { customerId });
    }

    // Check if user already purchased this course
    const { data: existingCourse } = await supabase
      .from("user_courses")
      .select("id")
      .eq("user_id", user.id)
      .eq("goal", goal.replace('-', '_'))
      .maybeSingle();

    if (existingCourse) {
      throw new Error("You already own this course. Go to your dashboard to access it.");
    }

    // Create one-time payment session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: courseTitle,
              description: 'Lifetime access to your personalized peptide course',
            },
            unit_amount: 9900, // $99.00
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/dashboard?welcome=true&goal=${goal}`,
      cancel_url: `${req.headers.get("origin")}/course/${goal}`,
      metadata: {
        user_id: user.id,
        goal: goal.replace('-', '_'),
      },
    });

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    logStep("ERROR", { message: errorMessage });
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
