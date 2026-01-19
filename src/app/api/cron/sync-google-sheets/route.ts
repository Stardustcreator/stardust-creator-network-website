/**
 * Cron Job: Sync to Google Sheets
 *
 * This endpoint syncs unsynced records from Supabase to Google Sheets.
 * It runs every 4 hours via Vercel Cron.
 *
 * Syncs:
 * - Creator applications (Nigeria only)
 * - Brand briefs (Nigeria only)
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import {
  appendToGoogleSheets,
  appendBrandBriefToGoogleSheets,
} from '@/lib/services/google-sheets.service';
import type { BrandBriefRecord } from '@/lib/services/google-sheets.service';

// Maximum records to process per run (to avoid timeouts)
const BATCH_SIZE = 50;

interface SyncResult {
  processed: number;
  succeeded: number;
  failed: number;
  errors: Array<{ id: string; error: string }>;
}

/**
 * Sync unsynced creator registrations to Google Sheets
 */
async function syncCreatorRegistrations(): Promise<SyncResult> {
  const supabase = getSupabaseAdmin();
  const result: SyncResult = {
    processed: 0,
    succeeded: 0,
    failed: 0,
    errors: [],
  };

  // Fetch unsynced Nigeria creator registrations
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: unsyncedRecords, error: fetchError } = await (supabase as any)
    .from('scn_creator_registrations_ng')
    .select('*')
    .eq('synced_to_google_sheets', false)
    .eq('application_status', 'submitted')
    .order('created_at', { ascending: true })
    .limit(BATCH_SIZE);

  if (fetchError) {
    console.error('Failed to fetch unsynced creator registrations:', fetchError);
    return result;
  }

  if (!unsyncedRecords || unsyncedRecords.length === 0) {
    console.log('No unsynced creator registrations to process');
    return result;
  }

  console.log(`Processing ${unsyncedRecords.length} unsynced creator registrations...`);

  for (const record of unsyncedRecords) {
    result.processed++;

    try {
      // Sync to Google Sheets
      await appendToGoogleSheets(record, true);

      // Mark as synced in database
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any)
        .from('scn_creator_registrations_ng')
        .update({
          synced_to_google_sheets: true,
          synced_to_google_sheets_at: new Date().toISOString(),
        })
        .eq('id', record.id);

      result.succeeded++;
      console.log(`Synced creator registration ${record.id} to Google Sheets`);
    } catch (error) {
      result.failed++;
      const errorMessage = error instanceof Error ? error.message : String(error);
      result.errors.push({ id: record.id, error: errorMessage });
      console.error(`Failed to sync creator registration ${record.id}:`, errorMessage);
    }
  }

  return result;
}

/**
 * Sync unsynced brand briefs to Google Sheets
 */
async function syncBrandBriefs(): Promise<SyncResult> {
  const supabase = getSupabaseAdmin();
  const result: SyncResult = {
    processed: 0,
    succeeded: 0,
    failed: 0,
    errors: [],
  };

  // Fetch unsynced Nigeria brand briefs
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: unsyncedRecords, error: fetchError } = await (supabase as any)
    .from('scn_brands_registration_ng')
    .select('*')
    .eq('synced_to_google_sheets', false)
    .eq('brief_status', 'submitted')
    .order('created_at', { ascending: true })
    .limit(BATCH_SIZE);

  if (fetchError) {
    console.error('Failed to fetch unsynced brand briefs:', fetchError);
    return result;
  }

  if (!unsyncedRecords || unsyncedRecords.length === 0) {
    console.log('No unsynced brand briefs to process');
    return result;
  }

  console.log(`Processing ${unsyncedRecords.length} unsynced brand briefs...`);

  for (const record of unsyncedRecords) {
    result.processed++;

    try {
      // Transform to BrandBriefRecord format
      const brandBriefData: BrandBriefRecord = {
        brand_name: record.brand_name,
        company_website: record.company_website,
        country: record.country,
        industry: record.industry,
        business_type: record.business_type,
        contact_person: record.contact_person,
        email: record.email,
        phone_number: record.phone_number,
        campaign_name: record.campaign_name,
        campaign_goals: record.campaign_goals,
        campaign_type: record.campaign_type,
        target_audiences: record.target_audiences,
        target_markets: record.target_markets,
        preferred_creator_tier: record.preferred_creator_tier,
        content_categories: record.content_categories,
        platform_focus: record.platform_focus,
        brand_creator_fit: record.brand_creator_fit,
        estimated_budget: record.estimated_budget,
        payment_model: record.payment_model,
        ongoing_collaboration: record.ongoing_collaboration,
        campaign_start_date: record.campaign_start_date,
        campaign_duration: record.campaign_duration,
        deliverables: record.deliverables,
        referral_source: record.referral_source,
        collaboration_type: record.collaboration_type,
        community_interest: record.community_interest,
        additional_notes: record.additional_notes,
        authorized_confirmed: record.authorized_confirmed,
        terms_agreed: record.terms_agreed,
        brief_status: record.brief_status,
        location_detected: record.location_detected,
        user_agent: record.user_agent,
        ip_address: record.ip_address,
        referrer_url: record.referrer_url,
        utm_source: record.utm_source,
        utm_medium: record.utm_medium,
        utm_campaign: record.utm_campaign,
        submitted_at: record.submitted_at || record.created_at,
      };

      // Sync to Google Sheets
      await appendBrandBriefToGoogleSheets(brandBriefData, record.id, true);

      // Mark as synced in database
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any)
        .from('scn_brands_registration_ng')
        .update({
          synced_to_google_sheets: true,
          synced_to_google_sheets_at: new Date().toISOString(),
        })
        .eq('id', record.id);

      result.succeeded++;
      console.log(`Synced brand brief ${record.id} to Google Sheets`);
    } catch (error) {
      result.failed++;
      const errorMessage = error instanceof Error ? error.message : String(error);
      result.errors.push({ id: record.id, error: errorMessage });
      console.error(`Failed to sync brand brief ${record.id}:`, errorMessage);
    }
  }

  return result;
}

/**
 * POST - Run Google Sheets sync cron job
 * Protected by cron secret
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    // Verify cron secret for security
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Starting Google Sheets sync cron job...');

    // Run syncs
    const creatorResult = await syncCreatorRegistrations();
    const brandResult = await syncBrandBriefs();

    const duration = Date.now() - startTime;

    const summary = {
      success: true,
      message: 'Google Sheets sync completed',
      duration_ms: duration,
      creators: {
        processed: creatorResult.processed,
        succeeded: creatorResult.succeeded,
        failed: creatorResult.failed,
      },
      brands: {
        processed: brandResult.processed,
        succeeded: brandResult.succeeded,
        failed: brandResult.failed,
      },
      total: {
        processed: creatorResult.processed + brandResult.processed,
        succeeded: creatorResult.succeeded + brandResult.succeeded,
        failed: creatorResult.failed + brandResult.failed,
      },
      errors:
        creatorResult.errors.length + brandResult.errors.length > 0
          ? [...creatorResult.errors, ...brandResult.errors]
          : undefined,
    };

    console.log('Google Sheets sync completed:', summary);

    return NextResponse.json(summary);
  } catch (error) {
    console.error('Google Sheets sync cron job failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        details: error instanceof Error ? error.message : String(error),
        duration_ms: Date.now() - startTime,
      },
      { status: 500 }
    );
  }
}

/**
 * GET - View sync status (for monitoring)
 */
export async function GET() {
  try {
    const supabase = getSupabaseAdmin();

    // Get counts of synced vs unsynced records
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: creatorStats } = await (supabase as any)
      .from('scn_creator_registrations_ng')
      .select('synced_to_google_sheets')
      .eq('application_status', 'submitted');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: brandStats } = await (supabase as any)
      .from('scn_brands_registration_ng')
      .select('synced_to_google_sheets')
      .eq('brief_status', 'submitted');

    const creatorSynced =
      creatorStats?.filter((r: { synced_to_google_sheets: boolean }) => r.synced_to_google_sheets)
        .length || 0;
    const creatorUnsynced =
      creatorStats?.filter((r: { synced_to_google_sheets: boolean }) => !r.synced_to_google_sheets)
        .length || 0;

    const brandSynced =
      brandStats?.filter((r: { synced_to_google_sheets: boolean }) => r.synced_to_google_sheets)
        .length || 0;
    const brandUnsynced =
      brandStats?.filter((r: { synced_to_google_sheets: boolean }) => !r.synced_to_google_sheets)
        .length || 0;

    return NextResponse.json({
      success: true,
      stats: {
        creators: {
          synced: creatorSynced,
          unsynced: creatorUnsynced,
          total: creatorSynced + creatorUnsynced,
        },
        brands: {
          synced: brandSynced,
          unsynced: brandUnsynced,
          total: brandSynced + brandUnsynced,
        },
      },
    });
  } catch (error) {
    console.error('Failed to get sync status:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get sync status',
      },
      { status: 500 }
    );
  }
}
