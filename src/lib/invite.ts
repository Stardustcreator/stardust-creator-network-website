import { getScnDashboardUrl } from '@/lib/scn-dashboard';

const STORAGE_KEY = 'scn:creator-invite';
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export interface CreatorInvite {
  invite: string;
}

function asUuid(value: string | null | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed && UUID_PATTERN.test(trimmed) ? trimmed : undefined;
}

/** Reads `invite` from untrusted query params. Returns null unless it is a UUID. */
export function parseCreatorInvite(params: URLSearchParams): CreatorInvite | null {
  const invite = asUuid(params.get('invite'));
  if (!invite) return null;
  return { invite };
}

// sessionStorage carries the invite across the multi-step onboarding and the
// payment round-trip, which drop query params. It can be unavailable, so every
// access is guarded and the flow works without it.
export function saveCreatorInvite(value: CreatorInvite): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Storage blocked: the creator just lands on the normal dashboard.
  }
}

export function getStoredInviteId(): string | undefined {
  return readCreatorInvite()?.invite;
}

function readCreatorInvite(): CreatorInvite | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CreatorInvite>;
    const invite = asUuid(parsed.invite);
    return invite ? { invite } : null;
  } catch {
    return null;
  }
}

/**
 * Where a creator goes after sign-up or login: the invited opportunity in
 * Creator OS when a valid invitation id was carried through, otherwise the
 * normal landing. Creator OS opens opportunities by invitation id. The id is
 * only ever used to build the Creator OS path.
 */
export function getCreatorLandingUrl(): string {
  const base = getScnDashboardUrl();
  const invite = getStoredInviteId();
  return invite ? `${base}/opportunities/${invite}` : base;
}
