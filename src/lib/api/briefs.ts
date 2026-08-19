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
  /** Per-platform tier selections, e.g. `[{ platform: 'Instagram', tiers: ['Micro'] }]`. */
  preferredTiers?: Array<{ platform: string; tiers: string[] }>;
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
  /** Brand-facing brief id, e.g. `SCN-2025-0847` - present once the backend assigns one. */
  reference?: string;
  /** Where the confirmation email was sent, if different from the submitted email. */
  contactEmail?: string;
  /** Present when the brief resolves immediately to a mobilization fee. */
  pricing?: BriefPricing;
}

/**
 * Mobilization pricing for a brief. All money fields are in kobo, and the
 * `Kobo` suffixes match the backend's field names exactly - don't rename them
 * to friendlier labels, or every amount silently renders as ₦0 (formatNaira
 * turns `undefined` into ₦0 rather than throwing).
 *
 * `totalDueNowKobo` equals `sourcingFeeKobo`.
 */
export interface BriefPricing {
  requestedCreators?: number;
  sourcingFeeKobo?: number;
  totalDueNowKobo?: number;
}

/**
 * Routes a "Find a Creator" submission into the admin B2B Briefs module
 * (`POST /briefs/find-a-creator` on the backend, unauthenticated) - the sole
 * persistence path for brand brief submissions (Supabase was removed from this
 * flow). Called from the browser by `/brief`, and server-side by
 * `/api/brand-brief` for BrandBriefForm.
 *
 * The backend rejects unknown properties, so callers must send this flat shape
 * rather than the grouped form state - see `@/lib/brief-payload` for the
 * mapping helpers both callers share.
 *
 * Everything beyond `message` is optional: a backend that doesn't yet return
 * a reference / pricing leaves the brand on the inline success step instead of
 * the payment page.
 */
export function submitBrief(payload: SubmitBriefPayload) {
  return post<SubmitBriefResponse>('/briefs/find-a-creator', payload);
}

export interface BriefResumeCommitmentFee {
  status: string;
  amount: number | null;
  paidAt: string | null;
  /** Transaction reference for the settled fee, shown on the paid receipt. */
  paymentReference?: string | null;
}

export interface BriefResumeResponse {
  id: string;
  /** Brand-facing brief id, e.g. `SCN-2025-0847`. */
  reference?: string;
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
  /** Raw budget bucket text, e.g. '₦5M–₦10M'. */
  budgetRange?: string | null;
  paymentModel?: string | null;
  ongoingCollaboration?: string | null;
  campaignName?: string | null;
  creatorCountNeeded: number | null;
  platforms: string[];
  campaignBrief: string | null;
  commitmentFee: BriefResumeCommitmentFee | null;
  /** Live pricing breakdown - the source of truth for `/brief/payment`. */
  pricing?: BriefPricing;
  submittedDate?: string;
  /**
   * Historically carried a hosted payment link. The current backend does not
   * return one from resume (payment is initialized through `payBrief`), so
   * treat this as legacy and optional.
   */
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

/**
 * Independently asks Paystack to verify the brief's payment (`POST
 * /briefs/find-a-creator/verify-payment`, unauthenticated) instead of
 * waiting on our own async webhook - call this right after the inline
 * checkout SDK reports success. Same response shape as `resumeBrief`; the
 * backend races this against the webhook, so whichever confirms first wins.
 */
export function verifyBriefPayment(token: string) {
  return post<BriefResumeResponse>('/briefs/find-a-creator/verify-payment', { token });
}

/**
 * A discount code previewed against a brief's mobilization pricing. Narrower
 * than the subscription `DiscountPreview` in `auth.ts` - the brief-scoped
 * endpoint carries no planId/planName/currency, because the "plan" is the
 * brief itself. Amounts are server-computed kobo, never derived client-side.
 */
export interface BriefDiscountPreview {
  discountCodeId: string;
  code: string;
  discountType: string;
  discountValue: number;
  originalAmount: number;
  discountAmount: number;
  finalAmount: number;
}

/**
 * Previews a discount code against a brief's current pricing before payment
 * (`POST /briefs/find-a-creator/discount-preview`, unauthenticated - scoped by
 * guest token rather than a plan id). Called from the browser by
 * `/brief/payment`.
 */
export function previewBriefDiscount(token: string, discountCode: string) {
  return post<BriefDiscountPreview>('/briefs/find-a-creator/discount-preview', {
    token,
    discountCode,
  });
}

export interface PayBriefPayload {
  token: string;
  payerFirstName: string;
  payerLastName: string;
  payerEmail: string;
  discountCode?: string;
}

export interface PayBriefResponse {
  /**
   * Paystack checkout URL. Absent when the fee settles server-side with
   * nothing to collect (e.g. a 100%-off code), in which case re-read the
   * brief's state with `resumeBrief` instead of opening a checkout.
   */
  paymentUrl?: string;
}

/**
 * Collects payer details and initializes the Paystack checkout for a brief's
 * commitment fee (`POST /briefs/find-a-creator/pay`, unauthenticated). Called
 * from the browser by `/brief/payment`.
 */
export function payBrief(payload: PayBriefPayload) {
  return post<PayBriefResponse>('/briefs/find-a-creator/pay', payload);
}
