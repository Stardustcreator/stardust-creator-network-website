/**
 * Cron Job: Sync to Google Sheets
 *
 * This endpoint syncs unsynced records from Supabase to Google Sheets.
 * It runs every 4 hours via Vercel Cron.
 *
 * Syncs:
 * - Creator applications (Nigeria only)
 *
 * Brand brief sync was removed when brand brief submissions stopped writing
 * to Supabase (they now go straight to the admin backend).
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { appendToGoogleSheets } from '@/lib/services/google-sheets.service';

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
      total: {
        processed: creatorResult.processed,
        succeeded: creatorResult.succeeded,
        failed: creatorResult.failed,
      },
      errors: creatorResult.errors.length > 0 ? creatorResult.errors : undefined,
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

    const creatorSynced =
      creatorStats?.filter((r: { synced_to_google_sheets: boolean }) => r.synced_to_google_sheets)
        .length || 0;
    const creatorUnsynced =
      creatorStats?.filter((r: { synced_to_google_sheets: boolean }) => !r.synced_to_google_sheets)
        .length || 0;

    return NextResponse.json({
      success: true,
      stats: {
        creators: {
          synced: creatorSynced,
          unsynced: creatorUnsynced,
          total: creatorSynced + creatorUnsynced,
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
