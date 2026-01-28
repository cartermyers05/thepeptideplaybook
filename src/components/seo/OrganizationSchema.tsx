import { Helmet } from "react-helmet-async";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/seo";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`,
    },
    sameAs: [
      // Add social media URLs here when available
      // "https://twitter.com/peptidegpt",
      // "https://linkedin.com/company/peptidegpt",
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
