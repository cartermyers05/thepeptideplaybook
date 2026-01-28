import { Helmet } from "react-helmet-async";
import { SITE_NAME, SITE_URL, getCanonicalUrl } from "@/lib/seo";

interface ArticleSchemaProps {
  title: string;
  description: string;
  slug: string;
  author: {
    name: string;
    credential?: string;
  };
  publishedAt: string;
  updatedAt?: string;
  image?: string;
}

export function ArticleSchema({
  title,
  description,
  slug,
  author,
  publishedAt,
  updatedAt,
  image,
}: ArticleSchemaProps) {
  const articleUrl = getCanonicalUrl(`/articles/${slug}`);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    author: {
      "@type": "Person",
      name: author.name,
      ...(author.credential && { jobTitle: author.credential }),
    },
    datePublished: publishedAt,
    ...(updatedAt && { dateModified: updatedAt }),
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    ...(image && {
      image: {
        "@type": "ImageObject",
        url: image,
      },
    }),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
