import { NextRequest, NextResponse } from 'next/server';
import { apiBrandBriefSchema } from '@/lib/validations/brand-brief.validations';
import { submitBrief } from '@/lib/api/briefs';
import {
  extractUTMParams,
  resolveBudgetKobo,
  synthesizeCampaignBrief,
  synthesizeTimeline,
} from '@/lib/brief-payload';

// Still used by BrandBriefForm. The standalone /brief page calls the backend
// directly instead - both share the mapping helpers in @/lib/brief-payload so
// they submit identical payloads.
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
      preferredTiers: creatorPreferences.preferredTiers,
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

      intendedPath: validatedData.intendedPath,

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
        briefId: result.briefId,
        guestToken: result.guestToken,
        pathTag: result.pathTag,
        nextRoute: result.nextRoute,
        budget: result.budget,
        budgetMinKobo: result.budgetMinKobo,
        budgetMaxKobo: result.budgetMaxKobo,
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
