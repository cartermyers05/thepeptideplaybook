import { Helmet } from "react-helmet-async";
import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  truncate,
  getCanonicalUrl,
  getOgImageUrl,
  type ArticleMeta,
} from "@/lib/seo";

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  article?: ArticleMeta;
  noIndex?: boolean;
  image?: string;
}

export function SEOHead({
  title,
  description,
  canonical,
  article,
  noIndex = false,
  image,
}: SEOHeadProps) {
  const pageTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} - ${SITE_DESCRIPTION}`;

  const pageDescription = truncate(
    description || article?.description || SITE_DESCRIPTION,
    160
  );

  const canonicalUrl = canonical
    ? getCanonicalUrl(canonical)
    : article?.slug
      ? getCanonicalUrl(`/articles/${article.slug}`)
      : undefined;

  const ogImage = image 
    ? (image.startsWith('http') ? image : `${SITE_URL}${image}`)
    : (article?.image 
        ? (article.image.startsWith('http') ? article.image : `${SITE_URL}${article.image}`)
        : `${SITE_URL}/og-image.png`);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:title" content={title || SITE_NAME} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:site_name" content={SITE_NAME} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Article-specific Open Graph */}
      {article && (
        <>
          {article.publishedAt && (
            <meta
              property="article:published_time"
              content={article.publishedAt}
            />
          )}
          {article.updatedAt && (
            <meta property="article:modified_time" content={article.updatedAt} />
          )}
          {article.author && (
            <meta property="article:author" content={article.author.name} />
          )}
          {article.keywords?.map((keyword) => (
            <meta property="article:tag" content={keyword} key={keyword} />
          ))}
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || SITE_NAME} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Author meta for articles */}
      {article?.author && (
        <meta name="author" content={article.author.name} />
      )}

      {/* Keywords */}
      {article?.keywords && article.keywords.length > 0 && (
        <meta name="keywords" content={article.keywords.join(", ")} />
      )}
    </Helmet>
  );
}
