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
  /** Only collected by the standalone /brief page today. */
  creatorCountNeeded?: number;
  creatorGender?: string;
  creatorAgeRange?: string;

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

  /**
   * Explicit path choice, distinct from the count-derived pathTag - only
   * send this if the UI itself asked the brand to pick a path (e.g. a
   * future single-vs-multi selector); omit to let the backend derive the
   * path purely from creatorCountNeeded, as it does today.
   */
  intendedPath?: BriefPathTag;

  // Attribution metadata
  locationDetected?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrerUrl?: string;
}

/** Routing hint derived from creatorCountNeeded (1 = single, 2+ = multi). */
export type BriefPathTag = 'single-creator' | 'multi-creator';

/**
 * Where to send the brand after submission - single-creator goes to the
 * pitch route, multi-creator to the sourcing tail (terms, mobilization
 * invoice, sourcing desk).
 */
export type BriefNextRoute = 'pitch' | 'sourcing-tail';

export interface SubmitBriefResponse {
  message: string;
  briefId: string;
  /**
   * Guest token bound to this brief - the client's only way to resume it
   * later (via resumeBrief) without an account. Persist it (see
   * @/lib/guest-brief-token) immediately; it is never re-issued.
   */
  guestToken: string;
  pathTag: BriefPathTag;
  nextRoute: BriefNextRoute;
  /** Present only for single-creator briefs - a single resolved figure. */
  budget?: number;
  /** Present only for multi-creator briefs - a resolved range. */
  budgetMinKobo?: number | null;
  budgetMaxKobo?: number | null;
}

/**
 * Routes a "Find a Creator" submission into the admin B2B Briefs module
 * (`POST /briefs/find-a-creator` on the backend, unauthenticated). Called
 * server-side from `/api/brand-brief` - this is the sole persistence path
 * for brand brief submissions (Supabase was removed from this flow).
 */
export function submitBrief(payload: SubmitBriefPayload) {
  return post<SubmitBriefResponse>('/briefs/find-a-creator', payload);
}

export interface BriefResumeCommitmentFee {
  status: string;
  amount: number | null;
  paidAt: string | null;
}

export interface BriefResumeResponse {
  id: string;
  brandName: string;
  contactName: string | null;
  contactEmail: string;
  budget: number | null;
  budgetIncomplete: boolean;
  timeline: string | null;
  status: string;
  source: string;
  /** Brand-facing status label, e.g. "Awaiting Payment", "Sourcing Creators". */
  tag: string;
  pathTag: BriefPathTag;
  nextRoute: BriefNextRoute;
  /** Present only for multi-creator briefs - a resolved range. */
  budgetMinKobo?: number | null;
  budgetMaxKobo?: number | null;
  creatorCountNeeded: number | null;
  platforms: string[];
  campaignBrief: string | null;
  commitmentFee: BriefResumeCommitmentFee | null;
  /** Present only when the commitment fee is still unpaid and in range. */
  paymentUrl?: string;
}

/**
 * Resumes a website-submitted brief by its guest token (`POST /briefs/resume`
 * on the backend, unauthenticated) - see
 * AdminBriefsService.resumeByGuestToken. Called server-side from
 * `/api/brief-status`.
 */
export function resumeBrief(token: string) {
  return post<BriefResumeResponse>('/briefs/resume', { token });
}
