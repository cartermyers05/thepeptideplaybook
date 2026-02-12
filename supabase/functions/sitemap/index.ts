import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

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

    // Fetch all published articles
    const { data: articles, error: articlesError } = await supabase
      .from("articles")
      .select("slug, updated_at, published_at, title")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (articlesError) throw articlesError;

    // Fetch all news articles
    const { data: newsArticles, error: newsError } = await supabase
      .from("news_articles")
      .select("slug, updated_at, published_at, title")
      .order("published_at", { ascending: false });

    if (newsError) throw newsError;

    const baseUrl = "https://peptideplaybook.org";

    // Static pages with their priorities and change frequencies
    const staticPages = [
      { path: "/", priority: "1.0", changefreq: "daily" },
      { path: "/quiz", priority: "0.7", changefreq: "weekly" },
      { path: "/articles", priority: "0.9", changefreq: "daily" },
      { path: "/blog", priority: "0.9", changefreq: "daily" },
      { path: "/about", priority: "0.7", changefreq: "monthly" },
      { path: "/pricing", priority: "0.8", changefreq: "weekly" },
      { path: "/terms", priority: "0.3", changefreq: "yearly" },
      { path: "/privacy", priority: "0.3", changefreq: "yearly" },
      { path: "/disclaimer", priority: "0.3", changefreq: "yearly" },
      // Tool pages
      { path: "/tools/peptide-calculator", priority: "0.9", changefreq: "weekly" },
      // SEO Guide pages
      { path: "/guides", priority: "0.9", changefreq: "weekly" },
      { path: "/guides/how-to-reconstitute-peptides", priority: "0.9", changefreq: "monthly" },
      { path: "/guides/semaglutide-dosing", priority: "0.9", changefreq: "monthly" },
      { path: "/guides/semaglutide-side-effects", priority: "0.9", changefreq: "monthly" },
      { path: "/guides/bpc-157-complete-guide", priority: "0.8", changefreq: "monthly" },
      { path: "/guides/peptides-fda-legal-status-2026", priority: "0.9", changefreq: "weekly" },
      { path: "/guides/are-peptides-safe", priority: "0.8", changefreq: "monthly" },
      { path: "/guides/bpc-157-vs-tb-500", priority: "0.7", changefreq: "monthly" },
      { path: "/guides/semaglutide-complete-guide", priority: "0.9", changefreq: "monthly" },
      { path: "/guides/tirzepatide-vs-semaglutide", priority: "0.8", changefreq: "monthly" },
      { path: "/guides/growth-hormone-peptides-guide", priority: "0.8", changefreq: "monthly" },
      { path: "/guides/peptide-injection-sites", priority: "0.8", changefreq: "monthly" },
      { path: "/guides/bpc-157-cancer-risk", priority: "0.8", changefreq: "monthly" },
      { path: "/guides/bpc-157-drug-test", priority: "0.8", changefreq: "monthly" },
      { path: "/guides/bpc-157-infection-risk", priority: "0.8", changefreq: "monthly" },
      { path: "/guides/tb-500-side-effects", priority: "0.8", changefreq: "monthly" },
      { path: "/guides/cjc-1295-safety", priority: "0.8", changefreq: "monthly" },
      { path: "/guides/verify-peptide-coa", priority: "0.8", changefreq: "monthly" },
      { path: "/guides/peptide-contamination", priority: "0.8", changefreq: "monthly" },
      { path: "/guides/peptide-tiktok-myths", priority: "0.8", changefreq: "monthly" },
    ];

    // Generate XML sitemap with enhanced structure
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${staticPages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join("")}
  ${articles
    ?.map(
      (article) => `
  <url>
    <loc>${baseUrl}/articles/${article.slug}</loc>
    <lastmod>${
      article.updated_at
        ? new Date(article.updated_at).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0]
    }</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join("")}
  ${newsArticles
    ?.map(
      (news) => `
  <url>
    <loc>${baseUrl}/news/${news.slug}</loc>
    <lastmod>${
      news.updated_at
        ? new Date(news.updated_at).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0]
    }</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
    <news:news>
      <news:publication>
        <news:name>Peptide Playbook</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${
        news.published_at
          ? new Date(news.published_at).toISOString()
          : new Date().toISOString()
      }</news:publication_date>
      <news:title>${escapeXml(news.title)}</news:title>
    </news:news>
  </url>`
    )
    .join("")}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate sitemap" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

// Helper to escape XML special characters
function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}