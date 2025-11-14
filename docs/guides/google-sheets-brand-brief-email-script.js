/**
 * Google Apps Script for Brand Brief Email Notifications
 *
 * This script monitors the "brands registration ng" sheet and sends email
 * notifications when new brand briefs are submitted.
 *
 * Setup Instructions:
 * 1. Open your Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Delete any existing code and paste this entire script
 * 4. Update the CONFIG section below with your details
 * 5. Click the disk icon to save
 * 6. Run the "setup" function once (click Run button)
 * 7. Grant permissions when prompted
 * 8. The script will now check for new rows every 5 minutes automatically
 */

// ============================================================================
// CONFIGURATION - UPDATE THESE VALUES
// ============================================================================

const CONFIG = {
  // The name of your sheet tab (must match exactly)
  SHEET_NAME: 'brands registration ng',

  // Email addresses to notify (comma-separated for multiple recipients)
  NOTIFICATION_EMAILS: 'your-email@example.com',

  // Email subject line
  EMAIL_SUBJECT: 'New Brand Brief Submitted - Nigeria',

  // Your company/brand name (used in the email)
  COMPANY_NAME: 'Stardust Creator Network',

  // How often to check for new rows (in minutes)
  CHECK_INTERVAL_MINUTES: 5,
};

// ============================================================================
// DO NOT EDIT BELOW THIS LINE UNLESS YOU KNOW WHAT YOU'RE DOING
// ============================================================================

/**
 * Setup function - Run this ONCE to install the automatic trigger
 * This will check for new rows every few minutes
 */
function setup() {
  // Remove any existing triggers to avoid duplicates
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));

  // Create a new time-based trigger to check for new rows periodically
  ScriptApp.newTrigger('checkForNewRows')
    .timeBased()
    .everyMinutes(CONFIG.CHECK_INTERVAL_MINUTES)
    .create();

  // Initialize the last processed row property
  const scriptProperties = PropertiesService.getScriptProperties();
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME);

  if (!sheet) {
    throw new Error(
      `Sheet "${CONFIG.SHEET_NAME}" not found. Please check the SHEET_NAME in CONFIG.`
    );
  }

  const lastRow = sheet.getLastRow();
  scriptProperties.setProperty('LAST_PROCESSED_ROW_BRAND', lastRow.toString());

  Logger.log('Setup complete!');
  Logger.log(`Monitoring sheet: ${CONFIG.SHEET_NAME}`);
  Logger.log(`Will notify: ${CONFIG.NOTIFICATION_EMAILS}`);
  Logger.log(`Checking every ${CONFIG.CHECK_INTERVAL_MINUTES} minutes`);
  Logger.log(`Starting from row: ${lastRow}`);
}

/**
 * Main function that checks for new rows and sends notifications
 * This runs automatically based on the trigger set up in setup()
 */
function checkForNewRows() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME);

    if (!sheet) {
      Logger.log(`Sheet "${CONFIG.SHEET_NAME}" not found. Skipping check.`);
      return;
    }

    const scriptProperties = PropertiesService.getScriptProperties();
    const lastProcessedRow = parseInt(
      scriptProperties.getProperty('LAST_PROCESSED_ROW_BRAND') || '1'
    );
    const currentLastRow = sheet.getLastRow();

    // If there are no new rows, exit early
    if (currentLastRow <= lastProcessedRow) {
      Logger.log('No new brand briefs to process.');
      return;
    }

    Logger.log(`Found ${currentLastRow - lastProcessedRow} new brand brief(s)`);

    // Get headers from row 1
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

    // Process each new row
    for (let rowNum = lastProcessedRow + 1; rowNum <= currentLastRow; rowNum++) {
      const rowData = sheet.getRange(rowNum, 1, 1, headers.length).getValues()[0];

      // Skip empty rows
      if (rowData.every(cell => !cell)) {
        Logger.log(`Row ${rowNum} is empty, skipping.`);
        continue;
      }

      // Send notification for this row
      sendNewBrandBriefNotification(headers, rowData, rowNum);

      // Update the last processed row after each successful send
      scriptProperties.setProperty('LAST_PROCESSED_ROW_BRAND', rowNum.toString());
    }

    Logger.log(`Processed up to row ${currentLastRow}`);
  } catch (error) {
    Logger.log(`Error in checkForNewRows: ${error.message}`);
    Logger.log(error.stack);
  }
}

/**
 * Send email notification for a new brand brief
 */
function sendNewBrandBriefNotification(headers, rowData, rowNumber) {
  try {
    // Create a data object from headers and row data
    const data = {};
    headers.forEach((header, index) => {
      data[header] = rowData[index] || '';
    });

    // Build the email body
    const emailBody = buildEmailBody(data, rowNumber);

    // Send the email
    const recipients = CONFIG.NOTIFICATION_EMAILS.split(',')
      .map(email => email.trim())
      .join(',');

    MailApp.sendEmail({
      to: recipients,
      subject: CONFIG.EMAIL_SUBJECT,
      htmlBody: emailBody,
    });

    Logger.log(`Email notification sent for row ${rowNumber} to ${recipients}`);
  } catch (error) {
    Logger.log(`Error sending notification for row ${rowNumber}: ${error.message}`);
    throw error;
  }
}

/**
 * Build the HTML email body
 */
function buildEmailBody(data, rowNumber) {
  const brandName = data['Brand Name'] || 'Unknown Brand';
  const email = data['Email'] || 'Not provided';
  const contactPerson = data['Contact Person'] || 'Not provided';
  const phoneNumber = data['Phone Number'] || 'Not provided';
  const campaignName = data['Campaign Name'] || 'Not provided';
  const industry = data['Industry'] || 'Not provided';
  const estimatedBudget = data['Estimated Budget'] || 'Not provided';
  const campaignStartDate = data['Campaign Start Date'] || 'Not provided';
  const timestamp = data['Timestamp'] || 'Unknown';

  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      border-radius: 8px 8px 0 0;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      background: #f9f9f9;
      padding: 20px;
      border: 1px solid #e0e0e0;
      border-top: none;
      border-radius: 0 0 8px 8px;
    }
    .section {
      margin-bottom: 25px;
      background: white;
      padding: 15px;
      border-radius: 6px;
      border-left: 4px solid #667eea;
    }
    .section h2 {
      margin-top: 0;
      color: #667eea;
      font-size: 18px;
      border-bottom: 2px solid #f0f0f0;
      padding-bottom: 8px;
    }
    .field {
      margin: 10px 0;
    }
    .field-label {
      font-weight: bold;
      color: #555;
      display: inline-block;
      min-width: 140px;
    }
    .field-value {
      color: #333;
    }
    .highlight {
      background: #fff3cd;
      padding: 2px 6px;
      border-radius: 3px;
    }
    .footer {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 2px solid #e0e0e0;
      font-size: 12px;
      color: #666;
      text-align: center;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background: #667eea;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>New Brand Brief Submission</h1>
    <p style="margin: 5px 0 0 0; opacity: 0.9;">${CONFIG.COMPANY_NAME} - Nigeria</p>
  </div>

  <div class="content">
    <p style="font-size: 16px; margin-top: 0;">
      A new brand brief has been submitted from <strong>${brandName}</strong>.
    </p>

    <div class="section">
      <h2>Brand Information</h2>
      <div class="field">
        <span class="field-label">Brand Name:</span>
        <span class="field-value"><strong>${brandName}</strong></span>
      </div>
      <div class="field">
        <span class="field-label">Industry:</span>
        <span class="field-value">${industry}</span>
      </div>
      <div class="field">
        <span class="field-label">Business Type:</span>
        <span class="field-value">${data['Business Type'] || 'Not provided'}</span>
      </div>
      <div class="field">
        <span class="field-label">Company Website:</span>
        <span class="field-value">${data['Company Website'] || 'Not provided'}</span>
      </div>
    </div>

    <div class="section">
      <h2>Contact Details</h2>
      <div class="field">
        <span class="field-label">Contact Person:</span>
        <span class="field-value">${contactPerson}</span>
      </div>
      <div class="field">
        <span class="field-label">Email:</span>
        <span class="field-value"><a href="mailto:${email}">${email}</a></span>
      </div>
      <div class="field">
        <span class="field-label">Phone Number:</span>
        <span class="field-value">${phoneNumber}</span>
      </div>
      <div class="field">
        <span class="field-label">Country:</span>
        <span class="field-value">${data['Country'] || 'Not provided'}</span>
      </div>
    </div>

    <div class="section">
      <h2>Campaign Overview</h2>
      <div class="field">
        <span class="field-label">Campaign Name:</span>
        <span class="field-value"><strong>${campaignName}</strong></span>
      </div>
      <div class="field">
        <span class="field-label">Campaign Type:</span>
        <span class="field-value">${data['Campaign Type'] || 'Not provided'}</span>
      </div>
      <div class="field">
        <span class="field-label">Campaign Goals:</span>
        <span class="field-value">${data['Campaign Goals'] || 'Not provided'}</span>
      </div>
      <div class="field">
        <span class="field-label">Target Audiences:</span>
        <span class="field-value">${data['Target Audiences'] || 'Not provided'}</span>
      </div>
      <div class="field">
        <span class="field-label">Target Markets:</span>
        <span class="field-value">${data['Target Markets'] || 'Not provided'}</span>
      </div>
    </div>

    <div class="section">
      <h2>Creator Requirements</h2>
      <div class="field">
        <span class="field-label">Creator Tier:</span>
        <span class="field-value">${data['Preferred Creator Tier'] || 'Not provided'}</span>
      </div>
      <div class="field">
        <span class="field-label">Content Categories:</span>
        <span class="field-value">${data['Content Categories'] || 'Not provided'}</span>
      </div>
      <div class="field">
        <span class="field-label">Platform Focus:</span>
        <span class="field-value">${data['Platform Focus'] || 'Not provided'}</span>
      </div>
      <div class="field">
        <span class="field-label">Brand-Creator Fit:</span>
        <span class="field-value">${data['Brand Creator Fit'] || 'Not provided'}</span>
      </div>
    </div>

    <div class="section">
      <h2>Budget & Timeline</h2>
      <div class="field">
        <span class="field-label">Estimated Budget:</span>
        <span class="field-value highlight"><strong>${estimatedBudget}</strong></span>
      </div>
      <div class="field">
        <span class="field-label">Payment Model:</span>
        <span class="field-value">${data['Payment Model'] || 'Not provided'}</span>
      </div>
      <div class="field">
        <span class="field-label">Campaign Start:</span>
        <span class="field-value">${campaignStartDate}</span>
      </div>
      <div class="field">
        <span class="field-label">Duration:</span>
        <span class="field-value">${data['Campaign Duration'] || 'Not provided'}</span>
      </div>
      <div class="field">
        <span class="field-label">Deliverables:</span>
        <span class="field-value">${data['Deliverables'] || 'Not provided'}</span>
      </div>
      <div class="field">
        <span class="field-label">Ongoing Collaboration:</span>
        <span class="field-value">${data['Ongoing Collaboration'] || 'Not provided'}</span>
      </div>
    </div>

    <div class="section">
      <h2>Additional Information</h2>
      <div class="field">
        <span class="field-label">Referral Source:</span>
        <span class="field-value">${data['Referral Source'] || 'Not provided'}</span>
      </div>
      <div class="field">
        <span class="field-label">Collaboration Type:</span>
        <span class="field-value">${data['Collaboration Type'] || 'Not provided'}</span>
      </div>
      <div class="field">
        <span class="field-label">Community Interest:</span>
        <span class="field-value">${data['Community Interest'] || 'Not provided'}</span>
      </div>
      ${
        data['Additional Notes']
          ? `
      <div class="field">
        <span class="field-label">Additional Notes:</span>
        <span class="field-value">${data['Additional Notes']}</span>
      </div>
      `
          : ''
      }
    </div>

    <div class="section">
      <h2>Submission Details</h2>
      <div class="field">
        <span class="field-label">Submitted:</span>
        <span class="field-value">${timestamp}</span>
      </div>
      <div class="field">
        <span class="field-label">Sheet Row:</span>
        <span class="field-value">#${rowNumber}</span>
      </div>
      <div class="field">
        <span class="field-label">Status:</span>
        <span class="field-value">${data['Brief Status'] || 'Not provided'}</span>
      </div>
      ${
        data['Referrer URL']
          ? `
      <div class="field">
        <span class="field-label">Referrer URL:</span>
        <span class="field-value" style="word-break: break-all; font-size: 12px;">${data['Referrer URL']}</span>
      </div>
      `
          : ''
      }
      ${
        data['UTM Source'] || data['UTM Medium'] || data['UTM Campaign']
          ? `
      <div class="field">
        <span class="field-label">UTM Tracking:</span>
        <span class="field-value">
          ${data['UTM Source'] ? `Source: ${data['UTM Source']}` : ''}
          ${data['UTM Medium'] ? ` | Medium: ${data['UTM Medium']}` : ''}
          ${data['UTM Campaign'] ? ` | Campaign: ${data['UTM Campaign']}` : ''}
        </span>
      </div>
      `
          : ''
      }
    </div>

    <div style="text-align: center; margin-top: 20px;">
      <a href="https://docs.google.com/spreadsheets/d/${SpreadsheetApp.getActiveSpreadsheet().getId()}"
         class="button">
        View in Google Sheets
      </a>
    </div>
  </div>

  <div class="footer">
    <p>This is an automated notification from ${CONFIG.COMPANY_NAME}.</p>
    <p>Brand brief submitted to the "${CONFIG.SHEET_NAME}" sheet.</p>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Manual test function - Run this to test email notifications
 * This will send a test email with data from the most recent row
 */
function testEmailNotification() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME);

  if (!sheet) {
    throw new Error(
      `Sheet "${CONFIG.SHEET_NAME}" not found. Please check the SHEET_NAME in CONFIG.`
    );
  }

  const lastRow = sheet.getLastRow();

  if (lastRow <= 1) {
    throw new Error('No data rows found in the sheet. Please add at least one brand brief first.');
  }

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const rowData = sheet.getRange(lastRow, 1, 1, headers.length).getValues()[0];

  Logger.log('Sending test email notification...');
  sendNewBrandBriefNotification(headers, rowData, lastRow);
  Logger.log('Test email sent successfully!');
}

/**
 * Reset the last processed row - Run this to start monitoring from the beginning
 * WARNING: This will cause the script to process ALL rows again
 */
function resetLastProcessedRow() {
  const scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty('LAST_PROCESSED_ROW_BRAND', '1');
  Logger.log('Last processed row has been reset to 1.');
  Logger.log('All rows will be processed on the next check.');
}

/**
 * View current status and configuration
 */
function viewStatus() {
  const scriptProperties = PropertiesService.getScriptProperties();
  const lastProcessedRow = scriptProperties.getProperty('LAST_PROCESSED_ROW_BRAND') || 'Not set';
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME);
  const currentLastRow = sheet ? sheet.getLastRow() : 'Sheet not found';

  Logger.log('=== Brand Brief Email Notification Status ===');
  Logger.log(`Sheet Name: ${CONFIG.SHEET_NAME}`);
  Logger.log(`Notification Emails: ${CONFIG.NOTIFICATION_EMAILS}`);
  Logger.log(`Check Interval: ${CONFIG.CHECK_INTERVAL_MINUTES} minutes`);
  Logger.log(`Last Processed Row: ${lastProcessedRow}`);
  Logger.log(`Current Last Row: ${currentLastRow}`);
  Logger.log(
    `Pending Notifications: ${currentLastRow > parseInt(lastProcessedRow) ? currentLastRow - parseInt(lastProcessedRow) : 0}`
  );

  const triggers = ScriptApp.getProjectTriggers();
  Logger.log(`Active Triggers: ${triggers.length}`);
  triggers.forEach(trigger => {
    Logger.log(`  - ${trigger.getHandlerFunction()} (${trigger.getTriggerSource()})`);
  });
}
