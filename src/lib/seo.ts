// SEO utilities and constants

export const SITE_NAME = "Peptide Playbook AI";
export const SITE_URL = "https://peptideplaybook.com";
export const SITE_DESCRIPTION = "Stop taking peptide advice from TikTok. Get the research-based guide covering BPC-157, semaglutide, TB-500 and more. Know what's FDA-approved, what's experimental, and what to ask your doctor.";
export const DEFAULT_AUTHOR = {
  name: "Peptide Playbook",
  credential: "Research-based peptide education",
};

export interface ArticleMeta {
  title: string;
  description: string;
  slug: string;
  author?: {
    name: string;
    credential?: string;
  };
  publishedAt?: string;
  updatedAt?: string;
  image?: string;
  keywords?: string[];
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Truncates text to a maximum length, adding ellipsis if needed
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3).trim() + "...";
}

/**
 * Generates a canonical URL for a given path
 */
export function getCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}

/**
 * Formats a date for display in article metadata
 */
export function formatArticleDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Generates Open Graph image URL (can be replaced with dynamic OG image generator)
 */
export function getOgImageUrl(title: string, slug?: string): string {
  // For now, return a default OG image
  // Later this can be replaced with a dynamic image generator edge function
  return `${SITE_URL}/og-image.png`;
}

/**
 * Extracts AI engine from referrer URL
 */
export function detectAIEngine(referrer: string): string | null {
  const engines: Record<string, string[]> = {
    chatgpt: ["chat.openai.com", "chatgpt.com"],
    perplexity: ["perplexity.ai"],
    claude: ["claude.ai", "anthropic.com"],
    gemini: ["gemini.google.com", "bard.google.com"],
  };

  for (const [engine, domains] of Object.entries(engines)) {
    if (domains.some((domain) => referrer.includes(domain))) {
      return engine;
    }
  }
  return null;
}

/**
 * Extracts query parameter from URL
 */
export function getQueryParam(url: string, param: string): string | null {
  try {
    const urlObj = new URL(url);
    return urlObj.searchParams.get(param);
  } catch {
    return null;
  }
}

/**
 * Content type labels for display
 */
export const CONTENT_TYPE_LABELS: Record<string, string> = {
  "citation-magnet": "Research Overview",
  "question-answer": "Q&A",
  comparison: "Comparison",
  guide: "Guide",
  pillar: "Complete Guide",
};

/**
 * Estimates reading time for content
 */
export function estimateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
