import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY || '2f93fb335da1221dbea4e558e3a981b3-us10';
const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID || '9592c80acc';
const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX || 'us10';
const MAILCHIMP_TAG = 'Join-Waitlist';

const GOOGLE_SHEETS_WEBHOOK =
  process.env.GOOGLE_SHEETS_WEBHOOK_URL ||
  'https://script.google.com/macros/s/AKfycbyY9ziSL852M10ZV1hGJjr5CudQAll8VFdW6VRZRTP-eEVtCAb_l-x_al41EHQj01Xm/exec';

interface WaitlistFormData {
  name: string;
  email: string;
  country: string;
  phone: string;
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

    // Create MD5 hash of email (Mailchimp requires this for subscriber_hash)
    const subscriberHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');

    // Prepare member data for Mailchimp
    const memberData = {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: name,
        COUNTRY: country,
        PHONE: phone,
      },
      tags: [MAILCHIMP_TAG],
    };

    // Function to send to Mailchimp
    const sendToMailchimp = async () => {
      // Create Basic auth header (Mailchimp requires base64 encoded "anystring:apikey")
      const basicAuth = Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64');

      // Add or update member in Mailchimp
      const memberResponse = await fetch(
        `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members/${subscriberHash}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${basicAuth}`,
          },
          body: JSON.stringify(memberData),
        }
      );

      if (!memberResponse.ok) {
        const errorData = await memberResponse.json();
        console.error('Mailchimp API error:', errorData);
        throw new Error('Failed to add subscriber to Mailchimp');
      }

      const memberResult = await memberResponse.json();

      // Apply tag to subscriber
      const tagResponse = await fetch(
        `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members/${subscriberHash}/tags`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${basicAuth}`,
          },
          body: JSON.stringify({
            tags: [
              {
                name: MAILCHIMP_TAG,
                status: 'active',
              },
            ],
          }),
        }
      );

      if (!tagResponse.ok) {
        const tagError = await tagResponse.json();
        console.error('Mailchimp tag error:', tagError);
        // Don't fail if tagging fails, as the subscriber was added
      }

      return memberResult;
    };

    // Function to send to Google Sheets
    const sendToGoogleSheets = async () => {
      const sheetsData = {
        name,
        email,
        country,
        phone,
      };

      const sheetsResponse = await fetch(GOOGLE_SHEETS_WEBHOOK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sheetsData),
      });

      if (!sheetsResponse.ok) {
        const errorText = await sheetsResponse.text();
        console.error('Google Sheets webhook error:', errorText);
        throw new Error('Failed to add to Google Sheets');
      }

      return await sheetsResponse.json();
    };

    // Execute both integrations in parallel (independently)
    const [mailchimpResult, sheetsResult] = await Promise.allSettled([
      sendToMailchimp(),
      sendToGoogleSheets(),
    ]);

    // Track which integrations succeeded
    const mailchimpSuccess = mailchimpResult.status === 'fulfilled';
    const sheetsSuccess = sheetsResult.status === 'fulfilled';

    // Log failures for debugging
    if (!mailchimpSuccess) {
      console.error('Mailchimp integration failed:', mailchimpResult.reason);
    }
    if (!sheetsSuccess) {
      console.error('Google Sheets integration failed:', sheetsResult.reason);
    }

    // Return success if at least one integration succeeded
    if (mailchimpSuccess || sheetsSuccess) {
      return NextResponse.json(
        {
          success: true,
          message:
            "You're on the list! We'll notify you as soon as the SCN Paid Community launches.",
          integrations: {
            mailchimp: mailchimpSuccess,
            googleSheets: sheetsSuccess,
          },
        },
        { status: 200 }
      );
    } else {
      // Both integrations failed
      return NextResponse.json({ error: 'Failed to process waitlist submission' }, { status: 500 });
    }
  } catch (error) {
    console.error('Waitlist API error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
