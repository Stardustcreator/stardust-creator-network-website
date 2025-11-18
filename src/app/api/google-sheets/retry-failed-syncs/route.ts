/**
 * API Route: Retry Failed Google Sheets Syncs
 *
 * This endpoint processes pending failed syncs and retries them with exponential backoff.
 * It should be called by a cron job (e.g., every 5-10 minutes) or manually by admins.
 *
 * Features:
 * - Exponential backoff retry strategy
 * - Maximum 5 retry attempts before marking as permanently failed
 * - Fetches original records from Supabase
 * - Updates sync failure status after success/failure
 *
 * Security: Protected by cron secret or admin authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import {
  appendToGoogleSheets,
  appendBrandBriefToGoogleSheets,
} from '@/lib/services/google-sheets.service';
import type { BrandBriefRecord } from '@/lib/services/google-sheets.service';

// Maximum number of retry attempts before marking as permanently failed
const MAX_RETRY_ATTEMPTS = 5;

// Exponential backoff multipliers (in minutes)
const RETRY_DELAYS = [5, 15, 60, 240, 1440]; // 5m, 15m, 1h, 4h, 24h

interface SyncFailureRecord {
  id: string;
  record_type: 'creator_application' | 'brand_brief' | 'creator_survey';
  record_id: string;
  record_email: string;
  record_country: string;
  retry_count: number;
  error_message: string;
  error_details: Record<string, unknown>;
}

/**
 * Calculate next retry time based on retry count
 */
function calculateNextRetryTime(retryCount: number): string {
  const delayMinutes = RETRY_DELAYS[Math.min(retryCount, RETRY_DELAYS.length - 1)];
  return new Date(Date.now() + delayMinutes * 60 * 1000).toISOString();
}

/**
 * Fetch the original record from Supabase based on type
 */
async function fetchOriginalRecord(
  recordType: string,
  recordId: string,
  recordCountry: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any | null> {
  const supabase = getSupabaseAdmin();

  let tableName: string;
  if (recordType === 'creator_application') {
    tableName =
      recordCountry === 'Nigeria' ? 'creator_registrations_nigeria' : 'creator_registrations_uk';
  } else if (recordType === 'brand_brief') {
    tableName =
      recordCountry === 'Nigeria' ? 'brand_registrations_nigeria' : 'brand_registrations_uk';
  } else {
    tableName = 'scn_creator_surveys';
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from(tableName)
    .select('*')
    .eq('id', recordId)
    .single();

  if (error) {
    console.error(`Failed to fetch ${recordType} record ${recordId}:`, error);
    return null;
  }

  return data;
}

/**
 * Retry a single failed sync
 */
async function retrySingleSync(failure: SyncFailureRecord): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    // Fetch the original record
    const originalRecord = await fetchOriginalRecord(
      failure.record_type,
      failure.record_id,
      failure.record_country
    );

    if (!originalRecord) {
      return {
        success: false,
        error: 'Original record not found in database',
      };
    }

    // Retry the sync based on record type
    if (failure.record_type === 'creator_application') {
      await appendToGoogleSheets(originalRecord, true);
    } else if (failure.record_type === 'brand_brief') {
      // Transform the record to BrandBriefRecord format
      const brandBriefData: BrandBriefRecord = {
        brand_name: originalRecord.brand_name,
        company_website: originalRecord.company_website,
        country: originalRecord.country,
        industry: originalRecord.industry,
        business_type: originalRecord.business_type,
        contact_person: originalRecord.contact_person,
        email: originalRecord.email,
        phone_number: originalRecord.phone_number,
        campaign_name: originalRecord.campaign_name,
        campaign_goals: originalRecord.campaign_goals,
        campaign_type: originalRecord.campaign_type,
        target_audiences: originalRecord.target_audiences,
        target_markets: originalRecord.target_markets,
        preferred_creator_tier: originalRecord.preferred_creator_tier,
        content_categories: originalRecord.content_categories,
        platform_focus: originalRecord.platform_focus,
        brand_creator_fit: originalRecord.brand_creator_fit,
        estimated_budget: originalRecord.estimated_budget,
        payment_model: originalRecord.payment_model,
        ongoing_collaboration: originalRecord.ongoing_collaboration,
        campaign_start_date: originalRecord.campaign_start_date,
        campaign_duration: originalRecord.campaign_duration,
        deliverables: originalRecord.deliverables,
        referral_source: originalRecord.referral_source,
        collaboration_type: originalRecord.collaboration_type,
        community_interest: originalRecord.community_interest,
        additional_notes: originalRecord.additional_notes,
        authorized_confirmed: originalRecord.authorized_confirmed,
        terms_agreed: originalRecord.terms_agreed,
        brief_status: originalRecord.brief_status,
        location_detected: originalRecord.location_detected,
        user_agent: originalRecord.user_agent,
        ip_address: originalRecord.ip_address,
        referrer_url: originalRecord.referrer_url,
        utm_source: originalRecord.utm_source,
        utm_medium: originalRecord.utm_medium,
        utm_campaign: originalRecord.utm_campaign,
        submitted_at: originalRecord.submitted_at || originalRecord.created_at,
      };
      await appendBrandBriefToGoogleSheets(brandBriefData, failure.record_id, true);
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * POST - Process and retry failed syncs
 * Protected by cron secret or requires admin authentication
 */
export async function POST(request: NextRequest) {
  try {
    // Verify cron secret for security
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();

    // Fetch pending failed syncs that are ready for retry
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: failedSyncs, error: fetchError } = (await (supabase as any)
      .from('google_sheets_sync_failures')
      .select('*')
      .eq('status', 'pending')
      .lte('next_retry_at', new Date().toISOString())
      .lt('retry_count', MAX_RETRY_ATTEMPTS)
      .order('created_at', { ascending: true })
      .limit(50)) as { data: SyncFailureRecord[] | null; error: unknown };

    if (fetchError) {
      console.error('Failed to fetch sync failures:', fetchError);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch sync failures' },
        { status: 500 }
      );
    }

    if (!failedSyncs || failedSyncs.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No pending syncs to retry',
        processed: 0,
        succeeded: 0,
        failed: 0,
      });
    }

    console.log(`Processing ${failedSyncs.length} failed syncs...`);

    // Process each failed sync
    const results = {
      processed: 0,
      succeeded: 0,
      failed: 0,
      permanentlyFailed: 0,
    };

    for (const failure of failedSyncs) {
      results.processed++;

      // Update status to 'retrying'
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any)
        .from('google_sheets_sync_failures')
        .update({
          status: 'retrying',
          last_retry_at: new Date().toISOString(),
        })
        .eq('id', failure.id);

      // Attempt retry
      const result = await retrySingleSync(failure);

      if (result.success) {
        // Mark as succeeded
        results.succeeded++;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (supabase as any)
          .from('google_sheets_sync_failures')
          .update({
            status: 'succeeded',
            succeeded_at: new Date().toISOString(),
          })
          .eq('id', failure.id);

        console.log(`Successfully retried sync for ${failure.record_type} ${failure.record_id}`);
      } else {
        // Increment retry count
        const newRetryCount = failure.retry_count + 1;

        if (newRetryCount >= MAX_RETRY_ATTEMPTS) {
          // Mark as permanently failed
          results.permanentlyFailed++;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (supabase as any)
            .from('google_sheets_sync_failures')
            .update({
              status: 'failed_permanently',
              retry_count: newRetryCount,
              error_message: result.error || 'Max retry attempts exceeded',
            })
            .eq('id', failure.id);

          console.error(
            `Permanently failed sync for ${failure.record_type} ${failure.record_id} after ${newRetryCount} attempts`
          );
        } else {
          // Schedule next retry with exponential backoff
          results.failed++;
          const nextRetryAt = calculateNextRetryTime(newRetryCount);

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (supabase as any)
            .from('google_sheets_sync_failures')
            .update({
              status: 'pending',
              retry_count: newRetryCount,
              next_retry_at: nextRetryAt,
              error_message: result.error || 'Retry failed',
            })
            .eq('id', failure.id);

          console.log(
            `Retry ${newRetryCount}/${MAX_RETRY_ATTEMPTS} failed for ${failure.record_type} ${failure.record_id}. Next retry at ${nextRetryAt}`
          );
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Processed failed syncs',
      ...results,
    });
  } catch (error) {
    console.error('Error processing failed syncs:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

/**
 * GET - View failed syncs status
 * Returns summary and list of failed syncs
 */
export async function GET() {
  try {
    const supabase = getSupabaseAdmin();

    // Get summary statistics
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: stats } = (await (supabase as any)
      .from('google_sheets_sync_failures')
      .select('status')
      .then((result: { data: Array<{ status: string }> | null }) => {
        const data = result.data || [];
        const summary = {
          pending: data.filter(r => r.status === 'pending').length,
          retrying: data.filter(r => r.status === 'retrying').length,
          succeeded: data.filter(r => r.status === 'succeeded').length,
          failed_permanently: data.filter(r => r.status === 'failed_permanently').length,
          total: data.length,
        };
        return { data: summary };
      })) as { data: Record<string, number> | null };

    // Get recent failed syncs
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: recentFailures } = (await (supabase as any)
      .from('google_sheets_sync_failures')
      .select('*')
      .in('status', ['pending', 'failed_permanently'])
      .order('created_at', { ascending: false })
      .limit(20)) as { data: SyncFailureRecord[] | null };

    return NextResponse.json({
      success: true,
      stats: stats || {
        pending: 0,
        retrying: 0,
        succeeded: 0,
        failed_permanently: 0,
        total: 0,
      },
      recentFailures: recentFailures || [],
    });
  } catch (error) {
    console.error('Error fetching failed syncs:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
