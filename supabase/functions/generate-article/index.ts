import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LOVABLE_API_URL = "https://api.lovable.dev/v1/chat/completions";

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!lovableApiKey) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    const { topic, content_type, target_keywords, related_articles } = await req.json();

    if (!topic) {
      return new Response(
        JSON.stringify({ error: "Missing required field: topic" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Check if this is a pillar page (comprehensive guide)
    const isPillar = content_type === "pillar";
    
    // Build related articles context for internal linking
    const relatedArticlesContext = related_articles?.length
      ? `\n\nIMPORTANT - Internal Links: You MUST include links to these related articles within the content using <a href="/articles/SLUG">anchor text</a> format:\n${related_articles.map((a: { slug: string; title: string }) => `- ${a.title}: /articles/${a.slug}`).join("\n")}`
      : "";

    // Construct the prompt for AI-optimized content generation
    const prompt = `Generate an AI-search-optimized ${isPillar ? "comprehensive pillar page" : "article"} about: ${topic}

Content Type: ${content_type || "guide"}
Target Keywords: ${target_keywords?.join(", ") || "relevant peptide terms"}
${relatedArticlesContext}

Requirements:
1. Title: Write as an exact question someone would ask (e.g., "What is BPC-157 and How Does It Work?")
2. TL;DR: Provide a direct, comprehensive answer in exactly 100 words - this is what AI search engines extract
3. Main content: ${isPillar ? "3,000+" : "2,000+"} words with:
   - Clear H2 and H3 subheadings using <h2> and <h3> tags
   - Short paragraphs (3-4 sentences max)
   - Bullet lists using <ul> and <li> tags
   - Statistical claims with specific percentages
   - At least ${isPillar ? "10" : "5"} research citations
   - Bold key terms using <strong> tags
   ${isPillar ? "- Internal links to related articles using <a href=\"/articles/slug\">text</a> format" : ""}
4. FAQ section: ${isPillar ? "8-10" : "5"} related questions with concise answers
5. Tone: Authoritative but accessible, written by an expert
6. Include: Research citations with PubMed/scientific sources, specific numbers and statistics
${isPillar ? "7. Structure as a comprehensive hub covering all aspects of the topic with clear sections for each subtopic" : ""}

Format your response as valid JSON with this exact structure:
{
  "title": "Question format title",
  "h1_question": "The exact question as H1 (same as title or slightly different)",
  "slug": "url-friendly-slug",
  "meta_description": "SEO meta description under 160 characters",
  "tldr": "Direct answer in exactly 100 words",
  "full_content": "HTML formatted content with h2, h3, p, ul, li, strong, a tags",
  "structured_answer": [
    {"question": "FAQ question 1", "answer": "Concise answer 1"},
    {"question": "FAQ question 2", "answer": "Concise answer 2"}
  ],
  "citations": [
    {"source": "PubMed", "url": "https://pubmed.ncbi.nlm.nih.gov/...", "study_name": "Study title", "year": 2023}
  ],
  "statistics": [
    {"claim": "Statistical claim", "percentage": 85, "sample_size": 1000, "source": "Source name"}
  ],
  "target_keywords": ["keyword1", "keyword2"]
}

IMPORTANT: Return ONLY valid JSON, no markdown code blocks or extra text.`;

    // Call Lovable AI API
    const response = await fetch(LOVABLE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lovableApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "You are an expert medical/scientific content writer specializing in peptide research. Generate high-quality, evidence-based articles optimized for AI search engines like ChatGPT, Perplexity, and Claude. Always respond with valid JSON only.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 8000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Lovable API error:", errorText);
      throw new Error(`Lovable API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedContent = data.choices?.[0]?.message?.content;

    if (!generatedContent) {
      throw new Error("No content generated");
    }

    // Parse the JSON response
    let article;
    try {
      // Clean up potential markdown code blocks
      const cleanContent = generatedContent
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      article = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      console.error("Raw content:", generatedContent);
      throw new Error("Failed to parse generated content as JSON");
    }

    // Add default values
    article.content_type = content_type || "guide";
    article.author_name = "Dr. Sarah Chen";
    article.author_credential = "PhD Biochemistry, 15 years research";
    article.status = "draft";

    return new Response(JSON.stringify({ article }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Generate article error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to generate article";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
