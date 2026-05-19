import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY || '';
const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX || 'us10';
const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID || '9592c80acc';
const MAILCHIMP_TAG = 'Pricing calculator users';

interface PricingCalculatorData {
  email: string;
  ugcRate?: string;
  campaignType?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: PricingCalculatorData = await request.json();
    const { email, ugcRate, campaignType } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
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
        ...(ugcRate && { MMERGE3: ugcRate }),
        ...(campaignType && { MMERGE4: campaignType }),
      },
      tags: [MAILCHIMP_TAG],
    };

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
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      );
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

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to pricing calculator updates!',
      data: memberResult,
    });
  } catch (error) {
    console.error('Pricing calculator subscription error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
