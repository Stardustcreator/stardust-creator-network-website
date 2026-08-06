import { DiscountPreview } from './auth';

const BASE = process.env.NEXT_PUBLIC_API_URL;

type BillingPeriod = 'annual' | 'monthly';
type PaymentPlanId = 'community' | 'starter' | 'builder';

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message ?? 'Something went wrong. Please try again.');
  }

  return data as T;
}

const PLAN_IDS: Record<PaymentPlanId, Record<BillingPeriod, string>> = {
  community: {
    annual: 'community_annual',
    monthly: 'community_monthly',
  },
  starter: {
    annual: 'starter_annual',
    monthly: 'starter_monthly',
  },
  builder: {
    annual: 'builder_annual',
    monthly: 'builder_monthly',
  },
};

export interface InitializePaymentResult {
  requiresPayment?: boolean;
  checkoutUrl?: string;
  reference?: string;
  message?: string;
}

export function initializePayment(
  billing: BillingPeriod,
  plan: PaymentPlanId = 'community',
  discountCode?: string
) {
  return post<InitializePaymentResult>('/payments/initialize', {
    planId: PLAN_IDS[plan][billing],
    ...(discountCode ? { discountCode } : {}),
  });
}

/**
 * Start a mobilization payment for a brand brief. Unlike `initializePayment`
 * this is keyed by the brief's reference rather than a subscription plan id,
 * because the brand isn't signed in - they arrive from `/brief` or an emailed
 * payment link.
 */
export function initializeBriefPayment(briefReference: string, discountCode?: string) {
  return post<InitializePaymentResult>('/payments/brief/initialize', {
    briefReference,
    ...(discountCode ? { discountCode } : {}),
  });
}

/**
 * Validate a discount code against a plan before checkout. Amounts come back
 * server-computed in kobo, so totals are never derived on the client.
 */
export function previewDiscount(planId: string, discountCode: string) {
  return post<DiscountPreview>('/payments/discount-preview', {
    planId,
    discountCode,
  });
}

export type { DiscountPreview };
