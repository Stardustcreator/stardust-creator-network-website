const BASE = process.env.NEXT_PUBLIC_API_URL;

export interface Subscription {
  id: string;
  userId: string;
  billingCycle: 'monthly' | 'annual';
  planId: string;
  currency: string;
  status: 'active' | 'expired' | 'cancelled' | 'past_due' | string;
  currentPeriodEnd: string;
  cancelledAt: string | null;
  cancelledByUser: boolean;
}

export async function getSubscription(): Promise<Subscription | null> {
  const res = await fetch(`${BASE}/subscriptions/me`, {
    credentials: 'include',
  });
  if (res.status === 404 || res.status === 401) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message ?? 'Failed to get subscription.');
  return data as Subscription;
}

export async function getCircleUrl(): Promise<string | null> {
  const res = await fetch(`${BASE}/subscriptions/me/circle-url`, {
    credentials: 'include',
  });
  const data = await res.json().catch(() => ({}));
  if ((data as { statusCode?: number }).statusCode === 404) return null;
  if (!res.ok) throw new Error(data.message ?? 'Failed to get dashboard URL.');
  return (data as { url: string }).url;
}
