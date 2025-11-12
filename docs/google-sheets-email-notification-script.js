/**
 * Google Apps Script: Email Notification for New Creator Applications
 *
 * This script monitors the "Nigeria Applications" sheet and sends email
 * notifications to specified recipients when a new row is added.
 *
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Delete any existing code
 * 4. Paste this entire script
 * 5. Update the RECIPIENT_EMAILS array with your email addresses
 * 6. Update the SHEET_NAME if your sheet tab has a different name
 * 7. Save the script (Ctrl+S or Cmd+S)
 * 8. Run the setup() function once to initialize
 * 9. The script will automatically check for new rows every 5 minutes
 *
 * HOW IT WORKS:
 * - The script stores the last known row count in PropertiesService
 * - Every 5 minutes, it checks if the row count has increased
 * - If new rows are found, it sends an email with the new application details
 * - The script handles multiple new rows at once
 */

// CONFIGURATION - Update these values
const RECIPIENT_EMAILS = [
  'your-email@example.com',
  'another-email@example.com',
  // Add more email addresses as needed
];

const SHEET_NAME = 'Nigeria Applications'; // Change if your sheet tab has a different name
const CHECK_INTERVAL_MINUTES = 5; // How often to check for new rows (in minutes)
const PROPERTY_KEY = 'lastRowCount'; // Internal storage key (don't change)

/**
 * Setup function - Run this ONCE to initialize the script
 * This sets up the time-based trigger and initializes the row count
 */
function setup() {
  // Delete any existing triggers
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'checkForNewRows') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  // Create a new time-based trigger
  ScriptApp.newTrigger('checkForNewRows').timeBased().everyMinutes(CHECK_INTERVAL_MINUTES).create();

  // Initialize the row count
  const sheet = getSheet();
  if (sheet) {
    const lastRow = sheet.getLastRow();
    PropertiesService.getScriptProperties().setProperty(PROPERTY_KEY, lastRow.toString());
    Logger.log('Setup complete. Monitoring ' + lastRow + ' existing rows.');
  }

  // Send a test email to verify configuration
  sendTestEmail();
}

/**
 * Main function that checks for new rows and sends notifications
 * This is called automatically by the time-based trigger
 */
function checkForNewRows() {
  try {
    const sheet = getSheet();
    if (!sheet) {
      Logger.log('Sheet not found: ' + SHEET_NAME);
      return;
    }

    const currentRowCount = sheet.getLastRow();
    const properties = PropertiesService.getScriptProperties();
    const lastRowCountStr = properties.getProperty(PROPERTY_KEY);

    // If no previous count exists, initialize it
    if (!lastRowCountStr) {
      properties.setProperty(PROPERTY_KEY, currentRowCount.toString());
      Logger.log('Initialized row count: ' + currentRowCount);
      return;
    }

    const lastRowCount = parseInt(lastRowCountStr, 10);

    // Check if new rows were added
    if (currentRowCount > lastRowCount) {
      const newRowCount = currentRowCount - lastRowCount;
      Logger.log('Found ' + newRowCount + ' new row(s)');

      // Get the header row to understand column structure
      const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

      // Get all new rows
      const newRows = sheet
        .getRange(lastRowCount + 1, 1, newRowCount, sheet.getLastColumn())
        .getValues();

      // Send email notification for each new row
      newRows.forEach((row, index) => {
        const rowNumber = lastRowCount + 1 + index;
        sendNewRowNotification(headers, row, rowNumber);
      });

      // Update the stored row count
      properties.setProperty(PROPERTY_KEY, currentRowCount.toString());
    }
  } catch (error) {
    Logger.log('Error checking for new rows: ' + error.toString());
    // Optionally send an error notification email
    sendErrorNotification(error);
  }
}

/**
 * Sends an email notification about a new creator application
 */
function sendNewRowNotification(headers, rowData, rowNumber) {
  try {
    // Build the email body with the new application data
    let emailBody = 'A new creator application has been submitted!\n\n';
    emailBody += 'Row Number: ' + rowNumber + '\n';
    emailBody += 'Submitted: ' + new Date().toLocaleString() + '\n\n';
    emailBody += 'Application Details:\n';
    emailBody += '='.repeat(50) + '\n\n';

    // Format each field nicely
    headers.forEach((header, index) => {
      if (header && rowData[index]) {
        const value = rowData[index];
        // Format the value nicely
        let formattedValue = value;
        if (value instanceof Date) {
          formattedValue = value.toLocaleString();
        } else if (Array.isArray(value)) {
          formattedValue = value.join(', ');
        } else {
          formattedValue = String(value);
        }

        emailBody += header + ': ' + formattedValue + '\n';
      }
    });

    emailBody += '\n' + '='.repeat(50) + '\n';
    emailBody += '\nView the full sheet: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl();

    // Create the email subject
    const subject = 'New Creator Application - ' + (rowData[1] || 'Unknown Creator'); // Assuming column 2 is Full Name

    // Send email to all recipients
    RECIPIENT_EMAILS.forEach(email => {
      if (email && email !== 'your-email@example.com') {
        MailApp.sendEmail({
          to: email,
          subject: subject,
          body: emailBody,
        });
        Logger.log('Notification sent to: ' + email);
      }
    });
  } catch (error) {
    Logger.log('Error sending notification email: ' + error.toString());
  }
}

/**
 * Sends a test email to verify the configuration
 */
function sendTestEmail() {
  const subject = 'Creator Application Monitor - Setup Complete';
  const body =
    'The email notification system has been set up successfully.\n\n' +
    'You will receive email notifications whenever a new creator application is added to the sheet.\n\n' +
    'Sheet: ' +
    SHEET_NAME +
    '\n' +
    'Check interval: Every ' +
    CHECK_INTERVAL_MINUTES +
    ' minutes\n\n' +
    'If you received this email, your configuration is working correctly!';

  RECIPIENT_EMAILS.forEach(email => {
    if (email && email !== 'your-email@example.com') {
      try {
        MailApp.sendEmail({
          to: email,
          subject: subject,
          body: body,
        });
        Logger.log('Test email sent to: ' + email);
      } catch (error) {
        Logger.log('Error sending test email to ' + email + ': ' + error.toString());
      }
    }
  });
}

/**
 * Sends an error notification email (optional - for debugging)
 */
function sendErrorNotification(error) {
  // Uncomment the lines below if you want to receive error notifications
  /*
  const subject = 'Creator Application Monitor - Error';
  const body = 'An error occurred while checking for new creator applications:\n\n' +
               error.toString() + '\n\n' +
               'Please check the Apps Script logs for more details.';
  
  RECIPIENT_EMAILS.forEach(email => {
    if (email && email !== 'your-email@example.com') {
      MailApp.sendEmail({
        to: email,
        subject: subject,
        body: body
      });
    }
  });
  */
}

/**
 * Helper function to get the target sheet
 */
function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  return spreadsheet.getSheetByName(SHEET_NAME);
}

/**
 * Manual trigger function - You can run this manually to check for new rows immediately
 * Useful for testing or if you want to check on-demand
 */
function manualCheck() {
  checkForNewRows();
}

/**
 * Reset function - Use this if you want to start monitoring from the current row count
 * This will ignore all existing rows and only notify about future additions
 */
function resetMonitoring() {
  const sheet = getSheet();
  if (sheet) {
    const currentRowCount = sheet.getLastRow();
    PropertiesService.getScriptProperties().setProperty(PROPERTY_KEY, currentRowCount.toString());
    Logger.log('Monitoring reset. Starting from row ' + currentRowCount);
  }
}
