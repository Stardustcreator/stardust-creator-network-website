/**
 * Device-side "session" for an anonymous brand's website-submitted brief -
 * lets them resume it later (via /brief-status) without an account. Written
 * to both storages the same way persistGoogleAuthSelection does, since a
 * brand may return after the browser session ends.
 */

const GUEST_BRIEF_TOKEN_KEY = 'scn_brief_guest_token';

export interface StoredGuestBriefToken {
  briefId: string;
  guestToken: string;
}

export function persistGuestBriefToken(briefId: string, guestToken: string): void {
  if (typeof window === 'undefined') return;

  try {
    const value = JSON.stringify({ briefId, guestToken });
    localStorage.setItem(GUEST_BRIEF_TOKEN_KEY, value);
    sessionStorage.setItem(GUEST_BRIEF_TOKEN_KEY, value);
  } catch (error) {
    console.error('Failed to persist guest brief token:', error);
  }
}

export function getStoredGuestBriefToken(): StoredGuestBriefToken | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw =
      sessionStorage.getItem(GUEST_BRIEF_TOKEN_KEY) ?? localStorage.getItem(GUEST_BRIEF_TOKEN_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredGuestBriefToken;
  } catch (error) {
    console.error('Failed to read guest brief token:', error);
    return null;
  }
}

export function clearStoredGuestBriefToken(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(GUEST_BRIEF_TOKEN_KEY);
  localStorage.removeItem(GUEST_BRIEF_TOKEN_KEY);
}
