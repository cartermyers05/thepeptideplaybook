import { Helmet } from "react-helmet-async";
import { SITE_NAME, SITE_URL, getCanonicalUrl } from "@/lib/seo";

interface MedicalWebPageSchemaProps {
  title: string;
  description: string;
  slug: string;
  author: {
    name: string;
    credential?: string;
  };
  publishedAt?: string;
  updatedAt?: string;
  peptideName?: string;
  legalStatus?: string;
  keywords?: string[];
}

export function MedicalWebPageSchema({
  title,
  description,
  slug,
  author,
  publishedAt,
  updatedAt,
  peptideName,
  legalStatus,
  keywords = [],
}: MedicalWebPageSchemaProps) {
  const articleUrl = getCanonicalUrl(`/articles/${slug}`);

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": title,
    "description": description,
    "url": articleUrl,
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "datePublished": publishedAt,
    "dateModified": updatedAt || publishedAt,
    "lastReviewed": updatedAt || publishedAt,
    "author": {
      "@type": "Person",
      "name": author.name,
      ...(author.credential && { "jobTitle": author.credential }),
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME,
      "url": SITE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo.png`,
      },
    },
    "audience": {
      "@type": "MedicalAudience",
      "audienceType": "Patient",
    },
    "medicalAudience": {
      "@type": "MedicalAudience",
      "audienceType": "Patient",
    },
    "keywords": keywords.join(", "),
    "mainContentOfPage": {
      "@type": "WebPageElement",
      "cssSelector": "article",
    },
  };

  // Add Drug schema if peptide-specific
  if (peptideName) {
    schema["about"] = {
      "@type": "Drug",
      "name": peptideName,
      "drugClass": "Peptide",
      ...(legalStatus && { "legalStatus": legalStatus }),
      "description": description,
    };
  }

  // Add speakable for voice search optimization
  schema["speakable"] = {
    "@type": "SpeakableSpecification",
    "cssSelector": [".direct-answer", ".tldr-box", "h1"],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
