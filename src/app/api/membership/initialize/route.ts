import { NextRequest, NextResponse } from 'next/server';
import { initializePayment, PAYSTACK_PLANS, generateReference } from '@/lib/paystack';
import { MEMBERSHIP_PRICING, type SupportedCountry } from '@/types/creator-community.types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName, lastName, phone, country, metadata } = body;

    // Validate required fields
    if (!email || !firstName || !lastName || !country) {
      return NextResponse.json(
        { error: 'Missing required fields: email, firstName, lastName, country' },
        { status: 400 }
      );
    }

    // Validate country
    const validCountries: SupportedCountry[] = ['NG', 'GB'];
    if (!validCountries.includes(country)) {
      return NextResponse.json(
        { error: 'Invalid country. Only NG and GB are supported.' },
        { status: 400 }
      );
    }

    // Get pricing for the country
    const pricing = MEMBERSHIP_PRICING[country as SupportedCountry];

    // Convert amount to smallest unit (kobo for NGN, pence for GBP)
    const amountInSmallestUnit = pricing.amount * 100;

    // Get the callback URL
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const callbackUrl = `${baseUrl}/creator-community/join/callback`;

    // Check if we have a subscription plan configured
    const planCode = PAYSTACK_PLANS[country as keyof typeof PAYSTACK_PLANS];

    // Generate a unique reference
    const reference = generateReference();

    let result;

    if (planCode) {
      // Use subscription if plan is configured
      const { initializeSubscription } = await import('@/lib/paystack');
      result = await initializeSubscription({
        email,
        plan: planCode,
        firstName,
        lastName,
        phone,
        callbackUrl,
        metadata: {
          reference,
          country,
          membershipType: 'creator-community',
          ...metadata,
        },
      });
    } else {
      // Fall back to one-time payment
      result = await initializePayment({
        email,
        amount: amountInSmallestUnit,
        currency: pricing.currency,
        firstName,
        lastName,
        phone,
        callbackUrl,
        metadata: {
          reference,
          country,
          membershipType: 'creator-community',
          isRecurring: false,
          ...metadata,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        authorizationUrl: result.data.authorization_url,
        accessCode: result.data.access_code,
        reference: result.data.reference,
      },
    });
  } catch (error) {
    console.error('Payment initialization error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to initialize payment' },
      { status: 500 }
    );
  }
}
