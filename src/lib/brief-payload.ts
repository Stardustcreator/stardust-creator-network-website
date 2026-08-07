/**
 * Shared mapping from the multi-step brief form shape to the flat payload the
 * backend's `POST /briefs/find-a-creator` expects.
 *
 * Lives outside the API route because two callers need it: the standalone
 * `/brief` page (which calls the backend directly from the browser) and
 * `/api/brand-brief` (which still proxies for BrandBriefForm). Keeping one copy
 * means both submit identically.
 */

// Budget buckets are only resolvable to a number for Naira submissions today
// - there's no currency field on the admin Brief record, so a GBP bucket
// (or any non-Nigeria country) is left unresolved rather than guessing an
// exchange rate. Closed buckets use the midpoint of their two bounds; the
// one open-ended bucket ("₦10M+") has no upper bound to average, so it uses
// its stated floor as a conservative estimate.
//
// Two entries per bucket because BrandBriefForm and the standalone /brief
// page format the same ranges slightly differently (en dash vs hyphen with
// spaces) and both submit through this mapping.
export const NGN_BUDGET_TO_KOBO: Record<string, number> = {
  '₦2.5M–₦5M': 375_000_000, // midpoint ₦3.75M
  '₦2.5M - ₦5M': 375_000_000,
  '₦5M–₦10M': 750_000_000, // midpoint ₦7.5M
  '₦5M - ₦10M': 750_000_000,
  '₦10M+': 1_000_000_000, // floor: ₦10M
};

export function resolveBudgetKobo(
  country: string | undefined,
  estimatedBudget: string | undefined
): number | undefined {
  if (country !== 'Nigeria' || !estimatedBudget) return undefined;
  return NGN_BUDGET_TO_KOBO[estimatedBudget];
}

// The admin Brief record has one legacy free-text `timeline` field (kept
// alongside the structured campaignStartDate/campaignDuration fields for
// backward compatibility with older admin views).
export function synthesizeTimeline(data: {
  campaignStartDate?: string;
  campaignDuration?: string;
}): string {
  return `Starts ${data.campaignStartDate ?? 'TBD'} · ${data.campaignDuration ?? 'TBD'}`;
}

// The admin Brief record has one legacy free-text `campaignBrief` field
// (kept alongside the structured fields for the same reason).
export function synthesizeCampaignBrief(
  campaignObjectives: { campaignName?: string; campaignGoals?: string[] },
  creatorPreferences: { brandCreatorFit?: string },
  additionalInformation: { additionalNotes?: string }
): string {
  return [
    `Campaign: ${campaignObjectives.campaignName ?? 'Untitled'}`,
    `Goals: ${(campaignObjectives.campaignGoals ?? []).join(', ')}`,
    creatorPreferences.brandCreatorFit && `Creator fit: ${creatorPreferences.brandCreatorFit}`,
    additionalInformation.additionalNotes && `Notes: ${additionalInformation.additionalNotes}`,
  ]
    .filter(Boolean)
    .join('\n');
}

/** Reads utm_* params off a URL. Returns an empty object for anything unparseable. */
export function extractUTMParams(url: string | null | undefined): {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
} {
  if (!url) return {};

  try {
    const urlObj = new URL(url);
    return {
      utm_source: urlObj.searchParams.get('utm_source') || undefined,
      utm_medium: urlObj.searchParams.get('utm_medium') || undefined,
      utm_campaign: urlObj.searchParams.get('utm_campaign') || undefined,
    };
  } catch {
    return {};
  }
}
