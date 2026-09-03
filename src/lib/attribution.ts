import { extractUTMParams } from '@/lib/brief-payload';

const STORAGE_KEY = 'scn_attribution';

export interface StoredAttribution {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
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
