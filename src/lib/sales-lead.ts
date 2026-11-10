/**
 * Maps a validated Talk to Sales booking onto the backend POST /sales-leads contract.
 * The backend rejects unknown keys with 400, so only the keys below are ever sent.
 */

export interface SalesLeadSource {
  firstName: string;
  lastName: string;
  company: string;
  website: string;
  email: string;
  phone: string;
  budget?: string;
  topic: string;
  goals?: string;
  slot: Date;
}

export interface SalesLeadPayload {
  firstName: string;
  lastName: string;
  company: string;
  workEmail: string;
  mobilePhone: string;
  discussionTopic: string;
  goal?: string;
  pageSource: string;
  website?: string;
  budget?: string;
  scheduledAt: string;
}

export const SALES_LEAD_PAGE_SOURCE = '/talk-to-sales';

const clip = (value: string, max: number) => value.trim().slice(0, max);

/**
 * The backend accepts /^\+?[\d\s()-]{6,40}$/. Keep digits, spaces, ( ) - and a single
 * leading +; drop everything else (dots, slashes, letters, a "+" anywhere but the start).
 */
export function normalisePhoneForLead(value: string): string {
  const trimmed = value.trim();
  const leadingPlus = trimmed.startsWith('+') ? '+' : '';
  const rest = trimmed
    .replace(/[^\d\s()-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return `${leadingPlus}${rest}`.slice(0, 40);
}

export function buildSalesLeadPayload(source: SalesLeadSource): SalesLeadPayload {
  const payload: SalesLeadPayload = {
    firstName: clip(source.firstName, 100),
    lastName: clip(source.lastName, 100),
    company: clip(source.company, 200),
    workEmail: clip(source.email, 200),
    mobilePhone: normalisePhoneForLead(source.phone),
    discussionTopic: clip(source.topic, 200),
    pageSource: SALES_LEAD_PAGE_SOURCE,
    scheduledAt: source.slot.toISOString(),
  };

  const goal = clip(source.goals ?? '', 5000);
  if (goal) payload.goal = goal;

  const website = clip(source.website, 200);
  if (website) payload.website = website;

  const budget = clip(source.budget ?? '', 40);
  if (budget) payload.budget = budget;

  return payload;
}

const LEAD_TIMEOUT_MS = 4000;

/**
 * Posts the lead to the backend. Never throws: the visitor already has their call booked,
 * so a failed or slow lead post is logged and ignored.
 */
export async function postSalesLead(payload: SalesLeadPayload): Promise<boolean> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');
  if (!apiUrl) {
    console.error('NEXT_PUBLIC_API_URL is not configured; sales lead was not sent.');
    return false;
  }

  try {
    const res = await fetch(`${apiUrl}/sales-leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(LEAD_TIMEOUT_MS),
    });
    if (!res.ok) {
      console.error(`Sales lead post failed with status ${res.status}`);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Sales lead post failed:', error);
    return false;
  }
}
