/**
 * Draft API for Creator Applications
 * Allows saving and retrieving incomplete applications
 * Users can resume their application from any device using their email
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  getSupabaseAdmin,
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

// Schema for retrieving a draft (just need email)
const getDraftSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

// Schema for saving a draft (partial data allowed)
const saveDraftSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  country: z.string().min(1, 'Country is required'),
  formData: z.record(z.string(), z.unknown()), // The full form data object
});

/**
 * GET - Check if a draft exists for an email
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email parameter is required',
        },
        { status: 400 }
      );
    }

    // Validate email
    const validatedData = getDraftSchema.parse({ email });

    // Initialize Supabase client
    let supabaseClient: ReturnType<typeof getSupabaseAdmin>;
    try {
      supabaseClient = getSupabaseAdmin();
    } catch (supabaseInitError) {
      console.error('Failed to initialize Supabase client:', supabaseInitError);
      return NextResponse.json(
        {
          success: false,
          error: 'Server configuration error',
        },
        { status: 500 }
      );
    }

    // Check Nigeria table first (most common)
    const nigeriaTable = getCreatorRegistrationTable('Nigeria');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: nigeriaDraft } = (await (supabaseClient as any)
      .from(nigeriaTable)
      .select('*')
      .eq('email', validatedData.email)
      .eq('application_status', 'draft')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single()) as { data: CreatorRegistrationRecord | null };

    if (nigeriaDraft) {
      return NextResponse.json({
        success: true,
        hasDraft: true,
        draft: {
          id: nigeriaDraft.id,
          country: nigeriaDraft.country,
          lastUpdated: nigeriaDraft.updated_at,
          data: {
            personalInformation: {
              fullName: nigeriaDraft.full_name,
              email: nigeriaDraft.email,
              phoneNumber: nigeriaDraft.phone_number,
              country: nigeriaDraft.country,
              city: nigeriaDraft.city,
              ageRange: nigeriaDraft.age_range,
              marketingConsent: true, // They got to this point, so they consented
            },
            creatorIdentity: nigeriaDraft.creator_handle
              ? {
                  creatorHandle: nigeriaDraft.creator_handle,
                  primaryPlatforms: nigeriaDraft.primary_platforms,
                  socialLinks: nigeriaDraft.social_links,
                  audienceSize: nigeriaDraft.audience_size,
                  contentCategories: nigeriaDraft.content_categories,
                  creatorType: nigeriaDraft.creator_type,
                }
              : undefined,
            monetizationExperience:
              nigeriaDraft.worked_with_brands !== undefined
                ? {
                    workedWithBrands: nigeriaDraft.worked_with_brands,
                    brandExample: nigeriaDraft.brand_example,
                    feeRange: nigeriaDraft.fee_range,
                    monetizationMethods: nigeriaDraft.monetization_methods,
                    opportunityInterests: nigeriaDraft.opportunity_interests,
                  }
                : undefined,
            educationToolsInterest: nigeriaDraft.creator_os_features
              ? {
                  creatorOSFeatures: nigeriaDraft.creator_os_features,
                  communityInterest: nigeriaDraft.community_interest,
                }
              : undefined,
          },
        },
      });
    }

    // If not found in Nigeria, check UK table
    const ukTable = getCreatorRegistrationTable('United Kingdom');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: ukDraft } = (await (supabaseClient as any)
      .from(ukTable)
      .select('*')
      .eq('email', validatedData.email)
      .eq('application_status', 'draft')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single()) as { data: CreatorRegistrationRecord | null };

    if (ukDraft) {
      return NextResponse.json({
        success: true,
        hasDraft: true,
        draft: {
          id: ukDraft.id,
          country: ukDraft.country,
          lastUpdated: ukDraft.updated_at,
          data: {
            personalInformation: {
              fullName: ukDraft.full_name,
              email: ukDraft.email,
              phoneNumber: ukDraft.phone_number,
              country: ukDraft.country,
              city: ukDraft.city,
              ageRange: ukDraft.age_range,
              marketingConsent: true,
            },
            creatorIdentity: ukDraft.creator_handle
              ? {
                  creatorHandle: ukDraft.creator_handle,
                  primaryPlatforms: ukDraft.primary_platforms,
                  socialLinks: ukDraft.social_links,
                  audienceSize: ukDraft.audience_size,
                  contentCategories: ukDraft.content_categories,
                  creatorType: ukDraft.creator_type,
                }
              : undefined,
            monetizationExperience:
              ukDraft.worked_with_brands !== undefined
                ? {
                    workedWithBrands: ukDraft.worked_with_brands,
                    brandExample: ukDraft.brand_example,
                    feeRange: ukDraft.fee_range,
                    monetizationMethods: ukDraft.monetization_methods,
                    opportunityInterests: ukDraft.opportunity_interests,
                  }
                : undefined,
            educationToolsInterest: ukDraft.creator_os_features
              ? {
                  creatorOSFeatures: ukDraft.creator_os_features,
                  communityInterest: ukDraft.community_interest,
                }
              : undefined,
          },
        },
      });
    }

    // No draft found
    return NextResponse.json({
      success: true,
      hasDraft: false,
    });
  } catch (error) {
    console.error('Error checking for draft:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email address',
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to check for draft',
      },
      { status: 500 }
    );
  }
}

/**
 * POST - Save or update a draft
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = saveDraftSchema.parse(body);

    // Extract metadata
    const userAgent = request.headers.get('user-agent') || undefined;
    const referrer = request.headers.get('referer') || undefined;
    const clientIP = getClientIP(request);

    // Determine which table to use
    const tableName = getCreatorRegistrationTable(validatedData.country);

    // Initialize Supabase client
    let supabaseClient: ReturnType<typeof getSupabaseAdmin>;
    try {
      supabaseClient = getSupabaseAdmin();
    } catch (supabaseInitError) {
      console.error('Failed to initialize Supabase client:', supabaseInitError);
      return NextResponse.json(
        {
          success: false,
          error: 'Server configuration error',
        },
        { status: 500 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formData = validatedData.formData as Record<string, any>;

    // Prepare draft data (only include fields that are filled)
    const draftData: Partial<CreatorRegistrationRecord> = {
      // Personal Information (always required for draft)
      full_name: formData.personalInformation?.fullName,
      email: validatedData.email,
      phone_number: formData.personalInformation?.phoneNumber,
      country: validatedData.country,
      city: formData.personalInformation?.city,
      age_range: formData.personalInformation?.ageRange,

      // Creator Identity (if filled)
      ...(formData.creatorIdentity && {
        creator_handle: formData.creatorIdentity.creatorHandle,
        primary_platforms: formData.creatorIdentity.primaryPlatforms,
        social_links: formData.creatorIdentity.socialLinks,
        audience_size: formData.creatorIdentity.audienceSize,
        content_categories: formData.creatorIdentity.contentCategories,
        creator_type: formData.creatorIdentity.creatorType,
      }),

      // Monetization Experience (if filled)
      ...(formData.monetizationExperience && {
        worked_with_brands: formData.monetizationExperience.workedWithBrands,
        brand_example: formData.monetizationExperience.brandExample,
        fee_range: formData.monetizationExperience.feeRange,
        monetization_methods: formData.monetizationExperience.monetizationMethods,
        opportunity_interests: formData.monetizationExperience.opportunityInterests,
      }),

      // Education & Tools Interest (if filled)
      ...(formData.educationToolsInterest && {
        creator_os_features: formData.educationToolsInterest.creatorOSFeatures,
        community_interest: formData.educationToolsInterest.communityInterest,
      }),

      // Metadata
      application_status: 'draft',
      location_detected: validatedData.country,
      user_agent: userAgent,
      ip_address: clientIP,
      referrer_url: referrer,
    };

    // Check if draft already exists
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: existingDraft } = (await (supabaseClient as any)
      .from(tableName)
      .select('id')
      .eq('email', validatedData.email)
      .eq('application_status', 'draft')
      .single()) as { data: { id: string } | null };

    if (existingDraft) {
      // Update existing draft
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: updateError } = await (supabaseClient as any)
        .from(tableName)
        .update({
          ...draftData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingDraft.id);

      if (updateError) {
        console.error('Error updating draft:', updateError);
        throw updateError;
      }

      console.log('Draft updated successfully:', {
        id: existingDraft.id,
        email: validatedData.email,
      });

      return NextResponse.json({
        success: true,
        message: 'Draft updated successfully',
        draftId: existingDraft.id,
      });
    } else {
      // Create new draft
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: insertedData, error: insertError } = (await (supabaseClient as any)
        .from(tableName)
        .insert([draftData])
        .select('id')
        .single()) as { data: { id: string } | null; error: unknown };

      if (insertError) {
        console.error('Error creating draft:', insertError);
        throw insertError;
      }

      console.log('Draft created successfully:', {
        id: insertedData?.id,
        email: validatedData.email,
      });

      return NextResponse.json({
        success: true,
        message: 'Draft saved successfully',
        draftId: insertedData?.id,
      });
    }
  } catch (error) {
    console.error('Error saving draft:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid data',
          details: error.issues,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to save draft',
      },
      { status: 500 }
    );
  }
}
