/**
 * Sanitizes scraped news content by removing boilerplate, tracking URLs,
 * base64 images, and other unwanted artifacts from web scraping.
 */
export function sanitizeNewsContent(content: string): string {
  if (!content) return '';

  let cleaned = content
    // Yahoo Finance error messages
    .replace(/^Oops,?\s*something went wrong\.?\s*$/gim, '')
    
    // Paid press release notices
    .replace(/This is a paid press release\.?\s*Contact the press release distributor directly with any inquiries\.?/gi, '')
    
    // Markets live blog banners
    .replace(/\[\*\*MARKETS LIVE BLOG\*\*[^\]]*\]\([^)]+\)/gi, '')
    
    // Remove skip navigation links (including right column)
    .replace(/\[Skip to [^\]]+\]\([^)]+\)/gi, '')
    .replace(/Skip to [^\n]+\n/gi, '')
    
    // Yahoo image CDN links
    .replace(/!\[[^\]]*\]\(https?:\/\/[^)]*yimg\.com[^)]*\)/g, '')
    
    // Linked images (nested markdown)
    .replace(/\[!\[[^\]]*\]\([^)]+\)\]\([^)]+\)/g, '')
    
    // Dateline headers (e.g., "Fri, January 23, 2026 at 7:50 PM EST7 min read")
    .replace(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s*[A-Z][a-z]+\s+\d{1,2},\s*\d{4}\s+at\s+\d{1,2}:\d{2}\s*(AM|PM)\s*[A-Z]{3,4}\d*\s*min read\s*$/gim, '')
    
    // Remove base64 images and placeholder references
    .replace(/!\[[^\]]*\]\(<Base64-Image-Removed>\)/g, '')
    .replace(/!\[[^\]]*\]\(data:image[^)]+\)/g, '')
    .replace(/<Base64-Image-Removed>/g, '')
    
    // Remove "Story Continues" and similar boilerplate
    .replace(/^Story Continues$/gm, '')
    .replace(/^Advertisement$/gm, '')
    .replace(/^ADVERTISEMENT$/gm, '')
    .replace(/^Recommended Videos$/gm, '')
    .replace(/^Related Articles$/gm, '')
    .replace(/^Read More$/gm, '')
    .replace(/^Continue Reading$/gm, '')
    
    // Remove press release headers (common patterns)
    .replace(/^.*ACCESS Newswire.*$/gm, '')
    .replace(/^.*GLOBE NEWSWIRE.*$/gm, '')
    .replace(/^.*PR Newswire.*$/gm, '')
    .replace(/^.*Business Wire.*$/gm, '')
    .replace(/^[A-Z]+,\s*[A-Z]{2}\s*\/\s*[A-Za-z\s]+\s*\/\s*[A-Za-z]+\s+\d{1,2},\s*\d{4}\s*\/$/gm, '')
    
    // Remove tracking URLs but keep display text
    .replace(/\[([^\]]+)\]\(https?:\/\/[^\)]*(?:tracker|tracking|click|redirect)[^\)]*\)/gi, '$1')
    .replace(/\[([^\]]+)\]\(https:\/\/www\.globenewswire\.com\/Tracker[^)]+\)/g, '$1')
    
    // Remove empty markdown links
    .replace(/\[\s*\]\([^)]*\)/g, '')
    .replace(/\[[^\]]*\]\(\s*\)/g, '')
    
    // Remove image captions that are just URLs
    .replace(/^\s*https?:\/\/[^\s]+\s*$/gm, '')
    
    // Remove social share buttons text
    .replace(/Share this article/gi, '')
    .replace(/Share on (Facebook|Twitter|LinkedIn|Email)/gi, '')
    
    // Remove cookie/consent notices
    .replace(/We use cookies[^.]+\./gi, '')
    .replace(/Accept (all )?cookies/gi, '')
    
    // Remove footer boilerplate patterns
    .replace(/^(©|\(c\)|Copyright)\s*\d{4}.*$/gm, '')
    .replace(/All rights reserved\.?/gi, '')
    
    // Clean up markdown formatting issues
    .replace(/\*\*\s*\*\*/g, '') // Empty bold
    .replace(/__\s*__/g, '') // Empty underline
    .replace(/\[\s*\]/g, '') // Empty brackets
    
    // Remove lines that are just dashes or equals (often separators)
    .replace(/^[-=]{5,}$/gm, '')
    
    // Clean up excessive whitespace
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+$/gm, '') // Trailing spaces
    .replace(/^[ \t]+/gm, '') // Leading spaces on lines
    
    // Remove lines that start with common navigation items
    .replace(/^(Home|Menu|Search|Login|Sign [Ii]n|Subscribe)\s*$/gm, '')
    .replace(/^(Previous|Next)\s*(Article|Post|Story)?\s*$/gm, '')
    
    // Remove standalone source names
    .replace(/^(Direct Meds|GlobeNewswire|Yahoo Finance|Reuters|AP News|ACCESS Newswire)\s*$/gim, '');

  return cleaned.trim();
}

/**
 * Extracts key points from a summary for bullet-point display.
 * Splits on sentence boundaries or existing bullet points.
 */
export function extractKeyPoints(summary: string): string[] {
  if (!summary) return [];
  
  // First, sanitize the summary
  const cleaned = sanitizeNewsContent(summary);
  
  // Check if already has bullet points
  if (cleaned.includes('•') || cleaned.includes('-')) {
    return cleaned
      .split(/[•\-]\s*/)
      .map(point => point.trim())
      .filter(point => point.length > 10);
  }
  
  // Split by sentences and take the most informative ones
  const sentences = cleaned
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 20 && s.length < 300);
  
  // Return up to 4 key points
  return sentences.slice(0, 4);
}
