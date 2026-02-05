import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { checkRateLimit, getClientIP, isValidEmail, isDisposableEmail } from "../_shared/rateLimiter.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientIP = getClientIP(req);
    
    // Rate limit: 3 submissions per hour per IP
    const rateLimit = checkRateLimit(`partner:${clientIP}`, 3, 3600);
    
    if (!rateLimit.allowed) {
      return new Response(
        JSON.stringify({ 
          error: "Too many submissions. Please try again later.",
          retryAfter: rateLimit.resetIn 
        }),
        {
          status: 429,
          headers: { 
            ...corsHeaders, 
            "Content-Type": "application/json",
            "Retry-After": rateLimit.resetIn.toString()
          },
        }
      );
    }

    const { name, email, social_handle, follower_count, why_partner, how_promote, honeypot } = await req.json();

    // Honeypot check - if filled, silently succeed (bots fill hidden fields)
    if (honeypot) {
      console.log("Honeypot triggered, blocking partner application submission");
      return new Response(
        JSON.stringify({ success: true, message: "Application submitted successfully" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate required fields
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Name is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!email || typeof email !== "string") {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!social_handle || typeof social_handle !== "string" || social_handle.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Social handle is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Block disposable emails
    if (isDisposableEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Please use a permanent email address" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate field lengths
    if (name.length > 100) {
      return new Response(
        JSON.stringify({ error: "Name must be less than 100 characters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (social_handle.length > 100) {
      return new Response(
        JSON.stringify({ error: "Social handle must be less than 100 characters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (follower_count && (typeof follower_count !== "string" || follower_count.length > 50)) {
      return new Response(
        JSON.stringify({ error: "Invalid follower count" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (why_partner && (typeof why_partner !== "string" || why_partner.length > 2000)) {
      return new Response(
        JSON.stringify({ error: "Why partner field must be less than 2000 characters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (how_promote && (typeof how_promote !== "string" || how_promote.length > 2000)) {
      return new Response(
        JSON.stringify({ error: "How promote field must be less than 2000 characters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Insert application using service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check for duplicate email
    const { data: existingApplication } = await supabase
      .from("partner_applications")
      .select("id")
      .eq("email", email.toLowerCase().trim())
      .maybeSingle();

    if (existingApplication) {
      return new Response(
        JSON.stringify({ success: true, message: "You've already submitted an application. We'll be in touch!" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { error: insertError } = await supabase.from("partner_applications").insert({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      social_handle: social_handle.trim(),
      follower_count: follower_count?.trim() || null,
      why_partner: why_partner?.trim() || null,
      how_promote: how_promote?.trim() || null,
    });

    if (insertError) {
      console.error("Partner application insert error:", insertError);
      throw insertError;
    }

    return new Response(
      JSON.stringify({ success: true, message: "Application submitted successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Submit partner application error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to submit application" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
