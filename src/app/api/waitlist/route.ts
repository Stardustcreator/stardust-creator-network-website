import { NextRequest, NextResponse } from 'next/server';

// Customer.io configuration
const CUSTOMERIO_APP_API_KEY =
  process.env.CUSTOMERIO_APP_API_KEY || '5893ba5ae3ee191a0b488c347ad28bb0';
const CUSTOMERIO_REGION = process.env.CUSTOMERIO_REGION || 'EU';
const CUSTOMERIO_API_URL =
  CUSTOMERIO_REGION === 'EU'
    ? 'https://beta-api-eu.customer.io/v1/api'
    : 'https://api.customer.io/v1/api';

// Google Sheets Webhook configuration (from homepage waitlist form)
const GOOGLE_SHEETS_WEBHOOK_URL =
  process.env.GOOGLE_SHEETS_WEBHOOK_URL ||
  'https://script.google.com/macros/s/AKfycbyY9ziSL852M10ZV1hGJjr5CudQAll8VFdW6VRZRTP-eEVtCAb_l-x_al41EHQj01Xm/exec';

interface WaitlistFormData {
  name: string;
  email: string;
  country: string;
  phone: string;
}

/**
 * Send waitlist data to Customer.io App API
 * Documentation: https://customer.io/docs/api/app/#operation/createOrUpdate
 *
 * ⚠️ TEMPORARILY DISABLED
 * This integration is currently disabled until valid Customer.io credentials are configured.
 * To re-enable:
 * 1. Update CUSTOMERIO_APP_API_KEY in .env.local with a valid key
 * 2. Uncomment the sendToCustomerIO call in the POST handler below
 * 3. Restore the dual-integration response logic
 */
async function sendToCustomerIO(data: WaitlistFormData): Promise<void> {
  const emailLower = data.email.toLowerCase();

  // Customer.io App API expects this structure for creating/updating a person
  // Using email as both id and email identifier for uniqueness
  const customerData = {
    identifiers: {
      id: emailLower, // Use email as the unique identifier
      email: emailLower,
    },
    attributes: {
      name: data.name,
      country: data.country,
      phone: data.phone,
      source: 'waitlist',
      joined_waitlist_at: Math.floor(Date.now() / 1000), // Unix timestamp
    },
  };

  const response = await fetch(`${CUSTOMERIO_API_URL}/customers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${CUSTOMERIO_APP_API_KEY}`,
    },
    body: JSON.stringify(customerData),
  });

  // Log full response details for debugging
  if (!response.ok) {
    let errorBody = '';
    try {
      errorBody = await response.text();
    } catch (e) {
      errorBody = 'Failed to read error response body';
    }

    const errorDetails = {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      body: errorBody,
      requestData: {
        ...customerData,
        // Mask sensitive data in logs
        identifiers: { email: '***@***' },
      },
      endpoint: `${CUSTOMERIO_API_URL}/customers`,
      apiKey: CUSTOMERIO_APP_API_KEY.substring(0, 10) + '...',
      region: CUSTOMERIO_REGION,
    };

    console.error('╔══════════════════════════════════════════════════════════════════');
    console.error('║ Customer.io API Error');
    console.error('╠══════════════════════════════════════════════════════════════════');
    console.error('║ Status:', errorDetails.status, errorDetails.statusText);
    console.error('║ Response Body:', errorDetails.body);
    console.error('║ Endpoint:', errorDetails.endpoint);
    console.error('║ Region:', errorDetails.region);
    console.error('║ API Key (masked):', errorDetails.apiKey);
    console.error('╠══════════════════════════════════════════════════════════════════');
    console.error('║ Troubleshooting:');
    console.error('║ 1. Verify your App API Key in Customer.io dashboard');
    console.error('║ 2. Check if the key has expired or been revoked');
    console.error('║ 3. Confirm your account region (US vs EU)');
    console.error('║ 4. Ensure the API key has permission to create/update people');
    console.error('╚══════════════════════════════════════════════════════════════════');

    throw new Error(`Customer.io API error: ${response.status} ${response.statusText}`);
  }

  // Log successful response
  const responseBody = await response.text();
  console.log('Successfully added/updated person in Customer.io:', {
    email: emailLower,
    status: response.status,
    body: responseBody || '(empty response)',
  });
}

/**
 * Send waitlist data to Google Sheets via webhook
 * Uses the same webhook as the homepage waitlist form
 */
async function sendToGoogleSheets(data: WaitlistFormData): Promise<void> {
  const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      country: data.country,
      // Prepend single quote to prevent phone from being interpreted as a formula in Google Sheets
      phone: `'${data.phone}`,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Google Sheets webhook error:', {
      status: response.status,
      statusText: response.statusText,
      body: errorText,
    });
    throw new Error('Failed to add contact to Google Sheets');
  }

  console.log('Successfully added waitlist data to Google Sheets:', data.email);
}

export async function POST(request: NextRequest) {
  try {
    const body: WaitlistFormData = await request.json();
    const { name, email, country, phone } = body;

    // Validate required fields
    if (!name || !email || !country || !phone) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // ⚠️ CUSTOMER.IO INTEGRATION TEMPORARILY DISABLED
    // Only using Google Sheets integration until valid Customer.io credentials are configured
    //
    // To re-enable dual integration, uncomment the following and restore Promise.allSettled logic:
    // const [customerioResult, googleSheetsResult] = await Promise.allSettled([
    //   sendToCustomerIO(body),
    //   sendToGoogleSheets(body),
    // ]);
    // Then restore the dual-integration response logic below

    // Send to Google Sheets only
    await sendToGoogleSheets(body);

    // Return success after Google Sheets submission
    return NextResponse.json(
      {
        success: true,
        message: "You're on the list! We'll notify you as soon as the SCN Paid Community launches.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Waitlist API error:', error);

    // Return appropriate error message
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';

    return NextResponse.json(
      {
        error: errorMessage.includes('Google Sheets')
          ? 'Failed to process waitlist submission. Please try again.'
          : 'An unexpected error occurred. Please try again.',
      },
      { status: 500 }
    );
  }
}
