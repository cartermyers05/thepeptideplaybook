import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Share2, Bookmark, Clock, Eye, Quote } from "lucide-react";
import { motion } from "framer-motion";

import { SEOHead } from "@/components/seo/SEOHead";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";
import { Breadcrumbs } from "@/components/articles/Breadcrumbs";
import { AuthorSection } from "@/components/articles/AuthorSection";
import { TLDRBox } from "@/components/articles/TLDRBox";
import { ArticleContent } from "@/components/articles/ArticleContent";
import { CitationsSection } from "@/components/articles/CitationsSection";
import { RelatedArticles } from "@/components/articles/RelatedArticles";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import { useArticle, useIncrementPageView } from "@/hooks/useArticles";
import { useTrackCitation } from "@/hooks/useCitations";
import { CONTENT_TYPE_LABELS, estimateReadTime, detectAIEngine, getQueryParam } from "@/lib/seo";
import { toast } from "sonner";

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: article, isLoading, error } = useArticle(slug || "");
  const incrementPageView = useIncrementPageView();
  const trackCitation = useTrackCitation();
  const [hasTrackedView, setHasTrackedView] = useState(false);

  // Track page view and potential AI citation on mount
  useEffect(() => {
    if (article && !hasTrackedView) {
      // Track page view
      incrementPageView.mutate(article.id);
      setHasTrackedView(true);

      // Check for AI citation tracking
      const ref = searchParams.get("ref");
      const aiEngine = ref || detectAIEngine(document.referrer);
      const query = searchParams.get("q") || "";

      if (aiEngine && query) {
        trackCitation.mutate({
          article_id: article.id,
          ai_engine: aiEngine,
          query: query,
          referrer_url: document.referrer || undefined,
        });
      }
    }
  }, [article, hasTrackedView]);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: article?.title,
        text: article?.tldr,
        url: window.location.href,
      });
    } catch {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate("/articles")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Articles
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <Skeleton className="h-6 w-48 mb-6" />
          <Skeleton className="h-32 w-full mb-6" />
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-24 w-full mb-8" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (!article) return null;

  const readTime = estimateReadTime(article.full_content);

  return (
    <>
      {/* SEO Components */}
      <SEOHead
        title={article.title}
        description={article.meta_description || article.tldr}
        article={{
          title: article.title,
          description: article.meta_description || article.tldr,
          slug: article.slug,
          author: {
            name: article.author_name,
            credential: article.author_credential,
          },
          publishedAt: article.published_at || undefined,
          updatedAt: article.updated_at,
          keywords: article.target_keywords,
        }}
      />
      <ArticleSchema
        title={article.title}
        description={article.tldr}
        slug={article.slug}
        author={{
          name: article.author_name,
          credential: article.author_credential,
        }}
        publishedAt={article.published_at || article.created_at}
        updatedAt={article.updated_at}
      />
      {article.structured_answer && article.structured_answer.length > 0 && (
        <FAQSchema faqs={article.structured_answer} />
      )}
      <OrganizationSchema />

      <div className="min-h-screen bg-background">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          {/* Back button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/articles")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Articles
          </Button>

          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { name: "Articles", url: "/articles" },
              { name: article.title, url: `/articles/${article.slug}` },
            ]}
          />

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Author Section */}
            <AuthorSection
              name={article.author_name}
              credential={article.author_credential}
              publishedAt={article.published_at || undefined}
              updatedAt={article.updated_at}
            />

            {/* Article Header */}
            <header className="mt-8 mb-8">
              {/* Content type badge + stats */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <Badge variant="secondary">
                  {CONTENT_TYPE_LABELS[article.content_type] || "Article"}
                </Badge>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{readTime} min read</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    <span>{article.page_views.toLocaleString()} views</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Quote className="w-4 h-4" />
                    <span>{article.citation_count} citations</span>
                  </div>
                </div>
              </div>

              {/* H1 Question Title */}
              <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
                {article.h1_question}
              </h1>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </header>

            {/* TL;DR Box - Direct answer for AI extraction */}
            <TLDRBox content={article.tldr} />

            {/* Main Content */}
            <div className="mt-8">
              <ArticleContent content={article.full_content} />
            </div>

            {/* FAQ Section (if exists) */}
            {article.structured_answer && article.structured_answer.length > 0 && (
              <section className="mt-12 p-6 bg-muted/30 rounded-lg">
                <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {article.structured_answer.map((qa, index) => (
                    <details key={index} className="group">
                      <summary className="cursor-pointer font-medium text-foreground hover:text-primary transition-colors list-none flex items-start gap-2">
                        <span className="text-primary">Q:</span>
                        <span>{qa.question}</span>
                      </summary>
                      <div className="mt-2 pl-6 text-muted-foreground">
                        <span className="text-primary font-medium">A:</span> {qa.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Citations Section */}
            {article.citations && article.citations.length > 0 && (
              <div className="mt-12">
                <CitationsSection citations={article.citations} />
              </div>
            )}

            {/* Related Articles */}
            {article.related_article_ids && article.related_article_ids.length > 0 && (
              <RelatedArticles articleIds={article.related_article_ids} />
            )}
          </motion.article>
        </div>
      </div>
    </>
  );
}
