import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  full_content: string;
  category: string;
  source_name: string;
  source_url: string | null;
  published_at: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Supabase configuration missing");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Calculate the month for this digest
    const now = new Date();
    const targetMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthName = targetMonth.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    // Check if digest already exists for this month
    const { data: existingDigest } = await supabase
      .from("research_digests")
      .select("id")
      .eq("month", monthName)
      .single();

    if (existingDigest) {
      return new Response(
        JSON.stringify({
          success: true,
          message: `Digest for ${monthName} already exists`,
          digestId: existingDigest.id,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Get all news from the past month
    const startOfMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    const { data: newsArticles, error: fetchError } = await supabase
      .from("news_articles")
      .select("*")
      .gte("published_at", startOfMonth.toISOString())
      .lte("published_at", endOfMonth.toISOString())
      .order("published_at", { ascending: false });

    if (fetchError) {
      throw new Error(`Failed to fetch news: ${fetchError.message}`);
    }

    const articles: NewsArticle[] = newsArticles || [];

    if (articles.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "No news articles found for the past month",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Group articles by category
    const byCategory = articles.reduce(
      (acc, article) => {
        if (!acc[article.category]) acc[article.category] = [];
        acc[article.category].push(article);
        return acc;
      },
      {} as Record<string, NewsArticle[]>
    );

    // Generate highlights (top 3-5 stories)
    const highlights = articles.slice(0, 5).map((a) => a.title);

    // Generate full content markdown
    const sections: string[] = [];

    // Add each category section
    const categoryOrder = ["regulatory", "research", "clinical", "industry"];
    const categoryTitles: Record<string, string> = {
      regulatory: "FDA & Regulatory Updates",
      research: "Research Highlights",
      clinical: "Clinical Trial News",
      industry: "Industry Developments",
    };

    for (const category of categoryOrder) {
      const categoryArticles = byCategory[category];
      if (!categoryArticles || categoryArticles.length === 0) continue;

      sections.push(`## ${categoryTitles[category] || category}\n`);

      for (const article of categoryArticles.slice(0, 3)) {
        sections.push(`### ${article.title}\n`);
        sections.push(`${article.summary}\n`);
        if (article.source_url) {
          sections.push(
            `[Read more](${article.source_url}) — *${article.source_name}*\n`
          );
        }
        sections.push("---\n");
      }
    }

    const fullContent = sections.join("\n");

    // Generate sources array
    const sources = articles
      .filter((a) => a.source_url)
      .slice(0, 10)
      .map((a) => ({
        title: a.source_name,
        url: a.source_url,
      }));

    // Insert the digest
    const { data: digest, error: insertError } = await supabase
      .from("research_digests")
      .insert({
        month: monthName,
        date: targetMonth.toISOString().split("T")[0],
        highlights: highlights,
        full_content: fullContent,
        sources: sources,
        published_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError) {
      throw new Error(`Failed to create digest: ${insertError.message}`);
    }

    console.log(`Created digest for ${monthName} with ${highlights.length} highlights`);

    return new Response(
      JSON.stringify({
        success: true,
        digestId: digest.id,
        month: monthName,
        highlightsCount: highlights.length,
        articlesProcessed: articles.length,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error generating digest:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
