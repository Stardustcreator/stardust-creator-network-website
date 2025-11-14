# Brand Brief Email Notifications - Quick Start Checklist

This is a simple checklist to help you set up email notifications for brand briefs in under 10 minutes.

## Before You Start

Make sure you've already completed:

- [ ] Google Sheets integration for brand briefs (see `google-sheets-brand-brief-setup.md`)
- [ ] At least one brand brief submitted to test with

## Setup Checklist

### Part 1: Install the Script (5 minutes)

- [ ] **Step 1**: Open your Google Sheets spreadsheet
- [ ] **Step 2**: Click **Extensions** → **Apps Script**
- [ ] **Step 3**: Delete all the default code in the editor
- [ ] **Step 4**: Open the file `docs/google-sheets-brand-brief-email-script.js`
- [ ] **Step 5**: Copy all the code from that file
- [ ] **Step 6**: Paste it into the Apps Script editor

### Part 2: Configure Settings (2 minutes)

- [ ] **Step 7**: Find the `CONFIG` section at the top of the code
- [ ] **Step 8**: Change `NOTIFICATION_EMAILS` to your email address
  ```javascript
  NOTIFICATION_EMAILS: 'youremail@example.com',
  ```
- [ ] **Step 9**: Verify `SHEET_NAME` matches your sheet tab name
  ```javascript
  SHEET_NAME: 'brands registration ng',
  ```
- [ ] **Step 10**: Save the script (click the disk icon or Ctrl+S/Cmd+S)
- [ ] **Step 11**: Name your project something like "Brand Brief Notifier"

### Part 3: Activate (3 minutes)

- [ ] **Step 12**: In the function dropdown at the top, select **setup**
- [ ] **Step 13**: Click the **Run** button (play icon)
- [ ] **Step 14**: When prompted, click **Review permissions**
- [ ] **Step 15**: Choose your Google account
- [ ] **Step 16**: Click **Advanced**
- [ ] **Step 17**: Click **Go to [Project Name] (unsafe)**
- [ ] **Step 18**: Click **Allow**
- [ ] **Step 19**: Wait for "Execution completed" message

### Part 4: Test (1 minute)

- [ ] **Step 20**: In the function dropdown, select **testEmailNotification**
- [ ] **Step 21**: Click the **Run** button
- [ ] **Step 22**: Check your email inbox
- [ ] **Step 23**: Verify you received a test email with brand brief details

## Success!

If you received the test email, you're all set! From now on:

- Every time a brand submits a brief through your Nigeria form
- Within 5 minutes, you'll receive an email
- With all the brand's information in a nicely formatted message

## Quick Settings Reference

| Setting                  | What It Does                      | Example                                                      |
| ------------------------ | --------------------------------- | ------------------------------------------------------------ |
| `SHEET_NAME`             | Which sheet tab to monitor        | `'brands registration ng'`                                   |
| `NOTIFICATION_EMAILS`    | Who gets the emails               | `'you@example.com'` or `'you@example.com, team@example.com'` |
| `EMAIL_SUBJECT`          | Email subject line                | `'New Brand Brief Submitted - Nigeria'`                      |
| `COMPANY_NAME`           | Your company name in the email    | `'Stardust Creator Network'`                                 |
| `CHECK_INTERVAL_MINUTES` | How often to check for new briefs | `5` (recommended)                                            |

## Common First-Time Issues

### Issue: "Authorization required" error

**Solution**: This is normal. Follow steps 14-18 above to grant permissions.

### Issue: Can't find the setup function

**Solution**: Make sure you saved the script first (Step 10), then refresh the page.

### Issue: Test email not arriving

**Solution**:

1. Check your spam folder
2. Wait 2-3 minutes (sometimes delayed)
3. Verify your email address is spelled correctly in CONFIG
4. Make sure you have at least one row of data in your sheet

### Issue: "Sheet not found" error

**Solution**: Check that `SHEET_NAME` in CONFIG exactly matches your sheet tab name (including spaces and capitalization).

## Need More Help?

See the detailed guide: `docs/google-sheets-brand-brief-email-setup.md`

## What's Next?

Want to set up email notifications for creator applications too? You can use the same process with a duplicate script pointing to your creator applications sheet tab.
