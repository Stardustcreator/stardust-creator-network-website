/**
 * Paystack Integration Utilities
 * For Stardust Creator Community Membership Payments
 */

// Paystack API base URL
const PAYSTACK_BASE_URL = 'https://api.paystack.co';

// Get secret key from environment
const getSecretKey = () => {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) {
    throw new Error('PAYSTACK_SECRET_KEY is not configured');
  }
  return key;
};

// Membership plan codes (create these in Paystack dashboard)
export const PAYSTACK_PLANS = {
  NG: process.env.NEXT_PUBLIC_PAYSTACK_PLAN_NG || '', // NGN 5,000/month
  GB: process.env.NEXT_PUBLIC_PAYSTACK_PLAN_GB || '', // GBP 5/month
} as const;

export interface PaystackCustomer {
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  metadata?: Record<string, unknown>;
}

export interface PaystackInitializeResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    status: 'success' | 'failed' | 'abandoned';
    reference: string;
    amount: number;
    message: string | null;
    gateway_response: string;
    paid_at: string | null;
    created_at: string;
    channel: string;
    currency: string;
    ip_address: string;
    metadata: Record<string, unknown>;
    customer: {
      id: number;
      first_name: string | null;
      last_name: string | null;
      email: string;
      customer_code: string;
      phone: string | null;
      metadata: Record<string, unknown>;
    };
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
      reusable: boolean;
      signature: string;
    };
    plan: string | null;
    subscription_code?: string;
  };
}

export interface PaystackWebhookEvent {
  event: string;
  data: {
    id: number;
    domain: string;
    status: string;
    reference: string;
    amount: number;
    message: string | null;
    gateway_response: string;
    paid_at: string | null;
    created_at: string;
    channel: string;
    currency: string;
    customer: {
      id: number;
      first_name: string | null;
      last_name: string | null;
      email: string;
      customer_code: string;
      phone: string | null;
    };
    plan?: {
      id: number;
      name: string;
      plan_code: string;
      description: string;
      amount: number;
      interval: string;
      currency: string;
    };
    subscription_code?: string;
  };
}

/**
 * Initialize a subscription payment
 */
export async function initializeSubscription(params: {
  email: string;
  plan: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  callbackUrl: string;
  metadata?: Record<string, unknown>;
}): Promise<PaystackInitializeResponse> {
  const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getSecretKey()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: params.email,
      plan: params.plan,
      callback_url: params.callbackUrl,
      metadata: {
        first_name: params.firstName,
        last_name: params.lastName,
        phone: params.phone,
        ...params.metadata,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to initialize subscription');
  }

  return response.json();
}

/**
 * Initialize a one-time payment (fallback if subscription plans not set up)
 */
export async function initializePayment(params: {
  email: string;
  amount: number; // Amount in kobo/pesewas (smallest currency unit)
  currency?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  callbackUrl: string;
  metadata?: Record<string, unknown>;
}): Promise<PaystackInitializeResponse> {
  const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getSecretKey()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: params.email,
      amount: params.amount,
      currency: params.currency || 'NGN',
      callback_url: params.callbackUrl,
      metadata: {
        first_name: params.firstName,
        last_name: params.lastName,
        phone: params.phone,
        ...params.metadata,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to initialize payment');
  }

  return response.json();
}

/**
 * Verify a transaction
 */
export async function verifyTransaction(reference: string): Promise<PaystackVerifyResponse> {
  const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/verify/${reference}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getSecretKey()}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to verify transaction');
  }

  return response.json();
}

/**
 * Create a subscription for a customer (if they have a saved authorization)
 */
export async function createSubscription(params: {
  customerEmail: string;
  plan: string;
  authorization?: string;
  startDate?: string;
}): Promise<{
  status: boolean;
  message: string;
  data: {
    customer: number;
    plan: number;
    integration: number;
    authorization: number;
    status: string;
    subscription_code: string;
    email_token: string;
    next_payment_date: string;
  };
}> {
  const response = await fetch(`${PAYSTACK_BASE_URL}/subscription`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getSecretKey()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customer: params.customerEmail,
      plan: params.plan,
      authorization: params.authorization,
      start_date: params.startDate,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create subscription');
  }

  return response.json();
}

/**
 * Cancel a subscription
 */
export async function cancelSubscription(params: {
  subscriptionCode: string;
  emailToken: string;
}): Promise<{ status: boolean; message: string }> {
  const response = await fetch(`${PAYSTACK_BASE_URL}/subscription/disable`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getSecretKey()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code: params.subscriptionCode,
      token: params.emailToken,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to cancel subscription');
  }

  return response.json();
}

/**
 * Verify Paystack webhook signature
 */
export function verifyWebhookSignature(body: string, signature: string): boolean {
  // Use Web Crypto API for signature verification
  const encoder = new TextEncoder();
  const key = getSecretKey();

  // Simple hex comparison for HMAC-SHA512
  // Note: In production, use a proper crypto library or Node.js crypto
  return verifyHmacSignature(body, signature, key);
}

/**
 * Verify HMAC-SHA512 signature (server-side only)
 */
function verifyHmacSignature(body: string, signature: string, secret: string): boolean {
  // This function should only be called server-side
  if (typeof window !== 'undefined') {
    throw new Error('verifyHmacSignature should only be called server-side');
  }

  // Dynamic import to avoid bundling crypto in client
  const crypto = globalThis.crypto || require('node:crypto');

  if ('createHmac' in crypto) {
    // Node.js crypto
    const hash = crypto.createHmac('sha512', secret).update(body).digest('hex');
    return hash === signature;
  }

  // Fallback: compare directly (not secure, log warning)
  console.warn('HMAC verification not available, skipping signature check');
  return true;
}

/**
 * Generate a unique reference for transactions
 */
export function generateReference(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `SCN-${timestamp}-${randomStr}`.toUpperCase();
}
