import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { SEOHead } from "@/components/seo/SEOHead";
import { SITE_URL } from "@/lib/seo";

interface ToolLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  slug: string;
  toolSchema?: object;
  howToSchema?: object;
}

export function ToolLayout({
  children,
  title,
  description,
  slug,
  toolSchema,
  howToSchema,
}: ToolLayoutProps) {
  const canonicalUrl = `${SITE_URL}/tools/${slug}`;

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
        name: "Tools",
        item: `${SITE_URL}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: canonicalUrl,
      },
    ],
  };

  // SoftwareApplication schema for the tool
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: title,
    description,
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: canonicalUrl,
  };

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonical={`/tools/${slug}`}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(softwareSchema)}</script>
        {toolSchema && (
          <script type="application/ld+json">{JSON.stringify(toolSchema)}</script>
        )}
        {howToSchema && (
          <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
        )}
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 pt-20 pb-16">
          <div className="container px-4 max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <nav className="text-sm text-muted-foreground mb-6">
              <a href="/" className="hover:text-primary transition-colors">
                Home
              </a>
              <span className="mx-2">/</span>
              <a href="/tools" className="hover:text-primary transition-colors">
                Tools
              </a>
              <span className="mx-2">/</span>
              <span className="text-foreground">{title}</span>
            </nav>

            {children}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
