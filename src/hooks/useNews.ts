import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  full_content: string;
  category: "research" | "clinical" | "regulatory" | "industry";
  source_name: string;
  source_url: string | null;
  featured: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

interface UseNewsArticlesOptions {
  category?: NewsArticle["category"];
  limit?: number;
}

export function useNewsArticles(options: UseNewsArticlesOptions = {}) {
  const { category, limit } = options;

  return useQuery({
    queryKey: ["news-articles", category, limit],
    queryFn: async () => {
      let query = supabase
        .from("news_articles")
        .select("*")
        .order("published_at", { ascending: false });

      if (category) {
        query = query.eq("category", category);
      }

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as NewsArticle[];
    },
  });
}

export function useNewsArticle(slug: string) {
  return useQuery({
    queryKey: ["news-article", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news_articles")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) throw error;
      return data as NewsArticle;
    },
    enabled: !!slug,
  });
}

export function useRelatedNews(currentSlug: string, category: NewsArticle["category"], limit = 3) {
  return useQuery({
    queryKey: ["related-news", currentSlug, category, limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news_articles")
        .select("*")
        .eq("category", category)
        .neq("slug", currentSlug)
        .order("published_at", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as NewsArticle[];
    },
    enabled: !!currentSlug && !!category,
  });
}
