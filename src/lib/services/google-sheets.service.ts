/**
 * Google Sheets service for writing creator application data
 * Used to sync Nigeria creator applications to Google Sheets
 *
 * Features:
 * - Automatic retry with exponential backoff
 * - Failed sync tracking in Supabase
 * - Detailed error logging and diagnostics
 */

import { google } from 'googleapis';
import type { CreatorRegistrationRecord } from '@/lib/supabase';
import { getSupabaseAdmin } from '@/lib/supabase';

// Google Sheets configuration from environment variables
const GOOGLE_SHEETS_SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const GOOGLE_SHEETS_SHEET_NAME = process.env.GOOGLE_SHEETS_SHEET_NAME || 'Nigeria Applications';
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

/**
 * Initialize Google Sheets API client using service account
 */
function getGoogleSheetsClient() {
  if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
    throw new Error(
      'Missing Google Sheets credentials. Please set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY environment variables.'
    );
  }

  const auth = new google.auth.JWT({
    email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: GOOGLE_PRIVATE_KEY,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
}

/**
 * Convert creator registration data to a flat array for Google Sheets
 * This formats the data as a single row with all fields
 */
function formatDataForSheet(data: CreatorRegistrationRecord): string[] {
  return [
    // Timestamp
    new Date().toISOString(),
    // Personal Information
    data.full_name || '',
    data.email || '',
    data.phone_number || '',
    data.country || '',
    data.city || '',
    data.age_range || '',
    // Creator Identity
    data.creator_handle || '',
    data.primary_platforms?.join(', ') || '',
    data.social_links?.map(link => `${link.platform}: ${link.url}`).join('; ') || '',
    data.audience_size || '',
    data.content_categories?.join(', ') || '',
    data.creator_type || '',
    // Monetization Experience
    data.worked_with_brands ? 'Yes' : 'No',
    data.brand_example || '',
    data.fee_range || '',
    data.monetization_methods?.join(', ') || '',
    data.opportunity_interests?.join(', ') || '',
    // Education & Tools Interest
    data.creator_os_features?.join(', ') || '',
    data.community_interest || '',
    // Verification & Agreement
    data.authenticity_confirmed ? 'Yes' : 'No',
    data.terms_agreed ? 'Yes' : 'No',
    // Metadata
    data.application_status || '',
    data.location_detected || '',
    data.ip_address || '',
    data.referrer_url || '',
    data.utm_source || '',
    data.utm_medium || '',
    data.utm_campaign || '',
  ];
}

/**
 * Get or create header row for the Google Sheet
 * Returns the header row as an array of strings
 */
function getHeaderRow(): string[] {
  return [
    'Timestamp',
    'Full Name',
    'Email',
    'Phone Number',
    'Country',
    'City',
    'Age Range',
    'Creator Handle',
    'Primary Platforms',
    'Social Links',
    'Audience Size',
    'Content Categories',
    'Creator Type',
    'Worked with Brands',
    'Brand Example',
    'Fee Range',
    'Monetization Methods',
    'Opportunity Interests',
    'Creator OS Features',
    'Community Interest',
    'Authenticity Confirmed',
    'Terms Agreed',
    'Application Status',
    'Location Detected',
    'IP Address',
    'Referrer URL',
    'UTM Source',
    'UTM Medium',
    'UTM Campaign',
  ];
}

/**
 * Track a failed Google Sheets sync in Supabase for retry
 */
async function trackSyncFailure(
  recordType: 'creator_application' | 'creator_survey',
  recordId: string,
  recordEmail: string,
  recordCountry: string,
  error: unknown
): Promise<void> {
  try {
    const supabase = getSupabaseAdmin();
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorDetails = {
      name: error instanceof Error ? error.name : 'UnknownError',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    };

    // Calculate next retry time (5 minutes from now for first attempt)
    const nextRetryAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: insertError } = await (supabase as any)
      .from('google_sheets_sync_failures')
      .insert({
        record_type: recordType,
        record_id: recordId,
        record_email: recordEmail,
        record_country: recordCountry,
        error_message: errorMessage,
        error_details: errorDetails,
        retry_count: 0,
        next_retry_at: nextRetryAt,
        status: 'pending',
      });

    if (insertError) {
      console.error('Failed to track sync failure:', insertError);
    } else {
      console.log(
        `Tracked sync failure for ${recordType} ${recordId} - will retry at ${nextRetryAt}`
      );
    }
  } catch (trackingError) {
    // Even if tracking fails, log it but don't throw
    console.error('Error while tracking sync failure:', trackingError);
  }
}

/**
 * Append creator application data to Google Sheets
 * This function writes a new row to the specified Google Sheet
 * If it fails, it tracks the failure for automatic retry
 */
export async function appendToGoogleSheets(
  data: CreatorRegistrationRecord,
  isRetry = false
): Promise<void> {
  // Skip if Google Sheets is not configured
  if (!GOOGLE_SHEETS_SPREADSHEET_ID) {
    console.warn('Google Sheets not configured. Skipping Google Sheets sync.');
    return;
  }

  try {
    // Initialize Google Sheets client - this may throw if credentials are missing
    let sheets;
    try {
      sheets = getGoogleSheetsClient();
    } catch (clientError) {
      // If client initialization fails (e.g., missing credentials), log and track failure
      console.error('Failed to initialize Google Sheets client:', clientError);

      // Track this failure if we have a record ID and this isn't already a retry
      if (data.id && !isRetry) {
        await trackSyncFailure(
          'creator_application',
          data.id,
          data.email || 'unknown',
          data.country || 'unknown',
          clientError
        );
      }
      return;
    }
    const range = `${GOOGLE_SHEETS_SHEET_NAME}!A:AB`;

    // Check if sheet exists and has headers
    const existingData = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEETS_SPREADSHEET_ID,
      range: `${GOOGLE_SHEETS_SHEET_NAME}!A1:AB1`,
    });

    // If sheet is empty or doesn't have headers, add them
    if (!existingData.data.values || existingData.data.values.length === 0) {
      await sheets.spreadsheets.values.append({
        spreadsheetId: GOOGLE_SHEETS_SPREADSHEET_ID,
        range: `${GOOGLE_SHEETS_SHEET_NAME}!A1`,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values: [getHeaderRow()],
        },
      });
    }

    // Format and append the data row
    const rowData = formatDataForSheet(data);

    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEETS_SPREADSHEET_ID,
      range,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowData],
      },
    });

    console.log('Successfully appended data to Google Sheets:', {
      spreadsheetId: GOOGLE_SHEETS_SPREADSHEET_ID,
      sheetName: GOOGLE_SHEETS_SHEET_NAME,
      email: data.email,
      isRetry,
    });
  } catch (error) {
    // Enhanced error logging with detailed diagnostics
    const errorDetails = {
      spreadsheetId: GOOGLE_SHEETS_SPREADSHEET_ID,
      sheetName: GOOGLE_SHEETS_SHEET_NAME,
      email: data.email,
      recordId: data.id,
      errorMessage: error instanceof Error ? error.message : String(error),
      errorName: error instanceof Error ? error.name : 'UnknownError',
      isRetry,
      timestamp: new Date().toISOString(),
    };

    console.error('Failed to append data to Google Sheets:', errorDetails);

    // Track this failure if we have a record ID and this isn't already a retry
    if (data.id && !isRetry) {
      await trackSyncFailure(
        'creator_application',
        data.id,
        data.email || 'unknown',
        data.country || 'unknown',
        error
      );
    }

    // Don't throw - we don't want to break the Supabase flow
    // The failure is now tracked and will be retried automatically
  }
}
