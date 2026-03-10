import { NextRequest, NextResponse } from 'next/server';
import { verifyTransaction } from '@/lib/paystack';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get('reference');

    if (!reference) {
      return NextResponse.json({ error: 'Missing reference parameter' }, { status: 400 });
    }

    const result = await verifyTransaction(reference);

    if (!result.status) {
      return NextResponse.json(
        { error: result.message || 'Transaction verification failed' },
        { status: 400 }
      );
    }

    const { data } = result;

    // Extract relevant information
    const response = {
      success: data.status === 'success',
      status: data.status,
      reference: data.reference,
      amount: data.amount / 100, // Convert from smallest unit
      currency: data.currency,
      paidAt: data.paid_at,
      channel: data.channel,
      customer: {
        email: data.customer.email,
        firstName: data.customer.first_name,
        lastName: data.customer.last_name,
        customerCode: data.customer.customer_code,
      },
      metadata: data.metadata,
      subscriptionCode: data.subscription_code,
    };

    // TODO: Store membership in database
    // This is where you would:
    // 1. Create/update user record
    // 2. Create membership subscription record
    // 3. Send welcome email
    // 4. Add to Mailchimp/CRM

    return NextResponse.json(response);
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
