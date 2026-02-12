const STORAGE_KEY = "pp_tracking";

interface TrackingData {
  landing_page: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  referrer_url: string | null;
  first_visit_at: string | null;
}

/** Run on every page load — captures tracking data only on the FIRST visit */
export function captureTracking(): void {
  try {
    if (localStorage.getItem(STORAGE_KEY)) return; // already captured

    const params = new URLSearchParams(window.location.search);

    const data: TrackingData = {
      landing_page: window.location.pathname,
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign"),
      utm_content: params.get("utm_content"),
      referrer_url: document.referrer || null,
      first_visit_at: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage may be unavailable (private browsing, etc.)
  }
}

/** Read the stored tracking data (returns empty object if none) */
export function getTrackingData(): Partial<TrackingData> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as TrackingData;
  } catch {
    return {};
  }
}

/** Remove tracking data after it's been written to the DB */
export function clearTrackingData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
