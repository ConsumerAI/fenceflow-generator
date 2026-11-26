// Lightweight GA4 event helper. The GA4 tag (G-GRJ25LVL9R) is loaded in
// index.html; this only fires events into that existing tag. No new
// accounts, no new trackers. Events are no-ops during prerendering and
// whenever the tag is blocked or absent.
//
// Funnel events (conversion pass, Nov 25, 2026):
// - estimate_calculated: a visitor produced a ballpark in the calculator
// - lead_form_start: a visitor advanced past the estimate step
// - generate_lead: a lead was successfully inserted (GA4 standard name)
// - estimate_bar_tap: a visitor tapped the sticky mobile estimate bar
//   (conversion round 2, Nov 25, 2026)
// - details_accordion_open: a visitor (or a submit attempt missing a
//   required choice) opened the project-details accordion on the final
//   step (conversion round 3, Nov 25, 2026)
// Qualified leads per 100 visitors = generate_lead count / GA4 sessions
// or pageviews for the same page, once GA read access exists. Until then
// the Supabase leads table is the ground truth for submissions.

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: GtagParams) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(eventName: string, params: GtagParams = {}): void {
  if (typeof window === 'undefined') return;
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
  } catch {
    // Analytics must never break the funnel.
  }
}
