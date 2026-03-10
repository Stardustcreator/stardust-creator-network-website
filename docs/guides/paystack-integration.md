# Paystack Integration Guide

This guide covers the Paystack payment integration for the Stardust Creator Community membership.

## Overview

The integration supports:

- **Monthly recurring subscriptions** (₦5,000 NGN / £5 GBP)
- **One-time payments** (fallback if subscription plans not configured)
- **Webhook handling** for payment events
- **Multi-currency support** (NGN for Nigeria, GBP for UK)

## Environment Variables

Add these to your `.env.local` file:

```bash
# Paystack API Keys (get from https://dashboard.paystack.com/#/settings/developers)
PAYSTACK_SECRET_KEY=sk_live_xxxxx  # or sk_test_xxxxx for testing (server-side only)
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_xxxxx  # or pk_test_xxxxx for testing (client-side)

# Optional: Subscription Plan Codes (create in Paystack Dashboard)
NEXT_PUBLIC_PAYSTACK_PLAN_NG=PLN_xxxxx  # NGN 5,000/month plan
NEXT_PUBLIC_PAYSTACK_PLAN_GB=PLN_xxxxx  # GBP 5/month plan

# Your site URL (for payment callbacks)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

**Important:** The `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` is required for the inline checkout popup to work.

## Setting Up Paystack

### 1. Create a Paystack Account

1. Go to [Paystack](https://paystack.com) and sign up
2. Complete your business verification
3. Get your API keys from Settings > API Keys & Webhooks

### 2. Create Subscription Plans (Recommended)

For recurring monthly subscriptions:

1. Go to Paystack Dashboard > Products > Plans
2. Create a plan for Nigeria:
   - Name: "Creator Community Membership (NGN)"
   - Amount: 5000 NGN
   - Interval: Monthly
   - Description: "Monthly membership to Stardust Creator Community"
3. Create a plan for UK:
   - Name: "Creator Community Membership (GBP)"
   - Amount: 500 (£5 in pence)
   - Interval: Monthly
   - Currency: GBP

4. Copy the plan codes and add them to your environment variables

### 3. Configure Webhooks

1. Go to Paystack Dashboard > Settings > API Keys & Webhooks
2. Add your webhook URL: `https://your-domain.com/api/membership/webhook`
3. Select these events:
   - `charge.success`
   - `subscription.create`
   - `subscription.not_renew`
   - `subscription.disable`
   - `invoice.create`
   - `invoice.payment_failed`

### 4. Test Mode

For development, use test API keys:

- Test Secret Key: `sk_test_xxxxx`
- Test cards: https://paystack.com/docs/testing/

Test card numbers:

- Success: `4084 0840 8408 4081`
- Failed: `4084 0840 8408 4085`
- Insufficient funds: `5060 6666 6666 6666 666`

## API Routes

### POST /api/membership/initialize

Initialize a payment/subscription.

**Request Body:**

```json
{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+2348000000000",
  "country": "NG",
  "metadata": {
    "primaryPlatform": "Instagram",
    "handle": "@username",
    "niche": "Fashion & Beauty",
    "followerCount": "10,000 - 50,000",
    "goals": ["Get brand sponsorships", "Grow my audience"],
    "referralSource": "Social media"
  }
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "authorizationUrl": "https://checkout.paystack.com/xxxxx",
    "accessCode": "xxxxx",
    "reference": "SCN-XXXXX-XXXXX"
  }
}
```

### GET /api/membership/verify

Verify a payment after callback.

**Query Parameters:**

- `reference`: The payment reference

**Response:**

```json
{
  "success": true,
  "status": "success",
  "reference": "SCN-XXXXX-XXXXX",
  "amount": 5000,
  "currency": "NGN",
  "customer": {
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "customerCode": "CUS_xxxxx"
  },
  "subscriptionCode": "SUB_xxxxx"
}
```

### POST /api/membership/webhook

Handles Paystack webhook events. This endpoint is called automatically by Paystack.

## Payment Flow

1. User clicks "Join Now" button on `/creator-community` page
2. A modal appears asking for their email address
3. Paystack inline popup opens for secure payment
4. After payment, user is redirected to `/creator-community/join/callback`
5. Callback page verifies the payment via `/api/membership/verify`
6. Success/failure message is displayed

The integration uses Paystack's inline popup (`PaystackPop`) for a seamless checkout experience without leaving your website.

## Database Integration (TODO)

The current implementation logs payments but doesn't store them. To complete the integration:

1. **After successful payment verification:**
   - Create/update user record
   - Store membership subscription
   - Send welcome email
   - Add to Mailchimp/CRM

2. **Webhook handlers should:**
   - Update subscription status on renewals
   - Handle cancellations
   - Send notification emails

### Suggested Database Schema

```sql
-- Members table
CREATE TABLE members (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(50),
  country VARCHAR(10),
  paystack_customer_code VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY,
  member_id UUID REFERENCES members(id),
  subscription_code VARCHAR(100),
  plan_code VARCHAR(100),
  status VARCHAR(50), -- active, cancelled, expired
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  cancelled_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Payment history table
CREATE TABLE payments (
  id UUID PRIMARY KEY,
  member_id UUID REFERENCES members(id),
  subscription_id UUID REFERENCES subscriptions(id),
  reference VARCHAR(100) UNIQUE,
  amount INTEGER,
  currency VARCHAR(10),
  status VARCHAR(50),
  paid_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Troubleshooting

### Payment not initializing

- Check that `PAYSTACK_SECRET_KEY` is set correctly
- Verify the email format is valid
- Check the server logs for error messages

### Webhook not receiving events

- Verify the webhook URL is accessible publicly
- Check that the signature verification is working
- Test with Paystack's webhook testing tool

### Subscription not renewing

- Check the subscription status in Paystack dashboard
- Verify the customer's card is still valid
- Check webhook logs for `invoice.payment_failed` events

## Security Considerations

1. **Never expose your secret key** - Only use it server-side
2. **Always verify webhooks** - The integration includes signature verification
3. **Validate all inputs** - The API routes validate required fields
4. **Use HTTPS** - Paystack requires secure connections in production
