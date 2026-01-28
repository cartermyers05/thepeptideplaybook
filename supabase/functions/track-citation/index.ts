import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
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
