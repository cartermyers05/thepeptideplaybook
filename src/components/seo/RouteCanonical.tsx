import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SITE_URL } from "@/lib/seo";

export function RouteCanonical() {
  const location = useLocation();
  const canonicalUrl = `${SITE_URL}${location.pathname}`;
  
  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
}
