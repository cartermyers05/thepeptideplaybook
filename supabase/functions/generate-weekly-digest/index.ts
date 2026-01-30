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

interface DigestContent {
  highlights: string[];
  full_content: string;
}

async function generateAIDigest(articles: NewsArticle[]): Promise<DigestContent> {
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  
  if (!LOVABLE_API_KEY) {
    console.log("LOVABLE_API_KEY not available, using fallback generation");
    return generateFallbackDigest(articles);
  }

  const articleSummaries = articles.map((a, i) => 
    `${i + 1}. ${a.title}\nCategory: ${a.category}\nSummary: ${a.summary}\nSource: ${a.source_name}`
  ).join("\n\n");

  const prompt = `You are a peptide research curator writing a weekly digest for health-conscious professionals interested in peptides, GLP-1s, and longevity research.

Here are the top news articles from this week:

${articleSummaries}

Create an engaging weekly digest with:

1. **5 highlight bullets** - Short, punchy one-liners about the most exciting developments. Make them actionable and interesting. Start each with an emoji.

2. **Full digest content** in markdown format:
   - Start with a brief "This Week in Peptides" intro (2-3 sentences)
   - Group stories by theme (GLP-1s, Research, Regulatory, etc.)
   - For each story, write 2-3 sentences explaining why it matters
   - End with a "What to Watch" section about upcoming developments

Write in a friendly, knowledgeable tone. Be excited about breakthroughs but balanced about hype. Focus on practical implications for readers.

Respond with valid JSON in this exact format:
{
  "highlights": ["highlight 1", "highlight 2", "highlight 3", "highlight 4", "highlight 5"],
  "full_content": "markdown content here"
}`;

  try {
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "You are a peptide research expert who writes engaging, informative weekly digests. Always respond with valid JSON." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      console.error("AI API error:", response.status);
      return generateFallbackDigest(articles);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      console.error("No content in AI response");
      return generateFallbackDigest(articles);
    }

    // Parse the JSON response (handle markdown code blocks)
    let jsonStr = content.trim();
    if (jsonStr.startsWith("```json")) {
      jsonStr = jsonStr.slice(7);
    }
    if (jsonStr.startsWith("```")) {
      jsonStr = jsonStr.slice(3);
    }
    if (jsonStr.endsWith("```")) {
      jsonStr = jsonStr.slice(0, -3);
    }
    jsonStr = jsonStr.trim();

    const parsed = JSON.parse(jsonStr);
    
    return {
      highlights: parsed.highlights || articles.slice(0, 5).map(a => a.title),
      full_content: parsed.full_content || generateFallbackContent(articles),
    };
  } catch (error) {
    console.error("Error generating AI digest:", error);
    return generateFallbackDigest(articles);
  }
}

function generateFallbackDigest(articles: NewsArticle[]): DigestContent {
  return {
    highlights: articles.slice(0, 5).map(a => a.title),
    full_content: generateFallbackContent(articles),
  };
}

function generateFallbackContent(articles: NewsArticle[]): string {
  const sections: string[] = [];
  
  sections.push("## This Week in Peptides\n");
  sections.push("Here's your weekly roundup of the most important peptide news and research.\n");
  
  const byCategory = articles.reduce((acc, article) => {
    if (!acc[article.category]) acc[article.category] = [];
    acc[article.category].push(article);
    return acc;
  }, {} as Record<string, NewsArticle[]>);

  const categoryTitles: Record<string, string> = {
    regulatory: "🏛️ FDA & Regulatory Updates",
    research: "🔬 Research Highlights", 
    clinical: "💊 Clinical Trial News",
    industry: "📈 Industry Developments",
  };

  for (const [category, categoryArticles] of Object.entries(byCategory)) {
    sections.push(`\n## ${categoryTitles[category] || category}\n`);
    
    for (const article of categoryArticles.slice(0, 3)) {
      sections.push(`### ${article.title}\n`);
      sections.push(`${article.summary}\n`);
      if (article.source_url) {
        sections.push(`[Read more](${article.source_url}) — *${article.source_name}*\n`);
      }
    }
  }

  return sections.join("\n");
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

    // Calculate the week for this digest
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - 7);
    
    // Format as "Week of January 27, 2026"
    const weekLabel = `Week of ${now.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric", 
      year: "numeric",
    })}`;

    // Check if digest already exists for this week
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay() + 1); // Monday
    weekStart.setHours(0, 0, 0, 0);
    
    const { data: existingDigest } = await supabase
      .from("research_digests")
      .select("id")
      .eq("digest_type", "weekly")
      .gte("date", weekStart.toISOString().split("T")[0])
      .single();

    if (existingDigest) {
      return new Response(
        JSON.stringify({
          success: true,
          message: `Weekly digest for ${weekLabel} already exists`,
          digestId: existingDigest.id,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Get news from the past 7 days
    const { data: newsArticles, error: fetchError } = await supabase
      .from("news_articles")
      .select("*")
      .gte("published_at", startOfWeek.toISOString())
      .order("published_at", { ascending: false });

    if (fetchError) {
      throw new Error(`Failed to fetch news: ${fetchError.message}`);
    }

    const articles: NewsArticle[] = newsArticles || [];

    if (articles.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "No news articles found for the past week",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log(`Found ${articles.length} articles for weekly digest`);

    // Generate AI-powered digest
    const digestContent = await generateAIDigest(articles);

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
        month: weekLabel,
        date: now.toISOString().split("T")[0],
        highlights: digestContent.highlights,
        full_content: digestContent.full_content,
        sources: sources,
        digest_type: "weekly",
        published_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError) {
      throw new Error(`Failed to create digest: ${insertError.message}`);
    }

    console.log(`Created weekly digest: ${weekLabel} with ${digestContent.highlights.length} highlights`);

    return new Response(
      JSON.stringify({
        success: true,
        digestId: digest.id,
        week: weekLabel,
        highlightsCount: digestContent.highlights.length,
        articlesProcessed: articles.length,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error generating weekly digest:", error);
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
