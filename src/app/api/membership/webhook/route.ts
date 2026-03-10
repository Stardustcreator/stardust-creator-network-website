import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature, type PaystackWebhookEvent } from '@/lib/paystack';

export async function POST(request: NextRequest) {
  try {
    // Get the raw body for signature verification
    const body = await request.text();
    const signature = request.headers.get('x-paystack-signature');

    if (!signature) {
      console.error('Webhook: Missing signature');
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    // Verify the webhook signature
    const isValid = verifyWebhookSignature(body, signature);
    if (!isValid) {
      console.error('Webhook: Invalid signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // Parse the event
    const event: PaystackWebhookEvent = JSON.parse(body);
    console.log('Webhook received:', event.event);

    // Handle different event types
    switch (event.event) {
      case 'charge.success':
        await handleChargeSuccess(event);
        break;

      case 'subscription.create':
        await handleSubscriptionCreate(event);
        break;

      case 'subscription.not_renew':
        await handleSubscriptionNotRenew(event);
        break;

      case 'subscription.disable':
        await handleSubscriptionDisable(event);
        break;

      case 'invoice.create':
        await handleInvoiceCreate(event);
        break;

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event);
        break;

      default:
        console.log('Unhandled webhook event:', event.event);
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    // Still return 200 to prevent Paystack from retrying
    return NextResponse.json({ received: true, error: 'Processing error' });
  }
}

/**
 * Handle successful charge (payment)
 */
async function handleChargeSuccess(event: PaystackWebhookEvent) {
  const { data } = event;
  console.log('Charge success:', {
    reference: data.reference,
    email: data.customer.email,
    amount: data.amount / 100,
    currency: data.currency,
  });

  // TODO: Implement your logic here:
  // 1. Find or create user by email
  // 2. Update membership status to active
  // 3. Store transaction record
  // 4. Send confirmation email
  // 5. Add to Mailchimp/CRM member list
}

/**
 * Handle subscription creation
 */
async function handleSubscriptionCreate(event: PaystackWebhookEvent) {
  const { data } = event;
  console.log('Subscription created:', {
    subscriptionCode: data.subscription_code,
    email: data.customer.email,
    plan: data.plan?.name,
  });

  // TODO: Store subscription details
  // 1. Link subscription to user account
  // 2. Set next payment date
  // 3. Send welcome email with subscription details
}

/**
 * Handle subscription not renewing (customer cancelled)
 */
async function handleSubscriptionNotRenew(event: PaystackWebhookEvent) {
  const { data } = event;
  console.log('Subscription will not renew:', {
    subscriptionCode: data.subscription_code,
    email: data.customer.email,
  });

  // TODO: Handle cancellation
  // 1. Mark subscription as cancelled (but still active until period ends)
  // 2. Send cancellation confirmation email
  // 3. Update CRM
}

/**
 * Handle subscription disabled/cancelled
 */
async function handleSubscriptionDisable(event: PaystackWebhookEvent) {
  const { data } = event;
  console.log('Subscription disabled:', {
    subscriptionCode: data.subscription_code,
    email: data.customer.email,
  });

  // TODO: Handle subscription end
  // 1. Update membership status to expired
  // 2. Revoke access to member-only features
  // 3. Send membership ended email
}

/**
 * Handle new invoice creation (upcoming renewal)
 */
async function handleInvoiceCreate(event: PaystackWebhookEvent) {
  const { data } = event;
  console.log('Invoice created:', {
    email: data.customer.email,
    amount: data.amount / 100,
  });

  // TODO: Handle upcoming renewal
  // 1. Send payment reminder email
  // 2. Log upcoming charge
}

/**
 * Handle failed invoice payment
 */
async function handleInvoicePaymentFailed(event: PaystackWebhookEvent) {
  const { data } = event;
  console.log('Invoice payment failed:', {
    email: data.customer.email,
    amount: data.amount / 100,
  });

  // TODO: Handle payment failure
  // 1. Send payment failed notification
  // 2. Update membership status to past_due
  // 3. Implement retry logic or grace period
}
