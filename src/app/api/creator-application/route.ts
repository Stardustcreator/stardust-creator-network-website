import { NextRequest, NextResponse } from 'next/server';
import { apiCreatorApplicationSchema } from '@/lib/validations/creator-application.validations';
import {
  getSupabaseAdmin,
  getCreatorRegistrationTable,
  type CreatorRegistrationRecord,
} from '@/lib/supabase';
import { appendToGoogleSheets } from '@/lib/services/google-sheets.service';
import { addCreatorToMailchimp, updateMailchimpTags } from '@/lib/services/mailchimp.service';

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
  // Wrap everything in try-catch to ensure we always return JSON
  try {
    let body: unknown;
    let mediaKitFile: File | null = null;

    // Check if request is FormData (file upload) or JSON
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      // Handle FormData request with file
      const formData = await request.formData();
      const file = formData.get('mediaKit');
      const formDataString = formData.get('formData');

      if (file instanceof File) {
        mediaKitFile = file;
      }

      if (!formDataString || typeof formDataString !== 'string') {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid request format. Missing form data.',
          },
          { status: 400 }
        );
      }

      try {
        body = JSON.parse(formDataString);
      } catch (parseError) {
        console.error('Failed to parse form data JSON:', parseError);
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid request format. Form data is not valid JSON.',
          },
          { status: 400 }
        );
      }
    } else {
      // Handle JSON request
      try {
        body = await request.json();
      } catch (jsonError) {
        console.error('Failed to parse request body as JSON:', jsonError);
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid request format. Expected JSON.',
          },
          { status: 400 }
        );
      }
    }

    // Debug: Log the incoming request data
    console.log('API received data:', JSON.stringify(body, null, 2));
    if (mediaKitFile) {
      console.log('Media kit file received:', {
        name: mediaKitFile.name,
        size: mediaKitFile.size,
        type: mediaKitFile.type,
      });
    }

    // Validate the incoming data
    const validatedData = apiCreatorApplicationSchema.parse(body);

    // Extract metadata from request
    const userAgent = request.headers.get('user-agent') || undefined;
    const referrer = request.headers.get('referer') || undefined;
    const clientIP = getClientIP(request);
    const utmParams = extractUTMParams(referrer || null);

    // Determine which table to use based on country
    const tableName = getCreatorRegistrationTable(validatedData.personalInformation.country);

    // Initialize Supabase client (may throw if env vars are missing)
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

    // Upload media kit file to Supabase Storage if present
    let mediaKitUrl: string | undefined;
    if (mediaKitFile) {
      try {
        // Generate a unique filename using timestamp and original filename
        const timestamp = Date.now();
        const sanitizedFileName = mediaKitFile.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const filePath = `${timestamp}-${sanitizedFileName}`;

        // Convert File to ArrayBuffer for Supabase upload
        const fileBuffer = await mediaKitFile.arrayBuffer();

        // Upload to Supabase Storage
        const { error: uploadError } = await supabaseClient.storage
          .from('creator-media-kits')
          .upload(filePath, fileBuffer, {
            contentType: mediaKitFile.type,
            upsert: false,
          });

        if (uploadError) {
          console.error('File upload error:', uploadError);
          return NextResponse.json(
            {
              success: false,
              error: 'Failed to upload media kit file. Please try again.',
              details: process.env.NODE_ENV === 'development' ? uploadError.message : undefined,
            },
            { status: 500 }
          );
        }

        // Get the public URL for the uploaded file
        const { data: urlData } = supabaseClient.storage
          .from('creator-media-kits')
          .getPublicUrl(filePath);

        mediaKitUrl = urlData.publicUrl;

        console.log('Media kit uploaded successfully:', {
          path: filePath,
          url: mediaKitUrl,
        });
      } catch (uploadError) {
        console.error('File upload exception:', uploadError);
        return NextResponse.json(
          {
            success: false,
            error: 'Failed to process media kit file. Please try again.',
            details:
              process.env.NODE_ENV === 'development'
                ? uploadError instanceof Error
                  ? uploadError.message
                  : 'Unknown upload error'
                : undefined,
          },
          { status: 500 }
        );
      }
    }

    // Check if there's an existing draft
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: existingDraft } = (await (supabaseClient as any)
      .from(tableName)
      .select('id')
      .eq('email', validatedData.personalInformation.email)
      .eq('application_status', 'draft')
      .single()) as { data: { id: string } | null };

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
      social_links: validatedData.creatorIdentity.socialLinks.map(
        (link: { platform: string; url: string }) => ({
          platform: link.platform,
          url: link.url,
        })
      ),
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
      media_kit_url: mediaKitUrl,
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

    let insertedData: { id: string; created_at: string } | null;
    let insertError: unknown;

    if (existingDraft) {
      // Update existing draft to submitted status
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = (await (supabaseClient as any)
        .from(tableName)
        .update(registrationData)
        .eq('id', existingDraft.id)
        .select('id, created_at')
        .single()) as { data: { id: string; created_at: string } | null; error: unknown };

      insertedData = result.data;
      insertError = result.error;

      console.log('Draft converted to submitted:', { id: existingDraft.id });
    } else {
      // Insert data into Supabase
      // Type assertion needed because Supabase types require generated database types
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = (await (supabaseClient as any)
        .from(tableName)
        .insert([registrationData])
        .select('id, created_at')
        .single()) as { data: { id: string; created_at: string } | null; error: unknown };

      insertedData = result.data;
      insertError = result.error;
    }

    if (insertError) {
      console.error('Database insertion error:', insertError);

      // Handle unique constraint violations (duplicate email)
      const dbError = insertError as { code?: string; message?: string };
      if (dbError.code === '23505' && dbError.message?.includes('unique_email')) {
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

    if (!insertedData) {
      console.error('Database insertion returned no data');
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to create application record. Please try again.',
        },
        { status: 500 }
      );
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

    // Sync to Google Sheets for Nigeria submissions only
    // This runs asynchronously and won't block the response if it fails
    if (validatedData.personalInformation.country === 'Nigeria') {
      // Add the database ID and timestamp to the registration data for Google Sheets
      const sheetsData: CreatorRegistrationRecord = {
        ...registrationData,
        id: insertedData.id,
        created_at: insertedData.created_at,
      };

      // Append to Google Sheets (non-blocking - errors are logged but don't affect response)
      // Wrap in try-catch to prevent any unhandled promise rejections
      appendToGoogleSheets(sheetsData).catch(error => {
        // Error is already logged in the service, but we log here for API context
        console.error('Google Sheets sync failed (non-blocking):', error);
        // Don't re-throw - this is intentionally non-blocking
      });
    }

    // Sync to Mailchimp audience with "join-as-creator" tag
    // This will upgrade from "partial-creator-signup" if they were early captured
    // This runs asynchronously and won't block the response if it fails
    addCreatorToMailchimp(
      {
        email: validatedData.personalInformation.email,
        fullName: validatedData.personalInformation.fullName,
        phoneNumber: validatedData.personalInformation.phoneNumber,
      },
      {
        isPartialSubmission: false, // Full submission
      }
    )
      .then(() => {
        // After successful sync, upgrade tags from partial to complete
        return updateMailchimpTags({
          email: validatedData.personalInformation.email,
          tagsToRemove: ['partial-creator-signup'],
          tagsToAdd: ['join-as-creator'],
        });
      })
      .catch(error => {
        // Error is already logged in the service, but we log here for API context
        console.error('Mailchimp sync/tag update failed (non-blocking):', error);
        // Don't re-throw - this is intentionally non-blocking
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
    // Always log the error for debugging
    console.error('Creator application submission error:', error);

    // Debug: Log the full error details
    if (error && typeof error === 'object') {
      const errorObj = error as Record<string, unknown>;
      console.error('Error details:', {
        name: errorObj.name,
        message: errorObj.message,
        stack: errorObj.stack,
        code: errorObj.code,
        issues: errorObj.issues,
      });
    }

    // Ensure we always return JSON, never HTML
    try {
      // Handle validation errors (Zod)
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

      // Handle all other errors with a generic message
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

      return NextResponse.json(
        {
          success: false,
          error: 'Failed to submit application. Please try again later.',
          // Only include detailed error in development
          ...(process.env.NODE_ENV === 'development' && { details: errorMessage }),
        },
        { status: 500 }
      );
    } catch (responseError) {
      // If even returning JSON fails, log it but still try to return something
      console.error('Failed to create error response:', responseError);
      // This should never happen, but if it does, return a minimal JSON response
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: 'Internal server error',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
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
