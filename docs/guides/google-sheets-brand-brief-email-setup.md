# Email Notifications for Brand Brief Submissions

This guide explains how to set up automatic email notifications when new brand briefs are submitted through your Nigeria form.

## What This Does

When a brand submits a brief through your website:

1. The data is saved to your Google Sheet (in the "brands registration ng" tab)
2. An automatic email is sent to you with all the brand's information
3. The email includes details about the brand, their campaign, budget, timeline, and what creators they're looking for

## Simple Explanation

Think of this like a doorbell for your spreadsheet. Every time a new row is added (a new brand brief comes in), it "rings" by sending you an email with all the details. You don't have to keep checking your spreadsheet - the information comes to you!

## Setup Steps

### Step 1: Open Google Apps Script

1. Open your Google Sheets spreadsheet
2. Click on **Extensions** in the menu at the top
3. Click on **Apps Script**
4. A new tab will open with a code editor

### Step 2: Paste the Script

1. In the code editor, you'll see some default code
2. **Delete all the default code** (select all with Ctrl+A or Cmd+A, then delete)
3. Open the file `docs/google-sheets-brand-brief-email-script.js`
4. **Copy all the code** from that file
5. **Paste it** into the Google Apps Script editor

### Step 3: Configure Your Settings

At the top of the script, you'll see a section that looks like this:

```javascript
const CONFIG = {
  SHEET_NAME: 'brands registration ng',
  NOTIFICATION_EMAILS: 'your-email@example.com',
  EMAIL_SUBJECT: 'New Brand Brief Submitted - Nigeria',
  COMPANY_NAME: 'Stardust Creator Network',
  CHECK_INTERVAL_MINUTES: 5,
};
```

**Update these settings:**

1. **SHEET_NAME**: Leave as `'brands registration ng'` (unless you used a different name)
2. **NOTIFICATION_EMAILS**: Change to your email address
   - For one email: `'you@example.com'`
   - For multiple emails: `'you@example.com, teammate@example.com, boss@example.com'`
3. **EMAIL_SUBJECT**: Change if you want a different subject line
4. **COMPANY_NAME**: Change to your company name
5. **CHECK_INTERVAL_MINUTES**: How often to check for new submissions (5 minutes is good)

### Step 4: Save the Script

1. Click the disk/save icon at the top (or press Ctrl+S / Cmd+S)
2. Give your project a name like "Brand Brief Email Notifier"
3. Click OK

### Step 5: Run the Setup

1. At the top of the editor, you'll see a dropdown that says "Select function"
2. Click it and select **setup**
3. Click the **Run** button (looks like a play button)
4. Google will ask you to authorize the script:
   - Click **Review permissions**
   - Choose your Google account
   - Click **Advanced** (at the bottom)
   - Click **Go to [Your Project Name] (unsafe)**
   - Click **Allow**
5. Wait a few seconds - you should see "Execution completed" at the bottom

### Step 6: Test It!

To make sure it's working, you can send a test email:

1. In the function dropdown, select **testEmailNotification**
2. Click the **Run** button
3. Check your email - you should receive an email with data from the most recent brand brief in your sheet

If you see the email, congratulations - it's working!

## What the Email Looks Like

The email will be nicely formatted with:

- **Brand Information**: Name, industry, website, business type
- **Contact Details**: Person's name, email, phone number
- **Campaign Overview**: Campaign name, type, goals, target audience
- **Creator Requirements**: What kind of creators they want, content categories, platforms
- **Budget & Timeline**: Budget range, payment model, start date, duration
- **Additional Information**: How they found you, their notes
- **Submission Details**: When they submitted, tracking information

All in a clean, professional format with color-coded sections.

## How Often Will I Get Emails?

The script checks for new brand briefs every 5 minutes (by default). If 3 brands submit within those 5 minutes, you'll get 3 separate emails.

## Managing the Script

### View Current Status

To see what's happening:

1. In the function dropdown, select **viewStatus**
2. Click **Run**
3. Click **View** > **Logs** to see the status information

### Stop Email Notifications

If you want to temporarily stop notifications:

1. Click on the clock icon (Triggers) on the left sidebar
2. Find the trigger for `checkForNewRows`
3. Click the three dots on the right
4. Click **Delete trigger**

### Start Notifications Again

If you stopped notifications and want to start them again:

1. In the function dropdown, select **setup**
2. Click **Run**
3. Notifications will resume

### Change Email Settings

If you want to change your email address or add more recipients:

1. Update the `NOTIFICATION_EMAILS` in the CONFIG section
2. Save the script (Ctrl+S / Cmd+S)
3. That's it - the changes take effect immediately

## Troubleshooting

### Not Receiving Emails

**Check your spam folder** - Sometimes Google sends these emails to spam the first time.

**Verify the email address** in the CONFIG section is correct.

**Run the test function**:

1. Select `testEmailNotification` from the dropdown
2. Click Run
3. If you get an error, check the execution log for details

**Check if you have data** in your sheet - The script only sends emails when there's data.

### Receiving Duplicate Emails

This might happen if you run the setup function multiple times. To fix:

1. Click the clock icon (Triggers) on the left
2. Delete all triggers
3. Run the setup function once

### Want to Process Old Rows

If you have old brand briefs in the sheet that you want to receive emails for:

1. Select `resetLastProcessedRow` from the dropdown
2. Click Run
3. Within 5 minutes, you'll get emails for all rows

**Warning**: This will send an email for EVERY row in your sheet, so use carefully!

### Errors in the Log

To view errors:

1. Click **View** > **Logs** (or **Executions** to see history)
2. Look for error messages in red
3. Common issues:
   - Sheet name doesn't match - Check `SHEET_NAME` in CONFIG
   - No data in sheet - Add at least one row
   - Permission issues - Run setup again and grant permissions

## Advanced: Customizing the Email

If you want to change what information appears in the email:

1. Find the `buildEmailBody` function in the script (around line 159)
2. This function creates the HTML email
3. You can:
   - Reorder sections
   - Remove fields you don't need
   - Change colors (look for `#667eea` and `#764ba2`)
   - Modify the text

## Security & Privacy

- The script only has access to this specific Google Sheet
- Emails are sent through your Google account
- No data is sent to external services
- The script runs on Google's servers, not your computer
- You can review all the code to see exactly what it does

## Important Notes

- The script checks every 5 minutes by default (you can change this in CONFIG)
- You won't get instant notifications - there's a small delay (up to 5 minutes)
- If Google Sheets is down, notifications will be delayed until it's back up
- The script tracks which rows it has already processed, so you won't get duplicate emails
- You can have multiple people receive the same notifications by listing multiple emails

## Questions?

**Can I use this for creator applications too?**
Yes! You can set up a similar script for the creator applications sheet. Just duplicate this script and change the SHEET_NAME to your creator applications sheet name.

**Can I customize the email design?**
Yes! The email is written in HTML. If you know HTML/CSS, you can modify the `buildEmailBody` function.

**Will this cost money?**
No! Google Apps Script is free for personal use. There are limits (like 100 emails per day), but you're unlikely to hit them.

**Can I send to different emails based on the brand?**
The current script sends to the same email(s) for all brands. If you need custom routing based on brand details, you would need to modify the script.

**What if I want instant notifications?**
Google Apps Script's shortest interval is 1 minute. If you need instant notifications, you would need a different solution (like webhook to email services).

---

Need help? Check the execution logs in Apps Script for detailed error messages, or contact your developer.
