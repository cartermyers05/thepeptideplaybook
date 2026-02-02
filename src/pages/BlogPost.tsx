import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { SEOHead } from "@/components/seo/SEOHead";
import { Breadcrumbs } from "@/components/articles/Breadcrumbs";
import { TLDRBox } from "@/components/articles/TLDRBox";
import { ArticleContent } from "@/components/articles/ArticleContent";
import { AuthorSection } from "@/components/articles/AuthorSection";
import { CitationsSection } from "@/components/articles/CitationsSection";
import { RelatedArticles } from "@/components/articles/RelatedArticles";
import { PrimarySources } from "@/components/articles/PrimarySources";
import { WhatWeDontKnow } from "@/components/articles/WhatWeDontKnow";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { BlogCTA } from "@/components/blog/BlogCTA";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { KeyTakeaways } from "@/components/blog/KeyTakeaways";
import { useArticle } from "@/hooks/useArticles";
import { formatArticleDate, estimateReadTime, DEFAULT_AUTHOR } from "@/lib/seo";
import { Calendar, Clock, RefreshCw } from "lucide-react";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading, error } = useArticle(slug || "");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto animate-pulse">
              <div className="h-4 bg-muted rounded w-1/4 mb-4" />
              <div className="h-10 bg-muted rounded w-3/4 mb-4" />
              <div className="h-6 bg-muted rounded w-full mb-8" />
              <div className="space-y-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-4 bg-muted rounded w-full" />
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl font-semibold mb-4">Article Not Found</h1>
              <p className="text-muted-foreground">The article you're looking for doesn't exist.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: article.title, url: `/blog/${article.slug}` },
  ];

  const authorName = article.author_name || DEFAULT_AUTHOR.name;
  const authorCredential = article.author_credential || DEFAULT_AUTHOR.credential;
  const readTime = estimateReadTime(article.full_content);

  // Extract key takeaways from structured_answer if available
  const keyTakeaways = article.structured_answer && 
    typeof article.structured_answer === 'object' && 
    'key_takeaways' in article.structured_answer
      ? (article.structured_answer as { key_takeaways?: string[] }).key_takeaways
      : undefined;

  // Parse citations
  const citations = article.citations as Array<{ source: string; url: string; study_name: string; year: number }> | null;
  const hasCitations = citations && citations.length > 0;

  // Determine topic for primary sources based on article content
  const getPeptideTopic = (): "bpc-157" | "tb-500" | "semaglutide" | "tirzepatide" | "general" => {
    const title = article.title.toLowerCase();
    if (title.includes("bpc-157") || title.includes("bpc 157")) return "bpc-157";
    if (title.includes("tb-500") || title.includes("tb 500") || title.includes("thymosin")) return "tb-500";
    if (title.includes("semaglutide") || title.includes("ozempic") || title.includes("wegovy")) return "semaglutide";
    if (title.includes("tirzepatide") || title.includes("mounjaro") || title.includes("zepbound")) return "tirzepatide";
    return "general";
  };

  // Build evidence-aware TLDR prefix
  const getEvidencePrefix = (): string => {
    const topic = getPeptideTopic();
    if (topic === "semaglutide" || topic === "tirzepatide") {
      return "Based on FDA-approved clinical trial data: ";
    }
    return "Based on animal and lab studies (no human clinical trials exist): ";
  };

  return (
    <>
      <SEOHead
        title={article.h1_question}
        description={article.meta_description || article.tldr}
        canonical={`/blog/${article.slug}`}
        article={{
          title: article.h1_question,
          description: article.tldr,
          slug: article.slug,
          author: { name: authorName, credential: authorCredential },
          publishedAt: article.published_at || undefined,
          updatedAt: article.updated_at || undefined,
          keywords: article.target_keywords || undefined,
        }}
      />
      <ArticleSchema
        title={article.h1_question}
        description={article.tldr}
        author={{ name: authorName, credential: authorCredential }}
        publishedAt={article.published_at || new Date().toISOString()}
        updatedAt={article.updated_at || undefined}
        slug={article.slug}
      />
      <BreadcrumbSchema items={breadcrumbs} />

      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-24 pb-16">
          <article className="container px-4">
            <div className="max-w-3xl mx-auto">
              {/* Breadcrumbs */}
              <Breadcrumbs items={breadcrumbs} />

              {/* Header */}
              <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                  {article.h1_question}
                </h1>

                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                  {article.published_at && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Published {formatArticleDate(article.published_at)}</span>
                    </div>
                  )}
                  {article.updated_at && (
                    <div className="flex items-center gap-1">
                      <RefreshCw className="w-4 h-4" />
                      <span>Updated {formatArticleDate(article.updated_at)}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{readTime} min read</span>
                  </div>
                </div>
              </motion.header>

              {/* Key Takeaways */}
              {keyTakeaways && keyTakeaways.length > 0 && (
                <KeyTakeaways takeaways={keyTakeaways} />
              )}

              {/* TL;DR with evidence prefix */}
              <TLDRBox content={`${getEvidencePrefix()}${article.tldr}`} />

              {/* Table of Contents */}
              <TableOfContents content={article.full_content} />

              {/* Main content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <ArticleContent content={article.full_content} />
              </motion.div>

              {/* What We Don't Know Section */}
              <WhatWeDontKnow variant="research-peptide" />

              {/* Primary Sources Section - fallback if no citations */}
              {!hasCitations && (
                <PrimarySources topic={getPeptideTopic()} />
              )}

              {/* Citations */}
              {hasCitations && (
                <CitationsSection citations={citations} />
              )}

              {/* Blog CTA */}
              <BlogCTA />

              {/* Author */}
              <AuthorSection 
                name={authorName} 
                credential={authorCredential}
                publishedAt={article.published_at || undefined}
                updatedAt={article.updated_at || undefined}
              />

              {/* Related Articles */}
              {article.related_article_ids && article.related_article_ids.length > 0 && (
                <RelatedArticles articleIds={article.related_article_ids} />
              )}
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}
