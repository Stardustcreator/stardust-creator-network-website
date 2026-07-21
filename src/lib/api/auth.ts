const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not configured. Please set it in your environment.');
}

const BASE = API_URL.replace(/\/$/, '');

type ApiErrorPayload = {
  message?: string;
  [key: string]: unknown;
};

function describeError(error: unknown) {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
      cause: (error as Error & { cause?: unknown }).cause,
    };
  }

  return { raw: error };
}

async function readResponseBody(res: Response): Promise<ApiErrorPayload> {
  const contentType = res.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    const json = await res.json().catch(error => ({
      message: 'Failed to parse JSON response.',
      parseError: describeError(error),
    }));

    return json && typeof json === 'object' ? (json as ApiErrorPayload) : { body: json };
  }

  const text = await res.text().catch(error => {
    console.error('Auth API response body read failed:', {
      url: res.url,
      status: res.status,
      statusText: res.statusText,
      error: describeError(error),
    });
    return '';
  });

  return text ? { message: text, body: text } : {};
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const url = `${BASE}${path}`;
  console.warn('Auth API request started:', { url });

  let res: Response;

  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error('Auth API network error:', {
      url,
      baseUrl: BASE,
      error: describeError(error),
    });
    throw new Error(
      `Could not reach the auth server at ${BASE}. Make sure it is running and that CORS allows this site.`
    );
  }

  const data = await readResponseBody(res);

  if (!res.ok) {
    console.error('Auth API response error:', {
      url,
      status: res.status,
      statusText: res.statusText,
      response: data,
    });
    throw new Error(data.message ?? 'Something went wrong. Please try again.');
  }

  return data as T;
}

export interface DiscountPreview {
  discountCodeId: string;
  code: string;
  discountType: string;
  discountValue: number;
  originalAmount: number;
  discountAmount: number;
  finalAmount: number;
  planId: string;
  planName: string;
  currency: string;
}

export function initiateRegistration(
  email: string,
  firstName: string,
  lastName: string,
  phone: string,
  planId?: string
) {
  return post<{ message: string }>('/auth/initiate-registration', {
    email,
    firstName,
    lastName,
    phone,
    planId,
  });
}

export function verifyEmail(email: string, code: string) {
  return post<{ registrationToken: string }>('/auth/verify-email', { email, code });
}

interface SubscriptionResult {
  requiresPayment: boolean;
  checkoutUrl?: string;
  reference?: string;
  planId?: string;
  amount?: number;
  currency?: string;
}

export function completeRegistration(
  registrationToken: string,
  password: string,
  tosAccepted: boolean
) {
  return post<{ user: unknown; subscription: SubscriptionResult; message: string }>(
    '/auth/complete-registration',
    { registrationToken, password, tosAccepted }
  );
}

export function resendVerification(email: string) {
  return post<void>('/auth/resend-verification', { email });
}

export function forgotPassword(email: string) {
  return post<void>('/auth/forgot-password', { email });
}

export function verifyResetOtp(email: string, code: string) {
  return post<{ resetToken: string }>('/auth/verify-reset-otp', { email, code });
}

export function resetPassword(resetToken: string, newPassword: string) {
  return post<void>('/auth/reset-password', { resetToken, newPassword });
}

export function login(email: string, password: string) {
  return post<void>('/auth/login', { email, password });
}

function persistGoogleAuthSelection(key: 'scn_billing' | 'scn_plan', value?: string) {
  if (value) {
    sessionStorage.setItem(key, value);
    localStorage.setItem(key, value);
    return;
  }

  sessionStorage.removeItem(key);
  localStorage.removeItem(key);
}

function getFrontendOrigin() {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') ?? '';
}

function getGoogleAuthReturnTo(
  billing?: 'annual' | 'monthly',
  plan?: 'community' | 'starter' | 'builder'
) {
  const frontendOrigin = getFrontendOrigin();
  if (!frontendOrigin) return '';

  const returnUrl = new URL('/onboarding', frontendOrigin);

  if (billing && plan) {
    returnUrl.pathname = '/onboarding/payment';
    returnUrl.searchParams.set('billing', billing);
    returnUrl.searchParams.set('plan', plan);
  }

  return returnUrl.toString();
}

export function initiateGoogleAuth(
  billing?: 'annual' | 'monthly',
  plan?: 'community' | 'starter' | 'builder'
) {
  persistGoogleAuthSelection('scn_billing', billing);
  persistGoogleAuthSelection('scn_plan', plan);

  const googleAuthUrl = new URL(`${BASE}/auth/google`);
  const frontendOrigin = getFrontendOrigin();
  const returnTo = getGoogleAuthReturnTo(billing, plan);

  if (frontendOrigin) {
    googleAuthUrl.searchParams.set('frontendUrl', frontendOrigin);
  }

  if (returnTo) {
    googleAuthUrl.searchParams.set('returnTo', returnTo);
  }

  window.location.href = googleAuthUrl.toString();
}

export function refreshSession() {
  return post<void>('/auth/refresh', {});
}
