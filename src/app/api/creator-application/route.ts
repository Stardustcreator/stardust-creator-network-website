import { NextRequest, NextResponse } from 'next/server';
import { apiCreatorApplicationSchema } from '@/lib/validations/creator-application.validations';
import {
  supabaseAdmin,
  getCreatorRegistrationTable,
  type CreatorRegistrationRecord,
} from '@/lib/supabase';

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Debug: Log the incoming request data
    console.log('API received data:', JSON.stringify(body, null, 2));

    // Validate the incoming data
    const validatedData = apiCreatorApplicationSchema.parse(body);

    // Extract metadata from request
    const userAgent = request.headers.get('user-agent') || undefined;
    const referrer = request.headers.get('referer') || undefined;
    const clientIP = getClientIP(request);
    const utmParams = extractUTMParams(referrer || null);

    // Determine which table to use based on country
    const tableName = getCreatorRegistrationTable(validatedData.personalInformation.country);

    // Prepare data for database insertion
    const registrationData: CreatorRegistrationRecord = {
      // Personal Information
      full_name: validatedData.personalInformation.fullName,
      email: validatedData.personalInformation.email,
      phone_number: validatedData.personalInformation.phoneNumber,
      country: validatedData.personalInformation.country,
      city: validatedData.personalInformation.city,
      age_range: validatedData.personalInformation.ageRange,

      // Creator Identity
      creator_handle: validatedData.creatorIdentity.creatorHandle,
      primary_platforms: validatedData.creatorIdentity.primaryPlatforms,
      social_links: validatedData.creatorIdentity.socialLinks.map(link => ({
        platform: link.platform,
        url: link.url,
      })),
      audience_size: validatedData.creatorIdentity.audienceSize,
      content_categories: validatedData.creatorIdentity.contentCategories,
      creator_type: validatedData.creatorIdentity.creatorType,

      // Monetization Experience
      worked_with_brands: validatedData.monetizationExperience.workedWithBrands,
      brand_example: validatedData.monetizationExperience.brandExample,
      fee_range: validatedData.monetizationExperience.feeRange,
      monetization_methods: validatedData.monetizationExperience.monetizationMethods,
      opportunity_interests: validatedData.monetizationExperience.opportunityInterests,

      // Education & Tools Interest
      creator_os_features: validatedData.educationToolsInterest.creatorOSFeatures,
      community_interest: validatedData.educationToolsInterest.communityInterest,

      // Verification & Agreement
      authenticity_confirmed: validatedData.verificationAgreement.authenticityConfirmed,
      terms_agreed: validatedData.verificationAgreement.termsAgreed,

      // Metadata
      application_status: 'submitted',
      location_detected: validatedData.location,
      user_agent: userAgent,
      ip_address: clientIP,
      referrer_url: referrer,
      ...utmParams,
    };

    // Insert data into Supabase
    const { data: insertedData, error: insertError } = await supabaseAdmin
      .from(tableName)
      .insert([registrationData])
      .select('id, created_at')
      .single();

    if (insertError) {
      console.error('Database insertion error:', insertError);

      // Handle unique constraint violations (duplicate email)
      if (insertError.code === '23505' && insertError.message.includes('unique_email')) {
        return NextResponse.json(
          {
            success: false,
            error: 'An application with this email address already exists.',
            code: 'DUPLICATE_EMAIL',
          },
          { status: 409 }
        );
      }

      throw insertError;
    }

    // Generate application ID using the database ID
    const applicationId = `SCN-${insertedData.id.split('-')[0].toUpperCase()}`;

    // Log successful submission
    console.log('Creator application submitted successfully:', {
      id: insertedData.id,
      applicationId,
      email: validatedData.personalInformation.email,
      country: validatedData.personalInformation.country,
      table: tableName,
      submittedAt: insertedData.created_at,
    });

    // TODO: Send confirmation email
    // TODO: Notify admin team
    // TODO: Add to CRM/ATS system

    // Return success response
    return NextResponse.json({
      success: true,
      data: {
        applicationId,
        status: 'submitted',
        submittedAt: insertedData.created_at,
        message:
          'Application submitted successfully. You will receive a confirmation email shortly.',
      },
    });
  } catch (error) {
    console.error('Creator application submission error:', error);
    
    // Debug: Log the full error details
    if (error && typeof error === 'object') {
      console.error('Error details:', {
        name: (error as any).name,
        message: (error as any).message,
        stack: (error as any).stack,
        code: (error as any).code,
        issues: (error as any).issues
      });
    }

    // Handle validation errors
    if (error && typeof error === 'object' && 'issues' in error) {
      const zodError = error as { issues: Array<{ path: string[]; message: string }> };
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid application data',
          details: zodError.issues,
        },
        { status: 400 }
      );
    }

    // Handle database errors
    if (error && typeof error === 'object' && 'code' in error) {
      const dbError = error as { code: string; message?: string };
      return NextResponse.json(
        {
          success: false,
          error: 'Database error occurred. Please try again later.',
          code: dbError.code,
        },
        { status: 500 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit application. Please try again later.',
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
