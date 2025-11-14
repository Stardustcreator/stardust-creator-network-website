# Google Sheets Integration Setup

This guide explains how to set up Google Sheets integration for Nigeria creator applications. The integration automatically syncs form submissions to a Google Sheet while maintaining the existing Supabase database feed.

## Overview

When a creator submits an application from Nigeria, the system:

1. Saves the data to Supabase (as before)
2. Also appends a row to your Google Sheet (new feature)

The Google Sheets sync is non-blocking - if it fails, the Supabase save still succeeds, ensuring no data loss.

## Prerequisites

- A Google account with access to Google Cloud Console
- A Google Sheet where you want to store the data
- Basic familiarity with Google Cloud Platform

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note your project name for later

## Step 2: Enable Google Sheets API

1. In your Google Cloud project, go to **APIs & Services** > **Library**
2. Search for "Google Sheets API"
3. Click on it and press **Enable**

## Step 3: Create a Service Account

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **Service Account**
3. Fill in the service account details:
   - **Service account name**: `stardust-sheets-sync` (or any name you prefer)
   - **Service account ID**: Will be auto-generated
   - **Description**: "Service account for syncing creator applications to Google Sheets"
4. Click **Create and Continue**
5. Skip the optional steps and click **Done**

## Step 4: Create and Download Service Account Key

1. In the **Credentials** page, find your newly created service account
2. Click on the service account email
3. Go to the **Keys** tab
4. Click **Add Key** > **Create new key**
5. Select **JSON** format
6. Click **Create** - this will download a JSON file

**Important**: Keep this JSON file secure! It contains credentials that allow access to your Google Sheets.

## Step 5: Share Your Google Sheet

1. Open your Google Sheet (or create a new one)
2. Click the **Share** button (top right)
3. Add the service account email (found in the JSON file as `client_email`)
4. Give it **Editor** permissions
5. Click **Send** (you can uncheck "Notify people" if you want)

## Step 6: Get Your Spreadsheet ID

1. Open your Google Sheet
2. Look at the URL - it will look like:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
   ```
3. Copy the `SPREADSHEET_ID_HERE` part - this is your Spreadsheet ID

## Step 7: Configure Environment Variables

Add these to your `.env.local` file (or your deployment platform's environment variables):

```bash
# Google Sheets Configuration
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here
GOOGLE_SHEETS_SHEET_NAME=Nigeria Applications
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
```

### Getting the Values

1. **GOOGLE_SHEETS_SPREADSHEET_ID**: From Step 6 above
2. **GOOGLE_SHEETS_SHEET_NAME**: The name of the tab in your sheet (default: "Nigeria Applications")
3. **GOOGLE_SERVICE_ACCOUNT_EMAIL**: Found in the downloaded JSON file as `client_email`
4. **GOOGLE_PRIVATE_KEY**: Found in the downloaded JSON file as `private_key`
   - **Important**: Keep the quotes and preserve the `\n` characters
   - The private key should be on a single line with `\n` where line breaks occur

### Example

```bash
GOOGLE_SHEETS_SPREADSHEET_ID=1a2b3c4d5e6f7g8h9i0j
GOOGLE_SHEETS_SHEET_NAME=Nigeria Applications
GOOGLE_SERVICE_ACCOUNT_EMAIL=stardust-sheets-sync@my-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

## Step 8: Test the Integration

1. Start your development server: `npm run dev`
2. Submit a test creator application from the Nigeria form
3. Check your Google Sheet - you should see a new row with the application data
4. Check your server logs for any errors

## Sheet Structure

The integration automatically creates a header row with these columns:

- Timestamp
- Full Name
- Email
- Phone Number
- Country
- City
- Age Range
- Creator Handle
- Primary Platforms
- Social Links
- Audience Size
- Content Categories
- Creator Type
- Worked with Brands
- Brand Example
- Fee Range
- Monetization Methods
- Opportunity Interests
- Creator OS Features
- Community Interest
- Authenticity Confirmed
- Terms Agreed
- Application Status
- Location Detected
- IP Address
- Referrer URL
- UTM Source
- UTM Medium
- UTM Campaign

## Troubleshooting

### "Missing Google Sheets credentials" Error

- Check that all four environment variables are set
- Verify the private key includes the quotes and `\n` characters
- Restart your development server after adding environment variables

### "Permission denied" Error

- Verify the service account email has Editor access to the sheet
- Check that the Spreadsheet ID is correct
- Ensure the Google Sheets API is enabled in your project

### Data Not Appearing in Sheet

- Check server logs for error messages
- Verify the sheet name matches `GOOGLE_SHEETS_SHEET_NAME`
- Ensure the sheet exists and is accessible
- Try creating a new sheet tab with the exact name specified

### Private Key Format Issues

The private key must be:

- Wrapped in quotes
- On a single line
- Include `\n` characters where line breaks should be

If you're having issues, try copying the private key from the JSON file exactly as it appears, then wrap it in quotes.

## Security Best Practices

1. **Never commit the service account JSON file or private key to version control**
2. **Use environment variables** for all credentials
3. **Limit service account permissions** - only give it access to the specific sheet it needs
4. **Rotate credentials** periodically for security
5. **Monitor access** in Google Cloud Console

## Optional: Disable Google Sheets Sync

If you want to disable Google Sheets sync temporarily:

1. Remove or comment out the `GOOGLE_SHEETS_SPREADSHEET_ID` environment variable
2. The system will skip Google Sheets sync but continue saving to Supabase
3. No errors will be thrown - it will just log a warning

## Support

If you encounter issues:

1. Check the server logs for detailed error messages
2. Verify all environment variables are set correctly
3. Test the service account access manually in Google Cloud Console
4. Review the troubleshooting section above
