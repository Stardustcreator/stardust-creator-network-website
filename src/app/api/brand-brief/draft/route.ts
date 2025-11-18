/**
 * Draft API for Brand Brief Forms
 * Allows saving and retrieving incomplete brand briefs
 * Users can resume their brief from any device using their email
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getSupabaseAdmin } from '@/lib/supabase';

// Helper function to get client IP address
function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const remoteAddr = request.headers.get('x-forwarded-for')?.split(',')[0];

  return forwardedFor?.split(',')[0] || realIP || remoteAddr || 'unknown';
}

function getBrandBriefTable(country: string): string {
  // Map countries to their respective tables
  if (country === 'Nigeria') {
    return 'brand_briefs_nigeria';
  }

  // Default to Nigeria table for unmapped countries
  return 'brand_briefs_nigeria';
}

// Schema for retrieving a draft
const getDraftSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

// Schema for saving a draft
const saveDraftSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  country: z.string().min(1, 'Country is required'),
  formData: z.record(z.string(), z.unknown()),
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

    // Check Nigeria table (can expand to other tables later)
    const tableName = getBrandBriefTable('Nigeria');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: draft } = (await (supabaseClient as any)
      .from(tableName)
      .select('*')
      .eq('email', validatedData.email)
      .eq('brief_status', 'draft')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single()) as { data: Record<string, unknown> | null };

    if (draft) {
      return NextResponse.json({
        success: true,
        hasDraft: true,
        draft: {
          id: draft.id,
          country: draft.country,
          lastUpdated: draft.updated_at,
          data: {
            brandCompanyInformation: {
              brandName: draft.brand_name,
              companyWebsite: draft.company_website,
              country: draft.country,
              industry: draft.industry,
              businessType: draft.business_type,
              contactPerson: draft.contact_person,
              email: draft.email,
              phoneNumber: draft.phone_number,
              marketingConsent: true,
            },
            campaignObjectives: draft.campaign_name
              ? {
                  campaignName: draft.campaign_name,
                  campaignGoals: draft.campaign_goals,
                  campaignType: draft.campaign_type,
                  targetAudiences: draft.target_audiences,
                  targetMarkets: draft.target_markets,
                }
              : undefined,
            creatorPreferences: draft.preferred_creator_tier
              ? {
                  preferredCreatorTier: draft.preferred_creator_tier,
                  contentCategories: draft.content_categories,
                  platformFocus: draft.platform_focus,
                  brandCreatorFit: draft.brand_creator_fit,
                }
              : undefined,
            budgetPaymentPreference: draft.estimated_budget
              ? {
                  estimatedBudget: draft.estimated_budget,
                  paymentModel: draft.payment_model,
                  ongoingCollaboration: draft.ongoing_collaboration,
                }
              : undefined,
            timelineDeliverables: draft.campaign_start_date
              ? {
                  campaignStartDate: draft.campaign_start_date,
                  campaignDuration: draft.campaign_duration,
                  deliverables: draft.deliverables,
                }
              : undefined,
            additionalInformation: draft.referral_source
              ? {
                  referralSource: draft.referral_source,
                  collaborationType: draft.collaboration_type,
                  communityInterest: draft.community_interest,
                  additionalNotes: draft.additional_notes,
                }
              : undefined,
          },
        },
      });
    }

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

    const userAgent = request.headers.get('user-agent') || undefined;
    const referrer = request.headers.get('referer') || undefined;
    const clientIP = getClientIP(request);

    const tableName = getBrandBriefTable(validatedData.country);

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

    // Prepare draft data
    const draftData: Record<string, unknown> = {
      // Brand Company Information (required)
      brand_name: formData.brandCompanyInformation?.brandName,
      company_website: formData.brandCompanyInformation?.companyWebsite,
      country: validatedData.country,
      industry: formData.brandCompanyInformation?.industry,
      business_type: formData.brandCompanyInformation?.businessType,
      contact_person: formData.brandCompanyInformation?.contactPerson,
      email: validatedData.email,
      phone_number: formData.brandCompanyInformation?.phoneNumber,

      // Campaign Objectives (if filled)
      ...(formData.campaignObjectives && {
        campaign_name: formData.campaignObjectives.campaignName,
        campaign_goals: formData.campaignObjectives.campaignGoals,
        campaign_type: formData.campaignObjectives.campaignType,
        target_audiences: formData.campaignObjectives.targetAudiences,
        target_markets: formData.campaignObjectives.targetMarkets,
      }),

      // Creator Preferences (if filled)
      ...(formData.creatorPreferences && {
        preferred_creator_tier: formData.creatorPreferences.preferredCreatorTier,
        content_categories: formData.creatorPreferences.contentCategories,
        platform_focus: formData.creatorPreferences.platformFocus,
        brand_creator_fit: formData.creatorPreferences.brandCreatorFit,
      }),

      // Budget & Payment (if filled)
      ...(formData.budgetPaymentPreference && {
        estimated_budget: formData.budgetPaymentPreference.estimatedBudget,
        payment_model: formData.budgetPaymentPreference.paymentModel,
        ongoing_collaboration: formData.budgetPaymentPreference.ongoingCollaboration,
      }),

      // Timeline & Deliverables (if filled)
      ...(formData.timelineDeliverables && {
        campaign_start_date: formData.timelineDeliverables.campaignStartDate,
        campaign_duration: formData.timelineDeliverables.campaignDuration,
        deliverables: formData.timelineDeliverables.deliverables,
      }),

      // Additional Information (if filled)
      ...(formData.additionalInformation && {
        referral_source: formData.additionalInformation.referralSource,
        collaboration_type: formData.additionalInformation.collaborationType,
        community_interest: formData.additionalInformation.communityInterest,
        additional_notes: formData.additionalInformation.additionalNotes,
      }),

      // Metadata
      brief_status: 'draft',
      location_detected: validatedData.country,
      user_agent: userAgent,
      ip_address: clientIP,
      referrer_url: referrer,
      submitted_at: new Date().toISOString(),
    };

    // Check if draft already exists
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: existingDraft } = (await (supabaseClient as any)
      .from(tableName)
      .select('id')
      .eq('email', validatedData.email)
      .eq('brief_status', 'draft')
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
