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

export function initializePayment(billing: BillingPeriod, plan: PaymentPlanId = 'community') {
  return post<{ checkoutUrl: string; reference: string }>('/payments/initialize', {
    planId: PLAN_IDS[plan][billing],
  });
}
