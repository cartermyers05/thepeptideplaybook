import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// In-memory rate limiter
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

function checkRateLimit(
  identifier: string,
  maxRequests: number,
  windowSeconds: number
): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  
  let entry = rateLimitStore.get(identifier);
  
  if (!entry || entry.resetAt < now) {
    entry = { count: 1, resetAt: now + windowMs };
    rateLimitStore.set(identifier, entry);
    return { allowed: true, remaining: maxRequests - 1, resetIn: windowSeconds };
  }
  
  if (entry.count < maxRequests) {
    entry.count++;
    return { allowed: true, remaining: maxRequests - entry.count, resetIn: Math.ceil((entry.resetAt - now) / 1000) };
  }
  
  return { allowed: false, remaining: 0, resetIn: Math.ceil((entry.resetAt - now) / 1000) };
}

function getClientIP(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  const realIP = req.headers.get("x-real-ip");
  if (realIP) return realIP;
  return "unknown";
}

// Disposable email domains to block
const DISPOSABLE_DOMAINS = [
  "guerrillamail.com", "guerrillamail.net", "10minutemail.com", "10minutemail.net",
  "tempmail.com", "tempmail.net", "throwaway.email", "mailinator.com", "maildrop.cc",
  "fakeinbox.com", "trashmail.com", "getnada.com", "temp-mail.org", "mohmal.com",
  "discard.email", "sharklasers.com", "yopmail.com", "mailnesia.com",
];

function isDisposableEmail(email: string): boolean {
  const domain = email.toLowerCase().split("@")[1];
  return DISPOSABLE_DOMAINS.includes(domain);
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientIP = getClientIP(req);
    
    // Rate limit: 5 submissions per hour per IP
    const rateLimit = checkRateLimit(`lead:${clientIP}`, 5, 3600);
    
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

    const { email, first_name, source, honeypot } = await req.json();

    // Honeypot check - if filled, silently succeed (bots fill hidden fields)
    if (honeypot) {
      console.log("Honeypot triggered, blocking submission");
      return new Response(
        JSON.stringify({ success: true, message: "Lead submitted successfully" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate required fields
    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
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

    // Validate first_name if provided
    if (first_name && (typeof first_name !== "string" || first_name.length > 100)) {
      return new Response(
        JSON.stringify({ error: "Invalid first name" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate source if provided
    const validSources = ["free-guide", "exit-intent", "footer", "homepage"];
    const sanitizedSource = source && validSources.includes(source) ? source : "unknown";

    // Insert lead using service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { error: insertError } = await supabase.from("leads").insert({
      email: email.toLowerCase().trim(),
      first_name: first_name?.trim() || null,
      source: sanitizedSource,
    });

    if (insertError) {
      // Handle duplicate email gracefully
      if (insertError.code === "23505") {
        return new Response(
          JSON.stringify({ success: true, message: "You're already signed up!" }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      console.error("Lead insert error:", insertError);
      throw insertError;
    }

    return new Response(
      JSON.stringify({ success: true, message: "Lead submitted successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Submit lead error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to submit lead" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
