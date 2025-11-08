import { NextRequest, NextResponse } from 'next/server';
import { apiBrandBriefSchema } from '@/lib/validations/brand-brief.validations';
import { supabaseAdmin } from '@/lib/supabase';

// Helper function to get client IP address
function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const remoteAddr = request.headers.get('x-forwarded-for')?.split(',')[0];

  return forwardedFor?.split(',')[0] || realIP || remoteAddr || 'unknown';
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

// Helper function to determine which table to use based on country
function getBrandBriefTable(country: string): string {
  switch (country) {
    case 'Nigeria':
      return 'scn_brands_registration_ng';
    case 'United Kingdom':
      return 'scn_brands_registration_uk';
    default:
      // Default to Nigeria table for other countries
      return 'scn_brands_registration_ng';
  }
}

// Brand brief record interface for Supabase
interface BrandBriefRecord {
  // Brand Company Information
  brand_name: string;
  company_website: string;
  country: string;
  industry: string;
  business_type: string;
  contact_person: string;
  email: string;
  phone_number?: string;

  // Campaign Objectives
  campaign_name: string;
  campaign_goals: string[];
  campaign_type: string;
  target_audiences: string[];
  target_markets: string[];

  // Creator Preferences
  preferred_creator_tier: string;
  content_categories: string[];
  platform_focus: string[];
  brand_creator_fit?: string;

  // Budget & Payment Preference
  estimated_budget: string;
  payment_model: string;
  ongoing_collaboration: string;

  // Timeline & Deliverables
  campaign_start_date: string;
  campaign_duration: string;
  deliverables: string[];

  // Additional Information
  referral_source: string;
  collaboration_type: string;
  community_interest: string;
  additional_notes?: string;

  // Agreement & Submission
  authorized_confirmed: boolean;
  terms_agreed: boolean;

  // Metadata
  brief_status: 'submitted' | 'under-review' | 'matched' | 'completed';
  location_detected: string;
  user_agent?: string;
  ip_address: string;
  referrer_url?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  submitted_at: string;
  created_at?: string;
  updated_at?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Debug: Log the incoming request data
    console.log('Brand brief API received data:', JSON.stringify(body, null, 2));

    // Validate the incoming data
    const validatedData = apiBrandBriefSchema.parse(body);

    // Extract metadata from request
    const userAgent = request.headers.get('user-agent') || undefined;
    const referrer = request.headers.get('referer') || undefined;
    const clientIP = getClientIP(request);
    const utmParams = extractUTMParams(referrer || null);

    // Prepare data for database insertion
    const briefData: BrandBriefRecord = {
      // Brand Company Information
      brand_name: validatedData.brandCompanyInformation.brandName,
      company_website: validatedData.brandCompanyInformation.companyWebsite,
      country: validatedData.brandCompanyInformation.country,
      industry: validatedData.brandCompanyInformation.industry,
      business_type: validatedData.brandCompanyInformation.businessType,
      contact_person: validatedData.brandCompanyInformation.contactPerson,
      email: validatedData.brandCompanyInformation.email,
      phone_number: validatedData.brandCompanyInformation.phoneNumber,

      // Campaign Objectives
      campaign_name: validatedData.campaignObjectives.campaignName,
      campaign_goals: validatedData.campaignObjectives.campaignGoals,
      campaign_type: validatedData.campaignObjectives.campaignType,
      target_audiences: validatedData.campaignObjectives.targetAudiences,
      target_markets: validatedData.campaignObjectives.targetMarkets,

      // Creator Preferences
      preferred_creator_tier: validatedData.creatorPreferences.preferredCreatorTier,
      content_categories: validatedData.creatorPreferences.contentCategories,
      platform_focus: validatedData.creatorPreferences.platformFocus,
      brand_creator_fit: validatedData.creatorPreferences.brandCreatorFit,

      // Budget & Payment Preference
      estimated_budget: validatedData.budgetPaymentPreference.estimatedBudget,
      payment_model: validatedData.budgetPaymentPreference.paymentModel,
      ongoing_collaboration: validatedData.budgetPaymentPreference.ongoingCollaboration,

      // Timeline & Deliverables
      campaign_start_date: validatedData.timelineDeliverables.campaignStartDate,
      campaign_duration: validatedData.timelineDeliverables.campaignDuration,
      deliverables: validatedData.timelineDeliverables.deliverables,

      // Additional Information
      referral_source: validatedData.additionalInformation.referralSource,
      collaboration_type: validatedData.additionalInformation.collaborationType,
      community_interest: validatedData.additionalInformation.communityInterest,
      additional_notes: validatedData.additionalInformation.additionalNotes,

      // Agreement & Submission
      authorized_confirmed: validatedData.agreementSubmission.authorizedConfirmed,
      terms_agreed: validatedData.agreementSubmission.termsAgreed,

      // Metadata
      brief_status: 'submitted',
      location_detected: validatedData.location,
      user_agent: userAgent,
      ip_address: clientIP,
      referrer_url: referrer,
      submitted_at: validatedData.submittedAt,
      ...utmParams,
    };

    // Determine which table to use based on country
    const tableName = getBrandBriefTable(validatedData.brandCompanyInformation.country);

    // Debug: Log the data being inserted
    console.log('Inserting brand brief data into table:', tableName);
    console.log('Brief data:', JSON.stringify(briefData, null, 2));

    // Insert into Supabase using the appropriate country-specific table
    const { data, error } = await supabaseAdmin
      .from(tableName)
      .insert([briefData])
      .select('id, brief_status, created_at')
      .single();

    if (error) {
      console.error('Supabase insertion error:', error);

      // Handle duplicate email error
      if (error.code === '23505' && error.message?.includes('email')) {
        return NextResponse.json(
          {
            success: false,
            error: 'A brand brief with this email address already exists.',
            code: 'DUPLICATE_EMAIL',
          },
          { status: 409 }
        );
      }

      // Handle other constraint errors
      if (error.code === '23505') {
        return NextResponse.json(
          {
            success: false,
            error: 'This brand brief has already been submitted.',
            code: 'DUPLICATE_SUBMISSION',
          },
          { status: 409 }
        );
      }

      // Generic database error
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to save brand brief. Please try again.',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined,
        },
        { status: 500 }
      );
    }

    console.log('Brand brief submitted successfully:', data);

    // Return success response
    return NextResponse.json({
      success: true,
      data: {
        briefId: data.id,
        status: data.brief_status,
        submittedAt: data.created_at,
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
