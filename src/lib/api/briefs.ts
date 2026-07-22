const BASE = process.env.NEXT_PUBLIC_API_URL;

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message ?? 'Something went wrong. Please try again.');
  }

  return data as T;
}

export interface SubmitBriefPayload {
  brandName: string;
  contactEmail: string;
  contactName?: string;
  /** Budget in kobo; omit when it can't be resolved to a number. */
  budget?: number;
  timeline?: string;
  campaignBrief?: string;

  // Step 1: Brand / Company Information
  companyWebsite?: string;
  country?: string;
  industry?: string;
  typeOfBusiness?: string;
  contactPhone?: string;
  marketingOptIn?: boolean;

  // Step 2: Campaign Objectives
  campaignName?: string;
  campaignGoals?: string[];
  campaignType?: string;
  targetAudiences?: string[];
  targetMarkets?: string[];

  // Step 3: Creator Preferences
  preferredCreatorTier?: string;
  contentCategories?: string[];
  platforms?: string[];
  brandCreatorFit?: string;

  // Step 4: Budget & Payment Preference
  /** Raw budget bucket text, e.g. '₦5M–₦10M'. */
  budgetRange?: string;
  paymentModel?: string;
  ongoingCollaboration?: string;

  // Step 5: Timeline & Deliverables
  campaignStartDate?: string;
  campaignDuration?: string;
  deliverables?: string[];

  // Step 6: Additional Information
  howHeard?: string;
  collaborationType?: string;
  communityInterest?: string;
  additionalNotes?: string;

  // Step 7: Agreement & Submission
  authorizationConfirmed?: boolean;
  termsAgreed?: boolean;

  // Attribution metadata
  locationDetected?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrerUrl?: string;
}

/**
 * Routes a "Find a Creator" submission into the admin B2B Briefs module
 * (`POST /briefs/find-a-creator` on the backend, unauthenticated). Called
 * server-side from `/api/brand-brief` - this is the sole persistence path
 * for brand brief submissions (Supabase was removed from this flow).
 */
export function submitBrief(payload: SubmitBriefPayload) {
  return post<{ message: string }>('/briefs/find-a-creator', payload);
}
