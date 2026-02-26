const STORAGE_KEY = "pp_attribution";

export interface AttributionData {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  referrer: string | null;
  landing_page: string | null;
  captured_at: string;
}

/**
 * Capture attribution data on the FIRST pageview of the session.
 * Uses sessionStorage so it resets per browser session — allowing
 * returning visitors with new UTM params to be re-attributed.
 */
export function captureAttribution(): void {
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return; // already captured this session

    const params = new URLSearchParams(window.location.search);

    const data: AttributionData = {
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign"),
      utm_content: params.get("utm_content"),
      utm_term: params.get("utm_term"),
      referrer: document.referrer || null,
      landing_page: window.location.pathname,
      captured_at: new Date().toISOString(),
    };

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // sessionStorage may be unavailable (private browsing, etc.)
  }
}

/**
 * Read the stored attribution data (returns null if none captured).
 */
export function getAttribution(): AttributionData | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AttributionData;
  } catch {
    return null;
  }
}
