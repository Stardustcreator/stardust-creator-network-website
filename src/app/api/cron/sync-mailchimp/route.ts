/**
 * Cron Job: Sync to Mailchimp
 *
 * This endpoint syncs unsynced records from Supabase to Mailchimp audience.
 * It runs every 4 hours via Vercel Cron (15 minutes after Google Sheets sync).
 *
 * Syncs:
 * - Creator applications (all countries)
 * - Brand briefs (all countries)
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import {
  addCreatorToMailchimp,
  addBrandToMailchimp,
  updateMailchimpTags,
} from '@/lib/services/mailchimp.service';

// Maximum records to process per run (to avoid timeouts)
const BATCH_SIZE = 50;

interface SyncResult {
  processed: number;
  succeeded: number;
  failed: number;
  errors: Array<{ id: string; error: string }>;
}

/**
 * Sync unsynced creator registrations to Mailchimp
 */
async function syncCreatorRegistrations(tableName: string): Promise<SyncResult> {
  const supabase = getSupabaseAdmin();
  const result: SyncResult = {
    processed: 0,
    succeeded: 0,
    failed: 0,
    errors: [],
  };

  // Fetch unsynced creator registrations
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: unsyncedRecords, error: fetchError } = await (supabase as any)
    .from(tableName)
    .select('*')
    .eq('synced_to_mailchimp', false)
    .eq('application_status', 'submitted')
    .order('created_at', { ascending: true })
    .limit(BATCH_SIZE);

  if (fetchError) {
    console.error(`Failed to fetch unsynced creator registrations from ${tableName}:`, fetchError);
    return result;
  }

  if (!unsyncedRecords || unsyncedRecords.length === 0) {
    console.log(`No unsynced creator registrations in ${tableName}`);
    return result;
  }

  console.log(
    `Processing ${unsyncedRecords.length} unsynced creator registrations from ${tableName}...`
  );

  for (const record of unsyncedRecords) {
    result.processed++;

    try {
      // Add to Mailchimp audience
      await addCreatorToMailchimp(
        {
          email: record.email,
          fullName: record.full_name,
          phoneNumber: record.phone_number || '',
        },
        {
          isPartialSubmission: false,
        }
      );

      // Update tags (remove partial, add full)
      await updateMailchimpTags({
        email: record.email,
        tagsToRemove: ['partial-creator-signup'],
        tagsToAdd: ['join-as-creator'],
      });

      // Mark as synced in database
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any)
        .from(tableName)
        .update({
          synced_to_mailchimp: true,
          synced_to_mailchimp_at: new Date().toISOString(),
        })
        .eq('id', record.id);

      result.succeeded++;
      console.log(`Synced creator ${record.email} to Mailchimp from ${tableName}`);
    } catch (error) {
      result.failed++;
      const errorMessage = error instanceof Error ? error.message : String(error);
      result.errors.push({ id: record.id, error: errorMessage });
      console.error(`Failed to sync creator ${record.id} to Mailchimp:`, errorMessage);
    }
  }

  return result;
}

/**
 * Sync unsynced brand briefs to Mailchimp
 */
async function syncBrandBriefs(tableName: string): Promise<SyncResult> {
  const supabase = getSupabaseAdmin();
  const result: SyncResult = {
    processed: 0,
    succeeded: 0,
    failed: 0,
    errors: [],
  };

  // Fetch unsynced brand briefs
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: unsyncedRecords, error: fetchError } = await (supabase as any)
    .from(tableName)
    .select('*')
    .eq('synced_to_mailchimp', false)
    .eq('brief_status', 'submitted')
    .order('created_at', { ascending: true })
    .limit(BATCH_SIZE);

  if (fetchError) {
    console.error(`Failed to fetch unsynced brand briefs from ${tableName}:`, fetchError);
    return result;
  }

  if (!unsyncedRecords || unsyncedRecords.length === 0) {
    console.log(`No unsynced brand briefs in ${tableName}`);
    return result;
  }

  console.log(`Processing ${unsyncedRecords.length} unsynced brand briefs from ${tableName}...`);

  for (const record of unsyncedRecords) {
    result.processed++;

    try {
      // Add to Mailchimp audience
      await addBrandToMailchimp(
        {
          email: record.email,
          contactPerson: record.contact_person,
          phoneNumber: record.phone_number || '',
          brandName: record.brand_name,
        },
        {
          isPartialSubmission: false,
        }
      );

      // Update tags (remove partial, add full)
      await updateMailchimpTags({
        email: record.email,
        tagsToRemove: ['partial-brand-inquiry'],
        tagsToAdd: ['Brands-Find-Creators'],
      });

      // Mark as synced in database
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any)
        .from(tableName)
        .update({
          synced_to_mailchimp: true,
          synced_to_mailchimp_at: new Date().toISOString(),
        })
        .eq('id', record.id);

      result.succeeded++;
      console.log(`Synced brand ${record.email} to Mailchimp from ${tableName}`);
    } catch (error) {
      result.failed++;
      const errorMessage = error instanceof Error ? error.message : String(error);
      result.errors.push({ id: record.id, error: errorMessage });
      console.error(`Failed to sync brand ${record.id} to Mailchimp:`, errorMessage);
    }
  }

  return result;
}

/**
 * Combine results from multiple sync operations
 */
function combineResults(results: SyncResult[]): SyncResult {
  return results.reduce(
    (acc, result) => ({
      processed: acc.processed + result.processed,
      succeeded: acc.succeeded + result.succeeded,
      failed: acc.failed + result.failed,
      errors: [...acc.errors, ...result.errors],
    }),
    { processed: 0, succeeded: 0, failed: 0, errors: [] }
  );
}

/**
 * POST - Run Mailchimp sync cron job
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

    console.log('Starting Mailchimp sync cron job...');

    // Sync creators from both Nigeria and UK tables
    const creatorNgResult = await syncCreatorRegistrations('scn_creator_registrations_ng');
    const creatorUkResult = await syncCreatorRegistrations('scn_creator_registrations_uk');
    const creatorResult = combineResults([creatorNgResult, creatorUkResult]);

    // Sync brands from both Nigeria and UK tables
    const brandNgResult = await syncBrandBriefs('scn_brands_registration_ng');
    const brandUkResult = await syncBrandBriefs('scn_brands_registration_uk');
    const brandResult = combineResults([brandNgResult, brandUkResult]);

    const duration = Date.now() - startTime;

    const summary = {
      success: true,
      message: 'Mailchimp sync completed',
      duration_ms: duration,
      creators: {
        processed: creatorResult.processed,
        succeeded: creatorResult.succeeded,
        failed: creatorResult.failed,
        by_region: {
          nigeria: {
            processed: creatorNgResult.processed,
            succeeded: creatorNgResult.succeeded,
            failed: creatorNgResult.failed,
          },
          uk: {
            processed: creatorUkResult.processed,
            succeeded: creatorUkResult.succeeded,
            failed: creatorUkResult.failed,
          },
        },
      },
      brands: {
        processed: brandResult.processed,
        succeeded: brandResult.succeeded,
        failed: brandResult.failed,
        by_region: {
          nigeria: {
            processed: brandNgResult.processed,
            succeeded: brandNgResult.succeeded,
            failed: brandNgResult.failed,
          },
          uk: {
            processed: brandUkResult.processed,
            succeeded: brandUkResult.succeeded,
            failed: brandUkResult.failed,
          },
        },
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

    console.log('Mailchimp sync completed:', summary);

    return NextResponse.json(summary);
  } catch (error) {
    console.error('Mailchimp sync cron job failed:', error);
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

    // Get counts for Nigeria creators
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: creatorNgStats } = await (supabase as any)
      .from('scn_creator_registrations_ng')
      .select('synced_to_mailchimp')
      .eq('application_status', 'submitted');

    // Get counts for UK creators
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: creatorUkStats } = await (supabase as any)
      .from('scn_creator_registrations_uk')
      .select('synced_to_mailchimp')
      .eq('application_status', 'submitted');

    // Get counts for Nigeria brands
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: brandNgStats } = await (supabase as any)
      .from('scn_brands_registration_ng')
      .select('synced_to_mailchimp')
      .eq('brief_status', 'submitted');

    // Get counts for UK brands
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: brandUkStats } = await (supabase as any)
      .from('scn_brands_registration_uk')
      .select('synced_to_mailchimp')
      .eq('brief_status', 'submitted');

    const countSynced = (data: Array<{ synced_to_mailchimp: boolean }> | null) =>
      data?.filter(r => r.synced_to_mailchimp).length || 0;
    const countUnsynced = (data: Array<{ synced_to_mailchimp: boolean }> | null) =>
      data?.filter(r => !r.synced_to_mailchimp).length || 0;

    return NextResponse.json({
      success: true,
      stats: {
        creators: {
          nigeria: {
            synced: countSynced(creatorNgStats),
            unsynced: countUnsynced(creatorNgStats),
            total: creatorNgStats?.length || 0,
          },
          uk: {
            synced: countSynced(creatorUkStats),
            unsynced: countUnsynced(creatorUkStats),
            total: creatorUkStats?.length || 0,
          },
        },
        brands: {
          nigeria: {
            synced: countSynced(brandNgStats),
            unsynced: countUnsynced(brandNgStats),
            total: brandNgStats?.length || 0,
          },
          uk: {
            synced: countSynced(brandUkStats),
            unsynced: countUnsynced(brandUkStats),
            total: brandUkStats?.length || 0,
          },
        },
      },
    });
  } catch (error) {
    console.error('Failed to get Mailchimp sync status:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get sync status',
      },
      { status: 500 }
    );
  }
}
