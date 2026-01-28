import { Helmet } from "react-helmet-async";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { faqs } from "@/components/landing/FAQ";

export function HomepageSchemas() {
  // Product Schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Peptide Playbook",
    description: "The complete research-based guide to understanding peptides, FDA regulations, and how to have informed conversations with your doctor.",
    brand: {
      "@type": "Brand",
      name: "Peptide Playbook",
    },
    offers: {
      "@type": "Offer",
      url: SITE_URL,
      priceCurrency: "USD",
      price: "167",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
    },
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      "https://twitter.com/peptideplaybook",
      "https://instagram.com/peptideplaybook",
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
    </Helmet>
  );
}
