// CONFIGURATION - Change the email to yours!
const CONFIG = {
  SHEET_NAME: 'brands registration ng',
  NOTIFICATION_EMAILS: 'your-email@example.com',
  EMAIL_SUBJECT: 'New Brand Brief Submitted - Nigeria',
  COMPANY_NAME: 'Stardust Creator Network',
  CHECK_INTERVAL_MINUTES: 5,
};

// DO NOT EDIT BELOW THIS LINE
function setup() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));

  ScriptApp.newTrigger('checkForNewRows')
    .timeBased()
    .everyMinutes(CONFIG.CHECK_INTERVAL_MINUTES)
    .create();

  const scriptProperties = PropertiesService.getScriptProperties();
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME);

  if (!sheet) {
    throw new Error('Sheet not found: ' + CONFIG.SHEET_NAME);
  }

  const lastRow = sheet.getLastRow();
  scriptProperties.setProperty('LAST_PROCESSED_ROW_BRAND', lastRow.toString());

  Logger.log('Setup complete!');
}

function checkForNewRows() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME);
    if (!sheet) return;

    const scriptProperties = PropertiesService.getScriptProperties();
    const lastProcessedRow = parseInt(
      scriptProperties.getProperty('LAST_PROCESSED_ROW_BRAND') || '1'
    );
    const currentLastRow = sheet.getLastRow();

    if (currentLastRow <= lastProcessedRow) return;

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

    for (let rowNum = lastProcessedRow + 1; rowNum <= currentLastRow; rowNum++) {
      const rowData = sheet.getRange(rowNum, 1, 1, headers.length).getValues()[0];
      if (rowData.every(cell => !cell)) continue;

      sendNewBrandBriefNotification(headers, rowData, rowNum);
      scriptProperties.setProperty('LAST_PROCESSED_ROW_BRAND', rowNum.toString());
    }
  } catch (error) {
    Logger.log('Error: ' + error.message);
  }
}

function sendNewBrandBriefNotification(headers, rowData, rowNumber) {
  const data = {};
  headers.forEach((header, index) => {
    data[header] = rowData[index] || '';
  });

  const emailBody = buildEmailBody(data, rowNumber);
  const recipients = CONFIG.NOTIFICATION_EMAILS;

  MailApp.sendEmail({
    to: recipients,
    subject: CONFIG.EMAIL_SUBJECT,
    htmlBody: emailBody,
  });

  Logger.log('Email sent for row ' + rowNumber);
}

function buildEmailBody(data, rowNumber) {
  const brandName = data['Brand Name'] || 'Unknown Brand';
  const email = data['Email'] || 'Not provided';
  const contactPerson = data['Contact Person'] || 'Not provided';
  const campaignName = data['Campaign Name'] || 'Not provided';
  const industry = data['Industry'] || 'Not provided';
  const estimatedBudget = data['Estimated Budget'] || 'Not provided';

  return (
    "<html><body style='font-family: Arial; max-width: 600px; margin: 0 auto; padding: 20px;'>" +
    "<div style='background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; text-align: center;'>" +
    "<h1 style='margin: 0;'>New Brand Brief Submission</h1>" +
    "<p style='margin: 5px 0 0 0;'>" +
    CONFIG.COMPANY_NAME +
    ' - Nigeria</p>' +
    '</div>' +
    "<div style='background: #f9f9f9; padding: 20px; margin-top: 0;'>" +
    '<p><strong>A new brand brief has been submitted from ' +
    brandName +
    '</strong></p>' +
    "<div style='background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #667eea;'>" +
    "<h2 style='color: #667eea; margin-top: 0;'>Brand Information</h2>" +
    '<p><strong>Brand Name:</strong> ' +
    brandName +
    '</p>' +
    '<p><strong>Industry:</strong> ' +
    industry +
    '</p>' +
    '<p><strong>Business Type:</strong> ' +
    (data['Business Type'] || 'Not provided') +
    '</p>' +
    '<p><strong>Company Website:</strong> ' +
    (data['Company Website'] || 'Not provided') +
    '</p>' +
    '</div>' +
    "<div style='background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #667eea;'>" +
    "<h2 style='color: #667eea; margin-top: 0;'>Contact Details</h2>" +
    '<p><strong>Contact Person:</strong> ' +
    contactPerson +
    '</p>' +
    "<p><strong>Email:</strong> <a href='mailto:" +
    email +
    "'>" +
    email +
    '</a></p>' +
    '<p><strong>Phone:</strong> ' +
    (data['Phone Number'] || 'Not provided') +
    '</p>' +
    '</div>' +
    "<div style='background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #667eea;'>" +
    "<h2 style='color: #667eea; margin-top: 0;'>Campaign Overview</h2>" +
    '<p><strong>Campaign Name:</strong> ' +
    campaignName +
    '</p>' +
    '<p><strong>Campaign Type:</strong> ' +
    (data['Campaign Type'] || 'Not provided') +
    '</p>' +
    '<p><strong>Campaign Goals:</strong> ' +
    (data['Campaign Goals'] || 'Not provided') +
    '</p>' +
    '<p><strong>Target Audiences:</strong> ' +
    (data['Target Audiences'] || 'Not provided') +
    '</p>' +
    '</div>' +
    "<div style='background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #667eea;'>" +
    "<h2 style='color: #667eea; margin-top: 0;'>Creator Requirements</h2>" +
    '<p><strong>Creator Tier:</strong> ' +
    (data['Preferred Creator Tier'] || 'Not provided') +
    '</p>' +
    '<p><strong>Content Categories:</strong> ' +
    (data['Content Categories'] || 'Not provided') +
    '</p>' +
    '<p><strong>Platform Focus:</strong> ' +
    (data['Platform Focus'] || 'Not provided') +
    '</p>' +
    '</div>' +
    "<div style='background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #667eea;'>" +
    "<h2 style='color: #667eea; margin-top: 0;'>Budget & Timeline</h2>" +
    "<p><strong>Budget:</strong> <span style='background: #fff3cd; padding: 2px 6px;'>" +
    estimatedBudget +
    '</span></p>' +
    '<p><strong>Payment Model:</strong> ' +
    (data['Payment Model'] || 'Not provided') +
    '</p>' +
    '<p><strong>Start Date:</strong> ' +
    (data['Campaign Start Date'] || 'Not provided') +
    '</p>' +
    '<p><strong>Duration:</strong> ' +
    (data['Campaign Duration'] || 'Not provided') +
    '</p>' +
    '</div>' +
    "<div style='text-align: center; margin-top: 20px;'>" +
    "<a href='https://docs.google.com/spreadsheets/d/" +
    SpreadsheetApp.getActiveSpreadsheet().getId() +
    "' " +
    "style='display: inline-block; padding: 10px 20px; background: #667eea; color: white; text-decoration: none; border-radius: 5px;'>View in Google Sheets</a>" +
    '</div>' +
    '</div>' +
    "<div style='margin-top: 20px; padding-top: 20px; border-top: 2px solid #e0e0e0; text-align: center; font-size: 12px; color: #666;'>" +
    '<p>Automated notification from ' +
    CONFIG.COMPANY_NAME +
    '</p>' +
    '<p>Row #' +
    rowNumber +
    ' in sheet: ' +
    CONFIG.SHEET_NAME +
    '</p>' +
    '</div>' +
    '</body></html>'
  );
}

function testEmailNotification() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) throw new Error('Sheet not found');

  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) throw new Error('No data rows found');

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const rowData = sheet.getRange(lastRow, 1, 1, headers.length).getValues()[0];

  sendNewBrandBriefNotification(headers, rowData, lastRow);
  Logger.log('Test email sent!');
}

function viewStatus() {
  const scriptProperties = PropertiesService.getScriptProperties();
  const lastProcessedRow = scriptProperties.getProperty('LAST_PROCESSED_ROW_BRAND') || 'Not set';
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME);
  const currentLastRow = sheet ? sheet.getLastRow() : 'Sheet not found';

  Logger.log('=== Status ===');
  Logger.log('Sheet: ' + CONFIG.SHEET_NAME);
  Logger.log('Emails: ' + CONFIG.NOTIFICATION_EMAILS);
  Logger.log('Last Processed: ' + lastProcessedRow);
  Logger.log('Current Last Row: ' + currentLastRow);
}
