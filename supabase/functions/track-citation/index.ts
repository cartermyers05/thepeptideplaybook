import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

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

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientIP = getClientIP(req);
    
    // Rate limit: 100 citations per minute per IP (reasonable for analytics)
    const rateLimit = checkRateLimit(`citation:${clientIP}`, 100, 60);
    
    if (!rateLimit.allowed) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded" }),
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

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { article_id, ai_engine, query, citation_position, referrer_url } = await req.json();

    // Validate required fields
    if (!article_id || !ai_engine || !query) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: article_id, ai_engine, query" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Validate AI engine
    const validEngines = ["chatgpt", "perplexity", "claude", "gemini", "other"];
    if (!validEngines.includes(ai_engine)) {
      return new Response(
        JSON.stringify({ error: `Invalid ai_engine. Must be one of: ${validEngines.join(", ")}` }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Insert citation record
    const { error: citationError } = await supabase.from("ai_citations").insert({
      article_id,
      ai_engine,
      query,
      citation_position: citation_position || null,
      referrer_url: referrer_url || null,
    });

    if (citationError) {
      console.error("Citation insert error:", citationError);
      throw citationError;
    }

    // Increment citation count on article
    const { data: article, error: fetchError } = await supabase
      .from("articles")
      .select("citation_count")
      .eq("id", article_id)
      .single();

    if (!fetchError && article) {
      await supabase
        .from("articles")
        .update({ citation_count: (article.citation_count || 0) + 1 })
        .eq("id", article_id);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Citation tracked successfully" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Track citation error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to track citation" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
