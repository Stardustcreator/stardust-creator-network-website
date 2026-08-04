import { NextRequest, NextResponse } from 'next/server';
import {
  apiBrandBriefSchema,
  type ApiBrandBriefInput,
} from '@/lib/validations/brand-brief.validations';
import { submitBrief } from '@/lib/api/briefs';

// Budget buckets are only resolvable to a number for Naira submissions today
// - there's no currency field on the admin Brief record, so a GBP bucket
// (or any non-Nigeria country) is left unresolved rather than guessing an
// exchange rate. Closed buckets use the midpoint of their two bounds; the
// one open-ended bucket ("₦10M+") has no upper bound to average, so it uses
// its stated floor as a conservative estimate.
//
// Two entries per bucket because BrandBriefForm and the standalone /brief
// page format the same ranges slightly differently (en dash vs hyphen with
// spaces) and both submit through this endpoint.
const NGN_BUDGET_TO_KOBO: Record<string, number> = {
  '₦2.5M–₦5M': 375_000_000, // midpoint ₦3.75M
  '₦2.5M - ₦5M': 375_000_000,
  '₦5M–₦10M': 750_000_000, // midpoint ₦7.5M
  '₦5M - ₦10M': 750_000_000,
  '₦10M+': 1_000_000_000, // floor: ₦10M
};

function resolveBudgetKobo(
  country: string | undefined,
  estimatedBudget: string | undefined
): number | undefined {
  if (country !== 'Nigeria' || !estimatedBudget) return undefined;
  return NGN_BUDGET_TO_KOBO[estimatedBudget];
}

// The admin Brief record has one legacy free-text `timeline` field (kept
// alongside the structured campaignStartDate/campaignDuration fields for
// backward compatibility with older admin views).
function synthesizeTimeline(data: ApiBrandBriefInput['timelineDeliverables']): string {
  return `Starts ${data.campaignStartDate ?? 'TBD'} · ${data.campaignDuration ?? 'TBD'}`;
}

// The admin Brief record has one legacy free-text `campaignBrief` field
// (kept alongside the structured fields below for the same reason).
function synthesizeCampaignBrief(
  campaignObjectives: ApiBrandBriefInput['campaignObjectives'],
  creatorPreferences: ApiBrandBriefInput['creatorPreferences'],
  additionalInformation: ApiBrandBriefInput['additionalInformation']
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

// Helper function to extract UTM parameters from referrer
function extractUTMParams(url: string | null): {
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = apiBrandBriefSchema.parse(body);

    const referrer = request.headers.get('referer') || undefined;
    const utmParams = extractUTMParams(referrer || null);

    const { brandCompanyInformation, campaignObjectives, creatorPreferences } = validatedData;
    const { budgetPaymentPreference, timelineDeliverables, additionalInformation } = validatedData;
    const { agreementSubmission } = validatedData;

    const result = await submitBrief({
      brandName: brandCompanyInformation.brandName,
      contactEmail: brandCompanyInformation.email,
      contactName: brandCompanyInformation.contactPerson,
      budget: resolveBudgetKobo(
        brandCompanyInformation.country,
        budgetPaymentPreference.estimatedBudget
      ),
      timeline: synthesizeTimeline(timelineDeliverables),
      campaignBrief: synthesizeCampaignBrief(
        campaignObjectives,
        creatorPreferences,
        additionalInformation
      ),

      companyWebsite: brandCompanyInformation.companyWebsite,
      country: brandCompanyInformation.country,
      industry: brandCompanyInformation.industry,
      typeOfBusiness: brandCompanyInformation.businessType,
      contactPhone: brandCompanyInformation.phoneNumber,
      marketingOptIn: brandCompanyInformation.marketingConsent,

      campaignName: campaignObjectives.campaignName,
      campaignGoals: campaignObjectives.campaignGoals,
      campaignType: campaignObjectives.campaignType,
      targetAudiences: campaignObjectives.targetAudiences,
      targetMarkets: campaignObjectives.targetMarkets,

      preferredCreatorTier: creatorPreferences.preferredCreatorTier,
      contentCategories: creatorPreferences.contentCategories,
      platforms: creatorPreferences.platformFocus,
      brandCreatorFit: creatorPreferences.brandCreatorFit,
      creatorCountNeeded: creatorPreferences.creatorCountNeeded,
      creatorGender: creatorPreferences.creatorGender,
      creatorAgeRange: creatorPreferences.creatorAgeRange,

      budgetRange: budgetPaymentPreference.estimatedBudget,
      paymentModel: budgetPaymentPreference.paymentModel,
      ongoingCollaboration: budgetPaymentPreference.ongoingCollaboration,

      campaignStartDate: timelineDeliverables.campaignStartDate,
      campaignDuration: timelineDeliverables.campaignDuration,
      deliverables: timelineDeliverables.deliverables,

      howHeard: additionalInformation.referralSource,
      collaborationType: additionalInformation.collaborationType,
      communityInterest: additionalInformation.communityInterest,
      additionalNotes: additionalInformation.additionalNotes,

      authorizationConfirmed: agreementSubmission.authorizedConfirmed,
      termsAgreed: agreementSubmission.termsAgreed,

      locationDetected: validatedData.location,
      utmSource: utmParams.utm_source,
      utmMedium: utmParams.utm_medium,
      utmCampaign: utmParams.utm_campaign,
      referrerUrl: referrer,
    });

    // `reference` and `pricing` drive the /brief/payment hand-off. Both are
    // optional, so the brand falls back to the inline success step when the
    // backend doesn't send them.
    return NextResponse.json({
      success: true,
      data: {
        message: result.message,
        reference: result.reference,
        contactEmail: result.contactEmail ?? brandCompanyInformation.email,
        pricing: result.pricing,
      },
    });
  } catch (error) {
    console.error('Brand brief submission error:', error);

    // Handle validation errors
    if (error && typeof error === 'object' && 'issues' in error) {
      const zodError = error as {
        issues: Array<{ path: string[]; message: string; code: string }>;
      };
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed. Please check your inputs.',
          details: zodError.issues.map(issue => ({
            path: issue.path,
            message: issue.message,
            code: issue.code,
          })),
        },
        { status: 400 }
      );
    }

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request format.',
        },
        { status: 400 }
      );
    }

    // Generic server error (includes admin backend failures - this is now
    // the only persistence path, so a failure must be visible to the brand)
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : 'Internal server error. Please try again later.',
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
