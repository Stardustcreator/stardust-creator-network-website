/**
 * Google Sheets service for writing creator application data and brand brief data
 * Used to sync Nigeria creator applications and brand briefs to Google Sheets
 */

import { google } from 'googleapis';
import type { CreatorRegistrationRecord } from '@/lib/supabase';

// Google Sheets configuration from environment variables
const GOOGLE_SHEETS_SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const GOOGLE_SHEETS_SHEET_NAME = process.env.GOOGLE_SHEETS_SHEET_NAME || 'Nigeria Applications';
const GOOGLE_SHEETS_BRAND_SHEET_NAME =
  process.env.GOOGLE_SHEETS_BRAND_SHEET_NAME || 'brands registration ng';
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

// Brand Brief Google Sheets Integration

export interface BrandBriefRecord {
  // Brand Company Information
  brand_name: string;
  company_website: string;
  country: string;
  industry: string;
  business_type: string;
  contact_person: string;
  email: string;
  phone_number?: string;

  // Campaign Objectives
  campaign_name: string;
  campaign_goals: string[];
  campaign_type: string;
  target_audiences: string[];
  target_markets: string[];

  // Creator Preferences
  preferred_creator_tier: string;
  content_categories: string[];
  platform_focus: string[];
  brand_creator_fit?: string;

  // Budget & Payment Preference
  estimated_budget: string;
  payment_model: string;
  ongoing_collaboration: string;

  // Timeline & Deliverables
  campaign_start_date: string;
  campaign_duration: string;
  deliverables: string[];

  // Additional Information
  referral_source: string;
  collaboration_type: string;
  community_interest: string;
  additional_notes?: string;

  // Agreement & Submission
  authorized_confirmed: boolean;
  terms_agreed: boolean;

  // Metadata
  brief_status: string;
  location_detected: string;
  user_agent?: string;
  ip_address: string;
  referrer_url?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  submitted_at: string;
}

/**
 * Convert brand brief data to a flat array for Google Sheets
 * This formats the data as a single row with all fields
 */
function formatBrandBriefForSheet(data: BrandBriefRecord): string[] {
  return [
    // Timestamp
    new Date().toISOString(),
    // Brand Company Information
    data.brand_name || '',
    data.company_website || '',
    data.country || '',
    data.industry || '',
    data.business_type || '',
    data.contact_person || '',
    data.email || '',
    data.phone_number || '',
    // Campaign Objectives
    data.campaign_name || '',
    data.campaign_goals?.join(', ') || '',
    data.campaign_type || '',
    data.target_audiences?.join(', ') || '',
    data.target_markets?.join(', ') || '',
    // Creator Preferences
    data.preferred_creator_tier || '',
    data.content_categories?.join(', ') || '',
    data.platform_focus?.join(', ') || '',
    data.brand_creator_fit || '',
    // Budget & Payment Preference
    data.estimated_budget || '',
    data.payment_model || '',
    data.ongoing_collaboration || '',
    // Timeline & Deliverables
    data.campaign_start_date || '',
    data.campaign_duration || '',
    data.deliverables?.join(', ') || '',
    // Additional Information
    data.referral_source || '',
    data.collaboration_type || '',
    data.community_interest || '',
    data.additional_notes || '',
    // Agreement & Submission
    data.authorized_confirmed ? 'Yes' : 'No',
    data.terms_agreed ? 'Yes' : 'No',
    // Metadata
    data.brief_status || '',
    data.location_detected || '',
    data.ip_address || '',
    data.referrer_url || '',
    data.utm_source || '',
    data.utm_medium || '',
    data.utm_campaign || '',
  ];
}

/**
 * Get header row for the brand brief Google Sheet
 * Returns the header row as an array of strings
 */
function getBrandBriefHeaderRow(): string[] {
  return [
    'Timestamp',
    'Brand Name',
    'Company Website',
    'Country',
    'Industry',
    'Business Type',
    'Contact Person',
    'Email',
    'Phone Number',
    'Campaign Name',
    'Campaign Goals',
    'Campaign Type',
    'Target Audiences',
    'Target Markets',
    'Preferred Creator Tier',
    'Content Categories',
    'Platform Focus',
    'Brand Creator Fit',
    'Estimated Budget',
    'Payment Model',
    'Ongoing Collaboration',
    'Campaign Start Date',
    'Campaign Duration',
    'Deliverables',
    'Referral Source',
    'Collaboration Type',
    'Community Interest',
    'Additional Notes',
    'Authorized Confirmed',
    'Terms Agreed',
    'Brief Status',
    'Location Detected',
    'IP Address',
    'Referrer URL',
    'UTM Source',
    'UTM Medium',
    'UTM Campaign',
  ];
}

/**
 * Append brand brief data to Google Sheets
 * This function writes a new row to the specified Google Sheet
 */
export async function appendBrandBriefToGoogleSheets(data: BrandBriefRecord): Promise<void> {
  // Skip if Google Sheets is not configured
  if (!GOOGLE_SHEETS_SPREADSHEET_ID) {
    console.warn('Google Sheets not configured. Skipping Google Sheets sync for brand brief.');
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
      console.error('Failed to initialize Google Sheets client for brand brief:', clientError);
      return;
    }
    const range = `${GOOGLE_SHEETS_BRAND_SHEET_NAME}!A:AK`;

    // Check if sheet exists and has headers
    const existingData = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEETS_SPREADSHEET_ID,
      range: `${GOOGLE_SHEETS_BRAND_SHEET_NAME}!A1:AK1`,
    });

    // If sheet is empty or doesn't have headers, add them
    if (!existingData.data.values || existingData.data.values.length === 0) {
      await sheets.spreadsheets.values.append({
        spreadsheetId: GOOGLE_SHEETS_SPREADSHEET_ID,
        range: `${GOOGLE_SHEETS_BRAND_SHEET_NAME}!A1`,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values: [getBrandBriefHeaderRow()],
        },
      });
    }

    // Format and append the data row
    const rowData = formatBrandBriefForSheet(data);

    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEETS_SPREADSHEET_ID,
      range,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowData],
      },
    });

    console.log('Successfully appended brand brief to Google Sheets:', {
      spreadsheetId: GOOGLE_SHEETS_SPREADSHEET_ID,
      sheetName: GOOGLE_SHEETS_BRAND_SHEET_NAME,
      email: data.email,
    });
  } catch (error) {
    // Log error but don't throw - we don't want to break the Supabase flow
    // All errors are logged but never re-thrown to ensure the main application flow continues
    console.error('Failed to append brand brief to Google Sheets:', error);

    // For all errors, just log and continue
    // This ensures Supabase insertion still succeeds even if Google Sheets fails
  }
}
