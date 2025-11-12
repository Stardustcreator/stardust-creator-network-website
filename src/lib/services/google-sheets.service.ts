/**
 * Google Sheets service for writing creator application data
 * Used to sync Nigeria creator applications to Google Sheets
 */

import { google } from 'googleapis';
import type { CreatorRegistrationRecord } from '@/lib/supabase';

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
 * Append creator application data to Google Sheets
 * This function writes a new row to the specified Google Sheet
 */
export async function appendToGoogleSheets(data: CreatorRegistrationRecord): Promise<void> {
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
      // If client initialization fails (e.g., missing credentials), log and return
      // Don't throw - we don't want to break the main application flow
      console.error('Failed to initialize Google Sheets client:', clientError);
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
    });
  } catch (error) {
    // Log error but don't throw - we don't want to break the Supabase flow
    // All errors are logged but never re-thrown to ensure the main application flow continues
    console.error('Failed to append data to Google Sheets:', error);

    // For all errors, just log and continue
    // This ensures Supabase insertion still succeeds even if Google Sheets fails
    // Configuration errors are already handled in the client initialization try-catch above
  }
}
