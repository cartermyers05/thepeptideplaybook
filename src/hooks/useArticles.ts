import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Article {
  id: string;
  slug: string;
  title: string;
  meta_description: string | null;
  content_type: string;
  tldr: string;
  full_content: string;
  h1_question: string;
  structured_answer: Array<{ question: string; answer: string }>;
  citations: Array<{ source: string; url: string; study_name: string; year: number }>;
  statistics: Array<{ claim: string; percentage: number; sample_size: number; source: string }>;
  author_name: string;
  author_credential: string;
  target_keywords: string[];
  related_article_ids: string[];
  citation_count: number;
  page_views: number;
  status: string;
  published_at: string | null;
  updated_at: string;
  created_at: string;
}

interface ArticlesFilter {
  status?: string;
  content_type?: string;
  limit?: number;
  offset?: number;
}

export function useArticles(filter?: ArticlesFilter) {
  return useQuery({
    queryKey: ["articles", filter],
    queryFn: async () => {
      let query = supabase
        .from("articles")
        .select("*")
        .order("published_at", { ascending: false });

      if (filter?.status) {
        query = query.eq("status", filter.status);
      }
      if (filter?.content_type) {
        query = query.eq("content_type", filter.content_type);
      }
      if (filter?.limit) {
        query = query.limit(filter.limit);
      }
      if (filter?.offset) {
        query = query.range(filter.offset, filter.offset + (filter.limit || 10) - 1);
      }

      const { data, error } = await query;
      if (error) throw error;
      
      // Parse JSON fields properly
      return (data || []).map(article => ({
        ...article,
        structured_answer: article.structured_answer || [],
        citations: article.citations || [],
        statistics: article.statistics || [],
        target_keywords: article.target_keywords || [],
        related_article_ids: article.related_article_ids || [],
      })) as Article[];
    },
  });
}

export function useArticle(slug: string) {
  return useQuery({
    queryKey: ["article", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) throw error;
      
      return {
        ...data,
        structured_answer: data.structured_answer || [],
        citations: data.citations || [],
        statistics: data.statistics || [],
        target_keywords: data.target_keywords || [],
        related_article_ids: data.related_article_ids || [],
      } as Article;
    },
    enabled: !!slug,
  });
}

export function useRelatedArticles(articleIds: string[]) {
  return useQuery({
    queryKey: ["related-articles", articleIds],
    queryFn: async () => {
      if (!articleIds || articleIds.length === 0) return [];
      
      const { data, error } = await supabase
        .from("articles")
        .select("id, slug, title, tldr, author_name, published_at, content_type")
        .in("id", articleIds)
        .eq("status", "published");

      if (error) throw error;
      return data || [];
    },
    enabled: articleIds && articleIds.length > 0,
  });
}

export function useIncrementPageView() {
  return useMutation({
    mutationFn: async (articleId: string) => {
      // Increment page views directly using update
      const { data: article } = await supabase
        .from("articles")
        .select("page_views")
        .eq("id", articleId)
        .single();
      
      if (article) {
        await supabase
          .from("articles")
          .update({ page_views: (article.page_views || 0) + 1 })
          .eq("id", articleId);
      }
    },
  });
}

export function useCreateArticle() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (article: Omit<Partial<Article>, 'id' | 'created_at' | 'updated_at'> & { title: string; slug: string; tldr: string; full_content: string; h1_question: string }) => {
      const { data, error } = await supabase
        .from("articles")
        .insert([{
          ...article,
          structured_answer: article.structured_answer || [],
          citations: article.citations || [],
          statistics: article.statistics || [],
          target_keywords: article.target_keywords || [],
          related_article_ids: article.related_article_ids || [],
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
}

export function useUpdateArticle() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...article }: Partial<Article> & { id: string }) => {
      const { data, error } = await supabase
        .from("articles")
        .update(article)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["article", data.slug] });
    },
  });
}
