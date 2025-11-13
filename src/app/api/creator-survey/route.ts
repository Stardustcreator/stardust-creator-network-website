import { NextRequest, NextResponse } from 'next/server';
import { creatorSurveySchema } from '@/lib/validations/creator-survey.validations';
import { getSupabaseAdmin } from '@/lib/supabase';

// Helper function to get client IP address
function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const remoteAddr = request.headers.get('x-forwarded-for')?.split(',')[0];

  return forwardedFor?.split(',')[0] || realIP || remoteAddr || 'unknown';
}

// Creator survey record interface for Supabase
interface CreatorSurveyRecord {
  // Screener & Profile
  platforms: string[];
  main_platform_audience_size: string;
  location_city: string;
  location_country: string;
  creator_status: string;

  // Phase 1: Education & Community
  creator_clinics_helpfulness: number;
  peer_circles_helpfulness: number;
  virtual_workshops_helpfulness: number;
  templates_helpfulness: number;
  office_hours_helpfulness: number;
  online_courses_helpfulness: number;
  prioritized_topics: string[];
  paid_community_likelihood: number;
  paid_community_expectations: string;

  // Current Monetization Mix
  brand_deals_percent: number;
  ads_revenue_percent: number;
  affiliate_percent: number;
  digital_products_percent: number;
  services_percent: number;
  memberships_percent: number;
  licensing_ugc_percent: number;
  merch_percent: number;
  other_percent: number;
  biggest_blockers: string[];

  // Pain Severity × Frequency
  pain_issues: Record<string, { frequency: string; severity: number }>;

  // Phase 2: Infrastructure/OS
  feature_values: Record<string, number>;
  priority_feature: string;
  adoption_blockers: string;

  // Willingness-to-Pay
  currency: string;
  community_too_cheap: string;
  community_bargain: string;
  community_expensive: string;
  community_too_expensive: string;
  os_too_cheap: string;
  os_bargain: string;
  os_expensive: string;
  os_too_expensive: string;
  revenue_based_pricing_likelihood: number;

  // Adoption & Beta
  join_community_beta: boolean;
  join_os_beta: boolean;
  contact_email: string;
  contact_phone: string;

  // Metadata
  user_agent?: string;
  ip_address: string;
  submitted_at: string;
  created_at?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the incoming data
    const validatedData = creatorSurveySchema.parse(body);

    // Extract metadata from request
    const userAgent = request.headers.get('user-agent') || undefined;
    const clientIP = getClientIP(request);

    // Prepare data for database insertion
    const surveyData: CreatorSurveyRecord = {
      // Screener & Profile
      platforms: validatedData.screenerProfile.platforms,
      main_platform_audience_size: validatedData.screenerProfile.mainPlatformAudienceSize,
      location_city: validatedData.screenerProfile.locationCity,
      location_country: validatedData.screenerProfile.locationCountry,
      creator_status: validatedData.screenerProfile.creatorStatus,

      // Phase 1: Education & Community
      creator_clinics_helpfulness: validatedData.phase1EducationCommunity.creatorClinicsHelpfulness,
      peer_circles_helpfulness: validatedData.phase1EducationCommunity.peerCirclesHelpfulness,
      virtual_workshops_helpfulness:
        validatedData.phase1EducationCommunity.virtualWorkshopsHelpfulness,
      templates_helpfulness: validatedData.phase1EducationCommunity.templatesHelpfulness,
      office_hours_helpfulness: validatedData.phase1EducationCommunity.officeHoursHelpfulness,
      online_courses_helpfulness: validatedData.phase1EducationCommunity.onlineCoursesHelpfulness,
      prioritized_topics: validatedData.phase1EducationCommunity.prioritizedTopics,
      paid_community_likelihood: validatedData.phase1EducationCommunity.paidCommunityLikelihood,
      paid_community_expectations: validatedData.phase1EducationCommunity.paidCommunityExpectations,

      // Current Monetization Mix
      brand_deals_percent: validatedData.currentMonetizationMix.brandDealsPercent,
      ads_revenue_percent: validatedData.currentMonetizationMix.adsRevenuePercent,
      affiliate_percent: validatedData.currentMonetizationMix.affiliatePercent,
      digital_products_percent: validatedData.currentMonetizationMix.digitalProductsPercent,
      services_percent: validatedData.currentMonetizationMix.servicesPercent,
      memberships_percent: validatedData.currentMonetizationMix.membershipsPercent,
      licensing_ugc_percent: validatedData.currentMonetizationMix.licensingUgcPercent,
      merch_percent: validatedData.currentMonetizationMix.merchPercent,
      other_percent: validatedData.currentMonetizationMix.otherPercent,
      biggest_blockers: validatedData.currentMonetizationMix.biggestBlockers,

      // Pain Severity × Frequency
      pain_issues: validatedData.painSeverityFrequency.issues,

      // Phase 2: Infrastructure/OS
      feature_values: validatedData.phase2InfrastructureOS.featureValues,
      priority_feature: validatedData.phase2InfrastructureOS.priorityFeature,
      adoption_blockers: validatedData.phase2InfrastructureOS.adoptionBlockers,

      // Willingness-to-Pay
      currency: validatedData.willingnessToPay.currency,
      community_too_cheap: validatedData.willingnessToPay.communityTooCheap,
      community_bargain: validatedData.willingnessToPay.communityBargain,
      community_expensive: validatedData.willingnessToPay.communityExpensive,
      community_too_expensive: validatedData.willingnessToPay.communityTooExpensive,
      os_too_cheap: validatedData.willingnessToPay.osTooCheap,
      os_bargain: validatedData.willingnessToPay.osBargain,
      os_expensive: validatedData.willingnessToPay.osExpensive,
      os_too_expensive: validatedData.willingnessToPay.osTooExpensive,
      revenue_based_pricing_likelihood:
        validatedData.willingnessToPay.revenueBasedPricingLikelihood,

      // Adoption & Beta
      join_community_beta: validatedData.adoptionBeta.joinCommunityBeta,
      join_os_beta: validatedData.adoptionBeta.joinOsBeta,
      contact_email: validatedData.adoptionBeta.contactEmail,
      contact_phone: validatedData.adoptionBeta.contactPhone,

      // Metadata
      user_agent: userAgent,
      ip_address: clientIP,
      submitted_at: new Date().toISOString(),
    };

    // Initialize Supabase client
    let supabaseClient: ReturnType<typeof getSupabaseAdmin>;
    try {
      supabaseClient = getSupabaseAdmin();
    } catch (supabaseInitError) {
      console.error('Failed to initialize Supabase client:', supabaseInitError);
      return NextResponse.json(
        {
          success: false,
          error: 'Server configuration error. Please contact support.',
          details:
            process.env.NODE_ENV === 'development'
              ? supabaseInitError instanceof Error
                ? supabaseInitError.message
                : 'Supabase client initialization failed'
              : undefined,
        },
        { status: 500 }
      );
    }

    // Insert into Supabase
    // Note: You'll need to create a table called 'creator_surveys' in your Supabase database
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = (await (supabaseClient as any)
      .from('creator_surveys')
      .insert([surveyData])
      .select('id, submitted_at')
      .single()) as {
      data: { id: string; submitted_at: string } | null;
      error: unknown;
    };

    if (error) {
      console.error('Supabase insertion error:', error);

      // Handle duplicate email error
      const dbError = error as { code?: string; message?: string };
      if (dbError.code === '23505' && dbError.message?.includes('email')) {
        return NextResponse.json(
          {
            success: false,
            error: 'A survey with this email address already exists.',
            code: 'DUPLICATE_EMAIL',
          },
          { status: 409 }
        );
      }

      // Generic database error
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to save survey. Please try again.',
          details: process.env.NODE_ENV === 'development' ? dbError.message : undefined,
        },
        { status: 500 }
      );
    }

    if (!data) {
      console.error('Database insertion returned no data');
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to create survey record. Please try again.',
        },
        { status: 500 }
      );
    }

    console.log('Creator survey submitted successfully:', data);

    // Return success response
    return NextResponse.json({
      success: true,
      data: {
        surveyId: data.id,
        submittedAt: data.submitted_at,
      },
    });
  } catch (error) {
    console.error('Creator survey submission error:', error);

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

    // Generic server error
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined,
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
