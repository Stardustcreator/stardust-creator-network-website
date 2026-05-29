const BASE = process.env.NEXT_PUBLIC_API_URL;

export interface RateCardQuoteItem {
  name: string;
  qty: number;
  total: number;
}

export interface RateCardQuotePayload {
  email: string;
  items: RateCardQuoteItem[];
  subtotal: number;
  licensing: number;
  discount: number;
  total: number;
}

export interface CommunityRateCardQuotePayload {
  items: RateCardQuoteItem[];
  subtotal: number;
  licensing: number;
  discount: number;
  total: number;
}

export interface CommunitySession {
  email: string;
  firstName: string;
  lastName: string;
}

export type RateCardQuoteError =
  | 'DUPLICATE_EMAIL'
  | 'VALIDATION_ERROR'
  | 'EMAIL_DELIVERY_FAILED'
  | 'SESSION_UNAUTHORIZED'
  | 'SUBSCRIPTION_REQUIRED';

export class RateCardApiError extends Error {
  constructor(
    public readonly code: RateCardQuoteError,
    message: string
  ) {
    super(message);
  }
}

export async function checkRateCardEmail(email: string): Promise<void> {
  const res = await fetch(`${BASE}/rate-card/website/check-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email }),
  });

  if (res.ok) return;

  const data = await res.json().catch(() => ({}));

  if (res.status === 409) {
    throw new RateCardApiError(
      'DUPLICATE_EMAIL',
      'Join the SCN Community for unlimited rate card generations'
    );
  }

  throw new RateCardApiError(
    'VALIDATION_ERROR',
    data.message ?? 'Something went wrong. Please try again.'
  );
}

export async function submitRateCardQuote(payload: RateCardQuotePayload): Promise<void> {
  const res = await fetch(`${BASE}/rate-card/website/quotes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (res.status === 201) return;

  const data = await res.json().catch(() => ({}));

  if (res.status === 400) {
    throw new RateCardApiError(
      'DUPLICATE_EMAIL',
      'This email has already been used to generate a rate card.'
    );
  }

  if (res.status === 500) {
    throw new RateCardApiError('EMAIL_DELIVERY_FAILED', 'Email delivery failed. Please try again.');
  }

  throw new RateCardApiError(
    'EMAIL_DELIVERY_FAILED',
    data.message ?? 'Something went wrong. Please try again.'
  );
}

export async function getCommunitySession(): Promise<CommunitySession> {
  const res = await fetch(`${BASE}/rate-card/community/session`, {
    credentials: 'include',
  });

  if (res.status === 401) {
    throw new RateCardApiError('SESSION_UNAUTHORIZED', 'Please sign in to access this feature.');
  }

  if (res.status === 403) {
    throw new RateCardApiError(
      'SUBSCRIPTION_REQUIRED',
      'An active subscription is required to access this feature.'
    );
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new RateCardApiError(
      'SESSION_UNAUTHORIZED',
      (data as { message?: string }).message ?? 'Something went wrong. Please try again.'
    );
  }

  return res.json() as Promise<CommunitySession>;
}

export async function submitCommunityRateCardQuote(
  payload: CommunityRateCardQuotePayload
): Promise<void> {
  const res = await fetch(`${BASE}/rate-card/community/quotes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  if (res.status === 201) return;

  const data = await res.json().catch(() => ({}));

  if (res.status === 401) {
    throw new RateCardApiError('SESSION_UNAUTHORIZED', 'Please sign in to access this feature.');
  }

  if (res.status === 403) {
    throw new RateCardApiError(
      'SUBSCRIPTION_REQUIRED',
      'An active subscription is required to access this feature.'
    );
  }

  throw new RateCardApiError(
    'EMAIL_DELIVERY_FAILED',
    (data as { message?: string }).message ?? 'Something went wrong. Please try again.'
  );
}
