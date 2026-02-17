import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const lovableKey = Deno.env.get("LOVABLE_API_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    // Fetch recent regulatory news
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const { data: news } = await supabase
      .from("news_articles")
      .select("id, title, summary, full_content, published_at")
      .eq("category", "regulatory")
      .gte("published_at", thirtyDaysAgo)
      .order("published_at", { ascending: false })
      .limit(20);

    if (!news || news.length === 0) {
      return new Response(JSON.stringify({ message: "No recent regulatory news found", suggestions: [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const articlesText = news.map((a: any) => `[${a.published_at}] ${a.title}\n${a.summary}`).join("\n\n");

    const aiResponse = await fetch("https://api.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You extract FDA regulatory timeline events about peptides from news articles. Return a JSON array of events with fields: peptide_name, event_date (YYYY-MM-DD), event_type (one of: approved, banned, under_review, hearing, expected_decision), title (short headline), description (1-2 sentences), status (confirmed or projected). Only include events that are clearly about FDA regulatory actions on specific peptides. Return empty array if no relevant events found.`,
          },
          {
            role: "user",
            content: `Extract FDA regulatory timeline events from these recent news articles:\n\n${articlesText}`,
          },
        ],
        temperature: 0.2,
      }),
    });

    const aiData = await aiResponse.json();
    const content = aiData.choices?.[0]?.message?.content || "[]";

    // Parse JSON from response
    let suggestions = [];
    try {
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        suggestions = JSON.parse(jsonMatch[0]);
      }
    } catch {
      suggestions = [];
    }

    // Optionally auto-insert
    const { autoInsert } = await req.json().catch(() => ({ autoInsert: false }));
    if (autoInsert && suggestions.length > 0) {
      for (const event of suggestions) {
        await supabase.from("fda_timeline_events").insert({
          peptide_name: event.peptide_name,
          event_date: event.event_date,
          event_type: event.event_type,
          title: event.title,
          description: event.description,
          status: event.status || "confirmed",
        });
      }
    }

    return new Response(JSON.stringify({ suggestions, autoInserted: autoInsert }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
