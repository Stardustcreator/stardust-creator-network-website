# Google Sheets Email Notification Setup

This guide explains how to set up automatic email notifications that alert you whenever a new creator application is added to your Google Sheet.

## What This Script Does

The script monitors your "Nigeria Applications" Google Sheet and automatically sends email notifications to specified recipients whenever a new row (creator application) is added. It checks for new rows every 5 minutes and sends detailed information about each new application.

## How It Works (Simple Explanation)

Think of this script like a security guard that watches your sheet:

1. **The Guard Checks Regularly**: Every 5 minutes, the script counts how many rows are in your sheet
2. **It Remembers the Last Count**: The script remembers how many rows were there the last time it checked
3. **It Spots New Additions**: If the count increases, it knows new applications were added
4. **It Sends Alerts**: When it finds new rows, it sends you an email with all the details

## Step-by-Step Setup

### Step 1: Open Apps Script

1. Open your Google Sheet (the one with creator applications)
2. Click on **Extensions** in the menu bar
3. Select **Apps Script** from the dropdown menu
4. A new tab will open with the Apps Script editor

### Step 2: Add the Script Code

1. In the Apps Script editor, you'll see a default function - delete everything in the editor
2. Open the file `docs/google-sheets-email-notification-script.js` from this project
3. Copy the entire contents of that file
4. Paste it into the Apps Script editor
5. Click **Save** (the floppy disk icon) or press `Ctrl+S` (Windows) / `Cmd+S` (Mac)

### Step 3: Configure Email Recipients

1. In the script, find the section that says `CONFIGURATION` near the top
2. Look for the `RECIPIENT_EMAILS` array - it will look like this:

```javascript
const RECIPIENT_EMAILS = ['your-email@example.com', 'another-email@example.com'];
```

3. Replace `'your-email@example.com'` with your actual email address
4. If you want multiple people to receive notifications, add more email addresses (one per line, separated by commas)
5. Remove the example email addresses that you don't need
6. Save the script again

**Example:**

```javascript
const RECIPIENT_EMAILS = ['john@example.com', 'jane@example.com', 'team@example.com'];
```

### Step 4: Verify Sheet Name

1. Still in the configuration section, check the `SHEET_NAME` variable
2. Make sure it matches the exact name of the tab in your Google Sheet
3. The default is `'Nigeria Applications'` - if your sheet tab has a different name, change it here
4. The name is case-sensitive, so it must match exactly

### Step 5: Run the Setup Function

1. In the Apps Script editor, look at the top toolbar
2. You'll see a dropdown that says "Select function" - click it
3. Select `setup` from the list
4. Click the **Run** button (the play icon) next to the dropdown
5. You'll be asked to authorize the script - click **Review Permissions**
6. Select your Google account
7. You'll see a warning that says "Google hasn't verified this app" - this is normal for custom scripts
8. Click **Advanced** and then **Go to [Your Project Name] (unsafe)**
9. Click **Allow** to grant the necessary permissions

**What the setup function does:**

- Creates an automatic timer that checks for new rows every 5 minutes
- Records the current number of rows so it knows where to start monitoring
- Sends you a test email to confirm everything is working

### Step 6: Verify It's Working

1. Check your email inbox - you should receive a test email saying "Setup Complete"
2. If you received the email, the script is working correctly!
3. If you didn't receive an email, check your spam folder
4. Also check the Apps Script execution log (View > Execution log) for any error messages

## How to Test

To test that notifications are working:

1. In your Google Sheet, manually add a new row with some test data
2. Wait up to 5 minutes (or run the manual check - see below)
3. You should receive an email with the details of the new row

**To check immediately without waiting:**

1. In Apps Script, select the `manualCheck` function from the dropdown
2. Click **Run**
3. This will check for new rows right away and send notifications if any are found

## Customization Options

### Change Check Frequency

By default, the script checks every 5 minutes. To change this:

1. Find the line: `const CHECK_INTERVAL_MINUTES = 5;`
2. Change the number to your preferred interval (in minutes)
3. Save the script
4. Run the `setup()` function again to apply the new interval

**Note:** Google Apps Script has limits on how often triggers can run. The minimum is 1 minute, but very frequent checks may hit quota limits.

### Change Email Format

The email includes all the application details in a simple text format. If you want to customize what information is included or how it's formatted, you can modify the `sendNewRowNotification` function in the script.

### Reset Monitoring

If you want the script to ignore all existing rows and only notify about future additions:

1. In Apps Script, select the `resetMonitoring` function
2. Click **Run**
3. This will set the current row count as the starting point

## Troubleshooting

### "I'm not receiving emails"

1. **Check spam folder**: Sometimes automated emails go to spam
2. **Verify email addresses**: Make sure the email addresses in `RECIPIENT_EMAILS` are correct
3. **Check execution log**: In Apps Script, go to View > Execution log to see if there are any errors
4. **Verify permissions**: Make sure you authorized the script when running setup
5. **Check trigger**: Go to Edit > Current project's triggers to verify the trigger is set up

### "The script says 'Sheet not found'"

1. Check that the `SHEET_NAME` variable matches your sheet tab name exactly
2. The name is case-sensitive - "Nigeria Applications" is different from "nigeria applications"
3. Make sure there are no extra spaces before or after the name

### "I'm getting too many emails"

If you're receiving duplicate notifications or too many emails:

1. The script only sends one email per new row
2. If you're seeing duplicates, it might be because the script ran multiple times
3. Try running `resetMonitoring` to reset the tracking

### "The script stopped working"

1. Check the execution log for errors
2. Make sure the trigger is still active (Edit > Current project's triggers)
3. Try running `setup()` again to recreate the trigger
4. Check if you've hit Google Apps Script quota limits (very unlikely for normal use)

## Understanding the Script Structure

For those curious about how it works:

- **PropertiesService**: This is Google's way of storing small pieces of data (like the last row count) between script runs
- **Time-based Trigger**: This creates an automatic timer that runs the `checkForNewRows` function every 5 minutes
- **getLastRow()**: This Google Sheets method tells you how many rows have data in them
- **MailApp**: This is Google's email service that sends the notifications

## Security Notes

- The script only has access to the specific Google Sheet where you installed it
- Email addresses are stored in the script code - only people with edit access to the script can see them
- The script runs on Google's servers, not on your computer
- All email sending is logged in the Apps Script execution history

## Disabling Notifications

If you want to temporarily stop notifications:

1. In Apps Script, go to **Edit** > **Current project's triggers**
2. Find the trigger for `checkForNewRows`
3. Click the three dots (⋮) next to it
4. Select **Delete trigger**
5. To re-enable, just run the `setup()` function again

## Support

If you encounter issues:

1. Check the execution log in Apps Script (View > Execution log)
2. Verify all configuration settings are correct
3. Make sure you've authorized all necessary permissions
4. Try running `setup()` again to reset everything
