# Google Sheets Integration for Brand Briefs

This guide explains how to set up Google Sheets integration for Nigeria brand briefs (the "Find a Creator" form). When brands submit their brief, the information will be saved both in your Supabase database AND in your Google Sheets spreadsheet.

## What This Does

When a brand from Nigeria fills out the "Find a Creator" form:

1. The information is saved to Supabase (your main database) - as before
2. A copy is also sent to your Google Sheets spreadsheet - NEW!

If Google Sheets fails for any reason, the form will still work and save to Supabase. This ensures you never lose data.

## Prerequisites

You should have already completed the basic Google Sheets setup from the main creator applications guide. If you haven't, please complete these steps first:

1. Create a Google Cloud Project
2. Enable Google Sheets API
3. Create a Service Account
4. Download the Service Account JSON key
5. Get your Spreadsheet ID

Refer to `docs/google-sheets-setup.md` for detailed instructions on these steps.

## Setup Steps

### Step 1: Create the Sheet Tab

1. Open your Google Sheets spreadsheet (the same one you're using for creator applications)
2. At the bottom, click the "+" button to create a new sheet tab
3. Name this tab: **brands registration ng** (exactly as written, with spaces and lowercase)
4. Leave it empty - the system will automatically add headers when the first brand brief is submitted

### Step 2: Add Environment Variable (Optional)

If you want to use a different sheet name than "brands registration ng", add this to your `.env.local` file:

```bash
# Google Sheets Configuration for Brand Briefs
GOOGLE_SHEETS_BRAND_SHEET_NAME=your-custom-sheet-name
```

If you DON'T add this variable, it will use "brands registration ng" by default.

### Step 3: Deploy

If you're using Vercel (or another hosting platform):

1. Add the environment variable if you created a custom name:
   - Go to your project settings
   - Find Environment Variables
   - Add `GOOGLE_SHEETS_BRAND_SHEET_NAME` with your sheet name

2. Redeploy your application (or it will deploy automatically if you push to your main branch)

### Step 4: Test

1. Go to your website's brand brief form: `yourwebsite.com/brands/brief/nigeria`
2. Fill out the form with test information
3. Submit the form
4. Check your Google Sheet - you should see a new row with all the brand's information!

## What Information Is Saved

The Google Sheet will have the following columns:

**Brand Information:**

- Timestamp
- Brand Name
- Company Website
- Country
- Industry
- Business Type
- Contact Person
- Email
- Phone Number

**Campaign Details:**

- Campaign Name
- Campaign Goals
- Campaign Type
- Target Audiences
- Target Markets

**Creator Preferences:**

- Preferred Creator Tier
- Content Categories
- Platform Focus
- Brand Creator Fit

**Budget & Payment:**

- Estimated Budget
- Payment Model
- Ongoing Collaboration

**Timeline:**

- Campaign Start Date
- Campaign Duration
- Deliverables

**Additional Information:**

- Referral Source
- Collaboration Type
- Community Interest
- Additional Notes

**Agreements:**

- Authorized Confirmed
- Terms Agreed

**Tracking Information:**

- Brief Status
- Location Detected
- IP Address
- Referrer URL
- UTM Source
- UTM Medium
- UTM Campaign

## Troubleshooting

### "Google Sheets not configured" message in logs

This means the main Google Sheets credentials aren't set up. Make sure you have:

- `GOOGLE_SHEETS_SPREADSHEET_ID`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`

Refer to `docs/google-sheets-setup.md` for setup instructions.

### Data not appearing in the sheet

1. Check that the sheet tab name is exactly: **brands registration ng** (or matches your custom `GOOGLE_SHEETS_BRAND_SHEET_NAME`)
2. Check your server logs for error messages
3. Verify the service account has Editor permissions on the spreadsheet
4. Try deleting the sheet tab and letting the system create it automatically on the next submission

### Only Nigeria briefs are synced

This is by design. Currently, only brand briefs from Nigeria are synced to Google Sheets. If you want to sync briefs from other countries, you would need to either:

- Use the same sheet for all countries
- Create separate sheets for each country
- Contact your developer to extend the functionality

## Security Notes

- The same Google Sheets credentials are used for both creator applications and brand briefs
- Never commit your service account JSON file or private key to version control
- Keep your credentials in environment variables only
- The service account only has access to the specific spreadsheet you shared with it

## Using the Same Spreadsheet vs Separate Spreadsheets

**Same Spreadsheet (Recommended):**

- Both creator applications and brand briefs go to the same Google Sheets file
- They use different sheet tabs (different pages within the file)
- Easier to manage with one set of credentials

**Separate Spreadsheets:**

- If you want brand briefs in a completely different file, update `GOOGLE_SHEETS_SPREADSHEET_ID` to point to a different spreadsheet ID
- You'll need to share that spreadsheet with your service account too

## Need Help?

If you're having issues:

1. Check your server logs for error messages
2. Verify all environment variables are set correctly
3. Make sure the service account has Editor permissions
4. Try the main creator application form to verify basic Google Sheets integration works
5. Refer to `docs/google-sheets-setup.md` for the initial setup
