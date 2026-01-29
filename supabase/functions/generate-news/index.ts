import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NewsArticle {
  title: string;
  summary: string;
  full_content: string;
  source_name: string;
  source_url: string;
  category: "research" | "clinical" | "regulatory" | "industry";
  slug: string;
}

interface FirecrawlSearchResult {
  url: string;
  title: string;
  description: string;
  markdown?: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const firecrawlApiKey = Deno.env.get("FIRECRAWL_API_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!firecrawlApiKey) {
      throw new Error("FIRECRAWL_API_KEY not configured");
    }
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Supabase configuration missing");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get peptide names from database for targeted searches
    const { data: peptides } = await supabase
      .from("peptides")
      .select("name")
      .limit(10);

    const peptideNames = peptides?.map((p) => p.name) || [
      "semaglutide",
      "tirzepatide",
      "BPC-157",
    ];

    // Search queries for different categories
    const searchQueries = [
      {
        query: "peptide research news 2026",
        category: "research" as const,
      },
      {
        query: "FDA peptide compounding regulation 2026",
        category: "regulatory" as const,
      },
      {
        query: "clinical trial peptide GLP-1 results",
        category: "clinical" as const,
      },
      {
        query: `${peptideNames[0]} latest news research`,
        category: "research" as const,
      },
    ];

    const generatedArticles: NewsArticle[] = [];
    const existingSlugs = new Set<string>();

    // Get existing slugs to avoid duplicates
    const { data: existingArticles } = await supabase
      .from("news_articles")
      .select("slug")
      .order("created_at", { ascending: false })
      .limit(100);

    existingArticles?.forEach((a) => existingSlugs.add(a.slug));

    for (const { query, category } of searchQueries) {
      console.log(`Searching: ${query}`);

      // Use Firecrawl search API
      const searchResponse = await fetch(
        "https://api.firecrawl.dev/v1/search",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${firecrawlApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query,
            limit: 3,
            tbs: "qdr:w", // Past week
            scrapeOptions: {
              formats: ["markdown"],
            },
          }),
        }
      );

      if (!searchResponse.ok) {
        console.error(
          `Search failed for "${query}": ${searchResponse.status}`
        );
        continue;
      }

      const searchData = await searchResponse.json();
      const results: FirecrawlSearchResult[] = searchData.data || [];

      for (const result of results) {
        if (!result.title || !result.url) continue;

        // Generate slug
        const slug = result.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
          .slice(0, 80);

        // Skip if already exists
        if (existingSlugs.has(slug)) {
          console.log(`Skipping duplicate: ${slug}`);
          continue;
        }

        // Extract source name from URL
        const sourceName = new URL(result.url).hostname
          .replace("www.", "")
          .split(".")[0]
          .charAt(0)
          .toUpperCase() +
          new URL(result.url).hostname
            .replace("www.", "")
            .split(".")[0]
            .slice(1);

        // Generate summary from description or markdown
        const summary =
          result.description ||
          (result.markdown
            ? result.markdown.slice(0, 200).replace(/\n/g, " ").trim() + "..."
            : "Latest updates on peptide research and industry news.");

        // Generate full content
        const fullContent =
          result.markdown ||
          `# ${result.title}\n\n${result.description || ""}\n\n[Read the full article](${result.url})`;

        generatedArticles.push({
          title: result.title,
          summary: summary.slice(0, 500),
          full_content: fullContent.slice(0, 10000),
          source_name: sourceName,
          source_url: result.url,
          category,
          slug,
        });

        existingSlugs.add(slug);
      }
    }

    // Insert new articles
    if (generatedArticles.length > 0) {
      const { error: insertError } = await supabase
        .from("news_articles")
        .insert(
          generatedArticles.map((article, index) => ({
            ...article,
            featured: index === 0, // Mark first article as featured
            published_at: new Date().toISOString(),
          }))
        );

      if (insertError) {
        console.error("Insert error:", insertError);
        throw new Error(`Failed to insert articles: ${insertError.message}`);
      }

      // Reset previous featured articles (keep only today's)
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      await supabase
        .from("news_articles")
        .update({ featured: false })
        .lt("created_at", today.toISOString())
        .eq("featured", true);
    }

    console.log(`Generated ${generatedArticles.length} new articles`);

    return new Response(
      JSON.stringify({
        success: true,
        articlesGenerated: generatedArticles.length,
        articles: generatedArticles.map((a) => ({
          title: a.title,
          category: a.category,
        })),
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error generating news:", error);
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
