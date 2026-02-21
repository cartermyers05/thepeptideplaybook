import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { SEOHead } from "@/components/seo/SEOHead";
import { SITE_URL } from "@/lib/seo";

interface GuideLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  slug: string;
  articleSchema: object;
  faqSchema?: object;
}

export function GuideLayout({
  children,
  title,
  description,
  slug,
  articleSchema,
  faqSchema,
}: GuideLayoutProps) {
  const canonicalUrl = `${SITE_URL}/guides/${slug}`;

  // Standardized Article schema
  const standardArticleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    author: {
      "@type": "Organization",
      name: "Peptide Playbook",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Peptide Playbook",
      url: SITE_URL,
    },
    datePublished: "2026-01-15",
    dateModified: "2026-02-20",
    description: description.slice(0, 155),
    mainEntityOfPage: canonicalUrl,
  };

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guides",
        item: `${SITE_URL}/guides`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonical={`/guides/${slug}`}
        article={{
          slug,
          description,
          title,
        }}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(standardArticleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        {faqSchema && (
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        )}
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 pt-20 pb-16">
          <div className="container px-4 max-w-6xl mx-auto">
            {/* Breadcrumbs */}
            <nav className="text-sm text-muted-foreground mb-6">
              <a href="/" className="hover:text-primary transition-colors">
                Home
              </a>
              <span className="mx-2">/</span>
              <a href="/guides" className="hover:text-primary transition-colors">
                Guides
              </a>
              <span className="mx-2">/</span>
              <span className="text-foreground">{title}</span>
            </nav>

            {/* Visible metadata */}
            <div className="mb-6" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '14px', color: '#64748B', marginTop: '8px' }}>
              <p>Last updated: February 2026</p>
              <p>Based on peer-reviewed research · Not medical advice</p>
            </div>

            {children}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
