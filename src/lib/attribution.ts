import { extractUTMParams } from '@/lib/brief-payload';

const STORAGE_KEY = 'scn_attribution';

export interface StoredAttribution {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  referrerUrl?: string;
}

/** Records first-touch UTM/referrer once per browser session; a no-op on later pages/visits. */
export function captureAttributionOnce(): void {
  if (typeof window === 'undefined') return;
  if (sessionStorage.getItem(STORAGE_KEY)) return;

  const utm = extractUTMParams(window.location.href);
  const attribution: StoredAttribution = {
    utmSource: utm.utm_source,
    utmMedium: utm.utm_medium,
    utmCampaign: utm.utm_campaign,
    utmTerm: utm.utm_term,
    utmContent: utm.utm_content,
    referrerUrl: document.referrer || undefined,
  };

  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
}

export function getStoredAttribution(): StoredAttribution {
  if (typeof window === 'undefined') return {};

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

const FORWARDED_UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const;

/**
 * Some in-app browsers (TikTok's in particular) don't reliably persist
 * sessionStorage across an internal navigation, which silently drops the
 * captureAttributionOnce() write before signup. Re-deriving the query
 * string from the current page and forwarding it onto CTA links removes
 * the dependency on storage surviving that hop at all.
 */
export function buildForwardedUtmQuery(search: string): string {
  const current = new URLSearchParams(search);
  const forwarded = new URLSearchParams();

  for (const key of FORWARDED_UTM_KEYS) {
    const value = current.get(key);
    if (value) forwarded.set(key, value);
  }

  return forwarded.toString();
}
