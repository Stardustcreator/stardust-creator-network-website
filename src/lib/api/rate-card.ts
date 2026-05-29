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

export type RateCardQuoteError = 'DUPLICATE_EMAIL' | 'VALIDATION_ERROR' | 'EMAIL_DELIVERY_FAILED';

export class RateCardApiError extends Error {
  constructor(
    public readonly code: RateCardQuoteError,
    message: string
  ) {
    super(message);
  }
}

export async function checkRateCardEmail(email: string): Promise<void> {
  const res = await fetch(`${BASE}/rate-card/check-email`, {
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
  const res = await fetch(`${BASE}/rate-card/quotes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (res.status === 201) return;

  const data = await res.json().catch(() => ({}));

  if (res.status === 409) {
    throw new RateCardApiError(
      'DUPLICATE_EMAIL',
      'This email has already been used to generate a rate card.'
    );
  }

  if (res.status === 400) {
    throw new RateCardApiError(
      'VALIDATION_ERROR',
      data.message ?? 'Invalid email format or request data.'
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
